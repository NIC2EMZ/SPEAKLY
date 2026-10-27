/* ==========================================================================
   SPEAKLY — router.js : navigation par écrans + onglets + garde d'onboarding
   ========================================================================== */
(function (global) {
  'use strict';
  var U = global.SK;
  var screens = {};
  var tabs = [];            // {name, label, icon}
  var stack = [];
  var current = null;
  var root = null;
  var tabbar = null;
  var shellNav = null;
  var onChange = [];

  var TAB_SCREENS = ['home', 'pronounce', 'conversation', 'progress', 'profile'];

  function register(name, def) { screens[name] = def; }
  function registerTab(def) { tabs.push(def); }
  function isTab(name) { return TAB_SCREENS.indexOf(name) >= 0; }

  function init() {
    root = U.$('#view');
    tabbar = U.$('#tabbar');
    shellNav = U.$('#shellNav');
    renderChrome();
    window.addEventListener('hashchange', function () { syncFromHash(); });
    syncFromHash(true);
    return current;
  }

  /** Libellé d'onglet : chaîne ou fonction (résolue au rendu, pour l'i18n). */
  function tabLabel(t) { return typeof t.label === 'function' ? t.label() : t.label; }

  function renderChrome() {
    if (!tabbar) return;
    tabbar.innerHTML = '';
    tabs.forEach(function (t) {
      var label = tabLabel(t);
      var b = U.el('button', {
        type: 'button', 'aria-label': label, dataset: { go: t.name },
        onclick: function () { go(t.name); }
      }, [U.icon(t.icon, 23), U.el('span', { text: label })]);
      if (t.name === current) b.classList.add('is-active');
      tabbar.appendChild(b);
    });
    if (shellNav) {
      shellNav.innerHTML = '';
      tabs.forEach(function (t) {
        var label = tabLabel(t);
        var b = U.el('button', {
          type: 'button', dataset: { go: t.name }, onclick: function () { go(t.name); }
        }, [U.icon(t.icon, 19), U.el('span', { text: label })]);
        if (t.name === current) b.classList.add('is-active');
        shellNav.appendChild(b);
      });
    }
  }

  function markChrome() {
    var active = isTab(current) ? current : (current && screens[current] && screens[current].tabOf) || null;
    U.$$('#tabbar button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.go === active); });
    U.$$('#shellNav button').forEach(function (b) { b.classList.toggle('is-active', b.dataset.go === active); });
  }

  function showsTabs(name) {
    if (name === 'splash' || name === 'onboarding' || name === 'language' || name === 'level' ||
        name === 'objective' || name === 'recording' || name === 'mission' || name === 'help' ||
        name === 'results' || name === 'finish') return false;
    return isTab(name);
  }

  function go(name, params, opts) {
    opts = opts || {};
    var def = screens[name];
    if (!def) { console.warn('[SPEAKLY] écran inconnu :', name); return; }
    var st = global.SK.Store.get();
    if (isTab(name) && !st.onboarded && !opts.force) { name = 'onboarding'; def = screens.onboarding; params = {}; }

    // quitter proprement l'écran précédent
    var prev = screens[current];
    if (prev && prev.unmount) { try { prev.unmount(); } catch (e) {} }
    global.SK.Speech.stopSpeaking();

    if (!opts.replace && current && current !== name) stack.push(current);
    current = name;

    if (root) {
      root.scrollTop = 0;
      root.innerHTML = '';
      var node;
      try {
        node = def.render(params || {});
      } catch (err) {
        console.error('[SPEAKLY] erreur de rendu', name, err);
        node = U.el('div.screen', { style: { padding: '24px' } }, [
          U.el('h1.h2', { text: 'Oups…' }),
          U.el('p.sub.mt-8', { text: "Cet écran n'a pas pu s'afficher." }),
          U.el('pre', { style: { fontSize: '11px', whiteSpace: 'pre-wrap', color: '#8B84A8' }, text: (err && err.stack || String(err)) }),
          U.el('button.btn.btn-primary.btn-block.mt-16', { type: 'button', text: 'Retour à l\'accueil', onclick: function () { go('home', {}, { replace: true }); } })
        ]);
      }
      if (node) root.appendChild(node);
    }
    if (tabbar) tabbar.hidden = !showsTabs(name);
    markChrome();
    writeHash(name, params);
    if (def.mount) { try { def.mount(params || {}); } catch (e) { console.warn(e); } }
    onChange.forEach(function (fn) { try { fn(name, params); } catch (e) {} });
    return node;
  }

  function writeHash(name, params) {
    var q = params && Object.keys(params).length ? '?' + Object.keys(params).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&') : '';
    var h = '#' + name + q;
    if (location.hash !== h) {
      try { history.replaceState(null, '', h); } catch (e) { location.hash = h; }
    }
  }

  function syncFromHash(first) {
    var raw = (location.hash || '').replace(/^#/, '');
    if (!raw) { if (first) go('splash', {}, { replace: true }); return; }
    var parts = raw.split('?');
    var name = parts[0];
    var params = {};
    if (parts[1]) parts[1].split('&').forEach(function (kv) {
      var p = kv.split('='); params[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
    });
    if (!screens[name]) { go('home', {}, { replace: true }); return; }
    if (name === current) return;
    go(name, params, { replace: false });
  }

  function back(fallback) {
    var prev = stack.pop();
    if (prev && screens[prev]) {
      var keep = stack.slice();
      go(prev, {}, { replace: true });
      stack = keep;                     // go() a empilé : on restaure la pile d'origine
    } else go(fallback || 'home', {}, { replace: true });
  }

  function replace(name, params) { go(name, params, { replace: true }); }
  function getCurrent() { return current; }
  function onNavigate(fn) { onChange.push(fn); }
  function screenNames() { return Object.keys(screens); }
  function tabDefs() { return tabs.slice(); }

  global.SK.Router = {
    register: register, registerTab: registerTab, init: init, go: go, replace: replace,
    back: back, getCurrent: getCurrent, onNavigate: onNavigate, screenNames: screenNames,
    tabDefs: tabDefs, renderChrome: renderChrome
  };
})(window);
