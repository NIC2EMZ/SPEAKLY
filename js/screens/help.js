/* ==========================================================================
   SPEAKLY — écran 8 : Aide (« Je ne sais pas quoi dire ? »)
   Réutilise les cartes d'aide définies dans mission.js (SK.HelpCards).
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f) { return SK.L(k, f); };

  SK.Router.register('help', {
    render: function (params) {
      var chapter = (params && params.id && SK.Store.missionById(params.id)) || SK.Store.missionOfTheDay();
      if (!chapter) {
        return el('div.screen', [
          U.topbar({ title: L('aide.titre', 'Aide') }),
          el('div.screen-body', [
            U.emptyState(SK.guide('avatar', { size: 84, alt: L('guide.alt', 'Guide SPEAKLY') }), L('aide.titre', 'Rien à expliquer'),
              L('aide.sousTitre', 'Choisis d’abord une mission, puis reviens ici.'),
              el('button.btn.btn-primary', {
                type: 'button', text: L('commun.retour', 'Retour'),
                onclick: function () { SK.Router.replace('home'); }
              }))
          ])
        ]);
      }

      var questions = chapter.questions || [];
      var idx = U.clamp(parseInt((params && params.q) || '0', 10) || 0, 0, Math.max(0, questions.length - 1));
      var tabsBox = el('div.help-tabs');
      var cardsBox = el('div.mt-16');

      questions.forEach(function (qq, i) {
        tabsBox.appendChild(el('button' + (i === idx ? '.is-on' : ''), {
          type: 'button', text: 'Q' + (qq.n || i + 1), 'aria-label': 'Question ' + (qq.n || i + 1),
          onclick: function () { SK.Sfx.tap(); SK.Router.replace('help', { id: chapter.id, q: i }); }
        }));
      });

      var cards = SK.HelpCards.build(chapter, questions[idx], {
        onUse: function (sentence) {
          SK.Store.saveDraft({ missionId: chapter.id, seed: sentence });
          SK.UI.toast(L('aide.phrasePrete', 'Phrase prête : à toi de la dire !'), 'ok');
          SK.Router.go('record', { mission: chapter.id, q: idx });
        }
      });
      cards.forEach(function (c) { cardsBox.appendChild(c); });
      if (cards[0]) cards[0].classList.add('open');

      var body = el('div.screen-body', [
        el('div.row', [
          SK.guide('avatar', { size: 54, alt: L('guide.alt', 'Guide SPEAKLY') }),
          el('div.grow', [
            el('h1.h2', { text: L('mission.jeNeSaisPas', 'Je ne sais pas quoi dire ?') }),
            el('p.sub.mt-4', { text: L('aide.sousTitre', 'On y va étape par étape. Tu es capable !') })
          ])
        ]),
        el('div.mt-16', tabsBox),
        cardsBox,
        el('div.help-cta', [
          el('div.h4', { text: L('enregistrement.pret', 'Prêt ? Respire, puis parle.') }),
          el('p.small.mt-4', { text: L('enregistrement.microAide', 'Pas besoin d’être parfait : l’important est de produire une phrase entière.') }),
          el('button.btn.btn-primary.btn-block.mt-12', {
            type: 'button', text: L('aide.maintenant', 'Maintenant, essaie avec tes propres mots'),
            onclick: function () { SK.Sfx.start(); SK.Router.go('record', { mission: chapter.id, q: idx }); }
          })
        ]),
        el('button.btn.btn-ghost.btn-block.mt-12', {
          type: 'button', text: L('commun.retour', 'Revenir à la mission'),
          onclick: function () { SK.Router.replace('mission', { id: chapter.id }); }
        })
      ]);

      return el('div.screen', [
        U.topbar({ title: SK.t(chapter.title), onBack: function () { SK.Router.replace('mission', { id: chapter.id }); } }),
        body
      ]);
    }
  });
})(window);
