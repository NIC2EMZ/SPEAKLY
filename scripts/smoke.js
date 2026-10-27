/* ==========================================================================
   SPEAKLY — scripts/smoke.js : exécute réellement l'application hors navigateur
   --------------------------------------------------------------------------
   Mini-DOM (aucune dépendance) : suffisant pour instancier chaque écran, suivre
   le parcours complet (splash → onboarding → accueil → mission → aide →
   enregistrement → résultats → onglets) et détecter les erreurs d'exécution.
   Usage : node scripts/smoke.js
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

let failures = 0, steps = 0;
const log = (s) => console.log(s);
const OK = (msg) => { steps++; log('  ✓ ' + msg); };
const KO = (msg, err) => { steps++; failures++; log('  ✗ ' + msg + (err ? ' → ' + (err && err.message || err) : '')); };

/* ======================= mini DOM ======================= */
class ClassList {
  constructor(node) { this.node = node; this.set = new Set(); }
  add(...c) { c.forEach((x) => this.set.add(x)); this.sync(); }
  remove(...c) { c.forEach((x) => this.set.delete(x)); this.sync(); }
  contains(c) { return this.set.has(c); }
  toggle(c, force) {
    const on = force === undefined ? !this.set.has(c) : !!force;
    if (on) this.set.add(c); else this.set.delete(c);
    this.sync();
    return on;
  }
  sync() { this.node._className = [...this.set].join(' '); }
  toString() { return [...this.set].join(' '); }
}

const VOID_TAGS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'circle', 'rect', 'path', 'stop', 'use']);
const SIMPLE_TAG = /<([a-zA-Z][\w:-]*)((?:\s+[^<>]*?)?)\/?>/g;

function parseHTML(html, doc) {
  const out = [];
  const stack = [];
  let last = 0, m;
  SIMPLE_TAG.lastIndex = 0;
  const push = (node) => { if (stack.length) stack[stack.length - 1].appendChild(node); else out.push(node); };
  while ((m = SIMPLE_TAG.exec(html))) {
    const text = html.slice(last, m.index);
    if (text.trim()) {
      const t = doc.createTextNode(text);
      if (stack.length) stack[stack.length - 1].appendChild(t); else out.push(t);
    }
    const tag = m[1].toLowerCase();
    const attrs = m[2] || '';
    const selfClose = /\/$/.test(m[0]) || VOID_TAGS.has(tag);
    const node = doc.createElement(tag);
    const arx = /([\w:-]+)(?:\s*=\s*"([^"]*)")?/g;
    let a;
    while ((a = arx.exec(attrs))) {
      if (!a[1] || a[1] === '/') continue;
      node.setAttribute(a[1], a[2] === undefined ? '' : a[2]);
    }
    push(node);
    if (!selfClose) stack.push(node);
    last = SIMPLE_TAG.lastIndex;
    // fermeture immédiate des balises non reconnues comme conteneurs texte
    if (!selfClose) {
      const closeRx = new RegExp('</' + tag + '\\s*>', 'i');
      if (closeRx.test(html.slice(last, last + 40)) && ['svg', 'defs', 'linearGradient'].indexOf(tag) < 0) {
        const cm = closeRx.exec(html.slice(last, last + 40));
        const inner = html.slice(last, last + cm.index);
        if (inner.trim()) node.appendChild(doc.createTextNode(inner));
        last = last + cm.index + cm[0].length;
        stack.pop();
      }
    }
  }
  const rest = html.slice(last);
  if (rest.trim() && stack.length) stack[stack.length - 1].appendChild(doc.createTextNode(rest));
  return out;
}

class Element {
  constructor(tag, doc) {
    this.tagName = String(tag).toUpperCase();
    this.nodeType = 1;                 // ELEMENT_NODE (utilisé par SK.el / SK.append)
    this._tag = String(tag).toLowerCase();
    this.ownerDocument = doc;
    this.children = [];
    this.childNodes = this.children;
    this.parentNode = null;
    this.attributes = {};
    this.dataset = {};
    this.style = {};
    this._className = '';
    this.classList = new ClassList(this);
    this._listeners = {};
    this._text = '';
    this.value = '';
    this.files = null;
    this.hidden = false;
    this.disabled = false;
    this.title = '';
    this.lang = '';
  }
  get className() { return this._className; }
  set className(v) {
    this._className = v || '';
    this.classList.set = new Set(String(v || '').split(/\s+/).filter(Boolean));
  }
  setAttribute(k, v) {
    this.attributes[k] = String(v);
    if (k === 'class') this.className = v;
    else if (k === 'id') this.id = v;
    else if (k === 'hidden') this.hidden = true;
    else if (k === 'value') this.value = v;
    else if (k === 'style') this._styleAttr = v;
    else if (k === 'title') this.title = v;
  }
  getAttribute(k) { return this.attributes[k]; }
  removeAttribute(k) { delete this.attributes[k]; }
  appendChild(n) {
    if (!n) return n;
    if (n._fragment) { n.children.forEach((c) => this.appendChild(c)); return n; }
    if (n.parentNode) n.parentNode.removeChild(n);
    n.parentNode = this;
    this.children.push(n);
    return n;
  }
  removeChild(n) {
    const i = this.children.indexOf(n);
    if (i >= 0) { this.children.splice(i, 1); n.parentNode = null; }
    return n;
  }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  get firstElementChild() { return this.children.filter((c) => c instanceof Element)[0] || null; }
  get lastElementChild() { const e = this.children.filter((c) => c instanceof Element); return e[e.length - 1] || null; }
  get firstChild() { return this.children[0] || null; }
  get lastChild() { return this.children[this.children.length - 1] || null; }
  get nextSibling() {
    if (!this.parentNode) return null;
    const s = this.parentNode.children;
    const i = s.indexOf(this);
    return i >= 0 ? (s[i + 1] || null) : null;
  }
  get textContent() {
    if (this._text && !this.children.length) return this._text;
    return this.children.map((c) => (c instanceof Element ? c.textContent : (c._text || ''))).join('');
  }
  set textContent(v) { this._text = String(v === undefined ? '' : v); this.children = []; }
  get innerHTML() { return this._html || ''; }
  set innerHTML(v) {
    this._html = String(v);
    this.children = [];
    if (this._html) parseHTML(this._html, this.ownerDocument).forEach((n) => this.appendChild(n));
  }
  addEventListener(type, fn) { (this._listeners[type] = this._listeners[type] || []).push(fn); }
  removeEventListener(type, fn) {
    if (this._listeners[type]) this._listeners[type] = this._listeners[type].filter((f) => f !== fn);
  }
  dispatch(type, ev) {
    const e = Object.assign({ type, target: this, preventDefault() {}, stopPropagation() {} }, ev || {});
    (this._listeners[type] || []).forEach((fn) => fn.call(this, e));
    const inline = this['on' + type];
    if (typeof inline === 'function') inline.call(this, e);
    return e;
  }
  click() { this.dispatch('click'); return this; }
  focus() {}
  blur() {}
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  scrollTo() {}
  getBoundingClientRect() { return { top: 0, left: 0, width: 375, height: 700 }; }
  querySelectorAll(sel) {
    const parts = String(sel).split(',').map((s) => s.trim()).filter(Boolean);
    const out = [];
    const match = (el, s) => {
      if (!(el instanceof Element)) return false;
      if (s[0] === '.') return el.classList.contains(s.slice(1));
      if (s[0] === '#') return el.id === s.slice(1);
      const m = /^([a-zA-Z][\w-]*)?((?:\.[\w-]+)*)$/.exec(s);
      if (!m) return false;
      if (m[1] && el._tag !== m[1].toLowerCase()) return false;
      if (m[2]) {
        return m[2].split('.').filter(Boolean).every((c) => el.classList.contains(c));
      }
      return !!m[1];
    };
    const walk = (node) => {
      node.children.forEach((c) => {
        if (!(c instanceof Element)) return;
        if (parts.some((s) => match(c, s))) out.push(c);
        walk(c);
      });
    };
    walk(this);
    return out;
  }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
  matches(sel) { return this.parentNode ? this.parentNode.querySelectorAll(sel).indexOf(this) >= 0 : false; }
  cloneNode() { throw new Error('cloneNode non implémenté'); }
}

class Doc extends Element {
  constructor() { super('#document', null); this.ownerDocument = this; }
  createElement(tag) {
    const el = new Element(tag, this);
    if (String(tag).toLowerCase() === 'template') {
      // <template> : le HTML va dans .content (DocumentFragment), comme dans le DOM réel
      const frag = this.createDocumentFragment();
      Object.defineProperty(el, 'content', { value: frag, writable: false });
      const origSetter = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;
      let html = '';
      Object.defineProperty(el, 'innerHTML', {
        get: () => html,
        set: (v) => {
          html = String(v);
          frag.children.length = 0;
          parseHTML(html, this).forEach((n) => frag.appendChild(n));
        }
      });
      void origSetter;
    }
    return el;
  }
  createTextNode(t) { const n = new Element('#text', this); n._tag = '#text'; n._text = String(t); return n; }
  createDocumentFragment() { const f = new Element('#fragment', this); f._fragment = true; return f; }
  get body() { return this._body || (this._body = (() => { const b = this.createElement('body'); this.appendChild(b); return b; })()); }
  get documentElement() { return this._htmlEl || (this._htmlEl = this.createElement('html')); }
  get readyState() { return 'complete'; }
  addEventListener(t, fn) { Element.prototype.addEventListener.call(this, t, fn); }
  removeEventListener(t, fn) { Element.prototype.removeEventListener.call(this, t, fn); }
  dispatchEvent(e) { return this.dispatch(e.type, e); }
}

/* ======================= contexte d'exécution ======================= */
const doc = new Doc();
const ids = {};
const rootEl = doc.createElement('div'); rootEl.id = 'view'; doc.body.appendChild(rootEl);
['tabbar', 'shellNav', 'statusTime', 'toastWrap', 'sheet', 'sheetBackdrop', 'sheetBody', 'celebrate', 'shell', 'shellSide', 'shellHint', 'device']
  .forEach((id) => { const e = doc.createElement('div'); e.id = id; doc.body.appendChild(e); ids[id] = e; });

const timers = [];
const intervals = [];
let timerSeq = 1;

const storage = new Map();
const localStorage = {
  getItem: (k) => (storage.has(k) ? storage.get(k) : null),
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: (k) => storage.delete(k),
  key: (i) => [...storage.keys()][i],
  get length() { return storage.size; }
};
Object.defineProperty(localStorage, 'length', { get: () => storage.size });
Object.keys(storage); // no-op

const speechLog = { spoken: [] };
const windowObj = {};
const ctx = {
  console: {
    log: () => {},
    warn: (m) => log('  [warn] ' + m),
    error: function () {
      const parts = Array.prototype.slice.call(arguments).map((a) => {
        if (a === null || a === undefined) return String(a);
        if (typeof a === 'object' && (a.stack || a.message || a.name)) return (a.stack || (a.name + ': ' + a.message));
        if (typeof a === 'object') { try { return JSON.stringify(a); } catch (e) { return String(a); } }
        return String(a);
      });
      failures++;
      log('  [console.error] ' + parts.join(' | '));
    }
  },
  Math, JSON, Date, Object, Array, String, Number, Boolean, RegExp, Error, Promise, Map, Set, isNaN, parseInt, parseFloat,
  encodeURIComponent, decodeURIComponent, Uint8Array,
  Intl,
  localStorage,
  requestAnimationFrame: (fn) => { timers.push({ fn, delay: 16 }); return timerSeq++; },
  cancelAnimationFrame: () => {},
  setTimeout: (fn, delay) => { timers.push({ fn, delay: delay || 0 }); return timerSeq++; },
  clearTimeout: () => {},
  setInterval: (fn, delay) => { intervals.push({ fn, delay: delay || 0 }); return timerSeq++; },
  clearInterval: () => {},
  Blob: function Blob(parts) { this.parts = parts; this.size = 8; this.type = 'audio/webm'; },
  URL: { createObjectURL: () => 'blob:fake-url', revokeObjectURL: () => {} },
  navigator: {
    vibrate: () => true,
    userAgent: 'node-smoke',
    language: 'fr-FR',
    mediaDevices: undefined
  },
  location: { href: 'http://localhost:5180/', hash: '', search: '' },
  history: { replaceState: (a, b, url) => { ctx.location.hash = String(url || '').split('#')[1] || ''; } },
  Audio: function FakeAudio() { this.paused = true; this.play = () => { this.paused = false; }; this.pause = () => { this.paused = true; }; },
  speechSynthesis: {
    getVoices: () => [
      { name: 'Google Deutsch', lang: 'de-DE', localService: true, default: true },
      { name: 'Google US English', lang: 'en-US', localService: true, default: false }
    ],
    speak: (u) => { speechLog.spoken.push(u.text); if (u.onstart) u.onstart(); if (u.onend) setTimeout(u.onend, 30); },
    cancel: () => {}
  }
};
ctx.window = ctx;
ctx.globalThis = ctx;
ctx.document = doc;
ctx.addEventListener = function (type, fn) { (ctx._winListeners = ctx._winListeners || {})[type] = fn; };
ctx.removeEventListener = function () {};
ctx.dispatchEvent = function (e) {
  const fn = (ctx._winListeners || {})[e && e.type];
  if (fn) fn(e);
  return true;
};
ctx.documentElement = doc.createElement('html');
ctx.self = ctx;
ctx.SpeechSynthesisUtterance = function (t) { this.text = t; };
ctx.AudioContext = undefined;
ctx.MediaRecorder = undefined;
vm.createContext(ctx);

/* ======================= chargement de l'application ======================= */
const SOURCES = [
  'js/data/i18n.js', 'js/data/000-missions-de.js', 'js/data/000-pron-dialogues.js', 'js/data/prompts.js',
  'js/data/ui-strings.js', 'js/data/080-badges.js', 'js/data/content.js',
  'js/core/util.js', 'js/core/assets.js', 'js/core/store.js', 'js/core/speech.js', 'js/core/sfx.js', 'js/core/audio.js',
  'js/core/ui.js', 'js/core/charts.js', 'js/core/router.js',
  'js/screens/splash.js', 'js/screens/onboarding.js', 'js/screens/home.js', 'js/screens/mission.js',
  'js/screens/help.js', 'js/screens/recording.js', 'js/screens/results.js', 'js/screens/pronounce.js',
  'js/screens/free.js', 'js/screens/review.js',
  'js/screens/conversation.js', 'js/screens/progress.js', 'js/screens/profile.js',
  'js/app.js'
];

log('\n== Chargement des modules ==');
SOURCES.forEach((rel) => {
  try { vm.runInContext(read(rel), ctx, { filename: rel }); }
  catch (e) { KO('chargement ' + rel, e); }
});
if (failures) { log('\nÉCHEC au chargement.'); process.exit(1); }
const SK = ctx.SK;
const U = SK;
OK('27 modules chargés, SK.App prêt (store=' + (!!SK.Store) + ', router=' + (!!SK.Router) + ')');

function runTimers(max) {
  let n = 0;
  while (timers.length && n < (max || 300)) {
    const t = timers.shift();
    try { t.fn(); } catch (e) { failures++; log('  ✗ timer : ' + e.message); }
    n++;
  }
  return n;
}
function tickIntervals(times) {
  for (let i = 0; i < (times || 1); i++) {
    intervals.forEach((iv) => { try { iv.fn(); } catch (e) { failures++; log('  ✗ interval : ' + e.message); } });
  }
}
function current() { return SK.Router.getCurrent(); }
function screen() { return rootEl; }
function findByText(text) {
  // priorité aux contrôles interactifs, et jamais un conteneur (élément sans texte propre)
  const all = rootEl.querySelectorAll('button, a, input, textarea, span, div');
  const exact = all.filter((e) => e.textContent.trim() === text);
  const interactive = exact.filter((e) => ['BUTTON', 'A', 'INPUT', 'TEXTAREA'].indexOf(e.tagName) >= 0);
  if (interactive.length) return interactive[0];
  return exact[0] || null;
}
function first(sel) { return rootEl.querySelector(sel); }
function step(name, fn) {
  log('\n== ' + name + ' ==');
  try { fn(); } catch (e) { KO(name, e); }
}

/* ======================= parcours ======================= */
step('1. Splash', () => {
  SK.App.boot();
  if (current() !== 'splash') throw new Error('écran attendu splash, obtenu ' + current());
  if (!first('.splash-name')) throw new Error('titre SPEAKLY non rendu');
  if (!first('.splash-logo')) throw new Error('logo SPEAKLY non rendu');
  if (first('.splash-name').textContent !== 'SPEAKLY') throw new Error('nom de marque inattendu');
  runTimers(60);                       // la redirection programmée doit s'exécuter
  if (current() !== 'onboarding') throw new Error('après splash : ' + current() + ' (attendu onboarding)');
  OK('splash rendu (logo + SPEAKLY) puis redirection vers onboarding');
});

step('2. Onboarding → langue → niveau → objectif', () => {
  runTimers(20);
  const startBtn = rootEl.querySelectorAll('button.btn-primary')[0];
  if (!startBtn) throw new Error('bouton Commencer introuvable');
  startBtn.click();
  if (current() !== 'language') throw new Error('écran langue non atteint : ' + current());
  const langs = rootEl.querySelectorAll('.lang');
  if (langs.length !== 12) throw new Error(langs.length + ' langues affichées (12 attendues)');
  langs.filter((l) => l.dataset.code === 'de')[0].click();
  if (SK.Store.get().lang !== 'de') throw new Error('langue non enregistrée');
  OK('12 langues, allemand sélectionné');
  findByText('Continuer').click();
  if (current() !== 'level') throw new Error('écran niveau non atteint : ' + current());
  const choices = rootEl.querySelectorAll('.choice');
  if (choices.length !== 7) throw new Error(choices.length + ' choix de niveau (6 + « je ne sais pas » attendus)');
  choices[2].click();                                                                  // B1
  if (SK.Store.get().level !== 'B1') throw new Error('niveau non enregistré');
  findByText('Continuer').click();
  if (current() !== 'objective') throw new Error('écran objectif non atteint : ' + current());
  const opts = rootEl.querySelectorAll('.opt');
  if (opts.length !== 8) throw new Error(opts.length + ' objectifs (8 attendus)');
  opts[1].click();                                                                     // voyage
  const chips = rootEl.querySelectorAll('.chip');
  if (chips.length !== 4) throw new Error(chips.length + ' durées (4 attendues)');
  findByText('Commencer').click();
  if (!SK.Store.get().onboarded) throw new Error('onboarded non enregistré');
  runTimers(30);
  if (current() !== 'home') throw new Error('après onboarding : ' + current());
  OK('objectifs + durée enregistrés, accueil affiché');
});

step('2b. Visuels : drapeaux ronds et pictos', () => {
  // la grille des langues doit afficher de vraies images de drapeaux, pas des emojis
  SK.Router.go('language', {}, { force: true });
  const flags = rootEl.querySelectorAll('.flag-img');
  if (flags.length !== 12) throw new Error(flags.length + ' drapeaux affichés (12 attendus)');
  const srcs = flags.map((f) => f.getAttribute('src'));
  srcs.forEach((s) => {
    if (!s || s.indexOf('assets/img/') !== 0) throw new Error('source de drapeau invalide : ' + s);
    if (!fs.existsSync(path.join(ROOT, s))) throw new Error('drapeau introuvable sur le disque : ' + s);
  });
  if (new Set(srcs).size !== 12) throw new Error('drapeaux dupliqués dans la grille');
  OK('12 drapeaux ronds distincts, tous présents sur le disque (ex. ' + srcs[0] + ')');

  // repli automatique : un code inconnu doit donner l'emoji, jamais un trou
  const fallback = SK.flag('xx', { size: 20, flag: '🌍' });
  if (fallback._tag !== 'span' || fallback.textContent !== '🌍') throw new Error('le repli emoji ne fonctionne pas');
  OK('repli emoji opérationnel pour une langue sans visuel');

  // personnage-guide : présent sur la bienvenue puis dans l'aide
  SK.Router.go('onboarding', {}, { force: true });
  if (!first('.avatar-ring')) throw new Error('anneau d’accueil absent');
  const guideImg = rootEl.querySelectorAll('.guide-img');
  if (!guideImg.length) throw new Error('le personnage-guide n’est pas rendu sur la bienvenue');
  const gsrc = guideImg[0].getAttribute('src');
  if (gsrc.indexOf('guide-avatar') < 0) throw new Error('visuel du guide inattendu : ' + gsrc);
  if (!fs.existsSync(path.join(ROOT, gsrc))) throw new Error('visuel du guide introuvable : ' + gsrc);
  if ((guideImg[0].getAttribute('alt') || '').length < 3) throw new Error('guide sans texte alternatif');
  OK('personnage-guide rendu sur la bienvenue (' + gsrc + ', alt défini)');
  SK.Router.go('onboarding', {}, { force: true });

  // pictos illustrés câblés
  const picto = SK.picto('calendrier', { size: 22 });
  if (picto._tag !== 'img' || String(picto.getAttribute('src')).indexOf('icon-calendrier') < 0) {
    throw new Error('picto calendrier mal câblé');
  }
  SK.Router.go('home', {});
  if (!rootEl.querySelectorAll('.picto-img').length) throw new Error('aucun picto rendu à l’accueil');
  OK('pictos illustrés rendus dans l’interface (accueil)');

  // variante régionale de l'anglais : les drapeaux US/UK fournis servent ici
  SK.Store.set({ lang: 'en' }, 'lang');
  const before = SK.Assets.flagForLang('en');
  SK.Store.set({ prefs: Object.assign({}, SK.Store.get().prefs, { langVariant: 'gb' }) }, 'prefs');
  const after = SK.Assets.flagForLang('en');
  if (before === after) throw new Error('la variante régionale ne change pas le drapeau affiché');
  if (SK.Assets.flagSrc(after).indexOf('flag-gb') < 0) throw new Error('drapeau UK non résolu');
  OK('variante régionale : anglais ' + before + ' → ' + after + ' (drapeaux US/UK fournis)');
  SK.Store.set({ prefs: Object.assign({}, SK.Store.get().prefs, { langVariant: '' }) }, 'prefs');
  SK.Store.set({ lang: 'de' }, 'lang');
});

step('3. Accueil', () => {
  const hero = first('.card-violet');
  const hello = first('.hello');
  const week = first('.week-card');
  const tabs = ids.tabbar.querySelectorAll('button');
  if (!hero || !week) throw new Error('cartes accueil manquantes');
  if (!/SPEAK 5/.test(hero.textContent)) throw new Error('libellé SPEAK 5 absent');
  if (tabs.length !== 5) throw new Error(tabs.length + ' onglets (5 attendus)');
  if (!/Alex/.test(hello.textContent)) throw new Error('salutation personnalisée absente');
  if (!/^(Guten Morgen|Guten Tag|Guten Abend)/.test(hello.textContent.trim())) throw new Error('salutation allemande absente : ' + hello.textContent.trim());
  OK('carte mission + salutation « ' + hello.textContent.trim().split(' ').slice(0, 2).join(' ') + ' » + 5 onglets');
});

step('4. Mission du jour (écran 7)', () => {
  SK.Router.go('mission', {});
  const rows = rootEl.querySelectorAll('.qrow');
  if (rows.length !== 5) throw new Error(rows.length + ' questions (5 attendues)');
  const vocab = rootEl.querySelectorAll('.vocab');
  if (vocab.length < 8) throw new Error(vocab.length + ' mots utiles (< 8)');
  if (!findByText('Aide-moi')) throw new Error('bouton Aide-moi absent');
  OK('5 questions, ' + vocab.length + ' mots utiles, bouton Aide-moi');
});

step('5. Aide (écran 8)', () => {
  const missionId = (SK.Store.missionOfTheDay() || {}).id;
  SK.Router.go('help', { id: missionId, q: 0 });
  if (current() !== 'help') throw new Error('écran help non atteint : ' + current());
  const items = rootEl.querySelectorAll('.help-item');
  if (items.length !== 4) throw new Error(items.length + ' cartes d’aide (4 attendues)');
  const tabs = rootEl.querySelectorAll('.help-tabs')[0].querySelectorAll('button');
  if (tabs.length !== 5) throw new Error(tabs.length + ' onglets de question (5 attendus)');
  tabs[3].click();
  if (current() !== 'help') throw new Error('sortie inattendue de l’aide : ' + current());
  const after = rootEl.querySelectorAll('.help-item');
  if (after.length !== 4) throw new Error('cartes d’aide perdues après changement de question');
  // le personnage-guide accompagne l'aide (et le bloc « je ne sais pas quoi dire »)
  if (!rootEl.querySelectorAll('.guide-img').length) throw new Error('guide absent de l’écran d’aide');
  OK('personnage-guide présent dans l’aide « je ne sais pas quoi dire »');
  OK('4 étapes d’aide (indice, mots, début de phrase, exemple) ; navigation Q1→Q4 OK');
  SK.Router.go('mission', { id: missionId });
});

step('6. Enregistrement (écran 9)', () => {
  SK.Router.go('record', { mission: first('.qrow') ? undefined : undefined, q: 0 });
  if (current() !== 'record') throw new Error('écran record non atteint : ' + current());
  const timer = first('.rec-timer');
  if (!timer || !/05:00/.test(timer.textContent)) throw new Error('minuterie 05:00 absente : ' + (timer && timer.textContent));
  if (!first('.timer-ring')) throw new Error('anneau de minuterie absent');
  if (!first('.transcript')) throw new Error('zone de transcription absente');
  if (!first('.meter')) throw new Error('vumètre absent');
  tickIntervals(23);
  runTimers(5);
  OK('minuterie, anneau, transcription et vumètre rendus ; 23 s écoulées → ' + first('.rec-timer').textContent);
});

step('7. Résultats (écran 10)', () => {
  const stop = rootEl.querySelectorAll('.rec-ctl');
  if (stop.length !== 2) throw new Error(stop.length + ' contrôles (Pause + Terminer attendus)');
  stop[1].click();                                  // Terminer
  runTimers(40);  if (current() !== 'results') throw new Error('après terminer : ' + current() + ' (attendu results)');
  const rows = rootEl.querySelectorAll('.analysis-row');
  if (rows.length !== 4) throw new Error(rows.length + ' axes d’analyse (4 attendus)');
  if (!first('.score-ring')) throw new Error('anneau de score absent');
  if (!first('.confetti')) throw new Error('animation de réussite absente');
  if (!first('.replay')) throw new Error('bloc de réécoute absent');
  const sessions = SK.Store.get().progress.sessions.length;
  if (!sessions) throw new Error('aucune séance enregistrée');
  const p = SK.Store.get().progress;
  if (!p.totalSeconds) throw new Error('temps total non cumulé');
  OK('4 axes, score, réécoute ; séances=' + sessions + ', score=' + p.sessions[0].score + ', série=' + p.streak + 'j');
});

step('7b. Notation avec une vraie prise de parole', () => {
  const mission = SK.Store.missionOfTheDay();
  const q = mission.questions[0];
  if (q.target !== mission.questions[0].target) throw new Error('question incohérente');
  SK.STORE_LAST_SESSION = null;
  SK.Router.go('record', { mission: mission.id, q: 0 });
  if (current() !== 'record') throw new Error('enregistrement non démarré');
  const hook = SK._liveRecording;
  if (!hook) throw new Error('accroche de test absente');
  tickIntervals(12);
  // l'apprenant prononce exactement la phrase modèle de chacune des 5 questions
  const total = hook.state.targets.length;
  for (let i = 0; i < total; i++) {
    hook.say(hook.state.targets[i].target);
    if (i < total - 1) hook.next();
  }
  hook.finish(false);
  runTimers(40);
  if (current() !== 'results') throw new Error('résultats non atteints : ' + current());
  const s = SK.STORE_LAST_SESSION;
  if (!s || !s.answers || s.answers.length !== total) throw new Error('session détaillée incomplète');
  const a0 = s.answers[0];
  if (a0.match < 0.95) throw new Error('phrase modèle mal évaluée (match=' + a0.match + ')');
  const avgMatch = s.answers.reduce((acc, a) => acc + a.match, 0) / s.answers.length;
  if (avgMatch < 0.95) throw new Error('alignement moyen trop faible (' + avgMatch.toFixed(2) + ')');
  if (s.score < 70) throw new Error('barème trop sévère : ' + s.score + '/100 pour 5 phrases conformes');
  const stored = SK.Store.get().progress.sessions.slice(-1)[0];
  if (!stored || stored.score !== s.score) throw new Error('séance non cumulée dans la progression');
  OK('5 phrases modèles prononcées → alignement moyen ' + avgMatch.toFixed(2)
    + ', score ' + s.score + '/100, axes ' + JSON.stringify(s.axes));
});

step('8. Onglets Prononciation / Conversation / Progression / Profil', () => {
  const mission = SK.Store.missionOfTheDay() || {};
  const rec = { mission: mission.id, q: 0 };

  SK.Router.go('pronounce', {});
  if (!first('.word-card')) throw new Error('carte de mot absente');
  const mic = first('.rec-btn');
  if (!mic) throw new Error('bouton micro absent');
  const wc = first('.word-card');
  const wnode = wc ? wc.children.map(function find(n) { return n.classList && n.classList.contains('w') ? n : (n.children || []).map(find).filter(Boolean)[0]; }).filter(Boolean)[0] : null;
  const shown = (wnode && wnode._text) || '?';
  mic.click();
  runTimers(30);
  OK('prononciation : mot « ' + shown + ' » + écoute (' +
    (SK.Speech.canRecognize() ? 'reconnaissance' : 'repli clavier') + ')');

  SK.Router.go('conversation', {});
  const scenarios = rootEl.querySelectorAll('.scenario');
  if (scenarios.length < 2) throw new Error(scenarios.length + ' dialogues listés');
  const dlgId = (SK.Store.packFor().dialogues[0] || {}).id;
  SK.Router.go('conversation', { dlg: dlgId });
  runTimers(80);
  const bubbles = rootEl.querySelectorAll('.bubble');
  if (!bubbles.length) throw new Error('bulles de dialogue absentes');
  OK('conversation : ' + scenarios.length + ' dialogues, ' + bubbles.length + ' bulles rendues');

  SK.Router.go('progress', {});
  if (!first('.heat')) throw new Error('heatmap absente');
  const badges = rootEl.querySelectorAll('.achv');
  if (badges.length !== 12) throw new Error(badges.length + ' badges affichés (12 attendus)');
  OK('progression : heatmap 12 semaines + ' + badges.length + ' badges');

  SK.Router.go('profile', {});
  const rows = rootEl.querySelectorAll('.row-item');
  if (rows.length < 12) throw new Error(rows.length + ' réglages listés');
  first('.switch').parentNode.click();
  const toggled = SK.Store.get().prefs.autoSpeak;
  OK('profil : ' + rows.length + ' lignes, préférence lectureAuto=' + toggled);

  // le retour sur l'écran d'enregistrement doit rester propre (nettoyage micro)
  SK.Router.go('record', rec);
  if (current() !== 'record') throw new Error('retour enregistrement impossible');
  SK.Router.go('home', {});
  OK('aller-retour enregistrement → accueil sans erreur de nettoyage');
});

step('8b. Moteur de révision espacée', () => {
  // après les séances précédentes, le lexique doit contenir des mots planifiés
  const summary = SK.Store.wordStatsSummary();
  if (!summary.total) throw new Error('lexique vide après plusieurs séances');
  OK('lexique alimenté : ' + summary.total + ' mots (' + summary.mastered + ' maîtrisés, '
    + summary.learning + ' en cours, ' + summary.due + ' à revoir)');

  // échelle d'espacement sur un mot isolé : raté → J+1, puis J+3, J+7…
  SK.Store.seedWords([{ word: 'zzz-test-espacement', translation: 'test', ipa: '', article: '' }]);
  const key = SK.Store.wordKey('zzz-test-espacement');
  const stat = () => SK.Store.get().progress.wordStats[key];
  const gap = () => U.diffDays(U.todayKey(), stat().next);

  SK.Store.reviewWord('zzz-test-espacement', 30);
  const gFail = gap();
  if (gFail !== 1) throw new Error('un mot raté doit revenir à J+1 (obtenu J+' + gFail + ')');
  SK.Store.reviewWord('zzz-test-espacement', 90);
  const g1 = gap();
  SK.Store.reviewWord('zzz-test-espacement', 90);
  const g2 = gap();
  if (!(gFail < g1 && g1 < g2)) throw new Error('les paliers doivent s’espacer : J+' + gFail + ' → J+' + g1 + ' → J+' + g2);
  OK('espacement des paliers : raté J+' + gFail + ', réussi J+' + g1 + ', puis J+' + g2);
  SK.Store.reviewWord('zzz-test-espacement', 20);
  if (gap() !== 1) throw new Error('un mot raté après progression doit redescendre à J+1');
  OK('un mot raté en cours de progression redescend bien au premier palier');

  SK.Router.go('review', {});
  if (current() !== 'review') throw new Error('écran review non atteint : ' + current());
  const card = first('.word-card');
  if (!card) throw new Error('carte de mot absente sur l’écran de révision');
  const wnodes = card.querySelectorAll('.w');
  if (!wnodes.length || !wnodes[0].textContent.trim()) throw new Error('la carte de révision n’affiche aucun mot');
  const shown = wnodes[0].textContent.trim();
  const rating = rootEl.querySelectorAll('.btn-mint');
  if (!rating.length) throw new Error('boutons d’auto-évaluation absents');
  rating[0].click();                                   // Réussi
  runTimers(20);
  OK('révision : carte « ' + shown + ' », auto-évaluation + replanification OK');

  SK.Router.go('review', { mode: 'lexique' });
  const rowsLex = rootEl.querySelectorAll('.row-item');
  if (rowsLex.length < 2) throw new Error(rowsLex.length + ' entrées de lexique');
  OK('lexique : ' + rowsLex.length + ' mots listés avec leur prochaine échéance');
});

step('8c. Mode « Parler libre »', () => {
  SK.Router.go('free', {});
  if (current() !== 'free') throw new Error('écran free non atteint : ' + current());
  const hook = SK._liveFree;
  if (!hook) throw new Error('accroche de test absente pour le mode libre');
  if (!hook.state.topics.length) throw new Error('aucune amorce de sujet pour l’allemand');
  if (!first('.rec-target')) throw new Error('sujet non affiché');
  if (!first('.transcript')) throw new Error('zone de transcription absente');
  if (!first('.timer-ring')) throw new Error('anneau de minuteur absent');
  const topic = first('.rec-target').textContent;
  hook.say('Ich stehe um sieben Uhr auf und ich frühstücke mit meiner Familie.');
  hook.say('Danach gehe ich zur Arbeit und ich spreche mit meinen Kollegen.');
  tickIntervals(45);
  hook.finish(false);
  runTimers(40);
  if (current() !== 'results') throw new Error('après parler libre : ' + current());
  const s = SK.STORE_LAST_SESSION;
  if (!s || s.mode !== 'libre') throw new Error('séance libre non enregistrée');
  if (s.seconds < 40) throw new Error('durée de séance libre trop courte : ' + s.seconds);
  if (!s.answers[0].said) throw new Error('transcription non conservée');
  OK('parler libre : sujet « ' + topic.slice(0, 32) + '… », ' + s.seconds + ' s parlées, score '
    + s.score + '/100, ' + U.words(s.answers[0].said).length + ' mots transcrits');
});

step('9. Persistance et rechargement', () => {  const before = SK.Store.get();
  const raw = localStorage.getItem('speakly.v1.state');
  if (!raw) throw new Error('état non persisté dans localStorage');
  const parsed = JSON.parse(raw);
  if (parsed.lang !== 'de' || !parsed.onboarded) throw new Error('état persisté incomplet');
  SK.Store.load();
  if (SK.Store.get().progress.sessions.length !== before.progress.sessions.length) throw new Error('rechargement incohérent');
  OK('état persisté (' + Math.round(raw.length / 1024) + ' Ko) et rechargé sans perte');
});

step('10. Robustesse', () => {
  SK.Router.go('mission', { id: 'inexistant' });
  OK('mission inconnue → repli sans erreur (' + current() + ')');
  SK.Store.set({ lang: 'ja' }, 'lang');
  SK.Router.go('mission', {});
  if (!first('.screen')) throw new Error('écran mission vide non rendu');
  OK('langue sans missions (japonais) → état vide géré');
  SK.Store.set({ lang: 'ko' }, 'lang');
  SK.Router.go('conversation', {});
  OK('langue sans dialogues (coréen) → état vide géré');
  SK.Store.set({ lang: 'de' }, 'lang');
  SK.Store.set({ name: 'Zoé' }, 'name');
  SK.Router.go('home', {});
  if (!/Zoé/.test(first('.hello').textContent)) throw new Error('prénom non repris');
  OK('changement de prénom reflété à l’accueil');
  SK.UI.toast('test'); SK.UI.celebrate(10); SK.UI.openSheet('<div class="h3">T</div>'); SK.UI.closeSheet();
  OK('toast, confettis et panneau modal sans erreur');
});

/* ======================= bilan ======================= */
log('\n=========================================');
log('étapes : ' + steps + ' | échecs : ' + failures);
log(failures ? 'RÉSULTAT : ÉCHEC' : 'RÉSULTAT : OK');
process.exit(failures ? 1 : 0);
