/* ==========================================================================
   SPEAKLY — 000-missions-de.js
   Contenu allemand : 7 missions (window.SK.MISSIONS_EXTRA)
   Contrat complet : voir js/data/content.js (en-tête).
   Fichier autonome, IIFE, 'use strict', UTF-8, sans dépendance.
   ========================================================================== */
(function (global) {
  'use strict';

  var MISSIONS = [

    /* ---------------------------------------------------------------- 1 */
    {
      id: 'routine-matin',
      lang: 'de',
      level: 'B1',
      order: 1,
      topic: { fr: 'Routine du matin' },
      title: { fr: 'Deine Morgenroutine' },
      subtitle: { fr: 'Parle de ta routine du matin.' },
      emoji: '🌅',
      minutes: 5,
      situation: { fr: 'Tu discutes avec une collègue allemande avant la réunion de 9 h : elle te demande comment se passe ton matin.' },
      routine: { fr: 'Réchauffe ta voix 30 secondes sur « Guten Morgen », puis décris ton réveil, ton petit-déjeuner et l\'heure à laquelle ta journée commence.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Wann stehst du auf?' },
          gloss: { fr: 'À quelle heure te lèves-tu ?' },
          time: 'le matin',
          target: 'Wann stehst du auf?',
          targetGloss: { fr: 'Quand te lèves-tu ?' },
          answerAlt: [
            'Ich stehe um sieben Uhr auf.',
            'Ich stehe um halb acht auf.',
            'Ich stehe früh auf.'
          ],
          answerKeywords: ['stehe', 'auf', 'sieben'],
          words: [
            { word: 'aufstehen', article: '', translation: 'se lever', ipa: 'ˈaʊfˌʃteːən', example: 'Ich stehe um sieben Uhr auf.' }
          ],
          hint: { fr: '« aufstehen » est un verbe séparable : le préfixe « auf » part à la fin de la phrase.' },
          example: { fr: 'Ich stehe jeden Tag um sechs Uhr auf.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Was machst du zuerst?' },
          gloss: { fr: 'Que fais-tu en premier ?' },
          time: 'le matin',
          target: 'Was machst du zuerst?',
          targetGloss: { fr: 'Que fais-tu d\'abord ?' },
          answerAlt: [
            'Ich dusche mich zuerst.',
            'Zuerst putze ich mir die Zähne.',
            'Ich ziehe mich an und frühstücke.'
          ],
          answerKeywords: ['dusche', 'zuerst', 'zähne'],
          words: [
            { word: 'die Dusche', article: 'die', translation: 'la douche', ipa: 'ˈdʊʃə', example: 'Ich dusche mich jeden Morgen.' },
            { word: 'sich anziehen', article: '', translation: 's\'habiller', ipa: 'ˈantsiːən', example: 'Ich ziehe mich schnell an.' }
          ],
          hint: { fr: 'Le verbe réfléchi « sich duschen » devient « ich dusche mich » : le pronom suit le verbe.' },
          example: { fr: 'Zuerst dusche ich mich, dann frühstücke ich.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Was isst du zum Frühstück?' },
          gloss: { fr: 'Que manges-tu au petit-déjeuner ?' },
          time: 'le matin',
          target: 'Was isst du zum Frühstück?',
          targetGloss: { fr: 'Que manges-tu au petit-déjeuner ?' },
          answerAlt: [
            'Ich esse Brot mit Marmelade.',
            'Ich esse meistens Müsli mit Joghurt.',
            'Zum Frühstück esse ich nur ein Ei.'
          ],
          answerKeywords: ['esse', 'brot', 'frühstück'],
          words: [
            { word: 'frühstücken', article: '', translation: 'prendre le petit-déjeuner', ipa: 'ˈfʁyːˌʃtʏkn̩', example: 'Ich frühstücke um sieben Uhr.' },
            { word: 'das Frühstück', article: 'das', translation: 'le petit-déjeuner', ipa: 'ˈfʁyːʃtʏk', example: 'Das Frühstück ist sehr wichtig.' }
          ],
          hint: { fr: 'Attention : « das Frühstück » (le repas) et « frühstücken » (le verbe) s\'écrivent presque pareil.' },
          example: { fr: 'Zum Frühstück esse ich Brot mit Käse.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Trinkst du Kaffee oder Tee?' },
          gloss: { fr: 'Bois-tu du café ou du thé ?' },
          time: 'le matin',
          target: 'Trinkst du Kaffee oder Tee?',
          targetGloss: { fr: 'Tu bois du café ou du thé ?' },
          answerAlt: [
            'Ich trinke lieber Tee.',
            'Morgens trinke ich immer Kaffee.',
            'Ich trinke weder Kaffee noch Tee.'
          ],
          answerKeywords: ['trinke', 'kaffee', 'tee'],
          words: [
            { word: 'trinken', article: '', translation: 'boire', ipa: 'ˈtʁɪŋkn̩', example: 'Ich trinke morgens einen Kaffee.' },
            { word: 'der Tee', article: 'der', translation: 'le thé', ipa: 'teː', example: 'Der Tee ist noch heiß.' }
          ],
          hint: { fr: '« lieber » exprime la préférence : « ich trinke lieber Tee » = je préfère le thé.' },
          example: { fr: 'Ich trinke weder Kaffee noch Alkohol.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Wann beginnt dein Tag?' },
          gloss: { fr: 'Quand commence ta journée ?' },
          time: 'le matin',
          target: 'Wann beginnt dein Tag?',
          targetGloss: { fr: 'Quand commence ta journée ?' },
          answerAlt: [
            'Mein Tag beginnt um sechs Uhr.',
            'Mein Arbeitstag beginnt um acht Uhr.',
            'Der Tag beginnt für mich sehr früh.'
          ],
          answerKeywords: ['tag', 'beginnt', 'früh'],
          words: [
            { word: 'beginnen', article: '', translation: 'commencer', ipa: 'bəˈɡɪnən', example: 'Der Unterricht beginnt um neun Uhr.' },
            { word: 'der Arbeitstag', article: 'der', translation: 'la journée de travail', ipa: 'ˈaʁbaɪtsˌtaːk', example: 'Mein Arbeitstag beginnt um acht Uhr.' }
          ],
          hint: { fr: '« beginnen » est un verbe fort : er beginnt, begann, hat begonnen.' },
          example: { fr: 'Für mich beginnt der Tag mit einer Tasse Kaffee.' }
        }
      ],
      vocabulary: [
        { word: 'der Wecker', article: 'der', translation: 'le réveil', ipa: 'ˈvɛkɐ', example: 'Mein Wecker klingelt um sechs Uhr.' },
        { word: 'aufstehen', article: '', translation: 'se lever', ipa: 'ˈaʊfˌʃteːən', example: 'Ich stehe früh auf.' },
        { word: 'frühstücken', article: '', translation: 'prendre le petit-déjeuner', ipa: 'ˈfʁyːˌʃtʏkn̩', example: 'Wir frühstücken zusammen.' },
        { word: 'die Dusche', article: 'die', translation: 'la douche', ipa: 'ˈdʊʃə', example: 'Die Dusche ist im Badezimmer.' },
        { word: 'der Kaffee', article: 'der', translation: 'le café', ipa: 'ˈkafe', example: 'Der Kaffee ist zu heiß.' },
        { word: 'der Tee', article: 'der', translation: 'le thé', ipa: 'teː', example: 'Ich trinke gern Tee.' },
        { word: 'das Frühstück', article: 'das', translation: 'le petit-déjeuner', ipa: 'ˈfʁyːʃtʏk', example: 'Das Frühstück dauert zwanzig Minuten.' },
        { word: 'der Morgen', article: 'der', translation: 'le matin', ipa: 'ˈmɔʁɡn̩', example: 'Am Morgen bin ich müde.' },
        { word: 'sich anziehen', article: '', translation: 's\'habiller', ipa: 'ˈantsiːən', example: 'Ich ziehe mich warm an.' },
        { word: 'das Brot', article: 'das', translation: 'le pain', ipa: 'bʁoːt', example: 'Ich esse Brot mit Butter.' }
      ],
      tip: { fr: 'En allemand, « st » se prononce « cht » : « stehe » se dit « chté-e ». Le « r » final de « Uhr » est presque muet : [uːɐ̯].' }
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: 'cafe-commander',
      lang: 'de',
      level: 'A2',
      order: 2,
      topic: { fr: 'Au café' },
      title: { fr: 'Im Café bestellen' },
      subtitle: { fr: 'Commande une boisson et quelque chose à manger.' },
      emoji: '☕',
      minutes: 5,
      situation: { fr: 'Tu entres dans un café à Munich et le serveur vient prendre ta commande.' },
      routine: { fr: 'Salue, commande une boisson, ajoute quelque chose à manger, choisis ta place, puis demande l\'addition.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Guten Tag! Was möchten Sie trinken?' },
          gloss: { fr: 'Bonjour ! Que souhaitez-vous boire ?' },
          time: 'le midi',
          target: 'Guten Tag! Was möchten Sie trinken?',
          targetGloss: { fr: 'Bonjour ! Qu\'aimeriez-vous boire ?' },
          answerAlt: [
            'Ich möchte bitte einen Kaffee.',
            'Ich nehme einen Tee, bitte.',
            'Ein Wasser, bitte.'
          ],
          answerKeywords: ['möchte', 'kaffee', 'bitte'],
          words: [
            { word: 'möchten', article: '', translation: 'souhaiter (vouloir poliment)', ipa: 'ˈmœçtn̩', example: 'Ich möchte einen Kaffee, bitte.' }
          ],
          hint: { fr: 'Pour commander poliment, utilise « ich möchte… » ou « ich nehme… », jamais « ich will » qui sonne brusque.' },
          example: { fr: 'Ich möchte bitte einen Kaffee mit Milch.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Möchten Sie etwas dazu?' },
          gloss: { fr: 'Voulez-vous quelque chose avec ?' },
          time: 'le midi',
          target: 'Möchten Sie etwas dazu?',
          targetGloss: { fr: 'Souhaitez-vous quelque chose en plus ?' },
          answerAlt: [
            'Ja, ich nehme ein Stück Kuchen.',
            'Nein, danke, das reicht.',
            'Ja, bitte ein Croissant.'
          ],
          answerKeywords: ['nehme', 'stück', 'kuchen'],
          words: [
            { word: 'der Kuchen', article: 'der', translation: 'le gâteau', ipa: 'ˈkuːxn̩', example: 'Der Kuchen schmeckt sehr gut.' }
          ],
          hint: { fr: '« ein Stück Kuchen » : après « ein Stück », le nom reste au singulier sans article.' },
          example: { fr: 'Ich nehme ein Stück Kuchen dazu.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Wo möchten Sie sitzen?' },
          gloss: { fr: 'Où souhaitez-vous vous asseoir ?' },
          time: 'le midi',
          target: 'Wo möchten Sie sitzen?',
          targetGloss: { fr: 'Où désirez-vous vous installer ?' },
          answerAlt: [
            'Ich setze mich ans Fenster.',
            'Am Fenster, bitte.',
            'Ich nehme den Tisch draußen.'
          ],
          answerKeywords: ['setze', 'fenster', 'tisch'],
          words: [
            { word: 'das Fenster', article: 'das', translation: 'la fenêtre', ipa: 'ˈfɛnstɐ', example: 'Wir sitzen gern am Fenster.' }
          ],
          hint: { fr: '« ans Fenster » (accusatif, déplacement) mais « am Fenster » (datif, position) : ich setze mich ans Fenster.' },
          example: { fr: 'Ich setze mich lieber an den Tisch am Fenster.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Zusammen oder getrennt?' },
          gloss: { fr: 'Ensemble ou séparément ?' },
          time: 'le midi',
          target: 'Zusammen oder getrennt?',
          targetGloss: { fr: 'Ensemble ou séparément ?' },
          answerAlt: [
            'Wir zahlen bitte getrennt.',
            'Zusammen, bitte.',
            'Ich zahle allein.'
          ],
          answerKeywords: ['zahlen', 'getrennt', 'zusammen'],
          words: [
            { word: 'getrennt', article: '', translation: 'séparément', ipa: 'ɡəˈtʁɛnt', example: 'Wir möchten getrennt zahlen.' }
          ],
          hint: { fr: '« getrennt zahlen » = payer séparément ; « zusammen zahlen » = payer ensemble.' },
          example: { fr: 'Wir zahlen bitte getrennt, jeder für sich.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Möchten Sie noch etwas?' },
          gloss: { fr: 'Désirez-vous autre chose ?' },
          time: 'le midi',
          target: 'Möchten Sie noch etwas?',
          targetGloss: { fr: 'Voulez-vous encore quelque chose ?' },
          answerAlt: [
            'Nein, danke, das ist alles.',
            'Ja, bitte noch ein Wasser.',
            'Ich möchte die Rechnung, bitte.'
          ],
          answerKeywords: ['danke', 'wasser', 'rechnung'],
          words: [
            { word: 'die Rechnung', article: 'die', translation: 'l\'addition', ipa: 'ˈʁɛçnʊŋ', example: 'Die Rechnung, bitte!' },
            { word: 'bezahlen', article: '', translation: 'payer', ipa: 'bəˈtsaːlən', example: 'Ich bezahle mit Karte.' }
          ],
          hint: { fr: 'Pour demander l\'addition, on dit simplement « Die Rechnung, bitte! » avec un grand sourire.' },
          example: { fr: 'Nein, danke, das ist alles. Die Rechnung, bitte.' }
        }
      ],
      vocabulary: [
        { word: 'der Kaffee', article: 'der', translation: 'le café', ipa: 'ˈkafe', example: 'Ein Kaffee, bitte.' },
        { word: 'der Tee', article: 'der', translation: 'le thé', ipa: 'teː', example: 'Der Tee ist sehr heiß.' },
        { word: 'das Wasser', article: 'das', translation: 'l\'eau', ipa: 'ˈvasɐ', example: 'Ein Glas Wasser, bitte.' },
        { word: 'der Kuchen', article: 'der', translation: 'le gâteau', ipa: 'ˈkuːxn̩', example: 'Der Kuchen ist frisch.' },
        { word: 'die Speisekarte', article: 'die', translation: 'le menu', ipa: 'ˈʃpaɪzəˌkaʁtə', example: 'Kann ich die Speisekarte haben?' },
        { word: 'bestellen', article: '', translation: 'commander', ipa: 'bəˈʃtɛlən', example: 'Wir möchten bestellen.' },
        { word: 'die Rechnung', article: 'die', translation: 'l\'addition', ipa: 'ˈʁɛçnʊŋ', example: 'Die Rechnung bitte.' },
        { word: 'bezahlen', article: '', translation: 'payer', ipa: 'bəˈtsaːlən', example: 'Wir bezahlen zusammen.' },
        { word: 'die Tasse', article: 'die', translation: 'la tasse', ipa: 'ˈtasə', example: 'Eine Tasse Kaffee, bitte.' },
        { word: 'der Kellner', article: 'der', translation: 'le serveur', ipa: 'ˈkɛlnɐ', example: 'Der Kellner bringt die Getränke.' }
      ],
      tip: { fr: 'Dans « möchten », le « ch » est un son doux proche du « h » soufflé : [ˈmœçtn̩]. Le « ee » de « Kaffee » et « Tee » se prononce long : [kaˈfeː], [teː].' }
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: 'se-presenter',
      lang: 'de',
      level: 'A1',
      order: 3,
      topic: { fr: 'Se présenter' },
      title: { fr: 'Sich vorstellen' },
      subtitle: { fr: 'Dis qui tu es en quelques phrases simples.' },
      emoji: '👋',
      minutes: 5,
      situation: { fr: 'Tu rencontres un nouveau voisin dans l\'ascenseur : il te demande qui tu es.' },
      routine: { fr: 'Donne ton prénom, ton pays, ta ville, ton métier et ton âge, avec des phrases très courtes.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Wie heißt du?' },
          gloss: { fr: 'Comment t\'appelles-tu ?' },
          time: 'à tout moment',
          target: 'Wie heißt du?',
          targetGloss: { fr: 'Comment t\'appelles-tu ?' },
          answerAlt: [
            'Ich heiße Anna.',
            'Mein Name ist Anna.',
            'Ich bin Anna.'
          ],
          answerKeywords: ['heiße', 'name', 'anna'],
          words: [
            { word: 'heißen', article: '', translation: 's\'appeler', ipa: 'ˈhaɪsn̩', example: 'Wie heißen Sie?' }
          ],
          hint: { fr: '« Ich heiße… » est la formule la plus courante ; « Mein Name ist… » est plus formel.' },
          example: { fr: 'Hallo, ich heiße Anna. Und du?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Woher kommst du?' },
          gloss: { fr: 'D\'où viens-tu ?' },
          time: 'à tout moment',
          target: 'Woher kommst du?',
          targetGloss: { fr: 'D\'où viens-tu ?' },
          answerAlt: [
            'Ich komme aus Frankreich.',
            'Ich bin aus Paris.',
            'Ich stamme aus Lyon.'
          ],
          answerKeywords: ['komme', 'aus', 'frankreich'],
          words: [
            { word: 'kommen', article: '', translation: 'venir', ipa: 'ˈkɔmən', example: 'Ich komme aus Deutschland.' }
          ],
          hint: { fr: '« aus » + pays ou ville : ich komme aus Frankreich, aus Berlin.' },
          example: { fr: 'Ich komme aus Frankreich, aber ich wohne in Wien.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Wo wohnst du?' },
          gloss: { fr: 'Où habites-tu ?' },
          time: 'à tout moment',
          target: 'Wo wohnst du?',
          targetGloss: { fr: 'Où habites-tu ?' },
          answerAlt: [
            'Ich wohne in Berlin.',
            'Ich lebe seit zwei Jahren in Berlin.',
            'Meine Wohnung ist in Hamburg.'
          ],
          answerKeywords: ['wohne', 'berlin', 'wohnung'],
          words: [
            { word: 'wohnen', article: '', translation: 'habiter', ipa: 'ˈvoːnən', example: 'Ich wohne in einer kleinen Stadt.' },
            { word: 'die Stadt', article: 'die', translation: 'la ville', ipa: 'ʃtat', example: 'Die Stadt ist sehr schön.' }
          ],
          hint: { fr: '« wohnen » = habiter (logement) ; « leben » = vivre (au sens large).' },
          example: { fr: 'Ich wohne seit einem Jahr in Berlin.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Was machst du beruflich?' },
          gloss: { fr: 'Que fais-tu comme métier ?' },
          time: 'à tout moment',
          target: 'Was machst du beruflich?',
          targetGloss: { fr: 'Quel est ton métier ?' },
          answerAlt: [
            'Ich arbeite als Lehrerin.',
            'Ich bin Student.',
            'Ich arbeite in einem Büro.'
          ],
          answerKeywords: ['arbeite', 'lehrerin', 'büro'],
          words: [
            { word: 'der Beruf', article: 'der', translation: 'le métier', ipa: 'bəˈʁuːf', example: 'Was ist Ihr Beruf?' }
          ],
          hint: { fr: 'On dit « Ich arbeite als… » + métier sans article : als Lehrer, als Ärztin.' },
          example: { fr: 'Ich arbeite als Lehrerin an einer Schule.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Wie alt bist du?' },
          gloss: { fr: 'Quel âge as-tu ?' },
          time: 'à tout moment',
          target: 'Wie alt bist du?',
          targetGloss: { fr: 'Quel âge as-tu ?' },
          answerAlt: [
            'Ich bin fünfundzwanzig Jahre alt.',
            'Ich bin dreißig.',
            'Ich werde bald sechsundzwanzig.'
          ],
          answerKeywords: ['bin', 'fünfundzwanzig', 'jahre', 'alt'],
          words: [
            { word: 'das Alter', article: 'das', translation: 'l\'âge', ipa: 'ˈaltɐ', example: 'Mein Alter ist kein Geheimnis.' }
          ],
          hint: { fr: 'L\'âge se dit avec « sein » : ich bin 25 Jahre alt, jamais « ich habe ». On peut aussi omettre « Jahre alt ».' },
          example: { fr: 'Ich bin dreißig Jahre alt.' }
        }
      ],
      vocabulary: [
        { word: 'heißen', article: '', translation: 's\'appeler', ipa: 'ˈhaɪsn̩', example: 'Ich heiße Peter.' },
        { word: 'der Name', article: 'der', translation: 'le nom', ipa: 'ˈnaːmə', example: 'Mein Name ist Müller.' },
        { word: 'wohnen', article: '', translation: 'habiter', ipa: 'ˈvoːnən', example: 'Wo wohnst du?' },
        { word: 'die Stadt', article: 'die', translation: 'la ville', ipa: 'ʃtat', example: 'Die Stadt gefällt mir.' },
        { word: 'das Land', article: 'das', translation: 'le pays', ipa: 'lant', example: 'Aus welchem Land kommst du?' },
        { word: 'der Beruf', article: 'der', translation: 'le métier', ipa: 'bəˈʁuːf', example: 'Mein Beruf macht mir Spaß.' },
        { word: 'die Sprache', article: 'die', translation: 'la langue', ipa: 'ˈʃpʁaːxə', example: 'Ich lerne die deutsche Sprache.' },
        { word: 'das Alter', article: 'das', translation: 'l\'âge', ipa: 'ˈaltɐ', example: 'Er ist in meinem Alter.' },
        { word: 'studieren', article: '', translation: 'étudier (à l\'université)', ipa: 'ʃtuˈdiːʁən', example: 'Ich studiere Medizin.' },
        { word: 'kommen', article: '', translation: 'venir', ipa: 'ˈkɔmən', example: 'Ich komme aus Spanien.' }
      ],
      tip: { fr: 'Le « ß » de « heißen » se prononce comme un « s » fort : [ˈhaɪsn̩]. Le « ch » de « ich » est un son doux, proche d\'un « h » chuchoté, pas un « k ».' }
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: 'cuisine',
      lang: 'de',
      level: 'A2',
      order: 4,
      topic: { fr: 'Cuisine et repas' },
      title: { fr: 'Kochen und Rezepte' },
      subtitle: { fr: 'Explique une recette simple et parle des repas.' },
      emoji: '🍳',
      minutes: 6,
      situation: { fr: 'Tu cuisines avec une amie allemande et elle te demande comment tu prépares ta soupe de légumes.' },
      routine: { fr: 'Nomme les ingrédients, décris les gestes de préparation, donne le temps de cuisson puis réagis au goût.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Was kochst du heute?' },
          gloss: { fr: 'Qu\'est-ce que tu cuisines aujourd\'hui ?' },
          time: 'le soir',
          target: 'Was kochst du heute?',
          targetGloss: { fr: 'Que cuisines-tu aujourd\'hui ?' },
          answerAlt: [
            'Ich koche eine Gemüsesuppe.',
            'Heute mache ich Nudeln mit Tomaten.',
            'Ich bereite einen Salat zu.'
          ],
          answerKeywords: ['koche', 'gemüsesuppe', 'nudeln'],
          words: [
            { word: 'kochen', article: '', translation: 'cuisiner, faire cuire', ipa: 'ˈkɔxn̩', example: 'Ich koche heute Abend für meine Familie.' }
          ],
          hint: { fr: '« kochen » signifie à la fois cuisiner et faire bouillir ; « zubereiten » = préparer un plat.' },
          example: { fr: 'Heute koche ich Nudeln mit Gemüse.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Welche Zutaten brauchst du?' },
          gloss: { fr: 'De quels ingrédients as-tu besoin ?' },
          time: 'le soir',
          target: 'Welche Zutaten brauchst du?',
          targetGloss: { fr: 'De quels ingrédients as-tu besoin ?' },
          answerAlt: [
            'Ich brauche Kartoffeln, Zwiebeln und Karotten.',
            'Ich brauche nur Mehl, Eier und Milch.',
            'Man braucht wenige Zutaten.'
          ],
          answerKeywords: ['brauche', 'kartoffeln', 'zwiebeln'],
          words: [
            { word: 'die Zutat', article: 'die', translation: 'l\'ingrédient', ipa: 'ˈtsuːtaːt', example: 'Diese Zutat fehlt noch.' }
          ],
          hint: { fr: '« brauchen » + accusatif : ich brauche einen Topf, ich brauche Milch.' },
          example: { fr: 'Für die Suppe brauche ich Kartoffeln und Zwiebeln.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Wie schneidest du das Gemüse?' },
          gloss: { fr: 'Comment coupes-tu les légumes ?' },
          time: 'le soir',
          target: 'Wie schneidest du das Gemüse?',
          targetGloss: { fr: 'Comment coupes-tu les légumes ?' },
          answerAlt: [
            'Ich schneide das Gemüse in kleine Stücke.',
            'Ich schneide die Zwiebeln fein.',
            'Ich schneide alles in Würfel.'
          ],
          answerKeywords: ['schneide', 'gemüse', 'würfel'],
          words: [
            { word: 'schneiden', article: '', translation: 'couper', ipa: 'ˈʃnaɪdn̩', example: 'Schneide die Zwiebeln in kleine Stücke.' },
            { word: 'das Gemüse', article: 'das', translation: 'les légumes', ipa: 'ɡəˈmyːzə', example: 'Das Gemüse ist ganz frisch.' }
          ],
          hint: { fr: 'Les verbes en -iden perdent le « e » : du schneidest, er schneidet. Le « sch » se prononce comme « ch » français.' },
          example: { fr: 'Ich schneide das Gemüse in kleine Würfel.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Wie lange muss das kochen?' },
          gloss: { fr: 'Combien de temps cela doit-il cuire ?' },
          time: 'le soir',
          target: 'Wie lange muss das kochen?',
          targetGloss: { fr: 'Combien de temps faut-il que cela cuise ?' },
          answerAlt: [
            'Es muss zwanzig Minuten kochen.',
            'Das dauert etwa eine halbe Stunde.',
            'Man lässt es zehn Minuten ziehen.'
          ],
          answerKeywords: ['muss', 'zwanzig', 'minuten'],
          words: [
            { word: 'der Topf', article: 'der', translation: 'la casserole', ipa: 'tɔpf', example: 'Das Wasser im Topf kocht schon.' }
          ],
          hint: { fr: '« müssen » exprime la nécessité : es muss zwanzig Minuten kochen.' },
          example: { fr: 'Die Suppe muss zwanzig Minuten kochen.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Wie schmeckt es dir?' },
          gloss: { fr: 'Comment trouves-tu le goût ?' },
          time: 'le soir',
          target: 'Wie schmeckt es dir?',
          targetGloss: { fr: 'Comment cela te plaît-il au goût ?' },
          answerAlt: [
            'Es schmeckt sehr lecker.',
            'Das Essen ist köstlich.',
            'Es schmeckt mir ein bisschen salzig.'
          ],
          answerKeywords: ['schmeckt', 'lecker', 'salzig'],
          words: [
            { word: 'schmecken', article: '', translation: 'avoir bon goût, plaire', ipa: 'ˈʃmɛkn̩', example: 'Wie schmeckt dir die Suppe?' }
          ],
          hint: { fr: 'La personne qui goûte est au datif : es schmeckt mir, dir, ihm.' },
          example: { fr: 'Die Suppe schmeckt mir sehr gut.' }
        }
      ],
      vocabulary: [
        { word: 'kochen', article: '', translation: 'cuisiner, cuire', ipa: 'ˈkɔxn̩', example: 'Ich koche jeden Tag.' },
        { word: 'die Zutat', article: 'die', translation: 'l\'ingrédient', ipa: 'ˈtsuːtaːt', example: 'Alle Zutaten sind da.' },
        { word: 'das Gemüse', article: 'das', translation: 'les légumes', ipa: 'ɡəˈmyːzə', example: 'Gemüse ist gesund.' },
        { word: 'die Kartoffel', article: 'die', translation: 'la pomme de terre', ipa: 'kaʁˈtɔfl̩', example: 'Die Kartoffeln sind gar.' },
        { word: 'die Zwiebel', article: 'die', translation: 'l\'oignon', ipa: 'ˈtsviːbl̩', example: 'Die Zwiebel macht mich weinen.' },
        { word: 'schneiden', article: '', translation: 'couper', ipa: 'ˈʃnaɪdn̩', example: 'Ich schneide das Brot.' },
        { word: 'der Topf', article: 'der', translation: 'la casserole', ipa: 'tɔpf', example: 'Der Topf steht auf dem Herd.' },
        { word: 'die Pfanne', article: 'die', translation: 'la poêle', ipa: 'ˈpfanə', example: 'Die Pfanne ist heiß.' },
        { word: 'schmecken', article: '', translation: 'avoir du goût', ipa: 'ˈʃmɛkn̩', example: 'Das schmeckt mir.' },
        { word: 'das Rezept', article: 'das', translation: 'la recette', ipa: 'ʁeˈtsɛpt', example: 'Das Rezept ist von meiner Oma.' }
      ],
      tip: { fr: 'Le « z » allemand se prononce « ts » : « Zwiebel » = [ˈtsviːbl̩], « zwanzig » = [ˈtsvantsɪç]. Le « sch » se dit toujours « ch ».' }
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: 'orientation',
      lang: 'de',
      level: 'A2',
      order: 5,
      topic: { fr: 'Demander son chemin' },
      title: { fr: 'Nach dem Weg fragen' },
      subtitle: { fr: 'Demande ton chemin et comprends la réponse.' },
      emoji: '🧭',
      minutes: 5,
      situation: { fr: 'Tu es perdu dans une ville allemande et tu arrêtes un passant pour trouver la gare.' },
      routine: { fr: 'Aborde poliment la personne, demande la direction, vérifie la distance, puis reformule l\'itinéraire.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Entschuldigung, wo ist der Bahnhof?' },
          gloss: { fr: 'Excusez-moi, où est la gare ?' },
          time: 'l\'après-midi',
          target: 'Entschuldigung, wo ist der Bahnhof?',
          targetGloss: { fr: 'Excusez-moi, où se trouve la gare ?' },
          answerAlt: [
            'Entschuldigung, wie komme ich zum Bahnhof?',
            'Können Sie mir den Weg zeigen?',
            'Wo finde ich den Bahnhof?'
          ],
          answerKeywords: ['komme', 'weg', 'bahnhof'],
          words: [
            { word: 'der Bahnhof', article: 'der', translation: 'la gare', ipa: 'ˈbaːnhoːf', example: 'Der Bahnhof ist gleich dort.' }
          ],
          hint: { fr: 'Commence toujours par « Entschuldigung » : c\'est la formule polie pour aborder quelqu\'un.' },
          example: { fr: 'Entschuldigung, wie komme ich zum Bahnhof?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Ist es weit von hier?' },
          gloss: { fr: 'Est-ce loin d\'ici ?' },
          time: 'l\'après-midi',
          target: 'Ist es weit von hier?',
          targetGloss: { fr: 'Est-ce loin d\'ici ?' },
          answerAlt: [
            'Nein, es ist ganz in der Nähe.',
            'Nein, nur fünf Minuten zu Fuß.',
            'Ja, es ist ziemlich weit.'
          ],
          answerKeywords: ['weit', 'nähe', 'minuten'],
          words: [
            { word: 'weit', article: '', translation: 'loin', ipa: 'vaɪt', example: 'Es ist nicht weit von hier.' }
          ],
          hint: { fr: '« in der Nähe » = tout près ; « zu Fuß » = à pied. Les deux expressions sont très fréquentes.' },
          example: { fr: 'Der Markt ist ganz in der Nähe.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Wie komme ich dorthin?' },
          gloss: { fr: 'Comment y aller ?' },
          time: 'l\'après-midi',
          target: 'Wie komme ich dorthin?',
          targetGloss: { fr: 'Comment puis-je m\'y rendre ?' },
          answerAlt: [
            'Gehen Sie geradeaus und dann links.',
            'Sie müssen rechts abbiegen.',
            'Fahren Sie bis zur Ampel.'
          ],
          answerKeywords: ['gehen', 'geradeaus', 'links'],
          words: [
            { word: 'geradeaus', article: '', translation: 'tout droit', ipa: 'ɡəʁaːdəˈaʊs', example: 'Gehen Sie immer geradeaus.' },
            { word: 'abbiegen', article: '', translation: 'tourner', ipa: 'ˈapˌbiːɡn̩', example: 'Biegen Sie hier rechts ab.' }
          ],
          hint: { fr: '« abbiegen » est séparable : biegen Sie… ab ! Dans une consigne, le verbe passe en tête.' },
          example: { fr: 'Gehen Sie geradeaus, dann biegen Sie links ab.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Fährt ein Bus dorthin?' },
          gloss: { fr: 'Y a-t-il un bus pour y aller ?' },
          time: 'l\'après-midi',
          target: 'Fährt ein Bus dorthin?',
          targetGloss: { fr: 'Un bus va-t-il là-bas ?' },
          answerAlt: [
            'Ja, die Linie zehn fährt dorthin.',
            'Nein, Sie müssen zu Fuß gehen.',
            'Die Straßenbahn hält direkt dort.'
          ],
          answerKeywords: ['fährt', 'bus', 'linie'],
          words: [
            { word: 'die Haltestelle', article: 'die', translation: 'l\'arrêt', ipa: 'ˈhaltəˌʃtɛlə', example: 'Die Haltestelle ist um die Ecke.' }
          ],
          hint: { fr: '« fahren » = aller en véhicule : ich fahre, du fährst, er fährt. « zu Fuß gehen » = aller à pied.' },
          example: { fr: 'Die Linie zehn fährt direkt zum Bahnhof.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Wo ist die nächste Haltestelle?' },
          gloss: { fr: 'Où est l\'arrêt le plus proche ?' },
          time: 'l\'après-midi',
          target: 'Wo ist die nächste Haltestelle?',
          targetGloss: { fr: 'Où se trouve le prochain arrêt ?' },
          answerAlt: [
            'Die Haltestelle ist gleich um die Ecke.',
            'Sie ist vor der Apotheke.',
            'Die nächste Haltestelle ist am Marktplatz.'
          ],
          answerKeywords: ['haltestelle', 'ecke', 'marktplatz'],
          words: [
            { word: 'die Ecke', article: 'die', translation: 'le coin (de rue)', ipa: 'ˈɛkə', example: 'Das Café ist gleich um die Ecke.' }
          ],
          hint: { fr: '« um die Ecke » = au coin de la rue : expression figée, toujours avec « um ».' },
          example: { fr: 'Die Apotheke ist gleich um die Ecke.' }
        }
      ],
      vocabulary: [
        { word: 'der Bahnhof', article: 'der', translation: 'la gare', ipa: 'ˈbaːnhoːf', example: 'Wo ist der Bahnhof?' },
        { word: 'die Straße', article: 'die', translation: 'la rue', ipa: 'ˈʃtʁaːsə', example: 'Gehen Sie diese Straße hinunter.' },
        { word: 'die Ampel', article: 'die', translation: 'le feu tricolore', ipa: 'ˈampl̩', example: 'Warten Sie an der Ampel.' },
        { word: 'abbiegen', article: '', translation: 'tourner', ipa: 'ˈapˌbiːɡn̩', example: 'Biegen Sie links ab.' },
        { word: 'geradeaus', article: '', translation: 'tout droit', ipa: 'ɡəʁaːdəˈaʊs', example: 'Immer geradeaus.' },
        { word: 'die Haltestelle', article: 'die', translation: 'l\'arrêt', ipa: 'ˈhaltəˌʃtɛlə', example: 'Die Haltestelle ist dort vorn.' },
        { word: 'der Weg', article: 'der', translation: 'le chemin', ipa: 'veːk', example: 'Können Sie mir den Weg zeigen?' },
        { word: 'die Ecke', article: 'die', translation: 'le coin', ipa: 'ˈɛkə', example: 'Es ist gleich um die Ecke.' },
        { word: 'die Karte', article: 'die', translation: 'la carte, le plan', ipa: 'ˈkaʁtə', example: 'Ich schaue auf die Karte.' },
        { word: 'weit', article: '', translation: 'loin', ipa: 'vaɪt', example: 'Ist es weit?' }
      ],
      tip: { fr: 'Dans « Straße », « st » se dit « cht » : [ˈʃtʁaːsə]. Le « h » de « gehen » et « Bahnhof » est muet et allonge la voyelle précédente.' }
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: 'medecin',
      lang: 'de',
      level: 'B1',
      order: 6,
      topic: { fr: 'Chez le médecin' },
      title: { fr: 'Beim Arzt' },
      subtitle: { fr: 'Décris tes symptômes et comprends les conseils du médecin.' },
      emoji: '🩺',
      minutes: 6,
      situation: { fr: 'Tu as mal à la tête depuis trois jours et tu consultes un médecin généraliste à Berlin.' },
      routine: { fr: 'Décris tes symptômes, précise depuis quand, indique les médicaments déjà pris, signale les allergies puis demande conseil.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Was fehlt Ihnen?' },
          gloss: { fr: 'Qu\'est-ce qui vous arrive ?' },
          time: 'le matin',
          target: 'Was fehlt Ihnen?',
          targetGloss: { fr: 'De quoi souffrez-vous ?' },
          answerAlt: [
            'Ich habe starke Kopfschmerzen.',
            'Ich fühle mich nicht gut.',
            'Mir tut der Hals weh.'
          ],
          answerKeywords: ['habe', 'kopfschmerzen', 'hals'],
          words: [
            { word: 'die Kopfschmerzen', article: 'die', translation: 'le mal de tête', ipa: 'ˈkɔpfˌʃmɛʁtsn̩', example: 'Ich habe starke Kopfschmerzen.' }
          ],
          hint: { fr: 'Les douleurs s\'expriment avec « ich habe… » ou « mir tut … weh » : mir tut der Kopf weh.' },
          example: { fr: 'Ich habe seit gestern starke Kopfschmerzen.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Seit wann haben Sie die Beschwerden?' },
          gloss: { fr: 'Depuis quand avez-vous ces symptômes ?' },
          time: 'le matin',
          target: 'Seit wann haben Sie die Beschwerden?',
          targetGloss: { fr: 'Depuis quand ressentez-vous ces troubles ?' },
          answerAlt: [
            'Seit drei Tagen.',
            'Seit gestern Abend.',
            'Schon seit einer Woche.'
          ],
          answerKeywords: ['seit', 'drei', 'tagen'],
          words: [
            { word: 'seit', article: '', translation: 'depuis', ipa: 'zaɪt', example: 'Ich bin seit einer Woche krank.' }
          ],
          hint: { fr: '« seit » + datif pour une durée qui continue : seit drei Tagen, seit einer Woche.' },
          example: { fr: 'Die Schmerzen habe ich seit drei Tagen.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Nehmen Sie schon Medikamente?' },
          gloss: { fr: 'Prenez-vous déjà des médicaments ?' },
          time: 'le matin',
          target: 'Nehmen Sie schon Medikamente?',
          targetGloss: { fr: 'Suivez-vous déjà un traitement ?' },
          answerAlt: [
            'Ich nehme nur Tabletten gegen die Schmerzen.',
            'Nein, ich nehme nichts.',
            'Ja, ich nehme seit gestern Tabletten.'
          ],
          answerKeywords: ['nehme', 'tabletten', 'schmerzen'],
          words: [
            { word: 'die Tablette', article: 'die', translation: 'le comprimé', ipa: 'taˈblɛtə', example: 'Nehmen Sie die Tabletten nach dem Essen.' }
          ],
          hint: { fr: '« gegen » + accusatif indique ce que le médicament combat : Tabletten gegen Kopfschmerzen.' },
          example: { fr: 'Ich nehme Tabletten gegen die Schmerzen.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Haben Sie Allergien?' },
          gloss: { fr: 'Avez-vous des allergies ?' },
          time: 'le matin',
          target: 'Haben Sie Allergien?',
          targetGloss: { fr: 'Avez-vous des allergies ?' },
          answerAlt: [
            'Ja, ich bin allergisch gegen Penicillin.',
            'Nein, ich habe keine Allergien.',
            'Ich reagiere auf Nüsse.'
          ],
          answerKeywords: ['allergisch', 'gegen', 'penicillin'],
          words: [
            { word: 'allergisch', article: '', translation: 'allergique', ipa: 'aˈlɛʁɡɪʃ', example: 'Ich bin allergisch gegen Pollen.' }
          ],
          hint: { fr: '« allergisch gegen » + accusatif ; « reagieren auf » + accusatif : ich reagiere auf Nüsse.' },
          example: { fr: 'Ich bin allergisch gegen Penicillin.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Was empfehlen Sie mir?' },
          gloss: { fr: 'Que me conseillez-vous ?' },
          time: 'le matin',
          target: 'Was empfehlen Sie mir?',
          targetGloss: { fr: 'Que me recommandez-vous ?' },
          answerAlt: [
            'Sie sollten sich ausruhen und viel trinken.',
            'Nehmen Sie die Tabletten zweimal täglich.',
            'Ich schreibe Ihnen ein Rezept.'
          ],
          answerKeywords: ['sollten', 'ausruhen', 'trinken'],
          words: [
            { word: 'sich ausruhen', article: '', translation: 'se reposer', ipa: 'ˈaʊsˌʁuːən', example: 'Ruhen Sie sich ein paar Tage aus.' },
            { word: 'das Rezept', article: 'das', translation: 'l\'ordonnance', ipa: 'ʁeˈtsɛpt', example: 'Hier ist Ihr Rezept.' }
          ],
          hint: { fr: '« Ich schreibe Ihnen ein Rezept » : « Ihnen » est le datif de politesse (à vous).' },
          example: { fr: 'Sie sollten sich ein paar Tage ausruhen.' }
        }
      ],
      vocabulary: [
        { word: 'die Schmerzen', article: 'die', translation: 'les douleurs', ipa: 'ˈʃmɛʁtsn̩', example: 'Die Schmerzen sind stark.' },
        { word: 'das Fieber', article: 'das', translation: 'la fièvre', ipa: 'ˈfiːbɐ', example: 'Ich habe Fieber.' },
        { word: 'der Husten', article: 'der', translation: 'la toux', ipa: 'ˈhuːstn̩', example: 'Der Husten wird besser.' },
        { word: 'die Tablette', article: 'die', translation: 'le comprimé', ipa: 'taˈblɛtə', example: 'Nimm eine Tablette.' },
        { word: 'das Rezept', article: 'das', translation: 'l\'ordonnance', ipa: 'ʁeˈtsɛpt', example: 'Das Rezept gilt drei Monate.' },
        { word: 'untersuchen', article: '', translation: 'examiner', ipa: 'ʊntɐˈzuːxn̩', example: 'Der Arzt untersucht mich.' },
        { word: 'die Praxis', article: 'die', translation: 'le cabinet médical', ipa: 'ˈpʁaksɪs', example: 'Die Praxis öffnet um acht Uhr.' },
        { word: 'der Termin', article: 'der', translation: 'le rendez-vous', ipa: 'tɛʁˈmiːn', example: 'Ich habe einen Termin um zehn Uhr.' },
        { word: 'sich ausruhen', article: '', translation: 'se reposer', ipa: 'ˈaʊsˌʁuːən', example: 'Du musst dich ausruhen.' },
        { word: 'die Erkältung', article: 'die', translation: 'le rhume', ipa: 'ɛɐ̯ˈkɛltʊŋ', example: 'Ich habe eine Erkältung.' }
      ],
      tip: { fr: 'Dans « Schmerzen » et « Kopfschmerzen », « sch » se dit « ch » et « er » final devient [ɐ] : [ˈʃmɛʁtsn̩]. Le « ä » de « Erkältung » est ouvert, proche du « è » français.' }
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: 'entretien-embauche',
      lang: 'de',
      level: 'B2',
      order: 7,
      topic: { fr: 'Entretien d\'embauche' },
      title: { fr: 'Das Vorstellungsgespräch' },
      subtitle: { fr: 'Présente ton parcours et défends ta candidature.' },
      emoji: '💼',
      minutes: 8,
      situation: { fr: 'Tu passes un entretien d\'embauche dans une entreprise allemande pour un poste de responsable marketing.' },
      routine: { fr: 'Présente ton expérience, explique ta motivation, cite tes forces, projette-toi dans cinq ans puis pose tes questions.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Erzählen Sie mir etwas über sich.' },
          gloss: { fr: 'Parlez-moi un peu de vous.' },
          time: 'le matin',
          target: 'Erzählen Sie mir etwas über sich.',
          targetGloss: { fr: 'Parlez-moi un peu de vous.' },
          answerAlt: [
            'Ich habe fünf Jahre Erfahrung im Marketing.',
            'Ich bin seit fünf Jahren im Marketing tätig.',
            'Ich habe Wirtschaft studiert.'
          ],
          answerKeywords: ['erfahrung', 'fünf', 'jahren'],
          words: [
            { word: 'die Erfahrung', article: 'die', translation: 'l\'expérience', ipa: 'ɛɐ̯ˈfaːʁʊŋ', example: 'Ich habe viel Erfahrung in diesem Bereich.' }
          ],
          hint: { fr: 'Structure ta réponse : formation, expérience, compétence clé — en trois phrases maximum.' },
          example: { fr: 'Ich habe fünf Jahre Erfahrung im Marketing.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Warum möchten Sie bei uns arbeiten?' },
          gloss: { fr: 'Pourquoi souhaitez-vous travailler chez nous ?' },
          time: 'le matin',
          target: 'Warum möchten Sie bei uns arbeiten?',
          targetGloss: { fr: 'Pourquoi voulez-vous travailler chez nous ?' },
          answerAlt: [
            'Ihr Unternehmen passt genau zu meinen Zielen.',
            'Ich schätze Ihre Unternehmenskultur.',
            'Die Stelle entspricht meinen Fähigkeiten.'
          ],
          answerKeywords: ['unternehmen', 'stelle', 'fähigkeiten'],
          words: [
            { word: 'das Unternehmen', article: 'das', translation: 'l\'entreprise', ipa: 'ʊntɐˈneːmən', example: 'Das Unternehmen hat Standorte in ganz Europa.' },
            { word: 'die Stelle', article: 'die', translation: 'le poste', ipa: 'ˈʃtɛlə', example: 'Die Stelle interessiert mich sehr.' }
          ],
          hint: { fr: 'Montre que tu connais l\'entreprise : cite un produit, une valeur ou un projet précis.' },
          example: { fr: 'Ihr Unternehmen passt genau zu meinen beruflichen Zielen.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Was sind Ihre Stärken?' },
          gloss: { fr: 'Quelles sont vos qualités ?' },
          time: 'le matin',
          target: 'Was sind Ihre Stärken?',
          targetGloss: { fr: 'Quels sont vos points forts ?' },
          answerAlt: [
            'Ich arbeite strukturiert und bleibe auch unter Druck ruhig.',
            'Ich bin zuverlässig und lernbereit.',
            'Ich übernehme gern Verantwortung.'
          ],
          answerKeywords: ['strukturiert', 'druck', 'zuverlässig'],
          words: [
            { word: 'zuverlässig', article: '', translation: 'fiable', ipa: 'ˈtsuːfɛɐ̯ˌlɛsɪç', example: 'Meine Kollegen schätzen mich als zuverlässig.' }
          ],
          hint: { fr: 'Illustre chaque qualité par un exemple concret : « unter Druck ruhig bleiben » + une situation vécue.' },
          example: { fr: 'Ich bleibe auch unter Druck ruhig und arbeite strukturiert.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Wo sehen Sie sich in fünf Jahren?' },
          gloss: { fr: 'Où vous voyez-vous dans cinq ans ?' },
          time: 'le matin',
          target: 'Wo sehen Sie sich in fünf Jahren?',
          targetGloss: { fr: 'Où vous projetez-vous dans cinq ans ?' },
          answerAlt: [
            'In fünf Jahren möchte ich ein Team leiten.',
            'Ich möchte mehr Verantwortung übernehmen.',
            'Ich sehe mich in einer Führungsposition.'
          ],
          answerKeywords: ['fünf', 'jahren', 'team', 'leiten'],
          words: [
            { word: 'die Verantwortung', article: 'die', translation: 'la responsabilité', ipa: 'fɛɐ̯ˈʔantvɔʁtʊŋ', example: 'Ich übernehme gern Verantwortung.' }
          ],
          hint: { fr: '« sich sehen » est réfléchi : ich sehe mich, du siehst dich, er sieht sich.' },
          example: { fr: 'In fünf Jahren möchte ich ein Team leiten.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Haben Sie noch Fragen an uns?' },
          gloss: { fr: 'Avez-vous encore des questions à nous poser ?' },
          time: 'le matin',
          target: 'Haben Sie noch Fragen an uns?',
          targetGloss: { fr: 'Avez-vous d\'autres questions ?' },
          answerAlt: [
            'Ja, wie sieht die Einarbeitung aus?',
            'Wie sind die Arbeitszeiten?',
            'Nein, im Moment habe ich keine Fragen.'
          ],
          answerKeywords: ['wie', 'einarbeitung', 'arbeitszeiten'],
          words: [
            { word: 'die Fähigkeit', article: 'die', translation: 'la compétence', ipa: 'ˈfɛːɪçkaɪt', example: 'Diese Fähigkeit ist mir wichtig.' }
          ],
          hint: { fr: 'Pose au moins une question : cela montre ton intérêt. « Wie sieht … aus? » = à quoi ressemble… ?' },
          example: { fr: 'Wie sieht die Einarbeitung in den ersten Wochen aus?' }
        }
      ],
      vocabulary: [
        { word: 'die Erfahrung', article: 'die', translation: 'l\'expérience', ipa: 'ɛɐ̯ˈfaːʁʊŋ', example: 'Ich bringe viel Erfahrung mit.' },
        { word: 'die Stelle', article: 'die', translation: 'le poste', ipa: 'ˈʃtɛlə', example: 'Ich bewerbe mich um diese Stelle.' },
        { word: 'das Unternehmen', article: 'das', translation: 'l\'entreprise', ipa: 'ʊntɐˈneːmən', example: 'Das Unternehmen wächst schnell.' },
        { word: 'die Bewerbung', article: 'die', translation: 'la candidature', ipa: 'bəˈvɛʁbʊŋ', example: 'Meine Bewerbung ist fertig.' },
        { word: 'das Vorstellungsgespräch', article: 'das', translation: 'l\'entretien d\'embauche', ipa: 'ˈfoːɐ̯ʃtɛlʊŋsɡəˌʃpʁɛːç', example: 'Das Vorstellungsgespräch dauert eine Stunde.' },
        { word: 'die Stärke', article: 'die', translation: 'la force, le point fort', ipa: 'ˈʃtɛʁkə', example: 'Meine größte Stärke ist Geduld.' },
        { word: 'die Verantwortung', article: 'die', translation: 'la responsabilité', ipa: 'fɛɐ̯ˈʔantvɔʁtʊŋ', example: 'Sie trägt viel Verantwortung.' },
        { word: 'zuverlässig', article: '', translation: 'fiable', ipa: 'ˈtsuːfɛɐ̯ˌlɛsɪç', example: 'Er ist ein zuverlässiger Kollege.' },
        { word: 'die Fähigkeit', article: 'die', translation: 'la compétence', ipa: 'ˈfɛːɪçkaɪt', example: 'Sie hat viele Fähigkeiten.' },
        { word: 'das Gehalt', article: 'das', translation: 'le salaire', ipa: 'ɡəˈhalt', example: 'Das Gehalt ist verhandelbar.' }
      ],
      tip: { fr: 'Le « ch » de « Fähigkeit » et « zuverlässig » est doux : [ç], proche d\'un « h » soufflé. Dans « Vorstellungsgespräch », le « ä » est long et ouvert : [ˈʃpʁɛːç].' }
    }

  ];

  global.SK = global.SK || {};
  global.SK.MISSIONS_EXTRA = MISSIONS;
})(typeof window !== 'undefined' ? window : this);
