/* ==========================================================================
   SPEAKLY — onglet Conversation : dialogues guidés tour par tour
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f) { return SK.L(k, f); };

  var active = null;   // { dlg } : dialogue en cours

  function render(params) {
    var pack = SK.Store.packFor();
    var list = pack.dialogues || [];
    var lang = SK.Store.langObj();

    if (params && params.dlg) {
      var dlg = list.filter(function (d) { return d.id === params.dlg; })[0];
      if (dlg) return renderDialogue(dlg);
    }

    if (!list.length) {
      return el('div.screen', [
        head(),
        el('div.screen-body', [
          U.emptyState('💬', L('conversation.vide', 'Dialogues à venir'),
            L('conversation.videTxt', 'Les conversations guidées arrivent bientôt dans cette langue.'),
            el('button.btn.btn-primary', {
              type: 'button', text: L('prononciation.titre', 'Prononciation'),
              onclick: function () { SK.Router.go('pronounce'); }
            }))
        ])
      ]);
    }

    var cards = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '11px' } });
    list.forEach(function (d) {
      var meTurns = (d.turns || []).filter(function (t) { return t.who === 'me'; }).length;
      cards.appendChild(el('button.scenario', {
        type: 'button',
        onclick: function () { SK.Sfx.tap(); SK.Router.go('conversation', { dlg: d.id }); }
      }, [
        el('div.top', [
          el('div.emoji', { text: d.emoji || '💬' }),
          el('div.grow', [el('b', { text: SK.t(d.title) }), el('small', { text: SK.t(d.subtitle) })]),
          el('span.go', icon('chevron', 18))
        ]),
        el('div.tags', [
          U.badge(d.level || 'A1', 'violet', 'target'),
          U.badge(meTurns + ' ' + L('conversation.repliques', 'répliques à toi'), 'mint', 'mic')
        ])
      ]));
    });

    var body = el('div.screen-body', [
      el('p.small', { text: L('conversation.consigne', 'L\'app parle en premier : à chaque tour, tu réponds à voix haute.') }),
      el('div.mt-16', [cards]),
      el('div.mt-24', [
        U.sectionTitle(L('conversation.astuce', 'Astuce du jour')),
        el('div.card-soft', [
          el('div.h4', { text: L('conversation.astuceTitre', 'Ne traduis pas mot à mot') }),
          el('p.small.mt-4', { text: L('conversation.astuceTxt', 'Retiens des blocs de phrase entiers. Ton cerveau les ressortira tout seuls.') })
        ])
      ])
    ]);

    return el('div.screen', [head(), body]);
  }

  function head() {
    return el('div.screen-pad', { style: { paddingTop: '8px' } }, [
      el('h1.h2', { text: L('conversation.titre', 'Conversation') }),
      el('p.sub.mt-4', { text: L('conversation.sousTitre', 'Choisis un dialogue et joue ta réplique.') })
    ]);
  }

  function renderDialogue(dlg) {
    var turns = dlg.turns || [];
    var state = { i: -1 };
    active = { dlg: dlg.id };

    var dlgBox = el('div.dlg');
    var controls = el('div.mt-16');
    var meter = SK.UI.Meter(30);
    var hint = el('div.tiny.center.mt-12', { text: L('conversation.pret', 'Appuie sur le micro et réponds.') });

    function pushBubble(turn, isMe) {
      var row = el('div.bubble-row' + (isMe ? '.me' : ''), [
        isMe ? el('div.who', { text: (SK.userName()[0] || 'A').toUpperCase() })
          : el('div.who.who-guide', [SK.guide('avatar', { size: 34, alt: L('guide.alt', 'Guide SPEAKLY') })]),
        el('div.bubble', [
          el('span.speaker', { text: isMe ? L('conversation.toi', 'Toi') : L('conversation.app', 'L\'app') }),
          el('span', { text: turn.text || turn.say }),
          turn.gloss ? el('span.tr', { text: SK.t(turn.gloss) }) : null
        ])
      ]);
      dlgBox.appendChild(row);
      var scroller = dlgBox.parentNode;
      if (scroller && scroller.scrollTo) scroller.scrollTo(0, dlgBox.scrollHeight);
      return row;
    }

    function typingThen(cb) {
      var t = el('div.bubble-row', [
        el('div.who.who-guide', [SK.guide('avatar', { size: 34, alt: L('guide.alt', 'Guide SPEAKLY') })]),
        el('div.typing', [el('i'), el('i'), el('i')])
      ]);
      dlgBox.appendChild(t);
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); cb(); }, 620);
    }

    function next() {
      state.i += 1;
      var turn = turns[state.i];
      controls.innerHTML = '';
      if (!turn) {
        dlgBox.appendChild(el('div.card-soft.mt-12.center', [
          el('div.h4', { text: L('conversation.termine', 'Dialogue terminé — bravo !') }),
          el('p.small.mt-4', { text: L('conversation.termineTxt', 'Rejoue-le en essayant d\'aller plus vite.') }),
          el('div.row.mt-12', { style: { justifyContent: 'center', gap: '8px' } }, [
            el('button.btn.btn-primary.btn-sm', { type: 'button', text: L('commun.rejouer', 'Rejouer'), onclick: function () { start(); } }),
            el('button.btn.btn-ghost.btn-sm', {
              type: 'button', text: L('commun.retour', 'Retour'),
              onclick: function () { SK.Router.replace('conversation'); }
            })
          ])
        ]));
        SK.Sfx.great();
        return;
      }
      if (turn.who === 'bot') {
        typingThen(function () {
          pushBubble(turn, false);
          if (SK.Store.get().prefs.autoSpeak !== false) SK.Speech.speak(turn.say || turn.text, {});
          setTimeout(next, 420);
        });
      } else {
        pushBubble(turn, true);
        renderMicTurn(turn);
      }
    }

    function renderMicTurn(turn) {
      var micBtn = el('button.rec-btn', {
        type: 'button', 'aria-label': L('conversation.repondre', 'Réponds'),
        onclick: function () { listen(turn, micBtn); }
      }, icon('mic', 44));
      controls.appendChild(el('div.col', { style: { alignItems: 'center', gap: '10px' } }, [
        el('div.rec-target.center', { text: turn.say || turn.text }),
        el('div.tiny.center', { text: SK.t(turn.gloss) }),
        micBtn,
        meter.node,
        hint,
        el('div.row', { style: { justifyContent: 'center', gap: '8px' } }, [
          el('button.btn.btn-ghost.btn-sm', {
            type: 'button', text: L('commun.ecouter', 'Écouter'),
            onclick: function () { SK.UI.say(turn.say || turn.text, { force: true }); }
          }),
          el('button.btn.btn-soft.btn-sm', {
            type: 'button', text: L('conversation.passer', 'Passer'),
            onclick: function () { next(); }
          })
        ])
      ]));
    }

    function listen(turn, micBtn) {
      var said = '';
      if (!SK.Speech.canRecognize()) {
        SK.UI.toast(L('record.reconIndispo', 'Reconnaissance vocale indisponible : utilise la saisie clavier.'), 'warn', 2600);
        promptManual(turn);
        return;
      }
      micBtn.classList.add('rec-on');
      meter.hot(true);
      meter.demo(true);
      hint.textContent = L('prononciation.enCours', 'Je t\'écoute…');
      SK.Audio.startMeter(function (lvl) { if (lvl >= 0) meter.set(lvl); }).catch(function () {});
      SK.Speech.startRecognition({
        onresult: function (r) {
          if (r.final) said += ' ' + r.final;
          hint.textContent = (said + ' ' + (r.interim || '')).trim() || L('prononciation.enCours', 'Je t\'écoute…');
        },
        onerror: function (e) { if (e.fatal) stop(); }
      });
      setTimeout(stop, 5000);

      function stop() {
        micBtn.classList.remove('rec-on');
        meter.demo(false);
        meter.hot(false);
        SK.Speech.stopRecognition();
        SK.Audio.stopMeter();
        evaluate(turn, said.trim());
      }
    }

    function promptManual(turn) {
      SK.UI.openSheet(function () {
        var input = el('input', {
          type: 'text', placeholder: L('conversation.taReponse', 'Ta réponse…'),
          style: { width: '100%', padding: '14px', borderRadius: '16px', border: '1.5px solid var(--line-strong)', fontSize: '15px' }
        });
        return el('div', [
          el('div.h3', { text: L('conversation.taReponseTitre', 'Écris ta réponse') }),
          el('p.small.mt-8', { text: turn.say || turn.text }),
          el('div.mt-12', [input]),
          el('button.btn.btn-primary.btn-block.mt-16', {
            type: 'button', text: L('commun.valider', 'Valider'),
            onclick: function () { var v = input.value; SK.UI.closeSheet(); evaluate(turn, v.trim()); }
          })
        ]);
      });
    }

    function evaluate(turn, said) {
      var target = turn.say || turn.text || '';
      var score = Math.round(U.ratio(said, target) * 100);
      var align = SK.alignWords(said, target);
      var kw = (turn.keywords || []).filter(function (k) { return U.words(said).indexOf(U.norm(k)) >= 0; });
      hint.textContent = said
        ? L('conversation.entendu', 'Entendu :') + ' « ' + said + ' »'
        : L('prononciation.rienEntendu', 'Je n\'ai rien entendu — réessaie en parlant plus fort.');
      var tone = score >= 75 ? 'mint' : score >= 45 ? 'amber' : 'rose';
      controls.appendChild(el('div.row.mt-12', { style: { justifyContent: 'center' } }, [
        U.badge(score + ' / 100', tone, score >= 75 ? 'check' : 'info'),
        kw.length ? U.badge(kw.length + ' ' + L('conversation.motsCles', 'mots clés trouvés'), 'violet', 'target') : null
      ]));
      SK.Store.recordSession({
        day: U.todayKey(), hour: new Date().getHours(), seconds: 20,
        score: score, xp: Math.round(score / 10), missionId: null,
        axes: {
          fluidez: Math.round(align.score * 100), pronunciation: score,
          vocabulary: score, grammar: Math.round(align.score * 100)
        },
        words: (turn.keywords || []).map(function (k) {
          return { word: k, score: kw.indexOf(k) >= 0 ? score : Math.round(score * 0.4) };
        })
      });
      SK.Store.addSecondsToday(20, null);
      if (score >= 75) SK.Sfx.ok(); else SK.Sfx.soft();
      controls.appendChild(el('button.btn.btn-primary.btn-block.mt-12', {
        type: 'button', text: L('commun.suivant', 'Suivant'),
        onclick: function () { next(); }
      }));
    }

    function start() {
      dlgBox.innerHTML = '';
      state.i = -1;
      next();
    }

    var body = el('div.screen-body', [
      el('div.mission-head', [
        el('div.flagbox', { text: dlg.emoji || '💬' }),
        el('div.grow', [el('div.h3', { text: SK.t(dlg.title) }), el('p.small', { text: SK.t(dlg.subtitle) })]),
        U.badge(dlg.level || 'A1', 'violet', 'target')
      ]),
      el('div.mt-20', [dlgBox]),
      controls,
      el('div.mt-20', [
        el('div.row', { style: { justifyContent: 'center', gap: '8px' } }, [
          el('button.btn.btn-ghost.btn-sm', {
            type: 'button', text: L('commun.rejouer', 'Rejouer'),
            onclick: function () { SK.Sfx.tap(); start(); }
          }),
          el('button.btn.btn-ghost.btn-sm', {
            type: 'button', text: L('conversation.autres', 'Autres dialogues'),
            onclick: function () { SK.Router.replace('conversation'); }
          })
        ])
      ])
    ]);

    setTimeout(start, 300);

    return el('div.screen', [
      U.topbar({ title: SK.t(dlg.title), onBack: function () { SK.Router.replace('conversation'); } }),
      body
    ]);
  }

  SK.Router.register('conversation', {
    render: render,
    unmount: function () {
      SK.Speech.stopSpeaking();
      SK.Speech.stopRecognition();
      SK.Audio.stopMeter();
      active = null;
    }
  });
  SK.Router.registerTab({ name: 'conversation', label: function () { return SK.L('conversation.tab', 'Conversation'); }, icon: 'chat' });
})(window);
