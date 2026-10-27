/* ==========================================================================
   SPEAKLY — content.js : chargeur de contenu + métadonnées partagées
   --------------------------------------------------------------------------
   CONTRAT DE DONNÉES (utilisé par toute l'app)
   --------------------------------------------------------------------------
   SK.CONTENT = {
     languages : [{ code, fr, native, flag, speaking, ui }],
     levels    : [{ code, label, sub }],
     objectives: [{ id, icon, fr, sub, color }],
     missions  : [Mission],
     pronunciation: { <lang>: [PronItem] },
     conversations: { <lang>: [Dialogue] },
     badges    : [Badge],
     footerNote: string
   }

   Mission = {
     id, lang, level('A1'|'A2'|'B1'|'B2'|'C1'|'C2'), order,
     topic{f}, title{f}, subtitle{f}, emoji, minutes,
     situation{f},                       // contexte de la mission
     routine{f},                         // programme de la routine
     questions:[Question],               // 5 questions
     vocabulary:[Word],                  // 8 à 10 mots clés
     tip{f}                              // conseil de prononciation
   }
   Question = {
     id, n, text{f},                     // question posée (dans la langue apprise)
     gloss{f},                           // traduction française
     time,                               // indication de moment ("le matin")
     target,                             // phrase modèle à prononcer
     targetGloss{f},
     answerAlt:[string],                 // variantes acceptées
     answerKeywords:[string],            // mots attendus (pour le score)
     words:[Word],                        // 1 à 3 mots nouveaux
     hint{f},                            // indice (écran Aide)
     example{f}                          // exemple d'usage
   }
   Word = { word, article, translation, ipa, example }

   PronItem = { word, ipa, translation, tip, level }
   Dialogue = {
     id, emoji, title{f}, subtitle{f}, level,
     turns:[{ who:'bot'|'me', text, gloss{f}, say, keywords:[string] }]
   }
   Badge = { id, emoji, title{f}, text{f}, rule:{type,...} }
   ========================================================================== */
(function (global) {
  'use strict';

  var meta = {
    languages: [
      { code: 'de', fr: 'Allemand',   native: 'Deutsch',  flag: '🇩🇪', flagImg: 'flag-de.png', speaking: 'de-DE', ui: 'fr' },
      { code: 'en', fr: 'Anglais',    native: 'English',  flag: '🇬🇧', flagImg: 'flag-us.png', speaking: 'en-GB', ui: 'en' },
      { code: 'es', fr: 'Espagnol',   native: 'Español',  flag: '🇪🇸', flagImg: 'flag-es.png', speaking: 'es-ES', ui: 'fr' },
      { code: 'pt', fr: 'Portugais',  native: 'Português',flag: '🇵🇹', flagImg: 'flag-pt.png', speaking: 'pt-PT', ui: 'fr' },
      { code: 'fr', fr: 'Français',   native: 'Français', flag: '🇫🇷', flagImg: 'flag-fr.png', speaking: 'fr-FR', ui: 'fr' },
      { code: 'it', fr: 'Italien',    native: 'Italiano', flag: '🇮🇹', flagImg: 'flag-it.png', speaking: 'it-IT', ui: 'fr' },
      { code: 'ko', fr: 'Coréen',     native: '한국어',    flag: '🇰🇷', flagImg: 'flag-ko.png', speaking: 'ko-KR', ui: 'fr' },
      { code: 'ja', fr: 'Japonais',   native: '日本語',    flag: '🇯🇵', flagImg: 'flag-ja.png', speaking: 'ja-JP', ui: 'fr' },
      { code: 'zh', fr: 'Chinois',    native: '中文',      flag: '🇨🇳', flagImg: 'flag-zh.png', speaking: 'zh-CN', ui: 'fr' },
      { code: 'ar', fr: 'Arabe',      native: 'العربية',   flag: '🇸🇦', flagImg: 'flag-ar.png', speaking: 'ar-SA', ui: 'fr' },
      { code: 'hi', fr: 'Hindi',      native: 'हिन्दी',     flag: '🇮🇳', flagImg: 'flag-hi.png', speaking: 'hi-IN', ui: 'fr' },
      { code: 'tr', fr: 'Turc',       native: 'Türkçe',   flag: '🇹🇷', flagImg: 'flag-tr.png', speaking: 'tr-TR', ui: 'fr' },
      /* Drapeaux prêts pour de futurs contenus (russe, portugais du Brésil) */
      { code: 'ru', fr: 'Russe',      native: 'Русский',  flag: '🇷🇺', flagImg: 'flag-ru.png', speaking: 'ru-RU', ui: 'fr', extra: true },
      { code: 'pt-BR', fr: 'Portugais (Brésil)', native: 'Português (BR)', flag: '🇧🇷', flagImg: 'flag-br.png', speaking: 'pt-BR', ui: 'fr', extra: true }
    ],
    levels: [
      { code: 'A1', label: 'A1 — Débutant',   sub: 'Premiers mots, se présenter' },
      { code: 'A2', label: 'A2 — Élémentaire', sub: 'Phrases simples du quotidien' },
      { code: 'B1', label: 'B1 — Intermédiaire', sub: 'Conversations courantes' },
      { code: 'B2', label: 'B2 — Intermédiaire avancé', sub: 'Argumenter, nuancer' },
      { code: 'C1', label: 'C1 — Avancé',      sub: 'Fluide et spontané' },
      { code: 'C2', label: 'C2 — Maîtrise',    sub: 'Comme un natif' }
    ],
    objectives: [
      { id: 'travail',      icon: 'brief',  fr: 'Travail',            sub: 'Réunions, e-mails, collègues', color: '#6C4BE8' },
      { id: 'voyage',       icon: 'plane',  fr: 'Voyage',             sub: 'Aéroport, hôtel, restaurant',  color: '#3B9DF8' },
      { id: 'conversation', icon: 'chat',   fr: 'Conversation',       sub: 'Discuter au quotidien',        color: '#22C08C' },
      { id: 'quotidien',    icon: 'home',   fr: 'Vie quotidienne',    sub: 'Courses, santé, démarches',    color: '#F5A524' },
      { id: 'etudes',       icon: 'doc',    fr: 'Études',             sub: 'Cours, examens, notes',        color: '#8B6FF0' },
      { id: 'examen',       icon: 'target', fr: 'Examen',             sub: 'Certification, test officiel',  color: '#E23F6E' },
      { id: 'culture',      icon: 'globe',  fr: 'Immigration / explication', sub: 'S\'installer, comprendre', color: '#5B3FD8' },
      { id: 'confiance',    icon: 'smile',  fr: 'Prendre confiance à l\'oral', sub: 'Oser parler sans peur', color: '#17A97A' }
    ],
    footerNote: 'Méthode SPEAKLY : 5 minutes par jour, et tu parles avant de savoir.'
  };

  /* Ces tableaux sont remplis par les modules de contenu (chargés après).
     L'app fusionne plusieurs fichiers de missions pour pouvoir grandir sans
     réécrire un seul gros fichier : missions de base, puis extensions. */
  var missions = [].concat(
    global.SK.MISSIONS_EXTRA || [],
    global.SK.MISSIONS_EXTRA2 || [],
    global.SK.MISSIONS_EXTRA3 || []
  );
  var pronunciation = Object.assign({}, global.SK.PRONUNCIATION || {});
  var conversations = Object.assign({}, global.SK.CONVERSATIONS || {});
  var badges = (global.SK.BADGES || []).slice();

  global.SK.CONTENT = Object.assign(meta, {
    missions: missions,
    pronunciation: pronunciation,
    conversations: conversations,
    badges: badges
  });

  /* Garantit que chaque langue a des clés, même vides (évite les undefined). */
  meta.languages.forEach(function (l) {
    if (!global.SK.CONTENT.pronunciation[l.code]) global.SK.CONTENT.pronunciation[l.code] = [];
    if (!global.SK.CONTENT.conversations[l.code]) global.SK.CONTENT.conversations[l.code] = [];
  });
})(window);
