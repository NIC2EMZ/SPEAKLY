/* ==========================================================================
   SPEAKLY — écran 7 : Mission du jour (routine + questions + mots utiles)
   --------------------------------------------------------------------------
   Ce fichier expose aussi SK.HelpCards, les cartes d'aide « étape par étape »
   réutilisées par l'écran Aide (js/screens/help.js).
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f) { return SK.L(k, f); };

  /** Carte d'aide dépliable. */
  function helpCard(ico, title, sub, bodyChildren) {
    var item = el('div.help-item', [
      el('button.help-head', {
        type: 'button',
        onclick: function () {
          var open = item.classList.contains('open');
          item.classList.toggle('open');
          if (!open) SK.Sfx.tap();
        }
      }, [
        el('span.help-ico', icon(ico, 19)),
        el('div.grow', [el('div.hh', { text: title }), el('div.hs', { text: sub })]),
        el('span.caret', icon('chevron', 18))
      ]),
      el('div.help-body', bodyChildren)
    ]);
    return item;
  }

  /** Les 4 étapes d'aide d'une question (écran 8 de la maquette). */
  function helpCards(chapter, q, opts) {
    opts = opts || {};
    var cards = [];

    /* 1. Indice */
    cards.push(helpCard('bulb', L('aide.indice', '1. Indice'),
      L('aide.indiceSous', 'Pars de l\'idée principale de la phrase.'),
      [
        el('p', { text: SK.t(q && q.hint) || L('aide.indiceFallback', 'Pense au verbe : sa place change selon la phrase.') }),
        chapter && chapter.tip ? el('span.ex', { text: SK.t(chapter.tip) }) : null
      ]));

    /* 2. Mots utiles */
    var wordList = (q && q.words) || [];
    cards.push(helpCard('book', L('aide.motsUtiles', '2. Mots utiles'),
      L('aide.motsUtilesSous', 'Les mots dont tu as besoin maintenant.'),
      [
        el('div.vocab-wrap', wordList.map(function (w) {
          return U.vocabChip(w.word, w.article, w.translation, function (word) {
            SK.UI.say(word, { force: true });
            SK.UI.toast(word + ' — ' + w.translation, 'ok', 1500);
          });
        })),
        el('p.small.mt-12', { text: L('aide.motsAstuce', 'Appuie sur un mot pour l\'écouter.') })
      ]));

    /* 3. Début de phrase */
    var starter = (q && q.answerAlt && q.answerAlt[0]) || (q && q.target) || '';
    cards.push(helpCard('chat', L('aide.debutPhrase', '3. Début de phrase'),
      L('aide.debutPhraseSous', 'Normalement je commence ainsi…'),
      [
        el('p.strong', { style: { fontSize: '15px', color: 'var(--ink-900)' }, text: starter }),
        el('p.small.mt-8', { text: SK.t(q && q.targetGloss) }),
        el('button.btn.btn-soft.btn-sm.mt-12', {
          type: 'button', text: L('aide.utiliser', 'Utiliser cette phrase'),
          onclick: function () { if (opts.onUse) opts.onUse(starter); }
        })
      ]));

    /* 4. Exemple */
    cards.push(helpCard('star', L('aide.exemple', '4. Exemple'),
      L('aide.exempleSous', 'Écoute un exemple complet, puis lance-toi.'),
      [
        el('p.strong', { style: { fontSize: '15px' }, text: SK.t(q && q.example) || (q && q.target) || '' }),
        el('button.btn.btn-ghost.btn-sm.mt-12', {
          type: 'button',
          onclick: function () { SK.UI.say(SK.t(q && q.example) || (q && q.target) || '', { force: true }); }
        }, [icon('volume', 16), el('span', { text: L('commun.ecouter', 'Écouter') })])
      ]));

    return cards;
  }

  /* ======================= Écran Mission du jour ======================= */
  SK.Router.register('mission', {
    render: function (params) {
      var st = SK.Store.get();
      var chapter = (params && params.id && SK.Store.missionById(params.id)) || SK.Store.missionOfTheDay();

      if (!chapter) {
        return el('div.screen', [
          U.topbar({ title: L('mission.titre', 'Mission du jour') }),
          el('div.screen-body', [
            U.emptyState('🌍', L('mission.aucune', 'Aucune mission disponible'),
              L('mission.aucuneTxt', 'Change de langue ou reviens plus tard : du contenu arrive régulièrement.'),
              el('button.btn.btn-primary', {
                type: 'button', text: L('langue.changer', 'Changer de langue'),
                onclick: function () { SK.Router.go('profile'); }
              }))
          ])
        ]);
      }

      var lang = SK.Store.langObj();
      var draft = (st.draft && st.draft.missionId === chapter.id) ? st.draft : { missionId: chapter.id, answers: {} };
      var answered = Object.keys(draft.answers || {}).length;
      var questions = chapter.questions || [];

      /* ---- en-tête : langue + routine ---- */
      var head = el('div.screen-pad', [
        el('div.mission-head', [
          el('div.flagbox', [SK.flag(lang ? lang.code : '', { size: 34, flag: lang ? lang.flag : '🌍', label: lang ? lang.native : '' })]),
          el('div.grow', [
            el('div.h3', { text: SK.t(chapter.title) }),
            el('p.small', { text: SK.t(chapter.routine) })
          ]),
          U.speakBtn(function () { return SK.t(chapter.title); })
        ]),
        el('p.small.mt-12', { text: SK.t(chapter.situation) }),
        el('div.progress-strip.mt-16', [
          icon('target', 16),
          U.bar((answered / Math.max(1, questions.length)) * 100),
          el('span.tiny.strong', { text: answered + '/' + questions.length, title: L('mission.question', 'Question', { n: answered || 1 }) })
        ])
      ]);

      /* ---- les 5 questions ---- */
      var list = el('div.list');
      questions.forEach(function (q, i) {
        var done = draft.answers && draft.answers[q.id];
        list.appendChild(el('button.qrow' + (done ? '.is-done' : ''), {
          type: 'button',
          onclick: function () { SK.Sfx.tap(); SK.Router.go('record', { mission: chapter.id, q: i }); }
        }, [
          el('span.n', { text: done ? '✓' : String(q.n || i + 1) }),
          el('div.grow', [
            el('div.t', { text: SK.t(q.text) }),
            el('div.tiny', { style: { marginTop: '3px' }, text: (q.time ? q.time + ' · ' : '') + SK.t(q.gloss) })
          ]),
          el('span.go', icon('chevron', 16))
        ]));
      });

      /* ---- mots utiles ---- */
      var vocab = el('div.vocab-wrap', (chapter.vocabulary || []).map(function (w) {
        return U.vocabChip(w.word, w.article, w.translation, function (word) {
          SK.UI.say(word, { force: true });
          SK.UI.toast(word + ' — ' + w.translation, 'ok', 1600);
        });
      }));

      /* ---- « je ne sais pas quoi dire ? » ---- */
      var stuck = el('div.practice-hint', [
        SK.guide('avatar', { size: 44, alt: L('guide.alt', 'Guide SPEAKLY') }),
        el('div.grow', [
          el('b', { text: L('mission.jeNeSaisPas', 'Je ne sais pas quoi dire ?') }),
          el('p', { text: L('mission.pereTxt', 'Clique sur le bouton pour obtenir des indices, des mots et un exemple.') })
        ]),
        el('button.btn.btn-primary.btn-sm', {
          type: 'button', text: L('mission.aideMoi', 'Aide-moi'),
          onclick: function () { SK.Sfx.pop(); SK.Router.go('help', { id: chapter.id, q: 0 }); }
        })
      ]);

      var body = el('div.screen-body', [
        el('div.mt-20', [
          U.sectionTitle(L('mission.questions', 'Questions'),
            U.badge(questions.length + ' ' + L('mission.etapes', 'étapes'), 'violet', 'wave'))
        ]),
        list,
        el('div.mt-24', [
          U.sectionTitle(L('mission.motsUtiles', 'Mots utiles'),
            el('span.tiny', { text: L('mission.tapEcouter', 'Appuie pour écouter') }))
        ]),
        vocab,
        el('div.mt-20', [stuck]),
        el('button.btn.btn-primary.btn-lg.btn-block.mt-24', {
          type: 'button',
          text: answered ? L('mission.finir', 'Terminer la séance') : L('mission.commencer', 'Commencer la séance'),
          onclick: function () {
            SK.Sfx.start();
            if (answered) SK.Router.go('results', { mission: chapter.id, mode: 'mission' });
            else SK.Router.go('record', { mission: chapter.id, q: 0 });
          }
        }),
        el('button.btn.btn-ghost.btn-block.mt-12', {
          type: 'button', text: L('aide.titre', 'Aide'),
          onclick: function () { SK.Router.go('help', { id: chapter.id, q: 0 }); }
        })
      ]);

      return el('div.screen', [
        U.topbar({ title: L('mission.titre', 'Mission du jour'), onBack: function () { SK.Router.replace('home'); } }),
        head,
        body
      ]);
    }
  });

  global.SK.HelpCards = { build: helpCards, card: helpCard };
})(window);
