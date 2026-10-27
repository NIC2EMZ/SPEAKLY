/* ==========================================================================
   SPEAKLY — écran 10 : Après l'enregistrement (résultats, analyse, série)
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f) { return SK.L(k, f); };

  var audioEl = null;

  function findSession(params) {
    var st = SK.Store.get();
    var list = st.progress.sessions || [];
    if (params && params.session) {
      var found = list.filter(function (s) { return s.id === params.session; })[0];
      if (found) return found;
    }
    if (SK.STORE_LAST_SESSION) return SK.STORE_LAST_SESSION;
    return list[list.length - 1] || null;
  }

  function render(params) {
    var session = findSession(params || {});
    var earned = SK.checkBadges();

    if (!session) {
      return el('div.screen', [
        U.topbar({ title: L('resultats.titre', 'Résultats'), onBack: function () { SK.Router.replace('home'); } }),
        el('div.screen-body', [
          U.emptyState('🎤', L('resultats.analyse', 'Aucune séance'),
            L('resultats.parlePendant', 'Lance un enregistrement pour voir ton analyse détaillée.'),
            el('button.btn.btn-primary', {
              type: 'button', text: L('commun.commencer', 'Commencer'),
              onclick: function () { SK.Router.go('record', {}); }
            }))
        ])
      ]);
    }

    var axes = session.axes || { fluidez: 0, pronunciation: 0, vocabulary: 0, grammar: 0 };
    var answers = session.answers || [];
    var st = SK.Store.get();
    var streak = st.progress.streak || 0;
    var mission = session.missionId ? SK.Store.missionById(session.missionId) : null;
    var toWork = lowestAxis(axes);
    var missedWords = collectMissedWords(answers);

    /* ---------- entête confettis ---------- */
    var confetti = el('div.confetti');
    confetti.appendChild(el('span.star', { text: '⭐' }));
    ['#F0426E', '#6C4BE8', '#22C08C', '#F5A524', '#3B9DF8'].forEach(function (c, i) {
      var p = el('i');
      p.style.background = c;
      p.style.left = (14 + i * 18) + '%';
      p.style.animationDelay = (i * 0.22) + 's';
      confetti.appendChild(p);
    });

    var head = el('div.screen-pad.center', [
      confetti,
      el('h1.h2', { text: L('resultats.bravo', 'Très bien !') }),
      el('p.sub.mt-8', { text: L('resultats.parlePendant', 'Tu as parlé pendant') }),
      el('div', { style: { fontSize: '27px', fontWeight: '850', letterSpacing: '-.6px', marginTop: '2px' }, text: U.fmtDuration(session.seconds) }),
      el('div.row.mt-12', { style: { justifyContent: 'center' } }, [
        el('span.streak-pill', [icon('fire', 14), el('span', { text: L('resultats.joursDeSuite', streak + ' jours de suite', { n: streak }) })]),
        U.badge('+' + (session.xp || 0) + ' XP', 'violet', 'sparkle')
      ]),
      el('p.small.mt-12', { text: session.missionTitle || '' })
    ]);

    /* ---------- réécoute ---------- */
    var hasAudio = !!SK.Audio.url();
    var waveform = el('div.waveform-mini');
    for (var i = 0; i < 26; i++) {
      waveform.appendChild(el('i', { style: { height: (6 + Math.sin(i / 2.4) * 8 + Math.random() * 16) + 'px' } }));
    }
    var playBtn = el('button.play', {
      type: 'button', 'aria-label': 'Réécouter',
      onclick: function () {
        if (!hasAudio) { SK.UI.toast(L('erreur.audio', 'Audio non disponible sur ce navigateur.'), 'warn'); return; }
        if (!audioEl) {
          audioEl = new Audio(SK.Audio.url());
          audioEl.onended = function () { playBtn.innerHTML = ''; playBtn.appendChild(icon('play', 17)); };
        }
        if (audioEl.paused) { audioEl.play(); playBtn.innerHTML = ''; playBtn.appendChild(icon('pause', 17)); }
        else { audioEl.pause(); playBtn.innerHTML = ''; playBtn.appendChild(icon('play', 17)); }
      }
    }, icon('play', 17));

    var replay = el('div.replay', [
      playBtn,
      el('div.grow', [
        el('div.tiny.strong', { text: L('resultats.tonEnregistrement', 'Ton enregistrement') }),
        waveform
      ]),
      el('span.tiny.strong', { text: U.fmtClock(session.seconds) })
    ]);

    /* ---------- analyse ---------- */
    var analysis = el('div.card', [
      el('div.row-between', [
        el('div.h3', { text: L('resultats.analyse', 'Analyse') }),
        el('span.tiny', { text: L('resultats.notationSurDix', 'notes sur 10') })
      ]),
      el('div.row.mt-12', [
        SK.UI.scoreRing(session.score || 0, L('resultats.score', 'score')),
        el('div.grow', [
          axisRow(L('resultats.fluidite', 'Fluidité'), axes.fluidez, 'mint'),
          axisRow(L('resultats.prononciation', 'Prononciation'), axes.pronunciation, ''),
          axisRow(L('resultats.vocabulaire', 'Vocabulaire'), axes.vocabulary, 'amber'),
          axisRow(L('resultats.grammaire', 'Grammaire'), axes.grammar, 'rose')
        ])
      ]),
      el('div.divider'),
      el('div.row-between', [
        el('span.small', { text: L('resultats.score', 'Score global') }),
        el('span.h3', { text: (session.score || 0) + ' / 100' })
      ])
    ]);

    /* ---------- à travailler ---------- */
    var dueNow = SK.Store.dueWords().length;
    var todo = el('div.todo', [
      el('span.em', { text: '🔤' }),
      el('div.grow', [
        el('b', { text: toWork.label }),
        el('p', { text: toWork.tip })
      ]),
      el('button.link', {
        type: 'button', text: L('resultats.voirMesProgres', 'Voir mes progrès'),
        onclick: function () { SK.Sfx.tap(); SK.Router.go('progress'); }
      })
    ]);

    /* ---------- travailler les mots ratés (répétition espacée) ---------- */
    var missedBlock = el('div.card-soft.mt-16', [
      el('div.row-between', [
        el('div.h4', { text: L('revision.aTravailler', 'À travailler') }),
        U.badge(L('revision.due', (dueNow || missedWords.length || 0) + ' mots à revoir', { n: dueNow || missedWords.length || 0 }), 'rose', 'refresh')
      ]),
      missedWords.length ? el('div.vocab-wrap.mt-8', missedWords.map(function (w) {
        return el('span.vocab', { text: w.word + ' · ' + w.score + '%' });
      })) : el('p.small.mt-8', { text: L('revision.rien', 'Rien à réviser') }),
      el('button.btn.btn-primary.btn-block.mt-12', {
        type: 'button', text: L('revision.pratiquer', 'Travailler ces mots'),
        onclick: function () { SK.Sfx.start(); SK.Router.go('review', {}); }
      })
    ]);

    /* ---------- détail question par question ---------- */
    var details = el('div.list');
    answers.forEach(function (a, i) {
      details.appendChild(el('div.card-flat', [
        el('div.row-between', [
          el('div.row', [
            el('span.n', { style: { fontWeight: '800', color: 'var(--violet-700)' }, text: 'Q' + (a.n || i + 1) }),
            el('span.tiny.strong', { text: a.prompt || '' })
          ]),
          chipFor(a)
        ]),
        el('div.mt-8', [
          el('div.small.strong', { text: a.target || '' }),
          el('div.tiny', { text: a.gloss || '' })
        ]),
        a.said ? el('div.mt-8', [
          el('span.tiny', { text: L('enregistrement.transcript', 'Toi : ') }),
          el('span.small', { style: { color: 'var(--ink-700)' }, text: a.said })
        ]) : el('div.mt-8', [el('span.tiny', { text: L('enregistrement.transcript', 'Aucune parole détectée sur cette question.') })]),
        (a.words && a.words.length) ? el('div.vocab-wrap.mt-12', a.words.map(function (w) {
          return el('span.vocab', { style: w.score >= 65 ? {} : { background: 'var(--rose-100)', color: 'var(--rose-600)' } }, [
            el('span', { text: w.word }),
            el('span.art', { text: w.score + '%' })
          ]);
        })) : null
      ]));
    });

    /* ---------- badges gagnés ---------- */
    var badgesBlock = earned.length ? el('div.card-soft.mt-16', [
      el('div.h4', { text: L('resultats.nouveauBadge', 'Nouveaux badges') }),
      el('div.mt-8', earned.map(function (b) {
        return el('div.row.mt-8', [
          el('span', { style: { fontSize: '22px' }, text: b.emoji }),
          el('div', [
            el('div.small.strong', { text: SK.t(b.title) }),
            el('div.tiny', { text: SK.t(b.text) })
          ])
        ]);
      }))
    ]) : null;

    var body = el('div.screen-body', [
      el('div.mt-8', [replay]),
      el('div.mt-16', [analysis]),
      el('div.mt-16', [todo]),
      missedBlock,
      el('div.mt-24', [U.sectionTitle(L('resultats.analyse', 'Détail de la séance'))]),
      details,
      badgesBlock,
      el('button.btn.btn-primary.btn-lg.btn-block.mt-24', {
        type: 'button', text: L('commun.continuer', 'Continuer'),
        onclick: function () {
          SK.Sfx.pop();
          var nextMission = mission ? mission : SK.Store.missionOfTheDay();
          if (mission) SK.Router.replace('mission', { id: mission.id });
          else SK.Router.replace('home');
        }
      }),
      el('button.btn.btn-ghost.btn-block.mt-12', {
        type: 'button', text: L('resultats.reessayer', 'Refaire une prise'),
        onclick: function () { SK.Router.replace('record', mission ? { mission: mission.id } : {}); }
      })
    ]);

    if (earned.length) {
      setTimeout(function () { SK.UI.celebrate(40); SK.Sfx.streak(); }, 380);
    } else {
      setTimeout(function () { SK.Sfx.great(); }, 320);
    }

    return el('div.screen', [
      U.topbar({
        title: L('resultats.titre', 'Résultats'),
        onBack: function () { SK.Router.replace(mission ? 'mission' : 'home', mission ? { id: mission.id } : {}); }
      }),
      head,
      body
    ]);
  }

  function axisRow(label, value, tone) {
    var v10 = U.round1((value || 0) / 10);
    return el('div.analysis-row', [
      el('span.k', { text: label }),
      U.bar(value || 0, tone),
      el('span.v', { text: L('resultats.surDix', v10.toFixed(1) + ' / 10', { note: v10.toFixed(1) }) })
    ]);
  }

  function chipFor(a) {
    var ratio = a.keywords && a.keywords.length ? (a.found || []).length / a.keywords.length : (a.match || 0);
    if (ratio >= 0.8) return el('span.answer-chip', [icon('check', 10), el('span', { text: L('resultats.tresBien', 'réussi') })]);
    if (ratio >= 0.4) return el('span.answer-chip.part', [icon('info', 10), el('span', { text: L('resultats.aTravailler', 'partiel') })]);
    return el('span.answer-chip.miss', [icon('x', 10), el('span', { text: L('resultats.reessayer', 'à refaire') })]);
  }

  function lowestAxis(axes) {
    var defs = [
      { key: 'fluidez', label: L('resultats.fluidite', 'Fluidité'), tip: L('resultats.fluidite', 'Enchaîne les phrases sans t’arrêter : parle 30 secondes d’affilée.') },
      { key: 'pronunciation', label: L('resultats.prononciation', 'Prononciation'), tip: L('resultats.prononciation', 'Écoute puis répète à voix haute les mots surlignés en rouge.') },
      { key: 'vocabulary', label: L('resultats.vocabulaire', 'Vocabulaire'), tip: L('resultats.vocabulaire', 'Apprends 5 mots utiles de la mission avant la prochaine séance.') },
      { key: 'grammar', label: L('resultats.grammaire', 'Grammaire'), tip: L('resultats.grammaire', 'Reprends la structure de la phrase modèle et remplace un mot.') }
    ];
    var worst = defs[0];
    defs.forEach(function (d) { if ((axes[d.key] || 0) < (axes[worst.key] || 0)) worst = d; });
    return worst;
  }

  function collectMissedWords(answers) {
    var out = [];
    answers.forEach(function (a) {
      (a.words || []).forEach(function (w) { if (w.score < 65) out.push(w); });
    });
    return out.slice(0, 6);
  }

  SK.Router.register('results', { render: render });
})(window);
