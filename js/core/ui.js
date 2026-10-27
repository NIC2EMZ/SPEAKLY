/* ==========================================================================
   SPEAKLY — ui.js : composants réutilisables (toast, sheet, topbar, meter…)
   ========================================================================== */
(function (global) {
  'use strict';
  var U = global.SK;
  var el = U.el, icon = U.icon, $ = U.$;

  /* ---------------- Toast ---------------- */
  var toastWrap = null;
  function toast(msg, kind, ms) {
    toastWrap = toastWrap || $('#toastWrap');
    if (!toastWrap) return;
    var ico = kind === 'ok' ? 'check' : kind === 'warn' ? 'info' : kind === 'star' ? 'star' : 'info';
    var node = el('div.toast', [icon(ico, 16), el('span', { text: msg })]);
    if (kind === 'ok') node.style.background = 'rgba(23,169,122,.96)';
    if (kind === 'warn') node.style.background = 'rgba(245,165,36,.98)';
    if (kind === 'star') node.style.background = 'rgba(91,63,216,.96)';
    toastWrap.appendChild(node);
    setTimeout(function () {
      node.classList.add('out');
      setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 320);
    }, ms || 2100);
  }

  /* ---------------- Bottom sheet ---------------- */
  var sheet = null, backdrop = null, sheetBody = null, onSheetClose = null;
  function openSheet(build, opts) {
    opts = opts || {};
    sheet = sheet || $('#sheet');
    backdrop = backdrop || $('#sheetBackdrop');
    sheetBody = sheetBody || $('#sheetBody');
    sheetBody.innerHTML = '';
    if (typeof build === 'string') sheetBody.appendChild(U.html(build));
    else if (build && typeof build === 'object' && typeof build.nodeType === 'number') sheetBody.appendChild(build);
    else if (typeof build === 'function') { var r = build(); if (r) sheetBody.appendChild(r); }
    sheet.hidden = false; backdrop.hidden = false;
    onSheetClose = opts.onClose || null;
    setTimeout(function () {
      $$in(sheetBody, 'button, a, input, select').forEach(function (n) { /* no autofocus */ });
    }, 10);
    backdrop.onclick = closeSheet;
    return sheetBody;
  }
  function $$in(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
  function closeSheet(fromCallback) {
    if (!sheet) return;
    sheet.hidden = true; backdrop.hidden = true;
    if (sheetBody) sheetBody.innerHTML = '';
    var cb = onSheetClose; onSheetClose = null;
    if (cb && !fromCallback) cb();
  }

  /* ---------------- Confetti ---------------- */
  function celebrate(n) {
    var wrap = $('#celebrate');
    if (!wrap) return;
    wrap.hidden = false;
    var colors = ['#F0426E', '#6C4BE8', '#22C08C', '#F5A524', '#3B9DF8', '#B7A4F7'];
    for (var i = 0; i < (n || 34); i++) {
      var p = el('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * 0.6) + 's';
      p.style.animationDuration = (1.8 + Math.random() * 1.4) + 's';
      if (i % 3 === 0) p.style.borderRadius = '99px';
      wrap.appendChild(p);
    }
    setTimeout(function () { wrap.hidden = true; wrap.innerHTML = ''; }, 3200);
  }

  /* ---------------- Topbar ---------------- */
  function topbar(opts) {
    opts = opts || {};
    var bar = el('div.topbar' + (opts.plain ? '.plain' : ''));
    if (opts.onBack !== false) {
      bar.appendChild(el('button.icon-btn', {
        type: 'button', 'aria-label': 'Retour', onclick: function () { if (opts.onBack) opts.onBack(); else global.SK.Router.back(); }
      }, icon('back', 22)));
    }
    if (opts.title) bar.appendChild(el('div.topbar-title', { text: opts.title }));
    bar.appendChild(el('div.topbar-spacer'));
    (opts.actions || []).forEach(function (a) { bar.appendChild(a); });
    return bar;
  }

  /* ---------------- Meter (vumètre) ---------------- */
  function Meter(bars) {
    var n = bars || 32, node = el('div.meter');
    var items = [];
    for (var i = 0; i < n; i++) { var b = el('i'); items.push(b); node.appendChild(b); }
    var history = new Array(n).fill(0.06);
    return {
      node: node,
      /** level 0..1 ; si demo=true, anime de façon synthétique */
      set: function (level) {
        history.shift(); history.push(U.clamp(level, 0.05, 1));
        for (var i = 0; i < n; i++) {
          var h = Math.abs(Math.sin((i / n) * Math.PI)) * 0.6 + 0.4;
          var v = history[i] * h;
          items[i].style.height = Math.round(6 + v * 52) + 'px';
        }
      },
      demo: function (active) {
        if (this._t) { clearInterval(this._t); this._t = null; }
        if (!active) return;
        var self = this;
        this._t = setInterval(function () {
          self.set(0.25 + Math.random() * 0.6);
        }, 90);
      },
      hot: function (v) { node.classList.toggle('hot', !!v); }
    };
  }

  /* ---------------- Anneau de score ---------------- */
  function scoreRing(value, label, size, color) {
    size = size || 104;
    var r = (size - 12) / 2, c = 2 * Math.PI * r;
    var v = U.clamp(value || 0, 0, 100);
    var off = c * (1 - v / 100);
    var gid = 'scoreGrad-' + Math.random().toString(36).slice(2, 8);   // id unique (plusieurs anneaux possibles)
    var col = color || 'url(#' + gid + ')';
    var svg = U.html(
      '<svg viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '">' +
        '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#8B6FF0"/><stop offset="100%" stop-color="#4B2FD6"/>' +
        '</linearGradient></defs>' +
        '<circle class="track" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '"/>' +
        '<circle class="prog" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="' + col + '" ' +
          'stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + c.toFixed(1) + '"/>' +
      '</svg>'
    );
    var wrap = el('div.score-ring', [
      svg,
      el('div.val', [String(Math.round(v)), el('small', { text: label || 'score' })])
    ]);
    setTimeout(function () {
      var prog = svg.querySelector('.prog');
      if (prog) prog.style.transition = 'stroke-dashoffset 1s cubic-bezier(.22,.61,.36,1)';
      if (prog) prog.setAttribute('stroke-dashoffset', off.toFixed(1));
    }, 60);
    return wrap;
  }

  /* ---------------- Timer ring (écran d'enregistrement) ---------------- */
  function timerRing(size) {
    size = size || 224;
    var r = (size - 26) / 2, c = 2 * Math.PI * r;
    var svg = U.html(
      '<svg viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '">' +
        '<defs><linearGradient id="recGrad" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#8B6FF0"/><stop offset="100%" stop-color="#4B2FD6"/>' +
        '</linearGradient></defs>' +
        '<circle class="track" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '"/>' +
        '<circle class="prog" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" ' +
          'stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="0"/>' +
      '</svg>'
    );
    var core = el('div.core', icon('mic', 66));
    var wrap = el('div.timer-ring', [svg, core]);
    var prog = svg.querySelector('.prog');
    return {
      node: wrap, core: core,
      set: function (pct) { prog.setAttribute('stroke-dashoffset', (c * U.clamp(pct, 0, 1)).toFixed(1)); },
      live: function (v) { wrap.classList.toggle('live', !!v); },
      hot: function (v) { core.classList.toggle('hot', !!v); wrap.classList.toggle('live', !!v); }
    };
  }

  /* ---------------- Divers ---------------- */
  function dots(count, active) {
    var d = el('div.dots');
    for (var i = 0; i < count; i++) d.appendChild(el('i' + (i === active ? '.on' : '')));
    return d;
  }
  function bar(pct, cls) {
    return el('div.bar' + (cls ? '.' + cls : ''), [el('i', { style: { width: U.clamp(pct, 0, 100) + '%' } })]);
  }
  function badge(text, kind, ico) {
    return el('span.badge.badge-' + (kind || 'violet'), [ico ? icon(ico, 12) : null, el('span', { text: text })]);
  }
  function vocabChip(word, article, translation, onTap) {
    var label = (article ? article + ' ' : '') + word;
    return el('button.vocab', {
      type: 'button', title: translation || '', onclick: function () { if (onTap) onTap(word, article, translation, this); }
    }, [el('span', { text: label })]);
  }
  function statTile(value, key, emoji) {
    return el('div.stat', [
      emoji ? el('div.i', { text: emoji }) : null,
      el('div.v', { text: String(value) }),
      el('div.k', { text: key })
    ]);
  }
  function kv(k, v, cls) {
    return el('div.kv', [el('span.k', { text: k }), el('span.v' + (cls ? '.' + cls : ''), { text: v })]);
  }
  function sectionTitle(text, action) {
    return el('div.section-title', [el('h2', { text: text }), action || null]);
  }
  function emptyState(emoji, title, text, cta) {
    return el('div.card.center', { style: { padding: '26px 18px' } }, [
      el('div', { style: { fontSize: '34px', marginBottom: '8px' }, text: emoji }),
      el('div.h3', { text: title }),
      el('p.small.mt-8', { text: text }),
      cta ? el('div.mt-16', [cta]) : null
    ]);
  }

  /** Parle un texte dans la langue apprise + petit retour visuel. */
  function say(text, opts) {
    opts = opts || {};
    var prefs = global.SK.Store.get().prefs || {};
    if (prefs.autoSpeak === false && !opts.force) return;
    var ok = global.SK.Speech.speak(text, {
      rate: opts.slow || prefs.slowSpeech ? 0.68 : 0.92,
      onstart: opts.onstart, onend: opts.onend
    });
    if (!ok && opts.onend) opts.onend();
    return ok;
  }

  /** Bouton haut-parleur. `text` peut être une chaîne ou {getText:fn} (cible dynamique). */
  function speakBtn(text, opts) {
    opts = opts || {};
    var resolve = function () { return typeof text === 'function' ? text() : (text && text.getText ? text.getText() : text); };
    var b = el('button.icon-btn', {
      type: 'button', 'aria-label': 'Écouter la prononciation',
      onclick: function () {
        global.SK.Sfx.tap();
        var t = resolve();
        if (t) SK.say(t, { force: true, slow: opts.slow });
      }
    }, icon('volume', 20));
    return b;
  }

  global.SK.UI = {
    toast: toast, openSheet: openSheet, closeSheet: closeSheet, celebrate: celebrate,
    topbar: topbar, Meter: Meter, scoreRing: scoreRing, timerRing: timerRing,
    dots: dots, bar: bar, badge: badge, vocabChip: vocabChip, statTile: statTile, kv: kv,
    sectionTitle: sectionTitle, emptyState: emptyState, say: say, speakBtn: speakBtn
  };

  /* Raccourcis sur SK pour un usage ergonomique dans les écrans : U.badge(), U.bar()… */
  Object.keys(global.SK.UI).forEach(function (k) { global.SK[k] = global.SK.UI[k]; });
})(window);
