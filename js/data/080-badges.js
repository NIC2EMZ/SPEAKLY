/* ==========================================================================
   SPEAKLY — 080-badges.js : les 12 badges de progression
   --------------------------------------------------------------------------
   Cablage : content.js copie SK.BADGES dans SK.CONTENT.badges.
   Contrat  : { id, emoji, title:{fr,en}, text:{fr,en}, rule:{type, n} }
   Types de rule gérés par le moteur de badges (uniquement ceux-là) :
     streak  {n} : n jours consécutifs (au moins)
     missions{n} : n missions terminées
     minutes {n} : n minutes de parole cumulées
     words   {n} : n mots travaillés
     score   {n} : une session avec un score >= n
     early   {n} : une séance terminée avant n heures (n = heure, 8 = 8 h)
   ========================================================================== */
(function () {
  'use strict';

  window.SK = window.SK || {};
  window.SK.BADGES = [
    {
      id: 'premier-pas',
      emoji: '🌱',
      title: { fr: 'Premier pas', en: 'First step' },
      text: {
        fr: 'Tu as terminé ta première mission. Le plus dur est fait !',
        en: 'You finished your first mission. The hardest part is done!'
      },
      rule: { type: 'missions', n: 1 }
    },
    {
      id: 'trois-jours',
      emoji: '🔥',
      title: { fr: 'Trois jours de feu', en: 'Three days on fire' },
      text: {
        fr: 'Trois jours d\'affilée : l\'habitude est lancée.',
        en: 'Three days in a row: the habit has started.'
      },
      rule: { type: 'streak', n: 3 }
    },
    {
      id: 'cinq-missions',
      emoji: '🎯',
      title: { fr: 'Cinq missions', en: 'Five missions' },
      text: {
        fr: 'Cinq missions terminées, ta voix se libère.',
        en: 'Five missions done, your voice is loosening up.'
      },
      rule: { type: 'missions', n: 5 }
    },
    {
      id: 'une-semaine',
      emoji: '📅',
      title: { fr: 'Une semaine pleine', en: 'A full week' },
      text: {
        fr: 'Sept jours de suite ! Ta routine est bien installée.',
        en: 'Seven days in a row! Your routine is firmly in place.'
      },
      rule: { type: 'streak', n: 7 }
    },
    {
      id: 'trente-minutes',
      emoji: '⏱️',
      title: { fr: 'Trente minutes', en: 'Thirty minutes' },
      text: {
        fr: 'Trente minutes de parole enregistrées. Bravo !',
        en: 'Thirty minutes of recorded speech. Well done!'
      },
      rule: { type: 'minutes', n: 30 }
    },
    {
      id: 'quinze-missions',
      emoji: '🏅',
      title: { fr: 'Quinze missions', en: 'Fifteen missions' },
      text: {
        fr: 'Quinze missions : tu ne repars plus de zéro.',
        en: 'Fifteen missions: you no longer start from scratch.'
      },
      rule: { type: 'missions', n: 15 }
    },
    {
      id: 'deux-semaines',
      emoji: '💪',
      title: { fr: 'Deux semaines', en: 'Two weeks' },
      text: {
        fr: 'Quatorze jours de suite, c\'est de la constance.',
        en: 'Fourteen days in a row — that is consistency.'
      },
      rule: { type: 'streak', n: 14 }
    },
    {
      id: 'deux-heures',
      emoji: '🕑',
      title: { fr: 'Deux heures de voix', en: 'Two hours of voice' },
      text: {
        fr: 'Deux heures de pratique : tes progrès s\'entendent.',
        en: 'Two hours of practice: your progress is audible.'
      },
      rule: { type: 'minutes', n: 120 }
    },
    {
      id: 'cinquante-mots',
      emoji: '📚',
      title: { fr: 'Cinquante mots', en: 'Fifty words' },
      text: {
        fr: 'Cinquante mots travaillés, ton vocabulaire grandit.',
        en: 'Fifty words practised, your vocabulary is growing.'
      },
      rule: { type: 'words', n: 50 }
    },
    {
      id: 'score-80',
      emoji: '⭐',
      title: { fr: 'Score 80', en: 'Score 80' },
      text: {
        fr: 'Une session à 80 ou plus : netteté et fluidité.',
        en: 'A session at 80 or above: clarity and fluency.'
      },
      rule: { type: 'score', n: 80 }
    },
    {
      id: 'leve-tot',
      emoji: '🌅',
      title: { fr: 'Lève-tôt', en: 'Early bird' },
      text: {
        fr: 'Une séance avant 8 h : la journée commence en parlant.',
        en: 'A session before 8 am: the day starts with speaking.'
      },
      rule: { type: 'early', n: 8 }
    },
    {
      id: 'trente-jours',
      emoji: '👑',
      title: { fr: 'Un mois entier', en: 'A whole month' },
      text: {
        fr: 'Trente jours de suite, tu fais partie des habitués.',
        en: 'Thirty days in a row — you are one of the regulars.'
      },
      rule: { type: 'streak', n: 30 }
    }
  ];
})();
