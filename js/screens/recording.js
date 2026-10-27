/* ==========================================================================
   SPEAKLY — écran 9 : Enregistrement (« Deine Morgenroutine 5:00 »)
   - minuterie visuelle (anneau + 04:37 / 05:00)
   - vumètre micro temps réel
   - reconnaissance vocale du navigateur (transcription live)
   - enregistrement audio (MediaRecorder) réécoutable dans les résultats
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f) { return SK.L(k, f); };

  var live = null;   // état de la session en cours (nettoyé à l'unmount)

  /* ---------- préparation de la cible(s) à prononcer ---------- */
  function buildTargets(params) {
    var chapter = params && params.id ? SK.Store.missionById(params.id) : null;
    if (!chapter && params && params.mission) chapter = SK.Store.missionById(params.mission);
    if (!chapter) chapter = SK.Store.missionOfTheDay();

    var list = [];
    if (chapter && (chapter.questions || []).length) {
      var startQ = U.clamp(parseInt((params && params.q) || '0', 10) || 0, 0, chapter.questions.length - 1);
      chapter.questions.slice(startQ).forEach(function (q, i) {
        list.push({
          q: q, n: (q.n || startQ + i + 1),
          prompt: SK.t(q.text),
          target: (q.answerAlt && q.answerAlt[0]) || q.target || '',
          gloss: SK.t(q.targetGloss),
          keywords: (q.answerKeywords || []).slice(),
          words: q.words || []
        });
      });
      if (!list.length) list = genericTargets();
      return { chapter: chapter, targets: list, single: false };
    }
    return { chapter: null, targets: genericTargets(), single: true };
  }

  function genericTargets() {
    var pack = SK.Store.packFor();
    var pron = (pack.pronunciation || []).slice(0, 5);
    if (pron.length) {
      return pron.map(function (p, i) {
        return { q: null, n: i + 1, prompt: L('enregistrement.parleMaintenant', 'Prononce ce mot'), target: p.word + (p.article ? '' : ''), gloss: p.translation, keywords: U.words(p.word), words: [{ word: p.word, article: '', translation: p.translation, ipa: p.ipa, example: '' }] };
      });
    }
    var lang = SK.Store.langObj();
    return [{
      q: null, n: 1,
      prompt: L('enregistrement.parleMaintenant', 'Présente-toi en ' + (lang ? lang.fr : 'langue')),
      target: L('enregistrement.pret', 'Bonjour, je m\'appelle ' + SK.userName() + '. Je suis content de parler avec toi.'),
      gloss: '', keywords: [], words: []
    }];
  }

  /* ---------- écran ---------- */
  SK.Router.register('record', {
    render: function (params) {
      var store = SK.Store.get();
      var prep = buildTargets(params);
      var chapter = prep.chapter;
      var targets = prep.targets;
      var lang = SK.Store.langObj();
      var totalSeconds = Math.max(60, (store.dailyMinutes || 5) * 60);

      var S = {
        missionId: chapter ? chapter.id : null,
        mode: chapter ? 'mission' : 'libre',
        day: U.todayKey(),
        hour: new Date().getHours(),
        seconds: 0,
        totalSeconds: totalSeconds,
        targets: targets,
        index: 0,
        transcript: '',
        segments: targets.map(function () { return ''; }),
        cursor: 0,
        interim: '',
        answers: [],
        recording: true,
        finished: false,
        error: null,
        usedHelp: !!(store.draft && store.draft.seed)
      };
      var seed = store.draft && store.draft.seed;

      /* ---------- DOM ---------- */
      var promptEl = el('div.rec-target', { text: targets[0].prompt });
      var counterEl = el('span.tiny.strong', { text: '1/' + targets.length });
      var timeEl = el('div.rec-timer.mono', { text: U.fmtClock(totalSeconds), title: L('enregistrement.compteur', '', { ecoule: '00:00', total: U.fmtClock(totalSeconds) }) });
      var totalEl = el('span.rec-total', { text: '/ ' + U.fmtClock(totalSeconds) });
      var ring = SK.UI.timerRing(224);
      var meter = SK.UI.Meter(34);
      var targetEl = el('div.answer-target', { text: targets[0].target });
      var glossEl = el('div.answer-translation', { text: targets[0].gloss || '' });
      var transcriptEl = el('div.transcript', [el('span.ph', { text: L('enregistrement.transcript', 'Ton discours apparaîtra ici en direct…') })]);
      var statusEl = el('div.tiny.center', { text: '' });
      var nextBtn;

      function setTargetsUI() {
        var t = targets[S.index];
        promptEl.textContent = t.prompt;
        targetEl.textContent = t.target;
        glossEl.textContent = t.gloss || '';
        counterEl.textContent = (S.index + 1) + '/' + targets.length;
        if (nextBtn) nextBtn.textContent = S.index >= targets.length - 1
          ? L('enregistrement.terminer', 'Terminer')
          : L('commun.suivant', 'Question suivante');
      }
      setTargetsUI();

      function renderTranscript() {
        var finalTxt = S.transcript.trim();
        var interimTxt = S.interim.trim();
        var history = S.segments.slice(0, S.index).filter(function (s) { return s.trim().length; });
        if (!finalTxt && !interimTxt && !history.length) {
          transcriptEl.innerHTML = '';
          transcriptEl.appendChild(el('span.ph', { text: L('enregistrement.transcript', 'Ton discours apparaîtra ici en direct…') }));
          return;
        }
        transcriptEl.innerHTML = '';
        history.forEach(function (seg, i) {
          transcriptEl.appendChild(el('div', { style: { marginBottom: '6px' } }, [
            el('span.tiny.violet', { text: 'Q' + (i + 1) + ' · ' }),
            el('span', { text: seg + ' ' }),
            el('span.answer-chip', [icon('check', 10), el('span', { text: '✓' })])
          ]));
        });
        var rest = S.transcript.slice(S.cursor);
        if (rest.trim()) transcriptEl.appendChild(el('div', { text: rest }));
        if (interimTxt) transcriptEl.appendChild(el('div', { style: { opacity: '.6' }, text: interimTxt + ' …' }));
        transcriptEl.classList.add('live');
        transcriptEl.scrollTop = transcriptEl.scrollHeight;
      }
      renderTranscript();

      /* ---------- minuterie ---------- */
      var tickTimer = setInterval(function () {
        if (!S.recording || S.finished) return;
        S.seconds += 1;
        var left = Math.max(0, S.totalSeconds - S.seconds);
        timeEl.textContent = U.fmtClock(left);
        ring.set(S.seconds / S.totalSeconds);
        if (left <= 0) finish(true);
        else if (left === 30) SK.UI.toast(L('record.trenteSecondes', '30 secondes restantes : conclus ta phrase !'), 'warn', 2400);
      }, 1000);

      /* ---------- micro ---------- */
      var micOn = false;
      if (SK.Audio.supported()) {
        SK.Audio.startMeter(function (level, err) {
          if (err || level < 0) { micOn = false; return; }
          micOn = true;
          meter.set(level);
          if (level > 0.12) statusEl.textContent = L('enregistrement.ecoute', 'On t’entend 👂');
        }).catch(function (err) {
          S.error = err && err.name === 'NotAllowedError' ? 'denied' : 'unavailable';
          statusEl.textContent = S.error === 'denied'
            ? L('toast.microRefuse', 'Micro refusé : autorise l’accès au micro puis recharge.')
            : L('enregistrement.microIndisponible', 'Micro indisponible sur cet appareil.');
        });
      } else {
        S.error = 'unsupported';
        statusEl.textContent = L('enregistrement.microIndisponible', 'Micro indisponible sur cet appareil.');
      }

      /* ---------- reconnaissance vocale ---------- */
      if (SK.Speech.canRecognize()) {
        SK.Speech.startRecognition({
          lang: store.lang,
          onresult: function (r) {
            if (!S.recording || S.finished) return;
            if (r.final) {
              S.transcript += (S.transcript ? ' ' : '') + r.final;
              S.segments[S.index] = S.transcript.slice(S.cursor);
              S.interim = '';
              renderTranscript();
            } else {
              S.interim = r.interim;
              renderTranscript();
            }
          },
          onerror: function (e) {
            if (e.fatal) {
              var msg = e.error === 'not-allowed'
                ? L('enregistrement.microIndisponible', 'Reconnaissance vocale bloquée : tu peux écrire ce que tu dis.')
                : L('record.reconIndispo', 'Reconnaissance vocale indisponible : utilise la saisie clavier.');
              statusEl.textContent = msg;
              SK.UI.toast(msg, 'warn', 3200);
            }
          },
          onunsupported: function () {
            statusEl.textContent = L('record.reconIndispo', 'Reconnaissance vocale indisponible : utilise la saisie clavier.');
          }
        });
      } else {
        statusEl.textContent = L('record.reconIndispo', 'Reconnaissance vocale indisponible : utilise la saisie clavier.');
      }

      /* ---------- enregistrement audio ---------- */
      SK.Audio.startRecording().catch(function () { /* ignoré : optionnel */ });

      /* ---------- actions ---------- */
      function gotoIndex(i) {
        S.segments[S.index] = S.transcript.slice(S.cursor);
        S.index = U.clamp(i, 0, targets.length - 1);
        S.cursor = S.transcript.length;
        S.interim = '';
        setTargetsUI();
        renderTranscript();
        var t = targets[S.index];
        if (SK.Store.get().prefs.autoSpeak !== false) SK.Speech.speak(t.target, {});
      }

      function manualInput() {
        SK.UI.openSheet(function () {
          var input = el('textarea', {
            rows: 4, placeholder: L('enregistrement.transcript', 'Écris ce que tu viens de dire…'),
            style: { width: '100%', padding: '14px', borderRadius: '16px', border: '1.5px solid var(--line-strong)', fontFamily: 'inherit', fontSize: '14px', resize: 'vertical' }
          });
          return el('div', [
            el('div.h3', { text: L('enregistrement.transcript', 'Saisie manuelle') }),
            el('p.small.mt-8', { text: L('enregistrement.microAide', 'Utile si la reconnaissance vocale n’est pas disponible sur ton navigateur.') }),
            el('div.mt-12', [input]),
            el('button.btn.btn-primary.btn-block.mt-16', {
              type: 'button', text: L('commun.valider', 'Valider'),
              onclick: function () {
                var v = input.value.trim();
                if (v) {
                  S.transcript += (S.transcript ? ' ' : '') + v;
                  S.segments[S.index] = S.transcript.slice(S.cursor);
                  S.interim = '';
                  renderTranscript();
                }
                SK.UI.closeSheet();
              }
            })
          ]);
        });
      }

      function finish(auto) {
        if (S.finished) return;
        S.finished = true;
        S.recording = false;
        S.segments[S.index] = S.transcript.slice(S.cursor);
        SK.Speech.stopRecognition();
        SK.Audio.stopMeter();
        SK.Audio.stopRecording().then(function () {
          persist(auto);
        });
        setTimeout(function () { persist(auto); }, 900); // filet de sécurité
      }

      var persisted = false;
      function persist(auto) {
        if (persisted) return;
        persisted = true;
        S.seconds = Math.max(S.seconds, 1);
        var said = S.transcript.trim();
        // notation de chaque cible
        var answers = targets.map(function (t, i) {
          var seg = (S.segments[i] || '').trim();
          var segNorm = U.norm(seg);
          var align = SK.alignWords(seg, t.target);
          // tolérant aux formes fléchies : « stehe » est reconnu dans « stehst »
          var kwFound = (t.keywords || []).filter(function (k) {
            return segNorm.indexOf(U.norm(k)) >= 0;
          });
          var wordScores = (t.words || []).map(function (w) {
            return { word: w.word, score: SK.scoreWord(seg, w.word), translation: w.translation };
          });
          return {
            id: t.q ? t.q.id : 'q' + i,
            n: t.n,
            prompt: t.prompt,
            target: t.target,
            gloss: t.gloss,
            keywords: t.keywords || [],
            found: kwFound,
            said: seg,
            match: U.round1(align.score),
            pron: wordScores.length ? U.round1(U.avg(wordScores.map(function (w) { return w.score / 100; }))) : U.round1(align.score),
            hits: align.hits,
            missed: align.missed,
            words: wordScores,
            time: 0
          };
        });
        var uniqueWords = {};
        answers.forEach(function (a) { U.words(a.said).forEach(function (w) { uniqueWords[w] = 1; }); });
        var session = {
          id: U.uid('s'),
          day: S.day,
          hour: S.hour,
          missionId: S.missionId,
          missionTitle: chapter ? SK.t(chapter.title) : L('enregistrement.pret', 'Séance libre'),
          mode: S.mode,
          seconds: S.seconds,
          answers: answers,
          uniqueWords: Object.keys(uniqueWords).length,
          usedHelp: S.usedHelp
        };
        var scored = SK.scoreSession(session);
        session.score = scored.score;
        session.axes = scored.axes;
        session.xp = Math.round(scored.score * 0.6 + S.seconds / 12);

        // brouillon de mission : mémorise les réponses
        if (chapter) {
          var draft = (SK.Store.get().draft && SK.Store.get().draft.missionId === chapter.id) ? SK.Store.get().draft : { missionId: chapter.id, answers: {} };
          draft.answers = draft.answers || {};
          answers.forEach(function (a) { draft.answers[a.id] = { said: a.said, match: a.match }; });
          draft.lastSession = session.id;
          SK.Store.saveDraft(draft);
        }
        SK.Store.recordSession({
          day: session.day, hour: session.hour, seconds: session.seconds, score: session.score,
          xp: session.xp, missionId: session.missionId, axes: session.axes,
          words: answers.reduce(function (acc, a) {
            (a.words || []).forEach(function (w) { acc.push({ word: w.word, score: w.score }); });
            return acc;
          }, [])
        });
        SK.Store.addSecondsToday(S.seconds, 'mission');
        SK.STORE_LAST_SESSION = session;
        // le brouillon garde les réponses déjà données (visible sur l'écran Mission)
        SK.Store.saveDraft(draft);
        SK.Store.clearDraft();
        if (chapter) SK.Store.saveDraft(draft);

        SK.Router.replace('results', { session: session.id, auto: auto ? '1' : '0' });
      }

      /* ---------- pause / reprendre ---------- */
      function togglePause() {
        S.recording = !S.recording;
        if (S.recording) {
          SK.Sfx.start();
          SK.Speech.startRecognition({ onresult: function (r) {
            if (r.final) { S.transcript += (S.transcript ? ' ' : '') + r.final; S.segments[S.index] = S.transcript.slice(S.cursor); S.interim = ''; renderTranscript(); }
            else { S.interim = r.interim; renderTranscript(); }
          } });
          SK.Audio.startMeter(function (lvl) { if (lvl >= 0) meter.set(lvl); });
        } else {
          SK.Sfx.stop();
          SK.Speech.stopRecognition();
          SK.Audio.stopMeter();
        }
        pauseBtn.querySelector('.round').className = 'round ' + (S.recording ? 'round-amber' : 'round-mint');
        pauseBtn.querySelector('span').textContent = S.recording ? L('enregistrement.pause', 'Pause') : L('enregistrement.reprendre', 'Reprendre');
        pauseBtn.querySelector('.round').innerHTML = '';
        pauseBtn.querySelector('.round').appendChild(icon(S.recording ? 'pause' : 'play', 24));
        ring.hot(!S.recording);
        timeEl.style.opacity = S.recording ? '1' : '.45';
      }

      /* ---------- contrôles ---------- */
      var pauseBtn = el('button.rec-ctl', {
        type: 'button', onclick: togglePause
      }, [el('div.round.round-amber', icon('pause', 24)), el('span', { text: L('enregistrement.pause', 'Pause') })]);

      var stopBtn = el('button.rec-ctl', {
        type: 'button', onclick: function () { SK.Sfx.stop(); finish(false); }
      }, [el('div.round.round-rose', icon('check', 26)), el('span', { text: L('enregistrement.terminer', 'Terminer') })]);

      nextBtn = el('button.btn.btn-soft.btn-sm.grow', {
        type: 'button',
        text: targets.length > 1 ? L('commun.suivant', 'Question suivante') : L('enregistrement.terminer', 'Terminer'),
        onclick: function () {
          SK.Sfx.tap();
          if (S.index >= targets.length - 1) finish(false);
          else gotoIndex(S.index + 1);
        }
      });

      var prevBtn = el('button.icon-btn', {
        type: 'button', 'aria-label': L('commun.retour', 'Précédent'),
        onclick: function () { if (S.index > 0) gotoIndex(S.index - 1); }
      }, icon('chevronL', 20));

      /* ---------- assemblage ---------- */
      var screen = el('div.screen.rec-screen', [
        U.topbar({
          plain: true,
          title: L('enregistrement.titre', 'Enregistrement'),
          onBack: function () {
            SK.Speech.stopRecognition(); SK.Audio.stopMeter(); SK.Audio.stopRecording();
            SK.Router.replace(chapter ? 'mission' : 'home', chapter ? { id: chapter.id } : {});
          },
          actions: [
            el('button.icon-btn', { type: 'button', 'aria-label': L('enregistrement.transcript', 'Saisie clavier'), onclick: manualInput }, icon('pencil', 19)),
            SK.speakBtn(function () { return targets[S.index].target; })
          ]
        }),
        el('div.screen-body.center', [
          el('div.row-between', [
            promptEl,
            counterEl
          ]),
          el('div.row-between', { style: { marginTop: '10px' } }, [prevBtn, nextBtn]),
          el('div.mt-16', [ring.node]),
          el('div.row', { style: { justifyContent: 'center', marginTop: '10px' } }, [timeEl, totalEl]),
          el('div.mt-16', [
            el('div.card.card-flat', [
              el('div.row-between', [
                el('div.tiny.strong', { text: L('enregistrement.parleMaintenant', 'Dis cette phrase') }),
                SK.speakBtn(function () { return targets[S.index].target; }, { slow: true })
              ]),
              el('div.mt-8', [targetEl]),
              glossEl
            ])
          ]),
          el('div.mt-16', [
            meter.node,
            statusEl
          ]),
          el('div.mt-8', [transcriptEl]),
          el('div.mt-24', [el('div.rec-controls', [pauseBtn, stopBtn])]),
          el('p.tiny.center.mt-16', {
            text: (chapter ? SK.t(chapter.title) + ' · ' : '') +
              (SK.Speech.canRecognize() ? L('enregistrement.microAide', 'Parle normalement : ta phrase est transcrite en direct.') : L('enregistrement.transcript', 'Astuce : utilise le bouton crayon pour écrire ta phrase.'))
          })
        ])
      ]);

      live = { S: S, finish: finish, chapter: chapter, screen: screen };
      /* Point d'accroche de test : permet de simuler une prise de parole
         (reconnaissance vocale indisponible dans le harnais hors navigateur). */
      SK._liveRecording = {
        state: S,
        say: function (text) {
          S.transcript += (S.transcript ? ' ' : '') + String(text || '').trim();
          S.segments[S.index] = S.transcript.slice(S.cursor);
          S.interim = '';
          renderTranscript();
        },
        next: function () { gotoIndex(S.index + 1); },
        finish: finish
      };
      return screen;
    },

    mount: function () {
      // démarre l'annonce de la 1re phrase (le micro est déjà lancé au rendu)
      if (live && live.S.targets.length && SK.Store.get().prefs.autoSpeak !== false) {
        setTimeout(function () { SK.Speech.speak(live.S.targets[0].target, {}); }, 420);
      }
    },

    unmount: function () {
      SK.Speech.stopRecognition();
      SK.Audio.stopMeter();
      SK.Audio.stopRecording();
      // l'URL du blob doit rester valable pour la réécoute dans l'écran Résultats
      setTimeout(function () { SK.Audio.release(); }, 3000);
      live = null;
      SK._liveRecording = null;
    }
  });
})(window);
