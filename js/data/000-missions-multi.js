/* ==========================================================================
   SPEAKLY — 000-missions-multi.js
   Contenu multilingue : 11 missions (window.SK.MISSIONS_EXTRA3)
     - anglais  : 3 missions (A1, A2, A2)
     - espagnol : 3 missions (A1, A2, A2)
     - italien  : 3 missions (A1, A2, A2)
     - portugais: 2 missions (A1, A2)
   Contrat complet : voir js/data/content.js (en-tête).
   Fichier autonome, IIFE, 'use strict', UTF-8, sans dépendance.
   ========================================================================== */
(function (global) {
  'use strict';

  var MISSIONS = [

    /* ================================================================
       ANGLAIS (en)
       ================================================================ */

    /* ---------------------------------------------------------------- en 1 */
    {
      id: 'se-presenter-en',
      lang: 'en',
      level: 'A1',
      order: 1,
      topic: { fr: 'Se présenter' },
      title: { fr: 'Introduce yourself' },
      subtitle: { fr: 'Dis qui tu es en quelques phrases simples.' },
      emoji: '👋',
      minutes: 5,
      situation: { fr: 'Tu rencontres une nouvelle collègue dans un café à Londres : elle te demande qui tu es.' },
      routine: { fr: 'Donne ton prénom, ton pays, ta ville, ton métier et ton âge, avec des phrases très courtes.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'What is your name?' },
          gloss: { fr: 'Comment t\'appelles-tu ?' },
          time: 'à tout moment',
          target: 'What is your name?',
          targetGloss: { fr: 'Comment t\'appelles-tu ?' },
          answerAlt: [
            'My name is Anna.',
            'I am Anna.',
            'You can call me Anna.'
          ],
          answerKeywords: ['name', 'is', 'call'],
          words: [
            { word: 'the name', article: 'the', translation: 'le nom', ipa: 'neɪm', example: 'My name is Anna.' }
          ],
          hint: { fr: '« My name is… » est la formule la plus courante ; « I am… » est plus direct.' },
          example: { fr: 'Hello, my name is Anna. Nice to meet you.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Where are you from?' },
          gloss: { fr: 'D\'où viens-tu ?' },
          time: 'à tout moment',
          target: 'Where are you from?',
          targetGloss: { fr: 'D\'où viens-tu ?' },
          answerAlt: [
            'I am from France.',
            'I come from Paris.',
            'I was born in Lyon.'
          ],
          answerKeywords: ['from', 'come', 'born'],
          words: [
            { word: 'the country', article: 'the', translation: 'le pays', ipa: 'ˈkʌntri', example: 'Which country are you from?' }
          ],
          hint: { fr: '« I am from… » ou « I come from… » + pays ou ville. On ne dit pas « I am of France ».' },
          example: { fr: 'I come from France, but I live in London.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Where do you live?' },
          gloss: { fr: 'Où habites-tu ?' },
          time: 'à tout moment',
          target: 'Where do you live?',
          targetGloss: { fr: 'Où habites-tu ?' },
          answerAlt: [
            'I live in London.',
            'I have lived here for two years.',
            'My flat is in the city centre.'
          ],
          answerKeywords: ['live', 'here', 'flat'],
          words: [
            { word: 'to live', article: '', translation: 'habiter, vivre', ipa: 'lɪv', example: 'I live in London.' },
            { word: 'the city', article: 'the', translation: 'la ville', ipa: 'ˈsɪti', example: 'The city is very lively.' }
          ],
          hint: { fr: 'En anglais, on dit « I live in + ville » : pas de préposition supplémentaire.' },
          example: { fr: 'I live in a small flat in London.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'What do you do for a living?' },
          gloss: { fr: 'Quel est ton métier ?' },
          time: 'à tout moment',
          target: 'What do you do for a living?',
          targetGloss: { fr: 'Quel est ton métier ?' },
          answerAlt: [
            'I work as a teacher.',
            'I am a student.',
            'I work in an office.'
          ],
          answerKeywords: ['work', 'teacher', 'student'],
          words: [
            { word: 'the job', article: 'the', translation: 'le métier, le travail', ipa: 'dʒɒb', example: 'My job is interesting.' }
          ],
          hint: { fr: '« What do you do? » = quel est ton métier ; la réponse commence par « I work as… » ou « I am a… ».' },
          example: { fr: 'I work as a teacher in a primary school.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'How old are you?' },
          gloss: { fr: 'Quel âge as-tu ?' },
          time: 'à tout moment',
          target: 'How old are you?',
          targetGloss: { fr: 'Quel âge as-tu ?' },
          answerAlt: [
            'I am twenty-five years old.',
            'I am thirty.',
            'I will be twenty-six next month.'
          ],
          answerKeywords: ['years', 'old', 'thirty'],
          words: [
            { word: 'the age', article: 'the', translation: 'l\'âge', ipa: 'eɪdʒ', example: 'He is my age.' }
          ],
          hint: { fr: 'L\'âge se dit avec « to be » : I am 25 years old. « I have 25 years » est un calque à éviter.' },
          example: { fr: 'I am twenty-five years old.' }
        }
      ],
      vocabulary: [
        { word: 'the name', article: 'the', translation: 'le nom', ipa: 'neɪm', example: 'My name is Anna.' },
        { word: 'the country', article: 'the', translation: 'le pays', ipa: 'ˈkʌntri', example: 'Which country are you from?' },
        { word: 'the city', article: 'the', translation: 'la ville', ipa: 'ˈsɪti', example: 'London is a big city.' },
        { word: 'the job', article: 'the', translation: 'le métier', ipa: 'dʒɒb', example: 'My job is interesting.' },
        { word: 'the age', article: 'the', translation: 'l\'âge', ipa: 'eɪdʒ', example: 'He is my age.' },
        { word: 'to live', article: '', translation: 'habiter, vivre', ipa: 'lɪv', example: 'I live in London.' },
        { word: 'to work', article: '', translation: 'travailler', ipa: 'wɜːk', example: 'I work in an office.' },
        { word: 'to study', article: '', translation: 'étudier', ipa: 'ˈstʌdi', example: 'I study history at university.' },
        { word: 'the friend', article: 'the', translation: 'l\'ami', ipa: 'frend', example: 'She is a good friend.' },
        { word: 'to meet', article: '', translation: 'rencontrer', ipa: 'miːt', example: 'Nice to meet you.' }
      ],
      tip: { fr: 'En anglais, le « h » de « how » et « hello » est soufflé : [haʊ], [həˈləʊ]. Le « th » de « thirty » se dit [θ], la langue entre les dents.' }
    },

    /* ---------------------------------------------------------------- en 2 */
    {
      id: 'commander-cafe-en',
      lang: 'en',
      level: 'A2',
      order: 2,
      topic: { fr: 'Au café' },
      title: { fr: 'Ordering at a café' },
      subtitle: { fr: 'Commande une boisson et quelque chose à manger.' },
      emoji: '☕',
      minutes: 5,
      situation: { fr: 'Tu entres dans un café à Londres et le serveur vient prendre ta commande.' },
      routine: { fr: 'Salue, commande une boisson, ajoute quelque chose à manger, choisis ta place, puis demande l\'addition.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Good morning! What can I get you?' },
          gloss: { fr: 'Bonjour ! Que puis-je vous servir ?' },
          time: 'le matin',
          target: 'Good morning! What can I get you?',
          targetGloss: { fr: 'Bonjour ! Qu\'est-ce que je vous sers ?' },
          answerAlt: [
            'I would like a coffee, please.',
            'Could I have a tea, please?',
            'A glass of water, please.'
          ],
          answerKeywords: ['like', 'coffee', 'please'],
          words: [
            { word: 'the coffee', article: 'the', translation: 'le café', ipa: 'ˈkɒfi', example: 'I would like a coffee, please.' }
          ],
          hint: { fr: 'Pour commander poliment : « I would like… » ou « Could I have… ? ». « I want » est trop direct.' },
          example: { fr: 'I would like a coffee with milk, please.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Would you like something to eat?' },
          gloss: { fr: 'Voulez-vous quelque chose à manger ?' },
          time: 'le matin',
          target: 'Would you like something to eat?',
          targetGloss: { fr: 'Souhaitez-vous quelque chose à manger ?' },
          answerAlt: [
            'Yes, I would like a piece of cake.',
            'No, thank you, that is all.',
            'Yes, please, a croissant.'
          ],
          answerKeywords: ['like', 'cake', 'thank'],
          words: [
            { word: 'the cake', article: 'the', translation: 'le gâteau', ipa: 'keɪk', example: 'The cake looks delicious.' }
          ],
          hint: { fr: '« something to eat » = quelque chose à manger ; « something to drink » pour une boisson.' },
          example: { fr: 'Yes, I would like a piece of cake, please.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Where would you like to sit?' },
          gloss: { fr: 'Où souhaitez-vous vous asseoir ?' },
          time: 'le matin',
          target: 'Where would you like to sit?',
          targetGloss: { fr: 'Où désirez-vous vous installer ?' },
          answerAlt: [
            'By the window, please.',
            'I would like a table outside.',
            'Anywhere is fine, thank you.'
          ],
          answerKeywords: ['window', 'table', 'outside'],
          words: [
            { word: 'the window', article: 'the', translation: 'la fenêtre', ipa: 'ˈwɪndəʊ', example: 'Could we sit by the window?' }
          ],
          hint: { fr: '« by the window » = près de la fenêtre ; « outside » = dehors.' },
          example: { fr: 'I would like to sit by the window, please.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Are you paying together or separately?' },
          gloss: { fr: 'Vous payez ensemble ou séparément ?' },
          time: 'le matin',
          target: 'Are you paying together or separately?',
          targetGloss: { fr: 'Réglez-vous ensemble ou séparément ?' },
          answerAlt: [
            'Together, please.',
            'Separately, please.',
            'I will pay for everything.'
          ],
          answerKeywords: ['together', 'separately', 'pay'],
          words: [
            { word: 'the bill', article: 'the', translation: 'l\'addition', ipa: 'bɪl', example: 'Could we have the bill, please?' }
          ],
          hint: { fr: '« separately » = séparément, « together » = ensemble.' },
          example: { fr: 'We are paying separately, please.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Anything else?' },
          gloss: { fr: 'Autre chose ?' },
          time: 'le matin',
          target: 'Anything else?',
          targetGloss: { fr: 'Désirez-vous autre chose ?' },
          answerAlt: [
            'No, thank you, that is all.',
            'Yes, another water, please.',
            'Could I have the bill, please?'
          ],
          answerKeywords: ['thank', 'water', 'bill'],
          words: [
            { word: 'the water', article: 'the', translation: 'l\'eau', ipa: 'ˈwɔːtə', example: 'A glass of water, please.' },
            { word: 'to pay', article: '', translation: 'payer', ipa: 'peɪ', example: 'Can I pay by card?' }
          ],
          hint: { fr: 'Pour demander l\'addition : « Could I have the bill, please? » au Royaume-Uni, « the check » aux États-Unis.' },
          example: { fr: 'No, thank you, that is all. Could I have the bill, please?' }
        }
      ],
      vocabulary: [
        { word: 'the coffee', article: 'the', translation: 'le café', ipa: 'ˈkɒfi', example: 'A coffee, please.' },
        { word: 'the tea', article: 'the', translation: 'le thé', ipa: 'tiː', example: 'The tea is very hot.' },
        { word: 'the water', article: 'the', translation: 'l\'eau', ipa: 'ˈwɔːtə', example: 'A glass of water, please.' },
        { word: 'the cake', article: 'the', translation: 'le gâteau', ipa: 'keɪk', example: 'The cake is fresh.' },
        { word: 'the menu', article: 'the', translation: 'le menu', ipa: 'ˈmenjuː', example: 'Could I see the menu, please?' },
        { word: 'to order', article: '', translation: 'commander', ipa: 'ˈɔːdə', example: 'Are you ready to order?' },
        { word: 'the bill', article: 'the', translation: 'l\'addition', ipa: 'bɪl', example: 'The bill, please.' },
        { word: 'to pay', article: '', translation: 'payer', ipa: 'peɪ', example: 'We are paying together.' },
        { word: 'the cup', article: 'the', translation: 'la tasse', ipa: 'kʌp', example: 'A cup of tea, please.' },
        { word: 'the waiter', article: 'the', translation: 'le serveur', ipa: 'ˈweɪtə', example: 'The waiter brought our drinks.' }
      ],
      tip: { fr: 'En anglais britannique, le « r » final ne se prononce pas : « waiter » = [ˈweɪtə]. Le « o » de « coffee » est ouvert et court : [ˈkɒfi].' }
    },

    /* ---------------------------------------------------------------- en 3 */
    {
      id: 'orientation-en',
      lang: 'en',
      level: 'A2',
      order: 3,
      topic: { fr: 'Demander son chemin' },
      title: { fr: 'Asking for directions' },
      subtitle: { fr: 'Demande ton chemin et comprends la réponse.' },
      emoji: '🧭',
      minutes: 5,
      situation: { fr: 'Tu es perdu dans le centre de Manchester et tu arrêtes un passant pour trouver la gare.' },
      routine: { fr: 'Aborde poliment la personne, demande la direction, vérifie la distance, puis reformule l\'itinéraire.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Excuse me, where is the station?' },
          gloss: { fr: 'Excusez-moi, où est la gare ?' },
          time: 'l\'après-midi',
          target: 'Excuse me, where is the station?',
          targetGloss: { fr: 'Excusez-moi, où se trouve la gare ?' },
          answerAlt: [
            'Excuse me, how do I get to the station?',
            'Could you show me the way?',
            'Where can I find the station?'
          ],
          answerKeywords: ['get', 'show', 'way'],
          words: [
            { word: 'the station', article: 'the', translation: 'la gare', ipa: 'ˈsteɪʃn', example: 'The station is ten minutes away.' }
          ],
          hint: { fr: 'Commence toujours par « Excuse me » pour aborder quelqu\'un poliment.' },
          example: { fr: 'Excuse me, how do I get to the station?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Is it far from here?' },
          gloss: { fr: 'Est-ce loin d\'ici ?' },
          time: 'l\'après-midi',
          target: 'Is it far from here?',
          targetGloss: { fr: 'Est-ce loin d\'ici ?' },
          answerAlt: [
            'No, it is quite close.',
            'No, it is only five minutes on foot.',
            'Yes, it is quite far.'
          ],
          answerKeywords: ['close', 'minutes', 'far'],
          words: [
            { word: 'far', article: '', translation: 'loin', ipa: 'fɑː', example: 'It is not far from here.' }
          ],
          hint: { fr: '« on foot » = à pied ; « close » = proche.' },
          example: { fr: 'The market is quite close to here.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'How do I get there?' },
          gloss: { fr: 'Comment y aller ?' },
          time: 'l\'après-midi',
          target: 'How do I get there?',
          targetGloss: { fr: 'Comment puis-je m\'y rendre ?' },
          answerAlt: [
            'Go straight on and then turn left.',
            'You need to turn right.',
            'Walk as far as the traffic lights.'
          ],
          answerKeywords: ['straight', 'turn', 'left'],
          words: [
            { word: 'straight on', article: '', translation: 'tout droit', ipa: 'streɪt ɒn', example: 'Go straight on for two hundred metres.' },
            { word: 'to turn', article: '', translation: 'tourner', ipa: 'tɜːn', example: 'Turn left at the corner.' }
          ],
          hint: { fr: '« Go straight on » = continue tout droit ; « turn left » / « turn right » = tourne à gauche / à droite.' },
          example: { fr: 'Go straight on, then turn left at the lights.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Does a bus go there?' },
          gloss: { fr: 'Y a-t-il un bus pour y aller ?' },
          time: 'l\'après-midi',
          target: 'Does a bus go there?',
          targetGloss: { fr: 'Un bus y va-t-il ?' },
          answerAlt: [
            'Yes, the number ten bus goes there.',
            'No, you will have to walk.',
            'The tram stops right there.'
          ],
          answerKeywords: ['bus', 'walk', 'tram'],
          words: [
            { word: 'the bus stop', article: 'the', translation: 'l\'arrêt de bus', ipa: 'ˈbʌs stɒp', example: 'The bus stop is round the corner.' }
          ],
          hint: { fr: '« Does a bus go there? » = est-ce qu\'un bus y va ? « to walk » = marcher.' },
          example: { fr: 'The number ten bus goes straight to the station.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Where is the nearest bus stop?' },
          gloss: { fr: 'Où est l\'arrêt de bus le plus proche ?' },
          time: 'l\'après-midi',
          target: 'Where is the nearest bus stop?',
          targetGloss: { fr: 'Où se trouve l\'arrêt de bus le plus proche ?' },
          answerAlt: [
            'The bus stop is just round the corner.',
            'It is in front of the pharmacy.',
            'The nearest bus stop is on the market square.'
          ],
          answerKeywords: ['corner', 'pharmacy', 'square'],
          words: [
            { word: 'the corner', article: 'the', translation: 'le coin (de rue)', ipa: 'ˈkɔːnə', example: 'The café is just round the corner.' }
          ],
          hint: { fr: '« round the corner » = au coin de la rue ; « in front of » = devant.' },
          example: { fr: 'The pharmacy is just round the corner.' }
        }
      ],
      vocabulary: [
        { word: 'the station', article: 'the', translation: 'la gare', ipa: 'ˈsteɪʃn', example: 'Where is the station?' },
        { word: 'the street', article: 'the', translation: 'la rue', ipa: 'striːt', example: 'Walk down this street.' },
        { word: 'the traffic lights', article: 'the', translation: 'le feu tricolore', ipa: 'ˈtræfɪk laɪts', example: 'Wait at the traffic lights.' },
        { word: 'to turn', article: '', translation: 'tourner', ipa: 'tɜːn', example: 'Turn left at the corner.' },
        { word: 'straight on', article: '', translation: 'tout droit', ipa: 'streɪt ɒn', example: 'Go straight on.' },
        { word: 'the bus stop', article: 'the', translation: 'l\'arrêt de bus', ipa: 'ˈbʌs stɒp', example: 'The bus stop is over there.' },
        { word: 'the way', article: 'the', translation: 'le chemin', ipa: 'weɪ', example: 'Could you show me the way?' },
        { word: 'the corner', article: 'the', translation: 'le coin', ipa: 'ˈkɔːnə', example: 'It is just round the corner.' },
        { word: 'the map', article: 'the', translation: 'la carte, le plan', ipa: 'mæp', example: 'I am looking at the map.' },
        { word: 'far', article: '', translation: 'loin', ipa: 'fɑː', example: 'Is it far?' }
      ],
      tip: { fr: '« straight » se prononce [streɪt] : le « gh » est muet. Le « a » de « far » est long : [fɑː], tandis que celui de « map » est bref : [mæp].' }
    },

    /* ================================================================
       ESPAGNOL (es)
       ================================================================ */

    /* ---------------------------------------------------------------- es 1 */
    {
      id: 'presentarse-es',
      lang: 'es',
      level: 'A1',
      order: 1,
      topic: { fr: 'Se présenter' },
      title: { fr: 'Presentarse' },
      subtitle: { fr: 'Dis qui tu es en quelques phrases simples.' },
      emoji: '👋',
      minutes: 5,
      situation: { fr: 'Tu rencontres un nouveau voisin dans l\'ascenseur à Madrid : il te demande qui tu es.' },
      routine: { fr: 'Donne ton prénom, ton pays, ta ville, ton métier et ton âge, avec des phrases très courtes.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: '¿Cómo te llamas?' },
          gloss: { fr: 'Comment t\'appelles-tu ?' },
          time: 'à tout moment',
          target: '¿Cómo te llamas?',
          targetGloss: { fr: 'Comment t\'appelles-tu ?' },
          answerAlt: [
            'Me llamo Ana.',
            'Mi nombre es Ana.',
            'Soy Ana.'
          ],
          answerKeywords: ['llamo', 'nombre', 'soy'],
          words: [
            { word: 'llamarse', article: '', translation: 's\'appeler', ipa: 'ʝaˈmaɾse', example: 'Me llamo Ana.' }
          ],
          hint: { fr: '« Me llamo… » est la formule la plus courante ; « Mi nombre es… » est plus formel.' },
          example: { fr: 'Hola, me llamo Ana. ¿Y tú?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: '¿De dónde eres?' },
          gloss: { fr: 'D\'où viens-tu ?' },
          time: 'à tout moment',
          target: '¿De dónde eres?',
          targetGloss: { fr: 'D\'où viens-tu ?' },
          answerAlt: [
            'Soy de Francia.',
            'Soy de París.',
            'Vengo de Lyon.'
          ],
          answerKeywords: ['de', 'eres', 'francia'],
          words: [
            { word: 'ser de', article: '', translation: 'être de (origine)', ipa: 'seɾ ðe', example: 'Soy de Francia.' }
          ],
          hint: { fr: '« Soy de + pays ou ville » : on ne dit pas « Soy de el », mais « Soy del norte » devant un masculin singulier.' },
          example: { fr: 'Soy de Francia, pero vivo en Madrid.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: '¿Dónde vives?' },
          gloss: { fr: 'Où habites-tu ?' },
          time: 'à tout moment',
          target: '¿Dónde vives?',
          targetGloss: { fr: 'Où habites-tu ?' },
          answerAlt: [
            'Vivo en Madrid.',
            'Vivo en el centro.',
            'Tengo un piso en Madrid.'
          ],
          answerKeywords: ['vivo', 'en', 'piso'],
          words: [
            { word: 'vivir', article: '', translation: 'habiter, vivre', ipa: 'biˈβiɾ', example: 'Vivo en Madrid.' },
            { word: 'piso', article: 'el', translation: 'l\'appartement', ipa: 'ˈpiso', example: 'Mi piso es pequeño.' }
          ],
          hint: { fr: '« vivir en » + lieu : vivo en Madrid. « piso » désigne l\'appartement en Espagne.' },
          example: { fr: 'Vivo en un piso pequeño en el centro.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: '¿A qué te dedicas?' },
          gloss: { fr: 'Que fais-tu comme métier ?' },
          time: 'à tout moment',
          target: '¿A qué te dedicas?',
          targetGloss: { fr: 'Quel est ton métier ?' },
          answerAlt: [
            'Trabajo como profesora.',
            'Soy estudiante.',
            'Trabajo en una oficina.'
          ],
          answerKeywords: ['trabajo', 'profesora', 'estudiante'],
          words: [
            { word: 'trabajar', article: '', translation: 'travailler', ipa: 'tɾaβaˈxaɾ', example: 'Trabajo en una oficina.' }
          ],
          hint: { fr: '« ¿A qué te dedicas? » est la question la plus naturelle ; « ¿Cuál es tu profesión? » est plus formel.' },
          example: { fr: 'Trabajo como profesora en un colegio.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: '¿Cuántos años tienes?' },
          gloss: { fr: 'Quel âge as-tu ?' },
          time: 'à tout moment',
          target: '¿Cuántos años tienes?',
          targetGloss: { fr: 'Quel âge as-tu ?' },
          answerAlt: [
            'Tengo veinticinco años.',
            'Tengo treinta años.',
            'Cumplo veintiséis años en mayo.'
          ],
          answerKeywords: ['tengo', 'años', 'veinticinco'],
          words: [
            { word: 'el año', article: 'el', translation: 'l\'année', ipa: 'ˈaɲo', example: 'Tengo veinticinco años.' }
          ],
          hint: { fr: 'En espagnol, l\'âge se dit avec « tener » : tengo 25 años, jamais « soy 25 años ».' },
          example: { fr: 'Tengo veinticinco años.' }
        }
      ],
      vocabulary: [
        { word: 'llamarse', article: '', translation: 's\'appeler', ipa: 'ʝaˈmaɾse', example: 'Me llamo Ana.' },
        { word: 'el nombre', article: 'el', translation: 'le nom', ipa: 'ˈnombɾe', example: 'Mi nombre es Ana.' },
        { word: 'vivir', article: '', translation: 'habiter, vivre', ipa: 'biˈβiɾ', example: 'Vivo en Madrid.' },
        { word: 'el país', article: 'el', translation: 'le pays', ipa: 'paˈis', example: '¿De qué país eres?' },
        { word: 'la ciudad', article: 'la', translation: 'la ville', ipa: 'θjuˈðað', example: 'Madrid es una ciudad muy grande.' },
        { word: 'el trabajo', article: 'el', translation: 'le travail', ipa: 'tɾaˈβaxo', example: 'Mi trabajo es interesante.' },
        { word: 'la edad', article: 'la', translation: 'l\'âge', ipa: 'eˈðað', example: 'Tiene la misma edad que yo.' },
        { word: 'el amigo', article: 'el', translation: 'l\'ami', ipa: 'aˈmiɣo', example: 'Es un buen amigo.' },
        { word: 'la lengua', article: 'la', translation: 'la langue', ipa: 'ˈleŋɡwa', example: 'Estudio la lengua española.' },
        { word: 'estudiar', article: '', translation: 'étudier', ipa: 'estuˈðjaɾ', example: 'Estudio historia en la universidad.' }
      ],
      tip: { fr: 'En espagnol, le « v » se prononce comme un « b » doux : « vivir » = [biˈβiɾ]. Le « ll » de « llamo » se dit [ʝ], proche d\'un « y ».' }
    },

    /* ---------------------------------------------------------------- es 2 */
    {
      id: 'pedir-tapas-es',
      lang: 'es',
      level: 'A2',
      order: 2,
      topic: { fr: 'Au bar à tapas' },
      title: { fr: 'Pedir tapas' },
      subtitle: { fr: 'Commande des tapas et une boisson au bar.' },
      emoji: '🥘',
      minutes: 5,
      situation: { fr: 'Tu es dans un bar à tapas à Séville et le serveur vient prendre ta commande.' },
      routine: { fr: 'Salue, commande une boisson, ajoute une tapa, choisis le dessert puis demande l\'addition.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: '¡Buenas tardes! ¿Qué le pongo?' },
          gloss: { fr: 'Bonjour ! Qu\'est-ce que je vous sers ?' },
          time: 'le midi',
          target: '¡Buenas tardes! ¿Qué le pongo?',
          targetGloss: { fr: 'Bonjour ! Que vous mets-je ?' },
          answerAlt: [
            'Me pone una caña, por favor.',
            'Quiero un vino tinto, por favor.',
            'Póngame una ración de jamón, por favor.'
          ],
          answerKeywords: ['pone', 'vino', 'ración'],
          words: [
            { word: 'la caña', article: 'la', translation: 'le demi de bière', ipa: 'ˈkaɲa', example: 'Una caña, por favor.' }
          ],
          hint: { fr: '« ¿Qué le pongo? » est la formule type du serveur ; « Me pone… » signifie « vous me mettez… ».' },
          example: { fr: 'Me pone una caña, por favor.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: '¿Algo para picar?' },
          gloss: { fr: 'Quelque chose à grignoter ?' },
          time: 'le midi',
          target: '¿Algo para picar?',
          targetGloss: { fr: 'Quelque chose à grignoter ?' },
          answerAlt: [
            'Sí, una ración de aceitunas.',
            'No, gracias, solo la bebida.',
            'Sí, unas patatas bravas.'
          ],
          answerKeywords: ['ración', 'aceitunas', 'gracias'],
          words: [
            { word: 'la aceituna', article: 'la', translation: 'l\'olive', ipa: 'aθeˈtuna', example: 'Me encantan las aceitunas.' }
          ],
          hint: { fr: '« picar » = grignoter ; « una ración » = une portion à partager.' },
          example: { fr: 'Sí, una ración de aceitunas, por favor.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: '¿Y para beber?' },
          gloss: { fr: 'Et pour boire ?' },
          time: 'le midi',
          target: '¿Y para beber?',
          targetGloss: { fr: 'Et qu\'allez-vous boire ?' },
          answerAlt: [
            'Un agua con gas, por favor.',
            'Una cerveza, por favor.',
            'Solo agua del grifo, gracias.'
          ],
          answerKeywords: ['agua', 'cerveza', 'grifo'],
          words: [
            { word: 'la cerveza', article: 'la', translation: 'la bière', ipa: 'θeɾˈβeθa', example: 'Una cerveza, por favor.' },
            { word: 'el agua', article: 'el', translation: 'l\'eau', ipa: 'ˈaɣwa', example: 'Un agua sin gas, por favor.' }
          ],
          hint: { fr: '« agua » est féminin mais prend « el » : el agua, un agua. « del grifo » = du robinet.' },
          example: { fr: 'Un agua con gas, por favor.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: '¿Quiere algo de postre?' },
          gloss: { fr: 'Voulez-vous un dessert ?' },
          time: 'le midi',
          target: '¿Quiere algo de postre?',
          targetGloss: { fr: 'Désirez-vous un dessert ?' },
          answerAlt: [
            'No, gracias, la cuenta, por favor.',
            'Sí, un flan, por favor.',
            'Solo un café, gracias.'
          ],
          answerKeywords: ['cuenta', 'flan', 'café'],
          words: [
            { word: 'el postre', article: 'el', translation: 'le dessert', ipa: 'ˈpostɾe', example: '¿Qué postre me recomienda?' }
          ],
          hint: { fr: '« la cuenta, por favor » = l\'addition, s\'il vous plaît. « postre » = dessert.' },
          example: { fr: 'No, gracias. La cuenta, por favor.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: '¿Quiere que le traiga la cuenta?' },
          gloss: { fr: 'Voulez-vous que je vous apporte l\'addition ?' },
          time: 'le midi',
          target: '¿Quiere que le traiga la cuenta?',
          targetGloss: { fr: 'Souhaitez-vous que je vous apporte l\'addition ?' },
          answerAlt: [
            'Sí, la cuenta, por favor.',
            'No, todavía no.',
            '¿Podemos pagar con tarjeta?'
          ],
          answerKeywords: ['cuenta', 'todavía', 'tarjeta'],
          words: [
            { word: 'la cuenta', article: 'la', translation: 'l\'addition', ipa: 'ˈkwenta', example: 'La cuenta, por favor.' },
            { word: 'pagar', article: '', translation: 'payer', ipa: 'paˈɣaɾ', example: '¿Podemos pagar con tarjeta?' }
          ],
          hint: { fr: 'En Espagne, on demande « la cuenta » à la fin du repas ; le pourboire est souvent déjà compris.' },
          example: { fr: '¿Podemos pagar con tarjeta?' }
        }
      ],
      vocabulary: [
        { word: 'la tapa', article: 'la', translation: 'la tapa', ipa: 'ˈtapa', example: 'Vamos a tomar unas tapas.' },
        { word: 'la ración', article: 'la', translation: 'la portion', ipa: 'raˈθjon', example: 'Una ración de jamón, por favor.' },
        { word: 'la caña', article: 'la', translation: 'le demi de bière', ipa: 'ˈkaɲa', example: 'Una caña, por favor.' },
        { word: 'el vino', article: 'el', translation: 'le vin', ipa: 'ˈbino', example: 'Un vino tinto, por favor.' },
        { word: 'la aceituna', article: 'la', translation: 'l\'olive', ipa: 'aθeˈtuna', example: 'Las aceitunas están muy ricas.' },
        { word: 'la cerveza', article: 'la', translation: 'la bière', ipa: 'θeɾˈβeθa', example: 'La cerveza está fría.' },
        { word: 'el postre', article: 'el', translation: 'le dessert', ipa: 'ˈpostɾe', example: 'El postre es casero.' },
        { word: 'la cuenta', article: 'la', translation: 'l\'addition', ipa: 'ˈkwenta', example: 'La cuenta, por favor.' },
        { word: 'pagar', article: '', translation: 'payer', ipa: 'paˈɣaɾ', example: 'Pago con tarjeta.' },
        { word: 'el camarero', article: 'el', translation: 'le serveur', ipa: 'kamaˈɾeɾo', example: 'El camarero trae las bebidas.' }
      ],
      tip: { fr: 'En Espagne, « c » devant e ou i et « z » se prononcent [θ] : « cerveza » = [θeɾˈβeθa]. Le « ñ » de « caña » se dit [ɲ], comme « gn » français.' }
    },

    /* ---------------------------------------------------------------- es 3 */
    {
      id: 'preguntar-camino-es',
      lang: 'es',
      level: 'A2',
      order: 3,
      topic: { fr: 'Demander son chemin' },
      title: { fr: 'Preguntar el camino' },
      subtitle: { fr: 'Demande ton chemin et comprends la réponse.' },
      emoji: '🧭',
      minutes: 5,
      situation: { fr: 'Tu es perdu dans le centre de Séville et tu arrêtes un passant pour trouver la gare.' },
      routine: { fr: 'Aborde poliment la personne, demande la direction, vérifie la distance, puis reformule l\'itinéraire.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Perdone, ¿dónde está la estación?' },
          gloss: { fr: 'Excusez-moi, où est la gare ?' },
          time: 'l\'après-midi',
          target: 'Perdone, ¿dónde está la estación?',
          targetGloss: { fr: 'Excusez-moi, où se trouve la gare ?' },
          answerAlt: [
            'Perdone, ¿cómo llego a la estación?',
            '¿Me puede indicar el camino?',
            '¿Sabe dónde está la estación?'
          ],
          answerKeywords: ['llego', 'indicar', 'camino'],
          words: [
            { word: 'la estación', article: 'la', translation: 'la gare', ipa: 'estaˈθjon', example: 'La estación está muy cerca.' }
          ],
          hint: { fr: 'Commence par « Perdone » ou « Disculpe » pour aborder quelqu\'un poliment.' },
          example: { fr: 'Perdone, ¿cómo llego a la estación?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: '¿Está lejos de aquí?' },
          gloss: { fr: 'Est-ce loin d\'ici ?' },
          time: 'l\'après-midi',
          target: '¿Está lejos de aquí?',
          targetGloss: { fr: 'Est-ce loin d\'ici ?' },
          answerAlt: [
            'No, está muy cerca.',
            'No, solo cinco minutos andando.',
            'Sí, está bastante lejos.'
          ],
          answerKeywords: ['cerca', 'minutos', 'lejos'],
          words: [
            { word: 'lejos', article: '', translation: 'loin', ipa: 'ˈlexos', example: 'No está lejos de aquí.' }
          ],
          hint: { fr: '« cerca » = près, « lejos » = loin, « andando » = à pied.' },
          example: { fr: 'El mercado está muy cerca de aquí.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: '¿Cómo puedo llegar?' },
          gloss: { fr: 'Comment puis-je y aller ?' },
          time: 'l\'après-midi',
          target: '¿Cómo puedo llegar?',
          targetGloss: { fr: 'Comment puis-je me rendre là-bas ?' },
          answerAlt: [
            'Sigue todo recto y luego gira a la izquierda.',
            'Tienes que girar a la derecha.',
            'Camina hasta el semáforo.'
          ],
          answerKeywords: ['recto', 'izquierda', 'girar'],
          words: [
            { word: 'todo recto', article: '', translation: 'tout droit', ipa: 'ˈtoðo ˈrekto', example: 'Sigue todo recto doscientos metros.' },
            { word: 'girar', article: '', translation: 'tourner', ipa: 'xiˈɾaɾ', example: 'Gira a la derecha en la esquina.' }
          ],
          hint: { fr: '« todo recto » = tout droit ; « girar a la izquierda » / « a la derecha » = tourner à gauche / à droite.' },
          example: { fr: 'Sigue todo recto y gira a la izquierda en el semáforo.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: '¿Hay un autobús que vaya allí?' },
          gloss: { fr: 'Y a-t-il un bus pour y aller ?' },
          time: 'l\'après-midi',
          target: '¿Hay un autobús que vaya allí?',
          targetGloss: { fr: 'Existe-t-il un bus qui aille là-bas ?' },
          answerAlt: [
            'Sí, el autobús número diez va allí.',
            'No, tendrás que ir andando.',
            'El tranvía para justo allí.'
          ],
          answerKeywords: ['autobús', 'andando', 'tranvía'],
          words: [
            { word: 'la parada', article: 'la', translation: 'l\'arrêt', ipa: 'paˈɾaða', example: 'La parada está a la vuelta de la esquina.' },
            { word: 'el autobús', article: 'el', translation: 'le bus', ipa: 'awtoˈβus', example: 'El autobús número diez va al centro.' }
          ],
          hint: { fr: '« ¿Hay…? » = y a-t-il… ? La réponse commence souvent par « Sí, hay… » ou « No, no hay… ».' },
          example: { fr: '¿Hay un autobús que vaya a la estación?' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: '¿Dónde está la parada más cercana?' },
          gloss: { fr: 'Où est l\'arrêt le plus proche ?' },
          time: 'l\'après-midi',
          target: '¿Dónde está la parada más cercana?',
          targetGloss: { fr: 'Où se trouve l\'arrêt le plus proche ?' },
          answerAlt: [
            'Está a la vuelta de la esquina.',
            'Está delante de la farmacia.',
            'La parada más cercana está en la plaza.'
          ],
          answerKeywords: ['vuelta', 'farmacia', 'plaza'],
          words: [
            { word: 'la esquina', article: 'la', translation: 'le coin (de rue)', ipa: 'esˈkina', example: 'El café está a la vuelta de la esquina.' }
          ],
          hint: { fr: '« a la vuelta de la esquina » = au coin de la rue ; « delante de » = devant.' },
          example: { fr: 'La farmacia está a la vuelta de la esquina.' }
        }
      ],
      vocabulary: [
        { word: 'la estación', article: 'la', translation: 'la gare', ipa: 'estaˈθjon', example: '¿Dónde está la estación?' },
        { word: 'la calle', article: 'la', translation: 'la rue', ipa: 'ˈkaʝe', example: 'Camina por esta calle.' },
        { word: 'el semáforo', article: 'el', translation: 'le feu tricolore', ipa: 'seˈmafoɾo', example: 'Espera en el semáforo.' },
        { word: 'girar', article: '', translation: 'tourner', ipa: 'xiˈɾaɾ', example: 'Gira a la izquierda.' },
        { word: 'todo recto', article: '', translation: 'tout droit', ipa: 'ˈtoðo ˈrekto', example: 'Sigue todo recto.' },
        { word: 'la parada', article: 'la', translation: 'l\'arrêt', ipa: 'paˈɾaða', example: 'La parada está allí.' },
        { word: 'el camino', article: 'el', translation: 'le chemin', ipa: 'kaˈmino', example: '¿Me puede indicar el camino?' },
        { word: 'la esquina', article: 'la', translation: 'le coin', ipa: 'esˈkina', example: 'Está a la vuelta de la esquina.' },
        { word: 'el plano', article: 'el', translation: 'le plan (de ville)', ipa: 'ˈplano', example: 'Miro el plano de la ciudad.' },
        { word: 'lejos', article: '', translation: 'loin', ipa: 'ˈlexos', example: '¿Está lejos?' }
      ],
      tip: { fr: 'En espagnol, le « j » de « lejos » se prononce [x], un son raclé proche du « ch » allemand. Le « ll » de « calle » se dit [ʝ] et le « v » de « vivo » sonne comme un « b » doux.' }
    },

    /* ================================================================
       ITALIEN (it)
       ================================================================ */

    /* ---------------------------------------------------------------- it 1 */
    {
      id: 'presentarsi-it',
      lang: 'it',
      level: 'A1',
      order: 1,
      topic: { fr: 'Se présenter' },
      title: { fr: 'Presentarsi' },
      subtitle: { fr: 'Dis qui tu es en quelques phrases simples.' },
      emoji: '👋',
      minutes: 5,
      situation: { fr: 'Tu rencontres un nouveau voisin dans l\'ascenseur à Milan : il te demande qui tu es.' },
      routine: { fr: 'Donne ton prénom, ton pays, ta ville, ton métier et ton âge, avec des phrases très courtes.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Come ti chiami?' },
          gloss: { fr: 'Comment t\'appelles-tu ?' },
          time: 'à tout moment',
          target: 'Come ti chiami?',
          targetGloss: { fr: 'Comment t\'appelles-tu ?' },
          answerAlt: [
            'Mi chiamo Anna.',
            'Il mio nome è Anna.',
            'Sono Anna.'
          ],
          answerKeywords: ['chiamo', 'nome', 'mio'],
          words: [
            { word: 'chiamarsi', article: '', translation: 's\'appeler', ipa: 'kjaˈmarsi', example: 'Mi chiamo Anna.' }
          ],
          hint: { fr: '« Mi chiamo… » est la formule la plus courante ; « Il mio nome è… » est plus formel.' },
          example: { fr: 'Ciao, mi chiamo Anna. E tu?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Di dove sei?' },
          gloss: { fr: 'D\'où viens-tu ?' },
          time: 'à tout moment',
          target: 'Di dove sei?',
          targetGloss: { fr: 'D\'où viens-tu ?' },
          answerAlt: [
            'Sono di Milano.',
            'Sono italiana.',
            'Vengo da Roma.'
          ],
          answerKeywords: ['di', 'italiana', 'vengo'],
          words: [
            { word: 'essere di', article: '', translation: 'être de (origine)', ipa: 'ˈɛssere di', example: 'Sono di Milano.' }
          ],
          hint: { fr: 'Pour l\'origine on dit « Sono di Milano », jamais « Sono da Milano ».' },
          example: { fr: 'Sono di Milano, ma vivo a Torino.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Dove abiti?' },
          gloss: { fr: 'Où habites-tu ?' },
          time: 'à tout moment',
          target: 'Dove abiti?',
          targetGloss: { fr: 'Où habites-tu ?' },
          answerAlt: [
            'Abito a Milano.',
            'Vivo in centro.',
            'Ho un appartamento in centro.'
          ],
          answerKeywords: ['abito', 'centro', 'appartamento'],
          words: [
            { word: 'abitare', article: '', translation: 'habiter', ipa: 'abiˈtare', example: 'Abito a Milano.' },
            { word: 'la casa', article: 'la', translation: 'la maison, le logement', ipa: 'ˈkaza', example: 'La mia casa è in centro.' }
          ],
          hint: { fr: '« abitare » et « vivere » s\'emploient tous les deux pour le logement : abito a Milano, vivo in centro.' },
          example: { fr: 'Abito in un piccolo appartamento in centro.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Che lavoro fai?' },
          gloss: { fr: 'Quel est ton métier ?' },
          time: 'à tout moment',
          target: 'Che lavoro fai?',
          targetGloss: { fr: 'Quel métier exerces-tu ?' },
          answerAlt: [
            'Faccio l\'insegnante.',
            'Sono studente.',
            'Lavoro in un ufficio.'
          ],
          answerKeywords: ['faccio', 'studente', 'ufficio'],
          words: [
            { word: 'lavorare', article: '', translation: 'travailler', ipa: 'lavoˈrare', example: 'Lavoro in un ufficio.' }
          ],
          hint: { fr: '« Che lavoro fai? » est la question naturelle ; « Faccio l\'insegnante » = je suis enseignant.' },
          example: { fr: 'Faccio l\'insegnante in una scuola primaria.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Quanti anni hai?' },
          gloss: { fr: 'Quel âge as-tu ?' },
          time: 'à tout moment',
          target: 'Quanti anni hai?',
          targetGloss: { fr: 'Quel âge as-tu ?' },
          answerAlt: [
            'Ho venticinque anni.',
            'Ho trent\'anni.',
            'Compio ventisei anni a maggio.'
          ],
          answerKeywords: ['ho', 'anni', 'venticinque'],
          words: [
            { word: 'il compleanno', article: 'il', translation: 'l\'anniversaire', ipa: 'kompleˈanno', example: 'Il mio compleanno è a maggio.' }
          ],
          hint: { fr: 'L\'âge se dit avec « avere » : ho 25 anni, jamais « sono 25 anni ».' },
          example: { fr: 'Ho venticinque anni.' }
        }
      ],
      vocabulary: [
        { word: 'chiamarsi', article: '', translation: 's\'appeler', ipa: 'kjaˈmarsi', example: 'Mi chiamo Anna.' },
        { word: 'il nome', article: 'il', translation: 'le nom', ipa: 'ˈnome', example: 'Il mio nome è Anna.' },
        { word: 'abitare', article: '', translation: 'habiter', ipa: 'abiˈtare', example: 'Abito a Milano.' },
        { word: 'la casa', article: 'la', translation: 'la maison', ipa: 'ˈkaza', example: 'La mia casa è piccola.' },
        { word: 'il paese', article: 'il', translation: 'le pays, le village', ipa: 'paˈeze', example: 'Di quale paese sei?' },
        { word: 'la città', article: 'la', translation: 'la ville', ipa: 'tʃitˈta', example: 'Milano è una città grande.' },
        { word: 'il lavoro', article: 'il', translation: 'le travail', ipa: 'laˈvoro', example: 'Il mio lavoro è interessante.' },
        { word: 'il compleanno', article: 'il', translation: 'l\'anniversaire', ipa: 'kompleˈanno', example: 'Il mio compleanno è a maggio.' },
        { word: 'la lingua', article: 'la', translation: 'la langue', ipa: 'ˈliŋɡwa', example: 'Studio la lingua italiana.' },
        { word: 'studiare', article: '', translation: 'étudier', ipa: 'stuˈdjare', example: 'Studio storia all\'università.' }
      ],
      tip: { fr: 'En italien, « ch » de « chiamo » se prononce [k] : [kjaˈmarsi]. Les consonnes doubles se tiennent vraiment : « anno » = [ˈanno], « compleanno » = [kompleˈanno].' }
    },

    /* ---------------------------------------------------------------- it 2 */
    {
      id: 'ordinare-bar-it',
      lang: 'it',
      level: 'A2',
      order: 2,
      topic: { fr: 'Au bar' },
      title: { fr: 'Ordinare al bar' },
      subtitle: { fr: 'Commande un café et quelque chose à manger.' },
      emoji: '☕',
      minutes: 5,
      situation: { fr: 'Tu entres dans un bar à Rome et le serveur vient prendre ta commande.' },
      routine: { fr: 'Salue, commande une boisson, ajoute quelque chose à manger, choisis ta place, puis demande l\'addition.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Buongiorno! Cosa desidera?' },
          gloss: { fr: 'Bonjour ! Que désirez-vous ?' },
          time: 'le matin',
          target: 'Buongiorno! Cosa desidera?',
          targetGloss: { fr: 'Bonjour ! Que souhaitez-vous ?' },
          answerAlt: [
            'Vorrei un caffè, per favore.',
            'Prendo un cappuccino, grazie.',
            'Un bicchiere d\'acqua, per favore.'
          ],
          answerKeywords: ['vorrei', 'caffè', 'per'],
          words: [
            { word: 'il caffè', article: 'il', translation: 'le café (expresso)', ipa: 'kafˈfɛ', example: 'Vorrei un caffè, per favore.' }
          ],
          hint: { fr: '« Vorrei… » est la façon polie de commander, plus douce que « Voglio… ».' },
          example: { fr: 'Vorrei un caffè, per favore.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Desidera qualcosa da mangiare?' },
          gloss: { fr: 'Désirez-vous quelque chose à manger ?' },
          time: 'le matin',
          target: 'Desidera qualcosa da mangiare?',
          targetGloss: { fr: 'Souhaitez-vous quelque chose à manger ?' },
          answerAlt: [
            'Sì, vorrei un panino.',
            'No, grazie, solo il caffè.',
            'Sì, un cornetto, per favore.'
          ],
          answerKeywords: ['panino', 'grazie', 'cornetto'],
          words: [
            { word: 'il panino', article: 'il', translation: 'le sandwich', ipa: 'paˈniːno', example: 'Prendo un panino al prosciutto.' }
          ],
          hint: { fr: '« un panino » = un sandwich ; « un cornetto » = un croissant.' },
          example: { fr: 'Sì, vorrei un panino, per favore.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Dove preferisce sedersi?' },
          gloss: { fr: 'Où préférez-vous vous asseoir ?' },
          time: 'le matin',
          target: 'Dove preferisce sedersi?',
          targetGloss: { fr: 'Où souhaitez-vous vous installer ?' },
          answerAlt: [
            'Al tavolo vicino alla finestra.',
            'Fuori, se possibile.',
            'Va bene qualsiasi tavolo.'
          ],
          answerKeywords: ['tavolo', 'finestra', 'fuori'],
          words: [
            { word: 'la finestra', article: 'la', translation: 'la fenêtre', ipa: 'fiˈnɛstra', example: 'Vorrei un tavolo vicino alla finestra.' }
          ],
          hint: { fr: '« vicino a » = près de ; « fuori » = dehors.' },
          example: { fr: 'Preferisco il tavolo vicino alla finestra.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Paga insieme o separatamente?' },
          gloss: { fr: 'Vous payez ensemble ou séparément ?' },
          time: 'le matin',
          target: 'Paga insieme o separatamente?',
          targetGloss: { fr: 'Réglez-vous ensemble ou séparément ?' },
          answerAlt: [
            'Insieme, per favore.',
            'Separatamente, per favore.',
            'Pago io per tutti.'
          ],
          answerKeywords: ['insieme', 'separatamente', 'pago'],
          words: [
            { word: 'il conto', article: 'il', translation: 'l\'addition', ipa: 'ˈkonto', example: 'Il conto, per favore.' }
          ],
          hint: { fr: '« separatamente » = séparément ; « insieme » = ensemble.' },
          example: { fr: 'Paghiamo separatamente, per favore.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Desidera altro?' },
          gloss: { fr: 'Désirez-vous autre chose ?' },
          time: 'le matin',
          target: 'Desidera altro?',
          targetGloss: { fr: 'Voulez-vous autre chose ?' },
          answerAlt: [
            'No, grazie, è tutto.',
            'Sì, ancora un caffè, per favore.',
            'Il conto, per favore.'
          ],
          answerKeywords: ['grazie', 'ancora', 'conto'],
          words: [
            { word: 'pagare', article: '', translation: 'payer', ipa: 'paˈɡare', example: 'Posso pagare con la carta?' }
          ],
          hint: { fr: 'Pour demander l\'addition, dis simplement : « Il conto, per favore. »' },
          example: { fr: 'No, grazie, è tutto. Il conto, per favore.' }
        }
      ],
      vocabulary: [
        { word: 'il caffè', article: 'il', translation: 'le café (expresso)', ipa: 'kafˈfɛ', example: 'Un caffè, per favore.' },
        { word: 'il cappuccino', article: 'il', translation: 'le cappuccino', ipa: 'kapputˈtʃiːno', example: 'Un cappuccino, per favore.' },
        { word: 'il panino', article: 'il', translation: 'le sandwich', ipa: 'paˈniːno', example: 'Il panino è appena fatto.' },
        { word: 'il cornetto', article: 'il', translation: 'le croissant', ipa: 'korˈnetto', example: 'Il cornetto è appena sfornato.' },
        { word: 'il tavolo', article: 'il', translation: 'la table', ipa: 'ˈtavolo', example: 'Il tavolo è libero.' },
        { word: 'il conto', article: 'il', translation: 'l\'addition', ipa: 'ˈkonto', example: 'Il conto, per favore.' },
        { word: 'pagare', article: '', translation: 'payer', ipa: 'paˈɡare', example: 'Pago con la carta.' },
        { word: 'la tazza', article: 'la', translation: 'la tasse', ipa: 'ˈtattsa', example: 'Una tazza di tè, per favore.' },
        { word: 'il cameriere', article: 'il', translation: 'le serveur', ipa: 'kameˈrjɛre', example: 'Il cameriere arriva subito.' },
        { word: 'il menù', article: 'il', translation: 'le menu', ipa: 'meˈnu', example: 'Posso vedere il menù?' }
      ],
      tip: { fr: 'Le « cc » de « cappuccino » se prononce [ttʃ] : [kapputˈtʃiːno]. Le « è » final de « caffè » est ouvert : [kafˈfɛ]. En italien, toutes les lettres se prononcent.' }
    },

    /* ---------------------------------------------------------------- it 3 */
    {
      id: 'chiedere-strada-it',
      lang: 'it',
      level: 'A2',
      order: 3,
      topic: { fr: 'Demander son chemin' },
      title: { fr: 'Chiedere la strada' },
      subtitle: { fr: 'Demande ton chemin et comprends la réponse.' },
      emoji: '🧭',
      minutes: 5,
      situation: { fr: 'Tu es perdu dans le centre de Rome et tu arrêtes un passant pour trouver la gare.' },
      routine: { fr: 'Aborde poliment la personne, demande la direction, vérifie la distance, puis reformule l\'itinéraire.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Mi scusi, dov\'è la stazione?' },
          gloss: { fr: 'Excusez-moi, où est la gare ?' },
          time: 'l\'après-midi',
          target: 'Mi scusi, dov\'è la stazione?',
          targetGloss: { fr: 'Excusez-moi, où se trouve la gare ?' },
          answerAlt: [
            'Mi scusi, come arrivo alla stazione?',
            'Può indicarmi la strada?',
            'Sa dov\'è la stazione?'
          ],
          answerKeywords: ['arrivo', 'indicarmi', 'strada'],
          words: [
            { word: 'la stazione', article: 'la', translation: 'la gare', ipa: 'statˈtsjone', example: 'La stazione è vicina.' }
          ],
          hint: { fr: 'Commence par « Mi scusi » pour aborder quelqu\'un poliment.' },
          example: { fr: 'Mi scusi, come arrivo alla stazione?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'È lontano da qui?' },
          gloss: { fr: 'Est-ce loin d\'ici ?' },
          time: 'l\'après-midi',
          target: 'È lontano da qui?',
          targetGloss: { fr: 'Est-ce loin d\'ici ?' },
          answerAlt: [
            'No, è molto vicino.',
            'No, solo cinque minuti a piedi.',
            'Sì, è piuttosto lontano.'
          ],
          answerKeywords: ['vicino', 'minuti', 'piedi'],
          words: [
            { word: 'lontano', article: '', translation: 'loin', ipa: 'lonˈtano', example: 'Non è lontano da qui.' }
          ],
          hint: { fr: '« vicino » = près, « lontano » = loin, « a piedi » = à pied.' },
          example: { fr: 'Il mercato è molto vicino.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Come ci arrivo?' },
          gloss: { fr: 'Comment y aller ?' },
          time: 'l\'après-midi',
          target: 'Come ci arrivo?',
          targetGloss: { fr: 'Comment puis-je m\'y rendre ?' },
          answerAlt: [
            'Vada sempre dritto e poi giri a sinistra.',
            'Deve girare a destra.',
            'Cammini fino al semaforo.'
          ],
          answerKeywords: ['dritto', 'sinistra', 'destra'],
          words: [
            { word: 'dritto', article: '', translation: 'tout droit', ipa: 'ˈdritto', example: 'Vada sempre dritto.' },
            { word: 'girare', article: '', translation: 'tourner', ipa: 'dʒiˈrare', example: 'Giri a destra al semaforo.' }
          ],
          hint: { fr: '« sempre dritto » = tout droit ; « girare a sinistra » / « a destra » = tourner à gauche / à droite.' },
          example: { fr: 'Vada sempre dritto e giri a sinistra.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'C\'è un autobus che va lì?' },
          gloss: { fr: 'Y a-t-il un bus pour y aller ?' },
          time: 'l\'après-midi',
          target: 'C\'è un autobus che va lì?',
          targetGloss: { fr: 'Y a-t-il un bus qui va là-bas ?' },
          answerAlt: [
            'Sì, il numero dieci va lì.',
            'No, deve andare a piedi.',
            'Il tram si ferma proprio lì.'
          ],
          answerKeywords: ['autobus', 'piedi', 'tram'],
          words: [
            { word: 'la fermata', article: 'la', translation: 'l\'arrêt', ipa: 'ferˈmata', example: 'La fermata è dietro l\'angolo.' }
          ],
          hint: { fr: '« C\'è…? » = y a-t-il… ? « a piedi » = à pied.' },
          example: { fr: 'C\'è un autobus che va alla stazione?' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Dov\'è la fermata più vicina?' },
          gloss: { fr: 'Où est l\'arrêt le plus proche ?' },
          time: 'l\'après-midi',
          target: 'Dov\'è la fermata più vicina?',
          targetGloss: { fr: 'Où se trouve l\'arrêt le plus proche ?' },
          answerAlt: [
            'È dietro l\'angolo.',
            'È davanti alla farmacia.',
            'La fermata più vicina è in piazza.'
          ],
          answerKeywords: ['angolo', 'farmacia', 'piazza'],
          words: [
            { word: 'la piazza', article: 'la', translation: 'la place', ipa: 'ˈpjattsa', example: 'La piazza è vicino alla stazione.' }
          ],
          hint: { fr: '« dietro l\'angolo » = au coin de la rue ; « davanti a » = devant.' },
          example: { fr: 'La farmacia è dietro l\'angolo.' }
        }
      ],
      vocabulary: [
        { word: 'la stazione', article: 'la', translation: 'la gare', ipa: 'statˈtsjone', example: 'Dov\'è la stazione?' },
        { word: 'la strada', article: 'la', translation: 'la rue, la route', ipa: 'ˈstrada', example: 'Cammini lungo questa strada.' },
        { word: 'il semaforo', article: 'il', translation: 'le feu tricolore', ipa: 'seˈmaforo', example: 'Aspetti al semaforo.' },
        { word: 'girare', article: '', translation: 'tourner', ipa: 'dʒiˈrare', example: 'Giri a sinistra.' },
        { word: 'dritto', article: '', translation: 'tout droit', ipa: 'ˈdritto', example: 'Vada sempre dritto.' },
        { word: 'la fermata', article: 'la', translation: 'l\'arrêt', ipa: 'ferˈmata', example: 'La fermata è qui.' },
        { word: 'la via', article: 'la', translation: 'la rue', ipa: 'ˈviːa', example: 'Abito in via Roma.' },
        { word: 'la piazza', article: 'la', translation: 'la place', ipa: 'ˈpjattsa', example: 'La piazza è grande.' },
        { word: 'la mappa', article: 'la', translation: 'la carte, le plan', ipa: 'ˈmappa', example: 'Guardo la mappa della città.' },
        { word: 'lontano', article: '', translation: 'loin', ipa: 'lonˈtano', example: 'È lontano da qui?' }
      ],
      tip: { fr: 'En italien, « z » de « stazione » se prononce [ts] : [statˈtsjone]. Le « gl » de « famiglia » se dit [ʎ] et le « gn » de « bagno » se dit [ɲ].' }
    },

    /* ================================================================
       PORTUGAIS (pt)
       ================================================================ */

    /* ---------------------------------------------------------------- pt 1 */
    {
      id: 'apresentar-se-pt',
      lang: 'pt',
      level: 'A1',
      order: 1,
      topic: { fr: 'Se présenter' },
      title: { fr: 'Apresentar-se' },
      subtitle: { fr: 'Dis qui tu es en quelques phrases simples.' },
      emoji: '👋',
      minutes: 5,
      situation: { fr: 'Tu rencontres un nouveau voisin dans l\'ascenseur à Lisbonne : il te demande qui tu es.' },
      routine: { fr: 'Donne ton prénom, ton pays, ta ville, ton métier et ton âge, avec des phrases très courtes.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Como se chama?' },
          gloss: { fr: 'Comment vous appelez-vous ?' },
          time: 'à tout moment',
          target: 'Como se chama?',
          targetGloss: { fr: 'Comment vous appelez-vous ?' },
          answerAlt: [
            'Chamo-me Ana.',
            'O meu nome é Ana.',
            'Sou a Ana.'
          ],
          answerKeywords: ['chamo', 'nome', 'meu'],
          words: [
            { word: 'chamar-se', article: '', translation: 's\'appeler', ipa: 'ʃaˈmaɾ sɨ', example: 'Chamo-me Ana.' }
          ],
          hint: { fr: 'Au Portugal, on dit « Chamo-me… » avec le pronom après le verbe ; « Me chamo… » est la forme brésilienne.' },
          example: { fr: 'Olá, chamo-me Ana. E você?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'De onde é?' },
          gloss: { fr: 'D\'où êtes-vous ?' },
          time: 'à tout moment',
          target: 'De onde é?',
          targetGloss: { fr: 'D\'où êtes-vous ?' },
          answerAlt: [
            'Sou de Portugal.',
            'Sou de Lisboa.',
            'Venho de Coimbra.'
          ],
          answerKeywords: ['sou', 'portugal', 'venho'],
          words: [
            { word: 'ser de', article: '', translation: 'être de (origine)', ipa: 'seɾ dɨ', example: 'Sou de Portugal.' }
          ],
          hint: { fr: '« Sou de + pays ou ville » pour l\'origine ; on ne dit pas « Sou do Portugal » avec un pays.' },
          example: { fr: 'Sou de Portugal, mas vivo em Lisboa.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Onde mora?' },
          gloss: { fr: 'Où habitez-vous ?' },
          time: 'à tout moment',
          target: 'Onde mora?',
          targetGloss: { fr: 'Où habitez-vous ?' },
          answerAlt: [
            'Moro em Lisboa.',
            'Vivo no centro.',
            'Tenho um apartamento no centro.'
          ],
          answerKeywords: ['moro', 'centro', 'apartamento'],
          words: [
            { word: 'morar', article: '', translation: 'habiter', ipa: 'muˈɾaɾ', example: 'Moro em Lisboa.' },
            { word: 'o apartamento', article: 'o', translation: 'l\'appartement', ipa: 'ɐpɐɾtɐˈmẽtu', example: 'O meu apartamento é pequeno.' }
          ],
          hint: { fr: '« morar » et « viver » s\'emploient tous les deux pour le logement : moro em Lisboa, vivo no centro.' },
          example: { fr: 'Moro num apartamento pequeno no centro.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'O que faz?' },
          gloss: { fr: 'Que faites-vous comme métier ?' },
          time: 'à tout moment',
          target: 'O que faz?',
          targetGloss: { fr: 'Quel est votre métier ?' },
          answerAlt: [
            'Trabalho como professora.',
            'Sou estudante.',
            'Trabalho num escritório.'
          ],
          answerKeywords: ['trabalho', 'professora', 'escritório'],
          words: [
            { word: 'trabalhar', article: '', translation: 'travailler', ipa: 'tɾɐbɐˈʎaɾ', example: 'Trabalho num escritório.' }
          ],
          hint: { fr: '« O que faz? » est la question naturelle pour le métier ; « Trabalho como… » = je travaille comme…' },
          example: { fr: 'Trabalho como professora numa escola.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Quantos anos tem?' },
          gloss: { fr: 'Quel âge avez-vous ?' },
          time: 'à tout moment',
          target: 'Quantos anos tem?',
          targetGloss: { fr: 'Quel âge avez-vous ?' },
          answerAlt: [
            'Tenho vinte e cinco anos.',
            'Tenho trinta anos.',
            'Faço vinte e seis anos em maio.'
          ],
          answerKeywords: ['tenho', 'anos', 'cinco'],
          words: [
            { word: 'a idade', article: 'a', translation: 'l\'âge', ipa: 'iˈðaðɨ', example: 'Tenho a mesma idade que tu.' }
          ],
          hint: { fr: 'L\'âge se dit avec « ter » : tenho 25 anos, jamais « sou 25 anos ».' },
          example: { fr: 'Tenho vinte e cinco anos.' }
        }
      ],
      vocabulary: [
        { word: 'o nome', article: 'o', translation: 'le nom', ipa: 'ˈnomɨ', example: 'O meu nome é Ana.' },
        { word: 'o país', article: 'o', translation: 'le pays', ipa: 'pɐˈiʃ', example: 'De que país vem?' },
        { word: 'a cidade', article: 'a', translation: 'la ville', ipa: 'siˈðaðɨ', example: 'Lisboa é uma cidade bonita.' },
        { word: 'o trabalho', article: 'o', translation: 'le travail', ipa: 'tɾɐˈbɐʎu', example: 'O meu trabalho é interessante.' },
        { word: 'a idade', article: 'a', translation: 'l\'âge', ipa: 'iˈðaðɨ', example: 'Tenho a mesma idade que tu.' },
        { word: 'o amigo', article: 'o', translation: 'l\'ami', ipa: 'ɐˈmiɣu', example: 'Ele é um bom amigo.' },
        { word: 'a língua', article: 'a', translation: 'la langue', ipa: 'ˈlĩɡwɐ', example: 'Estudo a língua portuguesa.' },
        { word: 'morar', article: '', translation: 'habiter', ipa: 'muˈɾaɾ', example: 'Moro em Lisboa.' },
        { word: 'trabalhar', article: '', translation: 'travailler', ipa: 'tɾɐbɐˈʎaɾ', example: 'Trabalho numa escola.' },
        { word: 'estudar', article: '', translation: 'étudier', ipa: 'iʃtuˈðaɾ', example: 'Estudo história na universidade.' }
      ],
      tip: { fr: 'Au Portugal, le « s » final se prononce « ch » : « anos » = [ˈɐnuʃ]. Les voyelles non accentuées sont très réduites : « de » se dit presque [dɨ].' }
    },

    /* ---------------------------------------------------------------- pt 2 */
    {
      id: 'pedir-cafe-pt',
      lang: 'pt',
      level: 'A2',
      order: 2,
      topic: { fr: 'Au café' },
      title: { fr: 'Pedir no café' },
      subtitle: { fr: 'Commande un café et quelque chose à manger.' },
      emoji: '☕',
      minutes: 5,
      situation: { fr: 'Tu entres dans un café à Lisbonne et le serveur vient prendre ta commande.' },
      routine: { fr: 'Salue, commande une boisson, ajoute quelque chose à manger, choisis ta place, puis demande l\'addition.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Bom dia! O que deseja?' },
          gloss: { fr: 'Bonjour ! Que désirez-vous ?' },
          time: 'le matin',
          target: 'Bom dia! O que deseja?',
          targetGloss: { fr: 'Bonjour ! Que souhaitez-vous ?' },
          answerAlt: [
            'Queria um café, por favor.',
            'Um galão, por favor.',
            'Um copo de água, por favor.'
          ],
          answerKeywords: ['café', 'galão', 'água'],
          words: [
            { word: 'o café', article: 'o', translation: 'le café (expresso)', ipa: 'kɐˈfɛ', example: 'Queria um café, por favor.' }
          ],
          hint: { fr: '« Queria… » est la façon polie de commander, plus douce que « Quero… ». Au Portugal, « um café » = un expresso.' },
          example: { fr: 'Queria um café, por favor.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Deseja algo para comer?' },
          gloss: { fr: 'Désirez-vous quelque chose à manger ?' },
          time: 'le matin',
          target: 'Deseja algo para comer?',
          targetGloss: { fr: 'Souhaitez-vous quelque chose à manger ?' },
          answerAlt: [
            'Sim, queria um pastel de nata.',
            'Não, obrigado, só o café.',
            'Sim, uma torrada, por favor.'
          ],
          answerKeywords: ['pastel', 'obrigado', 'torrada'],
          words: [
            { word: 'o pastel de nata', article: 'o', translation: 'la tartelette à la crème', ipa: 'pɐʃˈtɛl dɨ ˈnatɐ', example: 'Um pastel de nata, por favor.' }
          ],
          hint: { fr: '« um pastel de nata » est la pâtisserie portugaise la plus connue ; « uma torrada » = un toast.' },
          example: { fr: 'Sim, queria um pastel de nata, por favor.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Onde prefere sentar-se?' },
          gloss: { fr: 'Où préférez-vous vous asseoir ?' },
          time: 'le matin',
          target: 'Onde prefere sentar-se?',
          targetGloss: { fr: 'Où souhaitez-vous vous installer ?' },
          answerAlt: [
            'Junto à janela, por favor.',
            'Lá fora, se possível.',
            'Qualquer mesa serve.'
          ],
          answerKeywords: ['janela', 'fora', 'mesa'],
          words: [
            { word: 'a janela', article: 'a', translation: 'la fenêtre', ipa: 'ʒɐˈnɛlɐ', example: 'Queria uma mesa junto à janela.' }
          ],
          hint: { fr: '« junto a » = près de ; « lá fora » = dehors.' },
          example: { fr: 'Prefiro uma mesa junto à janela.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Vai pagar junto ou em separado?' },
          gloss: { fr: 'Allez-vous payer ensemble ou séparément ?' },
          time: 'le matin',
          target: 'Vai pagar junto ou em separado?',
          targetGloss: { fr: 'Réglez-vous ensemble ou séparément ?' },
          answerAlt: [
            'Junto, por favor.',
            'Em separado, por favor.',
            'Pago eu por tudo.'
          ],
          answerKeywords: ['junto', 'separado', 'pago'],
          words: [
            { word: 'a conta', article: 'a', translation: 'l\'addition', ipa: 'ˈkõtɐ', example: 'A conta, por favor.' }
          ],
          hint: { fr: '« em separado » = séparément ; « junto » = ensemble.' },
          example: { fr: 'Pagamos em separado, por favor.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Deseja mais alguma coisa?' },
          gloss: { fr: 'Désirez-vous autre chose ?' },
          time: 'le matin',
          target: 'Deseja mais alguma coisa?',
          targetGloss: { fr: 'Souhaitez-vous autre chose ?' },
          answerAlt: [
            'Não, obrigado, é tudo.',
            'Sim, mais um café, por favor.',
            'A conta, por favor.'
          ],
          answerKeywords: ['obrigado', 'mais', 'conta'],
          words: [
            { word: 'pagar', article: '', translation: 'payer', ipa: 'pɐˈɣaɾ', example: 'Posso pagar com cartão?' }
          ],
          hint: { fr: 'Pour demander l\'addition, dis simplement : « A conta, por favor. »' },
          example: { fr: 'Não, obrigado, é tudo. A conta, por favor.' }
        }
      ],
      vocabulary: [
        { word: 'o café', article: 'o', translation: 'le café (expresso)', ipa: 'kɐˈfɛ', example: 'Um café, por favor.' },
        { word: 'o galão', article: 'o', translation: 'le grand café au lait', ipa: 'ɡɐˈlɐ̃w', example: 'Um galão, por favor.' },
        { word: 'o pastel de nata', article: 'o', translation: 'la tartelette à la crème', ipa: 'pɐʃˈtɛl dɨ ˈnatɐ', example: 'O pastel de nata está quente.' },
        { word: 'a torrada', article: 'a', translation: 'le toast', ipa: 'tuˈʁaðɐ', example: 'Uma torrada com manteiga.' },
        { word: 'a mesa', article: 'a', translation: 'la table', ipa: 'ˈmezɐ', example: 'A mesa está livre.' },
        { word: 'a conta', article: 'a', translation: 'l\'addition', ipa: 'ˈkõtɐ', example: 'A conta, por favor.' },
        { word: 'pagar', article: '', translation: 'payer', ipa: 'pɐˈɣaɾ', example: 'Pago com cartão.' },
        { word: 'a chávena', article: 'a', translation: 'la tasse', ipa: 'ˈʃavɨnɐ', example: 'Uma chávena de chá, por favor.' },
        { word: 'o empregado', article: 'o', translation: 'le serveur', ipa: 'ẽpɾɨˈɣaðu', example: 'O empregado traz o café.' },
        { word: 'a água', article: 'a', translation: 'l\'eau', ipa: 'ˈaɣwɐ', example: 'Uma garrafa de água, por favor.' }
      ],
      tip: { fr: 'Au Portugal, « café » se dit [kɐˈfɛ] et le « ão » de « galão » est une voyelle nasale : [ɡɐˈlɐ̃w]. Le « ch » de « chávena » se prononce comme le « ch » français.' }
    }

  ];

  global.SK = global.SK || {};
  global.SK.MISSIONS_EXTRA3 = MISSIONS;
})(typeof window !== 'undefined' ? window : this);
