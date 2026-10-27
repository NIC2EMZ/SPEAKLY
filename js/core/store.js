/* ==========================================================================
   SPEAKLY — store.js : état global, persistance locale, statistiques
   ========================================================================== */
(function (global) {
  'use strict';
  var U = global.SK;

  var KEY = 'state';

  function defaultState() {
    return {
      v: 1,
      onboarded: false,
      ui: 'fr',                 // langue de l'interface
      lang: 'de',               // langue apprise
      level: 'B1',
      objectives: ['voyage', 'conversation'],
      dailyMinutes: 5,
      name: 'Alex',
      createdAt: new Date().toISOString(),
      prefs: { sound: true, haptics: true, autoSpeak: true, slowSpeech: false, dark: false },
      progress: {
        streak: 0,
        bestStreak: 0,
        lastDay: null,
        totalSeconds: 0,
        missionsDone: 0,
        xp: 0,
        history: [],            // {day, seconds, missions, score}
        wordsKnown: {},         // mot -> score max (0..100)
        wordStats: {},          // mot -> {score, reps, lapses, step, next, last, translation, ipa, article}
        badges: {},             // id -> date ISO
        sessions: []            // sessions récentes (max 60)
      },
      draft: null               // session de mission en cours
    };
  }

  var state = null;
  var listeners = [];

  function load() {
    var saved = U.Storage.get(KEY, null);
    var base = defaultState();
    if (!saved || typeof saved !== 'object') { state = base; return state; }
    // fusion superficielle + profonde sur progress/prefs
    state = Object.assign(base, saved);
    state.prefs = Object.assign(base.prefs, saved.prefs || {});
    state.progress = Object.assign(base.progress, saved.progress || {});
    if (!Array.isArray(state.progress.history)) state.progress.history = [];
    if (!Array.isArray(state.progress.sessions)) state.progress.sessions = [];
    if (!state.progress.wordsKnown || typeof state.progress.wordsKnown !== 'object') state.progress.wordsKnown = {};
    if (!state.progress.wordStats || typeof state.progress.wordStats !== 'object') state.progress.wordStats = {};
    if (!state.progress.badges || typeof state.progress.badges !== 'object') state.progress.badges = {};
    if (!Array.isArray(state.objectives) || !state.objectives.length) state.objectives = ['voyage'];
    return state;
  }
  function save() {
    U.Storage.set(KEY, state);
    emit('save');
  }
  function emit(reason) {
    listeners.forEach(function (fn) { try { fn(state, reason); } catch (e) { /* noop */ } });
  }
  function subscribe(fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; }

  /* ---------- accès ---------- */
  function get() { if (!state) load(); return state; }
  function set(patch, reason) {
    if (!state) load();
    Object.assign(state, patch);
    save();
    emit(reason || 'set');
    return state;
  }
  function patchProgress(patch, reason) {
    if (!state) load();
    Object.assign(state.progress, patch);
    save();
    emit(reason || 'progress');
    return state;
  }
  function reset() {
    var keepNothing = defaultState();
    state = keepNothing;
    U.Storage.set(KEY, state);
    emit('reset');
  }
  function exportJSON() { return JSON.stringify(get(), null, 2); }
  function importJSON(str) {
    try {
      var obj = JSON.parse(str);
      if (!obj || typeof obj !== 'object') return false;
      state = null; U.Storage.set(KEY, obj); load(); emit('import'); return true;
    } catch (e) { return false; }
  }

  /* ---------- language helpers ---------- */
  function langObj(code) {
    var c = code || get().lang;
    return (global.SK.CONTENT.languages || []).filter(function (l) { return l.code === c; })[0] || null;
  }
  function uiStrings() {
    var I = global.SK.I18N;
    return I[get().ui] || I.fr;
  }
  function levelObj(code) {
    var c = code || get().level;
    return (global.SK.CONTENT.levels || []).filter(function (l) { return l.code === c; })[0] || null;
  }
  function objectives() {
    var wanted = get().objectives || [];
    return (global.SK.CONTENT.objectives || []).filter(function (o) { return wanted.indexOf(o.id) >= 0; });
  }
  function toggleObjective(id) {
    var s = get(), list = s.objectives.slice();
    var i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.push(id);
    if (!list.length) list = [id];        // au moins un objectif
    set({ objectives: list }, 'objectives');
    return list;
  }

  /* ---------- missions ---------- */
  function missionsFor(langCode, levelCode) {
    var all = (global.SK.CONTENT.missions || []).filter(function (m) { return m.lang === (langCode || get().lang); });
    if (levelCode) {
      var inLevel = all.filter(function (m) { return !m.level || m.level === levelCode; });
      if (inLevel.length) all = inLevel;
    }
    return all;
  }
  /** Mission du jour : rotation déterministe sur la date (stable toute la journée). */
  function missionOfTheDay(langCode, levelCode) {
    var list = missionsFor(langCode, levelCode);
    if (!list.length) return null;
    if (list.length === 1) return list[0];
    var today = U.todayKey();
    var seed = 0;
    for (var i = 0; i < today.length; i++) seed = (seed * 31 + today.charCodeAt(i)) >>> 0;
    var dayIndex = seed % 1000;
    return list[dayIndex % list.length];
  }
  function missionById(id) {
    return (global.SK.CONTENT.missions || []).filter(function (m) { return m.id === id; })[0] || null;
  }
  /** Le paquet de contenu pour une langue (missions + prononciation + dialogues). */
  function packFor(langCode) {
    var code = langCode || get().lang;
    var missions = missionsFor(code, null);
    return {
      missions: missions,
      hasMissions: missions.length > 0,
      pronunciation: (global.SK.CONTENT.pronunciation[code] || []),
      dialogues: (global.SK.CONTENT.conversations[code] || [])
    };
  }

  /* ---------- statistiques ---------- */
  function dayRecord(day) {
    day = day || U.todayKey();
    return get().progress.history.filter(function (h) { return h.day === day; })[0] || { day: day, seconds: 0, missions: 0, score: 0 };
  }
  function secondsToday() { return dayRecord().seconds; }
  function minutesToday() { return Math.round(secondsToday() / 60); }
  function goalSeconds() { return (get().dailyMinutes || 5) * 60; }
  function goalPct() { return U.clamp(secondsToday() / goalSeconds(), 0, 1); }
  function totalMinutes() { return Math.round((get().progress.totalSeconds || 0) / 60); }
  function wordsKnownCount() { return Object.keys(get().progress.wordsKnown || {}).length; }
  function weeklySeries() { // 7 derniers jours, du plus ancien à aujourd'hui
    var out = [];
    for (var i = 6; i >= 0; i--) {
      var day = U.dayKeyOffset(-i);
      var rec = dayRecord(day);
      out.push({ day: day, seconds: rec.seconds, missions: rec.missions, label: dayLabel(day), today: i === 0 });
    }
    return out;
  }
  function dayLabel(key) {
    var names = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    var p = key.split('-').map(Number);
    var d = new Date(p[0], p[1] - 1, p[2]);
    return names[d.getDay()];
  }
  function activeDays() {
    return get().progress.history.filter(function (h) { return h.seconds > 0; }).length;
  }
  function averageScore() {
    var sess = get().progress.sessions || [];
    if (!sess.length) return 0;
    return Math.round(U.avg(sess.slice(-15).map(function (s) { return s.score || 0; })));
  }

  /* ---------- écriture de session ---------- */
  function addSecondsToday(sec, kind) {
    var day = U.todayKey();
    var hist = get().progress.history.slice();
    var idx = -1;
    for (var i = 0; i < hist.length; i++) if (hist[i].day === day) { idx = i; break; }
    if (idx < 0) { hist.push({ day: day, seconds: 0, missions: 0, score: 0 }); idx = hist.length - 1; }
    hist[idx].seconds += Math.max(0, Math.round(sec));
    if (kind === 'mission') hist[idx].missions += 1;
    hist = hist.slice(-120);
    patchProgress({ totalSeconds: (get().progress.totalSeconds || 0) + Math.max(0, Math.round(sec)), history: hist }, 'seconds');
    touchStreak();
  }

  /** Met à jour la série de jours consécutifs (streak). */
  function touchStreak() {
    var p = get().progress;
    var today = U.todayKey();
    if (p.lastDay === today) return p.streak;
    var streak = 1;
    if (p.lastDay && U.diffDays(p.lastDay, today) === 1) streak = (p.streak || 0) + 1;
    patchProgress({
      streak: streak,
      bestStreak: Math.max(streak, p.bestStreak || 0),
      lastDay: today
    }, 'streak');
    return streak;
  }

  function recordSession(session) {
    var p = get().progress;
    var sessions = (p.sessions || []).slice();
    sessions.push(session);
    sessions = sessions.slice(-60);
    var hist = p.history.slice();
    var idx = -1;
    for (var i = 0; i < hist.length; i++) if (hist[i].day === session.day) { idx = i; break; }
    if (idx < 0) { hist.push({ day: session.day, seconds: 0, missions: 0, score: 0 }); idx = hist.length - 1; }
    hist[idx].score = Math.max(hist[idx].score || 0, session.score || 0);
    var words = Object.assign({}, p.wordsKnown);
    (session.words || []).forEach(function (w) {
      var key = w.word;
      var prev = words[key] || 0;
      words[key] = Math.max(prev, w.score || 0);
    });
    patchProgress({
      sessions: sessions,
      history: hist.slice(-120),
      totalSeconds: (p.totalSeconds || 0) + Math.round(session.seconds || 0),
      missionsDone: (p.missionsDone || 0) + 1,
      xp: (p.xp || 0) + Math.round(session.xp || 0),
      wordsKnown: words,
      lastDay: session.day
    }, 'session');
    // les mots travaillés dans la séance entrent dans la file de révision espacée
    (session.words || []).forEach(function (w) {
      if (!w || !w.word) return;
      reviewWord(w.word, w.score || 0);
    });
    return get();
  }

  function saveDraft(d) { set({ draft: d }, 'draft'); }
  function clearDraft() { set({ draft: null }, 'draft'); }

  /* ---------- moteur de révision (répétition espacée) ----------
     Chaque mot rencontré entre dans le lexique. S'il est mal prononcé, il revient
     le lendemain (J+1), puis J+3, J+7, J+21, J+45. Un mot réussi monte d'un cran,
     un mot raté redescend au premier palier : le contenu existant se recycle donc
     indéfiniment au lieu d'être consommé une seule fois. */
  var REVIEW_STEPS = [1, 3, 7, 21, 45];
  var FAIL_STEP = 0;                  // un mot raté repart au premier palier (J+1)

  function wordKey(word) { return U.norm(word).replace(/^(der|die|das)\s+/, ''); }

  /** Tous les mots de vocabulaire présents dans les missions d'une langue. */
  function allWords(langCode) {
    var out = {};
    missionsFor(langCode, null).forEach(function (m) {
      (m.vocabulary || []).forEach(function (w) {
        out[wordKey(w.word)] = {
          word: w.word, article: w.article || '', translation: w.translation || '',
          ipa: w.ipa || '', example: w.example || '', mission: m.id
        };
      });
    });
    return out;
  }

  /** Introduit des mots dans le lexique (sans écraser une progression existante). */
  function seedWords(list) {
    var p = get().progress;
    var stats = Object.assign({}, p.wordStats || {});
    var added = 0;
    (list || []).forEach(function (w) {
      if (!w || !w.word) return;
      var k = wordKey(w.word);
      if (!k) return;
      var cur = stats[k];
      if (!cur) {
        stats[k] = {
          word: w.word, score: 0, reps: 0, lapses: 0, step: 0, next: U.todayKey(), last: null,
          translation: w.translation || '', ipa: w.ipa || '', article: w.article || ''
        };
        added++;
      } else {
        if (!cur.word) cur.word = w.word;
        if (!cur.translation && w.translation) cur.translation = w.translation;
        if (!cur.ipa && w.ipa) cur.ipa = w.ipa;
        if (!cur.article && w.article) cur.article = w.article;
      }
    });
    if (added) patchProgress({ wordStats: stats }, 'words');
    return added;
  }

  /** Prépare le lexique à partir des mots utiles de la mission du jour (1 seule fois). */
  function ensureLexicon() {
    var stats = get().progress.wordStats || {};
    if (Object.keys(stats).length) return 0;
    var words = Object.keys(allWords(null)).map(function (k) { return allWords(null)[k]; });
    return seedWords(words);
  }

  function dueWords(day) {
    day = day || U.todayKey();
    var stats = get().progress.wordStats || {};
    return Object.keys(stats).map(function (k) {
      return Object.assign({ key: k }, stats[k]);
    }).filter(function (w) { return (w.next || day) <= day; })
      .sort(function (a, b) { return (a.score || 0) - (b.score || 0) || String(a.next).localeCompare(String(b.next)); });
  }

  /** Enregistre un essai sur un mot et replanifie sa prochaine révision. */
  function reviewWord(word, score) {
    var k = wordKey(word);
    var p = get().progress;
    var stats = Object.assign({}, p.wordStats || {});
    var w = stats[k] || { reps: 0, lapses: 0, step: 0, next: U.todayKey() };
    if (!w.word) w.word = word;
    score = Math.round(U.clamp(score || 0, 0, 100));
    var ok = score >= 70;
    w.reps = (w.reps || 0) + 1;
    w.score = Math.max(w.score || 0, score);
    w.last = U.todayKey();
    if (ok) w.step = Math.min((w.step || 0) + 1, REVIEW_STEPS.length);
    else { w.lapses = (w.lapses || 0) + 1; w.step = FAIL_STEP; }
    var interval;
    if (!ok) interval = REVIEW_STEPS[FAIL_STEP];                      // raté → J+1
    else if (w.step >= REVIEW_STEPS.length) interval = REVIEW_STEPS[REVIEW_STEPS.length - 1];  // maîtrisé → J+45
    else interval = REVIEW_STEPS[w.step];
    w.next = U.addDays(U.todayKey(), interval);
    stats[k] = w;
    var words = Object.assign({}, p.wordsKnown);
    words[word] = Math.max(words[word] || 0, score);
    patchProgress({ wordStats: stats, wordsKnown: words }, 'review');
    return w;
  }

  function masteredCount() {
    var stats = get().progress.wordStats || {};
    return Object.keys(stats).filter(function (k) { return (stats[k].step || 0) >= REVIEW_STEPS.length; }).length;
  }
  function wordStatsSummary() {
    var stats = get().progress.wordStats || {};
    var total = Object.keys(stats).length, mastered = 0, fresh = 0;
    Object.keys(stats).forEach(function (k) {
      var w = stats[k];
      if ((w.step || 0) >= REVIEW_STEPS.length) mastered++;
      else if (!w.reps) fresh++;
    });
    return { total: total, mastered: mastered, fresh: fresh, learning: total - mastered - fresh, due: dueWords().length };
  }
  /** Humanise la prochaine échéance d'un mot. */
  function nextLabel(nextDay) {
    var diff = U.diffDays(U.todayKey(), nextDay || U.todayKey());
    if (diff <= 0) return 'aujourd’hui';
    if (diff === 1) return 'demain';
    return 'dans ' + diff + ' j';
  }

  /** Réparation de compatibilité : anciens lexiques sans le champ `word`. */
  function migrateWordStats() {
    var stats = get().progress.wordStats || {};
    var catalog = null;
    var changed = false;
    Object.keys(stats).forEach(function (k) {
      var w = stats[k];
      if (w && w.word) return;
      if (!catalog) catalog = allWords(null);
      var found = catalog[k];
      if (found) { w.word = found.word; if (!w.translation) w.translation = found.translation; changed = true; }
      else { w.word = k; changed = true; }
    });
    if (changed) { save(); emit('migrate'); }
    return changed;
  }

  var Store = {
    load: load, save: save, get: get, set: set, reset: reset, subscribe: subscribe,
    patchProgress: patchProgress, exportJSON: exportJSON, importJSON: importJSON,
    defaultState: defaultState,
    langObj: langObj, uiStrings: uiStrings, levelObj: levelObj, objectives: objectives, toggleObjective: toggleObjective,
    missionsFor: missionsFor, missionOfTheDay: missionOfTheDay, missionById: missionById, packFor: packFor,
    dayRecord: dayRecord, secondsToday: secondsToday, minutesToday: minutesToday, goalSeconds: goalSeconds,
    goalPct: goalPct, totalMinutes: totalMinutes, wordsKnownCount: wordsKnownCount, weeklySeries: weeklySeries,
    activeDays: activeDays, averageScore: averageScore, addSecondsToday: addSecondsToday, touchStreak: touchStreak,
    recordSession: recordSession, saveDraft: saveDraft, clearDraft: clearDraft,
    REVIEW_STEPS: REVIEW_STEPS, wordKey: wordKey, allWords: allWords, seedWords: seedWords,
    ensureLexicon: ensureLexicon, dueWords: dueWords, reviewWord: reviewWord,
    migrateWordStats: migrateWordStats,
    masteredCount: masteredCount, wordStatsSummary: wordStatsSummary, nextLabel: nextLabel
  };

  global.SK.Store = Store;
  load();
  try { migrateWordStats(); } catch (e) { /* lexique absent : rien à migrer */ }
})(window);
