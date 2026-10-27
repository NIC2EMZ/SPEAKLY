/* ==========================================================================
   SPEAKLY — onglet Progression : courbe, heatmap 12 semaines, badges, lexique
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f) { return SK.L(k, f); };

  function render() {
    var st = SK.Store.get();
    var p = st.progress;
    var sessions = p.sessions || [];
    var series = SK.Store.weeklySeries();
    var weekSeconds = U.sum(series.map(function (s) { return s.seconds; }));
    var weekMissions = U.sum(series.map(function (s) { return s.missions; }));
    var scoreList = sessions.slice(-12).map(function (s) { return s.score || 0; });
    var knownWords = Object.keys(p.wordsKnown || {});
    var lastAxes = sessions.length ? (sessions[sessions.length - 1].axes || {}) : {};

    var badged = SK.badgesEarned();
    var unlocked = badged.filter(function (b) { return b.unlocked; });

    var head = el('div.screen-pad', { style: { paddingTop: '8px' } }, [
      el('div.row-between', [
        el('div', [
          el('h1.h2', { text: L('progression.titre', 'Progression') }),
          el('p.sub.mt-4', { text: L('progression.sousTitre', 'Ta régularité, en chiffres.') })
        ]),
        el('button.icon-btn', {
          type: 'button', 'aria-label': L('profil.titre', 'Profil'),
          onclick: function () { SK.Router.go('profile'); }
        }, icon('settings', 20))
      ])
    ]);

    /* ---- anneau principal : objectif de la semaine ---- */
    var weeklyGoal = (st.dailyMinutes || 5) * 7;
    var weekPct = U.clamp((weekSeconds / 60) / weeklyGoal * 100, 0, 100);
    var ringCard = el('div.ring-card', [
      SK.UI.scoreRing(weekPct, L('progression.semaine', 'de l\'objectif')),
      el('div.grow', [
        el('div.h3', { text: Math.round(weekSeconds / 60) + ' ' + L('progression.minutes', 'minutes') }),
        el('p.small', { text: L('progression.objectifHebdo', 'Objectif hebdo : ') + weeklyGoal + ' min' }),
        el('div.row.mt-8', [
          U.badge((p.streak || 0) + ' ' + L('commun.jours', 'jours'), 'amber', 'fire'),
          U.badge(L('progression.record', 'Record') + ' ' + (p.bestStreak || 0), 'violet', 'trophy')
        ])
      ])
    ]);

    /* ---- tuiles clés ---- */
    var tiles = el('div.stat-grid.mt-16', [
      U.statTile(SK.Store.totalMinutes(), L('progression.tempsTotal', 'min au total'), '⏱️'),
      U.statTile(weekMissions + ' / 7', L('progression.missions', 'missions'), '🎯'),
      U.statTile(knownWords.length, L('progression.mots', 'mots appris'), '📚')
    ]);

    /* ---- courbe des scores ---- */
    var line = el('div.card.mt-16', [
      el('div.row-between', [
        el('div.h3', { text: L('progression.courbe', 'Score par séance') }),
        el('span.tiny', { text: sessions.length + ' ' + L('progression.seances', 'séances') })
      ]),
      SK.Charts.scoreLine(scoreList, 300, 76),
      el('div.row-between.mt-8', [
        el('span.tiny', { text: L('progression.moyenne', 'Moyenne') }),
        el('span.small.strong', { text: SK.Store.averageScore() + ' / 100' })
      ])
    ]);

    /* ---- axes de la dernière séance ---- */
    var axesCard = el('div.card.mt-16', [
      el('div.h3', { text: L('progression.axes', 'Tes points forts') }),
      el('div.mt-8', [
        axisLine(L('resultats.fluidite', 'Fluidité'), lastAxes.fluidez || 0, 'mint'),
        axisLine(L('resultats.prononciation', 'Prononciation'), lastAxes.pronunciation || 0, ''),
        axisLine(L('resultats.vocabulaire', 'Vocabulaire'), lastAxes.vocabulary || 0, 'amber'),
        axisLine(L('resultats.grammaire', 'Grammaire'), lastAxes.grammar || 0, 'rose')
      ])
    ]);

    /* ---- heatmap 12 semaines ---- */
    var days = [];
    for (var i = 83; i >= 0; i--) {
      var day = U.dayKeyOffset(-i);
      var rec = SK.Store.dayRecord(day);
      days.push({ day: day, seconds: rec.seconds, today: i === 0 });
    }
    var heatCard = el('div.card.mt-16', [
      el('div.row-between', [
        el('div.row', [
          SK.picto('calendrier', { size: 22, alt: '', fallback: '📅' }),
          el('div.h3', { text: L('progression.activite', 'Activité 12 semaines') })
        ]),
        el('span.tiny', { text: SK.Store.activeDays() + ' ' + L('progression.joursActifs', 'jours actifs') })
      ]),
      el('div.mt-12', [SK.Charts.heatmap(days)])
    ]);

    /* ---- objectifs travaillés ---- */
    var objectives = st.objectives || [];
    var missionSessions = sessions.filter(function (s) { return s.missionId; }).length;
    var objItems = objectives.map(function (id) {
      var o = (SK.CONTENT.objectives || []).filter(function (x) { return x.id === id; })[0] || { fr: id, color: '#6C4BE8' };
      return {
        label: o.fr,
        value: Math.max(1, Math.round(missionSessions / Math.max(1, objectives.length))),
        suffix: ' ' + L('progression.seances', 'séances'),
        color: o.color
      };
    });
    var objCard = objItems.length ? el('div.card.mt-16', [
      el('div.h3', { text: L('progression.objectifs', 'Objectifs travaillés') }),
      el('div.mt-12', [SK.Charts.distribution(objItems)])
    ]) : null;

    /* ---- lexique ---- */
    var wordSummary = SK.Store.wordStatsSummary();
    var wordsCard = el('div.card.mt-16', [
      el('div.row-between', [
        el('div.h3', { text: L('revision.lexique', 'Mon lexique') }),
        el('span.tiny', { text: knownWords.length + ' ' + L('progression.mots', 'mots') })
      ]),
      el('div.stat-grid.mt-12', [
        U.statTile(wordSummary.mastered, L('revision.motsMaitrises', wordSummary.mastered + ' maîtrisés', { n: wordSummary.mastered }), '🏅'),
        U.statTile(wordSummary.learning, L('revision.motsEnCours', wordSummary.learning + ' en cours', { n: wordSummary.learning }), '📈'),
        U.statTile(wordSummary.due, L('revision.aRevoir', 'À revoir'), '🔁')
      ]),
      knownWords.length ? el('div.vocab-wrap.mt-12', knownWords.slice(-30).map(function (w) {
        var sc = (p.wordsKnown || {})[w] || 0;
        return el('button.vocab' + (sc >= 75 ? '.is-spoken' : ''), {
          type: 'button', text: w,
          onclick: function () { SK.UI.say(w, { force: true }); }
        });
      })) : el('p.small.mt-8', { text: L('progression.lexiqueVide', 'Tes mots apparaîtront ici après ta première séance.') }),
      el('button.btn.btn-soft.btn-block.mt-12', {
        type: 'button', text: wordSummary.due ? L('revision.commencer', 'Commencer la révision') : L('revision.lexique', 'Mon lexique'),
        onclick: function () { SK.Sfx.tap(); SK.Router.go('review', wordSummary.due ? {} : { mode: 'lexique' }); }
      })
    ]);

    /* ---- badges ---- */
    var badgeList = el('div.list');
    badged.forEach(function (b) {
      badgeList.appendChild(el('div.achv' + (b.unlocked ? '' : '.locked'), [
        el('div.medal', { text: b.unlocked ? b.badge.emoji : '🔒' }),
        el('div.grow', [
          el('b', { text: SK.t(b.badge.title) }),
          el('p', { text: SK.t(b.badge.text) })
        ]),
        b.at ? el('span.tiny', { text: new Date(b.at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) }) : null
      ]));
    });
    var badgesCard = el('div.mt-24', [
      U.sectionTitle(L('progression.badges', 'Badges'),
        el('span.tiny', { text: unlocked.length + ' / ' + badged.length })),
      badgeList
    ]);

    var body = el('div.screen-body', [
      ringCard, tiles, line, axesCard, heatCard, objCard, wordsCard, badgesCard,
      el('div.mt-24', [
        el('button.btn.btn-primary.btn-block', {
          type: 'button', text: L('accueil.missionDuJour', 'Mission du jour'),
          onclick: function () { SK.Sfx.start(); SK.Router.go('mission', {}); }
        }),
        el('button.btn.btn-ghost.btn-block.mt-12', {
          type: 'button', text: L('progression.exporter', 'Exporter mes données'),
          onclick: function () { if (SK.Store.exportData) SK.Store.exportData(); }
        })
      ])
    ]);

    return el('div.screen', [head, body]);
  }

  function axisLine(label, value, tone) {
    return el('div.analysis-row', [
      el('span.k', { text: label }),
      U.bar(value, tone),
      el('span.v', { text: U.round1(value / 10).toFixed(1) + ' / 10' })
    ]);
  }

  SK.Router.register('progress', { render: render });
  SK.Router.registerTab({ name: 'progress', label: function () { return SK.L('progression.tab', 'Progrès'); }, icon: 'chart' });
})(window);
