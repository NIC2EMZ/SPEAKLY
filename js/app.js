/* ==========================================================================
   SPEAKLY — app.js : amorçage, helpers globaux, analytique, badges
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, Store = SK.Store, Router = SK.Router;

  /* ---------------- helpers globaux ----------------
     SK.t() et SK.L() sont définis dans core/util.js (chargé avant les écrans,
     car les onglets et libellés sont construits dès le chargement). */
  /** Nom court de l'apprenant. */
  SK.userName = function () { return Store.get().name || 'Alex'; };
  /** Clé de libellé selon l'heure (« Guten Morgen / Tag / Abend » dans la langue apprise). */
  SK.helloKey = function () {
    var h = new Date().getHours();
    return h < 12 ? 'accueil.salutationMatin' : h < 18 ? 'accueil.salutationApresMidi' : 'accueil.salutationSoir';
  };
  var GREETINGS = {
    de: { 'accueil.salutationMatin': 'Guten Morgen, {nom} !', 'accueil.salutationApresMidi': 'Guten Tag, {nom} !', 'accueil.salutationSoir': 'Guten Abend, {nom} !' },
    en: { 'accueil.salutationMatin': 'Good morning, {nom}!', 'accueil.salutationApresMidi': 'Good afternoon, {nom}!', 'accueil.salutationSoir': 'Good evening, {nom}!' },
    es: { 'accueil.salutationMatin': '¡Buenos días, {nom}!', 'accueil.salutationApresMidi': '¡Buenas tardes, {nom}!', 'accueil.salutationSoir': '¡Buenas noches, {nom}!' },
    fr: { 'accueil.salutationMatin': 'Bonjour, {nom} !', 'accueil.salutationApresMidi': 'Bon après-midi, {nom} !', 'accueil.salutationSoir': 'Bonsoir, {nom} !' },
    it: { 'accueil.salutationMatin': 'Buongiorno, {nom}!', 'accueil.salutationApresMidi': 'Buon pomeriggio, {nom}!', 'accueil.salutationSoir': 'Buonasera, {nom}!' },
    pt: { 'accueil.salutationMatin': 'Bom dia, {nom}!', 'accueil.salutationApresMidi': 'Boa tarde, {nom}!', 'accueil.salutationSoir': 'Boa noite, {nom}!' }
  };
  /** Salutation du moment, dans la langue apprise quand on la connaît. */
  SK.greeting = function () {
    var base = SK.L(SK.helloKey(), 'Bonjour');
    var pack = GREETINGS[Store.get().lang];
    var raw = (pack && pack[SK.helloKey()]) || base;
    // si le dictionnaire contient déjà le prénom ({nom}), on l'utilise tel quel
    return SK.fillVars(raw, SK.vars());
  };

  /* ---------------- analytique de session ----------------
     Barème volontairement encourageant : dire la phrase modèle donne ~85-95,
     une réponse partielle la moitié, le silence proche de 0. */
  function wpmOf(session, answers) {
    if (!(session.seconds > 10)) return 0;
    var words = 0;
    answers.forEach(function (a) { words += U.words(a.said || '').length; });
    return words / (session.seconds / 60);
  }
  SK.wpm = wpmOf;

  SK.analyze = function (session) {
    var answers = session.answers || [];
    var spoken = answers.filter(function (a) { return (a.said || '').trim().length; });
    var matchAvg = U.avg(answers.map(function (a) { return a.match === undefined ? 0 : a.match; }));
    var pronAvg = U.avg(answers.map(function (a) { return a.pron === undefined ? (a.match || 0) : a.pron; }));
    var found = 0, expected = 0;
    answers.forEach(function (a) {
      expected += (a.keywords || []).length;
      found += (a.found || []).length;
    });
    var coverage = expected ? found / expected : (matchAvg > 0.6 ? matchAvg : 0);
    var spokenRatio = spoken.length / Math.max(1, answers.length);
    var wpm = wpmOf(session, answers);
    var wpmNorm = wpm <= 0 ? 0 : U.clamp(wpm / 70, 0, 1);

    var fluency = U.clamp(0.60 * coverage + 0.26 * wpmNorm + 0.14 * spokenRatio, 0, 1);
    var pron = U.clamp(0.55 * pronAvg + 0.45 * matchAvg, 0, 1);
    var vocab = U.clamp(0.70 * coverage + 0.30 * U.clamp((session.uniqueWords || 0) / 40, 0, 1), 0, 1);
    var grammar = U.clamp(0.75 * coverage + 0.25 * matchAvg, 0, 1);
    return {
      fluidez: Math.round(fluency * 100),
      pronunciation: Math.round(pron * 100),
      vocabulary: Math.round(vocab * 100),
      grammar: Math.round(grammar * 100)
    };
  };

  SK.scoreSession = function (session) {
    var a = SK.analyze(session);
    var score = Math.round((a.fluidez * 0.25 + a.pronunciation * 0.3 + a.vocabulary * 0.22 + a.grammar * 0.23));
    return { score: U.clamp(score, 0, 100), axes: a };
  };
  /** Note de prononciation d'un mot isolé (0..100) — tolérante. */
  SK.scoreWord = function (said, word) {
    var w = U.norm(word).replace(/^(der|die|das)\s+/, '');
    var s = U.norm(said);
    if (!s) return 0;
    var direct = U.ratio(s, w);
    var contains = s.indexOf(w) >= 0 ? 1 : 0;
    var aligned = U.alignScore(s, w);
    var score = Math.round(Math.max(direct, contains * 0.98, aligned * 0.95) * 100);
    return U.clamp(score, 0, 100);
  };

  /**
   * Alignement mot à mot entre ce qui a été dit et la phrase attendue.
   * -> { score:0..1, hits:[mots réussis], missed:[mots ratés] }
   */
  SK.alignWords = function (said, target) {
    var A = U.words(said), B = U.words(target);
    var used = new Array(A.length).fill(false);
    var hits = [], missed = [];
    B.forEach(function (tw) {
      var best = 0, bi = -1;
      A.forEach(function (aw, i) {
        if (used[i]) return;
        var r = U.ratio(aw, tw);
        if (r > best) { best = r; bi = i; }
      });
      if (bi >= 0 && best >= 0.72) { used[bi] = true; hits.push(tw); }
      else if (best >= 0.5) { used[bi] = true; missed.push(tw); }
      else missed.push(tw);
    });
    var score = B.length ? (hits.length + missed.length * 0.5) / B.length : 0;
    return { score: U.clamp(score, 0, 1), hits: hits, missed: missed, saidWords: A };
  };

  /* ---------------- badges ---------------- */
  SK.checkBadges = function () {
    var p = Store.get().progress;
    var unlocked = p.badges || {};
    var earned = [];
    (SK.CONTENT.badges || []).forEach(function (b) {
      if (unlocked[b.id]) return;
      var r = b.rule || {}, ok = false;
      if (r.type === 'streak') ok = (p.streak || 0) >= r.n;
      else if (r.type === 'missions') ok = (p.missionsDone || 0) >= r.n;
      else if (r.type === 'minutes') ok = Store.totalMinutes() >= r.n;
      else if (r.type === 'words') ok = Store.wordsKnownCount() >= r.n;
      else if (r.type === 'score') {
        ok = (p.sessions || []).some(function (s) { return (s.score || 0) >= r.n; });
      } else if (r.type === 'early') {
        ok = (p.sessions || []).some(function (s) { return (s.hour || 24) < r.n; });
      }
      if (ok) earned.push(b);
    });
    if (earned.length) {
      var next = Object.assign({}, unlocked);
      earned.forEach(function (b) { next[b.id] = new Date().toISOString(); });
      Store.patchProgress({ badges: next }, 'badges');
    }
    return earned;
  };
  SK.badgesEarned = function () {
    var p = Store.get().progress;
    return (SK.CONTENT.badges || []).map(function (b) {
      return { badge: b, at: (p.badges || {})[b.id] || null, unlocked: !!(p.badges || {})[b.id] };
    });
  };

  /* ---------------- tâches quotidiennes ---------------- */
  SK.ensureDailyFlags = function () {
    // remet à zéro les compteurs visuels du jour si besoin (la série est recalculée)
    Store.touchStreak();
  };

  /* ---------------- aperçu / démonstration ----------------
     Ouvrir index.html?demo=1 remplit un profil de démonstration (progression,
     lexique, séances) pour voir l'app remplie sans faire l'onboarding.
     Sert aussi aux captures de contrôle responsive. */
  SK.seedDemo = function () {
    if (Store.get().onboarded) return false;
    Store.set({
      onboarded: true, ui: 'fr', lang: 'de', level: 'B1',
      objectives: ['voyage', 'conversation', 'travail'],
      dailyMinutes: 5, name: 'Alex'
    }, 'demo');
    var lang = Store.langObj();
    Store.seedWords(Object.keys(Store.allWords()).map(function (k) { return Store.allWords()[k]; }));
    // quelques séances passées pour remplir la courbe et la série
    for (var i = 6; i >= 0; i--) {
      var day = U.dayKeyOffset(-i);
      var secs = [180, 240, 300, 0, 260, 320, 210][6 - i] || 0;
      if (!secs) continue;
      Store.patchProgress({
        history: Store.get().progress.history.concat([{ day: day, seconds: secs, missions: 1, score: 62 + (6 - i) * 4 }])
      }, 'demo');
      Store.patchProgress({ totalSeconds: (Store.get().progress.totalSeconds || 0) + secs }, 'demo');
    }
    Store.patchProgress({
      streak: 4, bestStreak: 6, lastDay: U.todayKey(),
      missionsDone: 5, xp: 640,
      sessions: [1, 2, 3].map(function (n) {
        return { id: 'demo-' + n, day: U.dayKeyOffset(-n), hour: 8, seconds: 240, score: 64 + n * 5,
          missionId: 'routine-matin', axes: { fluidez: 72, pronunciation: 68, vocabulary: 70, grammar: 75 } };
      })
    }, 'demo');
    // mots dus aujourd'hui et mots en cours
    Store.dueWords().slice(0, 6).forEach(function (w) { Store.reviewWord(w.word, 45); });
    Object.keys(Store.get().progress.wordStats).slice(0, 9).forEach(function (k) {
      Store.reviewWord(Store.get().progress.wordStats[k].word, 88);
    });
    return true;
  };

  /* ---------------- thème clair / sombre ---------------- */
  /** Applique le thème choisi (préférence explicite, pas de bascule automatique). */
  SK.applyTheme = function () {
    var prefs = (Store.get().prefs) || {};
    var dark = prefs.theme === 'dark';
    var root = document.documentElement;
    if (dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#15131F' : '#5B3FD8');
    SK.isDark = function () { return dark; };
    return dark;
  };
  SK.toggleTheme = function () {
    var prefs = Object.assign({}, Store.get().prefs);
    prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark';
    Store.set({ prefs: prefs }, 'prefs');
    SK.applyTheme();
    return prefs.theme;
  };

  /* ---------------- hors-ligne (PWA) ---------------- */
  SK.offline = {
    supported: ('serviceWorker' in navigator) && location.protocol !== 'file:',
    ready: false,
    register: function (onReady) {
      if (!this.supported) return;
      try {
        navigator.serviceWorker.register('service-worker.js').then(function (reg) {
          SK.offline.ready = true;
          if (onReady) onReady(reg);
        }).catch(function () { /* ignoré : l'app fonctionne sans cache */ });
      } catch (e) { /* ignoré */ }
    },
    isOnline: function () { return navigator.onLine !== false; }
  };

  /* ---------------- amorçage ---------------- */
  function boot() {
    SK.Storage.get('state', null);          // s'assure que le store est chargé
    Store.load();
    SK.applyTheme();                        // thème choisi par l'utilisateur
    if (/[?&]demo=1/.test(location.search)) SK.seedDemo();   // aperçu rempli (?demo=1)
    SK.Store.ensureLexicon();               // amorce la file de révision
    Router.renderChrome();
    Router.init();
    /* hors-ligne : cache l'app pour qu'elle marche sans réseau */
    SK.offline.register(function () {
      U.raf(function () { SK.UI.toast(SK.L('pwa.pret', 'SPEAKLY est prêt à fonctionner hors-ligne.'), 'ok', 2400); });
    });
    if (!SK.offline.isOnline()) {
      setTimeout(function () { SK.UI.toast(SK.L('pwa.horsLigne', 'Mode hors-ligne : tout fonctionne, rien n’est envoyé.'), 'warn', 3000); }, 1200);
    }
    // horloge de la barre d'état du cadre téléphone (cosmétique)
    var clock = U.$('#statusTime');
    if (clock) {
      var tick = function () {
        var d = new Date();
        clock.textContent = d.getHours() + ':' + U.pad2(d.getMinutes());
      };
      tick(); setInterval(tick, 20000);
    }
    // débloque l'audio au premier geste
    var unlock = function () { SK.Sfx.unlock(); document.removeEventListener('pointerdown', unlock); };
    document.addEventListener('pointerdown', unlock, { once: true });
    // capture l'invite d'installation (Chrome/Edge) pour le bouton du profil
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      SK._installPrompt = e;
    });
    // raccourcis clavier (desktop)
    document.addEventListener('keydown', function (e) {
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === 'Escape') SK.UI.closeSheet();
      if (e.key === 'Backspace' && Router.getCurrent() !== 'splash') { e.preventDefault(); Router.back(); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  global.SK.App = { boot: boot };
})(window);
