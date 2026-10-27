/* ==========================================================================
   SPEAKLY — onglet Profil : réglages, langue, niveau, objectifs, données
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el, icon = U.icon;
  var L = function (k, f) { return SK.L(k, f); };

  /* ---------- export / import des données ---------- */
  function exportData() {
    try {
      var blob = new Blob([SK.Store.exportJSON()], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'speakly-donnees.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      SK.UI.toast(L('profil.exportOk', 'Données exportées.'), 'ok');
    } catch (e) {
      SK.UI.toast(L('profil.exportEchec', 'Export impossible sur ce navigateur.'), 'warn');
    }
  }
  SK.Store.exportData = exportData;

  function importData() {
    var input = el('input', { type: 'file', accept: '.json,application/json', style: { display: 'none' } });
    input.onchange = function () {
      var f = input.files && input.files[0];
      if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        var okImport = SK.Store.importJSON(String(fr.result));
        SK.UI.toast(okImport ? L('profil.importOk', 'Données importées.') : L('profil.importEchec', 'Fichier illisible.'), okImport ? 'ok' : 'warn');
        if (okImport) SK.Router.replace('home');
      };
      fr.readAsText(f);
    };
    document.body.appendChild(input);
    input.click();
  }

  /* ---------- rendu ---------- */
  function render() {
    var st = SK.Store.get();
    var lang = SK.Store.langObj();
    var level = SK.Store.levelObj();
    var prefs = st.prefs || {};
    var initial = (SK.userName()[0] || 'A').toUpperCase();
    var voiceCount = SK.Speech.voices().length;

    var head = el('div.screen-pad', { style: { paddingTop: '8px' } }, [
      el('div.profile-head', [
        el('div.big', { text: initial }),
        el('div.h2', { text: SK.userName() }),
        el('div.row', [
          el('span.lang-pill', [
            SK.flag(lang ? lang.code : '', { size: 20, flag: lang ? lang.flag : '🌍', label: lang ? lang.native : '' }),
            el('span', { text: lang ? lang.fr : '' })
          ]),
          U.badge(level ? level.code : 'B1', 'violet', 'target'),
          U.badge('🔥 ' + (st.progress.streak || 0), 'amber', 'fire')
        ])
      ])
    ]);

    /* ---- compte ---- */
    var accountRows = el('div.rows', [
      row('user', L('profil.prenom', 'Prénom'), SK.userName(), 'pencil', editName),
      rowAsset('globe', L('profil.langueApprise', 'Langue apprise'), (lang ? lang.fr : ''), 'chevron', pickLanguage, lang ? SK.flag(lang.code, { size: 22, flag: lang.flag, label: lang.native }) : null),
      row('target', L('profil.monNiveau', 'Mon niveau'), level ? level.label : '', 'chevron', pickLevel),
      row('brief', L('profil.mesObjectifs', 'Mes objectifs'), (st.objectives || []).length + ' ' + L('profil.selectionnes', 'sélectionnés'), 'chevron', pickObjectives),
      row('clock', L('profil.tempsQuotidien', 'Temps quotidien'), (st.dailyMinutes || 5) + ' min', 'chevron', pickMinutes)
    ]);

    /* ---- réglages ---- */
    var prefsRows = el('div.rows', [
      switchRow('volume', L('profil.lectureAuto', 'Lecture automatique des phrases'), prefs.autoSpeak !== false, function (v) { setPref('autoSpeak', v); }),
      switchRow('speaker', L('profil.vitesseLente', 'Voix lente'), !!prefs.slowSpeech, function (v) { setPref('slowSpeech', v); }),
      switchRow('bell', L('profil.sons', 'Sons et retours'), prefs.sound !== false, function (v) { setPref('sound', v); SK.Sfx.pop(); }),
      switchRow('moon', L('profil.themeSombre', 'Mode sombre'), prefs.theme === 'dark', function (v) {
        var p = Object.assign({}, SK.Store.get().prefs);
        p.theme = v ? 'dark' : 'light';
        SK.Store.set({ prefs: p }, 'prefs');
        SK.applyTheme();
        SK.UI.toast(v ? 'Mode sombre activé' : 'Mode clair activé', 'ok', 1400);
      }),
      row('wave', L('profil.voix', 'Voix disponibles'), voiceCount + ' ' + L('profil.voixTrouvees', 'voix'), 'share', pickVoice),
      row('globe', L('profil.langueInterface', 'Langue de l’interface'), (st.ui || 'fr').toUpperCase(), 'chevron', pickUI),
      row('download', L('pwa.installer', 'Installer l’app'), 'PWA · hors-ligne', 'chevron', installApp),
      row('lock', L('pwa.pret', 'Fonctionne hors-ligne'),
        SK.offline.supported ? (SK.offline.isOnline() ? 'connecté · réseau actif' : L('pwa.horsLigne', 'Mode hors-ligne'))
          : 'non disponible sur ce navigateur', 'info', null)
    ]);

    /* ---- données ---- */
    var dataRows = el('div.rows', [
      row('download', L('profil.exporter', 'Exporter mes données'), 'JSON', 'share', exportData),
      row('refresh', L('profil.importer', 'Importer des données'), '', 'chevron', importData),
      row('trash', L('profil.reinitialiser', 'Réinitialiser l’application'), '', 'chevron', confirmReset)
    ]);

    var body = el('div.screen-body', [
      el('div.mt-16', [U.sectionTitle(L('profil.compte', 'Mon profil')), accountRows]),
      el('div.mt-20', [U.sectionTitle(L('profil.reglages', 'Réglages')), prefsRows]),
      el('div.mt-20', [U.sectionTitle(L('profil.donnees', 'Données')), dataRows]),
      el('div.card-soft.mt-20', [
        el('div.row', [icon('info', 18), el('div.h4', { text: L('profil.aproposTitre', 'À propos de SPEAKLY') })]),
        el('p.small.mt-8', { text: L('profil.apropos', 'SPEAKLY est une app de poche pour oser parler : une routine quotidienne de 5 minutes, guidée et notée. Tes données restent sur ton appareil.') }),
        el('div.row.mt-8', [
          U.badge(L('profil.version', 'Version') + ' 1.0', 'ghost', 'sparkle'),
          U.badge('Web Speech API', 'ghost', 'wave')
        ])
      ]),
      el('p.tiny.center.mt-16', { text: 'Learn less. Speak more.' })
    ]);

    return el('div.screen', [head, body]);
  }

  /* ---------- fabricants de lignes ---------- */
  function row(ico, label, value, chev, action) {
    return el('button.row-item', {
      type: 'button',
      onclick: function () { SK.Sfx.tap(); if (action) action(); }
    }, [
      el('div.ico', icon(ico, 18)),
      el('div.grow', [el('b', { text: label }), value ? el('small', { text: value }) : null]),
      el('span.chev', icon(chev || 'chevron', 16))
    ]);
  }

  /** Ligne de réglage dont l'icône est un visuel (drapeau) au lieu d'un pictogramme. */
  function rowAsset(ico, label, value, chev, action, asset) {
    var lead = asset || icon(ico, 18);
    var holder = el('div.ico', asset ? { style: { background: 'transparent' } } : null);
    holder.appendChild(lead);
    return el('button.row-item', {
      type: 'button',
      onclick: function () { SK.Sfx.tap(); if (action) action(); }
    }, [
      holder,
      el('div.grow', [el('b', { text: label }), value ? el('small', { text: value }) : null]),
      el('span.chev', icon(chev || 'chevron', 16))
    ]);
  }

  function switchRow(ico, label, on, onChange) {
    var sw = el('span.switch' + (on ? '.on' : ''));
    return el('button.row-item', {
      type: 'button',
      onclick: function () {
        on = !on;
        sw.classList.toggle('on', on);
        SK.Sfx.tap();
        onChange(on);
      }
    }, [
      el('div.ico', icon(ico, 18)),
      el('div.grow', [el('b', { text: label })]),
      sw
    ]);
  }

  function setPref(key, value) {
    var prefs = Object.assign({}, SK.Store.get().prefs);
    prefs[key] = value;
    SK.Store.set({ prefs: prefs }, 'prefs');
    SK.UI.toast(L('toast.reglageEnregistre', 'Réglage enregistré.'), 'ok', 1300);
  }

  /* ---------- panneaux de saisie ---------- */
  function editName() {
    SK.UI.openSheet(function () {
      var input = el('input', {
        type: 'text', value: SK.userName(), maxlength: '22',
        style: { width: '100%', padding: '14px', borderRadius: '16px', border: '1.5px solid var(--line-strong)', fontSize: '16px' }
      });
      return el('div', [
        el('div.h3', { text: L('profil.prenom', 'Prénom') }),
        el('div.mt-12', [input]),
        el('button.btn.btn-primary.btn-block.mt-16', {
          type: 'button', text: L('commun.enregistrer', 'Enregistrer'),
          onclick: function () {
            SK.Store.set({ name: input.value.trim().slice(0, 22) || 'Alex' }, 'name');
            SK.UI.closeSheet();
            SK.Router.replace('profile');
            SK.UI.toast(L('toast.profilMaj', 'Profil mis à jour.'), 'ok');
          }
        })
      ]);
    });
  }

  function pickLanguage() {
    SK.UI.openSheet(function () {
      var grid = el('div.lang-grid.mt-12');
      var variantBox = el('div.mt-16');
      var langs = SK.CONTENT.languages.filter(function (l) {
        return !l.extra || l.code === 'ru' || l.code === 'pt-BR';
      });
      langs.forEach(function (l) {
        grid.appendChild(el('button.lang' + (l.code === SK.Store.get().lang ? '.is-on' : ''), {
          type: 'button',
          onclick: function () {
            SK.Store.set({ lang: l.code, ui: l.ui }, 'lang');
            SK.UI.closeSheet();
            SK.Router.replace('profile');
            SK.UI.toast(SK.t({ fr: l.fr, en: l.fr }), 'ok');
          }
        }, [SK.flag(l.code, { size: 26, flag: l.flag, label: l.native }), el('span', { text: l.native }), el('span.check', icon('check', 11))]));
      });
      /* variantes régionales : les drapeaux US / UK / Brésil servent ici */
      var st = SK.Store.get();
      if (st.lang === 'en' || st.lang === 'pt') {
        variantBox.appendChild(el('div.h4', { text: L('profil.variante', 'Variante régionale') }));
        variantBox.appendChild(el('p.small.mt-4', { text: L('profil.varianteTxt', 'Choisis la variante dont tu as besoin (prononciation et drapeau).') }));
        var row = el('div.row.mt-8');
        var options = st.lang === 'en'
          ? [{ code: 'us', flag: 'en', label: 'English (US)' }, { code: 'gb', flag: 'gb', label: 'English (UK)' }]
          : [{ code: 'pt', flag: 'pt', label: 'Português (PT)' }, { code: 'br', flag: 'pt-BR', label: 'Português (BR)' }];
        options.forEach(function (o) {
          var on = ((SK.Store.get().prefs || {}).langVariant || options[0].code) === o.code;
          var b = el('button.opt' + (on ? '.is-on' : ''), {
            type: 'button',
            onclick: function () {
              var prefs = Object.assign({}, SK.Store.get().prefs);
              prefs.langVariant = o.code;
              SK.Store.set({ prefs: prefs }, 'prefs');
              SK.UI.closeSheet();
              SK.Router.replace('profile');
              SK.UI.toast(o.label, 'ok');
            }
          }, [SK.rawFlag(o.flag, { size: 22, label: o.label }), el('span', { text: o.label }), el('span.check', icon('check', 12))]);
          row.appendChild(b);
        });
        variantBox.appendChild(row);
      }
      return el('div', [
        el('div.h3', { text: L('langue.titre', 'Quelle langue veux-tu parler ?') }),
        grid,
        variantBox
      ]);
    });
  }

  function pickLevel() {
    SK.UI.openSheet(function () {
      var list = el('div.mt-12', { style: { display: 'flex', flexDirection: 'column', gap: '9px' } });
      SK.CONTENT.levels.forEach(function (lv) {
        list.appendChild(el('button.choice' + (lv.code === SK.Store.get().level ? '.is-on' : ''), {
          type: 'button',
          onclick: function () {
            SK.Store.set({ level: lv.code }, 'level');
            SK.UI.closeSheet();
            SK.Router.replace('profile');
            SK.UI.toast(L('toast.niveauMisAJour', 'Niveau mis à jour.') + ' ' + lv.code, 'ok');
          }
        }, [el('span.radio'), el('div', [el('div.c-main', { text: lv.label }), el('div.c-sub', { text: lv.sub })])]));
      });
      return el('div', [el('div.h3', { text: L('niveau.titre', 'Quel est ton niveau ?') }), list]);
    });
  }

  function pickObjectives() {
    SK.UI.openSheet(function () {
      var picked = (SK.Store.get().objectives || []).slice();
      var grid = el('div.pill-grid.mt-12');
      SK.CONTENT.objectives.forEach(function (o) {
        var b = el('button.opt' + (picked.indexOf(o.id) >= 0 ? '.is-on' : ''), {
          type: 'button',
          onclick: function () {
            picked = SK.Store.toggleObjective(o.id);
            b.classList.toggle('is-on', picked.indexOf(o.id) >= 0);
          }
        }, [icon(o.icon, 19), el('span', { text: o.fr }), el('span.check', icon('check', 12))]);
        grid.appendChild(b);
      });
      return el('div', [
        el('div.h3', { text: L('objectif.titre', 'Pourquoi veux-tu apprendre cette langue ?') }),
        grid,
        el('button.btn.btn-primary.btn-block.mt-16', {
          type: 'button', text: L('commun.enregistrer', 'Enregistrer'),
          onclick: function () {
            SK.UI.closeSheet();
            SK.Router.replace('profile');
            SK.UI.toast(L('toast.objectifsMaj', 'Objectifs mis à jour.'), 'ok');
          }
        })
      ]);
    });
  }

  function pickMinutes() {
    SK.UI.openSheet(function () {
      var grid = el('div.chip-grid.mt-12');
      [5, 10, 15, 30].forEach(function (m) {
        grid.appendChild(el('button.chip' + (SK.Store.get().dailyMinutes === m ? '.is-on' : ''), {
          type: 'button', text: m + ' min',
          onclick: function () {
            SK.Store.set({ dailyMinutes: m }, 'minutes');
            SK.UI.closeSheet();
            SK.Router.replace('profile');
            SK.UI.toast(L('toast.dureeMaj', 'Durée quotidienne enregistrée.'), 'ok');
          }
        }));
      });
      return el('div', [el('div.h3', { text: L('objectif.dureeTitre', 'Combien de temps veux-tu pratiquer chaque jour ?') }), grid]);
    });
  }

  function pickVoice() {
    SK.UI.openSheet(function () {
      var code = SK.Store.get().lang;
      var list = SK.Speech.voices().filter(function (v) { return (v.lang || '').toLowerCase().indexOf(code) === 0; });
      return el('div', [
        el('div.h3', { text: L('profil.voixTitre', 'Voix pour') + ' ' + (SK.t((SK.Store.langObj() || {}).native)) }),
        el('p.small.mt-8', { text: L('profil.voixTxt', 'Voix fournies par ton navigateur ou ton système.') }),
        el('div.list.mt-12', list.length ? list.map(function (v) {
          return el('div.row-item', [
            el('div.ico', icon('speaker', 18)),
            el('div.grow', [el('b', { text: v.name }), el('small', { text: v.lang })]),
            el('button.btn.btn-soft.btn-sm', {
              type: 'button', text: L('commun.ecouter', 'Écouter'),
              onclick: function () { SK.Speech.speak(L('profil.exempleVoix', 'Bonjour, voici ma voix.'), { force: true }); }
            })
          ]);
        }) : [el('p.small', { text: L('profil.aucuneVoix', 'Aucune voix trouvée : le navigateur utilisera la voix par défaut.') })])
      ]);
    });
  }

  function pickUI() {
    SK.UI.openSheet(function () {
      var codes = [{ c: 'fr', l: 'Français' }, { c: 'en', l: 'English' }, { c: 'es', l: 'Español' }];
      var list = el('div.mt-12', { style: { display: 'flex', flexDirection: 'column', gap: '9px' } });
      codes.forEach(function (o) {
        list.appendChild(el('button.choice' + (SK.Store.get().ui === o.c ? '.is-on' : ''), {
          type: 'button',
          onclick: function () {
            SK.Store.set({ ui: o.c }, 'ui');
            SK.UI.closeSheet();
            SK.Router.renderChrome();
            SK.Router.replace('profile');
          }
        }, [el('span.radio'), el('div', [el('div.c-main', { text: o.l })])]));
      });
      return el('div', [el('div.h3', { text: L('profil.langueInterface', 'Langue de l’interface') }), list]);
    });
  }

  /** Installe l'app (ajout à l'écran d'accueil) ou explique comment faire. */
  function installApp() {
    var prompt = SK._installPrompt;
    if (prompt) {
      prompt.prompt();
      prompt.userChoice && prompt.userChoice.then(function (res) {
        SK.UI.toast(res && res.outcome === 'accepted'
          ? L('pwa.pret', 'SPEAKLY est prêt à fonctionner hors-ligne.')
          : L('pwa.installer', 'Installer l’app'), res && res.outcome === 'accepted' ? 'ok' : 'warn');
        SK._installPrompt = null;
      });
      return;
    }
    SK.UI.openSheet(function () {
      return el('div', [
        el('div.h3', { text: L('pwa.installer', 'Installer l’app') }),
        el('p.small.mt-8', { text: L('pwa.pret', 'SPEAKLY est prêt à fonctionner hors-ligne : les fichiers sont mis en cache sur ton appareil.') }),
        el('div.card-soft.mt-12', [
          el('div.h4', { text: 'iPhone / iPad' }),
          el('p.small.mt-4', { text: 'Safari → bouton Partager → « Sur l’écran d’accueil ».' })
        ]),
        el('div.card-soft.mt-12', [
          el('div.h4', { text: 'Android / Chrome' }),
          el('p.small.mt-4', { text: 'Menu ⋮ → « Installer l’application » ou « Ajouter à l’écran d’accueil ».' })
        ]),
        el('div.card-soft.mt-12', [
          el('div.h4', { text: 'Ordinateur' }),
          el('p.small.mt-4', { text: 'Icône d’installation dans la barre d’adresse (Chrome/Edge).' })
        ]),
        el('button.btn.btn-primary.btn-block.mt-16', {
          type: 'button', text: L('commun.fermer', 'Fermer'),
          onclick: function () { SK.UI.closeSheet(); }
        })
      ]);
    });
  }

  function confirmReset() {    SK.UI.openSheet(function () {
      return el('div', [
        el('div.h3', { text: L('profil.reinitialiser', 'Réinitialiser l’application') }),
        el('p.small.mt-8', { text: L('profil.resetTxt', 'Toute ta progression, ta série et tes badges seront effacés de cet appareil. Action définitive.') }),
        el('button.btn.btn-pink.btn-block.mt-16', {
          type: 'button', text: L('profil.resetConfirmer', 'Tout effacer'),
          onclick: function () {
            SK.Store.reset();
            SK.UI.closeSheet();
            SK.UI.toast(L('toast.reinitialise', 'Application réinitialisée.'), 'warn');
            SK.Router.replace('onboarding');
          }
        }),
        el('button.btn.btn-ghost.btn-block.mt-12', {
          type: 'button', text: L('commun.annuler', 'Annuler'),
          onclick: function () { SK.UI.closeSheet(); }
        })
      ]);
    });
  }

  SK.Router.register('profile', { render: render });
  SK.Router.registerTab({ name: 'profile', label: function () { return SK.L('profil.tab', 'Profil'); }, icon: 'user' });
})(window);
