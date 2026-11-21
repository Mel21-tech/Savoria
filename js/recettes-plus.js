/* SAVORIA — Recettes supplémentaires : entrées, apéritif, plats, brunch et desserts */
window.S = window.S || {};
S.RECETTES = S.RECETTES.concat([
  // ---------- ENTRÉES & APÉRITIF ----------
  {
    id: "oeufs-mimosa", titre: "Œufs mimosa", type: "entree",
    accroche: "Le grand classique des entrées, crémeux et parfumé à la ciboulette.",
    cats: ["classiques", "rapides"], temps: 25, prep: 15, diff: 1, portions: 4,
    ust: ["plaques", "casserole"],
    ing: [[6, "", "oeuf"], [3, "c. à s.", "mayonnaise"], [1, "c. à c.", "moutarde"], [1, "c. à s.", "ciboulette"], [1, "pincée", "paprika"], [1, "pincée", "sel"]],
    etapes: ["Faites cuire les œufs 10 min dans l'eau bouillante, puis plongez-les dans l'eau froide.", "Écalez-les, coupez-les en deux et retirez les jaunes.", "Écrasez les jaunes avec la mayonnaise, la moutarde et la ciboulette.", "Garnissez les blancs, puis saupoudrez de paprika."]
  },
  {
    id: "veloute-potiron", titre: "Velouté de potiron à la crème", type: "entree",
    accroche: "Doux, onctueux et réconfortant, la soupe de saison par excellence.",
    cats: ["classiques", "healthy"], temps: 40, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "casserole", "mixeur"],
    ing: [[1, "kg", "courge"], [1, "", "oignon"], [2, "", "pomme_de_terre"], [80, "cl", "bouillon"], [10, "cl", "creme"], [1, "pincée", "muscade"], [1, "c. à s.", "huile_olive"]],
    etapes: ["Épluchez et coupez la courge et les pommes de terre en cubes.", "Faites revenir l'oignon dans l'huile, ajoutez les légumes et le bouillon, puis laissez cuire 25 min.", "Mixez avec la crème et la muscade jusqu'à obtenir un velouté lisse."]
  },
  {
    id: "gaspacho", titre: "Gaspacho andalou", type: "entree",
    accroche: "La soupe froide espagnole, fraîche et vitaminée.",
    cats: ["healthy", "monde", "rapides"], temps: 135, prep: 15, diff: 1, portions: 4,
    ust: ["blender"],
    ing: [[1, "kg", "tomate"], [1, "", "concombre"], [1, "", "poivron"], [1, "", "oignon_rouge"], [1, "", "ail"], [4, "c. à s.", "huile_olive"], [2, "c. à s.", "vinaigre"], [1, "pincée", "sel"]],
    etapes: ["Coupez grossièrement tous les légumes.", "Mixez-les longuement avec l'huile, le vinaigre et le sel.", "Placez au frais au moins 2 h et servez bien froid, avec quelques dés de concombre."]
  },
  {
    id: "tartare-saumon-avocat", titre: "Tartare de saumon à l'avocat", type: "entree",
    accroche: "Frais et acidulé, une entrée élégante sans cuisson.",
    cats: ["healthy", "rapides"], temps: 20, prep: 20, diff: 2, portions: 4,
    ust: [],
    ing: [[400, "g", "saumon_cru"], [2, "", "avocat"], [1, "", "citron_vert"], [1, "", "echalote"], [1, "c. à s.", "huile_olive"], [2, "c. à s.", "ciboulette"], [1, "pincée", "sel"]],
    etapes: ["Coupez le saumon en petits dés au couteau, puis ajoutez l'échalote ciselée, la ciboulette, l'huile et la moitié du jus de citron vert.", "Coupez l'avocat en dés et arrosez-le du reste de citron.", "Dressez dans un cercle : l'avocat en dessous, le saumon par-dessus. Servez aussitôt."]
  },
  {
    id: "houmous", titre: "Houmous crémeux", type: "aperitif",
    accroche: "La purée de pois chiches au tahini, à tremper sans modération.",
    cats: ["healthy", "monde", "rapides"], temps: 10, prep: 10, diff: 1, portions: 6,
    ust: ["blender"],
    ing: [[400, "g", "pois_chiches"], [3, "c. à s.", "tahini"], [1, "", "citron"], [1, "", "ail"], [4, "c. à s.", "huile_olive"], [4, "c. à s.", "eau", "glacée"], [1, "pincée", "paprika"]],
    etapes: ["Mixez les pois chiches avec le tahini, le jus de citron, l'ail et l'eau glacée.", "Ajoutez l'huile petit à petit en mixant jusqu'à obtenir une texture très lisse.", "Servez avec un filet d'huile et le paprika."]
  },
  {
    id: "guacamole", titre: "Guacamole maison", type: "aperitif",
    accroche: "L'avocat écrasé au citron vert et à la coriandre, comme au Mexique.",
    cats: ["healthy", "monde", "rapides"], temps: 10, prep: 10, diff: 1, portions: 4,
    ust: [],
    ing: [[3, "", "avocat"], [1, "", "citron_vert"], [1, "", "tomate"], [0.5, "", "oignon_rouge"], [2, "c. à s.", "coriandre"], [1, "pincée", "piment"], [1, "pincée", "sel"]],
    etapes: ["Écrasez les avocats à la fourchette avec le jus de citron vert.", "Ajoutez la tomate en petits dés, l'oignon ciselé, la coriandre, le piment et le sel.", "Servez aussitôt avec des chips de maïs ou des légumes."]
  },
  // ---------- PLATS ----------
  {
    id: "lasagnes-bolognaise", titre: "Lasagnes à la bolognaise", type: "plat",
    accroche: "Des couches généreuses de sauce, de béchamel et de fromage gratiné.",
    cats: ["longues", "monde"], temps: 120, prep: 40, diff: 2, portions: 6,
    ust: ["four", "plaques", "casserole", "cocotte"],
    ing: [[500, "g", "boeuf_hache"], [1, "", "oignon"], [1, "", "carotte"], [2, "", "ail"], [800, "g", "tomates_concassees"], [12, "", "pates_lasagne"], [60, "g", "beurre"], [60, "g", "farine"], [70, "cl", "lait"], [100, "g", "emmental"], [1, "pincée", "muscade"]],
    etapes: ["Faites revenir l'oignon, la carotte et l'ail, ajoutez la viande, puis les tomates. Laissez mijoter 30 min.", "Préparez la béchamel : faites fondre le beurre, ajoutez la farine, puis le lait en fouettant. Assaisonnez de muscade.", "Préchauffez le four à 180 °C. Alternez sauce, lasagnes et béchamel dans un plat, sur 3 couches.", "Terminez par la béchamel et le fromage, puis enfournez 40 min."]
  },
  {
    id: "pates-bolognaise", titre: "Spaghetti bolognaise", type: "plat",
    accroche: "La sauce mijotée qui met tout le monde d'accord.",
    cats: ["classiques", "monde"], temps: 60, prep: 15, diff: 1, portions: 4,
    ust: ["plaques", "casserole", "cocotte"],
    ing: [[400, "g", "spaghetti"], [400, "g", "boeuf_hache"], [1, "", "oignon"], [1, "", "carotte"], [2, "", "ail"], [600, "g", "tomates_concassees"], [1, "c. à c.", "origan"], [40, "g", "parmesan"], [2, "c. à s.", "huile_olive"]],
    etapes: ["Faites revenir l'oignon, la carotte et l'ail hachés dans l'huile.", "Ajoutez la viande et faites-la dorer, puis les tomates et l'origan. Laissez mijoter 40 min à couvert.", "Faites cuire les pâtes et servez-les nappées de sauce et de parmesan."]
  },
  {
    id: "moussaka", titre: "Moussaka grecque", type: "plat",
    accroche: "Aubergines fondantes, viande épicée et béchamel dorée.",
    cats: ["longues", "monde"], temps: 110, prep: 40, diff: 2, portions: 6,
    ust: ["four", "plaques", "poele", "casserole"],
    ing: [[3, "", "aubergine"], [500, "g", "agneau", "haché ou bœuf haché"], [1, "", "oignon"], [400, "g", "tomates_concassees"], [1, "c. à c.", "cannelle"], [50, "g", "beurre"], [50, "g", "farine"], [50, "cl", "lait"], [1, "", "oeuf"], [60, "g", "parmesan"], [4, "c. à s.", "huile_olive"]],
    etapes: ["Tranchez les aubergines, badigeonnez-les d'huile et faites-les rôtir 20 min à 200 °C.", "Faites revenir l'oignon et la viande, ajoutez les tomates et la cannelle, puis laissez mijoter 20 min.", "Préparez une béchamel avec le beurre, la farine et le lait, puis ajoutez l'œuf hors du feu.", "Alternez aubergines et viande dans un plat, couvrez de béchamel et de parmesan, puis enfournez 40 min à 180 °C."]
  },
  {
    id: "paella", titre: "Paella aux fruits de mer et chorizo", type: "plat",
    accroche: "Le riz safrané espagnol, généreux et coloré.",
    cats: ["longues", "monde"], temps: 75, prep: 25, diff: 3, portions: 6,
    ust: ["plaques", "poele"],
    ing: [[400, "g", "riz_rond"], [500, "g", "poulet_cuisses"], [150, "g", "chorizo"], [300, "g", "crevettes"], [500, "g", "moules"], [1, "", "poivron"], [1, "", "oignon"], [150, "g", "petits_pois"], [1, "L", "bouillon"], [1, "pincée", "safran"], [4, "c. à s.", "huile_olive"], [1, "", "citron"]],
    etapes: ["Faites dorer le poulet et le chorizo dans l'huile, puis ajoutez l'oignon et le poivron.", "Ajoutez le riz et nacrez-le 2 min, puis versez le bouillon chaud safrané.", "Laissez cuire 15 min sans remuer, puis ajoutez les crevettes, les moules et les petits pois.", "Poursuivez 10 min, jusqu'à ce que les moules s'ouvrent. Laissez reposer 5 min sous un torchon et servez avec le citron."]
  },
  {
    id: "couscous-royal", titre: "Couscous royal", type: "plat",
    accroche: "Agneau, poulet, merguez et légumes dans un bouillon parfumé.",
    cats: ["longues", "monde"], temps: 120, prep: 30, diff: 2, portions: 6,
    ust: ["plaques", "cocotte", "casserole"],
    ing: [[600, "g", "agneau", "épaule en morceaux"], [4, "", "poulet_cuisses"], [6, "", "merguez"], [3, "", "carotte"], [3, "", "courgette"], [2, "", "navet"], [400, "g", "pois_chiches"], [2, "c. à s.", "ras_el_hanout"], [2, "c. à s.", "concentre_tomate"], [500, "g", "semoule"], [40, "g", "beurre"]],
    etapes: ["Faites dorer l'agneau et le poulet dans la cocotte, puis ajoutez les épices et le concentré de tomate.", "Couvrez d'eau, ajoutez les carottes et les navets, puis laissez mijoter 1 h.", "Ajoutez les courgettes et les pois chiches, puis poursuivez 20 min.", "Faites griller les merguez. Préparez la semoule avec son volume d'eau bouillante et le beurre, puis égrainez-la."]
  },
  {
    id: "moules-marinieres", titre: "Moules marinières", type: "plat",
    accroche: "Vin blanc, échalotes et persil : la cocotte de moules du bord de mer.",
    cats: ["classiques", "rapides"], temps: 25, prep: 15, diff: 1, portions: 4,
    ust: ["plaques", "cocotte"],
    ing: [[2, "kg", "moules"], [2, "", "echalote"], [20, "cl", "vin_blanc"], [30, "g", "beurre"], [3, "c. à s.", "persil"], [1, "pincée", "poivre"]],
    etapes: ["Grattez et rincez les moules, en jetant celles qui restent ouvertes.", "Faites fondre les échalotes dans le beurre, puis versez le vin blanc.", "Ajoutez les moules, couvrez et laissez cuire 5 à 6 min à feu vif en secouant la cocotte.", "Parsemez de persil et servez dès que les moules sont ouvertes."]
  },
  {
    id: "curry-vert-poulet", titre: "Curry vert thaï au poulet", type: "plat",
    accroche: "Lait de coco, basilic et pâte de curry : un voyage express en Thaïlande.",
    cats: ["monde", "rapides"], temps: 25, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "wok", "casserole"],
    ing: [[500, "g", "poulet"], [2, "c. à s.", "pate_curry"], [40, "cl", "lait_coco"], [150, "g", "haricots_verts"], [1, "", "poivron"], [1, "c. à s.", "sauce_poisson"], [1, "c. à c.", "sucre"], [10, "brins", "basilic"], [300, "g", "riz"]],
    etapes: ["Faites cuire le riz.", "Faites revenir la pâte de curry 1 min dans un peu de lait de coco, puis ajoutez le poulet émincé.", "Versez le reste du lait de coco, les légumes, la sauce poisson et le sucre, puis laissez cuire 10 min.", "Ajoutez le basilic et servez avec le riz."]
  },
  {
    id: "ramen-poulet", titre: "Ramen au poulet et œuf mollet", type: "plat",
    accroche: "Un bouillon parfumé, des nouilles et un œuf au jaune coulant.",
    cats: ["monde"], temps: 40, prep: 15, diff: 2, portions: 4,
    ust: ["plaques", "casserole", "poele"],
    ing: [[400, "g", "nouilles_ramen"], [400, "g", "poulet"], [1.2, "L", "bouillon"], [4, "c. à s.", "sauce_soja"], [1, "c. à s.", "gingembre"], [2, "", "ail"], [4, "", "oeuf"], [100, "g", "epinards"], [2, "", "nori"], [1, "c. à c.", "huile_sesame"]],
    etapes: ["Faites cuire les œufs 6 min 30, puis refroidissez-les et écalez-les.", "Portez le bouillon à frémissement avec la sauce soja, le gingembre et l'ail.", "Faites dorer le poulet et tranchez-le. Faites cuire les nouilles.", "Répartissez nouilles, bouillon, poulet, épinards, œuf coupé en deux et nori, puis ajoutez un filet d'huile de sésame."]
  },
  {
    id: "burger-maison", titre: "Burger maison au cheddar", type: "plat",
    accroche: "Un steak juteux, du cheddar fondu et un pain toasté.",
    cats: ["rapides", "monde"], temps: 20, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[600, "g", "boeuf_hache"], [4, "", "pain_burger"], [4, "tranches", "cheddar"], [1, "", "tomate"], [1, "", "oignon_rouge"], [4, "", "cornichons"], [4, "feuilles", "laitue"], [4, "c. à s.", "mayonnaise"], [1, "c. à s.", "ketchup"]],
    etapes: ["Formez 4 steaks de 150 g sans trop les tasser, puis salez-les.", "Faites-les cuire 3 min par face à feu vif et ajoutez le cheddar en fin de cuisson.", "Toastez les pains côté mie.", "Montez les burgers : sauce, laitue, steak, tomate, oignon et cornichons."]
  },
  {
    id: "pizza-margherita", titre: "Pizza margherita", type: "plat",
    accroche: "Tomate, mozzarella et basilic : la reine des pizzas.",
    cats: ["monde", "rapides"], temps: 25, prep: 10, diff: 1, portions: 2,
    ust: ["four"],
    ing: [[1, "", "pate_pizza"], [200, "g", "tomates_concassees"], [125, "g", "mozzarella"], [1, "c. à s.", "huile_olive"], [6, "brins", "basilic"], [1, "c. à c.", "origan"]],
    etapes: ["Préchauffez le four au maximum (250 °C) avec la plaque à l'intérieur.", "Étalez la pâte, couvrez de tomate assaisonnée d'origan, puis de mozzarella déchirée.", "Faites cuire 10 à 12 min sur la plaque chaude.", "Ajoutez le basilic frais et un filet d'huile d'olive."]
  },
  {
    id: "tartiflette", titre: "Tartiflette au reblochon", type: "plat",
    accroche: "Pommes de terre, lardons et reblochon fondant : le plat de montagne.",
    cats: ["classiques"], temps: 70, prep: 20, diff: 1, portions: 6,
    ust: ["four", "plaques", "casserole", "poele"],
    ing: [[1.2, "kg", "pomme_de_terre"], [200, "g", "lardons"], [2, "", "oignon"], [1, "", "reblochon", "entier"], [15, "cl", "creme"], [10, "cl", "vin_blanc"]],
    etapes: ["Faites cuire les pommes de terre 20 min à l'eau, épluchez-les et coupez-les en rondelles.", "Faites revenir les lardons et les oignons, puis déglacez au vin blanc.", "Préchauffez le four à 200 °C. Mélangez le tout dans un plat avec la crème.", "Posez le reblochon coupé en deux dans l'épaisseur, croûte vers le haut, et enfournez 25 min."]
  },
  {
    id: "coq-au-vin", titre: "Coq au vin", type: "plat",
    accroche: "Le grand mijoté bourguignon, riche et profond.",
    cats: ["longues", "classiques"], temps: 150, prep: 30, diff: 2, portions: 6,
    ust: ["plaques", "cocotte"],
    ing: [[1.5, "kg", "poulet_cuisses"], [75, "cl", "vin_rouge"], [150, "g", "lardons"], [250, "g", "champignon"], [2, "", "oignon"], [2, "", "carotte"], [2, "", "ail"], [2, "c. à s.", "farine"], [1, "", "bouquet_garni"], [30, "g", "beurre"]],
    etapes: ["Faites dorer le poulet dans le beurre, puis réservez.", "Faites revenir les lardons, les oignons et les carottes, puis saupoudrez de farine.", "Remettez le poulet, versez le vin, ajoutez l'ail et le bouquet garni, puis laissez mijoter 1 h 30.", "Ajoutez les champignons 20 min avant la fin."]
  },
  {
    id: "salade-nicoise", titre: "Salade niçoise", type: "entree",
    accroche: "Thon, œufs, olives et légumes du soleil.",
    cats: ["healthy", "classiques"], temps: 25, prep: 20, diff: 1, portions: 4,
    ust: ["plaques", "casserole"],
    ing: [[4, "", "tomate"], [200, "g", "haricots_verts"], [4, "", "oeuf"], [200, "g", "thon"], [80, "g", "olives", "noires"], [8, "", "anchois"], [1, "", "poivron"], [4, "c. à s.", "huile_olive"], [1, "c. à s.", "vinaigre"]],
    etapes: ["Faites cuire les œufs 10 min et les haricots verts 8 min, puis refroidissez-les.", "Coupez les tomates et le poivron.", "Disposez tous les ingrédients sur un grand plat et arrosez de vinaigrette."]
  },
  {
    id: "saumon-teriyaki", titre: "Saumon teriyaki et riz", type: "plat",
    accroche: "Un glaçage sucré-salé brillant, prêt en 20 minutes.",
    cats: ["monde", "rapides", "healthy"], temps: 20, prep: 5, diff: 1, portions: 4,
    ust: ["plaques", "poele", "casserole"],
    ing: [[4, "", "saumon"], [4, "c. à s.", "sauce_soja"], [2, "c. à s.", "miel"], [1, "c. à s.", "vinaigre_riz"], [1, "c. à c.", "gingembre"], [1, "c. à c.", "sesame"], [300, "g", "riz"]],
    etapes: ["Faites cuire le riz.", "Mélangez la sauce soja, le miel, le vinaigre et le gingembre.", "Saisissez le saumon 4 min côté peau, retournez-le, puis versez la sauce et laissez caraméliser 3 min en l'arrosant.", "Servez sur le riz avec le sésame."]
  },
  {
    id: "tarte-flambee", titre: "Tarte flambée alsacienne", type: "plat",
    accroche: "Une pâte fine et croustillante, crème, oignons et lardons.",
    cats: ["classiques", "rapides"], temps: 25, prep: 10, diff: 1, portions: 2,
    ust: ["four"],
    ing: [[1, "", "pate_pizza", "étalée très finement"], [150, "g", "fromage_frais"], [5, "cl", "creme"], [1, "", "oignon"], [150, "g", "lardons"], [1, "pincée", "muscade"]],
    etapes: ["Préchauffez le four à 250 °C.", "Mélangez le fromage frais, la crème, la muscade, le sel et le poivre, puis étalez sur la pâte.", "Parsemez d'oignon émincé très finement et de lardons.", "Enfournez 10 à 12 min, jusqu'à ce que les bords soient bien dorés."]
  },
  // ---------- BRUNCH ----------
  {
    id: "pancakes", titre: "Pancakes moelleux", type: "petitdej",
    accroche: "Épais, aériens et dorés, avec un filet de sirop d'érable.",
    cats: ["desserts", "rapides"], temps: 25, prep: 10, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[250, "g", "farine"], [2, "", "oeuf"], [30, "cl", "lait"], [2, "c. à s.", "sucre"], [1, "c. à c.", "levure_chimique"], [40, "g", "beurre", "fondu"], [4, "c. à s.", "sirop_erable"]],
    etapes: ["Mélangez la farine, le sucre et la levure.", "Ajoutez les œufs, le lait et le beurre fondu, puis fouettez sans trop travailler la pâte.", "Versez une louche dans la poêle chaude légèrement beurrée et retournez quand des bulles apparaissent.", "Servez en pile avec le sirop d'érable."]
  },
  {
    id: "pain-perdu", titre: "Pain perdu brioché", type: "petitdej",
    accroche: "Doré au beurre, fondant à cœur : le brunch gourmand.",
    cats: ["desserts", "rapides", "classiques"], temps: 15, prep: 5, diff: 1, portions: 4,
    ust: ["plaques", "poele"],
    ing: [[8, "", "pain_brioche"], [3, "", "oeuf"], [25, "cl", "lait"], [2, "c. à s.", "sucre"], [1, "c. à c.", "cannelle"], [30, "g", "beurre"]],
    etapes: ["Battez les œufs avec le lait, le sucre et la cannelle.", "Trempez les tranches de brioche quelques secondes de chaque côté.", "Faites-les dorer 2 min par face dans le beurre mousseux."]
  },
  {
    id: "avocado-toast", titre: "Avocado toast et œuf poché", type: "petitdej",
    accroche: "Le brunch healthy le plus photographié du monde.",
    cats: ["healthy", "rapides"], temps: 15, prep: 10, diff: 2, portions: 2,
    ust: ["plaques", "casserole"],
    ing: [[2, "", "pain"], [1, "", "avocat"], [2, "", "oeuf"], [1, "c. à s.", "vinaigre"], [0.5, "", "citron"], [1, "pincée", "piment"], [1, "pincée", "sel"]],
    etapes: ["Faites griller le pain. Écrasez l'avocat avec le citron et le sel, puis étalez-le sur les tartines.", "Portez une casserole d'eau vinaigrée à frémissement, créez un tourbillon et glissez-y un œuf. Faites cuire 3 min.", "Posez l'œuf poché sur la tartine, puis ajoutez le piment."]
  },
  // ---------- DESSERTS ----------
  {
    id: "cheesecake", titre: "Cheesecake new-yorkais", type: "dessert",
    accroche: "Crémeux, dense et légèrement acidulé, sur une base croustillante.",
    cats: ["desserts", "longues", "monde"], temps: 420, prep: 25, diff: 2, portions: 8,
    ust: ["four", "batteur"],
    ing: [[200, "g", "biscuits_sables"], [80, "g", "beurre", "fondu"], [600, "g", "fromage_frais"], [150, "g", "sucre"], [3, "", "oeuf"], [20, "cl", "creme"], [1, "", "citron", "zeste"], [1, "", "vanille"], [200, "g", "fruits_rouges"]],
    etapes: ["Préchauffez le four à 160 °C. Mixez les biscuits avec le beurre fondu et tassez au fond d'un moule.", "Fouettez le fromage frais avec le sucre, puis ajoutez les œufs un par un, la crème, le zeste et la vanille.", "Versez sur la base et faites cuire 1 h, puis laissez refroidir dans le four éteint, porte entrouverte.", "Placez au frais au moins 6 h et servez avec les fruits rouges."]
  },
  {
    id: "brownies", titre: "Brownies fondants", type: "dessert",
    accroche: "Une croûte craquante et un cœur ultra fondant au chocolat.",
    cats: ["desserts"], temps: 40, prep: 15, diff: 1, portions: 9,
    ust: ["four", "plaques", "casserole"],
    ing: [[200, "g", "chocolat"], [150, "g", "beurre"], [180, "g", "sucre"], [3, "", "oeuf"], [80, "g", "farine"], [80, "g", "noix"], [1, "pincée", "sel"]],
    etapes: ["Préchauffez le four à 180 °C. Faites fondre le chocolat et le beurre.", "Fouettez les œufs avec le sucre, puis ajoutez le chocolat fondu.", "Incorporez la farine, le sel et les noix concassées.", "Versez dans un moule carré et enfournez 22 min : le centre doit rester humide."]
  },
  {
    id: "tarte-citron-meringuee", titre: "Tarte au citron meringuée", type: "dessert",
    accroche: "Une crème acidulée et une meringue légère, caramélisée au chalumeau.",
    cats: ["desserts", "classiques"], temps: 90, prep: 40, diff: 3, portions: 8,
    ust: ["four", "plaques", "casserole", "batteur"],
    ing: [[1, "", "pate_sablee"], [4, "", "citron"], [4, "", "oeuf"], [150, "g", "sucre"], [80, "g", "beurre"], [20, "g", "fecule"], [100, "g", "sucre", "pour la meringue"]],
    etapes: ["Faites cuire la pâte à blanc 20 min à 180 °C.", "Séparez les blancs des jaunes. Faites chauffer le jus et le zeste des citrons avec les jaunes, 150 g de sucre et la fécule en fouettant jusqu'à épaississement. Hors du feu, ajoutez le beurre.", "Versez la crème sur le fond de tarte et laissez refroidir.", "Montez les blancs en neige ferme en ajoutant le sucre restant, couvrez la tarte et dorez au chalumeau ou 5 min sous le gril."]
  },
  {
    id: "ile-flottante", titre: "Île flottante au caramel", type: "dessert",
    accroche: "Des blancs pochés sur une crème anglaise vanillée.",
    cats: ["desserts", "classiques"], temps: 45, prep: 30, diff: 2, portions: 6,
    ust: ["plaques", "casserole", "batteur", "microondes"],
    ing: [[6, "", "oeuf"], [50, "cl", "lait"], [120, "g", "sucre"], [1, "", "vanille"], [60, "g", "sucre", "pour le caramel"]],
    etapes: ["Préparez la crème anglaise : faites chauffer le lait vanillé, versez-le sur les jaunes fouettés avec 80 g de sucre, puis faites épaissir à feu doux sans bouillir.", "Montez les blancs en neige avec le reste du sucre.", "Formez des boules et faites-les cuire 30 secondes au micro-ondes.", "Posez-les sur la crème froide et nappez d'un caramel blond."]
  },
  {
    id: "riz-au-lait", titre: "Riz au lait vanillé", type: "dessert",
    accroche: "Crémeux et réconfortant, comme chez grand-mère.",
    cats: ["desserts", "classiques"], temps: 50, prep: 5, diff: 1, portions: 6,
    ust: ["plaques", "casserole"],
    ing: [[150, "g", "riz_rond"], [1, "L", "lait"], [100, "g", "sucre"], [1, "", "vanille"], [1, "pincée", "cannelle"]],
    etapes: ["Faites bouillir le riz 2 min dans l'eau, puis égouttez-le.", "Portez le lait à frémissement avec la vanille fendue, puis ajoutez le riz.", "Laissez cuire 40 min à feu très doux en remuant souvent.", "Ajoutez le sucre en fin de cuisson et servez tiède ou froid."]
  },
  {
    id: "clafoutis-cerises", titre: "Clafoutis aux cerises", type: "dessert",
    accroche: "Le dessert du Limousin, moelleux et plein de cerises.",
    cats: ["desserts", "classiques"], temps: 55, prep: 15, diff: 1, portions: 6,
    ust: ["four"],
    ing: [[500, "g", "cerises"], [3, "", "oeuf"], [100, "g", "farine"], [100, "g", "sucre"], [30, "cl", "lait"], [30, "g", "beurre"], [1, "pincée", "sel"]],
    etapes: ["Préchauffez le four à 180 °C et beurrez un plat. Disposez-y les cerises.", "Fouettez les œufs et le sucre, puis ajoutez la farine, le sel et le lait.", "Versez sur les cerises et enfournez 40 min."]
  },
  {
    id: "madeleines", titre: "Madeleines au miel", type: "dessert",
    accroche: "Avec leur jolie bosse et leur cœur moelleux.",
    cats: ["desserts", "classiques"], temps: 75, prep: 15, diff: 2, portions: 20,
    ust: ["four"],
    ing: [[3, "", "oeuf"], [130, "g", "sucre"], [1, "c. à s.", "miel"], [150, "g", "farine"], [1, "c. à c.", "levure_chimique"], [125, "g", "beurre", "fondu"], [1, "", "citron", "zeste"]],
    etapes: ["Fouettez les œufs, le sucre et le miel jusqu'à ce que le mélange blanchisse.", "Ajoutez la farine, la levure, le zeste, puis le beurre fondu tiède.", "Placez la pâte au frais au moins 1 h : c'est le secret de la bosse.", "Remplissez les moules beurrés aux trois quarts et faites cuire 10 min à 220 °C."]
  },
  {
    id: "tarte-aux-pommes", titre: "Tarte fine aux pommes", type: "dessert",
    accroche: "Des pommes en rosace sur une pâte feuilletée dorée.",
    cats: ["desserts", "classiques"], temps: 45, prep: 15, diff: 1, portions: 6,
    ust: ["four"],
    ing: [[1, "", "pate_feuilletee"], [4, "", "pomme"], [40, "g", "sucre"], [30, "g", "beurre"], [2, "c. à s.", "compote"]],
    etapes: ["Préchauffez le four à 200 °C.", "Étalez la compote sur la pâte, puis disposez les pommes en fines lamelles en rosace.", "Parsemez de sucre et de petits morceaux de beurre.", "Enfournez 30 min, jusqu'à ce que les pommes soient caramélisées."]
  }
]);

/* Type de plat des recettes de base (les nouvelles l'ont déjà) */
(function () {
  var T = {
    "soupe-oignon": "entree", "soupe-lentilles-corail": "entree", "salade-cesar": "plat", "salade-quinoa-feta": "entree",
    "smoothie-bowl": "petitdej", "omelette-fines-herbes": "plat", "crepes": "dessert", "cookies": "dessert",
    "frites-patate-douce": "accompagnement", "pain-maison": "accompagnement", "gratin-dauphinois": "accompagnement", "ratatouille": "accompagnement",
    "fondant-chocolat": "dessert", "tarte-tatin": "dessert", "creme-brulee": "dessert", "tiramisu": "dessert", "mousse-chocolat": "dessert", "panna-cotta": "dessert"
  };
  S.RECETTES.forEach(function (r) { if (!r.type) r.type = T[r.id] || "plat"; });
})();

S.TYPES = {
  entree: "Entrées", plat: "Plats", accompagnement: "Accompagnements",
  aperitif: "Apéritif", petitdej: "Petit-déjeuner & brunch", dessert: "Desserts"
};
