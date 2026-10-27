/* ==========================================================================
   SPEAKLY — sfx.js : petits sons de feedback (Web Audio, aucun fichier externe)
   ========================================================================== */
(function (global) {
  'use strict';
  var ctx = null;

  function ensure() {
    var AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) { try { ctx = new AC(); } catch (e) { return null; } }
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }
  function on() {
    var p = (global.SK.Store && global.SK.Store.get().prefs) || {};
    return p.sound !== false;
  }
  function tone(freq, dur, when, type, gain) {
    var c = ensure(); if (!c) return;
    var t0 = c.currentTime + (when || 0);
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain === undefined ? 0.13 : gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(c.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  }
  function seq(notes, type, gain) {
    notes.forEach(function (n) { tone(n[0], n[1], n[2], type, gain); });
  }

  global.SK.Sfx = {
    unlock: function () { ensure(); },
    tap: function () { if (on()) tone(660, 0.06, 0, 'triangle', 0.06); },
    pop: function () { if (on()) tone(880, 0.08, 0, 'sine', 0.08); },
    ok: function () { if (on()) seq([[784, 0.12, 0], [1046, 0.2, 0.1]], 'sine', 0.1); },
    great: function () { if (on()) seq([[659, 0.14, 0], [880, 0.14, 0.1], [1175, 0.24, 0.2]], 'triangle', 0.1); },
    soft: function () { if (on()) seq([[440, 0.14, 0], [392, 0.2, 0.1]], 'sine', 0.08); },
    start: function () { if (on()) seq([[523, 0.1, 0], [659, 0.14, 0.07]], 'sine', 0.08); },
    stop: function () { if (on()) seq([[659, 0.1, 0], [523, 0.16, 0.07]], 'sine', 0.08); },
    streak: function () { if (on()) seq([[880, 0.1, 0], [1108, 0.12, 0.08], [1318, 0.22, 0.17]], 'sine', 0.1); }
  };
})(window);
