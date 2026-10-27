/* ==========================================================================
   SPEAKLY — écran 1 : Splash Screen
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK, el = U.el;
  var timer = null;

  function render() {
    var screen = el('div.screen.splash', [
      el('div.splash-logo', U.html('<svg viewBox="0 0 100 100" width="52" height="52"><g fill="currentColor"><rect x="22" y="42" width="7" height="16" rx="3.5"/><rect x="34" y="32" width="7" height="36" rx="3.5"/><rect x="46" y="24" width="7" height="52" rx="3.5"/><rect x="58" y="34" width="7" height="32" rx="3.5"/><rect x="70" y="44" width="7" height="12" rx="3.5"/></g></svg>')),
      el('div.splash-name', { text: 'SPEAKLY' }),
      el('div.splash-tag', { text: 'Learn less. Speak more.' }),
      el('div.splash-foot', [
        el('div.splash-bar', [el('i')]),
        el('small', { text: SK.L('splash.chargement', 'Chargement…') })
      ])
    ]);
    return screen;
  }

  function mount() {
    var st = SK.Store.get();
    clearTimeout(timer);
    timer = setTimeout(function () {
      SK.Router.replace(st.onboarded ? 'home' : 'onboarding');
    }, 2100);
  }
  function unmount() { clearTimeout(timer); }

  SK.Router.register('splash', { render: render, mount: mount, unmount: unmount });
})(window);
