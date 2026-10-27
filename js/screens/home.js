/* ==========================================================================
   SPEAKLY — écran 6 : Accueil
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f, v) { return SK.L(k, f, v); };

  function render() {
    var st = SK.Store.get();
    var lang = SK.Store.langObj();
    var level = SK.Store.levelObj();
    var mission = SK.Store.missionOfTheDay();
    var goalMin = st.dailyMinutes || 5;
    var mins = SK.Store.minutesToday();
    var pct = SK.Store.goalPct();
    var pack = SK.Store.packFor();
    var series = SK.Store.weeklySeries();
    var weekSeconds = U.sum(series.map(function (s) { return s.seconds; }));
    var weekMissions = U.sum(series.map(function (s) { return s.missions; }));
    var initial = (SK.userName()[0] || 'A').toUpperCase();

    /* ---- salutation ---- */
    var header = el('div.screen-pad', { style: { paddingTop: '4px' } }, [
      el('div.row-between', [
        el('div.grow', [
          el('div.hello', { html: SK.escapeHtml(SK.greeting()) + ' <span class="wave">🎉</span>' }),
          el('div.row.wrap.mt-8', [
            el('span.lang-pill', [SK.flag(lang ? lang.code : '', { size: 20, flag: lang ? lang.flag : '🌍', label: lang ? lang.native : '' }), el('span', { text: (lang ? lang.fr : '').toUpperCase() + ' · ' + (level ? level.code : '') })]),
            el('span.streak-pill', [icon('fire', 13), el('span', { text: L('resultats.joursDeSuite', (st.progress.streak || 0) + ' jours de suite', { n: st.progress.streak || 0 }) })])
          ])
        ]),
        el('button.avatar', {
          type: 'button', 'aria-label': L('profil.titre', 'Profil'), text: initial,
          onclick: function () { SK.Sfx.tap(); SK.Router.go('profile'); }
        })
      ])
    ]);

    /* ---- carte mission (écran 6 : bloc violet) ---- */
    var hero = el('div.screen-pad', { style: { marginTop: '14px' } }, [
      el('div.card-violet', [
        el('div.mission-hero', [
          el('div.mic-orb', icon('mic', 34)),
          el('div.hero-label', { text: 'SPEAK ' + goalMin }),
          el('p', { style: { fontSize: '12.5px', fontWeight: '650', color: 'rgba(255,255,255,.88)', marginTop: '-2px' }, text: L('accueil.parle', 'Parle ' + (lang ? lang.fr : 'la langue') + ' pendant ' + goalMin + ' minutes aujourd\'hui.', Object.assign(SK.vars(), { n: goalMin, langue: lang ? lang.fr : '' })) }),
          el('div.hero-time', { text: U.fmtClock(Math.max(0, goalMin * 60)) }),
          el('button.btn.btn-block', {
            type: 'button',
            style: { background: '#fff', color: 'var(--violet-800)', marginTop: '4px' },
            text: L('commun.commencer', 'Commencer'),
            onclick: function () {
              SK.Sfx.start();
              if (mission) SK.Router.go('mission', { id: mission.id });
              else SK.Router.go('record', { mode: 'speak' });
            }
          })
        ])
      ])
    ]);

    /* ---- mission du jour ---- */
    var missionBlock = mission ? el('div', [
      U.sectionTitle(L('accueil.missionDuJour', 'Mission du jour'), el('button.link', {
        type: 'button', text: L('accueil.voirMission', 'Voir la mission'), onclick: function () { SK.Router.go('mission', { id: mission.id }); }
      })),
      el('div.card.card-shadow', {
        role: 'button', tabindex: '0', style: { cursor: 'pointer' },
        onclick: function () { SK.Sfx.tap(); SK.Router.go('mission', { id: mission.id }); }
      }, [
        el('div.row', [
          el('div', { style: { width: '46px', height: '46px', borderRadius: '15px', background: 'var(--violet-50)', display: 'grid', placeItems: 'center', fontSize: '23px', flex: '0 0 46px' } }, [el('span', { text: mission.emoji || '🎯' })]),
          el('div.grow', [
            el('div.h3', { text: SK.t(mission.title) }),
            el('p.small', { text: SK.t(mission.subtitle) })
          ]),
          icon('chevron', 18, 'ink-300')
        ]),
        el('div.row.wrap.mt-12', [
          U.badge(SK.t(mission.topic), 'violet', 'target'),
          U.badge((mission.minutes || 5) + ' min', 'amber', 'clock'),
          U.badge((mission.questions || []).length + ' ' + L('mission.questions', 'questions'), 'mint', 'chat')
        ])
      ])
    ]) : U.emptyState('🌍', L('mission.vide', 'Pas encore de mission'), L('accueil.premiereFois', 'Les missions guidées arrivent bientôt dans cette langue. Tu peux déjà t’entraîner à la prononciation et aux dialogues.'), el('button.btn.btn-primary', {
      type: 'button', text: L('prononciation.titre', 'Prononciation'), onclick: function () { SK.Router.go('pronounce'); }
    }));

    /* ---- cette semaine ---- */
    var week = el('div.week-card', [
      el('div.row-between', [
        el('div.row', [
          SK.picto('calendrier', { size: 22, alt: '', fallback: '📅' }),
          el('div.tiny.strong', { text: L('accueil.cetteSemaine', 'Cette semaine') })
        ]),
        el('span.tiny.violet.strong', { text: mins + ' / ' + goalMin + ' min' })
      ]),
      el('div.week-stats', { style: { marginTop: '12px' } }, [
        el('div.ws', [el('b', { text: Math.round(weekSeconds / 60) + ' min' }), el('small', { text: L('accueil.minutesParlees', 'minutes parlées') })]),
        el('div.ws', [el('b', { text: weekMissions + ' / 7' }), el('small', { text: L('accueil.missions', 'missions') })]),
        el('div.ws', [el('b', { text: SK.Store.wordsKnownCount() + '' }), el('small', { text: L('accueil.motsAppris', 'mots appris') })])
      ]),
      SK.Charts.weekBars(series),
      el('div.mt-12', [
        el('div.row-between', { style: { marginBottom: '6px' } }, [
          el('span.tiny', { text: L('accueil.objectifAtteint', 'Objectif du jour') }),
          el('span.tiny.violet.strong', { text: mins + ' / ' + goalMin + ' min' })
        ]),
        U.bar(pct * 100)
      ])
    ]);

    /* ---- révision espacée : les mots ratés reviennent au bon moment ---- */
    var words = SK.Store.wordStatsSummary();
    var reviewBlock = el('div', [
      U.sectionTitle(L('revision.titre', 'Mes mots'),
        el('button.link', {
          type: 'button', text: L('revision.lexique', 'Mon lexique'),
          onclick: function () { SK.Router.go('review', { mode: 'lexique' }); }
        })),
      el('button.card.card-shadow', {
        type: 'button', style: { width: '100%', textAlign: 'left', display: 'block' },
        onclick: function () { SK.Sfx.tap(); SK.Router.go('review', {}); }
      }, [
        el('div.row', [
          el('div', { style: { width: '46px', height: '46px', borderRadius: '15px', background: words.due ? 'var(--rose-100)' : 'var(--mint-100)', display: 'grid', placeItems: 'center', fontSize: '22px', flex: '0 0 46px' } }, [
            el('span', { text: words.due ? '🔁' : '🏅' })
          ]),
          el('div.grow', [
            el('div.h3', { text: words.due ? L('revision.due', words.due + ' mots à revoir', { n: words.due }) : L('revision.rien', 'Rien à réviser') }),
            el('p.small', { text: L('revision.sousTitre', 'Les mots ratés reviennent au bon moment : J+1, J+3, J+7, J+21.') })
          ]),
          icon('chevron', 18, 'ink-300')
        ]),
        el('div.mt-12', [
          el('div.stat-grid', [
            U.statTile(words.mastered, L('revision.motsMaitrises', words.mastered + ' maîtrisés', { n: words.mastered }), '🏅'),
            U.statTile(words.learning, L('revision.motsEnCours', words.learning + ' en cours', { n: words.learning }), '📈'),
            U.statTile(words.total, L('revision.statsMots', 'Mes mots'), '📚')
          ])
        ])
      ])
    ]);

    /* ---- raccourcis ---- */
    var shortcuts = el('div.shortcut-grid', [
      shortcut('wave', 'rose', L('prononciation.titre', 'Prononciation'), L('prononciation.sousTitre', 'Entraîne les sons difficiles'), 'pronounce'),
      shortcut('mic', 'mint', L('libre.titre', 'Parler libre'), L('libre.sousTitre', '3 minutes sans script, juste toi'), 'free'),
      shortcut('chat', '', L('conversation.titre', 'Conversation'), L('conversation.sousTitre', 'Dialogue guidé, tour par tour'), 'conversation'),
      shortcut('trend', 'sky', L('progression.titre', 'Progression'), L('progression.cetteSemaine', 'Ta courbe et tes badges'), 'progress')
    ]);

    var body = el('div.screen-body', [
      missionBlock,
      el('div.mt-20', [reviewBlock]),
      el('div.mt-20', [U.sectionTitle(L('accueil.cetteSemaine', 'Cette semaine')), week]),
      el('div.mt-20', [U.sectionTitle(L('mission.astuce', 'Entraînements rapides')), shortcuts]),
      el('p.tiny.center.mt-24', { text: L('splash.tagline', 'SPEAKLY — Learn less. Speak more.') })
    ]);

    return el('div.screen', [header, hero, body]);
  }

  function shortcut(ico, tone, title, sub, screen) {
    return el('button.shortcut' + (tone ? '.' + tone : ''), {
      type: 'button', onclick: function () { SK.Sfx.tap(); SK.Router.go(screen); }
    }, [
      el('div.ico', icon(ico, 18)),
      el('div', [el('b', { text: title }), el('small', { text: sub })])
    ]);
  }

  SK.Router.register('home', { render: render });
  SK.Router.registerTab({ name: 'home', label: function () { return SK.L('nav.accueil', 'Accueil'); }, icon: 'home' });
})(window);
