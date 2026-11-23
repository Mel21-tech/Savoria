/* SAVORIA — Recettes par appareil : air fryer, micro-ondes, sans cuisson */
window.S = window.S || {};
S.RECETTES = S.RECETTES.concat([
  // ---------- AIR FRYER ----------
  {
    id: "pilons-poulet-air", titre: "Pilons de poulet croustillants", type: "plat",
    accroche: "Une peau dorée et craquante, sans friture, en 25 minutes.",
    cats: ["rapides", "classiques"], temps: 30, prep: 5, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[1, "kg", "poulet_cuisses", "pilons ou hauts de cuisse"], [1, "c. à s.", "huile_olive"], [2, "c. à c.", "paprika"], [1, "c. à c.", "ail", "en poudre"], [1, "c. à c.", "herbes_provence"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Séchez les pilons avec du papier absorbant : c'est le secret d'une peau croustillante.", "Mélangez-les avec l'huile, le paprika, l'ail, les herbes, le sel et le poivre.", "Disposez-les sans les superposer dans le panier de l'air fryer.", "Faites cuire 22 à 25 min à 200 °C en les retournant à mi-cuisson."]
  },
  {
    id: "falafels-air", titre: "Falafels à l'air fryer", type: "plat",
    accroche: "Croustillants dehors, moelleux et parfumés dedans.",
    cats: ["healthy", "monde"], temps: 35, prep: 20, diff: 2, portions: 4,
    ust: ["airfryer", "mixeur"],
    ing: [[400, "g", "pois_chiches", "égouttés"], [1, "", "oignon"], [2, "", "ail"], [1, "poignée", "persil"], [1, "poignée", "coriandre"], [2, "c. à c.", "cumin"], [2, "c. à s.", "farine"], [1, "c. à s.", "huile_olive"], [1, "pincée", "sel"]],
    etapes: ["Mixez grossièrement les pois chiches avec l'oignon, l'ail, les herbes et le cumin.", "Ajoutez la farine et le sel : la pâte doit se tenir.", "Formez une vingtaine de boulettes légèrement aplaties et badigeonnez-les d'huile.", "Faites cuire 12 à 15 min à 190 °C en les retournant à mi-cuisson."]
  },
  {
    id: "legumes-rotis-air", titre: "Légumes rôtis aux herbes", type: "accompagnement",
    accroche: "Des légumes caramélisés comme au four, deux fois plus vite.",
    cats: ["healthy", "rapides"], temps: 25, prep: 10, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[2, "", "courgette"], [1, "", "poivron"], [1, "", "oignon_rouge"], [250, "g", "champignon"], [2, "c. à s.", "huile_olive"], [1, "c. à c.", "herbes_provence"], [1, "pincée", "sel"]],
    etapes: ["Coupez tous les légumes en morceaux de taille égale.", "Mélangez-les avec l'huile, les herbes et le sel.", "Faites cuire 15 min à 200 °C en secouant le panier deux fois."]
  },
  {
    id: "brocoli-parmesan-air", titre: "Brocoli rôti au parmesan", type: "accompagnement",
    accroche: "Le légume vert qui se mange comme des chips.",
    cats: ["healthy", "rapides"], temps: 15, prep: 5, diff: 1, portions: 2,
    ust: ["airfryer"],
    ing: [[400, "g", "brocoli"], [1, "c. à s.", "huile_olive"], [1, "", "ail", "haché"], [30, "g", "parmesan", "râpé"], [0.5, "", "citron"], [1, "pincée", "sel"]],
    etapes: ["Détaillez le brocoli en petits bouquets.", "Mélangez avec l'huile, l'ail et le sel.", "Faites cuire 8 min à 190 °C, parsemez de parmesan puis prolongez 2 min.", "Arrosez d'un filet de citron au moment de servir."]
  },
  {
    id: "nuggets-maison-air", titre: "Nuggets de poulet maison", type: "plat",
    accroche: "Mieux que ceux du fast-food, et sans une goutte de friture.",
    cats: ["rapides", "classiques"], temps: 25, prep: 15, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[500, "g", "poulet"], [2, "", "oeuf"], [50, "g", "farine"], [100, "g", "chapelure"], [1, "c. à c.", "paprika"], [1, "c. à s.", "huile_olive"], [1, "pincée", "sel"]],
    etapes: ["Coupez le poulet en morceaux de la taille d'une bouchée.", "Passez-les dans la farine, puis dans les œufs battus, puis dans la chapelure mélangée au paprika et au sel.", "Disposez-les dans le panier et vaporisez-les d'un peu d'huile.", "Faites cuire 10 à 12 min à 200 °C en les retournant à mi-cuisson."]
  },
  {
    id: "grenailles-romarin-air", titre: "Pommes de terre grenailles au romarin", type: "accompagnement",
    accroche: "Fondantes à cœur, croustillantes à l'extérieur.",
    cats: ["classiques", "rapides"], temps: 30, prep: 5, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[800, "g", "pomme_de_terre", "grenailles"], [2, "c. à s.", "huile_olive"], [2, "brins", "romarin"], [3, "", "ail", "en chemise"], [1, "pincée", "sel"]],
    etapes: ["Lavez les grenailles et coupez les plus grosses en deux.", "Mélangez-les avec l'huile, le romarin effeuillé, l'ail et le sel.", "Faites cuire 22 à 25 min à 200 °C en secouant le panier toutes les 8 min."]
  },
  {
    id: "churros-air", titre: "Churros à la cannelle", type: "dessert",
    accroche: "Le goût de la fête foraine, en version légère.",
    cats: ["desserts"], temps: 35, prep: 20, diff: 2, portions: 4,
    ust: ["airfryer", "plaques", "casserole"],
    ing: [[25, "cl", "eau"], [50, "g", "beurre"], [1, "c. à s.", "sucre"], [150, "g", "farine"], [1, "", "oeuf"], [60, "g", "sucre", "pour l'enrobage"], [2, "c. à c.", "cannelle"]],
    etapes: ["Portez à ébullition l'eau, le beurre et 1 c. à s. de sucre.", "Hors du feu, versez la farine d'un coup et mélangez jusqu'à obtenir une boule. Laissez tiédir, puis incorporez l'œuf.", "Remplissez une poche à douille cannelée et formez des bâtonnets sur du papier cuisson.", "Faites cuire 10 min à 190 °C, puis roulez les churros encore chauds dans le sucre mélangé à la cannelle."]
  },
  {
    id: "courgettes-panees-air", titre: "Bâtonnets de courgette panés", type: "aperitif",
    accroche: "L'apéritif croustillant qui fait aimer les légumes.",
    cats: ["rapides", "healthy"], temps: 25, prep: 10, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[2, "", "courgette"], [1, "", "oeuf"], [60, "g", "chapelure"], [30, "g", "parmesan", "râpé"], [1, "c. à c.", "origan"], [1, "pincée", "sel"]],
    etapes: ["Coupez les courgettes en bâtonnets.", "Trempez-les dans l'œuf battu, puis roulez-les dans la chapelure mélangée au parmesan, à l'origan et au sel.", "Faites cuire 10 à 12 min à 200 °C, sans superposer les bâtonnets."]
  },
  {
    id: "pommes-crumble-air", titre: "Pommes façon crumble", type: "dessert",
    accroche: "Pommes fondantes et croquant d'avoine, prêtes en un quart d'heure.",
    cats: ["desserts", "rapides"], temps: 20, prep: 8, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[4, "", "pomme"], [40, "g", "flocons_avoine"], [30, "g", "cassonade"], [30, "g", "beurre", "mou"], [1, "c. à c.", "cannelle"]],
    etapes: ["Coupez les pommes en deux et retirez le trognon.", "Mélangez du bout des doigts les flocons, la cassonade, le beurre et la cannelle.", "Garnissez les demi-pommes de ce mélange.", "Faites cuire 12 min à 180 °C, jusqu'à ce que le dessus soit doré."]
  },
  {
    id: "tofu-croustillant-air", titre: "Tofu croustillant sauce soja", type: "plat",
    accroche: "Même ceux qui n'aiment pas le tofu vont en redemander.",
    cats: ["healthy", "monde", "rapides"], temps: 25, prep: 10, diff: 1, portions: 2,
    ust: ["airfryer"],
    ing: [[400, "g", "tofu", "ferme"], [2, "c. à s.", "fecule"], [2, "c. à s.", "sauce_soja"], [1, "c. à s.", "huile_sesame"], [1, "", "ail", "haché"], [1, "c. à c.", "sesame"]],
    etapes: ["Pressez le tofu dans un torchon pour retirer l'eau, puis coupez-le en cubes.", "Mélangez-le avec la sauce soja, l'huile de sésame et l'ail, puis enrobez de fécule.", "Faites cuire 15 min à 200 °C en secouant le panier à mi-cuisson.", "Parsemez de graines de sésame et servez avec du riz ou des légumes."]
  },
  {
    id: "aubergines-feta-miel-air", titre: "Aubergines rôties, feta et miel", type: "entree",
    accroche: "Le sucré-salé méditerranéen qui fait l'unanimité.",
    cats: ["healthy", "monde"], temps: 25, prep: 5, diff: 1, portions: 2,
    ust: ["airfryer"],
    ing: [[2, "", "aubergine"], [2, "c. à s.", "huile_olive"], [100, "g", "feta"], [1, "c. à s.", "miel"], [2, "brins", "thym"], [1, "pincée", "sel"]],
    etapes: ["Coupez les aubergines en deux et quadrillez la chair au couteau.", "Badigeonnez d'huile, salez et faites cuire 18 min à 190 °C, chair vers le haut.", "Émiettez la feta dessus, arrosez de miel et parsemez de thym."]
  },
  {
    id: "boulettes-boeuf-air", titre: "Boulettes de bœuf aux herbes", type: "plat",
    accroche: "Juteuses et dorées, parfaites avec des pâtes ou en wrap.",
    cats: ["classiques", "rapides"], temps: 25, prep: 15, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[500, "g", "boeuf_hache"], [1, "", "oignon", "finement haché"], [1, "", "oeuf"], [40, "g", "chapelure"], [1, "poignée", "persil"], [1, "", "ail"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Mélangez tous les ingrédients sans trop travailler la viande.", "Formez une vingtaine de boulettes.", "Faites cuire 10 à 12 min à 190 °C en secouant le panier à mi-cuisson."]
  },
  {
    id: "saumon-miel-moutarde-air", titre: "Saumon miel-moutarde", type: "plat",
    accroche: "Un pavé fondant laqué d'une sauce dorée, prêt en 12 minutes.",
    cats: ["rapides", "healthy"], temps: 15, prep: 5, diff: 1, portions: 2,
    ust: ["airfryer"],
    ing: [[2, "", "saumon", "pavés"], [1, "c. à s.", "miel"], [1, "c. à s.", "moutarde", "à l'ancienne"], [0.5, "", "citron"], [1, "brins", "aneth"], [1, "pincée", "sel"]],
    etapes: ["Mélangez le miel, la moutarde et un filet de citron.", "Salez les pavés et nappez-les de sauce.", "Faites cuire 9 à 10 min à 190 °C, puis parsemez d'aneth."]
  },
  {
    id: "poivrons-farcis-air", titre: "Poivrons farcis gratinés", type: "plat",
    accroche: "Un plat complet et généreux, sans allumer le four.",
    cats: ["classiques"], temps: 35, prep: 15, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[4, "", "poivron"], [300, "g", "boeuf_hache"], [150, "g", "riz", "cuit"], [200, "g", "tomates_concassees"], [1, "c. à c.", "paprika"], [60, "g", "emmental", "râpé"], [1, "pincée", "sel"]],
    etapes: ["Coupez le chapeau des poivrons et videz-les.", "Mélangez la viande, le riz cuit, les tomates, le paprika et le sel.", "Garnissez les poivrons et faites cuire 15 min à 180 °C.", "Parsemez d'emmental et prolongez 5 min."]
  },
  {
    id: "pain-ail-air", titre: "Pain à l'ail et au persil", type: "aperitif",
    accroche: "L'irrésistible pain garlic, doré en 5 minutes.",
    cats: ["rapides", "classiques"], temps: 10, prep: 5, diff: 1, portions: 4,
    ust: ["airfryer"],
    ing: [[250, "g", "pain", "1 baguette"], [80, "g", "beurre", "mou"], [3, "", "ail"], [1, "poignée", "persil"], [1, "pincée", "sel"]],
    etapes: ["Mélangez le beurre avec l'ail pressé, le persil haché et le sel.", "Coupez la baguette en tranches et tartinez-les de beurre.", "Faites dorer 4 à 5 min à 180 °C."]
  },

  // ---------- MICRO-ONDES ----------
  {
    id: "mug-cake-chocolat", titre: "Mug cake au chocolat", type: "dessert",
    accroche: "Un gâteau moelleux, dans une tasse, en 90 secondes.",
    cats: ["desserts", "rapides"], temps: 5, prep: 3, diff: 1, portions: 1,
    ust: ["microondes"],
    ing: [[4, "c. à s.", "farine"], [2, "c. à s.", "cacao"], [2, "c. à s.", "sucre"], [1, "", "oeuf"], [3, "c. à s.", "lait"], [2, "c. à s.", "huile"], [1, "pincée", "levure_chimique"]],
    etapes: ["Mélangez la farine, le cacao, le sucre et la levure directement dans un grand mug.", "Ajoutez l'œuf, le lait et l'huile, puis fouettez à la fourchette.", "Faites cuire 70 à 90 s à 800 W. Le centre doit rester légèrement fondant."]
  },
  {
    id: "oeufs-brouilles-mo", titre: "Œufs brouillés crémeux", type: "petitdej",
    accroche: "Le petit-déjeuner express qui ne salit aucune poêle.",
    cats: ["rapides"], temps: 5, prep: 2, diff: 1, portions: 1,
    ust: ["microondes"],
    ing: [[2, "", "oeuf"], [2, "c. à s.", "lait"], [10, "g", "beurre"], [1, "c. à c.", "ciboulette"], [1, "pincée", "sel"]],
    etapes: ["Battez les œufs avec le lait et le sel dans un bol, puis ajoutez le beurre.", "Faites cuire 30 s, mélangez, puis recommencez par tranches de 20 s jusqu'à ce que les œufs soient juste pris.", "Parsemez de ciboulette et servez aussitôt."]
  },
  {
    id: "porridge-banane-mo", titre: "Porridge banane-cannelle", type: "petitdej",
    accroche: "Un bol chaud et rassasiant, prêt en deux minutes.",
    cats: ["healthy", "rapides"], temps: 5, prep: 2, diff: 1, portions: 1,
    ust: ["microondes"],
    ing: [[50, "g", "flocons_avoine"], [20, "cl", "lait"], [1, "", "banane"], [1, "c. à c.", "miel"], [1, "pincée", "cannelle"]],
    etapes: ["Mélangez les flocons et le lait dans un grand bol.", "Faites cuire 1 min, mélangez, puis prolongez 1 min.", "Ajoutez la banane en rondelles, le miel et la cannelle."]
  },
  {
    id: "pomme-de-terre-garnie-mo", titre: "Pomme de terre garnie au fromage frais", type: "plat",
    accroche: "La baked potato sans attendre une heure de four.",
    cats: ["rapides", "classiques"], temps: 12, prep: 3, diff: 1, portions: 1,
    ust: ["microondes"],
    ing: [[1, "", "pomme_de_terre", "grosse"], [50, "g", "fromage_frais"], [1, "c. à s.", "ciboulette"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Lavez la pomme de terre et piquez-la plusieurs fois à la fourchette.", "Faites-la cuire 8 à 10 min à 800 W en la retournant à mi-cuisson : la pointe d'un couteau doit s'enfoncer sans résistance.", "Fendez-la, salez, poivrez et garnissez de fromage frais à la ciboulette."]
  },
  {
    id: "saumon-courgettes-mo", titre: "Saumon vapeur et courgettes à l'aneth", type: "plat",
    accroche: "Un repas léger et complet, cuit à la vapeur en 5 minutes.",
    cats: ["healthy", "rapides"], temps: 10, prep: 5, diff: 1, portions: 1,
    ust: ["microondes"],
    ing: [[1, "", "saumon", "pavé"], [1, "", "courgette"], [1, "c. à c.", "huile_olive"], [0.5, "", "citron"], [1, "brins", "aneth"], [1, "pincée", "sel"]],
    etapes: ["Taillez la courgette en fines rondelles et disposez-les dans un plat avec l'huile et le sel.", "Posez le saumon dessus, ajoutez des rondelles de citron et l'aneth.", "Couvrez d'un couvercle adapté et faites cuire 4 à 5 min à 800 W. Laissez reposer 1 min."]
  },
  {
    id: "mug-cookie", titre: "Cookie géant en mug", type: "dessert",
    accroche: "Un cookie tiède et fondant, juste pour soi.",
    cats: ["desserts", "rapides"], temps: 5, prep: 3, diff: 1, portions: 1,
    ust: ["microondes"],
    ing: [[20, "g", "beurre"], [1, "c. à s.", "cassonade"], [1, "", "jaune_oeuf"], [4, "c. à s.", "farine"], [1, "c. à s.", "pepites_chocolat"], [1, "pincée", "vanille"]],
    etapes: ["Faites fondre le beurre 15 s dans un mug.", "Ajoutez la cassonade, le jaune d'œuf et la vanille, puis la farine et les pépites.", "Faites cuire 45 à 60 s : le cookie doit rester moelleux au centre."]
  },
  {
    id: "legumes-vapeur-mo", titre: "Légumes vapeur au beurre", type: "accompagnement",
    accroche: "Croquants et colorés, sans casserole ni cuit-vapeur.",
    cats: ["healthy", "rapides"], temps: 10, prep: 5, diff: 1, portions: 2,
    ust: ["microondes"],
    ing: [[200, "g", "brocoli"], [2, "", "carotte"], [150, "g", "haricots_verts"], [3, "c. à s.", "eau"], [15, "g", "beurre"], [1, "pincée", "sel"]],
    etapes: ["Coupez le brocoli en bouquets et les carottes en rondelles.", "Placez les légumes dans un plat avec l'eau, couvrez et faites cuire 5 à 6 min à 800 W.", "Égouttez, ajoutez le beurre et le sel, puis mélangez."]
  },
  {
    id: "quiche-mug", titre: "Quiche en tasse", type: "plat",
    accroche: "Le goût de la quiche lorraine, sans pâte et en 2 minutes.",
    cats: ["rapides", "classiques"], temps: 5, prep: 3, diff: 1, portions: 1,
    ust: ["microondes"],
    ing: [[2, "", "oeuf"], [3, "c. à s.", "creme"], [40, "g", "lardons"], [20, "g", "emmental", "râpé"], [1, "pincée", "poivre"]],
    etapes: ["Faites précuire les lardons 1 min dans un mug, puis retirez le gras.", "Ajoutez les œufs, la crème, l'emmental et le poivre, puis mélangez.", "Faites cuire 1 min 30 à 800 W, jusqu'à ce que le centre soit pris."]
  },
  {
    id: "pates-tomate-mo", titre: "Pâtes à la tomate en un seul bol", type: "plat",
    accroche: "Les pâtes cuisent directement dans la sauce : zéro vaisselle.",
    cats: ["rapides"], temps: 15, prep: 2, diff: 1, portions: 1,
    ust: ["microondes"],
    ing: [[80, "g", "pates"], [20, "cl", "eau"], [100, "g", "tomates_concassees"], [1, "", "ail", "haché"], [3, "feuilles", "basilic"], [15, "g", "parmesan"], [1, "pincée", "sel"]],
    etapes: ["Placez les pâtes, l'eau, les tomates, l'ail et le sel dans un grand bol.", "Faites cuire 10 à 12 min à 800 W en mélangeant toutes les 3 min.", "Laissez reposer 1 min, puis ajoutez le parmesan et le basilic."]
  },
  {
    id: "compote-pommes-mo", titre: "Compote pommes-cannelle express", type: "dessert",
    accroche: "Une compote maison en 6 minutes, sans sucre ajouté si tu veux.",
    cats: ["desserts", "healthy", "rapides"], temps: 10, prep: 4, diff: 1, portions: 2,
    ust: ["microondes"],
    ing: [[3, "", "pomme"], [2, "c. à s.", "eau"], [1, "c. à c.", "sucre", "facultatif"], [1, "pincée", "cannelle"]],
    etapes: ["Épluchez les pommes et coupez-les en petits dés.", "Placez-les dans un bol avec l'eau, le sucre et la cannelle, puis couvrez.", "Faites cuire 5 à 6 min à 800 W, puis écrasez à la fourchette."]
  },

  // ---------- SANS CUISSON ----------
  {
    id: "salade-grecque", titre: "Salade grecque", type: "entree",
    accroche: "Tomates gorgées de soleil, feta et olives : l'été dans l'assiette.",
    cats: ["healthy", "monde", "rapides"], temps: 15, prep: 15, diff: 1, portions: 4,
    ust: [],
    ing: [[4, "", "tomate"], [1, "", "concombre"], [1, "", "oignon_rouge"], [1, "", "poivron"], [200, "g", "feta"], [80, "g", "olives", "noires"], [1, "c. à c.", "origan"], [4, "c. à s.", "huile_olive"]],
    etapes: ["Coupez les tomates, le concombre et le poivron en morceaux, et l'oignon en fines lamelles.", "Disposez-les dans un plat avec les olives.", "Posez la feta en bloc ou en cubes, parsemez d'origan et arrosez d'huile d'olive."]
  },
  {
    id: "chia-pudding-mangue", titre: "Chia pudding coco-mangue", type: "petitdej",
    accroche: "Un dessert ou un petit-déjeuner exotique, préparé la veille.",
    cats: ["healthy"], temps: 250, prep: 10, diff: 1, portions: 2,
    ust: [],
    ing: [[40, "g", "graines_chia"], [25, "cl", "lait_coco"], [1, "c. à s.", "miel"], [1, "", "mangue"]],
    etapes: ["Mélangez les graines de chia, le lait de coco et le miel.", "Laissez reposer au frais au moins 4 h, ou toute la nuit, en remuant une fois après 15 min.", "Servez dans des verres, recouvert de mangue en dés."]
  },
  {
    id: "carpaccio-boeuf", titre: "Carpaccio de bœuf, parmesan et basilic", type: "entree",
    accroche: "Des tranches fines comme du papier, relevées d'huile et de citron.",
    cats: ["classiques", "monde", "rapides"], temps: 50, prep: 15, diff: 2, portions: 4,
    ust: [],
    ing: [[300, "g", "filet_boeuf", "très frais"], [40, "g", "parmesan", "en copeaux"], [3, "c. à s.", "huile_olive"], [1, "", "citron"], [1, "poignée", "basilic"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Placez le filet 30 min au congélateur : il sera plus facile à trancher.", "Coupez-le en tranches très fines et disposez-les sur les assiettes.", "Arrosez d'huile et de jus de citron, salez, poivrez.", "Ajoutez les copeaux de parmesan et le basilic, puis servez aussitôt."]
  },
  {
    id: "wrap-thon-crudites", titre: "Wrap thon et crudités", type: "plat",
    accroche: "Le déjeuner à emporter, frais et prêt en 5 minutes.",
    cats: ["rapides"], temps: 10, prep: 10, diff: 1, portions: 2,
    ust: [],
    ing: [[2, "", "tortilla"], [140, "g", "thon", "en boîte, égoutté"], [2, "c. à s.", "mayonnaise"], [4, "feuilles", "laitue"], [1, "", "tomate"], [70, "g", "mais"], [1, "pincée", "poivre"]],
    etapes: ["Mélangez le thon avec la mayonnaise, le maïs et le poivre.", "Garnissez les tortillas de laitue, de tomate en rondelles et du mélange au thon.", "Roulez-les bien serré et coupez-les en deux."]
  },
  {
    id: "ceviche-cabillaud", titre: "Ceviche de cabillaud au citron vert", type: "entree",
    accroche: "Le poisson « cuit » dans le citron : vif, frais et parfumé.",
    cats: ["healthy", "monde"], temps: 35, prep: 15, diff: 2, portions: 4,
    ust: [],
    ing: [[400, "g", "cabillaud", "extra-frais, sans peau"], [4, "", "citron_vert"], [1, "", "oignon_rouge"], [1, "", "piment_frais"], [1, "poignée", "coriandre"], [1, "", "avocat"], [1, "pincée", "sel"]],
    etapes: ["Coupez le poisson en petits cubes et l'oignon en fines lamelles.", "Recouvrez de jus de citron vert, ajoutez le piment émincé et le sel, puis laissez mariner 20 min au frais.", "Ajoutez l'avocat en dés et la coriandre, puis servez bien frais."]
  },
  {
    id: "tzatziki", titre: "Tzatziki", type: "aperitif",
    accroche: "La sauce grecque au yaourt et concombre, idéale à tremper.",
    cats: ["healthy", "monde", "rapides"], temps: 15, prep: 15, diff: 1, portions: 4,
    ust: [],
    ing: [[1, "", "concombre"], [400, "g", "yaourt", "grec"], [1, "", "ail"], [1, "c. à s.", "aneth"], [1, "c. à s.", "huile_olive"], [0.5, "", "citron"], [1, "pincée", "sel"]],
    etapes: ["Râpez le concombre, salez-le et pressez-le dans un torchon pour retirer l'eau.", "Mélangez-le au yaourt avec l'ail pressé, l'aneth et un filet de citron.", "Arrosez d'huile d'olive et servez frais."]
  },
  {
    id: "salade-caprese", titre: "Salade caprese", type: "entree",
    accroche: "Trois ingrédients, une huile d'olive généreuse : la simplicité italienne.",
    cats: ["monde", "rapides", "healthy"], temps: 10, prep: 10, diff: 1, portions: 2,
    ust: [],
    ing: [[3, "", "tomate"], [250, "g", "mozzarella"], [1, "poignée", "basilic"], [3, "c. à s.", "huile_olive"], [1, "pincée", "sel"], [1, "pincée", "poivre"]],
    etapes: ["Coupez les tomates et la mozzarella en tranches.", "Alternez-les sur un plat avec les feuilles de basilic.", "Assaisonnez d'huile d'olive, de sel et de poivre."]
  },
  {
    id: "verrines-cheesecake", titre: "Verrines façon cheesecake", type: "dessert",
    accroche: "Tout le crémeux du cheesecake, sans four ni attente.",
    cats: ["desserts", "rapides"], temps: 15, prep: 15, diff: 1, portions: 4,
    ust: [],
    ing: [[100, "g", "speculoos"], [250, "g", "mascarpone"], [200, "g", "fromage_frais"], [50, "g", "sucre_glace"], [1, "pincée", "vanille"], [200, "g", "fruits_rouges"]],
    etapes: ["Émiettez les biscuits au fond de 4 verrines.", "Fouettez le mascarpone avec le fromage frais, le sucre glace et la vanille.", "Répartissez la crème sur les biscuits, puis ajoutez les fruits rouges. Gardez au frais jusqu'au service."]
  },
  {
    id: "energy-balls", titre: "Energy balls cacahuète-chocolat", type: "dessert",
    accroche: "Le goûter énergétique à garder au frigo toute la semaine.",
    cats: ["healthy", "desserts", "rapides"], temps: 15, prep: 15, diff: 1, portions: 4,
    ust: [],
    ing: [[100, "g", "flocons_avoine"], [80, "g", "beurre_cacahuete"], [2, "c. à s.", "miel"], [40, "g", "pepites_chocolat"]],
    etapes: ["Mélangez tous les ingrédients dans un saladier.", "Formez une quinzaine de boules avec les mains légèrement humides.", "Placez-les 30 min au frais pour qu'elles se tiennent."]
  },
  {
    id: "bowl-thon-avocat", titre: "Bowl frais thon et avocat", type: "plat",
    accroche: "Un bol coloré et complet, sans rien faire cuire.",
    cats: ["healthy", "rapides"], temps: 10, prep: 10, diff: 1, portions: 2,
    ust: [],
    ing: [[140, "g", "thon", "en boîte, égoutté"], [1, "", "avocat"], [0.5, "", "concombre"], [150, "g", "tomate_cerise"], [70, "g", "mais"], [2, "poignée", "laitue"], [1, "", "citron"], [2, "c. à s.", "huile_olive"]],
    etapes: ["Répartissez la salade dans deux bols.", "Disposez par-dessus le thon, l'avocat en tranches, le concombre, les tomates cerises coupées en deux et le maïs.", "Arrosez d'huile d'olive et de jus de citron."]
  }
]);
