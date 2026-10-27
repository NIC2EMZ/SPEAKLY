/* ==========================================================================
   SPEAKLY — onglet Prononciation : entraînement des sons difficiles
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f) { return SK.L(k, f); };

  var state = { idx: 0, listening: false, lastScore: null, timer: null };

  function render() {
    var pack = SK.Store.packFor();
    var items = pack.pronunciation || [];
    var lang = SK.Store.langObj();

    if (!items.length) {
      return el('div.screen', [
        head(lang),
        el('div.screen-body', [
          U.emptyState('🔤', L('prononciation.vide', 'Bientôt disponible'),
            L('prononciation.videTxt', 'Les exercices de prononciation arrivent pour cette langue. En attendant, lance une mission guidée.'),
            el('button.btn.btn-primary', {
              type: 'button', text: L('accueil.missionDuJour', 'Mission du jour'),
              onclick: function () { SK.Router.go('mission', {}); }
            }))
        ])
      ]);
    }

    state.idx = U.clamp(state.idx, 0, items.length - 1);
    var item = items[state.idx];

    var scoreBox = el('div.word-score');
    var hintEl = el('div.tiny.center.mt-12', { text: L('prononciation.aide', 'Appuie sur le micro, puis répète le mot à voix haute.') });
    var meter = SK.UI.Meter(28);

    var card = el('div.word-card', [
      el('div.row', { style: { justifyContent: 'center', gap: '6px' } }, [
        U.badge(item.level || 'A1', 'violet', 'target'),
        U.badge(lang ? lang.native : '', 'ghost', 'globe')
      ]),
      el('div.mt-12', [el('div.w', { text: item.word })]),
      el('div.ipa', { text: item.ipa || '' }),
      el('div.tr', { text: item.translation || '' }),
      el('div.tip', { text: item.tip || '' })
    ]);

    function paintScore(score) {
      scoreBox.innerHTML = '';
      var tone = score >= 80 ? 'mint' : score >= 60 ? 'amber' : 'rose';
      scoreBox.appendChild(U.badge(score + ' / 100', tone, score >= 80 ? 'star' : 'info'));
      scoreBox.appendChild(el('span.tiny', {
        text: score >= 80 ? L('prononciation.excellent', 'Excellent !')
          : score >= 60 ? L('prononciation.pasMal', 'Pas mal, réessaie')
            : L('prononciation.reessaye', 'Réessaie plus lentement')
      }));
    }

    var micBtn = el('button.rec-btn', {
      type: 'button', 'aria-label': L('prononciation.repeter', 'Répéter'),
      onclick: function () { toggleListen(); }
    }, icon('mic', 44));

    function toggleListen() {
      if (state.listening) { stopListen(); return; }
      if (!SK.Speech.canRecognize()) { keyboardFallback(); return; }
      state.listening = true;
      micBtn.classList.add('rec-on');
      meter.hot(true);
      meter.demo(true);
      hintEl.textContent = L('prononciation.enCours', 'Je t\'écoute…');
      var collected = '';
      SK.Audio.startMeter(function (lvl) { if (lvl >= 0) meter.set(lvl); }).catch(function () {});
      SK.Speech.startRecognition({
        onresult: function (r) {
          if (r.final) collected += ' ' + r.final;
          hintEl.textContent = (collected + ' ' + (r.interim || '')).trim() || L('prononciation.enCours', 'Je t\'écoute…');
        },
        onerror: function (e) { if (e.fatal) stopListen(collected); }
      });
      // arrêt automatique après ~4 s
      clearTimeout(state.timer);
      state.timer = setTimeout(function () { if (state.listening) stopListen(collected); }, 4200);
    }

    function stopListen(collected) {
      if (!state.listening) return;
      state.listening = false;
      clearTimeout(state.timer);
      micBtn.classList.remove('rec-on');
      meter.demo(false);
      meter.hot(false);
      SK.Speech.stopRecognition();
      SK.Audio.stopMeter();
      if (collected === undefined) collected = '';
      var score = SK.scoreWord(collected, item.word);
      state.lastScore = score;
      paintScore(score);
      hintEl.textContent = collected.trim()
        ? L('prononciation.entendu', 'Entendu :') + ' « ' + collected.trim() + ' »'
        : L('prononciation.rienEntendu', 'Je n\'ai rien entendu — réessaie en parlant plus fort.');
      SK.Store.recordSession({
        day: U.todayKey(), hour: new Date().getHours(), seconds: 8, score: score, xp: Math.round(score / 12),
        missionId: null, axes: { fluidez: score, pronunciation: score, vocabulary: score, grammar: score },
        words: [{ word: item.word, score: score }]
      });
      SK.Store.addSecondsToday(8, null);
      if (score >= 80) { SK.Sfx.great(); SK.UI.toast(L('toast.bienPrononce', 'Bien prononcé !'), 'ok'); }
      else SK.Sfx.soft();
    }

    function keyboardFallback() {
      SK.UI.openSheet(function () {
        var input = el('input', {
          type: 'text', placeholder: L('prononciation.saisie', 'Écris le mot tel que tu le prononces…'),
          style: { width: '100%', padding: '14px', borderRadius: '16px', border: '1.5px solid var(--line-strong)', fontSize: '15px' }
        });
        return el('div', [
          el('div.h3', { text: L('prononciation.saisieTitre', 'Saisie manuelle') }),
          el('p.small.mt-8', { text: L('prononciation.saisieTxt', 'La reconnaissance vocale n\'est pas disponible ici : écris ce que tu prononces.') }),
          el('div.mt-12', [input]),
          el('button.btn.btn-primary.btn-block.mt-16', {
            type: 'button', text: L('commun.valider', 'Valider'),
            onclick: function () { var v = input.value; SK.UI.closeSheet(); state.listening = true; stopListen(v); }
          })
        ]);
      });
    }

    var nav = el('div.row-between', [
      el('button.btn.btn-ghost.btn-sm', {
        type: 'button', text: L('commun.precedent', 'Précédent'),
        onclick: function () { state.idx = (state.idx - 1 + items.length) % items.length; SK.Router.replace('pronounce'); }
      }),
      el('button.btn.btn-ghost.btn-sm', {
        type: 'button', text: L('commun.suivant', 'Suivant'),
        onclick: function () { state.idx = (state.idx + 1) % items.length; SK.Router.replace('pronounce'); }
      })
    ]);

    var body = el('div.screen-body', [
      el('p.small.center', { text: L('prononciation.consigne', 'Répète le mot après l\'avoir écouté. Tu es noté sur la clarté, pas sur l\'accent.') }),
      el('div.mt-16', [card]),
      el('div.mt-16', [micBtn]),
      el('div.mt-12', [meter.node]),
      scoreBox,
      hintEl,
      el('div.mt-16', nav),
      el('div.mt-16', [
        el('button.btn.btn-primary.btn-block', {
          type: 'button', text: L('libre.titre', 'Parler libre') + ' · ' + L('libre.bientot', 'environ {sec} s', { sec: 180 }),
          onclick: function () { SK.Sfx.start(); SK.Router.go('free', {}); }
        }),
        el('p.tiny.center.mt-8', { text: L('libre.sousTitre', 'Un sujet tiré au hasard et 3 minutes pour parler sans script.') })
      ]),
      el('div.mt-24', [
        U.sectionTitle(L('prononciation.autres', 'Tous les sons de la série')),
        el('div.vocab-wrap', items.map(function (it, i) {
          return el('button.vocab' + (i === state.idx ? '.is-spoken' : ''), {
            type: 'button', text: it.word,
            onclick: function () { state.idx = i; SK.Router.replace('pronounce'); }
          });
        }))
      ])
    ]);

    return el('div.screen', [head(lang), body]);
  }

  function head(lang) {
    return el('div.screen-pad', { style: { paddingTop: '8px' } }, [
      el('h1.h2', { text: L('prononciation.titre', 'Prononciation') }),
      el('p.sub.mt-4', { text: L('prononciation.sousTitre', 'Entraîne les sons qui te bloquent') + (lang ? ' — ' + lang.native : '') })
    ]);
  }

  SK.Router.register('pronounce', {
    render: render,
    unmount: function () {
      clearTimeout(state.timer);
      state.listening = false;
      SK.Speech.stopRecognition();
      SK.Audio.stopMeter();
    }
  });
  SK.Router.registerTab({ name: 'pronounce', label: function () { return SK.L('prononciation.tab', 'Parler'); }, icon: 'wave' });
})(window);
