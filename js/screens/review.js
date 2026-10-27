/* ==========================================================================
   SPEAKLY — écran « Mes mots » : révision espacée (J+1, J+3, J+7, J+21, J+45)
   --------------------------------------------------------------------------
   Corrige le principal défaut de l'app : aujourd'hui un mot mal prononcé ne
   revient jamais. Ici, chaque mot raté est reprogrammé et réinjecté dans une
   séance générée à partir des vraies difficultés de l'apprenant.
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f, v) { return SK.L(k, f, v); };
  var Lx = function (k, f, v) { return L(k, f, v); };

  var session = null;   // { queue, index, done, results, mode }
  var timer = null;

  function render(params) {
    SK.Store.ensureLexicon();
    var mode = params && params.mode === 'lexique' ? 'lexique' : 'review';
    var summary = SK.Store.wordStatsSummary();

    if (mode === 'lexique') return renderLexicon(summary);
    if (!summary.due) return renderEmpty(summary);
    if (!session || session.finished) session = newSession();
    return renderCard(session, summary);
  }

  function newSession() {
    var due = SK.Store.dueWords().slice(0, 12);
    return { queue: due, index: 0, finished: false, results: [], startedAt: Date.now() };
  }

  /* ---------------- état vide ---------------- */
  function renderEmpty(summary) {
    var next = nextDueIn();
    var body = el('div.screen-body', [
      U.emptyState('🎉', L('revision.rien', 'Rien à réviser'),
        L('revision.rienTxt', 'Aucun mot à revoir maintenant. Lance une mission : chaque mot raté reviendra automatiquement J+1, puis J+3, J+7…')),
      el('div.stat-grid.mt-16', [
        U.statTile(summary.mastered, L('revision.motsMaitrises', summary.mastered + ' maîtrisés', { n: summary.mastered }), '🏅'),
        U.statTile(summary.learning, L('revision.motsEnCours', summary.learning + ' en cours', { n: summary.learning }), '📈'),
        U.statTile(summary.total, L('revision.statsMots', 'Mes mots'), '📚')
      ]),
      next ? el('p.small.center.mt-16', { text: L('revision.planifie', 'Prochaine révision') + ' : ' + next }) : null,
      el('button.btn.btn-primary.btn-block.mt-20', {
        type: 'button', text: L('accueil.missionDuJour', 'Mission du jour'),
        onclick: function () { SK.Sfx.start(); SK.Router.go('mission', {}); }
      }),
      el('button.btn.btn-ghost.btn-block.mt-12', {
        type: 'button', text: L('revision.lexique', 'Mon lexique'),
        onclick: function () { SK.Router.go('review', { mode: 'lexique' }); }
      })
    ]);
    return el('div.screen', [head(summary, 'review'), body]);
  }

  function nextDueIn() {
    var stats = SK.Store.get().progress.wordStats || {};
    var today = U.todayKey();
    var best = null;
    Object.keys(stats).forEach(function (k) {
      var n = stats[k].next;
      if (!n || n <= today) return;
      if (!best || n < best) best = n;
    });
    if (!best) return '';
    var diff = U.diffDays(today, best);
    if (diff === 1) return L('revision.demain', 'demain');
    return L('revision.dans', 'dans ' + diff + ' j', { jours: diff });
  }

  /* ---------------- carte de révision ---------------- */
  function renderCard(sess, summary) {
    var w = sess.queue[sess.index];
    if (!w) { sess.finished = true; return renderDone(sess, summary); }

    var scoreBox = el('div.mt-12');
    var hint = el('div.tiny.center.mt-12', { text: L('revision.ecoutePuisRepete', 'Écoute, puis répète à voix haute') });
    var actions = el('div.mt-16');
    var listenBtn;

    var card = el('div.word-card', { dataset: { mot: w.word } }, [
      el('div.row', { style: { justifyContent: 'center', gap: '6px' } }, [
        U.badge(String((sess.index + 1)) + '/' + sess.queue.length, 'violet', 'target'),
        w.article ? U.badge(w.article, 'ghost', 'book') : null
      ]),
      el('div.mt-12', [el('div.w', { text: w.word })]),
      el('div.ipa', { text: w.ipa || '' }),
      el('div.tr', { text: w.translation || '' }),
      el('div.tip', [
        el('span', { text: L('revision.planifie', 'Prochaine révision') + ' : ' }),
        el('b', { text: SK.Store.nextLabel(w.next) })
      ])
    ]);

    function rate(ok) {
      var score = ok ? 92 : 40;
      var updated = SK.Store.reviewWord(w.word, score);
      sess.results.push({ word: w.word, ok: ok, next: updated.next });
      SK.Sfx[ok ? 'ok' : 'soft']();
      actions.innerHTML = '';
      scoreBox.appendChild(U.badge(L('revision.planifie', 'Prochaine révision') + ' : ' + SK.Store.nextLabel(updated.next), ok ? 'mint' : 'amber', 'clock'));
      nextWord();
    }

    function listen() {
      if (timer) { clearTimeout(timer); timer = null; }
      listenBtn.disabled = true;
      hint.textContent = L('prononciation.enCours', 'Je t\'écoute…');
      scoreBox.innerHTML = '';
      if (!SK.Speech.canRecognize()) {
        // repli : auto-évaluation honnête quand la reconnaissance n'est pas dispo
        showManual();
        return;
      }
      var collected = '';
      SK.Speech.stopRecognition();
      SK.Speech.startRecognition({
        lang: SK.Store.get().lang,
        onresult: function (r) {
          if (r.final) collected += ' ' + r.final;
          hint.textContent = (collected + ' ' + (r.interim || '')).trim() || L('prononciation.enCours', 'Je t\'écoute…');
        },
        onerror: function () { if (!collected) showManual(); }
      });
      timer = setTimeout(function () {
        timer = null;
        SK.Speech.stopRecognition();
        var score = SK.scoreWord(collected, w.word);
        listenBtn.disabled = false;
        scoreBox.appendChild(U.badge(score + ' / 100', score >= 70 ? 'mint' : score >= 45 ? 'amber' : 'rose', score >= 70 ? 'check' : 'info'));
        hint.textContent = collected.trim()
          ? L('prononciation.entendu', 'Entendu :') + ' « ' + collected.trim() + ' »'
          : L('prononciation.rienEntendu', 'Je n\'ai rien entendu — réessaie en parlant plus fort.');
        SK.Store.reviewWord(w.word, score);
        showRating(score);
      }, 3600);
    }

    function showManual() {
      listenBtn.disabled = false;
      hint.textContent = L('revision.ecoutePuisRepete', 'Écoute, puis répète à voix haute');
    }

    function showRating(score) {
      actions.innerHTML = '';
      actions.appendChild(el('p.tiny.center', { text: L('revision.ecoutePuisRepete', 'Écoute, puis répète à voix haute') }));
      actions.appendChild(el('div.row.mt-8', { style: { justifyContent: 'center', gap: '10px' } }, [
        el('button.btn.btn-mint.btn-sm', {
          type: 'button', text: L('revision.reussis', 'Réussi'),
          onclick: function () { rate(true); }
        }),
        el('button.btn.btn-ghost.btn-sm', {
          type: 'button', text: L('revision.rate', 'Raté'),
          onclick: function () { rate(false); }
        })
      ]));
      if (score !== null && score < 70) {
        actions.appendChild(el('button.link.mt-12', {
          type: 'button', text: L('revision.encore', 'Encore une fois'),
          onclick: function () { listenBtn.disabled = false; listen(); }
        }));
      }
    }

    function nextWord() {
      sess.index += 1;
      if (sess.index >= sess.queue.length) {
        sess.finished = true;
        setTimeout(function () { SK.Router.replace('review', {}); }, 320);
        return;
      }
      SK.Router.replace('review', {});
    }

    listenBtn = el('button.rec-btn', {
      type: 'button', 'aria-label': L('commun.ecouter', 'Écouter'),
      onclick: function () { SK.UI.say(w.word, { force: true }); listen(); }
    }, icon('mic', 44));
    // les boutons d'auto-évaluation sont disponibles dès l'affichage : l'app
    // n'impose pas de passer par le micro pour avancer
    showRating(null);

    var body = el('div.screen-body', [
      el('p.small.center', { text: L('revision.revisionEnCours', 'Révision en cours') }),
      el('div.mt-12', [card]),
      el('div.mt-16', [listenBtn]),
      scoreBox,
      hint,
      actions,
      el('div.mt-24', [
        U.sectionTitle(L('revision.statsMots', 'Mes mots')),
        el('div.stat-grid', [
          U.statTile(summary.mastered, L('revision.motsMaitrises', summary.mastered + ' maîtrisés', { n: summary.mastered }), '🏅'),
          U.statTile(summary.learning, L('revision.motsEnCours', summary.learning + ' en cours', { n: summary.learning }), '📈'),
          U.statTile(summary.due, L('revision.aRevoir', 'À revoir'), '🔁')
        ])
      ])
    ]);

    return el('div.screen', [head(summary, 'review'), body]);
  }

  /* ---------------- fin de révision ---------------- */
  function renderDone(sess, summary) {
    var body = el('div.screen-body', [
      el('div.confetti', [el('span.star', { text: '⭐' })]),
      el('h1.h2.center.mt-16', { text: L('revision.bravo', 'Bravo, révision terminée !') }),
      el('p.small.center.mt-8', { text: L('revision.revisionEnCours', 'Révision en cours') + ' · ' + sess.results.length + ' ' + L('revision.jours', 'jours') }),
      el('div.mt-16', [
        el('div.list', sess.results.map(function (r) {
          return el('div.card-flat.row-between', [
            el('div.row', [
              el('span', { style: { fontSize: '18px' }, text: r.ok ? '✅' : '🔁' }),
              el('b', { style: { fontSize: '14px' }, text: r.word })
            ]),
            U.badge(SK.Store.nextLabel(r.next), r.ok ? 'mint' : 'amber', 'clock')
          ]);
        }))
      ]),
      el('button.btn.btn-primary.btn-block.mt-20', {
        type: 'button', text: L('revision.lexique', 'Mon lexique'),
        onclick: function () { SK.Router.go('review', { mode: 'lexique' }); }
      }),
      el('button.btn.btn-ghost.btn-block.mt-12', {
        type: 'button', text: L('accueil.missionDuJour', 'Mission du jour'),
        onclick: function () { SK.Router.go('mission', {}); }
      })
    ]);
    return el('div.screen', [head(summary, 'review'), body]);
  }

  /* ---------------- lexique complet ---------------- */
  function renderLexicon(summary) {
    var stats = SK.Store.get().progress.wordStats || {};
    var keys = Object.keys(stats).sort(function (a, b) {
      return (stats[a].step || 0) - (stats[b].step || 0);
    });
    var chips = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } });
    keys.forEach(function (k) {
      var w = stats[k];
      chips.appendChild(el('button.row-item', {
        type: 'button',
        onclick: function () { SK.UI.say(w.word, { force: true }); }
      }, [
        el('div.ico', { text: (w.step || 0) >= SK.Store.REVIEW_STEPS.length ? '🏅' : (w.reps ? '📈' : '🆕') }),
        el('div.grow', [
          el('b', { text: (w.article ? w.article + ' ' : '') + w.word }),
          el('small', { text: (w.translation || '') + (w.ipa ? ' · ' + w.ipa : '') })
        ]),
        U.badge(SK.Store.nextLabel(w.next), 'ghost', 'clock')
      ]));
    });

    var body = el('div.screen-body', [
      el('div.stat-grid', [
        U.statTile(summary.total, L('revision.statsMots', 'Mes mots'), '📚'),
        U.statTile(summary.mastered, L('revision.motsMaitrises', summary.mastered + ' maîtrisés', { n: summary.mastered }), '🏅'),
        U.statTile(summary.due, L('revision.aRevoir', 'À revoir'), '🔁')
      ]),
      el('div.mt-20', [
        U.sectionTitle(L('revision.lexique', 'Mon lexique'), el('span.tiny', { text: L('revision.ecoutePuisRepete', 'Appuie pour écouter') })),
        keys.length ? chips : el('p.small', { text: L('revision.lexiqueVide', 'Tes mots apparaîtront ici après ta première mission.') })
      ]),
      summary.due ? el('button.btn.btn-primary.btn-block.mt-20', {
        type: 'button', text: L('revision.commencer', 'Commencer la révision'),
        onclick: function () { SK.Router.go('review', {}); }
      }) : null
    ]);
    return el('div.screen', [head(summary, 'lexique'), body]);
  }

  function head(summary, mode) {
    var dueBadge = summary.due
      ? U.badge(L('revision.due', summary.due + ' mots à revoir', { n: summary.due }), 'rose', 'refresh')
      : U.badge(L('revision.rien', 'Rien à réviser'), 'mint', 'check');
    return el('div.screen-pad', { style: { paddingTop: '8px' } }, [
      el('div.row-between', [
        el('div', [
          el('h1.h2', { text: mode === 'lexique' ? L('revision.lexique', 'Mon lexique') : L('revision.titre', 'Mes mots') }),
          el('p.sub.mt-4', { text: L('revision.sousTitre', 'Les mots que tu as ratés reviennent au bon moment : J+1, J+3, J+7, J+21.') })
        ]),
        el('button.icon-btn', {
          type: 'button', 'aria-label': L('revision.lexique', 'Mon lexique'),
          onclick: function () { SK.Router.go('review', mode === 'lexique' ? {} : { mode: 'lexique' }); }
        }, icon(mode === 'lexique' ? 'refresh' : 'book', 20))
      ]),
      el('div.row.mt-12', [dueBadge])
    ]);
  }

  SK.Router.register('review', {
    render: render,
    unmount: function () {
      if (timer) { clearTimeout(timer); timer = null; }
      SK.Speech.stopRecognition();
    }
  });
})(window);
