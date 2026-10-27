/* ==========================================================================
   SPEAKLY — prompts.js : amorces de « Parler libre »
   --------------------------------------------------------------------------
   window.SK.FREE_PROMPTS = { de:[…], en:[…], es:[…], it:[…], pt:[…] }
   Chaque amorce = { emoji, text (langue apprise), fr (glose), aide (3 mots utiles) }
   ========================================================================== */
(function (global) {
  'use strict';
  global.SK = global.SK || {};

  global.SK.FREE_PROMPTS = {
    de: [
      { emoji: '🌅', text: 'Beschreibe deinen Morgen.', fr: 'Décris ta matinée.', aide: ['aufstehen', 'frühstücken', 'danach'] },
      { emoji: '👋', text: 'Stell dich vor: wer bist du, wo wohnst du?', fr: 'Présente-toi : qui es-tu, où habites-tu ?', aide: ['ich heiße', 'ich wohne', 'ich arbeite'] },
      { emoji: '🍽️', text: 'Erzähl, was du gestern gegessen hast.', fr: 'Raconte ce que tu as mangé hier.', aide: ['gestern', 'gegessen', 'lecker'] },
      { emoji: '🏙️', text: 'Wie sieht deine Stadt aus?', fr: 'À quoi ressemble ta ville ?', aide: ['groß', 'ruhig', 'es gibt'] },
      { emoji: '💼', text: 'Was machst du beruflich?', fr: 'Que fais-tu comme travail ?', aide: ['arbeiten', 'Kollegen', 'Aufgabe'] },
      { emoji: '🎧', text: 'Welche Musik hörst du gern und warum?', fr: 'Quelle musique écoutes-tu et pourquoi ?', aide: ['gern', 'hören', 'weil'] },
      { emoji: '✈️', text: 'Wohin möchtest du reisen?', fr: 'Où aimerais-tu voyager ?', aide: ['reisen', 'möchte', 'nächstes Jahr'] },
      { emoji: '📅', text: 'Was hast du diese Woche vor?', fr: 'Qu\'as-tu prévu cette semaine ?', aide: ['vorhaben', 'am Montag', 'vielleicht'] },
      { emoji: '👨‍👩‍👧', text: 'Erzähl von deiner Familie.', fr: 'Parle de ta famille.', aide: ['Geschwister', 'Eltern', 'zusammen'] },
      { emoji: '🌦️', text: 'Wie ist das Wetter heute bei dir?', fr: 'Quel temps fait-il chez toi aujourd\'hui ?', aide: ['Wetter', 'regnen', 'Sonne'] },
      { emoji: '📚', text: 'Was lernst du gerade und warum?', fr: 'Qu\'apprends-tu en ce moment et pourquoi ?', aide: ['lernen', 'schwierig', 'Spaß'] },
      { emoji: '🎯', text: 'Was möchtest du dieses Jahr erreichen?', fr: 'Que veux-tu accomplir cette année ?', aide: ['Ziel', 'erreichen', 'hoffen'] },
      { emoji: '☕', text: 'Beschreibe dein Lieblingscafé oder -restaurant.', fr: 'Décris ton café ou restaurant préféré.', aide: ['Lieblings', 'gemütlich', 'dort'] },
      { emoji: '🚌', text: 'Wie kommst du normalerweise zur Arbeit?', fr: 'Comment vas-tu au travail d\'habitude ?', aide: ['fahren', 'Bus', 'dauern'] },
      { emoji: '🎬', text: 'Erzähl die Handlung deines Lieblingsfilms.', fr: 'Raconte l\'intrigue de ton film préféré.', aide: ['Film', 'handeln von', 'traurig'] },
      { emoji: '💭', text: 'Was war dein schönster Tag im letzten Monat?', fr: 'Quel a été ton plus beau jour le mois dernier ?', aide: ['schön', 'letzten Monat', 'erinnern'] }
    ],
    en: [
      { emoji: '🌅', text: 'Describe your morning routine.', fr: 'Décris ta routine du matin.', aide: ['wake up', 'breakfast', 'then'] },
      { emoji: '👋', text: 'Introduce yourself: who are you and where do you live?', fr: 'Présente-toi : qui es-tu et où vis-tu ?', aide: ['my name is', 'I live in', 'I work as'] },
      { emoji: '🍽️', text: 'Tell me what you ate yesterday.', fr: 'Dis-moi ce que tu as mangé hier.', aide: ['yesterday', 'I had', 'delicious'] },
      { emoji: '🏙️', text: 'What is your city like?', fr: 'Comment est ta ville ?', aide: ['busy', 'quiet', 'there is'] },
      { emoji: '💼', text: 'What do you do for a living?', fr: 'Que fais-tu comme métier ?', aide: ['I work', 'colleagues', 'task'] },
      { emoji: '🎧', text: 'What music do you like and why?', fr: 'Quelle musique aimes-tu et pourquoi ?', aide: ['I enjoy', 'listen', 'because'] },
      { emoji: '✈️', text: 'Where would you like to travel?', fr: 'Où aimerais-tu voyager ?', aide: ['I would like', 'next year', 'abroad'] },
      { emoji: '🎯', text: 'What do you want to achieve this year?', fr: 'Que veux-tu accomplir cette année ?', aide: ['goal', 'achieve', 'hope'] }
    ],
    es: [
      { emoji: '🌅', text: 'Describe tu mañana.', fr: 'Décris ta matinée.', aide: ['levantarse', 'desayuno', 'después'] },
      { emoji: '👋', text: 'Preséntate: ¿quién eres y dónde vives?', fr: 'Présente-toi : qui es-tu et où vis-tu ?', aide: ['me llamo', 'vivo en', 'trabajo en'] },
      { emoji: '🍽️', text: 'Cuéntame qué comiste ayer.', fr: 'Raconte-moi ce que tu as mangé hier.', aide: ['ayer', 'comí', 'rico'] },
      { emoji: '🏙️', text: '¿Cómo es tu ciudad?', fr: 'Comment est ta ville ?', aide: ['grande', 'tranquila', 'hay'] },
      { emoji: '💼', text: '¿En qué trabajas?', fr: 'Que fais-tu comme travail ?', aide: ['trabajo', 'compañeros', 'tarea'] },
      { emoji: '🎧', text: '¿Qué música te gusta y por qué?', fr: 'Quelle musique aimes-tu et pourquoi ?', aide: ['me gusta', 'escuchar', 'porque'] },
      { emoji: '✈️', text: '¿Adónde te gustaría viajar?', fr: 'Où aimerais-tu voyager ?', aide: ['viajar', 'me gustaría', 'el año que viene'] },
      { emoji: '🎯', text: '¿Qué quieres conseguir este año?', fr: 'Que veux-tu accomplir cette année ?', aide: ['objetivo', 'conseguir', 'espero'] }
    ],
    it: [
      { emoji: '🌅', text: 'Descrivi la tua mattina.', fr: 'Décris ta matinée.', aide: ['alzarsi', 'colazione', 'dopo'] },
      { emoji: '👋', text: 'Presentati: chi sei e dove abiti?', fr: 'Présente-toi : qui es-tu et où habites-tu ?', aide: ['mi chiamo', 'abito a', 'lavoro'] },
      { emoji: '🍽️', text: 'Racconta cosa hai mangiato ieri.', fr: 'Raconte ce que tu as mangé hier.', aide: ['ieri', 'ho mangiato', 'buono'] },
      { emoji: '✈️', text: 'Dove ti piacerebbe viaggiare?', fr: 'Où aimerais-tu voyager ?', aide: ['viaggiare', 'mi piacerebbe', 'anno prossimo'] },
      { emoji: '💼', text: 'Che lavoro fai?', fr: 'Que fais-tu comme travail ?', aide: ['lavoro', 'colleghi', 'compito'] },
      { emoji: '🎧', text: 'Che musica ti piace e perché?', fr: 'Quelle musique aimes-tu et pourquoi ?', aide: ['mi piace', 'ascoltare', 'perché'] },
      { emoji: '🏙️', text: 'Com\'è la tua città?', fr: 'Comment est ta ville ?', aide: ['grande', 'tranquilla', 'c\'è'] },
      { emoji: '🎯', text: 'Cosa vuoi raggiungere quest\'anno?', fr: 'Que veux-tu accomplir cette année ?', aide: ['obiettivo', 'raggiungere', 'spero'] }
    ],
    pt: [
      { emoji: '🌅', text: 'Descreve a tua manhã.', fr: 'Décris ta matinée.', aide: ['levantar-se', 'pequeno-almoço', 'depois'] },
      { emoji: '👋', text: 'Apresenta-te: quem és e onde vives?', fr: 'Présente-toi : qui es-tu et où vis-tu ?', aide: ['chamo-me', 'vivo em', 'trabalho'] },
      { emoji: '🍽️', text: 'Conta o que comeste ontem.', fr: 'Raconte ce que tu as mangé hier.', aide: ['ontem', 'comi', 'saboroso'] },
      { emoji: '✈️', text: 'Onde gostarias de viajar?', fr: 'Où aimerais-tu voyager ?', aide: ['viajar', 'gostaria', 'para o ano'] },
      { emoji: '💼', text: 'Em que trabalhas?', fr: 'Que fais-tu comme travail ?', aide: ['trabalho', 'colegas', 'tarefa'] },
      { emoji: '🎧', text: 'Que música gostas de ouvir e por quê?', fr: 'Quelle musique aimes-tu et pourquoi ?', aide: ['gosto', 'ouvir', 'porque'] },
      { emoji: '🏙️', text: 'Como é a tua cidade?', fr: 'Comment est ta ville ?', aide: ['grande', 'calma', 'há'] },
      { emoji: '🎯', text: 'O que queres alcançar este ano?', fr: 'Que veux-tu accomplir cette année ?', aide: ['objetivo', 'alcançar', 'espero'] }
    ]
  };
})(window);
