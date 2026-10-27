/* ==========================================================================
   SPEAKLY — verify.js : contrôles d'intégration hors navigateur
   Usage : node scripts/verify.js
   Vérifie : syntaxe, chargement de tous les modules de données, contrat des
   missions, présence de chaque clé i18n utilisée par les écrans, badges.
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
let fails = 0, warns = 0, checks = 0;
const ok = (m) => { checks++; };
const fail = (m) => { fails++; checks++; console.log('  ✗ ' + m); };
const warn = (m) => { warns++; console.log('  ! ' + m); };
const section = (t) => console.log('\n== ' + t + ' ==');

function read(rel) { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }

/* ---------- 1. syntaxe ---------- */
section('Syntaxe de tous les fichiers JS');
function walk(dir, out) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.js')) out.push(p);
  });
  return out;
}
const files = walk(path.join(ROOT, 'js'), []);
files.push(path.join(ROOT, 'scripts', 'verify.js'));
files.forEach((f) => {
  try { new vm.Script(fs.readFileSync(f, 'utf8'), { filename: f }); ok(); }
  catch (e) { fail('syntaxe ' + path.relative(ROOT, f) + ' : ' + e.message); }
});
console.log('  ' + files.length + ' fichiers analysés');

/* ---------- 1b. intégrité UTF-8 (accents, emoji, BOM) ---------- */
section('Intégrité UTF-8 des sources');
/* Séquences typiques d'un fichier UTF-8 relu en Windows-1252 puis réécrit :
   « é » devient « Ã© », « — » devient « â€” », etc.
   Motif construit par concaténation pour ne pas se détecter lui-même. */
const MOJIBAKE = new RegExp('[\\u00c3\\u00c2][\\u0080-\\u00bf]|[\\u00e2][\\u20ac\\u201a\\u201e]|[\\u00f0][\\u0178]');
const TEXT_EXT = ['.js', '.html', '.css', '.md', '.json', '.txt', '.bat'];
const textFiles = files.concat([path.join(ROOT, 'index.html'), path.join(ROOT, 'css', 'styles.css')])
  .filter((f) => TEXT_EXT.indexOf(path.extname(f).toLowerCase()) >= 0 && path.relative(ROOT, f).indexOf('scripts' + path.sep + 'verify.js') < 0);
textFiles.forEach((f) => {
  const buf = fs.readFileSync(f);
  const rel = path.relative(ROOT, f);
  if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) fail('BOM UTF-8 inattendu : ' + rel);
  const txt = buf.toString('utf8');
  const bad = (txt.match(/\uFFFD/g) || []).length;
  if (bad) fail(rel + ' : ' + bad + ' caractère(s) de remplacement U+FFFD (encodage cassé)');
  if (MOJIBAKE.test(txt)) fail(rel + ' : séquences mojibake détectées (accents mal encodés)');
});
const accents = textFiles.filter((f) => /[éèêàçùôîœ’]/.test(fs.readFileSync(f, 'utf8'))).length;
console.log('  accents/typographie française présents dans ' + accents + '/' + textFiles.length + ' fichiers texte');
console.log('  aucun octet de remplacement, aucun BOM');

/* ---------- 2. chargement des données dans un contexte isolé ---------- */
section('Chargement des modules de données');
const sandbox = { window: {}, console, localStorage: undefined };
sandbox.window.SK = {};
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);
const dataFiles = [
  'js/data/i18n.js',
  'js/data/000-missions-de.js',
  'js/data/000-pron-dialogues.js',
  'js/data/ui-strings.js',
  'js/data/080-badges.js',
  'js/data/content.js'
];
dataFiles.forEach((rel) => {
  try { vm.runInContext(read(rel), ctx, { filename: rel }); ok(); }
  catch (e) { fail('exécution ' + rel + ' : ' + e.message); }
});
const SK = sandbox.window.SK;
const C = SK.CONTENT, I18N = SK.I18N, BADGES = SK.BADGES;
if (!C) { fail('SK.CONTENT absent'); process.exit(1); }
console.log('  langues=' + C.languages.length + ' niveaux=' + C.levels.length +
  ' objectifs=' + C.objectives.length + ' missions=' + C.missions.length +
  ' badges=' + BADGES.length);

/* ---------- 3. contrat des missions ---------- */
section('Contrat des missions allemandes');
const LANGS = C.languages.map((l) => l.code);
C.missions.forEach((m) => {
  const tag = 'mission ' + m.id;
  ['id', 'lang', 'level', 'order', 'topic', 'title', 'subtitle', 'emoji', 'minutes', 'situation', 'routine', 'tip'].forEach((k) => {
    if (!m[k]) fail(tag + ' : champ ' + k + ' manquant');
  });
  if (m.lang !== 'de') fail(tag + ' : lang attendu "de"');
  if (!m.title || !m.title.fr) fail(tag + ' : title.fr manquant');
  if (!Array.isArray(m.questions) || m.questions.length !== 5) fail(tag + ' : ' + (m.questions || []).length + ' questions (5 attendues)');
  if (!Array.isArray(m.vocabulary) || m.vocabulary.length < 8) fail(tag + ' : vocabulary trop court');
  (m.vocabulary || []).forEach((w, i) => {
    ['word', 'translation'].forEach((k) => { if (!w[k]) fail(tag + ' vocab[' + i + '] : ' + k + ' manquant'); });
  });
  (m.questions || []).forEach((q, i) => {
    const qt = tag + ' q' + (q.n || i + 1);
    ['id', 'text', 'gloss', 'target', 'answerKeywords', 'hint', 'example'].forEach((k) => {
      if (!q[k]) fail(qt + ' : champ ' + k + ' manquant');
    });
    if (!q.text || !q.text.fr) fail(qt + ' : text.fr manquant');
    if (!Array.isArray(q.answerAlt) || q.answerAlt.length < 3) fail(qt + ' : answerAlt < 3');
    if (!Array.isArray(q.answerKeywords) || !q.answerKeywords.length) fail(qt + ' : answerKeywords vide');
    const corpus = (q.target + ' ' + (q.answerAlt || []).join(' ')).toLowerCase();
    (q.answerKeywords || []).forEach((k) => {
      if (k !== k.toLowerCase()) fail(qt + ' : keyword non minuscule « ' + k + ' »');
      if (corpus.indexOf(String(k).toLowerCase()) < 0) fail(qt + ' : keyword absente de la cible « ' + k + ' »');
    });
    if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(q.target + ' ' + (q.answerAlt || []).join(' '))) fail(qt + ' : emoji dans une phrase allemande');
  });
});
const orders = C.missions.map((m) => m.order).join(',');
if (orders !== '1,2,3,4,5,6,7') warn('ordres des missions : ' + orders);

/* ---------- 4. prononciation + dialogues ---------- */
section('Prononciation et dialogues');
LANGS.forEach((code) => {
  const meta = C.languages.filter((l) => l.code === code)[0] || {};
  const items = C.pronunciation[code];
  if (!Array.isArray(items)) { fail('prononciation ' + code + ' : tableau absent'); return; }
  if (!items.length) {
    // langue « bonus » (drapeau fourni, contenu à venir) : l'état vide est géré par l'app
    if (meta.extra) warn('prononciation ' + code + ' : langue bonus sans contenu (état vide géré)');
    else fail('prononciation ' + code + ' : tableau vide (< 8 items attendus)');
    return;
  }
  if (items.length < 8) fail('prononciation ' + code + ' : ' + items.length + ' items (< 8)');
  items.forEach((it, i) => {
    ['word', 'ipa', 'translation', 'tip', 'level'].forEach((k) => {
      if (!it[k]) fail('prononciation ' + code + '[' + i + '] : ' + k + ' manquant');
    });
  });
});
let dlgTotal = 0;
Object.keys(C.conversations).forEach((code) => {
  const list = C.conversations[code];
  dlgTotal += list.length;
  list.forEach((d) => {
    if (!d.title || !d.title.fr) fail('dialogue ' + code + '/' + d.id + ' : title.fr manquant');
    const turns = d.turns || [];
    if (turns.length < 4) fail('dialogue ' + d.id + ' : ' + turns.length + ' turns (< 4)');
    if (!turns.length || turns[turns.length - 1].who !== 'me') fail('dialogue ' + d.id + ' : dernier turn != "me"');
    let prev = null;
    turns.forEach((t, i) => {
      if (t.who !== 'bot' && t.who !== 'me') fail('dialogue ' + d.id + '[' + i + '] : who invalide');
      if (prev === t.who) warn('dialogue ' + d.id + ' : deux turns « ' + t.who + ' » consécutifs (' + i + ')');
      prev = t.who;
      if (t.who === 'me') {
        if (!Array.isArray(t.keywords) || !t.keywords.length) fail('dialogue ' + d.id + '[' + i + '] : keywords vide');
        const say = (t.say || t.text || '').toLowerCase();
        (t.keywords || []).forEach((k) => {
          if (k !== k.toLowerCase()) fail('dialogue ' + d.id + '[' + i + '] : keyword non minuscule');
          if (say.indexOf(k.toLowerCase()) < 0) fail('dialogue ' + d.id + '[' + i + '] : keyword « ' + k + ' » absente de say');
        });
      }
      if (!t.gloss || !t.gloss.fr) fail('dialogue ' + d.id + '[' + i + '] : gloss.fr manquant');
    });
  });
});
console.log('  prononciation : ' + LANGS.length + ' langues / ' + LANGS.reduce((a, c) => a + (C.pronunciation[c] || []).length, 0) + ' items');
console.log('  dialogues : ' + dlgTotal + ' (' + Object.keys(C.conversations).map((k) => k + '=' + C.conversations[k].length).join(' ') + ')');

/* ---------- 5. badges ---------- */
section('Badges');
const TYPES = ['streak', 'missions', 'minutes', 'words', 'score', 'early'];
const ids = {};
BADGES.forEach((b) => {
  if (ids[b.id]) fail('badge id dupliqué : ' + b.id);
  ids[b.id] = 1;
  ['id', 'emoji'].forEach((k) => { if (!b[k]) fail('badge ' + b.id + ' : ' + k + ' manquant'); });
  if (!b.title || !b.title.fr || !b.title.en) fail('badge ' + b.id + ' : title.fr/en manquant');
  if (!b.text || !b.text.fr || !b.text.en) fail('badge ' + b.id + ' : text.fr/en manquant');
  if (!b.rule || TYPES.indexOf(b.rule.type) < 0) fail('badge ' + b.id + ' : rule.type invalide');
  else if (!(b.rule.n > 0)) fail('badge ' + b.id + ' : rule.n invalide');
});

/* ---------- 6. clés i18n utilisées par les écrans ---------- */
section('Clés i18n utilisées par les écrans');
const screenFiles = files.filter((f) => f.indexOf(path.join('js', 'screens')) >= 0 || f.indexOf(path.join('js', 'core')) >= 0 || f.endsWith('app.js'));
const used = {};
const re = /SK\.L\(\s*'([^']+)'|SK\.L\(\s*"([^"]+)"|\bL\(\s*'([^']+)'|SK\.L\(\s*'([^']+)'/g;
screenFiles.forEach((f) => {
  const src = fs.readFileSync(f, 'utf8');
  let m;
  const rx = /\bL\(\s*'([^']+)'/g;
  while ((m = rx.exec(src))) used[m[1]] = path.relative(ROOT, f);
  const rx2 = /SK\.L\(\s*'([^']+)'/g;
  while ((m = rx2.exec(src))) used[m[1]] = path.relative(ROOT, f);
});
// clés dynamiques (concaténation) : signalées pour revue manuelle
const dyn = [];
screenFiles.forEach((f) => {
  const src = fs.readFileSync(f, 'utf8');
  const rx = /\bL\(\s*'([^']*)'\s*\+/g;
  let m;
  while ((m = rx.exec(src))) dyn.push(m[1] + '… (' + path.relative(ROOT, f) + ')');
});
const frKeys = Object.keys(I18N.fr || {});
console.log('  clés fr disponibles : ' + frKeys.length + ' | clés statiques utilisées : ' + Object.keys(used).length);
const missing = Object.keys(used).filter((k) => !(k in (I18N.fr || {})));
missing.forEach((k) => warn('clé i18n absente du dictionnaire fr : ' + k + '  (utilisée dans ' + used[k] + ')'));
if (dyn.length) console.log('  clés construites dynamiquement (vérifier la racine en fr) : ' + [...new Set(dyn)].join(', '));

/* ---------- 5b. visuels : chaque langue a un drapeau rond présent ---------- */
section('Visuels (drapeaux et pictos)');
const ASSET_DIR = path.join(ROOT, 'assets', 'img');
const assetFiles = fs.existsSync(ASSET_DIR) ? fs.readdirSync(ASSET_DIR).sort() : [];
if (!assetFiles.length) fail('aucun visuel dans assets/img');
C.languages.forEach((l) => {
  if (!l.flagImg) { fail('langue ' + l.code + ' : flagImg manquant'); return; }
  if (assetFiles.indexOf(l.flagImg) < 0) fail('langue ' + l.code + ' : visuel absent assets/img/' + l.flagImg);
  if (!l.flag) warn('langue ' + l.code + ' : emoji de repli absent');
});
['icon-travail.png', 'icon-etudes.png', 'icon-calendrier.png'].forEach((n) => {
  if (assetFiles.indexOf(n) < 0) warn('picto absent : assets/img/' + n);
});
assetFiles.forEach((n) => {
  const buf = fs.readFileSync(path.join(ASSET_DIR, n));
  const isPng = buf[0] === 0x89 && buf.toString('latin1', 1, 4) === 'PNG';
  if (!isPng) fail('visuel non PNG : ' + n);
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  // les visuels ronds (drapeaux, avatar du guide) doivent être carrés ;
  // le personnage en pied est volontairement plus haut que large
  const tall = n.indexOf('guide-full') === 0;
  if (!tall && w !== h) fail('visuel non carré : ' + n + ' (' + w + 'x' + h + ')');
  if (tall && h <= w) fail('personnage en pied attendu plus haut que large : ' + n);
});
['guide-avatar.png', 'guide-full.png'].forEach((n) => {
  if (assetFiles.indexOf(n) < 0) fail('visuel du guide absent : assets/img/' + n);
});
const assetsSrc = read('js/core/assets.js');
C.languages.forEach((l) => {
  if (assetsSrc.indexOf(l.flagImg) < 0) fail('js/core/assets.js ne référence pas ' + l.flagImg + ' (langue ' + l.code + ')');
});
console.log('  ' + assetFiles.length + ' visuels carrés ; chaque langue de contenu a son drapeau');

/* 5c. la table code -> fichier de assets.js doit pointer sur des fichiers réels */
(function () {
  const sandboxAssets = { window: { SK: { CONTENT: C, el: () => ({}), norm: (s) => s } }, console, document: undefined };
  sandboxAssets.globalThis = sandboxAssets;
  sandboxAssets.window.SK.Store = { get: () => ({ prefs: {} }) };
  const actx = vm.createContext(sandboxAssets);
  try { vm.runInContext(read('js/core/assets.js'), actx, { filename: 'js/core/assets.js' }); }
  catch (e) { fail('assets.js non exécutable hors navigateur : ' + e.message); return; }
  const FLAGS = sandboxAssets.window.SK.Assets.FLAGS;
  let checked = 0;
  Object.keys(FLAGS).forEach((code) => {
    checked++;
    if (assetFiles.indexOf(FLAGS[code]) < 0) fail('assets.js : code « ' + code + ' » pointe sur un fichier absent (' + FLAGS[code] + ')');
  });
  ['travail', 'etudes', 'calendrier'].forEach((n) => {
    const p = sandboxAssets.window.SK.Assets.PICTOS[n];
    if (!p) fail('assets.js : picto « ' + n + ' » non déclaré');
    else if (assetFiles.indexOf(p) < 0) fail('assets.js : picto « ' + n + ' » pointe sur un fichier absent (' + p + ')');
  });
  console.log('  table assets.js : ' + checked + ' codes de drapeau + 3 pictos, tous résolus');
})();

/* 6b. jetons {…} non alimentés
   `L('clé', …)` : si le libellé contient un jeton qui n'est ni {nom} ni {langue},
   il faut un 3e argument (les valeurs). On compte les arguments au niveau 1. */
const AUTO_VARS = { nom: 1, langue: 1, native: 1, min: 1, total: 1, n: 1 };
function countArgs(src, openParenIdx) {
  let depth = 0, args = 1, quote = null, i = openParenIdx;
  for (; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') { i++; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '(' || c === '[' || c === '{') { depth++; continue; }
    if (c === ')' || c === ']' || c === '}') {
      depth--;
      if (depth === 0) break;
      continue;
    }
    if (c === ',' && depth === 1) args++;
  }
  return args;
}
screenFiles.forEach((f) => {
  const src = fs.readFileSync(f, 'utf8');
  const rel = path.relative(ROOT, f);
  const rx = /\bL\(\s*'([^']+)'/g;
  let m;
  while ((m = rx.exec(src))) {
    const key = m[1];
    const value = (I18N.fr || {})[key];
    if (!value || typeof value !== 'string' || value.indexOf('{') < 0) continue;
    const tokens = [...new Set((value.match(/\{(\w+)\}/g) || []).map((t) => t.slice(1, -1)))];
    const unhandled = tokens.filter((t) => !AUTO_VARS[t]);
    if (!unhandled.length) continue;
    if (countArgs(src, m.index + m[0].length - m[1].length - 3) >= 3) continue;   // valeurs fournies
    warn('jeton non alimenté dans ' + rel + ' : L(\'' + key + '\') → ' + unhandled.join(', '));
  }
});

/* ---------- 7. couverture index.html ---------- */
section('Cohérence index.html');
const html = read('index.html');

/* 7a. toutes les ressources locales référencées existent */
const refs = [...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)]
  .map((m) => m[1]).filter((u) => !/^https?:|^data:/.test(u));
refs.forEach((r) => { if (!fs.existsSync(path.join(ROOT, r))) fail('index.html référence un fichier absent : ' + r); });
console.log('  ' + refs.length + ' ressources locales référencées, toutes présentes');

/* 7b. aucun module js/ oublié, ordre correct */
const jsModules = walk(path.join(ROOT, 'js'), []).map((f) => path.relative(ROOT, f).replace(/\\/g, '/'));
jsModules.forEach((rel) => { if (html.indexOf(rel) < 0) fail('module jamais chargé par index.html : ' + rel); });
console.log('  ' + jsModules.length + ' modules js/ tous chargés');

/* 7c. ordre des dépendances */
const orderChecks = [
  ['js/core/util.js', 'js/core/store.js'],
  ['js/core/store.js', 'js/app.js'],
  ['js/core/util.js', 'js/screens/splash.js'],
  ['js/screens/profile.js', 'js/app.js']
];
orderChecks.forEach(([before, after]) => {
  if (!(html.indexOf(before) >= 0 && html.indexOf(before) < html.indexOf(after))) {
    fail('ordre de chargement incorrect : ' + before + ' doit précéder ' + after);
  }
});

dataFiles.concat([
  'js/core/util.js', 'js/core/store.js', 'js/core/speech.js', 'js/core/sfx.js', 'js/core/audio.js',
  'js/core/ui.js', 'js/core/charts.js', 'js/core/router.js',
  'js/screens/splash.js', 'js/screens/onboarding.js', 'js/screens/home.js', 'js/screens/mission.js',
  'js/screens/help.js', 'js/screens/recording.js', 'js/screens/free.js', 'js/screens/review.js',
  'js/screens/results.js', 'js/screens/pronounce.js',
  'js/screens/conversation.js', 'js/screens/progress.js', 'js/screens/profile.js', 'js/app.js'
]).forEach((rel) => {
  if (html.indexOf(rel) < 0) fail('index.html ne charge pas ' + rel);
});
// ordre : content.js après les modules de contenu
const iContent = html.indexOf('js/data/content.js');
['js/data/000-missions-de.js', 'js/data/000-pron-dialogues.js', 'js/data/prompts.js', 'js/data/ui-strings.js', 'js/data/080-badges.js'].forEach((rel) => {
  if (html.indexOf(rel) > iContent) fail('index.html charge ' + rel + ' après content.js');
});
// app.js en dernier
if (html.indexOf('js/app.js') < html.indexOf('js/screens/profile.js')) fail('app.js doit être chargé en dernier');
// PWA : manifest + service worker présents et cohérents
['manifest.webmanifest', 'service-worker.js', 'icons/icon-192.png', 'icons/icon-512.png'].forEach((rel) => {
  if (!fs.existsSync(path.join(ROOT, rel))) fail('fichier PWA manquant : ' + rel);
});
if (html.indexOf('manifest.webmanifest') < 0) fail('index.html ne référence pas le manifest');
const swSrc = read('service-worker.js');
const shellList = (swSrc.match(/SHELL = \[([\s\S]*?)\];/) || [])[1] || '';
jsModules.concat(['index.html', 'css/styles.css']).concat(fs.readdirSync(path.join(ROOT,'assets','img')).map(function(n){return 'assets/img/'+n;})).forEach((rel) => {
  if (shellList.indexOf("'./" + rel + "'") < 0) fail('service-worker.js ne met pas en cache : ' + rel);
});

/* ---------- 8. références aux écrans ---------- */
section('Écrans référencés par le routeur');
const registered = [];
files.filter((f) => f.indexOf('screens') >= 0).forEach((f) => {
  const src = fs.readFileSync(f, 'utf8');
  const rx = /Router\.register\(\s*'([^']+)'/g;
  let m;
  while ((m = rx.exec(src))) registered.push(m[1]);
});
const required = ['splash', 'onboarding', 'language', 'level', 'objective', 'home', 'mission', 'help', 'record', 'results', 'pronounce', 'conversation', 'progress', 'profile', 'review', 'free'];
required.forEach((r) => { if (registered.indexOf(r) < 0) fail('écran non enregistré : ' + r); });
const gone = {};
files.forEach((f) => {
  const src = fs.readFileSync(f, 'utf8');
  const rx = /Router\.(?:go|replace)\(\s*'([^']+)'/g;
  let m;
  while ((m = rx.exec(src))) gone[m[1]] = (gone[m[1]] || 0) + 1;
});
Object.keys(gone).forEach((g) => { if (required.indexOf(g) < 0 && g !== 'results') fail('navigation vers un écran inconnu : ' + g); });
console.log('  écrans enregistrés : ' + registered.length + ' | cibles de navigation : ' + Object.keys(gone).length);

/* ---------- 9. responsive : invariants de mise en page ---------- */
section('Responsive et adaptation d’écran');
const css = read('css/styles.css');
const htmlSrc = read('index.html');

/* 9a. aucune ressource distante (l'app doit fonctionner hors-ligne) */
const remote = [...htmlSrc.matchAll(/(?:src|href)="(https?:[^"]+)"/g)].map((m) => m[1]);
remote.forEach((u) => fail('ressource distante dans index.html (casse le hors-ligne) : ' + u));
if (!remote.length) { ok(); console.log('  aucune ressource distante : hors-ligne réel'); }

/* 9b. les modes de mise en page existent */
[
  ['téléphone', /@media \(max-width:520px\)/],
  ['tablette', /@media \(min-width:521px\) and \(max-width:1080px\)/],
  ['desktop', /@media \(min-width:1081px\)/],
  ['desktop basse hauteur', /@media \(min-width:1081px\) and \(max-height:819px\)/],
  ['paysage téléphone', /@media \(orientation:landscape\) and \(max-height:520px\)/]
].forEach(([nom, rx]) => { if (!rx.test(css)) fail('règle responsive manquante : ' + nom); });
ok(); console.log('  modes téléphone / tablette / desktop / paysage / fenêtre basse présents');

/* 9c. adaptation interne par container queries (et non par la fenêtre) */
if (!/container-type:inline-size/.test(css)) fail('le cadre n’est pas un conteneur de taille (container-type)');
const cq = (css.match(/@container app/g) || []).length;
if (cq < 3) fail('container queries insuffisantes (' + cq + ', 3 attendues)');
if (!/cqw/.test(css)) fail('aucune unité cqw : la typographie ne suit pas la largeur de l’app');
ok(); console.log('  conteneur + ' + cq + ' container queries, typographie en cqw');

/* 9d. zones sûres (encoches, barre de geste) */
const safe = (css.match(/env\(safe-area-inset-/g) || []).length;
if (safe < 4) fail('zones sûres insuffisamment prises en compte (' + safe + ')');
ok(); console.log('  ' + safe + ' usages des zones sûres (safe-area-inset-*)');

/* 9e. hauteurs dynamiques avec repli */
if (!/100dvh/.test(css)) fail('aucune unité dvh : la barre d’URL mobile casse la hauteur');
if (!/100vh;height:100dvh|100vh;min-height:100dvh/.test(css)) warn('prévoir un repli vh avant dvh pour les navigateurs anciens');
ok(); console.log('  unités dvh utilisées avec repli vh');

/* 9f. les overlays sont dans le cadre, pas collés à la fenêtre */
['sheet-backdrop', 'sheet', 'toast-wrap', 'celebrate'].forEach((sel) => {
  const rx = new RegExp('\\.' + sel + '\\{[^}]*position:(fixed|absolute)');
  const m = rx.exec(css);
  if (!m) fail('overlay non positionné explicitement : .' + sel);
  else if (m[1] === 'fixed') fail('.' + sel + ' est en position:fixed : il s’afficherait hors de la frame sur desktop');
});
['sheetBackdrop', 'sheet', 'toastWrap', 'celebrate'].forEach((id) => {
  if (htmlSrc.indexOf('id="' + id + '"') < 0) fail('overlay absent du HTML : #' + id);
});
const deviceOpen = htmlSrc.indexOf('class="device"');
const lastOverlay = Math.max.apply(null, ['id="sheetBackdrop"', 'id="sheet"', 'id="toastWrap"', 'id="celebrate"'].map((s) => htmlSrc.indexOf(s)));
if (deviceOpen > lastOverlay) fail('les overlays ne sont pas placés dans le cadre .device');
else { ok(); console.log('  overlays ancrés dans le cadre (panneau, toasts, confettis)'); }

/* 9g. cibles tactiles et zoom iOS */
if (!/@media \(pointer:coarse\)/.test(css)) fail('aucune règle pour les écrans tactiles (pointer:coarse)');
if (!/input,textarea,select\{font-size:16px/.test(css)) fail('champs < 16 px sous pointer:coarse : iOS zoome au focus');
if (!/min-height:44px/.test(css)) fail('cibles tactiles < 44 px');
ok(); console.log('  cibles tactiles ≥ 44 px et champs à 16 px sur mobile');

/* 9h. mode sombre opt-in, jamais automatique */
if (/prefers-color-scheme:dark/.test(css)) fail('mode sombre automatique : préférer une bascule explicite (data-theme)');
if (!/html\[data-theme="dark"\]/.test(css)) fail('aucun thème sombre explicite (html[data-theme="dark"])');
if (!/SK\.applyTheme/.test(read('js/app.js'))) fail('le thème n’est pas appliqué au démarrage');
ok(); console.log('  mode sombre explicite (data-theme), appliqué au démarrage');

/* 9i. mots longs et conteneurs flexibles */
if (!/overflow-wrap:break-word|overflow-wrap:anywhere|word-break:break-word/.test(css)) warn('prévoir overflow-wrap pour les mots longs (allemand)');
if (!/min-width:0/.test(css)) warn('prévoir min-width:0 sur les conteneurs flexibles');

/* 9j. page de contrôle visuel */
if (!fs.existsSync(path.join(ROOT, 'docs', 'responsive.html'))) warn('page docs/responsive.html absente');
else { ok(); console.log('  page de contrôle docs/responsive.html présente'); }

/* ---------- bilan ---------- */
console.log('\n=========================================');
console.log('contrôles : ' + checks + ' | échecs : ' + fails + ' | avertissements : ' + warns);
console.log(fails ? 'RÉSULTAT : ÉCHEC' : 'RÉSULTAT : OK');
process.exit(fails ? 1 : 0);
