/* ==========================================================================
   SPEAKLY — 000-pron-dialogues.js
   Données de contenu : écran Prononciation (SK.PRONUNCIATION)
                        écran Conversation (SK.CONVERSATIONS)
   Contrat : voir js/data/content.js (PronItem, Dialogue, Turn).
   Fichier autonome, IIFE, 'use strict'. Aucune dépendance.
   ========================================================================== */
(function () {
  'use strict';

  var pronunciation = {
    /* ---------------------------------------------------------------- DE */
    de: [
      { word: 'Straße', ipa: 'ˈʃtʁaːsə', translation: 'rue', tip: 'Le « s » de Straße sonne comme « ch » : chhh-tra-sse. Le ß note un /s/ dur, jamais « ss » sifflant.', level: 'A1' },
      { word: 'ich', ipa: 'ɪç', translation: 'je', tip: 'Le « ch » après i/e se dit en souriant, la langue haute près du palais : proche du souffle de « huer », surtout pas un « k ».', level: 'A1' },
      { word: 'Buch', ipa: 'buːx', translation: 'livre', tip: 'Après a/o/u, le « ch » se racle au fond de la gorge, comme un r parisien soufflé : « boukh ».', level: 'A1' },
      { word: 'Entschuldigung', ipa: 'ɛntˈʃʊldɪɡʊŋ', translation: 'excusez-moi', tip: 'Le groupe « sch » se dit « ch », et la finale « -ung » se dit « oung » : le g ne se prononce pas.', level: 'A2' },
      { word: 'Brötchen', ipa: 'ˈbʁøːtçən', translation: 'petit pain', tip: 'Le « ö » demande des lèvres en rond comme pour « o » mais une langue en position de « é » ; « -chen » finit en ch mou.', level: 'A2' },
      { word: 'Universität', ipa: 'univɛʁziˈtɛːt', translation: 'université', tip: 'Pas de « u » français : arrondis les lèvres comme pour « ou » en disant « i ». Et le « v » allemand se dit « f ».', level: 'B1' },
      { word: 'Vergnügen', ipa: 'fɛɐ̯ˈɡnyːɡn̩', translation: 'plaisir', tip: 'Le « v » initial se dit « f », le « ü » = lèvres de « ou » + langue de « i », et « -gen » devient un « gueun » à peine audible.', level: 'B2' },
      { word: 'Eichhörnchen', ipa: 'ˈaɪ̯çhœʁnçən', translation: 'écureuil', tip: 'Trois pièges d\'affilée : « ei » = « aïe », le « ö » arrondi, puis « -chen » en ch mou. Le « h » de « hörn » ne se prononce pas.', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- EN */
    en: [
      { word: 'water', ipa: 'ˈwɔːtə', translation: 'eau', tip: 'Le « t » entre deux voyelles devient un petit claquement très doux et le r final ne se roule pas : « waw-teu ».', level: 'A1' },
      { word: 'girl', ipa: 'ɡɜːl', translation: 'fille', tip: 'Le « ir » se dit gorge serrée, sans rouler le r : « geul ». Ne dis pas « gui-rle ».', level: 'A1' },
      { word: 'thought', ipa: 'θɔːt', translation: 'pensée', tip: 'La pointe de la langue doit toucher le bord des dents de devant, pas les alvéoles : sinon « thought » devient « taught ».', level: 'A2' },
      { word: 'vegetable', ipa: 'ˈvedʒtəbl', translation: 'légume', tip: 'L\'anglais avale la syllabe du milieu : on dit « VÈDJ-teu-ble » (3 syllabes), jamais « vé-gé-TA-ble ».', level: 'A2' },
      { word: 'schedule', ipa: 'ˈʃedjuːl', translation: 'emploi du temps', tip: 'Version britannique : « CHÈ-djoul ». Le « sch » se dit « ch », jamais « sk ».', level: 'B1' },
      { word: 'comfortable', ipa: 'ˈkʌmftəbl', translation: 'confortable', tip: 'Ne prononce que trois syllabes : « KUMF-teu-ble ». Le « or » du milieu disparaît complètement.', level: 'B1' },
      { word: 'through', ipa: 'θruː', translation: 'à travers', tip: 'Un « th » soufflé suivi d\'un « ou » long, en une seule émission. À ne pas confondre avec « throw » ni « thorough ».', level: 'B1' },
      { word: 'entrepreneur', ipa: 'ˌɒntrəprəˈnɜː', translation: 'entrepreneur', tip: 'L\'accent tombe à la fin : « on-tre-pre-NEUR », avec le « eur » de « girl », gorge serrée et lèvres neutres.', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- ES */
    es: [
      { word: 'perro', ipa: 'ˈpero', translation: 'chien', tip: 'Roule le « rr » : plusieurs battements rapides de la langue sur le palais. Avec un seul r, « pero » veut dire « mais ».', level: 'A1' },
      { word: 'gracias', ipa: 'ˈɡɾaθjas', translation: 'merci', tip: 'En Espagne, le « c » devant e/i et le « z » se disent langue entre les dents, comme le « th » anglais : « GRA-thias ».', level: 'A1' },
      { word: 'ciudad', ipa: 'θjuˈðað', translation: 'ville', tip: 'Le « d » entre voyelles et en finale s\'adoucit, presque comme le « th » de « this » : ne claque pas le d final.', level: 'A2' },
      { word: 'jirafa', ipa: 'xiˈɾafa', translation: 'girafe', tip: 'Le « j » espagnol vient du fond de la gorge, comme une expiration raclée : beaucoup plus fort qu\'un « h » aspiré.', level: 'A2' },
      { word: 'corazón', ipa: 'koɾaˈθon', translation: 'cœur', tip: 'L\'accent écrit tombe sur « zo » et le « z » se dit « th » ; la finale « -ón » est nasale, sans prononcer le n.', level: 'A2' },
      { word: 'izquierda', ipa: 'iθˈkjeɾða', translation: 'gauche', tip: 'Le « z » se dit langue entre les dents et « qu » se dit « k » : « ith-KIER-da », en trois temps seulement.', level: 'B1' },
      { word: 'desarrollo', ipa: 'desaroˈʝo', translation: 'développement', tip: 'Deux r simples ne se roulent pas comme un « rr », et le « ll » se dit comme un « y » appuyé : « dé-sa-RO-yo ».', level: 'B2' },
      { word: 'murciélago', ipa: 'muɾˈθjelaɣo', translation: 'chauve-souris', tip: 'Le « c » devant « ié » se dit « th », et le « g » entre voyelles devient un souffle très doux, presque un « h » léger.', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- PT */
    pt: [
      { word: 'obrigado', ipa: 'oβɾiˈɣaðu', translation: 'merci', tip: 'Au Portugal, les « o » finaux deviennent « ou » et le « d » se dit « th » doux : « oubri-GA-dhou ».', level: 'A1' },
      { word: 'não', ipa: 'nɐ̃w̃', translation: 'non', tip: 'Nasalise la voyelle en fermant la bouche sur un « ou » : « na-oung », sans jamais prononcer le n final.', level: 'A1' },
      { word: 'pão', ipa: 'pɐ̃w̃', translation: 'pain', tip: 'Une seule syllabe nasale qui se referme sur « ou » : « pa-oung ». L\'air passe par le nez, les lèvres se ferment à la fin.', level: 'A1' },
      { word: 'Lisboa', ipa: 'liʒˈβoɐ', translation: 'Lisbonne', tip: 'Le « s » entre deux voyelles se dit « j » comme dans « jour » : « lij-BO-a ».', level: 'A2' },
      { word: 'coração', ipa: 'kuɾaˈsɐ̃w̃', translation: 'cœur', tip: 'Le « ç » est un « s » dur et « -ão » une diphtongue nasale : « kou-ra-SSA-oung », le n ne s\'entend jamais.', level: 'A2' },
      { word: 'trabalho', ipa: 'tɾɐˈβaʎu', translation: 'travail', tip: 'Le « lh » se dit comme le « ll » mouillé de « fille » : « tra-BA-lyou », la langue monte au palais.', level: 'A2' },
      { word: 'desculpe', ipa: 'dɨʃˈkuɫpɨ', translation: 'excusez-moi', tip: 'Le premier « e » est avalé, presque muet, et le « l » final est sombre comme dans l\'anglais « ball ».', level: 'B1' },
      { word: 'conhecimento', ipa: 'kuɲɨsiˈmẽtu', translation: 'connaissance', tip: 'Le « nh » = « gn » de « agneau », et toutes les voyelles non accentuées sont très réduites, presque chuchotées.', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- FR */
    fr: [
      { word: 'rue', ipa: 'ʁy', translation: 'rue', tip: 'Le « r » vient de la gorge, sans rouler la langue ; pour le « u », arrondis les lèvres comme si tu allais siffler.', level: 'A1' },
      { word: 'bonjour', ipa: 'bɔ̃ʒuʁ', translation: 'bonjour', tip: 'La voyelle « on » passe par le nez sans que le n se prononce, et le « j » se dit en chuintant, langue au palais.', level: 'A1' },
      { word: 'croissant', ipa: 'kʁwasɑ̃', translation: 'croissant', tip: 'Le « oi » se dit « oi », pas « oua », et la finale « -ant » est nasale : « krwa-SSAN », bouche ouverte.', level: 'A1' },
      { word: 'heureux', ipa: 'øʁø', translation: 'heureux', tip: 'Deux « eu » fermés : lèvres en rond comme pour « o », langue en position de « é ». Aucun son ne vient de la gorge.', level: 'A2' },
      { word: 'quelqu\'un', ipa: 'kɛlkœ̃', translation: 'quelqu\'un', tip: 'Le « qu » se dit « k » et « -un » est nasal : ne prononce jamais le n final, laisse l\'air sortir par le nez.', level: 'A2' },
      { word: 'grenouille', ipa: 'ɡʁənuj', translation: 'grenouille', tip: 'Enchaîne « ou » puis le « ill » mouillé : la langue monte au palais sur la fin, « gre-nou-ye », sans détacher le l.', level: 'B1' },
      { word: 'fauteuil', ipa: 'fotœj', translation: 'fauteuil', tip: 'La finale « -euil » se dit « euye » d\'un seul bloc, lèvres arrondies, sans jamais dire « feu-teuil ».', level: 'B1' },
      { word: 'fils', ipa: 'fis', translation: 'fils', tip: 'Contrairement à « mais », le « s » final se prononce ici : on dit « fiss ». Le piège fréquent est de dire « fil ».', level: 'B2' }
    ],

    /* ---------------------------------------------------------------- IT */
    it: [
      { word: 'perché', ipa: 'perˈke', translation: 'pourquoi / parce que', tip: 'Le « ch » italien se dit toujours « k » : « per-KÉ », jamais « per-tché ».', level: 'A1' },
      { word: 'gnocchi', ipa: 'ˈɲɔkki', translation: 'gnocchis', tip: '« gn » = le « gn » d\'« agneau », « ch » = « k » : « NYO-kki », avec les deux k bien tenus.', level: 'A1' },
      { word: 'famiglia', ipa: 'faˈmiʎʎa', translation: 'famille', tip: 'Le « gl » suivi de i se dit « ly » mouillé comme dans « fille », en une seule émission, sans dire « fa-mi-gli-a ».', level: 'A1' },
      { word: 'ragazzo', ipa: 'raˈɡattso', translation: 'garçon', tip: 'Le « zz » se dit « ts » comme dans « pizza », jamais « dz » : « ra-GAT-tso ».', level: 'A1' },
      { word: 'sciare', ipa: 'ʃiˈaːre', translation: 'skier', tip: 'Le « sc » devant i/e se dit « ch » : « chi-A-re ». Ne dis pas « skiare » à l\'allemande.', level: 'A2' },
      { word: 'zucchero', ipa: 'ˈtsukkero', translation: 'sucre', tip: 'Le « z » initial se dit « ts » et « ch » se dit « k » : « TSOUK-ké-ro », sans siffler le z.', level: 'A2' },
      { word: 'chiacchierare', ipa: 'kjattʃeˈraːre', translation: 'bavarder', tip: '« ch » = « k » et « cc + i » = « tch » : « kia-tche-RA-re », avec un r roulé léger et la voyelle longue sur « ra ».', level: 'B2' },
      { word: 'conosciuto', ipa: 'konoʃˈʃuːto', translation: 'connu', tip: 'Double consonne = on tient le son deux fois plus longtemps ; « sc » devant i se dit « ch » : « ko-no-CHCHOU-to ».', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- KO */
    ko: [
      { word: '안녕하세요', ipa: 'an.njʌŋ.ha.se.jo', translation: 'bonjour', tip: 'Le « ㅎ » est un h aspiré très doux et le « 요 » final remonte légèrement. Ne dis pas « ann-yong » avec un n français.', level: 'A1' },
      { word: '감사합니다', ipa: 'kam.sa.ham.ni.da', translation: 'merci', tip: 'Le « ㅂ » devant n se nasalise en « m » : « kam-sa-HAM-ni-da », sans aucune pause entre les syllabes.', level: 'A1' },
      { word: '좋아요', ipa: 't͡ɕo.a.jo', translation: 'ça va / j\'aime bien', tip: 'Le « ㅎ » final est muet : trois syllabes « tcho-a-yo ». Le piège est de dire « tcho-ha-yo ».', level: 'A1' },
      { word: '맛있다', ipa: 'ma.ɕit̚.ta', translation: 'c\'est délicieux', tip: 'Le « ㅅ » final se retient en « t » sans explosion puis s\'enchaîne au « i » : « ma-chi-ta », en un seul souffle.', level: 'A2' },
      { word: '학교', ipa: 'hak̚.k͈jo', translation: 'école', tip: 'Le « ㄱ » final est retenu, sans relâchement, et « ㄲ » est une consonne tendue : « hak-KYO », la gorge se serre.', level: 'A2' },
      { word: '괜찮아요', ipa: 'kwɛn.t͡ɕʰa.na.jo', translation: 'ça va, ne t\'inquiète pas', tip: 'Le « ㅊ » est aspiré (souffle net) et le « ㅎ » muet : « kouèn-tcha-NA-yo », l\'accent de durée sur « na ».', level: 'B1' },
      { word: '어렵습니다', ipa: 'ʌ.ɾjʌp̚.sɯm.ni.da', translation: 'c\'est difficile', tip: 'Le « ㅂ » final se retient en p sans explosion et « ㅡ » est un « ou » bouche étirée, lèvres non arrondies.', level: 'B2' },
      { word: '뵙겠습니다', ipa: 'pwe.p̚.k͈et̚.sɯm.ni.da', translation: 'je vous salue (très formel)', tip: 'Forme très formelle : chaque consonne finale reste retenue sans explosion, et il n\'y a pas d\'accent tonique marqué.', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- JA */
    ja: [
      { word: 'ありがとう', ipa: 'a.ɾi.ɡa.toː', translation: 'merci', tip: 'Chaque syllabe dure le même temps : « a-ri-ga-tôô ». Le « r » japonais est un petit claquement, entre r, l et d.', level: 'A1' },
      { word: 'こんにちは', ipa: 'koɴ.ni.t͡ɕi.wa', translation: 'bonjour', tip: 'Le « は » de cette formule se prononce « wa », et le « n » devant consonne est nasal, sans fermer la bouche.', level: 'A1' },
      { word: 'すし', ipa: 'sɯ.ɕi', translation: 'sushi', tip: 'Le « u » japonais est étiré, lèvres presque plates : n\'arrondis pas comme pour le « ou » français.', level: 'A1' },
      { word: '日本', ipa: 'ni.hoɴ', translation: 'Japon', tip: 'Le « ɴ » final est nasal, bouche entrouverte ; ne claque pas de n et ne fais pas de pause après « ni ».', level: 'A1' },
      { word: 'がんばって', ipa: 'ɡam.bat̚.te', translation: 'courage !', tip: 'Le « n » devant « b » devient « m », et la double consonne impose une petite pause avant le « t » : « gam-BAT-te ».', level: 'A2' },
      { word: 'ちょっと', ipa: 't͡ɕot̚.to', translation: 'un peu', tip: 'Le petit « っ » est une pause : retiens le souffle une demi-seconde avant de dire « to », sinon tu dis un autre mot.', level: 'A2' },
      { word: '富士山', ipa: 'ɸɯ.d͡ʑi.saɴ', translation: 'mont Fuji', tip: 'Le « ふ » se souffle entre les lèvres, ni « f » ni « h » ; le « じ » est chuintant comme « dj ».', level: 'B1' },
      { word: '東京', ipa: 'toː.kʲoː', translation: 'Tokyo', tip: 'Deux voyelles longues : tiens « tôô-kyôô » deux temps chacune. Raccourcies, tu prononces un mot différent.', level: 'B1' }
    ],

    /* ---------------------------------------------------------------- ZH */
    zh: [
      { word: '你好', ipa: 'ni˨˩˦ xaʊ˨˩˦', translation: 'bonjour', tip: 'Deux 3es tons qui se suivent : le premier monte comme une question, le second descend puis remonte.', level: 'A1' },
      { word: '谢谢', ipa: 'ɕjɛ˥˩ ɕjɛ˥˩', translation: 'merci', tip: 'Le « x » se dit en souriant, langue haute et proche du palais ; le 4e ton tombe sèchement, comme un ordre.', level: 'A1' },
      { word: '水', ipa: 'ʂweɪ˨˩˦', translation: 'eau', tip: 'Le « sh » est soufflé, langue bombée vers le palais ; le 3e ton descend puis remonte comme un « hmm ? ».', level: 'A1' },
      { word: '中国', ipa: 'tʂʊŋ˥ kwo˧˥', translation: 'Chine', tip: 'Le « zh » se dit la langue recourbée vers le palais, plus dur et plus arrière que le « j » français.', level: 'A2' },
      { word: '人', ipa: 'ʐən˧˥', translation: 'personne / gens', tip: 'Le « r » chinois ne se roule pas : la langue est légèrement recourbée, les dents presque serrées.', level: 'A2' },
      { word: '天安门', ipa: 'tʰjɛn˥ an˥ mən˧˥', translation: 'place Tian\'anmen', tip: 'Le « t » est aspiré : mets une feuille devant ta bouche, elle doit bouger. Ne dis jamais « d ».', level: 'B1' },
      { word: '有点儿', ipa: 'joʊ˨˩˦ tjɛn˨˩˦ ɚ', translation: 'un peu', tip: 'La finale « -er » se dit avec la langue recourbée vers le palais, sans prononcer le r français.', level: 'B1' },
      { word: '恭喜发财', ipa: 'kʊŋ˥ ɕi˨˩˦ fa˥ tsʰaɪ˧˥', translation: 'bonne chance / prospérité', tip: 'Quatre tons à enchaîner : haut, remontant, haut, montant. Garde l\'aspiration sur le « c » de la dernière syllabe.', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- AR */
    ar: [
      { word: 'مرحبا', ipa: 'marħaban', translation: 'bonjour / salut', tip: 'Le « ح » vient du fond de la gorge avec un souffle chaud : ne le remplace surtout pas par un « r » français.', level: 'A1' },
      { word: 'شكرا', ipa: 'ʃukran', translation: 'merci', tip: 'Le « ش » se dit « ch » et le « r » se roule une seule fois, du bout de la langue.', level: 'A1' },
      { word: 'خمسة', ipa: 'ˈxamsa', translation: 'cinq', tip: 'Le « خ » se racle au fond de la gorge, comme la jota espagnole ; le piège est de dire « kamsa ».', level: 'A1' },
      { word: 'قهوة', ipa: 'ˈqahwa', translation: 'café', tip: 'Le « ق » se prononce très en arrière, presque à la luette, plus profond et plus sourd qu\'un « k ».', level: 'A2' },
      { word: 'مدينة', ipa: 'maˈdiːna', translation: 'ville', tip: 'Le « d » est clair et la voyelle « ii » dure deux temps : « ma-DII-na ». Ne réduis pas le a final.', level: 'A2' },
      { word: 'عربي', ipa: 'ʕaraˈbijj', translation: 'arabe', tip: 'Le « ع » se dit en serrant la gorge, comme si tu étais légèrement étranglé : entraîne-le seul, sans voyelle.', level: 'B1' },
      { word: 'صباح الخير', ipa: 'sˤaˈbaːħ alˈxajr', translation: 'bonjour (le matin)', tip: 'Le « ص » est un « s » emphatique : la langue descend vers le bas et le son devient grave et sombre.', level: 'B1' },
      { word: 'مستشفى', ipa: 'musˈtaʃfa', translation: 'hôpital', tip: 'Le « ش » se dit « ch » et le « f » est net ; l\'arabe n\'a pas d\'accent écrit, appuie sur « TACH ».', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- HI */
    hi: [
      { word: 'नमस्ते', ipa: 'nəˈməsteː', translation: 'bonjour', tip: 'Le « त » se dit la langue collée aux dents (t dental, doux) ; ne le confonds pas avec le « ट » rétroflexe.', level: 'A1' },
      { word: 'धन्यवाद', ipa: 'dʱənjəˈʋaːd', translation: 'merci', tip: 'Le « ध » est un d aspiré : place ta main devant la bouche, tu dois sentir un vrai souffle sortir.', level: 'A1' },
      { word: 'हिन्दी', ipa: 'ˈɦɪndiː', translation: 'hindi', tip: 'Le « ह » est voisé, proche d\'un h soufflé ; la voyelle finale « ी » est un i long, tenu deux temps.', level: 'A1' },
      { word: 'पानी', ipa: 'ˈpaːniː', translation: 'eau', tip: 'Le « न » est dental, la langue touche le dos des dents, et le « ा » est un a long : « PAA-nii ».', level: 'A1' },
      { word: 'क्या', ipa: 'kjaː', translation: 'quoi ?', tip: 'Le « क » est un k non aspiré, plus doux qu\'en français : n\'ajoute aucun souffle après.', level: 'A1' },
      { word: 'ठीक', ipa: 'ʈʰiːk', translation: 'bien / d\'accord', tip: 'Le « ठ » est un t rétroflexe aspiré : la langue se recourbe vers le palais puis relâche un souffle sec.', level: 'A2' },
      { word: 'शुक्रिया', ipa: 'ʃʊkɾɪˈjaː', translation: 'merci (familier)', tip: 'Le « श » se dit « ch » et le « r » se roule légèrement : « chouk-ri-YAA », accent sur la fin.', level: 'A2' },
      { word: 'आवश्यक', ipa: 'aːʋəˈʃjək', translation: 'nécessaire', tip: 'Le « व » flotte entre « v » et « w », lèvres presque fermées, et « श्य » se dit « ch-ya » en une seule syllabe.', level: 'C1' }
    ],

    /* ---------------------------------------------------------------- TR */
    tr: [
      { word: 'merhaba', ipa: 'ˈmeɾhaba', translation: 'bonjour', tip: 'L\'accent tombe sur la dernière syllabe : « merha-BA », et le « h » est aspiré, bien soufflé.', level: 'A1' },
      { word: 'teşekkürler', ipa: 'teʃecˈcyɾleɾ', translation: 'merci', tip: 'Le « ş » se dit « ch », le « ü » = lèvres de « ou » + langue de « i », et le « e » final est ouvert.', level: 'A1' },
      { word: 'güzel', ipa: 'gyˈzel', translation: 'beau / joli', tip: 'Le « g » reste dur même devant « ü », et le « z » se dit exactement comme le « z » français.', level: 'A1' },
      { word: 'değil', ipa: 'ˈdejil', translation: 'ne pas être', tip: 'Le « ğ » entre deux voyelles ne se prononce pas comme un g : il glisse en « y » : « dé-YIL ».', level: 'A2' },
      { word: 'hoşça kal', ipa: 'ˈhoʃtʃa kal', translation: 'au revoir', tip: 'Le groupe « şç » se dit « ch-tch » : « Hoch-tcha kal », et le « k » final reste net, sans aspiration.', level: 'A2' },
      { word: 'ışık', ipa: 'ɯˈʃɯk', translation: 'lumière', tip: 'Le « ı » sans point est un « euh » bouche étirée : ne confonds pas « ışık » (lumière) et « işik ».', level: 'B1' },
      { word: 'yumuşak', ipa: 'jumuˈʃak', translation: 'doux / moelleux', tip: 'Le « y » initial se dit comme dans « yaourt », et le « ş » est un « ch » soufflé, jamais un « s ».', level: 'B1' },
      { word: 'öğretmen', ipa: 'œːɾetˈmen', translation: 'professeur', tip: 'Le « ğ » entre deux voyelles ne se prononce pas : il allonge le « ö » en un « eu » ouvert : « eur-ret-MEN ».', level: 'B2' }
    ]
  };

  var conversations = {
    /* ---------------------------------------------------------------- DE */
    de: [
      {
        id: 'cafe',
        emoji: '☕',
        title: { fr: 'Au café' },
        subtitle: { fr: 'Commander et payer.' },
        level: 'A2',
        turns: [
          { who: 'bot', text: 'Guten Tag! Was möchten Sie?', gloss: { fr: 'Bonjour ! Que désirez-vous ?' }, say: 'Guten Tag! Was möchten Sie?', keywords: ['guten', 'tag'] },
          { who: 'me', text: 'Ich möchte einen Kaffee, bitte.', gloss: { fr: 'Je voudrais un café, s\'il vous plaît.' }, say: 'Ich möchte einen Kaffee, bitte.', keywords: ['möchte', 'kaffee', 'bitte'] },
          { who: 'bot', text: 'Mit Milch und Zucker?', gloss: { fr: 'Avec du lait et du sucre ?' }, say: 'Mit Milch und Zucker?', keywords: ['milch', 'zucker'] },
          { who: 'me', text: 'Nur mit Milch, danke.', gloss: { fr: 'Seulement avec du lait, merci.' }, say: 'Nur mit Milch, danke.', keywords: ['nur', 'milch', 'danke'] },
          { who: 'bot', text: 'Möchten Sie auch ein Stück Kuchen?', gloss: { fr: 'Voulez-vous aussi une part de gâteau ?' }, say: 'Möchten Sie auch ein Stück Kuchen?', keywords: ['kuchen'] },
          { who: 'me', text: 'Ja, gern. Ein Stück Schokoladenkuchen, bitte.', gloss: { fr: 'Oui, volontiers. Une part de gâteau au chocolat, s\'il vous plaît.' }, say: 'Ja, gern. Ein Stück Schokoladenkuchen, bitte.', keywords: ['stück', 'schokoladenkuchen', 'bitte'] },
          { who: 'bot', text: 'Das macht vier Euro fünfzig.', gloss: { fr: 'Cela fait quatre euros cinquante.' }, say: 'Das macht vier Euro fünfzig.', keywords: ['macht', 'euro'] },
          { who: 'me', text: 'Hier bitte. Stimmt so!', gloss: { fr: 'Voici, s\'il vous plaît. Gardez la monnaie !' }, say: 'Hier bitte. Stimmt so!', keywords: ['hier', 'bitte', 'stimmt'] }
        ]
      },
      {
        id: 'bahnhof',
        emoji: '🚆',
        title: { fr: 'À la gare' },
        subtitle: { fr: 'Acheter un billet et trouver le quai.' },
        level: 'A2',
        turns: [
          { who: 'bot', text: 'Guten Morgen! Wohin möchten Sie fahren?', gloss: { fr: 'Bonjour ! Où voulez-vous aller ?' }, say: 'Guten Morgen! Wohin möchten Sie fahren?', keywords: ['wohin', 'fahren'] },
          { who: 'me', text: 'Ich möchte nach Berlin fahren, bitte.', gloss: { fr: 'Je voudrais aller à Berlin, s\'il vous plaît.' }, say: 'Ich möchte nach Berlin fahren, bitte.', keywords: ['möchte', 'berlin', 'fahren'] },
          { who: 'bot', text: 'Einfach oder hin und zurück?', gloss: { fr: 'Aller simple ou aller-retour ?' }, say: 'Einfach oder hin und zurück?', keywords: ['einfach', 'zurück'] },
          { who: 'me', text: 'Hin und zurück, zweite Klasse.', gloss: { fr: 'Aller-retour, deuxième classe.' }, say: 'Hin und zurück, zweite Klasse.', keywords: ['zurück', 'zweite', 'klasse'] },
          { who: 'bot', text: 'Der Zug fährt um zehn Uhr von Gleis drei.', gloss: { fr: 'Le train part à dix heures de la voie trois.' }, say: 'Der Zug fährt um zehn Uhr von Gleis drei.', keywords: ['zug', 'gleis'] },
          { who: 'me', text: 'Von welchem Gleis, bitte?', gloss: { fr: 'De quelle voie, s\'il vous plaît ?' }, say: 'Von welchem Gleis, bitte?', keywords: ['welchem', 'gleis', 'bitte'] },
          { who: 'bot', text: 'Von Gleis drei. Gute Reise!', gloss: { fr: 'De la voie trois. Bon voyage !' }, say: 'Von Gleis drei. Gute Reise!', keywords: ['gleis', 'reise'] },
          { who: 'me', text: 'Vielen Dank für Ihre Hilfe.', gloss: { fr: 'Merci beaucoup pour votre aide.' }, say: 'Vielen Dank für Ihre Hilfe.', keywords: ['dank', 'hilfe'] }
        ]
      },
      {
        id: 'restaurant',
        emoji: '🍽️',
        title: { fr: 'Au restaurant' },
        subtitle: { fr: 'Réserver une table et commander un plat.' },
        level: 'B1',
        turns: [
          { who: 'bot', text: 'Guten Abend! Haben Sie reserviert?', gloss: { fr: 'Bonsoir ! Avez-vous réservé ?' }, say: 'Guten Abend! Haben Sie reserviert?', keywords: ['abend', 'reserviert'] },
          { who: 'me', text: 'Ja, ich habe einen Tisch für zwei Personen reserviert.', gloss: { fr: 'Oui, j\'ai réservé une table pour deux personnes.' }, say: 'Ja, ich habe einen Tisch für zwei Personen reserviert.', keywords: ['tisch', 'zwei', 'personen'] },
          { who: 'bot', text: 'Sehr gut. Hier ist die Speisekarte.', gloss: { fr: 'Très bien. Voici le menu.' }, say: 'Sehr gut. Hier ist die Speisekarte.', keywords: ['speisekarte'] },
          { who: 'me', text: 'Was empfehlen Sie als Hauptgericht?', gloss: { fr: 'Que recommandez-vous comme plat principal ?' }, say: 'Was empfehlen Sie als Hauptgericht?', keywords: ['empfehlen', 'hauptgericht'] },
          { who: 'bot', text: 'Der Braten mit Kartoffeln ist heute sehr gut.', gloss: { fr: 'Le rôti avec des pommes de terre est très bon aujourd\'hui.' }, say: 'Der Braten mit Kartoffeln ist heute sehr gut.', keywords: ['braten', 'kartoffeln'] },
          { who: 'me', text: 'Dann nehme ich den Braten, bitte.', gloss: { fr: 'Alors je prends le rôti, s\'il vous plaît.' }, say: 'Dann nehme ich den Braten, bitte.', keywords: ['nehme', 'braten', 'bitte'] },
          { who: 'bot', text: 'Und was möchten Sie trinken?', gloss: { fr: 'Et que souhaitez-vous boire ?' }, say: 'Und was möchten Sie trinken?', keywords: ['trinken'] },
          { who: 'me', text: 'Ein Glas Rotwein, wenn es möglich ist.', gloss: { fr: 'Un verre de vin rouge, si c\'est possible.' }, say: 'Ein Glas Rotwein, wenn es möglich ist.', keywords: ['glas', 'rotwein', 'möglich'] }
        ]
      },
      {
        id: 'arzt',
        emoji: '🩺',
        title: { fr: 'Chez le médecin' },
        subtitle: { fr: 'Décrire un symptôme et comprendre l\'ordonnance.' },
        level: 'B1',
        turns: [
          { who: 'bot', text: 'Guten Tag! Was fehlt Ihnen?', gloss: { fr: 'Bonjour ! Qu\'est-ce qui vous arrive ?' }, say: 'Guten Tag! Was fehlt Ihnen?', keywords: ['fehlt'] },
          { who: 'me', text: 'Ich habe starke Kopfschmerzen seit gestern.', gloss: { fr: 'J\'ai un fort mal de tête depuis hier.' }, say: 'Ich habe starke Kopfschmerzen seit gestern.', keywords: ['starke', 'kopfschmerzen', 'gestern'] },
          { who: 'bot', text: 'Haben Sie auch Fieber?', gloss: { fr: 'Avez-vous aussi de la fièvre ?' }, say: 'Haben Sie auch Fieber?', keywords: ['fieber'] },
          { who: 'me', text: 'Nein, aber ich fühle mich sehr müde.', gloss: { fr: 'Non, mais je me sens très fatigué.' }, say: 'Nein, aber ich fühle mich sehr müde.', keywords: ['fühle', 'müde'] },
          { who: 'bot', text: 'Nehmen Sie diese Tabletten zweimal am Tag.', gloss: { fr: 'Prenez ces comprimés deux fois par jour.' }, say: 'Nehmen Sie diese Tabletten zweimal am Tag.', keywords: ['tabletten', 'tag'] },
          { who: 'me', text: 'Muss ich im Bett bleiben?', gloss: { fr: 'Dois-je rester au lit ?' }, say: 'Muss ich im Bett bleiben?', keywords: ['muss', 'bett', 'bleiben'] },
          { who: 'bot', text: 'Ja, drei Tage. Und trinken Sie viel Wasser.', gloss: { fr: 'Oui, trois jours. Et buvez beaucoup d\'eau.' }, say: 'Ja, drei Tage. Und trinken Sie viel Wasser.', keywords: ['wasser'] },
          { who: 'me', text: 'Vielen Dank, Frau Doktor.', gloss: { fr: 'Merci beaucoup, docteur.' }, say: 'Vielen Dank, Frau Doktor.', keywords: ['dank', 'doktor'] }
        ]
      },
      {
        id: 'arbeit',
        emoji: '💼',
        title: { fr: 'Au travail' },
        subtitle: { fr: 'Se présenter à un nouveau collègue.' },
        level: 'A2',
        turns: [
          { who: 'bot', text: 'Guten Tag! Sie sind der neue Kollege, oder?', gloss: { fr: 'Bonjour ! Vous êtes le nouveau collègue, n\'est-ce pas ?' }, say: 'Guten Tag! Sie sind der neue Kollege, oder?', keywords: ['kollege'] },
          { who: 'me', text: 'Ja, ich heiße Anna und ich komme aus Frankreich.', gloss: { fr: 'Oui, je m\'appelle Anna et je viens de France.' }, say: 'Ja, ich heiße Anna und ich komme aus Frankreich.', keywords: ['heiße', 'anna', 'frankreich'] },
          { who: 'bot', text: 'Und was machen Sie genau?', gloss: { fr: 'Et que faites-vous exactement ?' }, say: 'Und was machen Sie genau?', keywords: ['genau'] },
          { who: 'me', text: 'Ich arbeite als Projektmanagerin in der Marketingabteilung.', gloss: { fr: 'Je travaille comme cheffe de projet au service marketing.' }, say: 'Ich arbeite als Projektmanagerin in der Marketingabteilung.', keywords: ['arbeite', 'projektmanagerin', 'marketingabteilung'] },
          { who: 'bot', text: 'Wie lange arbeiten Sie schon hier?', gloss: { fr: 'Depuis combien de temps travaillez-vous ici ?' }, say: 'Wie lange arbeiten Sie schon hier?', keywords: ['lange', 'hier'] },
          { who: 'me', text: 'Heute ist mein erster Tag, deshalb brauche ich Ihre Hilfe.', gloss: { fr: 'Aujourd\'hui c\'est mon premier jour, c\'est pourquoi j\'ai besoin de votre aide.' }, say: 'Heute ist mein erster Tag, deshalb brauche ich Ihre Hilfe.', keywords: ['heute', 'erster', 'hilfe'] },
          { who: 'bot', text: 'Kein Problem, ich zeige Ihnen alles.', gloss: { fr: 'Pas de problème, je vous montre tout.' }, say: 'Kein Problem, ich zeige Ihnen alles.', keywords: ['problem', 'alles'] },
          { who: 'me', text: 'Das ist sehr nett von Ihnen, danke.', gloss: { fr: 'C\'est très gentil de votre part, merci.' }, say: 'Das ist sehr nett von Ihnen, danke.', keywords: ['nett', 'danke'] }
        ]
      },
      {
        id: 'wohnung',
        emoji: '🏠',
        title: { fr: 'Chercher un logement' },
        subtitle: { fr: 'Visiter un appartement et négocier.' },
        level: 'B2',
        turns: [
          { who: 'bot', text: 'Die Wohnung hat drei Zimmer und einen Balkon.', gloss: { fr: 'L\'appartement a trois pièces et un balcon.' }, say: 'Die Wohnung hat drei Zimmer und einen Balkon.', keywords: ['wohnung', 'zimmer'] },
          { who: 'me', text: 'Wie hoch ist die Miete pro Monat?', gloss: { fr: 'Quel est le montant du loyer par mois ?' }, say: 'Wie hoch ist die Miete pro Monat?', keywords: ['hoch', 'miete', 'monat'] },
          { who: 'bot', text: 'Achthundert Euro, Nebenkosten inklusive.', gloss: { fr: 'Huit cents euros, charges comprises.' }, say: 'Achthundert Euro, Nebenkosten inklusive.', keywords: ['nebenkosten', 'inklusive'] },
          { who: 'me', text: 'Ist die Küche schon eingerichtet?', gloss: { fr: 'La cuisine est-elle déjà équipée ?' }, say: 'Ist die Küche schon eingerichtet?', keywords: ['küche', 'eingerichtet'] },
          { who: 'bot', text: 'Ja, aber die Möbel müssen Sie selbst kaufen.', gloss: { fr: 'Oui, mais vous devez acheter les meubles vous-même.' }, say: 'Ja, aber die Möbel müssen Sie selbst kaufen.', keywords: ['möbel', 'kaufen'] },
          { who: 'me', text: 'Wann könnte ich einziehen?', gloss: { fr: 'Quand pourrais-je emménager ?' }, say: 'Wann könnte ich einziehen?', keywords: ['wann', 'einziehen'] },
          { who: 'bot', text: 'Ab dem ersten September, wenn Sie möchten.', gloss: { fr: 'À partir du premier septembre, si vous voulez.' }, say: 'Ab dem ersten September, wenn Sie möchten.', keywords: ['september'] },
          { who: 'me', text: 'Ich nehme die Wohnung, wenn der Vertrag passt.', gloss: { fr: 'Je prends l\'appartement si le contrat convient.' }, say: 'Ich nehme die Wohnung, wenn der Vertrag passt.', keywords: ['nehme', 'wohnung', 'vertrag'] }
        ]
      }
    ],

    /* ---------------------------------------------------------------- EN */
    en: [
      {
        id: 'cafe',
        emoji: '☕',
        title: { fr: 'Au café' },
        subtitle: { fr: 'Commander une boisson et payer.' },
        level: 'A1',
        turns: [
          { who: 'bot', text: 'Hi! What can I get you?', gloss: { fr: 'Bonjour ! Que puis-je vous servir ?' }, say: 'Hi! What can I get you?', keywords: ['get'] },
          { who: 'me', text: 'Could I have a coffee, please?', gloss: { fr: 'Puis-je avoir un café, s\'il vous plaît ?' }, say: 'Could I have a coffee, please?', keywords: ['could', 'coffee', 'please'] },
          { who: 'bot', text: 'Sure. Milk or sugar?', gloss: { fr: 'Bien sûr. Du lait ou du sucre ?' }, say: 'Sure. Milk or sugar?', keywords: ['milk', 'sugar'] },
          { who: 'me', text: 'Just a little milk, no sugar.', gloss: { fr: 'Juste un peu de lait, sans sucre.' }, say: 'Just a little milk, no sugar.', keywords: ['little', 'milk', 'sugar'] },
          { who: 'bot', text: 'To stay or to take away?', gloss: { fr: 'Sur place ou à emporter ?' }, say: 'To stay or to take away?', keywords: ['stay', 'away'] },
          { who: 'me', text: 'To take away, thanks.', gloss: { fr: 'À emporter, merci.' }, say: 'To take away, thanks.', keywords: ['take', 'away', 'thanks'] },
          { who: 'bot', text: 'That will be three pounds fifty.', gloss: { fr: 'Cela fera trois livres cinquante.' }, say: 'That will be three pounds fifty.', keywords: ['pounds'] },
          { who: 'me', text: 'Here you are. Keep the change.', gloss: { fr: 'Voici. Gardez la monnaie.' }, say: 'Here you are. Keep the change.', keywords: ['here', 'keep', 'change'] }
        ]
      },
      {
        id: 'directions',
        emoji: '🗺️',
        title: { fr: 'Demander son chemin' },
        subtitle: { fr: 'Trouver la gare dans la rue.' },
        level: 'A2',
        turns: [
          { who: 'bot', text: 'Excuse me, do you need some help?', gloss: { fr: 'Excusez-moi, avez-vous besoin d\'aide ?' }, say: 'Excuse me, do you need some help?', keywords: ['help'] },
          { who: 'me', text: 'Yes, I am looking for the train station.', gloss: { fr: 'Oui, je cherche la gare.' }, say: 'Yes, I am looking for the train station.', keywords: ['looking', 'train', 'station'] },
          { who: 'bot', text: 'Go straight on and turn left at the lights.', gloss: { fr: 'Allez tout droit et tournez à gauche aux feux.' }, say: 'Go straight on and turn left at the lights.', keywords: ['straight', 'left'] },
          { who: 'me', text: 'Is it far from here?', gloss: { fr: 'Est-ce loin d\'ici ?' }, say: 'Is it far from here?', keywords: ['far', 'here'] },
          { who: 'bot', text: 'About ten minutes on foot.', gloss: { fr: 'Environ dix minutes à pied.' }, say: 'About ten minutes on foot.', keywords: ['ten', 'minutes'] },
          { who: 'me', text: 'Can I take a bus instead?', gloss: { fr: 'Puis-je prendre un bus à la place ?' }, say: 'Can I take a bus instead?', keywords: ['take', 'bus', 'instead'] },
          { who: 'bot', text: 'Yes, the number five stops over there.', gloss: { fr: 'Oui, le numéro cinq s\'arrête là-bas.' }, say: 'Yes, the number five stops over there.', keywords: ['five', 'stops'] },
          { who: 'me', text: 'Thank you very much for your help.', gloss: { fr: 'Merci beaucoup pour votre aide.' }, say: 'Thank you very much for your help.', keywords: ['thank', 'very', 'help'] }
        ]
      }
    ],

    /* ---------------------------------------------------------------- ES */
    es: [
      {
        id: 'cafe',
        emoji: '☕',
        title: { fr: 'Au café' },
        subtitle: { fr: 'Commander et payer au comptoir.' },
        level: 'A1',
        turns: [
          { who: 'bot', text: '¡Buenos días! ¿Qué desea tomar?', gloss: { fr: 'Bonjour ! Que désirez-vous boire ?' }, say: '¡Buenos días! ¿Qué desea tomar?', keywords: ['días', 'tomar'] },
          { who: 'me', text: 'Quiero un café con leche, por favor.', gloss: { fr: 'Je voudrais un café au lait, s\'il vous plaît.' }, say: 'Quiero un café con leche, por favor.', keywords: ['quiero', 'café', 'leche', 'favor'] },
          { who: 'bot', text: '¿Grande o pequeño?', gloss: { fr: 'Grand ou petit ?' }, say: '¿Grande o pequeño?', keywords: ['grande', 'pequeño'] },
          { who: 'me', text: 'Grande, y un croissant también.', gloss: { fr: 'Grand, et un croissant aussi.' }, say: 'Grande, y un croissant también.', keywords: ['grande', 'croissant', 'también'] },
          { who: 'bot', text: '¿Para tomar aquí o para llevar?', gloss: { fr: 'Pour consommer sur place ou à emporter ?' }, say: '¿Para tomar aquí o para llevar?', keywords: ['tomar', 'llevar'] },
          { who: 'me', text: 'Para llevar, gracias.', gloss: { fr: 'À emporter, merci.' }, say: 'Para llevar, gracias.', keywords: ['llevar', 'gracias'] },
          { who: 'bot', text: 'Son tres euros con cincuenta.', gloss: { fr: 'Cela fait trois euros cinquante.' }, say: 'Son tres euros con cincuenta.', keywords: ['tres', 'euros'] },
          { who: 'me', text: 'Aquí tiene, quédese con el cambio.', gloss: { fr: 'Voici, gardez la monnaie.' }, say: 'Aquí tiene, quédese con el cambio.', keywords: ['aquí', 'tiene', 'cambio'] }
        ]
      },
      {
        id: 'hotel',
        emoji: '🏨',
        title: { fr: 'À l\'hôtel' },
        subtitle: { fr: 'Réserver une chambre à la réception.' },
        level: 'A2',
        turns: [
          { who: 'bot', text: 'Buenas tardes, ¿tiene una reserva?', gloss: { fr: 'Bonsoir, avez-vous une réservation ?' }, say: 'Buenas tardes, ¿tiene una reserva?', keywords: ['tardes', 'reserva'] },
          { who: 'me', text: 'Sí, a nombre de García, para dos noches.', gloss: { fr: 'Oui, au nom de García, pour deux nuits.' }, say: 'Sí, a nombre de García, para dos noches.', keywords: ['nombre', 'garcía', 'noches'] },
          { who: 'bot', text: '¿Prefiere una habitación con vistas?', gloss: { fr: 'Préférez-vous une chambre avec vue ?' }, say: '¿Prefiere una habitación con vistas?', keywords: ['prefiere', 'habitación'] },
          { who: 'me', text: 'Sí, y necesito una cama grande.', gloss: { fr: 'Oui, et j\'ai besoin d\'un grand lit.' }, say: 'Sí, y necesito una cama grande.', keywords: ['necesito', 'cama', 'grande'] },
          { who: 'bot', text: 'El desayuno está incluido hasta las diez.', gloss: { fr: 'Le petit-déjeuner est inclus jusqu\'à dix heures.' }, say: 'El desayuno está incluido hasta las diez.', keywords: ['desayuno', 'incluido'] },
          { who: 'me', text: '¿A qué hora puedo hacer el check-in?', gloss: { fr: 'À quelle heure puis-je faire l\'enregistrement ?' }, say: '¿A qué hora puedo hacer el check-in?', keywords: ['hora', 'puedo', 'check-in'] },
          { who: 'bot', text: 'A partir de las dos de la tarde.', gloss: { fr: 'À partir de deux heures de l\'après-midi.' }, say: 'A partir de las dos de la tarde.', keywords: ['partir', 'tarde'] },
          { who: 'me', text: 'Perfecto, muchas gracias por su ayuda.', gloss: { fr: 'Parfait, merci beaucoup pour votre aide.' }, say: 'Perfecto, muchas gracias por su ayuda.', keywords: ['perfecto', 'gracias', 'ayuda'] }
        ]
      }
    ],

    /* ---------------------------------------------------------------- IT */
    it: [
      {
        id: 'bar',
        emoji: '☕',
        title: { fr: 'Au bar' },
        subtitle: { fr: 'Commander un cappuccino et un cornetto.' },
        level: 'A1',
        turns: [
          { who: 'bot', text: 'Buongiorno! Cosa desidera?', gloss: { fr: 'Bonjour ! Que désirez-vous ?' }, say: 'Buongiorno! Cosa desidera?', keywords: ['buongiorno', 'desidera'] },
          { who: 'me', text: 'Vorrei un cappuccino, per favore.', gloss: { fr: 'Je voudrais un cappuccino, s\'il vous plaît.' }, say: 'Vorrei un cappuccino, per favore.', keywords: ['vorrei', 'cappuccino', 'favore'] },
          { who: 'bot', text: 'Con zucchero?', gloss: { fr: 'Avec du sucre ?' }, say: 'Con zucchero?', keywords: ['zucchero'] },
          { who: 'me', text: 'Poco zucchero, grazie.', gloss: { fr: 'Peu de sucre, merci.' }, say: 'Poco zucchero, grazie.', keywords: ['poco', 'zucchero', 'grazie'] },
          { who: 'bot', text: 'Vuole anche un cornetto?', gloss: { fr: 'Voulez-vous aussi un croissant ?' }, say: 'Vuole anche un cornetto?', keywords: ['vuole', 'cornetto'] },
          { who: 'me', text: 'Sì, un cornetto alla crema.', gloss: { fr: 'Oui, un croissant à la crème.' }, say: 'Sì, un cornetto alla crema.', keywords: ['cornetto', 'crema'] },
          { who: 'bot', text: 'Sono due euro e cinquanta.', gloss: { fr: 'Cela fait deux euros cinquante.' }, say: 'Sono due euro e cinquanta.', keywords: ['due', 'euro'] },
          { who: 'me', text: 'Ecco a lei, tenga il resto.', gloss: { fr: 'Voici pour vous, gardez la monnaie.' }, say: 'Ecco a lei, tenga il resto.', keywords: ['ecco', 'tenga', 'resto'] }
        ]
      },
      {
        id: 'strada',
        emoji: '🗺️',
        title: { fr: 'Demander son chemin' },
        subtitle: { fr: 'Trouver le musée à pied ou en bus.' },
        level: 'A2',
        turns: [
          { who: 'bot', text: 'Mi scusi, ha bisogno di aiuto?', gloss: { fr: 'Excusez-moi, avez-vous besoin d\'aide ?' }, say: 'Mi scusi, ha bisogno di aiuto?', keywords: ['scusi', 'aiuto'] },
          { who: 'me', text: 'Sì, cerco il museo di arte moderna.', gloss: { fr: 'Oui, je cherche le musée d\'art moderne.' }, say: 'Sì, cerco il museo di arte moderna.', keywords: ['cerco', 'museo', 'arte'] },
          { who: 'bot', text: 'Vada dritto e poi giri a destra.', gloss: { fr: 'Allez tout droit puis tournez à droite.' }, say: 'Vada dritto e poi giri a destra.', keywords: ['dritto', 'destra'] },
          { who: 'me', text: 'È lontano da qui a piedi?', gloss: { fr: 'Est-ce loin d\'ici à pied ?' }, say: 'È lontano da qui a piedi?', keywords: ['lontano', 'piedi'] },
          { who: 'bot', text: 'No, sono dieci minuti.', gloss: { fr: 'Non, c\'est à dix minutes.' }, say: 'No, sono dieci minuti.', keywords: ['dieci', 'minuti'] },
          { who: 'me', text: 'Posso prendere l\'autobus?', gloss: { fr: 'Puis-je prendre le bus ?' }, say: 'Posso prendere l\'autobus?', keywords: ['posso', 'prendere', 'autobus'] },
          { who: 'bot', text: 'Certo, la linea cinque si ferma qui.', gloss: { fr: 'Bien sûr, la ligne cinq s\'arrête ici.' }, say: 'Certo, la linea cinque si ferma qui.', keywords: ['linea', 'cinque'] },
          { who: 'me', text: 'La ringrazio molto per l\'aiuto.', gloss: { fr: 'Je vous remercie beaucoup pour l\'aide.' }, say: 'La ringrazio molto per l\'aiuto.', keywords: ['ringrazio', 'molto', 'aiuto'] }
        ]
      }
    ],

    /* ---------------------------------------------------------------- PT */
    pt: [
      {
        id: 'cafe',
        emoji: '☕',
        title: { fr: 'Au café' },
        subtitle: { fr: 'Commander un café et un pastel de nata.' },
        level: 'A1',
        turns: [
          { who: 'bot', text: 'Bom dia! O que deseja?', gloss: { fr: 'Bonjour ! Que désirez-vous ?' }, say: 'Bom dia! O que deseja?', keywords: ['bom', 'dia', 'deseja'] },
          { who: 'me', text: 'Queria um café com leite, por favor.', gloss: { fr: 'Je voudrais un café au lait, s\'il vous plaît.' }, say: 'Queria um café com leite, por favor.', keywords: ['queria', 'café', 'leite', 'favor'] },
          { who: 'bot', text: 'Grande ou pequeno?', gloss: { fr: 'Grand ou petit ?' }, say: 'Grande ou pequeno?', keywords: ['grande', 'pequeno'] },
          { who: 'me', text: 'Grande, e um pastel de nata também.', gloss: { fr: 'Grand, et un flan pâtissier aussi.' }, say: 'Grande, e um pastel de nata também.', keywords: ['grande', 'pastel', 'nata'] },
          { who: 'bot', text: 'É para comer aqui?', gloss: { fr: 'C\'est pour manger ici ?' }, say: 'É para comer aqui?', keywords: ['comer', 'aqui'] },
          { who: 'me', text: 'Não, é para levar, obrigado.', gloss: { fr: 'Non, c\'est à emporter, merci.' }, say: 'Não, é para levar, obrigado.', keywords: ['levar', 'obrigado'] },
          { who: 'bot', text: 'São três euros e vinte.', gloss: { fr: 'Cela fait trois euros vingt.' }, say: 'São três euros e vinte.', keywords: ['três', 'euros'] },
          { who: 'me', text: 'Aqui tem, fique com o troco.', gloss: { fr: 'Voici, gardez la monnaie.' }, say: 'Aqui tem, fique com o troco.', keywords: ['aqui', 'tem', 'troco'] }
        ]
      },
      {
        id: 'direcoes',
        emoji: '🗺️',
        title: { fr: 'Demander son chemin' },
        subtitle: { fr: 'Trouver la plage la plus proche.' },
        level: 'A2',
        turns: [
          { who: 'bot', text: 'Precisa de ajuda?', gloss: { fr: 'Avez-vous besoin d\'aide ?' }, say: 'Precisa de ajuda?', keywords: ['precisa', 'ajuda'] },
          { who: 'me', text: 'Sim, procuro a praia mais perto.', gloss: { fr: 'Oui, je cherche la plage la plus proche.' }, say: 'Sim, procuro a praia mais perto.', keywords: ['procuro', 'praia', 'perto'] },
          { who: 'bot', text: 'Siga em frente e vire à esquerda.', gloss: { fr: 'Continuez tout droit et tournez à gauche.' }, say: 'Siga em frente e vire à esquerda.', keywords: ['frente', 'esquerda'] },
          { who: 'me', text: 'Fica longe daqui?', gloss: { fr: 'C\'est loin d\'ici ?' }, say: 'Fica longe daqui?', keywords: ['longe', 'daqui'] },
          { who: 'bot', text: 'Fica a quinze minutos a pé.', gloss: { fr: 'C\'est à quinze minutes à pied.' }, say: 'Fica a quinze minutos a pé.', keywords: ['quinze', 'minutos'] },
          { who: 'me', text: 'Posso ir de autocarro?', gloss: { fr: 'Puis-je y aller en bus ?' }, say: 'Posso ir de autocarro?', keywords: ['posso', 'autocarro'] },
          { who: 'bot', text: 'Pode, o autocarro número seis para lá.', gloss: { fr: 'Oui, le bus numéro six va là-bas.' }, say: 'Pode, o autocarro número seis para lá.', keywords: ['autocarro', 'seis'] },
          { who: 'me', text: 'Muito obrigado pela sua ajuda.', gloss: { fr: 'Merci beaucoup pour votre aide.' }, say: 'Muito obrigado pela sua ajuda.', keywords: ['muito', 'obrigado', 'ajuda'] }
        ]
      }
    ]
  };

  window.SK = window.SK || {};
  window.SK.PRONUNCIATION = pronunciation;
  window.SK.CONVERSATIONS = conversations;
})();
