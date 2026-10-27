/* ==========================================================================
   SPEAKLY — speech.js : synthèse vocale (écoute des modèles) + reconnaissance
   vocale (l'apprenant PARLE). 100 % navigateur, aucune clé API.
   ========================================================================== */
(function (global) {
  'use strict';

  var synth = global.speechSynthesis || null;
  var voices = [];

  function refreshVoices() {
    if (!synth) return voices;
    try { voices = synth.getVoices() || []; } catch (e) { voices = []; }
    return voices;
  }
  if (synth) {
    refreshVoices();
    if (typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = refreshVoices;
  }

  var BASE = { de: 'de', en: 'en', es: 'es', pt: 'pt', fr: 'fr', it: 'it', ko: 'ko', ja: 'ja', zh: 'zh', ar: 'ar', hi: 'hi', tr: 'tr' };

  function voiceFor(code, preferName) {
    if (!voices.length) refreshVoices();
    if (!voices.length) return null;
    var base = BASE[code] || code;
    var cands = voices.filter(function (v) { return (v.lang || '').toLowerCase().indexOf(base) === 0; });
    if (!cands.length) return null;
    if (preferName) {
      var named = cands.filter(function (v) { return v.name.toLowerCase().indexOf(preferName.toLowerCase()) >= 0; });
      if (named.length) return named[0];
    }
    // préférence : voix locale + qualité "Google/Microsoft/Apple" si dispo
    var score = function (v) {
      var s = 0;
      if (v.localService) s += 2;
      if (/google|microsoft|apple|siri|natural|premium|enhanced/i.test(v.name)) s += 3;
      if (v.default) s += 1;
      return s;
    };
    return cands.sort(function (a, b) { return score(b) - score(a); })[0];
  }

  var speaking = false;
  var current = null;

  function canSpeak() { return !!synth; }

  function speak(text, opts) {
    opts = opts || {};
    if (!synth || !text) { if (opts.onend) setTimeout(opts.onend, 120); return false; }
    stop();
    try {
      var u = new SpeechSynthesisUtterance(String(text));
      var code = opts.lang || (global.SK.Store ? global.SK.Store.get().lang : 'de');
      u.lang = fullLocale(code);
      var v = voiceFor(code, opts.voiceName);
      if (v) u.voice = v;
      var prefs = (global.SK.Store && global.SK.Store.get().prefs) || {};
      u.rate = opts.rate || (prefs.slowSpeech ? 0.72 : 0.92);
      u.pitch = opts.pitch || 1;
      u.volume = typeof opts.volume === 'number' ? opts.volume : 1;
      u.onstart = function () { speaking = true; if (opts.onstart) opts.onstart(); };
      u.onend = function () { speaking = false; current = null; if (opts.onend) opts.onend(); };
      u.onerror = function () { speaking = false; current = null; if (opts.onerror) opts.onerror(); };
      current = u;
      synth.speak(u);
      return true;
    } catch (e) {
      if (opts.onend) opts.onend();
      return false;
    }
  }

  function fullLocale(code) {
    var map = { de: 'de-DE', en: 'en-US', es: 'es-ES', pt: 'pt-PT', fr: 'fr-FR', it: 'it-IT', ko: 'ko-KR', ja: 'ja-JP', zh: 'zh-CN', ar: 'ar-SA', hi: 'hi-IN', tr: 'tr-TR' };
    return map[code] || code || 'en-US';
  }

  function stop() {
    if (!synth) return;
    try { synth.cancel(); } catch (e) {}
    speaking = false; current = null;
  }
  function isSpeaking() { return speaking; }

  /* ---------------- Reconnaissance vocale ---------------- */
  var SR = global.SpeechRecognition || global.webkitSpeechRecognition || null;
  var rec = null, recActive = false, wantActive = false, handlers = {}, restartTimer = null;

  function canRecognize() { return !!SR; }

  function recognizerSupportedLang() { return fullLocale((global.SK.Store && global.SK.Store.get().lang) || 'de'); }

  function build(langOverride) {
    if (!SR) return null;
    var r = new SR();
    r.lang = langOverride ? fullLocale(langOverride) : recognizerSupportedLang();
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 3;
    return r;
  }

  function start(opts) {
    if (!SR) { if (opts && opts.onunsupported) opts.onunsupported(); return false; }
    handlers = opts || {};                 // les callbacks sont remplaçables à chaud
    wantActive = true;
    if (recActive && rec) return true;     // déjà en écoute : on garde la même instance
    clearTimeout(restartTimer);
    rec = build(handlers.lang);
    if (!rec) return false;

    rec.onstart = function () {
      recActive = true;
      if (handlers.onstart) handlers.onstart();
    };
    rec.onresult = function (ev) {
      var finalText = '', interim = '';
      for (var i = ev.resultIndex; i < ev.results.length; i++) {
        var res = ev.results[i];
        if (res.isFinal) finalText += res[0].transcript;
        else interim += res[0].transcript;
      }
      if (handlers.onresult) handlers.onresult({ final: finalText.trim(), interim: interim.trim(), raw: ev });
    };
    rec.onerror = function (ev) {
      var code = ev && ev.error;
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        wantActive = false;
        recActive = false;
        if (handlers.onerror) handlers.onerror({ error: code, fatal: true });
        return;
      }
      if (handlers.onerror) handlers.onerror({ error: code, fatal: false });
      // "no-speech" / "aborted" / "network" → on relance si l'utilisateur le veut
    };
    rec.onend = function () {
      recActive = false;
      if (handlers.onend) handlers.onend();
      if (wantActive) {
        clearTimeout(restartTimer);
        restartTimer = setTimeout(function () {
          if (!wantActive) return;
          try { rec.start(); } catch (e) { /* déjà démarré */ }
        }, 320);
      }
    };
    try { rec.start(); return true; }
    catch (e) {
      if (handlers.onerror) handlers.onerror({ error: 'start-failed', fatal: false });
      return false;
    }
  }

  function stop() {
    wantActive = false;
    clearTimeout(restartTimer);
    if (rec) { try { rec.stop(); } catch (e) {} }
  }
  function abort() {
    wantActive = false;
    clearTimeout(restartTimer);
    if (rec) { try { rec.abort(); } catch (e) {} }
  }
  function isListening() { return recActive; }

  global.SK.Speech = {
    canSpeak: canSpeak, speak: speak, stopSpeaking: stop, isSpeaking: isSpeaking,
    voiceFor: voiceFor, voices: function () { return refreshVoices(); },
    fullLocale: fullLocale,
    canRecognize: canRecognize, startRecognition: start, stopRecognition: stop,
    abortRecognition: abort, isListening: isListening
  };
})(window);
