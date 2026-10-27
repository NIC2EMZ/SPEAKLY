/* ==========================================================================
   SPEAKLY — écrans 2 à 5 : Bienvenue, Choisir sa langue, Niveau, Objectif
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon, L = function (k, f) { return SK.L(k, f); };

  /* ---------- trame commune d'onboarding ---------- */
  /** Icône d'un objectif : visuel illustré quand on en a un (travail, études), sinon pictogramme SVG. */
  function objectiveIcon(o) {
    if (o.icon === 'brief' && SK.Assets.pictoSrc('travail')) {
      return SK.picto('travail', { size: 22, alt: o.fr, fallback: '💼' });
    }
    if (o.icon === 'doc' && SK.Assets.pictoSrc('etudes')) {
      return SK.picto('etudes', { size: 22, alt: o.fr, fallback: '🎓' });
    }
    return icon(o.icon, 19);
  }

  function frame(opts) {
    var screen = el('div.screen', [
      el('div.topbar', [
        opts.onBack ? el('button.icon-btn', { type: 'button', 'aria-label': 'Retour', onclick: opts.onBack }, icon('back', 22)) : el('div', { style: { width: '40px' } }),
        el('div.topbar-spacer'),
        opts.step !== undefined ? U.dots(4, opts.step) : null
      ]),
      el('div.screen-body', opts.body),
      opts.cta ? el('div.screen-cta', opts.cta) : null
    ]);
    return screen;
  }

  /* ======================= 2. Bienvenue / Onboarding ======================= */
  SK.Router.register('onboarding', {
    render: function () {
      var illu = el('div.onboard-illu', [
        el('div.avatar-ring', [
          SK.guide('avatar', { size: 168, eager: true, alt: L('guide.alt', 'Guide SPEAKLY') })
        ]),
        el('div.bubble.b1', { text: 'Hallo!' }),
        el('div.bubble.b2', { text: 'Hello!' }),
        el('div.bubble.b3', { text: '¡Hola!' })
      ]);
      var body = el('div', { style: { padding: '4px 0 0' } }, [
        illu,
        el('h1.h1.center.mt-20', { html: L('onboarding.bienvenue', 'Bienvenue sur <span class="violet">SPEAKLY</span> 👋') }),
        el('p.sub.center.mt-12', { text: L('onboarding.pitch1', "L'objectif n'est pas seulement de comprendre une langue.") }),
        el('p.center.strong', { style: { fontSize: '16px', color: 'var(--violet-800)', marginTop: '6px' }, text: L('onboarding.pitch2', "L'objectif est de pouvoir LA PARLER.") }),
        el('div.card-soft.mt-24', [
          el('div.row', [icon('mic', 20), el('div.h4', { text: L('onboarding.card1Titre', 'Tu parles dès la 1re minute') })]),
          el('p.small.mt-4', { text: L('onboarding.card1Txt', "Chaque séance est un enregistrement guidé : l'app te dit quoi dire, tu le dis.") }),
          el('div.divider'),
          el('div.row', [icon('clock', 20), el('div.h4', { text: L('onboarding.card2Titre', '5 minutes par jour') })]),
          el('p.small.mt-4', { text: L('onboarding.card2Txt', 'Mieux vaut parler 5 minutes chaque jour que réviser 1 heure une fois par semaine.') })
        ]),
        el('p.tiny.center.mt-16', { text: L('onboarding.note', 'Tu pourras changer de langue, de niveau et d’objectifs à tout moment.') })
      ]);
      return frame({
        step: 0,
        body: body,
        cta: el('div', [
          el('button.btn.btn-primary.btn-lg.btn-block', {
            type: 'button', text: L('commun.commencer', 'Commencer'),
            onclick: function () { SK.Sfx.pop(); SK.Router.go('language'); }
          }),
          el('p.tiny.center.mt-12', { text: L('onboarding.etape', 'Étape 1 sur 3 pour personnaliser ton expérience', { n: 1, total: 3 }) })
        ])
      });
    }
  });

  /* ======================= 3. Choisir sa langue ======================= */
  SK.Router.register('language', {
    render: function () {
      var st = SK.Store.get();
      var current = st.lang;
      var grid = el('div.lang-grid');
      var langs = SK.CONTENT.languages.filter(function (l) { return !l.extra; });
      var available = {};
      langs.forEach(function (l) {
        available[l.code] = SK.Store.packFor(l.code).hasMissions;
      });

      langs.forEach(function (l) {
        var btn = el('button.lang' + (l.code === current ? '.is-on' : ''), {
          type: 'button', dataset: { code: l.code },
          onclick: function () {
            SK.Sfx.tap();
            U.$$('.lang', grid).forEach(function (n) { n.classList.remove('is-on'); });
            btn.classList.add('is-on');
            current = l.code;
            var ui = l.ui;
            SK.Store.set({ lang: l.code, ui: ui }, 'lang');
            SK.UI.toast(l.flag + ' ' + l.native + (available[l.code] ? '' : ' — ' + L('langue.changer', 'contenu à venir')), available[l.code] ? 'ok' : 'warn');
          }
        }, [
          SK.flag(l.code, { size: 26, flag: l.flag, label: l.native }),
          el('span', { text: l.native }),
          el('span.check', icon('check', 11))
        ]);
        if (!available[l.code]) btn.title = L('langue.changer', 'Contenu à venir');
        grid.appendChild(btn);
      });

      var info = el('p.small.mt-12', { text: L('langue.interfaceSousTitre', 'Les missions guidées sont disponibles en allemand ; les autres langues arrivent progressivement.') });

      var body = el('div', { style: { paddingTop: '2px' } }, [
        el('h1.h1', { text: L('langue.titre', 'Quelle langue veux-tu parler ?') }),
        el('p.sub.mt-8', { text: L('langue.sousTitre', 'Choisis une langue principale pour personnaliser ton expérience.') }),
        el('div.mt-20', grid),
        info
      ]);

      return frame({
        step: 1,
        onBack: function () { SK.Router.replace('onboarding'); },
        body: body,
        cta: el('div', [
          el('button.btn.btn-primary.btn-lg.btn-block', {
            type: 'button', text: L('commun.continuer', 'Continuer'),
            onclick: function () { SK.Sfx.pop(); SK.Router.go('level'); }
          })
        ])
      });
    }
  });

  /* ======================= 4. Niveau ======================= */
  SK.Router.register('level', {
    render: function () {
      var st = SK.Store.get();
      var current = st.level;
      var list = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '9px' } });

      SK.CONTENT.levels.forEach(function (lv) {
        var b = el('button.choice' + (lv.code === current ? '.is-on' : ''), {
          type: 'button',
          onclick: function () {
            SK.Sfx.tap();
            U.$$('.choice', list).forEach(function (n) { n.classList.remove('is-on'); });
            b.classList.add('is-on');
            current = lv.code;
            SK.Store.set({ level: lv.code }, 'level');
          }
        }, [
          el('span.radio'),
          el('div', [el('div.c-main', { text: lv.label }), el('div.c-sub', { text: lv.sub })])
        ]);
        list.appendChild(b);
      });

      var unsure = el('div.choice', {
        role: 'button', tabindex: '0',
        style: { cursor: 'pointer' },
        onclick: function () {
          SK.Sfx.pop();
          SK.UI.openSheet(function () {
            return el('div', [
              el('div.h3', { text: L('niveau.test', 'Petit test express') }),
              el('p.small.mt-8', { text: L('niveau.test', 'Réponds à 3 questions rapides pour estimer ton niveau. Tu pourras le modifier ensuite.') }),
              el('div.card-soft.mt-16', [
                el('div.h4', { text: '1. « Ich heiße Alex. »' }),
                el('p.small', { text: L('niveau.test', 'Que viens-tu de dire ?') })
              ]),
              el('div.mt-16', [
                testOption(L('niveau.a1', 'Je m’appelle Alex.')),
                testOption(L('niveau.a2', 'J’ai Alex ans.'))
              ]),
              el('p.tiny.mt-16', { text: L('niveau.modifier', 'Résultat conseillé : B1 — Intermédiaire') }),
              el('button.btn.btn-primary.btn-block.mt-12', {
                type: 'button', text: L('commun.valider', 'Choisir B1'),
                onclick: function () {
                  SK.Store.set({ level: 'B1' }, 'level');
                  SK.UI.closeSheet();
                  SK.UI.toast(L('toast.niveauMisAJour', 'Niveau mis à jour : B1'), 'ok');
                }
              })
            ]);
          });
        }
      }, [
        el('span.radio'),
        el('div', [
          el('div.c-main', { text: L('niveau.jeNeSaisPas', 'Je ne sais pas') }),
          el('div.c-sub', { text: L('niveau.test', 'On peut faire un petit test ensemble.') })
        ])
      ]);

      function testOption(label) {
        return el('button.opt.mt-8', { type: 'button', onclick: function () { SK.UI.toast(L('toast.bonneReponse', 'Bonne réponse !'), 'ok'); } }, [
          icon('info', 19), el('span', { text: label })
        ]);
      }

      var body = el('div', { style: { paddingTop: '2px' } }, [
        el('h1.h1', { text: L('niveau.titre', 'Quel est ton niveau ?') }),
        el('p.sub.mt-8', { text: L('niveau.sousTitre', 'Tu peux toujours le modifier plus tard.') }),
        el('div.mt-20', list),
        el('div.mt-12', [unsure])
      ]);

      return frame({
        step: 2,
        onBack: function () { SK.Router.replace('language'); },
        body: body,
        cta: el('div', [
          el('button.btn.btn-primary.btn-lg.btn-block', {
            type: 'button', text: L('commun.continuer', 'Continuer'),
            onclick: function () { SK.Sfx.pop(); SK.Router.go('objective'); }
          })
        ])
      });
    }
  });

  /* ======================= 5. Objectif ======================= */
  SK.Router.register('objective', {
    render: function () {
      var st = SK.Store.get();
      var picked = (st.objectives || []).slice();
      var grid = el('div.pill-grid');
      var durations = el('div.chip-grid.mt-8');

      SK.CONTENT.objectives.forEach(function (o) {
        var b = el('button.opt' + (picked.indexOf(o.id) >= 0 ? '.is-on' : ''), {
          type: 'button',
          onclick: function () {
            SK.Sfx.tap();
            var list = SK.Store.toggleObjective(o.id);
            b.classList.toggle('is-on', list.indexOf(o.id) >= 0);
          }
        }, [objectiveIcon(o), el('span', { text: o.fr }), el('span.check', icon('check', 12))]);
        grid.appendChild(b);
      });

      [5, 10, 15, 30].forEach(function (m) {
        var c = el('button.chip' + (SK.Store.get().dailyMinutes === m ? '.is-on' : ''), {
          type: 'button', text: m + ' min',
          onclick: function () {
            SK.Sfx.tap();
            U.$$('.chip', durations).forEach(function (n) { n.classList.remove('is-on'); });
            c.classList.add('is-on');
            SK.Store.set({ dailyMinutes: m }, 'minutes');
          }
        });
        durations.appendChild(c);
      });

      var nameRow = el('div.row.mt-16', [
        el('input', {
          type: 'text', value: SK.userName(), placeholder: L('profil.nom', 'Ton prénom'),
          'aria-label': L('profil.nom', 'Ton prénom'),
          style: { flex: '1', padding: '14px 16px', borderRadius: '16px', border: '1.5px solid var(--line-strong)', background: '#fff', fontSize: '15px', fontWeight: '650' },
          oninput: function () { SK.Store.set({ name: this.value.trim().slice(0, 22) || 'Alex' }, 'name'); }
        })
      ]);

      var body = el('div', { style: { paddingTop: '2px' } }, [
        el('h1.h1', { text: L('objectif.titre', 'Pourquoi veux-tu apprendre cette langue ?') }),
        el('p.sub.mt-8', { text: L('objectif.sousTitre', 'Plusieurs choix sont possibles.') }),
        el('div.mt-20', grid),
        el('div.h3.mt-24', { text: L('objectif.dureeTitre', 'Combien de temps veux-tu pratiquer chaque jour ?') }),
        durations,
        el('div.h3.mt-24', { text: L('profil.nom', 'Comment veux-tu qu’on t’appelle ?') }),
        nameRow,
        el('p.tiny.mt-8', { text: L('profil.aProposTexte', 'Utilisé pour te saluer chaque matin.') })
      ]);

      return frame({
        step: 3,
        onBack: function () { SK.Router.replace('level'); },
        body: body,
        cta: el('div', [
          el('button.btn.btn-primary.btn-lg.btn-block', {
            type: 'button', text: L('commun.commencer', 'Commencer'),
            onclick: function () {
              SK.Store.set({ onboarded: true }, 'onboard');
              SK.Store.touchStreak();
              SK.Sfx.great();
              SK.Router.replace('home');
              setTimeout(function () {
                SK.UI.toast(L('toast.premiereMission', 'Bienvenue ' + SK.userName() + ' ! Ta première mission t’attend.'), 'star', 3200);
              }, 260);
            }
          }),
          el('p.tiny.center.mt-12', { text: L('profil.aProposTexte', 'Tout est modifiable dans l’onglet Profil') })
        ])
      });
    }
  });
})(window);
