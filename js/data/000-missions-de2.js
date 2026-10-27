/* ==========================================================================
   SPEAKLY — 000-missions-de2.js
   Contenu allemand : 6 missions supplémentaires (window.SK.MISSIONS_EXTRA2)
   Ordres 8 à 13 : faire-les-courses, hotel, meteo-saisons,
   appartement, telephone, reclamation.
   Contrat complet : voir js/data/content.js (en-tête).
   Fichier autonome, IIFE, 'use strict', UTF-8, sans dépendance.
   ========================================================================== */
(function (global) {
  'use strict';

  var MISSIONS = [

    /* ---------------------------------------------------------------- 8 */
    {
      id: 'faire-les-courses',
      lang: 'de',
      level: 'A2',
      order: 8,
      topic: { fr: 'Faire les courses' },
      title: { fr: 'Im Supermarkt einkaufen' },
      subtitle: { fr: 'Demande un produit, le poids, le prix et paie.' },
      emoji: '🛒',
      minutes: 5,
      situation: { fr: 'Tu fais tes courses dans un supermarché à Cologne et tu cherches plusieurs produits.' },
      routine: { fr: 'Salue le personnel, demande où se trouve un produit, renseigne-toi sur le poids et le prix, paie à la caisse puis demande un sac.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Entschuldigung, wo finde ich die Milch?' },
          gloss: { fr: 'Excusez-moi, où puis-je trouver le lait ?' },
          time: 'l\'après-midi',
          target: 'Entschuldigung, wo finde ich die Milch?',
          targetGloss: { fr: 'Excusez-moi, où se trouve le lait ?' },
          answerAlt: [
            'Die Milch finden Sie im Kühlregal.',
            'Die Milch steht im Gang drei.',
            'Fragen Sie bitte den Verkäufer.'
          ],
          answerKeywords: ['milch', 'finden', 'kühlregal'],
          words: [
            { word: 'die Milch', article: 'die', translation: 'le lait', ipa: 'mɪlç', example: 'Die Milch steht im Kühlregal.' }
          ],
          hint: { fr: 'Pour demander où se trouve un produit, utilise « Wo finde ich…? » ou « Wo ist…? ».' },
          example: { fr: 'Entschuldigung, wo finde ich die Milch?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Wie viel kostet ein Kilo Tomaten?' },
          gloss: { fr: 'Combien coûte un kilo de tomates ?' },
          time: 'l\'après-midi',
          target: 'Wie viel kostet ein Kilo Tomaten?',
          targetGloss: { fr: 'Combien coûte un kilo de tomates ?' },
          answerAlt: [
            'Ein Kilo Tomaten kostet zwei Euro.',
            'Die Tomaten kosten drei Euro pro Kilo.',
            'Ein Kilo kostet zweifünfzig.'
          ],
          answerKeywords: ['kostet', 'kilo', 'tomaten'],
          words: [
            { word: 'das Kilo', article: 'das', translation: 'le kilo', ipa: 'ˈkiːlo', example: 'Ein Kilo Äpfel, bitte.' }
          ],
          hint: { fr: '« kosten » s\'accorde avec le sujet : ein Kilo kostet, die Tomaten kosten.' },
          example: { fr: 'Wie viel kostet ein Kilo Tomaten?' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Möchten Sie sonst noch etwas?' },
          gloss: { fr: 'Désirez-vous autre chose ?' },
          time: 'l\'après-midi',
          target: 'Möchten Sie sonst noch etwas?',
          targetGloss: { fr: 'Souhaitez-vous encore autre chose ?' },
          answerAlt: [
            'Nein, danke, das ist alles.',
            'Ja, ich brauche noch ein Brot.',
            'Ich hätte gern noch zwei Äpfel.'
          ],
          answerKeywords: ['danke', 'alles', 'brot'],
          words: [
            { word: 'das Brot', article: 'das', translation: 'le pain', ipa: 'bʁoːt', example: 'Ich kaufe frisches Brot.' }
          ],
          hint: { fr: 'Pour refuser poliment, dis simplement : « Nein, danke, das ist alles. »' },
          example: { fr: 'Nein, danke, das ist alles.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Zahlen Sie bar oder mit Karte?' },
          gloss: { fr: 'Payez-vous en espèces ou par carte ?' },
          time: 'l\'après-midi',
          target: 'Zahlen Sie bar oder mit Karte?',
          targetGloss: { fr: 'Réglez-vous en espèces ou par carte ?' },
          answerAlt: [
            'Ich zahle mit Karte.',
            'Ich zahle bar.',
            'Kann ich mit Karte zahlen?'
          ],
          answerKeywords: ['zahle', 'karte', 'bar'],
          words: [
            { word: 'die Karte', article: 'die', translation: 'la carte bancaire', ipa: 'ˈkaʁtə', example: 'Ich zahle mit Karte.' }
          ],
          hint: { fr: '« mit Karte zahlen » = payer par carte ; « bar zahlen » = payer en espèces.' },
          example: { fr: 'Ich zahle mit Karte.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Brauchen Sie eine Tüte?' },
          gloss: { fr: 'Avez-vous besoin d\'un sac ?' },
          time: 'l\'après-midi',
          target: 'Brauchen Sie eine Tüte?',
          targetGloss: { fr: 'Vous faut-il un sac ?' },
          answerAlt: [
            'Nein, danke, ich habe eine Tasche dabei.',
            'Ja, bitte eine Tüte.',
            'Ich brauche keine Tüte.'
          ],
          answerKeywords: ['brauche', 'tüte', 'tasche'],
          words: [
            { word: 'die Tüte', article: 'die', translation: 'le sac (en plastique)', ipa: 'ˈtyːtə', example: 'Brauchen Sie eine Tüte?' }
          ],
          hint: { fr: '« brauchen » demande l\'accusatif : ich brauche eine Tüte, ich brauche keinen Beutel.' },
          example: { fr: 'Nein, danke, ich habe eine Tasche dabei.' }
        }
      ],
      vocabulary: [
        { word: 'der Einkaufswagen', article: 'der', translation: 'le chariot', ipa: 'ˈaɪnkaʊfsˌvaːɡn̩', example: 'Ich nehme einen Einkaufswagen.' },
        { word: 'die Milch', article: 'die', translation: 'le lait', ipa: 'mɪlç', example: 'Die Milch ist im Kühlregal.' },
        { word: 'das Brot', article: 'das', translation: 'le pain', ipa: 'bʁoːt', example: 'Das Brot ist frisch.' },
        { word: 'das Kilo', article: 'das', translation: 'le kilo', ipa: 'ˈkiːlo', example: 'Ein Kilo Tomaten, bitte.' },
        { word: 'der Preis', article: 'der', translation: 'le prix', ipa: 'pʁaɪs', example: 'Der Preis ist günstig.' },
        { word: 'die Kasse', article: 'die', translation: 'la caisse', ipa: 'ˈkasə', example: 'Die Kasse ist dort hinten.' },
        { word: 'die Tüte', article: 'die', translation: 'le sac', ipa: 'ˈtyːtə', example: 'Eine Tüte kostet zwanzig Cent.' },
        { word: 'zahlen', article: '', translation: 'payer', ipa: 'ˈtsaːlən', example: 'Ich zahle an der Kasse.' },
        { word: 'kaufen', article: '', translation: 'acheter', ipa: 'ˈkaʊfn̩', example: 'Ich kaufe Obst und Gemüse.' },
        { word: 'das Kühlregal', article: 'das', translation: 'le rayon réfrigéré', ipa: 'ˈkyːlʁeˌɡaːl', example: 'Der Käse liegt im Kühlregal.' }
      ],
      tip: { fr: 'Le « ü » de « Tüte » et « Kühlregal » se prononce avec les lèvres arrondies, comme un « u » français. Le « z » de « zahlen » se dit « ts » : [ˈtsaːlən].' }
    },

    /* ---------------------------------------------------------------- 9 */
    {
      id: 'hotel',
      lang: 'de',
      level: 'A2',
      order: 9,
      topic: { fr: 'À l\'hôtel' },
      title: { fr: 'Ein Zimmer reservieren' },
      subtitle: { fr: 'Réserve une chambre et pose les bonnes questions.' },
      emoji: '🏨',
      minutes: 5,
      situation: { fr: 'Tu appelles la réception d\'un hôtel à Hambourg pour réserver une chambre pour le week-end.' },
      routine: { fr: 'Demande s\'il reste une chambre, fais préciser le prix par nuit, vérifie ce qui est inclus, annonce ton heure d\'arrivée puis demande le wifi.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Haben Sie noch ein Zimmer frei?' },
          gloss: { fr: 'Avez-vous encore une chambre libre ?' },
          time: 'l\'après-midi',
          target: 'Haben Sie noch ein Zimmer frei?',
          targetGloss: { fr: 'Vous reste-t-il une chambre disponible ?' },
          answerAlt: [
            'Ja, wir haben noch ein Doppelzimmer frei.',
            'Leider sind wir ausgebucht.',
            'Für wie viele Nächte brauchen Sie das Zimmer?'
          ],
          answerKeywords: ['zimmer', 'frei', 'doppelzimmer'],
          words: [
            { word: 'das Zimmer', article: 'das', translation: 'la chambre', ipa: 'ˈtsɪmɐ', example: 'Das Zimmer ist sehr ruhig.' }
          ],
          hint: { fr: 'Pour demander une disponibilité : « Haben Sie noch … frei? » Le verbe « frei haben » se sépare.' },
          example: { fr: 'Haben Sie noch ein Zimmer frei?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Was kostet das Zimmer pro Nacht?' },
          gloss: { fr: 'Combien coûte la chambre par nuit ?' },
          time: 'l\'après-midi',
          target: 'Was kostet das Zimmer pro Nacht?',
          targetGloss: { fr: 'Quel est le prix de la chambre par nuit ?' },
          answerAlt: [
            'Das Zimmer kostet achtzig Euro pro Nacht.',
            'Ein Einzelzimmer kostet sechzig Euro die Nacht.',
            'Der Preis liegt bei neunzig Euro pro Nacht.'
          ],
          answerKeywords: ['kostet', 'nacht', 'zimmer'],
          words: [
            { word: 'die Nacht', article: 'die', translation: 'la nuit', ipa: 'naxt', example: 'Wir bleiben zwei Nächte.' }
          ],
          hint: { fr: '« pro Nacht » = par nuit ; le pluriel de « die Nacht » est « die Nächte ».' },
          example: { fr: 'Was kostet das Zimmer pro Nacht?' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Ist das Frühstück inklusive?' },
          gloss: { fr: 'Le petit-déjeuner est-il inclus ?' },
          time: 'le matin',
          target: 'Ist das Frühstück inklusive?',
          targetGloss: { fr: 'Le petit-déjeuner est-il compris ?' },
          answerAlt: [
            'Ja, das Frühstück ist im Preis enthalten.',
            'Nein, das Frühstück kostet zwölf Euro extra.',
            'Das Frühstücksbuffet ist inklusive.'
          ],
          answerKeywords: ['frühstück', 'inklusive', 'enthalten'],
          words: [
            { word: 'das Frühstück', article: 'das', translation: 'le petit-déjeuner', ipa: 'ˈfʁyːʃtʏk', example: 'Das Frühstück ist im Preis enthalten.' }
          ],
          hint: { fr: '« inklusive » et « im Preis enthalten » signifient tous les deux « inclus dans le prix ».' },
          example: { fr: 'Ist das Frühstück inklusive?' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Wann können Sie anreisen?' },
          gloss: { fr: 'Quand pouvez-vous arriver ?' },
          time: 'l\'après-midi',
          target: 'Wann können Sie anreisen?',
          targetGloss: { fr: 'À quelle heure pouvez-vous arriver ?' },
          answerAlt: [
            'Ich komme gegen achtzehn Uhr an.',
            'Ich reise am Freitagabend an.',
            'Wir kommen um vierzehn Uhr an.'
          ],
          answerKeywords: ['komme', 'uhr', 'freitagabend'],
          words: [
            { word: 'anreisen', article: '', translation: 'arriver (en voyage)', ipa: 'ˈanˌʁaɪzn̩', example: 'Wir reisen am Freitag an.' }
          ],
          hint: { fr: '« anreisen » est séparable : ich reise an, ich komme an. Le préfixe part à la fin de la phrase.' },
          example: { fr: 'Ich komme gegen achtzehn Uhr an.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Wie lautet das WLAN-Passwort?' },
          gloss: { fr: 'Quel est le mot de passe du wifi ?' },
          time: 'l\'après-midi',
          target: 'Wie lautet das WLAN-Passwort?',
          targetGloss: { fr: 'Quel est le mot de passe du réseau wifi ?' },
          answerAlt: [
            'Das Passwort steht auf der Zimmerkarte.',
            'Das WLAN ist kostenlos.',
            'Das Passwort lautet Berlin2024.'
          ],
          answerKeywords: ['passwort', 'wlan', 'zimmerkarte'],
          words: [
            { word: 'das Passwort', article: 'das', translation: 'le mot de passe', ipa: 'ˈpasvɔʁt', example: 'Wie lautet das Passwort?' }
          ],
          hint: { fr: '« Wie lautet…? » est la tournure formelle pour demander un mot de passe ou un nom.' },
          example: { fr: 'Wie lautet das WLAN-Passwort?' }
        }
      ],
      vocabulary: [
        { word: 'das Hotel', article: 'das', translation: 'l\'hôtel', ipa: 'hoˈtɛl', example: 'Das Hotel liegt am Hafen.' },
        { word: 'das Zimmer', article: 'das', translation: 'la chambre', ipa: 'ˈtsɪmɐ', example: 'Das Zimmer hat einen Balkon.' },
        { word: 'das Doppelzimmer', article: 'das', translation: 'la chambre double', ipa: 'ˈdɔpl̩ˌtsɪmɐ', example: 'Wir brauchen ein Doppelzimmer.' },
        { word: 'die Nacht', article: 'die', translation: 'la nuit', ipa: 'naxt', example: 'Die Nacht war sehr ruhig.' },
        { word: 'der Preis', article: 'der', translation: 'le prix', ipa: 'pʁaɪs', example: 'Der Preis ist akzeptabel.' },
        { word: 'das Frühstück', article: 'das', translation: 'le petit-déjeuner', ipa: 'ˈfʁyːʃtʏk', example: 'Das Frühstück beginnt um sieben Uhr.' },
        { word: 'die Rezeption', article: 'die', translation: 'la réception', ipa: 'ʁetsɛpˈtsi̯oːn', example: 'Die Rezeption ist rund um die Uhr besetzt.' },
        { word: 'anreisen', article: '', translation: 'arriver (voyage)', ipa: 'ˈanˌʁaɪzn̩', example: 'Wir reisen am Samstag an.' },
        { word: 'inklusive', article: '', translation: 'inclus', ipa: 'ɪnkluˈziːvə', example: 'Das Frühstück ist inklusive.' },
        { word: 'die Rechnung', article: 'die', translation: 'la facture', ipa: 'ˈʁɛçnʊŋ', example: 'Die Rechnung bekommen Sie beim Check-out.' }
      ],
      tip: { fr: 'Le « h » de « Hotel » est aspiré : on le prononce [hoˈtɛl]. Le « z » de « Zimmer » se dit « ts » : [ˈtsɪmɐ].' }
    },

    /* ---------------------------------------------------------------- 10 */
    {
      id: 'meteo-saisons',
      lang: 'de',
      level: 'A1',
      order: 10,
      topic: { fr: 'La météo et les saisons' },
      title: { fr: 'Wetter und Jahreszeiten' },
      subtitle: { fr: 'Parle du temps qu\'il fait et de ta saison préférée.' },
      emoji: '☀️',
      minutes: 4,
      situation: { fr: 'Tu discutes avec un ami allemand devant un café : vous parlez du temps et de vos saisons préférées.' },
      routine: { fr: 'Décris le temps du jour, donne la température, dis quelle saison tu préfères, raconte une activité puis parle de la neige.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Wie ist das Wetter heute?' },
          gloss: { fr: 'Quel temps fait-il aujourd\'hui ?' },
          time: 'à tout moment',
          target: 'Wie ist das Wetter heute?',
          targetGloss: { fr: 'Quel temps fait-il aujourd\'hui ?' },
          answerAlt: [
            'Heute ist es sonnig.',
            'Es regnet gerade.',
            'Das Wetter ist schön.'
          ],
          answerKeywords: ['wetter', 'sonnig', 'regnet'],
          words: [
            { word: 'das Wetter', article: 'das', translation: 'le temps (météo)', ipa: 'ˈvɛtɐ', example: 'Das Wetter ist heute schön.' }
          ],
          hint: { fr: 'Pour la météo, on utilise « es ist… » : es ist sonnig, es ist kalt, es ist windig.' },
          example: { fr: 'Wie ist das Wetter heute?' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Wie viel Grad sind es?' },
          gloss: { fr: 'Combien de degrés fait-il ?' },
          time: 'à tout moment',
          target: 'Wie viel Grad sind es?',
          targetGloss: { fr: 'Il fait combien de degrés ?' },
          answerAlt: [
            'Es sind zwanzig Grad.',
            'Heute sind es nur fünf Grad.',
            'Es ist sehr warm, etwa dreißig Grad.'
          ],
          answerKeywords: ['grad', 'sind', 'zwanzig'],
          words: [
            { word: 'der Grad', article: 'der', translation: 'le degré', ipa: 'ɡʁaːt', example: 'Es sind zwanzig Grad.' }
          ],
          hint: { fr: 'On dit « es sind … Grad » ou « es ist … Grad » ; « Grad » ne change pas au pluriel.' },
          example: { fr: 'Es sind zwanzig Grad.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Welche Jahreszeit magst du am liebsten?' },
          gloss: { fr: 'Quelle saison préfères-tu ?' },
          time: 'à tout moment',
          target: 'Welche Jahreszeit magst du am liebsten?',
          targetGloss: { fr: 'Quelle saison aimes-tu le plus ?' },
          answerAlt: [
            'Ich mag den Sommer am liebsten.',
            'Im Winter ist es mir zu kalt.',
            'Ich liebe den Herbst.'
          ],
          answerKeywords: ['sommer', 'mag', 'liebsten'],
          words: [
            { word: 'die Jahreszeit', article: 'die', translation: 'la saison', ipa: 'ˈjaːʁəsˌtsaɪt', example: 'Der Herbst ist meine liebste Jahreszeit.' }
          ],
          hint: { fr: '« am liebsten » = le plus : ich mag den Sommer am liebsten. Le verbe « mögen » devient « mag ».' },
          example: { fr: 'Ich mag den Sommer am liebsten.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Was machst du bei schönem Wetter?' },
          gloss: { fr: 'Que fais-tu quand il fait beau ?' },
          time: 'à tout moment',
          target: 'Was machst du bei schönem Wetter?',
          targetGloss: { fr: 'Que fais-tu par beau temps ?' },
          answerAlt: [
            'Bei schönem Wetter gehe ich spazieren.',
            'Ich fahre mit dem Fahrrad.',
            'Ich sitze gern im Garten.'
          ],
          answerKeywords: ['wetter', 'gehe', 'fahrrad'],
          words: [
            { word: 'spazieren gehen', article: '', translation: 'se promener', ipa: 'ʃpaˈtsiːʁən ˌɡeːən', example: 'Ich gehe im Park spazieren.' }
          ],
          hint: { fr: '« bei schönem Wetter » reste sans article : bei + adjectif au datif.' },
          example: { fr: 'Bei schönem Wetter gehe ich spazieren.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Schneit es im Winter?' },
          gloss: { fr: 'Neige-t-il en hiver ?' },
          time: 'l\'hiver',
          target: 'Schneit es im Winter?',
          targetGloss: { fr: 'Est-ce qu\'il neige en hiver ?' },
          answerAlt: [
            'Ja, im Winter schneit es oft.',
            'Nein, hier schneit es selten.',
            'Manchmal schneit es im Dezember.'
          ],
          answerKeywords: ['schneit', 'winter', 'oft'],
          words: [
            { word: 'schneien', article: '', translation: 'neiger', ipa: 'ˈʃnaɪən', example: 'Im Januar schneit es oft.' }
          ],
          hint: { fr: '« es schneit » = il neige ; « es regnet » = il pleut. Le sujet est toujours « es ».' },
          example: { fr: 'Im Winter schneit es oft.' }
        }
      ],
      vocabulary: [
        { word: 'das Wetter', article: 'das', translation: 'le temps (météo)', ipa: 'ˈvɛtɐ', example: 'Das Wetter ändert sich schnell.' },
        { word: 'die Sonne', article: 'die', translation: 'le soleil', ipa: 'ˈzɔnə', example: 'Die Sonne scheint den ganzen Tag.' },
        { word: 'der Regen', article: 'der', translation: 'la pluie', ipa: 'ˈʁeːɡn̩', example: 'Der Regen hört bald auf.' },
        { word: 'der Schnee', article: 'der', translation: 'la neige', ipa: 'ʃneː', example: 'Der Schnee liegt hoch.' },
        { word: 'der Wind', article: 'der', translation: 'le vent', ipa: 'vɪnt', example: 'Der Wind ist heute stark.' },
        { word: 'die Jahreszeit', article: 'die', translation: 'la saison', ipa: 'ˈjaːʁəsˌtsaɪt', example: 'Der Frühling ist eine schöne Jahreszeit.' },
        { word: 'der Sommer', article: 'der', translation: 'l\'été', ipa: 'ˈzɔmɐ', example: 'Im Sommer fahren wir ans Meer.' },
        { word: 'der Winter', article: 'der', translation: 'l\'hiver', ipa: 'ˈvɪntɐ', example: 'Der Winter ist hier sehr kalt.' },
        { word: 'warm', article: '', translation: 'chaud', ipa: 'vaʁm', example: 'Heute ist es sehr warm.' },
        { word: 'kalt', article: '', translation: 'froid', ipa: 'kalt', example: 'Im Dezember ist es kalt.' }
      ],
      tip: { fr: 'Le « w » allemand se prononce comme un « v » français : « Wetter » = [ˈvɛtɐ], « Wind » = [vɪnt]. Le « ie » se dit « i » long.' }
    },

    /* ---------------------------------------------------------------- 11 */
    {
      id: 'appartement',
      lang: 'de',
      level: 'B1',
      order: 11,
      topic: { fr: 'Chercher un logement' },
      title: { fr: 'Eine Wohnung suchen' },
      subtitle: { fr: 'Pose les bonnes questions sur une annonce immobilière.' },
      emoji: '🏠',
      minutes: 6,
      situation: { fr: 'Tu as repéré une annonce immobilière à Leipzig et tu appelles le propriétaire pour visiter l\'appartement.' },
      routine: { fr: 'Vérifie que l\'annonce est toujours valable, demande la surface, le loyer, décris le quartier souhaité puis propose une date de visite.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Ich habe Ihre Anzeige gelesen. Ist die Wohnung noch frei?' },
          gloss: { fr: 'J\'ai lu votre annonce. L\'appartement est-il encore libre ?' },
          time: 'le matin',
          target: 'Ich habe Ihre Anzeige gelesen. Ist die Wohnung noch frei?',
          targetGloss: { fr: 'J\'ai lu votre annonce. Le logement est-il toujours disponible ?' },
          answerAlt: [
            'Ja, die Wohnung ist noch frei.',
            'Leider ist sie schon vergeben.',
            'Die Wohnung ist ab dem ersten Mai frei.'
          ],
          answerKeywords: ['wohnung', 'frei', 'anzeige'],
          words: [
            { word: 'die Anzeige', article: 'die', translation: 'l\'annonce', ipa: 'ˈantsaɪɡə', example: 'Ich habe Ihre Anzeige gelesen.' }
          ],
          hint: { fr: 'Pour ouvrir la conversation, reprends l\'annonce : « Ich habe Ihre Anzeige gelesen. »' },
          example: { fr: 'Ich habe Ihre Anzeige gelesen.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Wie viele Quadratmeter hat die Wohnung?' },
          gloss: { fr: 'Combien de mètres carrés fait l\'appartement ?' },
          time: 'le matin',
          target: 'Wie viele Quadratmeter hat die Wohnung?',
          targetGloss: { fr: 'Quelle est la surface de l\'appartement ?' },
          answerAlt: [
            'Die Wohnung hat achtzig Quadratmeter.',
            'Sie hat etwa fünfundsiebzig Quadratmeter.',
            'Die Wohnfläche beträgt neunzig Quadratmeter.'
          ],
          answerKeywords: ['quadratmeter', 'wohnung', 'achtzig'],
          words: [
            { word: 'der Quadratmeter', article: 'der', translation: 'le mètre carré', ipa: 'kvaˈdʁaːtˌmeːtɐ', example: 'Die Wohnung hat achtzig Quadratmeter.' }
          ],
          hint: { fr: '« die Wohnfläche » désigne la surface habitable ; « betragen » signifie s\'élever à (pour un montant).' },
          example: { fr: 'Wie viele Quadratmeter hat die Wohnung?' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Wie hoch ist die Miete?' },
          gloss: { fr: 'Quel est le montant du loyer ?' },
          time: 'le matin',
          target: 'Wie hoch ist die Miete?',
          targetGloss: { fr: 'À combien s\'élève le loyer ?' },
          answerAlt: [
            'Die Miete beträgt neunhundert Euro.',
            'Die Miete liegt bei tausend Euro warm.',
            'Die Kaltmiete beträgt achthundert Euro.'
          ],
          answerKeywords: ['miete', 'hoch', 'neunhundert'],
          words: [
            { word: 'die Miete', article: 'die', translation: 'le loyer', ipa: 'ˈmiːtə', example: 'Die Miete ist fair.' }
          ],
          hint: { fr: 'En Allemagne, on distingue « Kaltmiete » (loyer hors charges) et « Warmmiete » (charges comprises).' },
          example: { fr: 'Wie hoch ist die Miete?' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Wie ist die Lage im Viertel?' },
          gloss: { fr: 'Comment est la situation dans le quartier ?' },
          time: 'le matin',
          target: 'Wie ist die Lage im Viertel?',
          targetGloss: { fr: 'Quel est l\'emplacement dans le quartier ?' },
          answerAlt: [
            'Das Viertel ist sehr ruhig.',
            'Die Lage ist zentral und gut angebunden.',
            'Es gibt viele Geschäfte in der Nähe.'
          ],
          answerKeywords: ['viertel', 'ruhig', 'lage'],
          words: [
            { word: 'das Viertel', article: 'das', translation: 'le quartier', ipa: 'ˈfɪʁtl̩', example: 'Das Viertel ist sehr ruhig.' }
          ],
          hint: { fr: '« die Lage » = la situation, l\'emplacement ; « gut angebunden » = bien desservi par les transports.' },
          example: { fr: 'Wie ist die Lage im Viertel?' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Wann können wir die Wohnung besichtigen?' },
          gloss: { fr: 'Quand pouvons-nous visiter l\'appartement ?' },
          time: 'le matin',
          target: 'Wann können wir die Wohnung besichtigen?',
          targetGloss: { fr: 'Quand pouvons-nous visiter le logement ?' },
          answerAlt: [
            'Wir können sie am Samstag besichtigen.',
            'Passt Ihnen Donnerstag um fünfzehn Uhr?',
            'Die Besichtigung ist nächste Woche möglich.'
          ],
          answerKeywords: ['besichtigen', 'samstag', 'besichtigung'],
          words: [
            { word: 'besichtigen', article: '', translation: 'visiter (un logement)', ipa: 'bəˈzɪçtɪɡn̩', example: 'Wann können wir die Wohnung besichtigen?' }
          ],
          hint: { fr: '« besichtigen » = visiter un lieu en détail ; « besuchen » = rendre visite à quelqu\'un.' },
          example: { fr: 'Wann können wir die Wohnung besichtigen?' }
        }
      ],
      vocabulary: [
        { word: 'die Wohnung', article: 'die', translation: 'l\'appartement', ipa: 'ˈvoːnʊŋ', example: 'Die Wohnung liegt im dritten Stock.' },
        { word: 'die Miete', article: 'die', translation: 'le loyer', ipa: 'ˈmiːtə', example: 'Die Miete steigt jedes Jahr.' },
        { word: 'die Anzeige', article: 'die', translation: 'l\'annonce', ipa: 'ˈantsaɪɡə', example: 'Die Anzeige ist online.' },
        { word: 'der Quadratmeter', article: 'der', translation: 'le mètre carré', ipa: 'kvaˈdʁaːtˌmeːtɐ', example: 'Der Preis pro Quadratmeter ist hoch.' },
        { word: 'das Viertel', article: 'das', translation: 'le quartier', ipa: 'ˈfɪʁtl̩', example: 'Das Viertel ist lebendig.' },
        { word: 'die Lage', article: 'die', translation: 'la situation, l\'emplacement', ipa: 'ˈlaːɡə', example: 'Die Lage ist ideal.' },
        { word: 'besichtigen', article: '', translation: 'visiter', ipa: 'bəˈzɪçtɪɡn̩', example: 'Wir besichtigen die Wohnung morgen.' },
        { word: 'der Mietvertrag', article: 'der', translation: 'le contrat de location', ipa: 'ˈmiːtfɛɐ̯ˌtʁaːk', example: 'Der Mietvertrag gilt drei Jahre.' },
        { word: 'die Nebenkosten', article: 'die', translation: 'les charges', ipa: 'ˈneːbn̩ˌkɔstn̩', example: 'Die Nebenkosten sind im Preis enthalten.' },
        { word: 'umziehen', article: '', translation: 'déménager', ipa: 'ˈʊmˌtsiːən', example: 'Wir ziehen im Juli um.' }
      ],
      tip: { fr: 'Le « v » de « Viertel » et « Vertrag » se prononce « f » : [ˈfɪʁtl̩]. Dans « Quadratmeter », « qu » se dit [kv] : [kvaˈdʁaːtˌmeːtɐ].' }
    },

    /* ---------------------------------------------------------------- 12 */
    {
      id: 'telephone',
      lang: 'de',
      level: 'B1',
      order: 12,
      topic: { fr: 'Au téléphone' },
      title: { fr: 'Ein Telefongespräch führen' },
      subtitle: { fr: 'Présente-toi, explique ta demande et prends rendez-vous.' },
      emoji: '📞',
      minutes: 6,
      situation: { fr: 'Tu appelles une entreprise allemande : la standardiste te passe le service concerné et tu dois exposer ta demande.' },
      routine: { fr: 'Présente-toi, explique pourquoi tu appelles, fixe un rendez-vous, décris ton problème puis demande à être rappelé.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Guten Tag, hier ist Anna Müller. Kann ich mit Herrn Weber sprechen?' },
          gloss: { fr: 'Bonjour, ici Anna Müller. Puis-je parler à M. Weber ?' },
          time: 'le matin',
          target: 'Guten Tag, hier ist Anna Müller. Kann ich mit Herrn Weber sprechen?',
          targetGloss: { fr: 'Bonjour, ici Anna Müller. Pourrais-je parler à Monsieur Weber ?' },
          answerAlt: [
            'Ja, einen Moment bitte, ich verbinde Sie.',
            'Herr Weber ist gerade im Meeting.',
            'Am Apparat, was kann ich für Sie tun?'
          ],
          answerKeywords: ['sprechen', 'müller', 'apparat'],
          words: [
            { word: 'der Apparat', article: 'der', translation: 'l\'appareil (téléphone)', ipa: 'apaˈʁaːt', example: 'Wer ist am Apparat?' }
          ],
          hint: { fr: 'Au téléphone, on dit « hier ist… » et non « ich bin… » ; « Am Apparat » signifie « à l\'appareil ».' },
          example: { fr: 'Guten Tag, hier ist Anna Müller.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Was ist der Grund Ihres Anrufs?' },
          gloss: { fr: 'Quel est le motif de votre appel ?' },
          time: 'le matin',
          target: 'Was ist der Grund Ihres Anrufs?',
          targetGloss: { fr: 'Pour quelle raison appelez-vous ?' },
          answerAlt: [
            'Ich rufe wegen meiner Bestellung an.',
            'Ich möchte einen Termin vereinbaren.',
            'Es geht um die Rechnung vom letzten Monat.'
          ],
          answerKeywords: ['anrufs', 'rufe', 'bestellung'],
          words: [
            { word: 'der Anruf', article: 'der', translation: 'l\'appel', ipa: 'ˈanʁuːf', example: 'Vielen Dank für Ihren Anruf.' }
          ],
          hint: { fr: '« der Grund Ihres Anrufs » est au génitif : Ihr Anruf devient Ihres Anrufs.' },
          example: { fr: 'Ich rufe wegen meiner Bestellung an.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Wann hätten Sie Zeit für einen Termin?' },
          gloss: { fr: 'Quand auriez-vous le temps pour un rendez-vous ?' },
          time: 'le matin',
          target: 'Wann hätten Sie Zeit für einen Termin?',
          targetGloss: { fr: 'Quand auriez-vous de la disponibilité pour un rendez-vous ?' },
          answerAlt: [
            'Hätten Sie am Dienstag um zehn Uhr Zeit?',
            'Mir passt es am Nachmittag besser.',
            'Ich hätte gern einen Termin nächste Woche.'
          ],
          answerKeywords: ['termin', 'dienstag', 'zeit'],
          words: [
            { word: 'der Termin', article: 'der', translation: 'le rendez-vous', ipa: 'tɛʁˈmiːn', example: 'Ich hätte gern einen Termin.' }
          ],
          hint: { fr: 'Le conditionnel « hätten » rend la demande polie : Wann hätten Sie Zeit?' },
          example: { fr: 'Hätten Sie am Dienstag um zehn Uhr Zeit?' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Können Sie das Problem genauer beschreiben?' },
          gloss: { fr: 'Pouvez-vous décrire le problème plus précisément ?' },
          time: 'le matin',
          target: 'Können Sie das Problem genauer beschreiben?',
          targetGloss: { fr: 'Pourriez-vous décrire le problème avec plus de détails ?' },
          answerAlt: [
            'Mein Internet funktioniert seit gestern nicht.',
            'Ich habe die Bestellung nie erhalten.',
            'Das Gerät lässt sich nicht mehr einschalten.'
          ],
          answerKeywords: ['internet', 'problem', 'bestellung'],
          words: [
            { word: 'beschreiben', article: '', translation: 'décrire', ipa: 'bəˈʃʁaɪbn̩', example: 'Können Sie das Problem beschreiben?' }
          ],
          hint: { fr: '« beschreiben » est un verbe fort : beschreiben, beschrieb, hat beschrieben.' },
          example: { fr: 'Können Sie das Problem genauer beschreiben?' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Kann ich Sie später zurückrufen?' },
          gloss: { fr: 'Puis-je vous rappeler plus tard ?' },
          time: 'le soir',
          target: 'Kann ich Sie später zurückrufen?',
          targetGloss: { fr: 'Est-ce que je peux vous rappeler plus tard ?' },
          answerAlt: [
            'Ja, rufen Sie mich bitte heute Abend zurück.',
            'Meine Nummer ist null eins sieben sechs.',
            'Ja, ich bin ab sechzehn Uhr erreichbar.'
          ],
          answerKeywords: ['zurückrufen', 'nummer', 'abend'],
          words: [
            { word: 'zurückrufen', article: '', translation: 'rappeler (au téléphone)', ipa: 'tsuˈʁʏkˌʁuːfn̩', example: 'Ich rufe Sie später zurück.' }
          ],
          hint: { fr: '« zurückrufen » est séparable : ich rufe Sie zurück. Le préfixe « zurück » va à la fin.' },
          example: { fr: 'Ja, rufen Sie mich bitte heute Abend zurück.' }
        }
      ],
      vocabulary: [
        { word: 'der Anruf', article: 'der', translation: 'l\'appel', ipa: 'ˈanʁuːf', example: 'Der Anruf kam um acht Uhr.' },
        { word: 'anrufen', article: '', translation: 'appeler (au téléphone)', ipa: 'ˈanˌʁuːfn̩', example: 'Ich rufe dich morgen an.' },
        { word: 'zurückrufen', article: '', translation: 'rappeler', ipa: 'tsuˈʁʏkˌʁuːfn̩', example: 'Ich rufe Sie später zurück.' },
        { word: 'der Termin', article: 'der', translation: 'le rendez-vous', ipa: 'tɛʁˈmiːn', example: 'Der Termin ist am Dienstag.' },
        { word: 'die Nummer', article: 'die', translation: 'le numéro', ipa: 'ˈnʊmɐ', example: 'Meine Nummer steht auf der Rechnung.' },
        { word: 'der Apparat', article: 'der', translation: 'l\'appareil', ipa: 'apaˈʁaːt', example: 'Wer ist am Apparat?' },
        { word: 'verbinden', article: '', translation: 'mettre en relation (téléphone)', ipa: 'fɛɐ̯ˈbɪndn̩', example: 'Ich verbinde Sie mit dem Service.' },
        { word: 'die Nachricht', article: 'die', translation: 'le message', ipa: 'ˈnaːxʁɪçt', example: 'Ich hinterlasse eine Nachricht.' },
        { word: 'erreichbar', article: '', translation: 'joignable', ipa: 'ɛɐ̯ˈʁaɪçbaːɐ̯', example: 'Ich bin ab neun Uhr erreichbar.' },
        { word: 'die Verbindung', article: 'die', translation: 'la communication (téléphonique)', ipa: 'fɛɐ̯ˈbɪndʊŋ', example: 'Die Verbindung ist schlecht.' }
      ],
      tip: { fr: 'Dans « zurückrufen », le « ü » est arrondi et le « ch » doux : [tsuˈʁʏkˌʁuːfn̩]. Le verbe séparable rejette son préfixe en fin de phrase.' }
    },

    /* ---------------------------------------------------------------- 13 */
    {
      id: 'reclamation',
      lang: 'de',
      level: 'B2',
      order: 13,
      topic: { fr: 'Réclamation au service client' },
      title: { fr: 'Eine Beschwerde vorbringen' },
      subtitle: { fr: 'Décris le problème, argumente et propose une solution.' },
      emoji: '🧾',
      minutes: 7,
      situation: { fr: 'Ta commande est arrivée abîmée : tu appelles le service client pour obtenir une solution.' },
      routine: { fr: 'Décris précisément le dommage, fournis tes références, expose ta demande, réponds à la contre-proposition puis conclus.' },
      questions: [
        {
          id: 'q1',
          n: 1,
          text: { fr: 'Was genau ist das Problem mit Ihrer Bestellung?' },
          gloss: { fr: 'Quel est exactement le problème avec votre commande ?' },
          time: 'le matin',
          target: 'Was genau ist das Problem mit Ihrer Bestellung?',
          targetGloss: { fr: 'Quel est précisément le problème concernant votre commande ?' },
          answerAlt: [
            'Die Lieferung ist beschädigt bei mir angekommen.',
            'Ich habe einen falschen Artikel erhalten.',
            'Zwei Teile fehlen in der Lieferung.'
          ],
          answerKeywords: ['lieferung', 'beschädigt', 'artikel'],
          words: [
            { word: 'die Lieferung', article: 'die', translation: 'la livraison', ipa: 'ˈliːfəʁʊŋ', example: 'Die Lieferung kam gestern an.' }
          ],
          hint: { fr: 'Commence par un constat factuel : « Die Lieferung ist beschädigt angekommen. »' },
          example: { fr: 'Die Lieferung ist beschädigt bei mir angekommen.' }
        },
        {
          id: 'q2',
          n: 2,
          text: { fr: 'Haben Sie die Rechnung und die Bestellnummer zur Hand?' },
          gloss: { fr: 'Avez-vous la facture et le numéro de commande sous la main ?' },
          time: 'le matin',
          target: 'Haben Sie die Rechnung und die Bestellnummer zur Hand?',
          targetGloss: { fr: 'Avez-vous la facture et la référence de commande à portée de main ?' },
          answerAlt: [
            'Ja, die Bestellnummer lautet A vier sieben zwei.',
            'Ich habe die Rechnung bereits per E-Mail geschickt.',
            'Die Unterlagen habe ich leider nicht dabei.'
          ],
          answerKeywords: ['bestellnummer', 'rechnung', 'unterlagen'],
          words: [
            { word: 'die Bestellnummer', article: 'die', translation: 'le numéro de commande', ipa: 'bəˈʃtɛlˌnʊmɐ', example: 'Die Bestellnummer lautet A472.' }
          ],
          hint: { fr: 'Pour épeler un code au téléphone, cite les lettres et les chiffres un par un.' },
          example: { fr: 'Ja, die Bestellnummer lautet A472.' }
        },
        {
          id: 'q3',
          n: 3,
          text: { fr: 'Und was verlangen Sie nun von uns?' },
          gloss: { fr: 'Et qu\'attendez-vous de nous maintenant ?' },
          time: 'le matin',
          target: 'Und was verlangen Sie nun von uns?',
          targetGloss: { fr: 'Et que réclamez-vous de notre part à présent ?' },
          answerAlt: [
            'Ich verlange eine vollständige Rückerstattung.',
            'Ich möchte einen Ersatz oder mein Geld zurück.',
            'Ich erwarte eine angemessene Entschädigung.'
          ],
          answerKeywords: ['rückerstattung', 'verlange', 'entschädigung'],
          words: [
            { word: 'die Rückerstattung', article: 'die', translation: 'le remboursement', ipa: 'ˈʁʏkʔɛɐ̯ˌʃtatʊŋ', example: 'Ich möchte eine vollständige Rückerstattung.' }
          ],
          hint: { fr: 'Formule clairement ta demande : « Ich verlange… », « Ich erwarte… », « Ich möchte… ».' },
          example: { fr: 'Ich verlange eine vollständige Rückerstattung.' }
        },
        {
          id: 'q4',
          n: 4,
          text: { fr: 'Ich verstehe, aber wir können Ihnen nur einen Gutschein anbieten.' },
          gloss: { fr: 'Je comprends, mais nous ne pouvons vous proposer qu\'un bon d\'achat.' },
          time: 'le matin',
          target: 'Ich verstehe, aber wir können Ihnen nur einen Gutschein anbieten.',
          targetGloss: { fr: 'Je comprends, mais nous ne pouvons vous offrir qu\'un bon d\'achat.' },
          answerAlt: [
            'Ein Gutschein reicht mir nicht aus.',
            'Ich bestehe auf einer Rückerstattung.',
            'Das ist meiner Meinung nach keine faire Lösung.'
          ],
          answerKeywords: ['gutschein', 'rückerstattung', 'bestehe'],
          words: [
            { word: 'der Gutschein', article: 'der', translation: 'le bon d\'achat', ipa: 'ˈɡuːtʃaɪn', example: 'Ein Gutschein reicht mir nicht aus.' }
          ],
          hint: { fr: 'Pour argumenter, utilise « meiner Meinung nach » ou « ich bestehe auf… » suivi du datif.' },
          example: { fr: 'Ein Gutschein reicht mir nicht aus.' }
        },
        {
          id: 'q5',
          n: 5,
          text: { fr: 'Können wir uns auf einen Kompromiss einigen?' },
          gloss: { fr: 'Pouvons-nous nous mettre d\'accord sur un compromis ?' },
          time: 'le matin',
          target: 'Können wir uns auf einen Kompromiss einigen?',
          targetGloss: { fr: 'Pouvons-nous trouver un compromis ?' },
          answerAlt: [
            'Gut, ich akzeptiere den Gutschein unter einer Bedingung.',
            'Einigen wir uns auf eine teilweise Rückerstattung.',
            'Ich werde die Sache sonst weiterleiten.'
          ],
          answerKeywords: ['kompromiss', 'gutschein', 'einigen'],
          words: [
            { word: 'sich einigen', article: '', translation: 'se mettre d\'accord', ipa: 'ˈaɪnɪɡn̩', example: 'Können wir uns einigen?' }
          ],
          hint: { fr: '« sich einigen auf » demande l\'accusatif : wir einigen uns auf eine Rückerstattung.' },
          example: { fr: 'Können wir uns auf einen Kompromiss einigen?' }
        }
      ],
      vocabulary: [
        { word: 'die Beschwerde', article: 'die', translation: 'la réclamation', ipa: 'bəˈʃveːɐ̯də', example: 'Ich möchte eine Beschwerde einreichen.' },
        { word: 'die Reklamation', article: 'die', translation: 'la réclamation (commerciale)', ipa: 'ʁeklamaˈtsi̯oːn', example: 'Die Reklamation wurde bearbeitet.' },
        { word: 'die Lieferung', article: 'die', translation: 'la livraison', ipa: 'ˈliːfəʁʊŋ', example: 'Die Lieferung war unvollständig.' },
        { word: 'der Umtausch', article: 'der', translation: 'l\'échange', ipa: 'ˈʊmtaʊʃ', example: 'Der Umtausch ist kostenlos.' },
        { word: 'die Rückerstattung', article: 'die', translation: 'le remboursement', ipa: 'ˈʁʏkʔɛɐ̯ˌʃtatʊŋ', example: 'Die Rückerstattung dauert eine Woche.' },
        { word: 'der Gutschein', article: 'der', translation: 'le bon d\'achat', ipa: 'ˈɡuːtʃaɪn', example: 'Der Gutschein gilt ein Jahr.' },
        { word: 'der Mangel', article: 'der', translation: 'le défaut', ipa: 'ˈmaŋl̩', example: 'Der Mangel ist offensichtlich.' },
        { word: 'beschädigt', article: '', translation: 'endommagé', ipa: 'bəˈʃɛːdɪçt', example: 'Das Paket kam beschädigt an.' },
        { word: 'reklamieren', article: '', translation: 'réclamer', ipa: 'ʁeklaˈmiːʁən', example: 'Ich möchte den Artikel reklamieren.' },
        { word: 'die Entschädigung', article: 'die', translation: 'l\'indemnisation', ipa: 'ɛntˈʃɛːdɪɡʊŋ', example: 'Ich erwarte eine Entschädigung.' }
      ],
      tip: { fr: 'Le « ch » de « Beschwerde » se prononce [ʃ], comme le « ch » français : [bəˈʃveːɐ̯də]. Dans « Entschädigung », le préfixe « ent- » se dit [ɛnt].' }
    }

  ];

  global.SK = global.SK || {};
  global.SK.MISSIONS_EXTRA2 = MISSIONS;
})(typeof window !== 'undefined' ? window : this);
