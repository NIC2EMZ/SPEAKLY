# SPEAKLY — Learn less. Speak more.

Application web de poche pour **oser parler la langue qu'on apprend**. Elle reprend
écran par écran la maquette fournie (10 écrans) : *Splash → Bienvenue → Choix de la
langue → Niveau → Objectif → Accueil → Mission du jour → Aide → Enregistrement →
Après l'enregistrement*.

Le principe : au lieu de faire des exercices à trous, tu **parles 5 minutes par jour**.
L'app te dit quoi dire, t'écoute, te note et suit ta régularité.

---

## 1. Lancer l'app en 10 secondes

1. Double-clique sur **[demarrer-speakly.bat](demarrer-speakly.bat)** (Windows).
   Le script démarre un petit serveur local et ouvre ton navigateur.
2. Autorise le **micro** quand le navigateur le demande.
3. Choisis ta langue, ton niveau, ton objectif… et parle.

> Un serveur local est utilisé parce que le micro et la reconnaissance vocale du
> navigateur ont besoin d'un contexte sécurisé (`http://localhost` en fait partie,
> `file://` non). Sur téléphone, ouvre l'adresse réseau affichée dans la console
> (ex. `http://192.168.1.20:5180/`) puis « Ajouter à l'écran d'accueil ».

### Autres façons de lancer

| Méthode | Commande |
|---|---|
| Node.js (macOS / Linux / Windows) | `node scripts/serve.js` puis ouvrir http://localhost:5180/ |
| Port personnalisé | `node scripts/serve.js --port 5199` |
| Sans ouvrir le navigateur | `node scripts/serve.js --no-open` |
| Double-clic sur `index.html` | fonctionne pour tester l'interface, **mais** micro et reconnaissance vocale peuvent être bloqués |

Aucune installation, aucune dépendance, aucune clé API : HTML, CSS et JavaScript natifs.

---

## 2. Ce que fait l'app, écran par écran

| # | Écran de la maquette | Dans l'app | Fichier |
|---|---|---|---|
| 1 | Splash Screen | Logo SPEAKLY, « Learn less. Speak more. », barre de chargement | [splash.js](js/screens/splash.js) |
| 2 | Bienvenue / Onboarding | Bulles « Hallo! / Hello! / ¡Hola! », promesse « pouvoir LA PARLER » | [onboarding.js](js/screens/onboarding.js) |
| 3 | Choisir sa langue | 12 langues avec drapeaux, sélection = drapeau + coche | [onboarding.js](js/screens/onboarding.js) |
| 4 | Niveau | A1→C2 + « Je ne sais pas » avec test express | [onboarding.js](js/screens/onboarding.js) |
| 5 | Objectif | 8 objectifs (multi-choix) + durée quotidienne 5/10/15/30 min + prénom | [onboarding.js](js/screens/onboarding.js) |
| 6 | Accueil | « Guten Morgen Alex », série de jours, carte violette **SPEAK 5 / 05:00**, mission du jour, barres de la semaine, raccourcis | [home.js](js/screens/home.js) |
| 7 | Mission du jour | Routine, **5 questions** numérotées, mots utiles cliquables (audio), bloc « Je ne sais pas quoi dire ? / Aide-moi » | [mission.js](js/screens/mission.js) |
| 8 | Aide | 4 étapes dépliables : **1. Indice · 2. Mots utiles · 3. Début de phrase · 4. Exemple** | [help.js](js/screens/help.js) |
| 9 | Enregistrement | Chrono **04:37 / 05:00** en anneau, micro pulsé, vumètre temps réel, transcription live, boutons **Pause / Terminer** | [recording.js](js/screens/recording.js) |
| 10 | Après l'enregistrement | « Très bien ! », durée parlée, série, réécoute de l'enregistrement, **Analyse** (fluidité, prononciation, vocabulaire, grammaire), « À travailler », détail question par question | [results.js](js/screens/results.js) |

Au-delà de la maquette, l'app contient aussi :

- **Mes mots / Révision espacée (SRS)** — chaque mot rencontré entre dans un lexique personnel.
  Un mot **raté revient le lendemain**, puis J+3, J+7, J+21, J+45 ; un mot réussi monte d'un palier,
  un mot raté redescend au premier. La séance est générée à partir de *tes* difficultés réelles :
  c'est ce qui fait durer le contenu au lieu de le consommer une fois.
- **Parler libre** — un enregistrement continu de 3 minutes guidé par un sujet tiré au hasard
  (16 amorces allemandes, 8 en anglais/espagnol/italien/portugais) avec 3 mots d'appui. Le plus
  proche de parler pour de vrai, et utilisable à n'importe quel niveau.
- **Prononciation** — 8 sons difficiles par langue, avec IPA, astuce, écoute et note sur 100.
- **Conversation** — dialogues guidés tour par tour : l'app parle, tu réponds, elle évalue.
- **Progression** — courbe de scores, heatmap d'activité sur 12 semaines, lexique, 12 badges.
- **Profil** — langue, niveau, objectifs, durée, voix, langue d'interface (FR/EN/ES), export/import JSON, réinitialisation.
- **Hors-ligne (PWA)** — l'app s'installe sur l'écran d'accueil (manifeste + service worker) et
  fonctionne sans réseau : en avion, dans le métro. Tout reste sur l'appareil.

### Visuels

Le **personnage-guide** de l'app (illustration fournie, détourée du fond en damier) accompagne
l'apprenant : écran de bienvenue, bulles de l'app dans les dialogues, écran d'aide
« Je ne sais pas quoi dire », états vides. Il est décliné en deux fichiers : un avatar rond
de 192 px et la silhouette entière en 420 px (fond transparent), avec repli automatique sur
un emoji si l'image manque.

Les drapeaux ronds et les pictos illustrés fournis sont intégrés dans toute l'interface
(grille des langues, pastille de la langue apprise, en-tête de mission, profil, calendriers
de la semaine et de la progression) :

- 11 drapeaux fournis : Allemagne, France, Italie, Portugal, Espagne, Russie, Chine,
  Royaume-Uni, États-Unis, Belgique, Brésil ;
- 5 drapeaux générés dans le **même style rond et la même taille** (128 px) pour les langues
  sans visuel : japonais, coréen, arabe, hindi, turc ;
- 3 pictos fournis utilisés comme icônes d'objectif (travail, études) et de calendrier ;
- les drapeaux US / UK / Brésil servent au choix de **variante régionale**
  (anglais US ↔ UK, portugais PT ↔ BR) dans le profil ;
- repli automatique sur l'emoji si une image manque : jamais de trou dans l'interface.

Planches de contrôle : [docs/visuels.html](docs/visuels.html) (drapeaux et pictos aux tailles
réelles) et [docs/guide-integration.png](docs/guide-integration.png) (le guide en situation).

### Comment ça note

Tout se passe dans ton navigateur, sans serveur :

- **Écoute du modèle** : synthèse vocale (`speechSynthesis`) avec la voix de la langue apprise.
- **Ta prise de parole** : reconnaissance vocale (`SpeechRecognition`) transcrite en direct.
- **Note de prononciation** : comparaison mots-à-mots tolérante (distance de Levenshtein), pour ne pas
  pénaliser les accents ou une syllabe avalée ; « stehe » est reconnu dans « stehst ».
- **4 axes** : fluidité (mots-clés trouvés + débit), prononciation, vocabulaire, grammaire.
  Une séance où tu prononces les 5 phrases modèles obtient ≈ 80/100.
- Si la reconnaissance vocale n'est pas disponible (Safari, Firefox, hors ligne), l'app le dit
  clairement et propose une **saisie clavier** : l'expérience reste utilisable.

---

## 3. Contenu livré

| Contenu | Détail |
|---|---|
| Missions allemandes | **7 missions × 5 questions** (routine du matin B1, au café A2, se présenter A1, cuisine A2, s'orienter A2, chez le médecin B1, entretien d'embauche B2), 10 mots de vocabulaire et un conseil de prononciation par mission |
| Révision espacée | 67 mots entrent dans le lexique et sont replanifiés J+1 → J+45 : le contenu se recycle indéfiniment au lieu d'être consommé en 8 jours |
| Parler libre | 16 amorces de sujet en allemand, 8 en anglais, espagnol, italien, portugais |
| Prononciation | 12 langues × 8 mots avec transcription IPA et astuce concrète (96 fiches) |
| Dialogues | 14 dialogues guidés (allemand ×6, anglais, espagnol, italien, portugais ×2) |
| Interface | 385 libellés en français, anglais et espagnol |
| Badges | 12 badges progressifs (série, missions, minutes, mots, score, séance matinale) |

Les autres langues affichent un état vide honnête (« contenu à venir ») au lieu de
données factices. Ajouter une mission = ajouter un objet dans
[000-missions-de.js](js/data/000-missions-de.js) ; le contrat est documenté en tête de
[content.js](js/data/content.js).

---

## 4. Structure du projet

```
speakly/
├── index.html                  coquille : cadre téléphone, barre d'état, onglets, overlays
├── demarrer-speakly.bat        lancement Windows en un double-clic
├── manifest.webmanifest        installation sur l'écran d'accueil (PWA)
├── service-worker.js           mise en cache hors-ligne
├── icons/                      icônes 192/512 + maskable générées
├── assets/img/                 drapeaux ronds (16), pictos (3) et personnage-guide (2), mis en cache hors-ligne
├── css/styles.css              design system complet (tokens, composants, responsive)
├── js/
│   ├── app.js                  amorçage, analytique de session, badges, salutations, hors-ligne
│   ├── core/
│   │   ├── util.js             helpers DOM/texte/dates, similarité, alignement de mots, i18n
│   │   ├── assets.js           drapeaux ronds + pictos, variantes régionales, repli emoji
│   │   ├── store.js            état global, persistance, statistiques, moteur de révision (SRS)
│   │   ├── speech.js           synthèse vocale + reconnaissance vocale
│   │   ├── audio.js            micro, vumètre, enregistrement (MediaRecorder)
│   │   ├── sfx.js              sons de feedback (Web Audio, aucun fichier)
│   │   ├── ui.js               composants : toast, panneau, anneaux, vumètre, confettis
│   │   ├── charts.js           barres semaine, heatmap 12 semaines, courbe
│   │   └── router.js           navigation par écrans + onglets + garde d'onboarding
│   ├── data/                   contenu : i18n, missions, prononciation, dialogues, amorces, badges
│   └── screens/                16 écrans (1 par fichier, dont review.js et free.js)
├── scripts/
│   ├── serve.js                serveur statique local (zéro dépendance)
│   ├── verify.js               vérification d'intégration (contrats + i18n + UTF-8 + PWA)
│   └── smoke.js                exécute réellement tous les écrans hors navigateur
└── docs/
    ├── maquette.html           maquette annotée écran par écran
    ├── visuels.html            planche de contrôle des drapeaux et pictos (tailles réelles)
    ├── guide-integration.png   le personnage-guide en situation (bienvenue + dialogue)
    └── mockup/                 maquette d'origine (10 écrans)
```

---

## 5. Vérifications

```bash
node scripts/verify.js   # contrats de données, clés i18n, ordre de chargement, intégrité UTF-8
node scripts/smoke.js    # parcours complet exécuté (21 étapes, 0 erreur console)
```

- `verify.js` contrôle : syntaxe de tous les fichiers, absence de BOM/mojibake,
  existence de chaque ressource référencée par `index.html`, ordre de chargement des
  modules, contrat des 7 missions (5 questions, mots-clés réellement présents dans la
  cible, pas d'emoji dans l'allemand), 96 fiches de prononciation, 14 dialogues,
  12 badges, **toutes** les clés i18n utilisées par les écrans, et l'absence de jeton
  `{…}` laissé sans valeur.
- `smoke.js` instancie l'application dans un mini-DOM et déroule le parcours réel :
  splash → onboarding → accueil → mission → aide → enregistrement (23 s simulées)
  → résultats → tous les onglets → **échelle de révision espacée** (raté J+1, réussi J+3 puis J+7,
  redescente après un raté) → **parler libre** (45 s transcrites) → persistance, avec simulation
  d'une prise de parole pour valider le barème (5 phrases conformes → 80/100, axes 88/74/73/85).

État actuel : **verify 37 contrôles / 0 échec**, **smoke 33 étapes / 0 échec**.

---

## 6. Vie privée

Tout reste sur ton appareil : progression, séries, badges et enregistrements sont
stockés localement (`localStorage`) et ne quittent jamais le navigateur. Aucun compte,
aucun envoi vers un serveur. Le profil permet d'**exporter** ces données en JSON et de
les réimporter.

---

## 7. Si quelque chose ne marche pas

| Symptôme | Cause probable / solution |
|---|---|
| « Micro refusé » | Refuse puis réautorise le micro via l'icône de la barre d'adresse, puis recharge la page. |
| La transcription reste vide | Utilise Chrome/Edge (reconnaissance vocale), ou le bouton crayon pour écrire ta phrase. |
| Aucune voix | Installe un pack de voix dans les réglages système ; la liste des voix est visible dans Profil → Voix disponibles. |
| Rien ne se passe au double-clic sur le .bat | Node.js absent : installe-le depuis nodejs.org, ou ouvre directement `index.html`. |

*SPEAKLY — Learn less. Speak more.*
