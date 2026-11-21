/* SAVORIA — Recettes tendances (virales sur TikTok)
   Même format que recipes.js. "tendance: 1" affiche le badge et les place dans la sélection Tendances. */
window.S = window.S || {};
S.RECETTES = S.RECETTES.concat([
  {
    id: "steak-au-poivre", titre: "Steak au poivre, sauce crémeuse au cognac", type: "plat", tendance: 1,
    accroche: "Le classique de bistrot devenu star de TikTok : croûte de poivre et sauce flambée.",
    cats: ["classiques", "rapides"], temps: 25, prep: 10, diff: 2, portions: 2,
    ust: ["plaques", "poele"],
    ing: [[400, "g", "filet_boeuf", "2 pavés de 3 cm d'épaisseur"], [2, "c. à s.", "poivre_grains"], [1, "", "echalote"], [4, "cl", "cognac"], [15, "cl", "creme"], [10, "cl", "fond_veau"], [30, "g", "beurre"], [1, "c. à s.", "huile"], [1, "pincée", "sel"]],
    etapes: ["Sortez la viande 30 min avant. Concassez le poivre au rouleau à pâtisserie, salez les pavés et enrobez-les de poivre en appuyant.", "Saisissez-les dans l'huile très chaude 3 min par face pour une cuisson saignante, ajoutez la moitié du beurre et arrosez. Réservez sous aluminium.", "Retirez l'excès de gras, faites fondre l'échalote ciselée 1 min, puis versez le cognac et flambez prudemment, hotte éteinte.", "Ajoutez le fond de veau, laissez réduire de moitié, puis la crème. Réduisez jusqu'à ce que la sauce nappe la cuillère, et ajoutez le reste du beurre.", "Remettez les steaks et leur jus dans la sauce 30 secondes, puis servez avec des frites ou une purée."]
  },
  {
    id: "poulet-au-poivre", titre: "Poulet au poivre, sauce crème et échalotes", type: "plat", tendance: 1,
    accroche: "La version volaille du steak au poivre, devenue virale pour son poulet ultra juteux.",
    cats: ["classiques"], temps: 40, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[4, "", "poulet", "blancs ou hauts de cuisse"], [1, "c. à s.", "poivre_grains"], [2, "", "echalote"], [2, "", "ail"], [4, "cl", "cognac"], [20, "cl", "creme"], [15, "cl", "bouillon"], [1, "c. à c.", "moutarde"], [30, "g", "beurre"], [4, "brins", "thym"]],
    etapes: ["Salez le poulet, enrobez-le de poivre concassé et faites-le dorer 6 min par face dans le beurre. Réservez.", "Faites revenir les échalotes et l'ail dans la même poêle, puis déglacez au cognac.", "Ajoutez le bouillon, la crème, la moutarde et le thym, puis laissez réduire 5 min.", "Remettez le poulet dans la sauce, couvrez et laissez cuire 10 min à feu doux en l'arrosant."]
  },
  {
    id: "pates-feta-four", titre: "Pâtes à la feta rôtie et tomates cerises", type: "plat", tendance: 1,
    accroche: "La recette qui a affolé TikTok : un bloc de feta fondant et des tomates confites au four.",
    cats: ["rapides", "monde"], temps: 35, prep: 5, diff: 1, portions: 4,
    ust: ["four", "plaques", "casserole"],
    ing: [[200, "g", "feta", "en bloc"], [500, "g", "tomate_cerise"], [4, "c. à s.", "huile_olive"], [3, "", "ail"], [350, "g", "pates"], [10, "brins", "basilic"], [1, "pincée", "piment"], [1, "pincée", "poivre"]],
    etapes: ["Préchauffez le four à 200 °C. Mettez les tomates cerises et l'ail dans un plat, la feta entière au centre, puis arrosez d'huile et poivrez.", "Enfournez 30 min, jusqu'à ce que les tomates éclatent et que la feta soit dorée.", "Pendant ce temps, faites cuire les pâtes en gardant un peu d'eau de cuisson.", "Écrasez la feta et les tomates à la fourchette pour obtenir une sauce, ajoutez les pâtes, un peu d'eau de cuisson et le basilic."]
  },
  {
    id: "salade-concombre-virale", titre: "Salade de concombre virale soja-sésame", type: "entree", tendance: 1,
    accroche: "Le concombre émincé et secoué en bocal : fraîche, croquante, addictive.",
    cats: ["rapides", "healthy", "monde"], temps: 10, prep: 10, diff: 1, portions: 2,
    ust: [],
    ing: [[1, "", "concombre"], [1, "c. à s.", "sauce_soja"], [1, "c. à s.", "vinaigre_riz"], [1, "c. à c.", "huile_sesame"], [1, "c. à c.", "miel"], [1, "", "ail"], [1, "c. à c.", "sesame"], [1, "pincée", "piment"]],
    etapes: ["Émincez finement le concombre et mettez-le dans un grand bocal.", "Ajoutez l'ail râpé, la sauce soja, le vinaigre, l'huile de sésame, le miel et le piment.", "Fermez le bocal et secouez vigoureusement 30 secondes. Parsemez de sésame et servez bien frais."]
  },
  {
    id: "oeufs-pesto", titre: "Œufs au plat au pesto sur toast", type: "petitdej", tendance: 1,
    accroche: "Les œufs cuits directement dans le pesto : un brunch en 5 minutes.",
    cats: ["rapides"], temps: 8, prep: 3, diff: 1, portions: 2,
    ust: ["plaques", "poele"],
    ing: [[2, "c. à s.", "pesto"], [4, "", "oeuf"], [2, "", "pain"], [1, "", "avocat"], [1, "pincée", "piment"], [1, "pincée", "sel"]],
    etapes: ["Étalez le pesto dans la poêle à feu moyen.", "Quand il grésille, cassez les œufs dessus et laissez cuire 3 min.", "Faites griller le pain, garnissez d'avocat écrasé et posez les œufs. Terminez par le piment."]
  },
  {
    id: "pates-citron", titre: "Pâtes au citron et parmesan", type: "plat", tendance: 1,
    accroche: "Les lemon pasta : une sauce soyeuse au citron, prête avant la fin de la cuisson des pâtes.",
    cats: ["rapides", "monde"], temps: 15, prep: 5, diff: 1, portions: 4,
    ust: ["plaques", "casserole"],
    ing: [[400, "g", "spaghetti"], [2, "", "citron", "bio, zeste et jus"], [60, "g", "beurre"], [80, "g", "parmesan"], [1, "c. à c.", "poivre"], [6, "brins", "basilic"]],
    etapes: ["Faites cuire les pâtes et gardez un grand verre d'eau de cuisson.", "Dans la casserole vide, faites fondre le beurre avec le zeste et le jus des citrons.", "Ajoutez les pâtes, le parmesan et l'eau de cuisson petit à petit en remuant jusqu'à obtenir une sauce crémeuse. Poivrez et ajoutez le basilic."]
  },
  {
    id: "tiramisu-yaourt-speculoos", titre: "Tiramisu express au yaourt et spéculoos", type: "dessert", tendance: 1,
    accroche: "Le dessert viral en 10 minutes : yaourt grec, spéculoos imbibés de café et cacao.",
    cats: ["desserts", "rapides", "healthy"], temps: 130, prep: 10, diff: 1, portions: 4,
    ust: [],
    ing: [[500, "g", "yaourt", "grec"], [2, "c. à s.", "miel"], [16, "", "speculoos"], [15, "cl", "cafe", "refroidi"], [2, "c. à s.", "cacao"]],
    etapes: ["Mélangez le yaourt grec et le miel.", "Trempez rapidement les spéculoos dans le café et tapissez-en le fond des verrines.", "Alternez avec le yaourt, puis terminez par une couche de yaourt.", "Placez au frais 2 h, puis saupoudrez de cacao au moment de servir."]
  },
  {
    id: "fraises-chocolat-dubai", titre: "Fraises au chocolat façon Dubaï", type: "dessert", tendance: 1,
    accroche: "La tendance la plus croustillante du moment : pistache, kadaïf grillé et chocolat.",
    cats: ["desserts"], temps: 30, prep: 20, diff: 2, portions: 4,
    ust: ["plaques", "poele", "casserole"],
    ing: [[400, "g", "fraises"], [100, "g", "kadaif"], [30, "g", "beurre"], [150, "g", "creme_pistache"], [200, "g", "chocolat"]],
    etapes: ["Coupez le kadaïf en petits morceaux et faites-le dorer dans le beurre en remuant, 5 min. Laissez refroidir.", "Mélangez le kadaïf avec la crème de pistache.", "Disposez les fraises coupées en deux dans des verres, puis couvrez du mélange pistache.", "Faites fondre le chocolat au bain-marie, versez-le par-dessus et laissez durcir 10 min au frais."]
  },
  {
    id: "wrap-cottage-cheese", titre: "Wrap protéiné au cottage cheese", type: "petitdej", tendance: 1,
    accroche: "La galette sans farine du moment : œufs et cottage cheese cuits au four.",
    cats: ["healthy", "rapides"], temps: 35, prep: 5, diff: 1, portions: 2,
    ust: ["four", "blender"],
    ing: [[250, "g", "cottage"], [2, "", "oeuf"], [1, "c. à c.", "origan"], [1, "", "avocat"], [80, "g", "saumon_fume"], [30, "g", "epinards"], [1, "pincée", "poivre"]],
    etapes: ["Préchauffez le four à 180 °C. Mixez le cottage cheese, les œufs, l'origan et le poivre.", "Étalez finement sur une plaque recouverte de papier cuisson et enfournez 30 min, jusqu'à ce que la galette soit dorée.", "Laissez tiédir, garnissez d'avocat, d'épinards et de saumon fumé, puis roulez."]
  },
  {
    id: "tortilla-pliee", titre: "Tortilla pliée jambon-fromage", type: "plat", tendance: 1,
    accroche: "Le fameux tortilla hack : une entaille, quatre garnitures, un pliage, et c'est doré.",
    cats: ["rapides"], temps: 10, prep: 5, diff: 1, portions: 2,
    ust: ["plaques", "poele"],
    ing: [[2, "", "tortilla"], [2, "", "jambon"], [60, "g", "emmental"], [1, "", "tomate"], [1, "poignée", "laitue"], [2, "c. à s.", "fromage_frais"]],
    etapes: ["Faites une entaille du centre vers le bord de chaque tortilla.", "Garnissez chaque quart d'un ingrédient : fromage frais, jambon, tomate, laitue et fromage râpé.", "Repliez quart par quart pour former un triangle.", "Faites dorer 2 min de chaque côté dans la poêle chaude."]
  },
  {
    id: "smash-burger-tacos", titre: "Smash burger tacos", type: "plat", tendance: 1,
    accroche: "La viande écrasée directement sur la tortilla : moitié burger, moitié tacos.",
    cats: ["rapides", "monde"], temps: 15, prep: 5, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[400, "g", "boeuf_hache"], [8, "", "tortilla", "petites"], [8, "tranches", "cheddar"], [1, "", "oignon_rouge"], [4, "", "cornichons"], [1, "poignée", "laitue"], [4, "c. à s.", "mayonnaise"], [1, "c. à s.", "ketchup"], [1, "c. à c.", "moutarde"]],
    etapes: ["Étalez une fine couche de viande hachée salée sur une face de chaque tortilla.", "Posez-les côté viande dans la poêle très chaude et laissez saisir 2 min en appuyant.", "Retournez, ajoutez une tranche de cheddar et laissez fondre 1 min.", "Garnissez de sauce (mayonnaise, ketchup, moutarde), de laitue, d'oignon rouge et de cornichons, puis repliez."]
  },
  {
    id: "bol-riz-saumon", titre: "Bol de riz au saumon, mayo sriracha", type: "plat", tendance: 1,
    accroche: "Le bowl réconfortant qui a rendu TikTok fou : saumon émietté, riz et algues grillées.",
    cats: ["rapides", "healthy", "monde"], temps: 15, prep: 5, diff: 1, portions: 2,
    ust: ["microondes"],
    ing: [[300, "g", "riz", "cuit"], [200, "g", "saumon", "cuit"], [1, "c. à s.", "sauce_soja"], [2, "c. à s.", "mayonnaise"], [1, "c. à c.", "sriracha"], [1, "", "avocat"], [4, "", "nori"], [1, "c. à c.", "sesame"]],
    etapes: ["Émiettez le saumon sur le riz, ajoutez un glaçon et réchauffez 1 min au micro-ondes sous un papier cuisson.", "Retirez le glaçon, ajoutez la sauce soja, la mayonnaise et la sriracha, puis mélangez.", "Servez avec l'avocat tranché et le sésame, en prenant chaque bouchée dans une feuille de nori."]
  },
  {
    id: "pommes-de-terre-ecrasees", titre: "Pommes de terre écrasées croustillantes", type: "accompagnement", tendance: 1,
    accroche: "Les smashed potatoes : fondantes dedans, ultra croustillantes dehors.",
    cats: ["classiques"], temps: 55, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "casserole", "four"],
    ing: [[1, "kg", "pomme_de_terre", "grenailles"], [4, "c. à s.", "huile_olive"], [3, "", "ail"], [40, "g", "parmesan"], [4, "brins", "romarin"], [1, "pincée", "sel"]],
    etapes: ["Faites cuire les grenailles 20 min dans l'eau salée, puis égouttez-les.", "Disposez-les sur une plaque huilée et écrasez chacune avec le fond d'un verre.", "Arrosez d'huile, ajoutez l'ail, le romarin, le sel et le parmesan.", "Enfournez 30 min à 220 °C, jusqu'à ce que les bords soient bien dorés."]
  },
  {
    id: "pates-vodka", titre: "Pâtes à la vodka épicées", type: "plat", tendance: 1,
    accroche: "La sauce rosée crémeuse et pimentée qui a fait le tour des réseaux.",
    cats: ["rapides", "monde"], temps: 25, prep: 5, diff: 1, portions: 4,
    ust: ["plaques", "casserole", "poele"],
    ing: [[400, "g", "pates"], [2, "c. à s.", "concentre_tomate"], [1, "", "echalote"], [2, "", "ail"], [3, "cl", "vodka"], [20, "cl", "creme"], [30, "g", "beurre"], [60, "g", "parmesan"], [1, "c. à c.", "piment"]],
    etapes: ["Faites cuire les pâtes en gardant un peu d'eau de cuisson.", "Faites fondre l'échalote et l'ail dans le beurre, puis ajoutez le concentré de tomate et le piment. Faites cuire 3 min en remuant.", "Versez la vodka et laissez évaporer 1 min, puis ajoutez la crème.", "Ajoutez les pâtes, le parmesan et un peu d'eau de cuisson, puis mélangez jusqu'à ce que la sauce soit nappante."]
  },
  {
    id: "overnight-oats", titre: "Overnight oats chocolat-banane", type: "petitdej", tendance: 1,
    accroche: "Préparés la veille, prêts au réveil : le petit-déjeuner star des comptes healthy.",
    cats: ["healthy", "rapides"], temps: 485, prep: 5, diff: 1, portions: 1,
    ust: [],
    ing: [[50, "g", "flocons_avoine"], [12, "cl", "lait"], [80, "g", "yaourt"], [1, "c. à s.", "graines_chia"], [1, "c. à c.", "cacao"], [1, "", "banane"], [1, "c. à c.", "miel"]],
    etapes: ["Dans un bocal, mélangez les flocons, le lait, le yaourt, le chia, le cacao et le miel.", "Ajoutez la moitié de la banane écrasée, fermez et placez au frais une nuit.", "Le matin, garnissez du reste de banane en rondelles."]
  },
  {
    id: "poulet-hot-honey", titre: "Poulet croustillant au hot honey", type: "plat", tendance: 1,
    accroche: "Le miel pimenté, tendance numéro un, sur des morceaux de poulet croustillants à l'air fryer.",
    cats: ["rapides", "monde"], temps: 25, prep: 10, diff: 1, portions: 4,
    ust: ["airfryer", "casserole", "plaques"],
    ing: [[600, "g", "poulet", "en morceaux"], [1, "", "oeuf"], [60, "g", "farine"], [1, "c. à c.", "paprika"], [5, "c. à s.", "miel"], [1, "c. à c.", "piment"], [1, "c. à s.", "vinaigre"], [1, "pincée", "sel"]],
    etapes: ["Trempez les morceaux de poulet dans l'œuf battu, puis dans la farine mélangée au paprika et au sel.", "Faites-les cuire 15 min à 200 °C à l'air fryer en les retournant à mi-cuisson.", "Faites chauffer le miel avec le piment et le vinaigre 2 min sans faire bouillir.", "Nappez le poulet de hot honey et servez aussitôt."]
  },
  {
    id: "riz-saute-restes", titre: "Riz sauté du frigo", type: "plat", tendance: 1,
    accroche: "La cuisine des restes version TikTok : un riz de la veille, des œufs et ce qu'il reste.",
    cats: ["rapides", "monde"], temps: 15, prep: 5, diff: 1, portions: 2,
    ust: ["plaques", "wok"],
    ing: [[400, "g", "riz", "cuit la veille"], [2, "", "oeuf"], [100, "g", "petits_pois"], [1, "", "carotte"], [2, "", "ail"], [2, "c. à s.", "sauce_soja"], [1, "c. à c.", "huile_sesame"], [2, "c. à s.", "huile"]],
    etapes: ["Faites sauter la carotte en dés et l'ail dans l'huile très chaude 2 min.", "Ajoutez le riz froid et les petits pois, puis faites sauter 4 min sans trop remuer pour le colorer.", "Poussez le riz sur le côté, brouillez les œufs, puis mélangez le tout.", "Assaisonnez avec la sauce soja et l'huile de sésame."]
  },
  {
    id: "soupe-lasagnes", titre: "Soupe de lasagnes", type: "plat", tendance: 1,
    accroche: "Tout le goût des lasagnes, en soupe généreuse et fondante.",
    cats: ["classiques", "monde"], temps: 45, prep: 15, diff: 1, portions: 4,
    ust: ["plaques", "cocotte"],
    ing: [[400, "g", "boeuf_hache"], [1, "", "oignon"], [3, "", "ail"], [2, "c. à s.", "concentre_tomate"], [400, "g", "tomates_concassees"], [1, "L", "bouillon"], [8, "", "pates_lasagne", "cassées en morceaux"], [125, "g", "mozzarella"], [40, "g", "parmesan"], [1, "c. à c.", "origan"]],
    etapes: ["Faites dorer la viande avec l'oignon et l'ail dans la cocotte.", "Ajoutez le concentré de tomate, l'origan, les tomates et le bouillon, puis portez à ébullition.", "Ajoutez les lasagnes cassées et laissez cuire 12 min en remuant.", "Servez avec la mozzarella déchirée et le parmesan."]
  },
  {
    id: "sushi-bake", titre: "Sushi bake au saumon", type: "plat", tendance: 1,
    accroche: "Tous les goûts du sushi dans un plat gratiné à partager.",
    cats: ["monde"], temps: 40, prep: 20, diff: 1, portions: 4,
    ust: ["four", "plaques", "casserole"],
    ing: [[300, "g", "riz", "rond, pour sushi"], [3, "c. à s.", "vinaigre_riz"], [300, "g", "saumon"], [100, "g", "fromage_frais"], [3, "c. à s.", "mayonnaise"], [1, "c. à s.", "sriracha"], [1, "c. à s.", "sauce_soja"], [1, "", "avocat"], [6, "", "nori"], [1, "c. à s.", "sesame"]],
    etapes: ["Faites cuire le riz, puis assaisonnez-le de vinaigre de riz et tassez-le dans un plat.", "Faites cuire le saumon 12 min au four à 200 °C, émiettez-le et mélangez-le avec le fromage frais, la mayonnaise, la sriracha et la soja.", "Étalez sur le riz, parsemez de sésame et gratinez 10 min au four.", "Servez avec l'avocat, en garnissant des feuilles de nori."]
  },
  {
    id: "birria-tacos", titre: "Birria tacos et leur bouillon", type: "plat", tendance: 1,
    accroche: "Les tacos trempés dans un bouillon épicé, phénomène absolu des réseaux.",
    cats: ["longues", "monde"], temps: 210, prep: 30, diff: 3, portions: 6,
    ust: ["plaques", "cocotte", "blender", "poele"],
    ing: [[1.2, "kg", "boeuf_joue"], [2, "c. à s.", "piment"], [1, "c. à s.", "cumin"], [1, "c. à c.", "origan"], [400, "g", "tomates_concassees"], [1, "", "oignon"], [4, "", "ail"], [1, "L", "bouillon"], [12, "", "tortilla", "petites"], [200, "g", "mozzarella"], [1, "", "citron_vert"], [3, "c. à s.", "coriandre"]],
    etapes: ["Mixez les tomates, l'oignon, l'ail et les épices.", "Faites dorer la viande dans la cocotte, ajoutez la sauce et le bouillon, puis laissez mijoter 3 h à couvert.", "Effilochez la viande et gardez le bouillon.", "Trempez chaque tortilla dans le gras du bouillon, garnissez de viande et de fromage, puis faites-les dorer à la poêle en les repliant.", "Servez avec le bouillon pour tremper, la coriandre et le citron vert."]
  },
  {
    id: "marry-me-chicken", titre: "Poulet crémeux aux tomates séchées", type: "plat", tendance: 1,
    accroche: "Le fameux « marry me chicken » : une sauce crème, parmesan et tomates séchées irrésistible.",
    cats: ["rapides", "monde"], temps: 30, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[4, "", "poulet", "blancs"], [80, "g", "tomates_sechees"], [3, "", "ail"], [25, "cl", "creme"], [10, "cl", "bouillon"], [50, "g", "parmesan"], [1, "c. à c.", "origan"], [1, "c. à c.", "paprika"], [2, "c. à s.", "huile_olive"], [8, "brins", "basilic"]],
    etapes: ["Assaisonnez le poulet de paprika et de sel, puis faites-le dorer 5 min par face dans l'huile. Réservez.", "Faites revenir l'ail et les tomates séchées, puis ajoutez la crème, le bouillon, le parmesan et l'origan.", "Remettez le poulet dans la sauce et laissez mijoter 8 min.", "Parsemez de basilic au moment de servir."]
  },
  {
    id: "baked-oats", titre: "Baked oats myrtilles", type: "petitdej", tendance: 1,
    accroche: "Le porridge cuit au four, moelleux comme un gâteau.",
    cats: ["healthy"], temps: 30, prep: 5, diff: 1, portions: 1,
    ust: ["four", "blender"],
    ing: [[50, "g", "flocons_avoine"], [1, "", "banane"], [1, "", "oeuf"], [8, "cl", "lait"], [1, "c. à c.", "levure_chimique"], [60, "g", "fruits_rouges", "myrtilles"], [1, "c. à c.", "miel"]],
    etapes: ["Préchauffez le four à 180 °C.", "Mixez les flocons, la banane, l'œuf, le lait, la levure et le miel.", "Versez dans un ramequin, ajoutez les myrtilles et enfournez 25 min."]
  },
  {
    id: "pancake-cereal", titre: "Pancake cereal", type: "petitdej", tendance: 1,
    accroche: "Des mini-pancakes servis comme des céréales : le brunch le plus mignon de TikTok.",
    cats: ["desserts", "rapides"], temps: 20, prep: 5, diff: 1, portions: 2,
    ust: ["plaques", "poele"],
    ing: [[125, "g", "farine"], [1, "", "oeuf"], [15, "cl", "lait"], [1, "c. à s.", "sucre"], [1, "c. à c.", "levure_chimique"], [20, "g", "beurre"], [2, "c. à s.", "sirop_erable"], [100, "g", "fruits_rouges"]],
    etapes: ["Mélangez la farine, le sucre et la levure, puis ajoutez l'œuf, le lait et le beurre fondu.", "Versez la pâte dans une poche ou un sac congélation coupé.", "Formez des pastilles de 2 cm dans la poêle beurrée, faites cuire 1 min et retournez-les.", "Servez dans un bol avec le sirop d'érable, les fruits et un peu de lait."]
  },
  {
    id: "pois-chiches-croustillants", titre: "Pois chiches croustillants à l'air fryer", type: "aperitif", tendance: 1,
    accroche: "L'apéro healthy et riche en fibres qui remplace les chips.",
    cats: ["healthy", "rapides"], temps: 20, prep: 5, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[400, "g", "pois_chiches"], [1, "c. à s.", "huile_olive"], [1, "c. à c.", "paprika"], [1, "c. à c.", "cumin"], [1, "pincée", "sel"]],
    etapes: ["Rincez les pois chiches, puis séchez-les soigneusement dans un torchon.", "Mélangez-les avec l'huile, les épices et le sel.", "Faites cuire 15 min à 200 °C à l'air fryer en secouant 2 fois."]
  },
  {
    id: "banana-bread", titre: "Banana bread moelleux", type: "dessert", tendance: 1,
    accroche: "Le gâteau qui sauve les bananes trop mûres, éternel favori des réseaux.",
    cats: ["desserts"], temps: 70, prep: 15, diff: 1, portions: 8,
    ust: ["four"],
    ing: [[3, "", "banane", "bien mûres"], [2, "", "oeuf"], [80, "g", "beurre", "fondu"], [100, "g", "cassonade"], [220, "g", "farine"], [1, "c. à c.", "levure_chimique"], [1, "c. à c.", "cannelle"], [60, "g", "noix"]],
    etapes: ["Préchauffez le four à 175 °C et beurrez un moule à cake.", "Écrasez les bananes, puis ajoutez les œufs, le beurre fondu et la cassonade.", "Incorporez la farine, la levure, la cannelle et les noix concassées.", "Versez dans le moule et enfournez 55 min. Laissez refroidir avant de démouler."]
  }
]);
