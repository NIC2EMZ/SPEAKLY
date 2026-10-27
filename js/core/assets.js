/* ==========================================================================
   SPEAKLY — assets.js : images de l'interface (drapeaux ronds, pictos)
   --------------------------------------------------------------------------
   Les drapeaux fournis (Allemagne, France, Italie, Portugal, Espagne, Russie,
   Chine, Royaume-Uni, États-Unis, Belgique, Brésil) sont réutilisés tels quels ;
   les cinq langues sans visuel (japonais, coréen, arabe, hindi, turc) ont un
   drapeau généré dans le même style rond et la même taille (128 px).
   ========================================================================== */
(function (global) {
  'use strict';
  var SK = global.SK, U = SK;

  var BASE = 'assets/img/';

  /** Drapeaux ronds par code de langue. */
  var FLAGS = {
    de: 'flag-de.png', en: 'flag-us.png', es: 'flag-es.png', pt: 'flag-pt.png',
    fr: 'flag-fr.png', it: 'flag-it.png', ko: 'flag-ko.png', ja: 'flag-ja.png',
    zh: 'flag-zh.png', ar: 'flag-ar.png', hi: 'flag-hi.png', tr: 'flag-tr.png',
    /* drapeaux supplémentaires fournis : réutilisables (variante d'anglais, futurs contenus) */
    ru: 'flag-ru.png', br: 'flag-br.png', be: 'flag-be.png', gb: 'flag-gb.png'
  };

  /** Pictos illustrés fournis. */
  var PICTOS = {
    travail: 'icon-travail.png',
    etudes: 'icon-etudes.png',
    calendrier: 'icon-calendrier.png'
  };

  /** Personnage-guide de l'app (illustration fournie, détourée). */
  var GUIDE = {
    avatar: 'guide-avatar.png',   // 192 px, rond, fond blanc
    full: 'guide-full.png'        // 420 px de large, fond transparent
  };

  function flagSrc(code) {
    var f = FLAGS[code];
    return f ? BASE + f : '';
  }

  /**
   * Drapeau à afficher pour une langue : si l'apprenant a choisi une variante
   * régionale (anglais US/UK, portugais PT/BR), c'est elle qui prime.
   */
  function flagForLang(langCode) {
    var st = (SK.Store && SK.Store.get()) || {};
    var variant = (st.prefs && st.prefs.langVariant) || '';
    if (langCode === 'en') return variant === 'gb' ? 'gb' : 'en';
    if (langCode === 'pt') return variant === 'br' ? 'pt-BR' : 'pt';
    if (langCode === 'pt-BR') return 'pt-BR';
    return langCode;
  }

  /** Drapeau d'une langue, variante régionale comprise. */
  function langFlag(code, opts) {
    opts = opts || {};
    var langs = (SK.CONTENT && SK.CONTENT.languages) || [];
    var meta = langs.filter(function (l) { return l.code === code; })[0] || {};
    var resolved = flagForLang(code);
    var rmeta = langs.filter(function (l) { return l.code === resolved; })[0] || meta;
    return flag(resolved, {
      size: opts.size,
      label: opts.label || rmeta.native || meta.native,
      flag: opts.flag || meta.flag || rmeta.flag
    });
  }
  function pictoSrc(name) {
    var p = PICTOS[name];
    return p ? BASE + p : '';
  }

  /**
   * Drapeau rond prêt à l'emploi : <img> si un visuel existe, sinon repli
   * automatique sur l'emoji (jamais de trou dans l'interface).
   * opts : { size, className, flag (emoji de repli), label }
   */
  function flag(code, opts) {
    opts = opts || {};
    var size = opts.size || 22;
    var emoji = opts.flag;
    var src = flagSrc(code);
    var cls = 'flag-img' + (opts.className ? ' ' + opts.className : '');

    var fallback = function () {
      var span = U.el('span.flag', { text: emoji || '🌍' });
      if (opts.label) span.setAttribute('aria-label', opts.label);
      if (node && node.parentNode) node.parentNode.replaceChild(span, node);
      return span;
    };

    if (!src) {
      var s = U.el('span.flag', { text: emoji || '🌍' });
      if (opts.label) s.setAttribute('aria-label', opts.label);
      return s;
    }
    var node = U.el('img', {
      src: src, alt: opts.label || '', width: size, height: size,
      loading: 'lazy', decoding: 'async', class: cls,
      style: { width: size + 'px', height: size + 'px' },
      onerror: fallback
    });
    return node;
  }

  /** Picto illustré (objectif, section) avec le même repli. */
  function picto(name, opts) {
    opts = opts || {};
    var size = opts.size || 26;
    var src = pictoSrc(name);
    if (!src) return U.el('span', { text: opts.fallback || '•' });
    return U.el('img.picto-img', {
      src: src, alt: opts.alt || '', width: size, height: size,
      loading: 'lazy', decoding: 'async',
      class: 'picto-img' + (opts.className ? ' ' + opts.className : ''),
      style: { width: size + 'px', height: size + 'px' },
      onerror: function () { if (this.parentNode) this.parentNode.replaceChild(U.el('span', { text: opts.fallback || '•' }), this); }
    });
  }

  /** Personnage-guide : avatar rond (« tete ») ou silhouette pleine (« full »). */
  function guide(kind, opts) {
    opts = opts || {};
    var file = kind === 'full' ? GUIDE.full : GUIDE.avatar;
    var size = opts.size || (kind === 'full' ? 220 : 44);
    return U.el('img', {
      src: BASE + file,
      alt: opts.alt || SK.L('guide.alt', 'Guide SPEAKLY'),
      width: size,
      height: kind === 'full' ? Math.round(size * 2.28) : size,
      loading: opts.eager ? 'eager' : 'lazy',
      decoding: 'async',
      class: 'guide-img' + (kind === 'full' ? ' guide-full' : '') + (opts.className ? ' ' + opts.className : ''),
      style: kind === 'full'
        ? { width: '100%', maxWidth: size + 'px', height: 'auto' }
        : { width: size + 'px', height: size + 'px' },
      onerror: function () {
        if (this.parentNode) this.parentNode.replaceChild(U.el('span', { text: opts.fallback || '🙋🏽‍♀️' }), this);
      }
    });
  }

  SK.Assets = {
    BASE: BASE, FLAGS: FLAGS, PICTOS: PICTOS, GUIDE: GUIDE,
    flagSrc: flagSrc, pictoSrc: pictoSrc, flag: flag, picto: picto,
    flagForLang: flagForLang, langFlag: langFlag, guide: guide
  };
  /* raccourcis d'usage courant dans les écrans */
  SK.flag = langFlag;
  SK.rawFlag = flag;
  SK.picto = picto;
  SK.guide = guide;
})(window);
