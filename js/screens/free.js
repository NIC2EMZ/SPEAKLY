/* ==========================================================================
   SPEAKLY — écran « Parler libre »
   --------------------------------------------------------------------------
   Un enregistrement continu guidé par des amorces aléatoires : c'est le plus
   proche de parler pour de vrai, et ça fonctionne à tous les niveaux puisqu'il
   n'y a pas de phrase modèle à réciter.
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f, v) { return SK.L(k, f, v); };

  var live = null;

  function promptsFor(code) {
    var all = (SK.FREE_PROMPTS || {})[code] || [];
    if (all.length) return all;
    // langue sans amorces dédiées : on réutilise celles de l'allemand comme gabarit vide
    return [];
  }

  function render(params) {
    var st = SK.Store.get();
    var lang = SK.Store.langObj();
    var topics = promptsFor(st.lang);
    var seconds = (params && params.seconds) ? parseInt(params.seconds, 10) : 180;

    var S = {
      missionId: null,
      mode: 'libre',
      day: U.todayKey(),
      hour: new Date().getHours(),
      seconds: 0,
      totalSeconds: seconds,
      topics: topics,
      topic: topics.length ? U.pick(topics) : { emoji: '💬', text: L('libre.amorce', 'Ton sujet'), fr: '', aide: [] },
      transcript: '',
      interim: '',
      recording: true,
      finished: false,
      usedHelp: false
    };

    /* ---------- DOM ---------- */
    var topicEl = el('div.rec-target', { text: S.topic.text });
    var glossEl = el('div.answer-translation', { text: SK.t(S.topic) && S.topic.fr ? S.topic.fr : (S.topic.fr || '') });
    var emojiEl = el('div.flagbox', { text: S.topic.emoji || '💬' });
    var aidsEl = el('div.vocab-wrap.mt-12');
    var timeEl = el('div.rec-timer.mono', { text: U.fmtClock(S.totalSeconds) });
    var ring = SK.UI.timerRing(224);
    var meter = SK.UI.Meter(34);
    var transcriptEl = el('div.transcript');
    var statusEl = el('div.tiny.center', { text: '' });
    var wordCountEl = el('span.tiny.strong', { text: '0 ' + L('revision.jours', 'mots').replace('jours', 'mots') });

    function paintTopic() {
      topicEl.textContent = S.topic.text;
      glossEl.textContent = S.topic.fr || '';
      emojiEl.textContent = S.topic.emoji || '💬';
      aidsEl.innerHTML = '';
      (S.topic.aide || []).forEach(function (a) {
        aidsEl.appendChild(el('button.vocab', {
          type: 'button', text: a,
          onclick: function () { SK.UI.say(a, { force: true }); }
        }));
      });
    }

    function paintTranscript() {
      var t = S.transcript.trim();
      transcriptEl.innerHTML = '';
      if (!t && !S.interim) {
        transcriptEl.appendChild(el('span.ph', { text: L('record.attente', 'Ton discours apparaîtra ici en direct…') }));
        return;
      }
      transcriptEl.classList.add('live');
      if (t) transcriptEl.appendChild(el('div', { text: t }));
      if (S.interim) transcriptEl.appendChild(el('div', { style: { opacity: '.6' }, text: S.interim + ' …' }));
      transcriptEl.scrollTop = transcriptEl.scrollHeight;
      wordCountEl.textContent = U.words(t).length + ' / 60 ' + L('revision.jours', 'jours').replace('jours', 'mots');
    }
    paintTopic();
    paintTranscript();

    /* ---------- minuterie ---------- */
    var tick = setInterval(function () {
      if (!S.recording || S.finished) return;
      S.seconds += 1;
      var left = Math.max(0, S.totalSeconds - S.seconds);
      timeEl.textContent = U.fmtClock(left);
      ring.set(S.seconds / S.totalSeconds);
      if (left === 60) SK.UI.toast(L('libre.consigne', 'Une minute : conclus ton idée.'), 'warn', 2600);
      if (left <= 0) finish(true);
    }, 1000);

    /* ---------- micro + reconnaissance ---------- */
    if (SK.Audio.supported()) {
      SK.Audio.startMeter(function (level, err) {
        if (err || level < 0) return;
        meter.set(level);
        if (level > 0.12) statusEl.textContent = L('record.entendu', 'On t\'entend 👂');
      }).catch(function () {
        statusEl.textContent = L('record.micIndispo', 'Micro indisponible sur cet appareil.');
      });
    } else {
      statusEl.textContent = L('record.micIndispo', 'Micro indisponible sur cet appareil.');
    }

    if (SK.Speech.canRecognize()) {
      SK.Speech.startRecognition({
        lang: SK.Store.get().lang,
        onresult: function (r) {
          if (!S.recording || S.finished) return;
          if (r.final) { S.transcript += (S.transcript ? ' ' : '') + r.final; S.interim = ''; paintTranscript(); }
          else { S.interim = r.interim; paintTranscript(); }
        },
        onerror: function (e) {
          if (e.fatal) statusEl.textContent = L('record.reconIndispo', 'Reconnaissance vocale indisponible : utilise la saisie clavier.');
        }
      });
    } else {
      statusEl.textContent = L('record.reconIndispo', 'Reconnaissance vocale indisponible : utilise la saisie clavier.');
    }
    SK.Audio.startRecording().catch(function () {});

    /* ---------- actions ---------- */
    function switchTopic() {
      if (!S.topics.length) { SK.UI.toast(L('libre.sousTitre', 'Pas de sujet disponible dans cette langue.'), 'warn'); return; }
      var next = U.pick(S.topics.filter(function (t) { return t.text !== S.topic.text; }));
      S.topic = next || U.pick(S.topics);
      paintTopic();
      SK.Sfx.tap();
      if (SK.Store.get().prefs.autoSpeak !== false) SK.UI.say(S.topic.text, { force: false });
    }

    function manualInput() {
      SK.UI.openSheet(function () {
        var input = el('textarea', {
          rows: 4, placeholder: L('record.saisiePlaceholder', 'Écris ce que tu viens de dire…'),
          style: { width: '100%', padding: '14px', borderRadius: '16px', border: '1.5px solid var(--line-strong)', fontFamily: 'inherit', fontSize: '14px', resize: 'vertical' }
        });
        return el('div', [
          el('div.h3', { text: L('record.saisieTitre', 'Saisie manuelle') }),
          el('p.small.mt-8', { text: L('record.saisieTxt', 'Utile si la reconnaissance vocale n\'est pas disponible.') }),
          el('div.mt-12', [input]),
          el('button.btn.btn-primary.btn-block.mt-16', {
            type: 'button', text: L('commun.valider', 'Valider'),
            onclick: function () {
              var v = input.value.trim();
              if (v) { S.transcript += (S.transcript ? ' ' : '') + v; paintTranscript(); }
              SK.UI.closeSheet();
            }
          })
        ]);
      });
    }

    var pauseBtn;
    function togglePause() {
      S.recording = !S.recording;
      if (S.recording) {
        SK.Sfx.start();
        SK.Speech.startRecognition({
          onresult: function (r) {
            if (r.final) { S.transcript += (S.transcript ? ' ' : '') + r.final; paintTranscript(); }
            else { S.interim = r.interim; paintTranscript(); }
          }
        });
        SK.Audio.startMeter(function (lvl) { if (lvl >= 0) meter.set(lvl); });
      } else {
        SK.Sfx.stop();
        SK.Speech.stopRecognition();
        SK.Audio.stopMeter();
      }
      paintPause();
    }
    function paintPause() {
      var round = pauseBtn.querySelector('.round');
      round.className = 'round ' + (S.recording ? 'round-amber' : 'round-mint');
      round.innerHTML = '';
      round.appendChild(icon(S.recording ? 'pause' : 'play', 24));
      pauseBtn.querySelector('span').textContent = S.recording
        ? L('enregistrement.pause', 'Pause') : L('enregistrement.reprendre', 'Reprendre');
      ring.hot(!S.recording);
    }

    var persisted = false;
    function persist() {
      if (persisted) return;
      persisted = true;
      S.seconds = Math.max(S.seconds, 5);
      var text = S.transcript.trim();
      var unique = {};
      U.words(text).forEach(function (w) { unique[w] = 1; });
      var target = S.topic.text;
      var align = SK.alignWords(text, target);
      var words60 = U.words(text).length;
      var coverage = U.clamp(words60 / 60, 0, 1);
      var session = {
        id: U.uid('s'),
        day: S.day,
        hour: S.hour,
        missionId: null,
        missionTitle: L('libre.titre', 'Parler libre'),
        mode: 'libre',
        seconds: S.seconds,
        uniqueWords: Object.keys(unique).length,
        usedHelp: false,
        answers: [{
          id: 'libre', n: 1,
          prompt: target,
          target: target,
          gloss: S.topic.fr || '',
          keywords: [],
          found: [],
          said: text,
          match: U.round1(U.clamp(0.4 + 0.6 * coverage, 0, 1)),
          pron: U.round1(U.clamp(0.45 + 0.55 * coverage, 0, 1)),
          hits: align.hits,
          missed: align.missed,
          words: [],
          time: 0
        }]
      };
      var scored = SK.scoreSession(session);
      session.score = scored.score;
      session.axes = scored.axes;
      session.xp = Math.round(scored.score * 0.6 + S.seconds / 12);
      SK.STORE_LAST_SESSION = session;
      SK.Store.recordSession({
        day: session.day, hour: session.hour, seconds: session.seconds, score: session.score,
        xp: session.xp, missionId: null, axes: session.axes, words: []
      });
      SK.Store.addSecondsToday(S.seconds, null);
      SK.Router.replace('results', { session: session.id, auto: '0' });
    }

    function finish(auto) {
      if (S.finished) return;
      S.finished = true;
      S.recording = false;
      clearInterval(tick);
      SK.Speech.stopRecognition();
      SK.Audio.stopMeter();
      SK.Audio.stopRecording().then(persist);
      setTimeout(persist, 900);
    }

    var stopBtn = el('button.rec-ctl', {
      type: 'button', onclick: function () { SK.Sfx.stop(); finish(false); }
    }, [el('div.round.round-rose', icon('check', 26)), el('span', { text: L('enregistrement.terminer', 'Terminer') })]);

    pauseBtn = el('button.rec-ctl', { type: 'button', onclick: togglePause },
      [el('div.round.round-amber', icon('pause', 24)), el('span', { text: L('enregistrement.pause', 'Pause') })]);

    var body = el('div.screen-body.center', [
      el('div.mission-head', [
        emojiEl,
        el('div.grow', [
          el('div.tiny.strong', { text: L('libre.amorce', 'Ton sujet') }),
          topicEl,
          glossEl
        ]),
        el('button.icon-btn', {
          type: 'button', 'aria-label': L('libre.changerAmorce', 'Autre sujet'),
          onclick: switchTopic
        }, icon('refresh', 20))
      ]),
      aidsEl,
      el('div.mt-16', [ring.node]),
      el('div.row', { style: { justifyContent: 'center', marginTop: '10px' } }, [
        timeEl, el('span.rec-total', { text: '/ ' + U.fmtClock(S.totalSeconds) })
      ]),
      el('div.mt-16', [meter.node, statusEl]),
      el('div.mt-12', [transcriptEl]),
      el('div.row-between.mt-8', [
        wordCountEl,
        el('button.btn.btn-soft.btn-sm', {
          type: 'button', text: L('libre.changerAmorce', 'Autre sujet'),
          onclick: switchTopic
        })
      ]),
      el('div.mt-20', [el('div.rec-controls', [pauseBtn, stopBtn])]),
      el('p.tiny.center.mt-16', { text: L('libre.consigne', 'Parle en continu : l\'app te transcrit, personne ne te juge.') }),
      el('button.btn.btn-ghost.btn-block.mt-12', {
        type: 'button', text: L('record.saisieTitre', 'Saisie manuelle'),
        onclick: manualInput
      })
    ]);

    live = { S: S, finish: finish };
    /* accroche de test : simuler une prise de parole hors navigateur */
    SK._liveFree = {
      state: S,
      say: function (text) {
        S.transcript += (S.transcript ? ' ' : '') + String(text || '').trim();
        paintTranscript();
      },
      finish: finish
    };

    return el('div.screen.rec-screen', [
      U.topbar({
        plain: true,
        title: L('libre.titre', 'Parler libre'),
        onBack: function () {
          SK.Speech.stopRecognition(); SK.Audio.stopMeter(); SK.Audio.stopRecording();
          SK.Router.replace('pronounce');
        }
      }),
      body
    ]);
  }

  SK.Router.register('free', {
    render: render,
    unmount: function () {
      SK.Speech.stopRecognition();
      SK.Audio.stopMeter();
      SK.Audio.stopRecording();
      setTimeout(function () { SK.Audio.release(); }, 3000);
      live = null;
      SK._liveFree = null;
    }
  });
})(window);
