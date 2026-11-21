/* SAVORIA — Recettes de base de la maquette.
   Format d'un ingrédient : [quantité, unité, clé du dictionnaire, précision facultative]
   Unités : g, kg, ml, cl, L, "c. à s.", "c. à c.", "pincée", "brins", "" (= à la pièce)
   Les allergènes ne sont PAS saisis ici : ils sont calculés depuis le dictionnaire (ingredients.js). */
window.S = window.S || {};

S.CATEGORIES = {
  rapides: { visuel: "pates-carbonara", n: "Recettes rapides", court: "Rapides", d: "Prêtes en 25 minutes ou moins" },
  classiques: { visuel: "filet-boeuf-puree-jus", n: "Recettes classiques", court: "Classiques", d: "Les grands plats de la cuisine française" },
  longues: { visuel: "boeuf-bourguignon", n: "Recettes longues", court: "Longues", d: "Mijotés et cuissons lentes, pour prendre son temps" },
  healthy: { visuel: "buddha-bowl", n: "Recettes healthy", court: "Healthy", d: "Légères, équilibrées et pleines de couleurs" },
  desserts: { visuel: "fondant-chocolat", n: "Desserts", court: "Desserts", d: "Pour finir le repas en beauté" },
  monde: { visuel: "pad-thai", n: "Cuisine du monde", court: "Monde", d: "Un tour du monde dans l'assiette" }
};

S.RECETTES = [
  {
    id: "filet-boeuf-puree-jus", titre: "Filet de bœuf, purée au beurre et jus réduit",
    accroche: "Le plat signature SAVORIA : une viande rosée, une purée soyeuse et un jus brillant.",
    cats: ["classiques"], temps: 60, prep: 30, diff: 3, portions: 4, vedette: 1,
    ust: ["plaques", "four", "poele", "casserole"],
    ing: [[800, "g", "filet_boeuf", "en une pièce, à température ambiante"], [1, "kg", "pomme_de_terre", "à chair farineuse"], [120, "g", "beurre"], [20, "cl", "lait"], [2, "", "echalote"], [20, "cl", "vin_rouge"], [30, "cl", "fond_veau"], [4, "brins", "thym"], [2, "", "ail"], [2, "c. à s.", "huile"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Épluchez les pommes de terre et faites-les cuire 25 min dans l'eau salée. Préchauffez le four à 200 °C.", "Saisissez le filet salé dans l'huile très chaude 2 min par face, puis ajoutez 30 g de beurre, l'ail écrasé et le thym. Arrosez la viande 1 min.", "Enfournez 12 à 15 min pour une cuisson rosée (55 °C à cœur), puis laissez reposer 10 min sous une feuille d'aluminium.", "Dans la même poêle, faites revenir les échalotes ciselées, déglacez au vin rouge et réduisez de moitié. Ajoutez le fond de veau et réduisez jusqu'à ce que le jus nappe la cuillère.", "Écrasez les pommes de terre avec le reste du beurre et le lait chaud, en fouettant jusqu'à obtenir une purée lisse.", "Tranchez le filet en médaillons épais, dressez sur la purée et nappez de jus."]
  },
  // ---------- RAPIDES ----------
  {
    id: "pates-carbonara", titre: "Spaghetti carbonara à la romaine",
    accroche: "La vraie recette : sans crème, juste des jaunes, du fromage et du poivre.",
    cats: ["rapides", "monde"], temps: 20, prep: 10, diff: 2, portions: 4,
    ust: ["plaques", "casserole", "poele"],
    ing: [[400, "g", "spaghetti"], [150, "g", "lardons", "idéalement du guanciale"], [4, "", "jaune_oeuf"], [1, "", "oeuf"], [80, "g", "parmesan", "râpé"], [1, "c. à c.", "poivre", "fraîchement moulu"], [1, "pincée", "sel"]],
    etapes: ["Faites cuire les spaghetti dans une grande casserole d'eau salée, en suivant le temps indiqué.", "Pendant ce temps, faites dorer les lardons à sec dans la poêle jusqu'à ce qu'ils soient croustillants.", "Fouettez les jaunes, l'œuf entier, le parmesan et beaucoup de poivre.", "Égouttez les pâtes en gardant une louche d'eau de cuisson. Hors du feu, mélangez-les aux lardons.", "Versez le mélange aux œufs et remuez vivement en ajoutant un peu d'eau de cuisson jusqu'à obtenir une sauce crémeuse. Servez aussitôt."]
  },
  {
    id: "omelette-fines-herbes", titre: "Omelette baveuse aux fines herbes",
    accroche: "Dix minutes, une poêle et des herbes fraîches : le dîner express par excellence.",
    cats: ["rapides", "classiques"], temps: 10, prep: 5, diff: 1, portions: 2,
    ust: ["plaques", "poele"],
    ing: [[6, "", "oeuf"], [20, "g", "beurre"], [1, "c. à s.", "ciboulette", "ciselée"], [1, "c. à s.", "persil", "haché"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Battez les œufs avec le sel, le poivre et les herbes, sans trop les faire mousser.", "Faites fondre le beurre dans la poêle à feu moyen jusqu'à ce qu'il mousse.", "Versez les œufs et remuez doucement avec une spatule en ramenant les bords vers le centre.", "Quand le dessus est encore baveux, repliez l'omelette en deux et glissez-la sur l'assiette."]
  },
  {
    id: "croque-monsieur", titre: "Croque-monsieur gratiné",
    accroche: "Doré, fondant et croustillant, le classique des bistrots en 15 minutes.",
    cats: ["rapides", "classiques"], temps: 15, prep: 5, diff: 1, portions: 4,
    ust: ["four"],
    ing: [[8, "", "pain_mie"], [4, "", "jambon"], [100, "g", "emmental"], [4, "c. à s.", "creme"], [20, "g", "beurre"], [1, "pincée", "muscade"]],
    etapes: ["Préchauffez le four à 220 °C en position grill.", "Beurrez légèrement l'extérieur des tranches de pain.", "Garnissez 4 tranches avec une tranche de jambon et un peu d'emmental, puis refermez.", "Mélangez la crème, la muscade et le reste de l'emmental, et étalez sur le dessus.", "Enfournez 8 à 10 min jusqu'à ce que le dessus soit bien gratiné."]
  },
  {
    id: "wok-poulet-legumes", titre: "Wok de poulet croquant aux légumes",
    accroche: "Des légumes croquants, un poulet tendre et une sauce soja-gingembre.",
    cats: ["rapides", "monde"], temps: 20, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "wok"],
    ing: [[400, "g", "poulet", "en lamelles"], [1, "", "poivron"], [2, "", "carotte"], [1, "", "oignon"], [2, "", "ail"], [1, "c. à s.", "gingembre"], [4, "c. à s.", "sauce_soja"], [2, "c. à s.", "huile"]],
    etapes: ["Taillez les carottes et le poivron en fines lanières, émincez l'oignon.", "Faites chauffer l'huile dans le wok à feu vif et saisissez le poulet 4 min. Réservez.", "Faites sauter les légumes 3 min avec l'ail et le gingembre : ils doivent rester croquants.", "Remettez le poulet, ajoutez la sauce soja et mélangez 1 min. Servez tout de suite."]
  },
  {
    id: "salade-cesar", titre: "Salade César au poulet grillé",
    accroche: "Romaine croquante, croûtons dorés et sauce onctueuse au parmesan.",
    cats: ["rapides", "classiques"], temps: 20, prep: 15, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[300, "g", "poulet"], [1, "", "laitue"], [40, "g", "parmesan", "en copeaux"], [2, "", "pain", "en cubes"], [3, "c. à s.", "mayonnaise"], [1, "c. à c.", "moutarde"], [1, "", "citron"], [1, "", "ail"], [3, "c. à s.", "huile_olive"]],
    etapes: ["Faites dorer les cubes de pain dans 2 c. à s. d'huile avec l'ail écrasé. Réservez.", "Saisissez le poulet assaisonné 5 à 6 min par face, puis tranchez-le.", "Mélangez la mayonnaise, la moutarde, le jus d'un demi-citron et la moitié du parmesan.", "Coupez la romaine, nappez de sauce, puis ajoutez le poulet, les croûtons et le reste du parmesan."]
  },
  {
    id: "quesadillas", titre: "Quesadillas fondantes haricots & maïs",
    accroche: "Croustillantes dehors, filantes dedans, prêtes en un quart d'heure.",
    cats: ["rapides", "monde"], temps: 15, prep: 5, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[4, "", "tortilla"], [150, "g", "emmental"], [200, "g", "haricots_rouges"], [100, "g", "mais"], [1, "", "poivron", "en petits dés"], [1, "c. à c.", "cumin"], [1, "", "citron_vert"]],
    etapes: ["Écrasez grossièrement les haricots rouges avec le cumin et un filet de citron vert.", "Étalez-les sur une moitié de chaque tortilla, puis ajoutez le maïs, le poivron et le fromage.", "Repliez et faites dorer 2 à 3 min de chaque côté dans la poêle à sec.", "Coupez en triangles et servez bien chaud."]
  },
  {
    id: "saumon-poele-citron", titre: "Saumon poêlé, beurre citronné à l'aneth",
    accroche: "Une peau croustillante et une chair nacrée, avec une sauce minute.",
    cats: ["rapides", "healthy"], temps: 15, prep: 5, diff: 2, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[4, "", "saumon", "avec la peau"], [40, "g", "beurre"], [1, "", "citron"], [2, "c. à s.", "aneth"], [1, "c. à s.", "huile"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Séchez bien les pavés et salez la peau.", "Posez-les côté peau dans l'huile chaude et laissez cuire 5 min sans y toucher.", "Retournez-les, ajoutez le beurre et arrosez 1 à 2 min.", "Hors du feu, ajoutez le jus de citron et l'aneth dans le beurre, puis nappez le saumon."]
  },
  {
    id: "frites-patate-douce", titre: "Frites de patate douce au paprika fumé",
    accroche: "Croustillantes à l'air fryer avec une seule cuillère d'huile.",
    cats: ["rapides", "healthy"], temps: 25, prep: 5, diff: 1, portions: 2,
    ust: ["airfryer"],
    ing: [[2, "", "patate_douce"], [1, "c. à s.", "huile_olive"], [1, "c. à c.", "paprika"], [1, "pincée", "sel"]],
    etapes: ["Coupez les patates douces en bâtonnets de 1 cm.", "Mélangez-les avec l'huile, le paprika et le sel.", "Faites cuire 18 à 20 min à 200 °C dans l'air fryer en secouant le panier à mi-cuisson."]
  },
  {
    id: "smoothie-bowl", titre: "Smoothie bowl fruits rouges & banane",
    accroche: "Un petit-déjeuner coloré, épais et gourmand.",
    cats: ["rapides", "healthy"], temps: 10, prep: 10, diff: 1, portions: 2,
    ust: ["blender"],
    ing: [[2, "", "banane", "congelées de préférence"], [200, "g", "fruits_rouges"], [150, "g", "yaourt"], [40, "g", "flocons_avoine"], [1, "c. à s.", "miel"]],
    etapes: ["Mixez les bananes, 150 g de fruits rouges et le yaourt jusqu'à obtenir une texture épaisse.", "Versez dans deux bols.", "Décorez avec le reste des fruits, les flocons d'avoine et un filet de miel."]
  },
  {
    id: "shakshuka", titre: "Shakshuka aux œufs pochés",
    accroche: "Des œufs pochés dans une sauce tomate épicée, à partager avec du pain.",
    cats: ["rapides", "monde", "healthy"], temps: 25, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[6, "", "oeuf"], [800, "g", "tomates_concassees"], [1, "", "poivron"], [1, "", "oignon"], [2, "", "ail"], [1, "c. à c.", "cumin"], [1, "c. à c.", "paprika"], [2, "c. à s.", "huile_olive"], [2, "c. à s.", "coriandre"]],
    etapes: ["Faites revenir l'oignon et le poivron émincés dans l'huile pendant 5 min.", "Ajoutez l'ail, le cumin et le paprika, puis les tomates. Laissez mijoter 10 min.", "Creusez 6 puits et cassez-y les œufs. Couvrez et laissez cuire 6 à 8 min.", "Parsemez de coriandre et servez dans la poêle."]
  },
  {
    id: "crepes", titre: "Crêpes fines de la Chandeleur",
    accroche: "Une pâte lisse et des crêpes dentelées, à garnir selon vos envies.",
    cats: ["desserts", "rapides", "classiques"], temps: 30, prep: 10, diff: 1, portions: 6,
    ust: ["plaques", "poele"],
    ing: [[250, "g", "farine"], [4, "", "oeuf"], [50, "cl", "lait"], [50, "g", "beurre", "fondu"], [2, "c. à s.", "sucre"], [1, "pincée", "sel"]],
    etapes: ["Mélangez la farine, le sucre et le sel, puis creusez un puits.", "Ajoutez les œufs et versez le lait petit à petit en fouettant pour éviter les grumeaux.", "Incorporez le beurre fondu. Laissez reposer 15 min si possible.", "Faites cuire les crêpes dans la poêle chaude légèrement graissée, 1 min de chaque côté."]
  },
  {
    id: "cookies", titre: "Cookies moelleux aux pépites de chocolat",
    accroche: "Des bords croustillants et un cœur fondant.",
    cats: ["desserts", "rapides"], temps: 25, prep: 10, diff: 1, portions: 12,
    ust: ["four"],
    ing: [[200, "g", "farine"], [120, "g", "beurre", "mou"], [100, "g", "sucre"], [80, "g", "cassonade"], [1, "", "oeuf"], [150, "g", "pepites_chocolat"], [1, "c. à c.", "levure_chimique"], [1, "pincée", "sel"]],
    etapes: ["Préchauffez le four à 180 °C.", "Mélangez le beurre mou avec les deux sucres, puis ajoutez l'œuf.", "Incorporez la farine, la levure et le sel, puis les pépites.", "Formez 12 boules sur une plaque recouverte de papier cuisson, en les espaçant.", "Enfournez 10 à 12 min : les cookies doivent rester tendres au centre."]
  },
  // ---------- CLASSIQUES ----------
  {
    id: "gratin-dauphinois", titre: "Gratin dauphinois crémeux",
    accroche: "Des pommes de terre fondantes, cuites lentement dans la crème à l'ail.",
    cats: ["classiques"], temps: 90, prep: 20, diff: 1, portions: 6,
    ust: ["four", "plaques", "casserole"],
    ing: [[1, "kg", "pomme_de_terre"], [40, "cl", "creme"], [20, "cl", "lait"], [2, "", "ail"], [1, "pincée", "muscade"], [20, "g", "beurre"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Préchauffez le four à 160 °C. Frottez le plat avec une gousse d'ail, puis beurrez-le.", "Émincez les pommes de terre en rondelles fines, sans les rincer.", "Portez la crème, le lait, l'ail écrasé, la muscade, le sel et le poivre à frémissement, puis ajoutez les pommes de terre 5 min.", "Versez dans le plat et enfournez 1 h 15, jusqu'à ce que le dessus soit doré et que la lame d'un couteau s'enfonce sans résistance."]
  },
  {
    id: "quiche-lorraine", titre: "Quiche lorraine traditionnelle",
    accroche: "Une pâte croustillante, des lardons fumés et un appareil tremblotant.",
    cats: ["classiques"], temps: 50, prep: 15, diff: 1, portions: 6,
    ust: ["four", "plaques", "poele"],
    ing: [[1, "", "pate_brisee"], [200, "g", "lardons"], [3, "", "oeuf"], [20, "cl", "creme"], [20, "cl", "lait"], [1, "pincée", "muscade"], [1, "pincée", "poivre"]],
    etapes: ["Préchauffez le four à 200 °C et foncez le moule avec la pâte. Piquez le fond.", "Faites revenir les lardons à sec 5 min, puis répartissez-les sur la pâte.", "Fouettez les œufs, la crème, le lait, la muscade et le poivre, puis versez sur les lardons.", "Enfournez 30 à 35 min jusqu'à ce que la quiche soit dorée et prise."]
  },
  {
    id: "poulet-roti", titre: "Poulet rôti au thym et pommes de terre",
    accroche: "Une peau dorée et croustillante, une chair juteuse, le repas du dimanche.",
    cats: ["classiques"], temps: 90, prep: 15, diff: 1, portions: 4,
    ust: ["four"],
    ing: [[1, "", "poulet_entier"], [50, "g", "beurre", "mou"], [4, "", "ail"], [6, "brins", "thym"], [1, "", "citron"], [800, "g", "pomme_de_terre", "grenailles"], [2, "c. à s.", "huile_olive"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Préchauffez le four à 210 °C. Sortez le poulet du réfrigérateur 30 min avant.", "Badigeonnez-le de beurre, salez, poivrez et glissez le citron coupé et le thym à l'intérieur.", "Disposez les pommes de terre et l'ail autour avec l'huile.", "Enfournez 1 h 15 en arrosant toutes les 20 min avec le jus.", "Laissez reposer 10 min avant de découper."]
  },
  {
    id: "ratatouille", titre: "Ratatouille provençale mijotée",
    accroche: "Les légumes du soleil cuits séparément, puis mijotés ensemble.",
    cats: ["classiques", "healthy"], temps: 60, prep: 25, diff: 1, portions: 6,
    ust: ["plaques", "poele", "cocotte"],
    ing: [[1, "", "aubergine"], [2, "", "courgette"], [2, "", "poivron"], [4, "", "tomate"], [1, "", "oignon"], [3, "", "ail"], [5, "c. à s.", "huile_olive"], [1, "c. à c.", "herbes_provence"], [1, "pincée", "sel"]],
    etapes: ["Coupez tous les légumes en dés de taille égale.", "Faites revenir séparément l'aubergine, les courgettes et les poivrons dans l'huile, quelques minutes chacun.", "Dans la cocotte, faites fondre l'oignon, ajoutez l'ail et les tomates.", "Ajoutez tous les légumes et les herbes, couvrez et laissez mijoter 35 min à feu doux."]
  },
  {
    id: "hachis-parmentier", titre: "Hachis parmentier gratiné",
    accroche: "Une viande fondante sous une purée maison dorée au four.",
    cats: ["classiques"], temps: 60, prep: 25, diff: 1, portions: 6,
    ust: ["four", "plaques", "casserole", "poele"],
    ing: [[500, "g", "boeuf_hache"], [1, "kg", "pomme_de_terre"], [15, "cl", "lait"], [50, "g", "beurre"], [1, "", "oignon"], [80, "g", "emmental"], [1, "pincée", "muscade"], [1, "pincée", "sel"]],
    etapes: ["Faites cuire les pommes de terre épluchées 25 min dans l'eau salée, puis écrasez-les avec le beurre, le lait chaud et la muscade.", "Faites revenir l'oignon haché, puis ajoutez la viande et faites-la dorer 8 min.", "Préchauffez le four à 200 °C. Étalez la viande dans un plat, couvrez de purée, puis parsemez de fromage.", "Enfournez 20 min jusqu'à ce que le dessus soit bien gratiné."]
  },
  {
    id: "soupe-oignon", titre: "Soupe à l'oignon gratinée",
    accroche: "Des oignons longuement caramélisés et un croûton filant.",
    cats: ["classiques", "longues"], temps: 75, prep: 15, diff: 2, portions: 4,
    ust: ["plaques", "cocotte", "four"],
    ing: [[6, "", "oignon"], [40, "g", "beurre"], [1, "c. à s.", "farine"], [15, "cl", "vin_blanc"], [1.5, "L", "bouillon"], [4, "", "pain"], [120, "g", "emmental"], [1, "pincée", "poivre"]],
    etapes: ["Émincez les oignons et faites-les fondre au beurre 30 min à feu doux, jusqu'à ce qu'ils soient bien bruns.", "Saupoudrez de farine, mélangez, puis déglacez au vin blanc.", "Versez le bouillon et laissez mijoter 20 min.", "Répartissez dans des bols allant au four, posez une tranche de pain grillé, couvrez de fromage et passez 5 min sous le gril."]
  },
  // ---------- LONGUES ----------
  {
    id: "boeuf-bourguignon", titre: "Bœuf bourguignon",
    accroche: "Un bœuf fondant, confit dans le vin rouge pendant plusieurs heures.",
    cats: ["longues", "classiques"], temps: 210, prep: 30, diff: 2, portions: 6,
    ust: ["plaques", "cocotte"],
    ing: [[1.2, "kg", "boeuf", "en gros cubes"], [75, "cl", "vin_rouge"], [150, "g", "lardons"], [3, "", "carotte"], [2, "", "oignon"], [250, "g", "champignon"], [2, "", "ail"], [2, "c. à s.", "farine"], [1, "", "bouquet_garni"], [30, "g", "beurre"], [2, "c. à s.", "huile"], [1, "pincée", "sel"]],
    etapes: ["Faites dorer les cubes de bœuf en plusieurs fois dans l'huile très chaude. Réservez.", "Dans la même cocotte, faites revenir les lardons, les oignons et les carottes en rondelles.", "Remettez la viande, saupoudrez de farine et mélangez 2 min.", "Versez le vin, ajoutez l'ail et le bouquet garni, puis complétez d'eau à hauteur. Couvrez et laissez mijoter 3 h à feu très doux.", "20 min avant la fin, faites sauter les champignons au beurre et ajoutez-les à la cocotte."]
  },
  {
    id: "blanquette-veau", titre: "Blanquette de veau à l'ancienne",
    accroche: "Une sauce blanche veloutée, citronnée, et une viande qui se coupe à la cuillère.",
    cats: ["longues", "classiques"], temps: 135, prep: 30, diff: 2, portions: 6,
    ust: ["plaques", "cocotte", "casserole"],
    ing: [[1.2, "kg", "veau"], [3, "", "carotte"], [1, "", "oignon"], [2, "", "clou_girofle"], [1, "", "bouquet_garni"], [250, "g", "champignon"], [20, "cl", "creme"], [1, "", "jaune_oeuf"], [40, "g", "beurre"], [40, "g", "farine"], [1, "", "citron"], [1, "pincée", "sel"]],
    etapes: ["Couvrez la viande d'eau froide, portez à ébullition, écumez. Ajoutez les carottes, l'oignon piqué des clous de girofle et le bouquet garni. Laissez frémir 1 h 30.", "Faites cuire les champignons à part avec un peu de beurre et de citron.", "Préparez un roux avec le beurre et la farine, puis versez 75 cl de bouillon filtré en fouettant.", "Hors du feu, liez la sauce avec la crème et le jaune d'œuf, ajoutez un trait de citron.", "Nappez la viande, les carottes et les champignons de sauce. Servez avec du riz."]
  },
  {
    id: "pot-au-feu", titre: "Pot-au-feu et ses légumes",
    accroche: "Le grand classique familial : un bouillon parfumé, des viandes tendres et des légumes fondants.",
    cats: ["longues", "classiques"], temps: 240, prep: 30, diff: 1, portions: 8,
    ust: ["plaques", "cocotte"],
    ing: [[1.5, "kg", "boeuf", "macreuse et plat de côtes"], [4, "", "os_moelle"], [6, "", "carotte"], [3, "", "poireau"], [4, "", "navet"], [2, "", "celeri"], [1, "", "oignon"], [2, "", "clou_girofle"], [1, "", "bouquet_garni"], [1, "c. à s.", "sel"]],
    etapes: ["Placez la viande dans une grande cocotte d'eau froide, portez à ébullition et écumez soigneusement.", "Ajoutez l'oignon piqué des clous de girofle, le bouquet garni et le sel. Laissez frémir 2 h 30.", "Ajoutez les légumes épluchés et coupés en gros tronçons, puis poursuivez 1 h.", "Ajoutez les os à moelle 20 min avant la fin. Servez la viande et les légumes, et le bouillon à part."]
  },
  {
    id: "epaule-agneau-confite", titre: "Épaule d'agneau confite 7 heures",
    accroche: "Une viande qui s'effiloche à la fourchette, parfumée à l'ail et au romarin.",
    cats: ["longues", "classiques"], temps: 440, prep: 20, diff: 1, portions: 6,
    ust: ["four", "cocotte"],
    ing: [[1.5, "kg", "agneau"], [1, "", "ail", "une tête entière"], [4, "brins", "romarin"], [4, "brins", "thym"], [20, "cl", "vin_blanc"], [3, "c. à s.", "huile_olive"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Préchauffez le four à 120 °C.", "Massez l'épaule avec l'huile, le sel et le poivre, puis faites-la dorer sur toutes les faces dans la cocotte.", "Ajoutez la tête d'ail coupée en deux, les herbes et le vin blanc.", "Couvrez et enfournez 7 h en arrosant toutes les heures. Ajoutez un peu d'eau si besoin."]
  },
  {
    id: "pain-maison", titre: "Pain de campagne maison",
    accroche: "Une croûte qui chante et une mie alvéolée, avec seulement 4 ingrédients.",
    cats: ["longues"], temps: 210, prep: 20, diff: 2, portions: 8,
    ust: ["four", "cocotte"],
    ing: [[500, "g", "farine", "type 65"], [330, "ml", "eau", "tiède"], [7, "g", "levure_boulanger"], [10, "g", "sel"]],
    etapes: ["Mélangez la farine et l'eau, puis laissez reposer 30 min.", "Ajoutez la levure et le sel, puis pétrissez 10 min jusqu'à obtenir une pâte lisse.", "Laissez lever 1 h 30 sous un torchon, en rabattant la pâte 2 fois.", "Façonnez une boule et laissez-la lever encore 45 min.", "Faites cuire 30 min à 240 °C dans la cocotte chaude couverte, puis 15 min à découvert."]
  },
  {
    id: "chili-con-carne", titre: "Chili con carne mijoté",
    accroche: "Épicé, profond et réconfortant, encore meilleur le lendemain.",
    cats: ["longues", "monde"], temps: 150, prep: 20, diff: 1, portions: 6,
    ust: ["plaques", "cocotte"],
    ing: [[600, "g", "boeuf_hache"], [400, "g", "haricots_rouges"], [800, "g", "tomates_concassees"], [2, "", "oignon"], [1, "", "poivron"], [3, "", "ail"], [2, "c. à c.", "cumin"], [1, "c. à c.", "piment"], [1, "c. à c.", "paprika"], [2, "c. à s.", "huile"], [1, "pincée", "sel"]],
    etapes: ["Faites revenir les oignons et le poivron dans l'huile 5 min.", "Ajoutez la viande et faites-la bien dorer, puis l'ail et les épices.", "Versez les tomates et un verre d'eau. Couvrez et laissez mijoter 1 h 30 à feu doux.", "Ajoutez les haricots égouttés et poursuivez 30 min. Servez avec du riz."]
  },
  {
    id: "tajine-poulet-citron", titre: "Tajine de poulet aux citrons confits",
    accroche: "Le parfum du Maroc : citrons confits, olives et épices douces.",
    cats: ["monde", "longues"], temps: 90, prep: 20, diff: 2, portions: 6,
    ust: ["plaques", "cocotte"],
    ing: [[1.2, "kg", "poulet", "cuisses et hauts de cuisses"], [2, "", "citron_confit"], [150, "g", "olives", "vertes"], [2, "", "oignon"], [3, "", "ail"], [1, "c. à s.", "gingembre"], [1, "c. à c.", "curcuma"], [1, "c. à c.", "cumin"], [3, "c. à s.", "huile_olive"], [2, "c. à s.", "coriandre"]],
    etapes: ["Faites dorer le poulet dans l'huile, puis réservez.", "Faites fondre les oignons émincés avec l'ail, le gingembre et les épices.", "Remettez le poulet, ajoutez 30 cl d'eau, couvrez et laissez mijoter 45 min.", "Ajoutez les citrons confits coupés en quartiers et les olives, puis poursuivez 20 min. Parsemez de coriandre."]
  },
  // ---------- HEALTHY ----------
  {
    id: "buddha-bowl", titre: "Buddha bowl quinoa, patate douce & tahini",
    accroche: "Un bol complet, végétal et coloré, avec une sauce tahini citronnée.",
    cats: ["healthy"], temps: 35, prep: 15, diff: 1, portions: 4,
    ust: ["four", "plaques", "casserole"],
    ing: [[200, "g", "quinoa"], [400, "g", "pois_chiches"], [1, "", "patate_douce"], [2, "", "avocat"], [100, "g", "epinards"], [3, "c. à s.", "tahini"], [1, "", "citron"], [1, "c. à s.", "sesame"], [2, "c. à s.", "huile_olive"], [1, "c. à c.", "paprika"]],
    etapes: ["Préchauffez le four à 200 °C. Rôtissez la patate douce en cubes et les pois chiches avec l'huile et le paprika pendant 25 min.", "Faites cuire le quinoa 12 min dans deux fois son volume d'eau.", "Mélangez le tahini, le jus de citron et 3 c. à s. d'eau pour obtenir la sauce.", "Composez les bols : quinoa, épinards, légumes rôtis, avocat tranché, sauce et sésame."]
  },
  {
    id: "salade-quinoa-feta", titre: "Salade de quinoa, feta & menthe",
    accroche: "Fraîche et croquante, parfaite pour un déjeuner léger.",
    cats: ["healthy", "rapides"], temps: 20, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "casserole"],
    ing: [[200, "g", "quinoa"], [1, "", "concombre"], [250, "g", "tomate_cerise"], [150, "g", "feta"], [80, "g", "olives"], [10, "brins", "menthe"], [1, "", "citron"], [3, "c. à s.", "huile_olive"]],
    etapes: ["Faites cuire le quinoa 12 min, puis rincez-le à l'eau froide.", "Coupez le concombre en dés et les tomates en deux, émiettez la feta.", "Mélangez le tout avec les olives et la menthe ciselée.", "Assaisonnez avec le jus de citron et l'huile."]
  },
  {
    id: "soupe-lentilles-corail", titre: "Velouté de lentilles corail au lait de coco",
    accroche: "Doux, épicé et rassasiant, prêt en 30 minutes.",
    cats: ["healthy", "monde"], temps: 30, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "casserole", "mixeur"],
    ing: [[250, "g", "lentilles_corail"], [40, "cl", "lait_coco"], [1, "", "carotte"], [1, "", "oignon"], [2, "c. à c.", "curry"], [1, "c. à s.", "gingembre"], [80, "cl", "bouillon"], [1, "c. à s.", "huile"]],
    etapes: ["Faites revenir l'oignon et la carotte en dés dans l'huile 5 min.", "Ajoutez le curry et le gingembre, puis les lentilles rincées.", "Versez le bouillon et laissez cuire 20 min.", "Ajoutez le lait de coco et mixez jusqu'à obtenir un velouté lisse."]
  },
  {
    id: "poke-bowl-saumon", titre: "Poke bowl saumon, mangue & avocat",
    accroche: "Le bol hawaïen frais et généreux, avec une marinade soja-sésame.",
    cats: ["healthy", "monde"], temps: 25, prep: 20, diff: 2, portions: 4,
    ust: ["plaques", "casserole"],
    ing: [[250, "g", "riz"], [400, "g", "saumon_cru", "en cubes"], [2, "", "avocat"], [1, "", "mangue"], [150, "g", "edamame"], [1, "", "concombre"], [4, "c. à s.", "sauce_soja"], [1, "c. à s.", "sesame"], [1, "", "citron_vert"]],
    etapes: ["Faites cuire le riz, puis laissez-le tiédir.", "Faites mariner le saumon 10 min dans la sauce soja et le jus de citron vert, au frais.", "Taillez l'avocat, la mangue et le concombre en dés.", "Dressez le riz, puis disposez chaque ingrédient en sections. Parsemez de sésame."]
  },
  {
    id: "curry-legumes", titre: "Curry de pois chiches & épinards",
    accroche: "Un curry végétal crémeux et parfumé, prêt en une demi-heure.",
    cats: ["healthy", "monde"], temps: 35, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "cocotte", "casserole"],
    ing: [[400, "g", "pois_chiches"], [150, "g", "epinards"], [400, "g", "tomates_concassees"], [40, "cl", "lait_coco"], [1, "", "oignon"], [2, "", "ail"], [2, "c. à c.", "curry"], [1, "c. à s.", "gingembre"], [250, "g", "riz"], [1, "c. à s.", "huile"]],
    etapes: ["Faites cuire le riz.", "Faites revenir l'oignon dans l'huile, puis ajoutez l'ail, le gingembre et le curry.", "Ajoutez les tomates, le lait de coco et les pois chiches. Laissez mijoter 15 min.", "Incorporez les épinards jusqu'à ce qu'ils tombent. Servez avec le riz."]
  },
  {
    id: "papillote-cabillaud", titre: "Papillote de cabillaud, courgette & tomates",
    accroche: "Une cuisson douce qui garde tout le moelleux du poisson.",
    cats: ["healthy"], temps: 25, prep: 10, diff: 1, portions: 4,
    ust: ["four"],
    ing: [[4, "", "cabillaud"], [1, "", "courgette"], [200, "g", "tomate_cerise"], [1, "", "citron"], [4, "brins", "thym"], [2, "c. à s.", "huile_olive"], [1, "pincée", "sel"]],
    etapes: ["Préchauffez le four à 200 °C.", "Taillez la courgette en fines rondelles et répartissez-la sur 4 feuilles de papier cuisson.", "Posez le poisson dessus, puis les tomates, une rondelle de citron, le thym, l'huile et le sel.", "Fermez hermétiquement et enfournez 15 min."]
  },
  // ---------- DESSERTS ----------
  {
    id: "fondant-chocolat", titre: "Fondant au chocolat cœur coulant",
    accroche: "Une croûte fine et un cœur qui s'écoule à la cuillère.",
    cats: ["desserts"], temps: 30, prep: 15, diff: 2, portions: 6,
    ust: ["four", "plaques", "casserole"],
    ing: [[200, "g", "chocolat"], [150, "g", "beurre"], [120, "g", "sucre"], [4, "", "oeuf"], [50, "g", "farine"]],
    etapes: ["Préchauffez le four à 200 °C. Beurrez et farinez 6 ramequins.", "Faites fondre le chocolat et le beurre au bain-marie.", "Fouettez les œufs et le sucre, puis ajoutez le chocolat et la farine.", "Répartissez dans les ramequins et enfournez 9 à 10 min. Démoulez aussitôt."]
  },
  {
    id: "tarte-tatin", titre: "Tarte tatin caramélisée",
    accroche: "Des pommes fondantes sous un caramel ambré et une pâte croustillante.",
    cats: ["desserts", "classiques"], temps: 75, prep: 25, diff: 2, portions: 8,
    ust: ["four", "plaques", "poele"],
    ing: [[8, "", "pomme"], [150, "g", "sucre"], [80, "g", "beurre"], [1, "", "pate_feuilletee"]],
    etapes: ["Préchauffez le four à 190 °C. Épluchez les pommes et coupez-les en quartiers.", "Faites un caramel à sec avec le sucre dans une poêle allant au four, puis ajoutez le beurre.", "Rangez les pommes serrées dans le caramel et faites-les cuire 10 min.", "Couvrez avec la pâte en rentrant les bords, puis enfournez 35 min.", "Laissez tiédir 10 min, puis retournez la tarte sur un plat."]
  },
  {
    id: "creme-brulee", titre: "Crème brûlée à la vanille",
    accroche: "Une crème onctueuse sous une fine couche de caramel craquant.",
    cats: ["desserts", "classiques"], temps: 300, prep: 15, diff: 2, portions: 6,
    ust: ["four", "plaques", "casserole", "chalumeau"],
    ing: [[50, "cl", "creme"], [6, "", "jaune_oeuf"], [100, "g", "sucre"], [1, "", "vanille"], [4, "c. à s.", "cassonade"]],
    etapes: ["Préchauffez le four à 100 °C. Faites infuser la gousse de vanille fendue dans la crème chaude 10 min.", "Fouettez les jaunes et le sucre sans faire mousser, puis versez la crème en filet.", "Répartissez dans des ramequins plats et faites cuire 1 h : le centre doit rester tremblotant.", "Laissez refroidir puis placez au frais au moins 3 h.", "Saupoudrez de cassonade et caramélisez au chalumeau juste avant de servir."]
  },
  {
    id: "tiramisu", titre: "Tiramisu au café",
    accroche: "La recette italienne aérienne, à préparer la veille.",
    cats: ["desserts", "monde"], temps: 390, prep: 30, diff: 1, portions: 6,
    ust: ["batteur"],
    ing: [[250, "g", "mascarpone"], [3, "", "oeuf"], [80, "g", "sucre"], [24, "", "biscuits_cuillere"], [30, "cl", "cafe", "refroidi"], [2, "c. à s.", "cacao"]],
    etapes: ["Séparez les blancs des jaunes. Fouettez les jaunes avec le sucre, puis ajoutez le mascarpone.", "Montez les blancs en neige ferme et incorporez-les délicatement.", "Trempez rapidement les biscuits dans le café et disposez-en une couche dans le plat.", "Alternez crème et biscuits, puis terminez par une couche de crème.", "Placez au frais au moins 6 h. Saupoudrez de cacao au moment de servir."]
  },
  {
    id: "mousse-chocolat", titre: "Mousse au chocolat intense",
    accroche: "Aérienne et profonde, avec seulement 4 ingrédients.",
    cats: ["desserts"], temps: 260, prep: 20, diff: 1, portions: 6,
    ust: ["plaques", "casserole", "batteur"],
    ing: [[200, "g", "chocolat"], [6, "", "oeuf"], [1, "c. à s.", "sucre"], [1, "pincée", "sel"]],
    etapes: ["Faites fondre le chocolat au bain-marie, puis laissez tiédir.", "Séparez les blancs des jaunes et ajoutez les jaunes au chocolat.", "Montez les blancs en neige avec le sel, puis ajoutez le sucre pour les serrer.", "Incorporez les blancs au chocolat en trois fois, délicatement. Placez au frais au moins 4 h."]
  },
  {
    id: "panna-cotta", titre: "Panna cotta vanille & coulis de fruits rouges",
    accroche: "Une crème italienne délicate et un coulis acidulé.",
    cats: ["desserts", "monde"], temps: 260, prep: 20, diff: 1, portions: 6,
    ust: ["plaques", "casserole", "blender"],
    ing: [[50, "cl", "creme"], [60, "g", "sucre"], [3, "", "gelatine"], [1, "", "vanille"], [250, "g", "fruits_rouges"], [30, "g", "sucre", "pour le coulis"]],
    etapes: ["Faites ramollir la gélatine dans l'eau froide.", "Chauffez la crème avec le sucre et la vanille fendue, sans faire bouillir.", "Hors du feu, ajoutez la gélatine essorée, puis répartissez dans des verrines. Placez au frais 4 h.", "Mixez les fruits rouges avec le sucre du coulis, puis versez sur les panna cotta."]
  },
  // ---------- MONDE ----------
  {
    id: "pad-thai", titre: "Pad thaï aux crevettes",
    accroche: "Le plat de rue thaïlandais : sucré, salé, acidulé et croquant.",
    cats: ["monde"], temps: 30, prep: 15, diff: 2, portions: 4,
    ust: ["plaques", "wok"],
    ing: [[250, "g", "nouilles_riz"], [300, "g", "crevettes"], [2, "", "oeuf"], [150, "g", "germes_soja"], [50, "g", "cacahuetes", "concassées"], [3, "c. à s.", "sauce_poisson"], [1, "c. à s.", "sucre"], [1, "", "citron_vert"], [2, "c. à s.", "ciboulette"], [2, "c. à s.", "huile"]],
    etapes: ["Faites tremper les nouilles 10 min dans l'eau chaude, puis égouttez-les.", "Saisissez les crevettes dans l'huile très chaude, puis poussez-les sur le côté et brouillez les œufs.", "Ajoutez les nouilles, la sauce poisson, le sucre et le jus de citron vert, puis mélangez 2 min.", "Ajoutez les pousses et la ciboulette, puis servez avec les cacahuètes et un quartier de citron vert."]
  },
  {
    id: "risotto-champignons", titre: "Risotto crémeux aux champignons",
    accroche: "Un riz nacré, une texture onctueuse et beaucoup de parmesan.",
    cats: ["monde", "classiques"], temps: 40, prep: 10, diff: 2, portions: 4,
    ust: ["plaques", "casserole", "poele"],
    ing: [[300, "g", "riz_arborio"], [300, "g", "champignon"], [1, "", "oignon"], [15, "cl", "vin_blanc"], [1, "L", "bouillon", "chaud"], [60, "g", "parmesan"], [40, "g", "beurre"], [1, "c. à s.", "huile_olive"]],
    etapes: ["Faites sauter les champignons émincés dans une poêle avec une noix de beurre. Réservez.", "Faites fondre l'oignon dans l'huile, ajoutez le riz et nacrez-le 2 min.", "Déglacez au vin blanc, puis ajoutez le bouillon louche par louche en remuant, pendant 18 min.", "Hors du feu, incorporez les champignons, le parmesan et le reste du beurre. Couvrez 2 min avant de servir."]
  },
  {
    id: "butter-chicken", titre: "Butter chicken et riz basmati",
    accroche: "Le curry indien le plus réconfortant : tendre, crémeux et doucement épicé.",
    cats: ["monde"], temps: 45, prep: 15, diff: 1, portions: 4,
    ust: ["plaques", "cocotte", "casserole"],
    ing: [[600, "g", "poulet"], [150, "g", "yaourt"], [400, "g", "tomates_concassees"], [20, "cl", "creme"], [40, "g", "beurre"], [1, "", "oignon"], [3, "", "ail"], [1, "c. à s.", "gingembre"], [2, "c. à c.", "garam_masala"], [300, "g", "riz"]],
    etapes: ["Faites mariner le poulet en morceaux avec le yaourt et la moitié du garam masala (30 min si possible).", "Faites fondre l'oignon dans le beurre, puis ajoutez l'ail, le gingembre et le reste des épices.", "Ajoutez les tomates et laissez réduire 10 min, puis le poulet et 15 min de cuisson.", "Ajoutez la crème et mijotez 5 min. Servez avec le riz basmati."]
  }
];
