/* ==========================================================================
   SPEAKLY — util.js : helpers DOM, dates, stockage, texte
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---------- DOM ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  /** Vrai pour un nœud DOM (compatible navigateurs + harnais de test). */
  function isNode(v) {
    return !!v && typeof v === 'object' && typeof v.nodeType === 'number';
  }

  /**
   * el('div.card', { attrs }, [children])
   * Sélecteur léger : "tag.class1.class2#id" (un seul tag, plusieurs classes)
   */
  function el(spec, attrs, children) {
    spec = spec || 'div';
    var m = /^([a-zA-Z0-9]+)?((?:\.[\w-]+)*)(?:#([\w-]+))?$/.exec(spec.trim());
    var tag = (m && m[1]) || 'div';
    var node = document.createElement(tag);
    if (m && m[2]) m[2].split('.').filter(Boolean).forEach(function (c) { node.classList.add(c); });
    if (m && m[3]) node.id = m[3];
    if (attrs && (typeof attrs !== 'object' || Array.isArray(attrs) || isNode(attrs))) {
      children = attrs; attrs = null;
    }
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') node.className += (node.className ? ' ' : '') + v;
        else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'dataset') Object.keys(v).forEach(function (d) { node.dataset[d] = v[d]; });
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'value') node.value = v;
        else node.setAttribute(k, v === true ? '' : v);
      });
    }
    append(node, children);
    return node;
  }

  function append(parent, kids) {
    if (kids === null || kids === undefined || kids === false) return parent;
    if (Array.isArray(kids)) { kids.forEach(function (k) { append(parent, k); }); return parent; }
    parent.appendChild(isNode(kids) ? kids : document.createTextNode(String(kids)));
    return parent;
  }

  /** Fragment HTML -> nœuds. `html` n'est utilisé QUE pour du contenu de confiance. */
  function html(str) {
    var t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstElementChild;
  }

  /* ---------- libellés (dépendent du store : évalués à l'appel) ---------- */
  /** Libellé multilingue de contenu : {fr:'…', en:'…'} -> chaîne. */
  function t(obj, fallback) {
    if (obj === null || obj === undefined) return fallback || '';
    if (typeof obj === 'string') return obj;
    var ui = (global.SK.Store ? global.SK.Store.get().ui : 'fr') || 'fr';
    return obj[ui] || obj.fr || obj.en || fallback || '';
  }
  /**
   * Libellé d'interface : L('mission.titre') avec repli français.
   * `vars` remplace les jetons du dictionnaire : {nom}, {langue}, {n}, {min}, {sec}, {note}…
   */
  function fillVars(text, values) {
    if (!values || typeof text !== 'string') return text;
    return text.replace(/\{(\w+)\}/g, function (m, k) {
      return (values[k] === undefined || values[k] === null) ? m : String(values[k]);
    });
  }
  /**
   * Libellé d'interface : L('mission.titre') avec repli français.
   * `values` remplace les jetons du dictionnaire : {nom}, {langue}, {n}, {min}, {sec}, {note}…
   * Les variables d'usage courant (prénom, langue, durée quotidienne) sont fournies
   * automatiquement si l'appelant ne les passe pas.
   */
  function L(key, fallback, values) {
    var I18N = (global.SK.I18N) || {};
    var ui = (global.SK.Store ? global.SK.Store.get().ui : 'fr') || 'fr';
    var dict = I18N[ui] || {};
    var fr = I18N.fr || {};
    var out;
    if (dict[key] !== undefined && dict[key] !== null) out = dict[key];
    else if (fr[key] !== undefined && fr[key] !== null) out = fr[key];
    else out = fallback !== undefined ? fallback : key;
    if (typeof out === 'string' && out.indexOf('{') >= 0) {
      var base = {};
      if (global.SK.vars) { try { base = global.SK.vars(); } catch (e) { base = {}; } }
      base.n = base.n !== undefined ? base.n : base.min;
      base.total = base.total !== undefined ? base.total : base.min;
      out = fillVars(out, mergeValues(base, values));
    }
    return out;
  }
  function mergeValues(base, extra) {
    if (!extra) return base;
    var out = {};
    Object.keys(base).forEach(function (k) { out[k] = base[k]; });
    Object.keys(extra).forEach(function (k) { if (extra[k] !== undefined && extra[k] !== null) out[k] = extra[k]; });
    return out;
  }
  /** Variables de gabarit courantes : nom, langue, objectif quotidien. */
  function vars() {
    var st = global.SK.Store ? global.SK.Store.get() : {};
    var lang = (global.SK.CONTENT && global.SK.CONTENT.languages || []).filter(function (l) { return l.code === st.lang; })[0];
    return {
      nom: st.name || 'Alex',
      langue: lang ? lang.fr : '',
      native: lang ? lang.native : '',
      min: st.dailyMinutes || 5,
      total: ((st.dailyMinutes || 5))
    };
  }

  /* ---------- Icônes (SVG inline, style ligne) ---------- */
  var P = {
    back: '<path d="M15 18l-6-6 6-6"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    chevronL: '<path d="M15 18l-6-6 6-6"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v4M8 22h8"/>',
    play: '<path d="M6 4l14 8-14 8V4z"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1.4"/><rect x="14" y="5" width="4" height="14" rx="1.4"/>',
    home: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/>',
    bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 016.5 2H20v18H6.5A2.5 2.5 0 004 22.5z"/><path d="M4 17.5A2.5 2.5 0 016.5 15H20"/>',
    bookOpen: '<path d="M12 6.5C10.5 5 8.5 4.5 4 4.5v13c4.5 0 6.5.5 8 2 1.5-1.5 3.5-2 8-2v-13c-4.5 0-6.5.5-8 2z"/><path d="M12 6.5v13"/>',
    chat: '<path d="M21 12a8 8 0 01-8 8H8l-5 3 1.4-4.6A8 8 0 1121 12z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0115 0"/>',
    star: '<path d="M12 3l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.8 6.1 20.9l1.2-6.5-4.8-4.6 6.6-.9z"/>',
    fire: '<path d="M12 22a6 6 0 006-6c0-4-3-5-3-9 0 0-2.5 1.6-2.5 4.4C10.9 9.7 9 8 9 5.5 6.5 8 5 10.5 5 14a7 7 0 007 7z"/>',
    speaker: '<path d="M11 5L6.5 9H3v6h3.5L11 19V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M18 6a8.5 8.5 0 010 12"/>',
    wave: '<path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 11v2"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3.2 2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A2 2 0 0110.5 3.5h3A2 2 0 0115.5 5.5V7M3 12h18"/>',
    plane: '<path d="M10.5 19.5L12 15l7 3 1-2-6-4 1.5-6A1.6 1.6 0 0013 4.4L11 10l-6-1.5-1 2 5 3-1.5 5z"/>',
    coffee: '<path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 010 5H17"/><path d="M4 21h13"/>',
    doc: '<path d="M6 2.5h8L20 8.5V21.5H6z"/><path d="M14 2.5V8.5h6M9 13h8M9 17h5"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 007 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    heart: '<path d="M12 20s-7-4.4-7-9.4A4 4 0 0112 8a4 4 0 017-2.4c0 5-7 14.4-7 14.4z" transform="translate(0 0)"/>',
    shield: '<path d="M12 22s7-3.2 7-9V5.5L12 3 5 5.5V13c0 5.8 7 9 7 9z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8l1.2 2.6 2.8-.6.6 2.8 2.6 1.2-1.4 2.5 1.4 2.5-2.6 1.2-.6 2.8-2.8-.6L12 21.2l-1.2-2.6-2.8.6-.6-2.8L4.8 15l1.4-2.5L4.8 10l2.6-1.2.6-2.8 2.8.6z"/>',
    bell: '<path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2.2 2.2 0 004 0"/>',
    share: '<path d="M12 16V4"/><path d="M8 8l4-4 4 4"/><path d="M5 14v5.5A1.5 1.5 0 006.5 21h11A1.5 1.5 0 0019 19.5V14"/>',
    download: '<path d="M12 4v12"/><path d="M8 12l4 4 4-4"/><path d="M5 20h14"/>',
    refresh: '<path d="M20 11A8 8 0 006 6L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0014 5l2-2"/><path d="M20 20v-4h-4"/>',
    trash: '<path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    sparkle: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 01-8 0z"/><path d="M8 5H5.5v2A3 3 0 008 10"/><path d="M16 5h2.5v2a3 3 0 01-2.5 3"/><path d="M13 13v3h3v3H8v-3h3v-3"/>',
    volume: '<path d="M4 9v6h3l4 3V6L7 9z"/><path d="M14 9.5a3.5 3.5 0 010 5"/><path d="M16.5 7a7 7 0 010 10"/>',
    pencil: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 5l3 3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    lock: '<rect x="4.5" y="10" width="15" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 018 0v3"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    plus_circle: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    translate: '<path d="M4 6h9M8.5 6c0 5-2 8-4.5 10"/><path d="M6 11c1.5 3.5 4 5.5 7 6"/><path d="M13 20l4-10 4 10"/><path d="M14.6 17h4.8"/>',
    moon: '<path d="M20.5 14.2A8.5 8.5 0 019.8 3.5a7 7 0 1010.7 10.7z"/>'
  };
  function icon(name, size, extraClass) {
    var d = P[name] || P.info;
    var s = size || 20;
    return html('<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" ' +
      'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="ic ' + (extraClass || '') + '" aria-hidden="true">' + d + '</svg>');
  }
  function iconFilled(name, size) {
    var d = P[name] || P.star;
    var s = size || 20;
    return html('<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor" class="ic" aria-hidden="true">' + d + '</svg>');
  }
  var ICONS = P;

  /* ---------- Stockage ---------- */
  var NS = 'speakly.v1.';
  var Storage = {
    get: function (k, fallback) {
      try {
        var raw = localStorage.getItem(NS + k);
        if (raw === null) return fallback;
        return JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (k, v) {
      try { localStorage.setItem(NS + k, JSON.stringify(v)); return true; }
      catch (e) { return false; }
    },
    del: function (k) { try { localStorage.removeItem(NS + k); } catch (e) {} },
    clearAll: function () {
      try {
        Object.keys(localStorage).filter(function (k) { return k.indexOf(NS) === 0; })
          .forEach(function (k) { localStorage.removeItem(k); });
      } catch (e) {}
    }
  };

  /* ---------- Dates ---------- */
  function todayKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function dayKeyOffset(offset) {
    var d = new Date(); d.setDate(d.getDate() + offset); return todayKey(d);
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function addDays(key, n) {
    var p = key.split('-').map(Number);
    var d = new Date(p[0], p[1] - 1, p[2]);
    d.setDate(d.getDate() + n);
    return todayKey(d);
  }
  function diffDays(a, b) {
    var pa = a.split('-').map(Number), pb = b.split('-').map(Number);
    var da = Date.UTC(pa[0], pa[1] - 1, pa[2]), db = Date.UTC(pb[0], pb[1] - 1, pb[2]);
    return Math.round((db - da) / 86400000);
  }
  function humanDate(d) {
    d = d || new Date();
    try {
      return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    } catch (e) { return todayKey(d); }
  }

  /* ---------- Temps / nombres ---------- */
  function fmtClock(totalSec) {
    totalSec = Math.max(0, Math.round(totalSec));
    var m = Math.floor(totalSec / 60), s = totalSec % 60;
    return pad2(m) + ':' + pad2(s);
  }
  function fmtDuration(totalSec) {
    totalSec = Math.max(0, Math.round(totalSec));
    var m = Math.floor(totalSec / 60), s = totalSec % 60;
    if (m === 0) return s + ' sec';
    if (s === 0) return m + ' min';
    return m + ' min ' + s + ' sec';
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function round1(v) { return Math.round(v * 10) / 10; }
  function sum(arr) { return arr.reduce(function (a, b) { return a + b; }, 0); }
  function avg(arr) { return arr.length ? sum(arr) / arr.length : 0; }

  /* ---------- Texte ---------- */
  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[’']/g, "'")
      .replace(/[^a-z0-9äöüß' ]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function words(s) { var n = norm(s); return n ? n.split(' ') : []; }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /**
   * Similarité (0..1) tolérante : distance de Levenshtein sur les mots,
   * puis alignement mot-à-mot. Utilisée pour noter la prononciation.
   */
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var prev = new Array(b.length + 1), cur = new Array(b.length + 1), i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur[0] = i;
      for (j = 1; j <= b.length; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      var t = prev; prev = cur; cur = t;
    }
    return prev[b.length];
  }
  function ratio(a, b) {
    a = norm(a); b = norm(b);
    if (!a && !b) return 1;
    var max = Math.max(a.length, b.length);
    if (!max) return 1;
    return clamp(1 - levenshtein(a, b) / max, 0, 1);
  }
  /** Score d'alignement mot à mot (0..1), robuste aux mots manquants/en trop. */
  function alignScore(said, target) {
    var A = words(said), B = words(target);
    if (!B.length) return 1;
    if (!A.length) return 0;
    var used = new Array(A.length).fill(false);
    var total = 0;
    B.forEach(function (tw) {
      var best = 0, bi = -1;
      A.forEach(function (aw, i) {
        if (used[i]) return;
        var r = ratio(aw, tw);
        if (r > best) { best = r; bi = i; }
      });
      if (bi >= 0 && best >= 0.55) { used[bi] = true; total += best; }
    });
    return clamp(total / B.length, 0, 1);
  }

  /* ---------- Divers ---------- */
  function debounce(fn, ms) {
    var t; return function () {
      var args = arguments, self = this;
      clearTimeout(t); t = setTimeout(function () { fn.apply(self, args); }, ms || 160);
    };
  }
  function raf(fn) { return requestAnimationFrame(fn); }
  function tap(fn) { // retour haptique léger si dispo
    return function (ev) {
      try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {}
      return fn.call(this, ev);
    };
  }
  function uid(prefix) {
    return (prefix || 'id') + '-' + Math.random().toString(36).slice(2, 9);
  }
  function deepGet(obj, path, fallback) {
    var cur = obj;
    var parts = String(path).split('.');
    for (var i = 0; i < parts.length; i++) {
      if (cur === null || cur === undefined) return fallback;
      cur = cur[parts[i]];
    }
    return cur === undefined ? fallback : cur;
  }

  global.SK = global.SK || {};
  Object.assign(global.SK, {
    $: $, $$: $$, el: el, append: append, html: html,
    icon: icon, iconFilled: iconFilled, ICONS: ICONS,
    t: t, L: L, vars: vars, fillVars: fillVars,
    Storage: Storage, NS: NS,
    todayKey: todayKey, dayKeyOffset: dayKeyOffset, addDays: addDays, diffDays: diffDays,
    humanDate: humanDate, pad2: pad2,
    fmtClock: fmtClock, fmtDuration: fmtDuration,
    clamp: clamp, round1: round1, sum: sum, avg: avg,
    norm: norm, words: words, escapeHtml: escapeHtml, capitalize: capitalize,
    shuffle: shuffle, pick: pick, ratio: ratio, alignScore: alignScore, levenshtein: levenshtein,
    debounce: debounce, raf: raf, tap: tap, uid: uid, deepGet: deepGet
  });
})(window);
