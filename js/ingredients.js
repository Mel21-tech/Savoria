/* SAVORIA — Dictionnaire des ingrédients, allergènes, ustensiles et substitutions.
   Les allergènes d'une recette sont CALCULÉS à partir de ses ingrédients :
   a  = contient (allergène présent)
   tr = peut contenir (traces fréquentes sur les produits du commerce)
   t  = étiquettes régime (viande, porc, poisson, fruitsdemer, oeuf, laitier, miel, alcool)
   tf = produit transformé : vérifier l'étiquette
   base = ingrédient de placard (ignoré par l'assistant) */
window.S = window.S || {};

S.ALLERGENES = {
  gluten: "Gluten", crustaces: "Crustacés", oeufs: "Œufs", poissons: "Poissons",
  arachides: "Arachides", soja: "Soja", lait: "Lait", fruits_coque: "Fruits à coque",
  celeri: "Céleri", moutarde: "Moutarde", sesame: "Sésame", sulfites: "Sulfites",
  lupin: "Lupin", mollusques: "Mollusques"
};

S.REGIMES = {
  aucun: { n: "Aucun régime particulier", exclut: [] },
  vegetarien: { n: "Végétarien", exclut: ["viande", "porc", "poisson", "fruitsdemer"] },
  pescetarien: { n: "Pescétarien", exclut: ["viande", "porc"] },
  vegan: { n: "Végan", exclut: ["viande", "porc", "poisson", "fruitsdemer", "oeuf", "laitier", "miel"] },
  sansporc: { n: "Sans porc", exclut: ["porc"] }
};

S.USTENSILES = {
  plaques: "Plaques de cuisson", four: "Four", microondes: "Micro-ondes", airfryer: "Air fryer",
  poele: "Poêle", casserole: "Casserole", cocotte: "Cocotte", wok: "Wok",
  blender: "Blender", mixeur: "Mixeur plongeant", robot: "Robot pâtissier", batteur: "Batteur électrique",
  chalumeau: "Chalumeau"
};

S.ING = {
  // Placard
  sel: { n: "sel", v: ["sel", "fleur de sel"], base: 1 },
  poivre: { n: "poivre", v: ["poivre"], base: 1 },
  huile_olive: { n: "huile d'olive", v: ["huile d olive", "huile olive"], base: 1 },
  huile: { n: "huile neutre", v: ["huile", "huile neutre", "huile de tournesol", "huile de colza"], base: 1 },
  eau: { n: "eau", v: ["eau"], base: 1 },
  // Laitages & œufs
  oeuf: { n: "œuf", pl: "œufs", v: ["oeuf", "oeufs"], a: ["oeufs"], t: ["oeuf"] },
  jaune_oeuf: { n: "jaune d'œuf", pl: "jaunes d'œufs", v: ["jaune d oeuf", "jaunes d oeufs", "jaunes d oeuf"], a: ["oeufs"], t: ["oeuf"] },
  beurre: { n: "beurre", v: ["beurre"], a: ["lait"], t: ["laitier"] },
  lait: { n: "lait", v: ["lait", "lait entier", "lait demi ecreme"], a: ["lait"], t: ["laitier"] },
  creme: { n: "crème fraîche", v: ["creme", "creme fraiche", "creme liquide", "creme entiere"], a: ["lait"], t: ["laitier"] },
  parmesan: { n: "parmesan", v: ["parmesan", "parmigiano"], a: ["lait"], t: ["laitier"] },
  emmental: { n: "emmental râpé", v: ["emmental", "gruyere", "comte", "fromage rape", "fromage"], a: ["lait"], t: ["laitier"] },
  feta: { n: "feta", v: ["feta"], a: ["lait"], t: ["laitier"] },
  mascarpone: { n: "mascarpone", v: ["mascarpone"], a: ["lait"], t: ["laitier"] },
  yaourt: { n: "yaourt nature", v: ["yaourt", "yogourt", "yaourt grec"], a: ["lait"], t: ["laitier"] },
  // Viandes
  lardons: { n: "lardons", v: ["lardons", "lardon", "bacon", "guanciale", "pancetta"], t: ["porc", "viande"], tf: 1 },
  jambon: { n: "tranche de jambon", pl: "tranches de jambon", v: ["jambon"], t: ["porc", "viande"], tf: 1 },
  poulet: { n: "poulet", v: ["poulet", "blanc de poulet", "blancs de poulet", "filet de poulet", "cuisse de poulet", "cuisses de poulet"], t: ["viande"] },
  poulet_entier: { n: "poulet entier (1,5 kg)", pl: "poulets entiers", v: ["poulet entier"], t: ["viande"] },
  boeuf: { n: "bœuf à braiser", v: ["boeuf", "macreuse", "plat de cotes", "boeuf a braiser"], t: ["viande"] },
  boeuf_hache: { n: "bœuf haché", v: ["boeuf hache", "viande hachee", "steak hache", "steaks haches"], t: ["viande"] },
  filet_boeuf: { n: "filet de bœuf", v: ["filet de boeuf", "rumsteck", "tournedos", "pave de boeuf", "paves de boeuf", "entrecote", "steak", "steaks"], t: ["viande"] },
  veau: { n: "veau (épaule ou tendron)", v: ["veau", "blanquette de veau"], t: ["viande"] },
  os_moelle: { n: "os à moelle", pl: "os à moelle", v: ["os a moelle"], t: ["viande"] },
  agneau: { n: "épaule d'agneau", v: ["agneau", "epaule d agneau", "gigot"], t: ["viande"] },
  // Poissons & fruits de mer
  saumon: { n: "pavé de saumon", pl: "pavés de saumon", v: ["saumon", "pave de saumon", "paves de saumon"], a: ["poissons"], t: ["poisson"] },
  saumon_cru: { n: "saumon frais extra-frais", v: ["saumon cru", "saumon sashimi"], a: ["poissons"], t: ["poisson"] },
  cabillaud: { n: "dos de cabillaud", pl: "dos de cabillaud", v: ["cabillaud", "colin", "lieu", "poisson blanc"], a: ["poissons"], t: ["poisson"] },
  crevettes: { n: "crevettes décortiquées", v: ["crevette", "crevettes", "gambas"], a: ["crustaces"], t: ["fruitsdemer"] },
  sauce_poisson: { n: "sauce poisson (nuoc-mâm)", v: ["sauce poisson", "nuoc mam"], a: ["poissons"], t: ["poisson"], tf: 1 },
  // Légumes
  oignon: { n: "oignon", pl: "oignons", v: ["oignon", "oignons", "oignon jaune"] },
  echalote: { n: "échalote", pl: "échalotes", v: ["echalote", "echalotes"] },
  ail: { n: "gousse d'ail", pl: "gousses d'ail", v: ["ail", "gousse d ail", "gousses d ail"] },
  carotte: { n: "carotte", pl: "carottes", v: ["carotte", "carottes"] },
  poivron: { n: "poivron", pl: "poivrons", v: ["poivron", "poivrons"] },
  tomate: { n: "tomate", pl: "tomates", v: ["tomate", "tomates"] },
  tomate_cerise: { n: "tomates cerises", v: ["tomates cerises", "tomate cerise"] },
  tomates_concassees: { n: "tomates concassées (boîte)", v: ["tomates concassees", "coulis de tomate", "tomates en boite", "pulpe de tomate"], tf: 1 },
  courgette: { n: "courgette", pl: "courgettes", v: ["courgette", "courgettes"] },
  aubergine: { n: "aubergine", pl: "aubergines", v: ["aubergine", "aubergines"] },
  champignon: { n: "champignons de Paris", v: ["champignon", "champignons", "champignons de paris", "cepes"] },
  pomme_de_terre: { n: "pommes de terre", v: ["pomme de terre", "pommes de terre", "patate", "patates"] },
  patate_douce: { n: "patate douce", pl: "patates douces", v: ["patate douce", "patates douces"] },
  epinards: { n: "pousses d'épinards", v: ["epinard", "epinards"] },
  concombre: { n: "concombre", pl: "concombres", v: ["concombre"] },
  avocat: { n: "avocat", pl: "avocats", v: ["avocat", "avocats"] },
  laitue: { n: "laitue romaine", v: ["laitue", "salade", "romaine"] },
  poireau: { n: "poireau", pl: "poireaux", v: ["poireau", "poireaux"] },
  navet: { n: "navet", pl: "navets", v: ["navet", "navets"] },
  celeri: { n: "branche de céleri", pl: "branches de céleri", v: ["celeri", "celeri branche"], a: ["celeri"] },
  gingembre: { n: "gingembre frais râpé", v: ["gingembre"] },
  citron: { n: "citron", pl: "citrons", v: ["citron", "citrons", "jus de citron"] },
  citron_vert: { n: "citron vert", pl: "citrons verts", v: ["citron vert", "citrons verts"] },
  citron_confit: { n: "citron confit", pl: "citrons confits", v: ["citron confit", "citrons confits"], tf: 1 },
  olives: { n: "olives", v: ["olive", "olives"], tr: ["sulfites"], tf: 1 },
  mais: { n: "maïs en grains", v: ["mais"], tf: 1 },
  germes_soja: { n: "pousses de haricot mungo (« soja »)", v: ["germes de soja", "pousses de soja", "haricot mungo"] },
  edamame: { n: "edamame", v: ["edamame", "edamames", "feves de soja"], a: ["soja"] },
  // Féculents & légumineuses
  spaghetti: { n: "spaghetti", v: ["spaghetti", "spaghettis", "pates", "pate", "linguine", "tagliatelles"], a: ["gluten"] },
  riz: { n: "riz basmati", v: ["riz", "riz basmati", "riz thai"] },
  riz_arborio: { n: "riz arborio", v: ["riz arborio", "riz a risotto", "riz carnaroli"] },
  nouilles_riz: { n: "nouilles de riz", v: ["nouilles de riz", "nouilles", "vermicelles de riz"] },
  quinoa: { n: "quinoa", v: ["quinoa"] },
  lentilles_corail: { n: "lentilles corail", v: ["lentilles corail", "lentilles", "lentille"] },
  pois_chiches: { n: "pois chiches (cuits)", v: ["pois chiche", "pois chiches"], tf: 1 },
  haricots_rouges: { n: "haricots rouges (cuits)", v: ["haricots rouges", "haricot rouge"], tf: 1 },
  farine: { n: "farine de blé", v: ["farine", "farine de ble"], a: ["gluten"] },
  pain: { n: "tranche de pain de campagne", pl: "tranches de pain de campagne", v: ["pain", "baguette", "pain de campagne"], a: ["gluten"], tf: 1 },
  pain_mie: { n: "tranche de pain de mie", pl: "tranches de pain de mie", v: ["pain de mie"], a: ["gluten"], tr: ["lait", "soja", "sesame"], tf: 1 },
  tortilla: { n: "tortilla de blé", pl: "tortillas de blé", v: ["tortilla", "tortillas", "wrap", "wraps"], a: ["gluten"], tf: 1 },
  pate_brisee: { n: "pâte brisée", v: ["pate brisee"], a: ["gluten", "lait"], tr: ["oeufs"], tf: 1 },
  pate_feuilletee: { n: "pâte feuilletée", v: ["pate feuilletee"], a: ["gluten", "lait"], tf: 1 },
  biscuits_cuillere: { n: "biscuits à la cuillère", v: ["biscuits a la cuillere", "boudoirs"], a: ["gluten", "oeufs"], t: ["oeuf"], tf: 1 },
  flocons_avoine: { n: "flocons d'avoine", v: ["flocons d avoine", "avoine"], a: ["gluten"] },
  levure_boulanger: { n: "levure de boulanger sèche", v: ["levure de boulanger", "levure boulangere"] },
  levure_chimique: { n: "levure chimique", v: ["levure chimique", "levure"], tr: ["gluten"], tf: 1 },
  // Sauces, épices, aromates
  sauce_soja: { n: "sauce soja", v: ["sauce soja", "soja"], a: ["soja", "gluten"], tf: 1 },
  moutarde: { n: "moutarde", v: ["moutarde"], a: ["moutarde"], tf: 1 },
  mayonnaise: { n: "mayonnaise", v: ["mayonnaise", "mayo"], a: ["oeufs", "moutarde"], t: ["oeuf"], tf: 1 },
  tahini: { n: "tahini (purée de sésame)", v: ["tahini", "tahin", "puree de sesame"], a: ["sesame"] },
  sesame: { n: "graines de sésame", v: ["sesame", "graines de sesame"], a: ["sesame"] },
  cacahuetes: { n: "cacahuètes grillées", v: ["cacahuete", "cacahuetes", "arachide", "arachides"], a: ["arachides"] },
  lait_coco: { n: "lait de coco", v: ["lait de coco", "creme de coco"], tf: 1 },
  curry: { n: "curry en poudre", v: ["curry"], tr: ["moutarde", "celeri"], tf: 1 },
  garam_masala: { n: "garam masala", v: ["garam masala"], tr: ["moutarde", "celeri"], tf: 1 },
  cumin: { n: "cumin", v: ["cumin"] },
  paprika: { n: "paprika", v: ["paprika"] },
  curcuma: { n: "curcuma", v: ["curcuma"] },
  piment: { n: "piment en poudre", v: ["piment", "chili", "piment d espelette"] },
  muscade: { n: "noix de muscade râpée", v: ["muscade", "noix de muscade"] },
  clou_girofle: { n: "clou de girofle", pl: "clous de girofle", v: ["clou de girofle", "girofle"] },
  bouquet_garni: { n: "bouquet garni", v: ["bouquet garni"], tr: ["celeri"] },
  herbes_provence: { n: "herbes de Provence", v: ["herbes de provence"] },
  thym: { n: "thym", v: ["thym"] },
  romarin: { n: "romarin", v: ["romarin"] },
  persil: { n: "persil", v: ["persil"] },
  ciboulette: { n: "ciboulette", v: ["ciboulette"] },
  aneth: { n: "aneth", v: ["aneth"] },
  menthe: { n: "menthe fraîche", v: ["menthe"] },
  coriandre: { n: "coriandre fraîche", v: ["coriandre"] },
  basilic: { n: "basilic", v: ["basilic"] },
  bouillon: { n: "bouillon de volaille (cube)", v: ["bouillon", "cube de bouillon", "bouillon de legumes", "bouillon de volaille", "bouillon de boeuf"], a: ["celeri"], tr: ["gluten", "lait"], tf: 1 },
  fond_veau: { n: "fond de veau", v: ["fond de veau", "fond brun"], tr: ["gluten", "celeri", "lait"], tf: 1 },
  vin_rouge: { n: "vin rouge", v: ["vin rouge", "vin"], a: ["sulfites"], t: ["alcool"] },
  vin_blanc: { n: "vin blanc sec", v: ["vin blanc"], a: ["sulfites"], t: ["alcool"] },
  cafe: { n: "café fort", v: ["cafe", "expresso", "espresso"] },
  // Sucré
  sucre: { n: "sucre", v: ["sucre", "sucre en poudre"] },
  cassonade: { n: "cassonade", v: ["cassonade", "sucre roux", "vergeoise"] },
  miel: { n: "miel", v: ["miel"], t: ["miel"] },
  sirop_erable: { n: "sirop d'érable", v: ["sirop d erable"] },
  chocolat: { n: "chocolat noir", v: ["chocolat", "chocolat noir", "chocolat patissier"], tr: ["lait", "soja", "fruits_coque"], tf: 1 },
  pepites_chocolat: { n: "pépites de chocolat", v: ["pepites de chocolat", "pepites"], tr: ["lait", "soja", "fruits_coque"], tf: 1 },
  cacao: { n: "cacao non sucré", v: ["cacao"], tr: ["lait"] },
  vanille: { n: "gousse de vanille", pl: "gousses de vanille", v: ["vanille", "gousse de vanille", "extrait de vanille"] },
  gelatine: { n: "feuille de gélatine (porcine)", pl: "feuilles de gélatine (porcine)", v: ["gelatine"], t: ["porc"], tf: 1 },
  agar: { n: "agar-agar", v: ["agar agar", "agar"] },
  pomme: { n: "pomme (type Golden)", pl: "pommes (type Golden)", v: ["pomme", "pommes"] },
  banane: { n: "banane", pl: "bananes", v: ["banane", "bananes"] },
  mangue: { n: "mangue", pl: "mangues", v: ["mangue", "mangues"] },
  fruits_rouges: { n: "fruits rouges", v: ["fruits rouges", "framboise", "framboises", "myrtilles"] },
  // Substituts
  boisson_avoine: { n: "boisson végétale avoine", v: ["boisson avoine", "lait d avoine", "lait vegetal"], a: ["gluten"], tf: 1 },
  boisson_riz: { n: "boisson végétale riz", v: ["boisson riz", "lait de riz"], tf: 1 },
  creme_vegetale: { n: "crème végétale (soja)", v: ["creme vegetale", "creme de soja"], a: ["soja"], tf: 1 },
  margarine: { n: "margarine végétale", v: ["margarine"], tr: ["soja", "lait"], tf: 1 },
  fecule: { n: "fécule de maïs", v: ["fecule", "maizena", "fecule de mais"] },
  farine_riz: { n: "farine de riz", v: ["farine de riz"] },
  compote: { n: "compote de pommes", v: ["compote", "compote de pommes"] },
  graines_lin: { n: "graines de lin moulues + eau", v: ["graines de lin", "lin"] },
  levure_maltee: { n: "levure maltée", v: ["levure maltee", "levure nutritionnelle"] },
  tofu: { n: "tofu ferme", v: ["tofu"], a: ["soja"] },
  yaourt_vegetal: { n: "yaourt végétal (coco)", v: ["yaourt vegetal", "yaourt coco"], tf: 1 },
  tamari: { n: "tamari sans gluten", v: ["tamari"], a: ["soja"], tf: 1 },
  ble_sans_gluten: { n: "pâtes sans gluten", v: ["pates sans gluten"], tf: 1 },
  graines_tournesol: { n: "graines de tournesol", v: ["graines de tournesol", "tournesol"] },
  // Ajouts : tendances et nouvelles recettes
  poivre_grains: { n: "poivre noir en grains concassé", v: ["poivre en grains", "grains de poivre", "poivre concasse", "poivre mignonnette"] },
  cognac: { n: "cognac", v: ["cognac", "brandy", "armagnac"], t: ["alcool"] },
  vodka: { n: "vodka", v: ["vodka"], t: ["alcool"] },
  pates: { n: "pâtes courtes (rigatoni, penne)", v: ["rigatoni", "penne", "pates courtes", "fusilli", "macaronis", "coquillettes"], a: ["gluten"] },
  pates_lasagne: { n: "feuilles de lasagne", v: ["feuilles de lasagne", "lasagne", "lasagnes"], a: ["gluten"], tr: ["oeufs"], tf: 1 },
  nouilles_ramen: { n: "nouilles ramen", v: ["nouilles ramen", "ramen", "nouilles de ble", "nouilles chinoises"], a: ["gluten"], tr: ["oeufs", "soja"], tf: 1 },
  pesto: { n: "pesto au basilic", v: ["pesto"], a: ["lait"], tr: ["fruits_coque"], tf: 1 },
  speculoos: { n: "biscuits spéculoos", v: ["speculoos", "biscoff", "lotus"], a: ["gluten", "soja"], tf: 1 },
  creme_pistache: { n: "crème de pistache", v: ["creme de pistache", "pate de pistache", "pistache", "pistaches"], a: ["fruits_coque"], tr: ["lait"], tf: 1 },
  kadaif: { n: "pâte kadaïf", v: ["kadaif", "cheveux d ange"], a: ["gluten"], tf: 1 },
  fraises: { n: "fraises", v: ["fraise", "fraises"] },
  cerises: { n: "cerises", v: ["cerise", "cerises"] },
  cottage: { n: "cottage cheese", v: ["cottage cheese", "cottage", "fromage blanc"], a: ["lait"], t: ["laitier"] },
  fromage_frais: { n: "fromage frais à tartiner", v: ["fromage frais", "philadelphia", "cream cheese", "st moret"], a: ["lait"], t: ["laitier"], tf: 1 },
  mozzarella: { n: "mozzarella", v: ["mozzarella", "burrata"], a: ["lait"], t: ["laitier"] },
  cheddar: { n: "cheddar", v: ["cheddar"], a: ["lait"], t: ["laitier"] },
  reblochon: { n: "reblochon", v: ["reblochon"], a: ["lait"], t: ["laitier"] },
  oignon_rouge: { n: "oignon rouge", pl: "oignons rouges", v: ["oignon rouge", "oignons rouges"] },
  pain_burger: { n: "pain à burger", pl: "pains à burger", v: ["pain burger", "pains burger", "bun", "buns"], a: ["gluten"], tr: ["sesame", "oeufs", "lait", "soja"], tf: 1 },
  pain_brioche: { n: "tranche de brioche", pl: "tranches de brioche", v: ["brioche"], a: ["gluten", "oeufs", "lait"], tf: 1 },
  cornichons: { n: "cornichons", v: ["cornichon", "cornichons", "pickles"], tr: ["moutarde", "sulfites"], tf: 1 },
  ketchup: { n: "ketchup", v: ["ketchup"], tr: ["celeri"], tf: 1 },
  sriracha: { n: "sauce sriracha", v: ["sriracha", "sauce piquante", "hot sauce"], tf: 1 },
  vinaigre_riz: { n: "vinaigre de riz", v: ["vinaigre de riz"], tr: ["sulfites"], tf: 1 },
  vinaigre: { n: "vinaigre de vin", v: ["vinaigre", "vinaigre de vin", "vinaigre balsamique"], a: ["sulfites"] },
  huile_sesame: { n: "huile de sésame", v: ["huile de sesame"], a: ["sesame"] },
  nori: { n: "feuille d'algue nori", pl: "feuilles d'algue nori", v: ["nori", "algue nori", "algues"] },
  tomates_sechees: { n: "tomates séchées", v: ["tomates sechees"], tr: ["sulfites"], tf: 1 },
  concentre_tomate: { n: "concentré de tomate", v: ["concentre de tomate"], tf: 1 },
  chorizo: { n: "chorizo", v: ["chorizo"], t: ["porc", "viande"], tr: ["lait", "sulfites"], tf: 1 },
  merguez: { n: "merguez", pl: "merguez", v: ["merguez"], t: ["viande"], tr: ["sulfites"], tf: 1 },
  moules: { n: "moules", v: ["moule", "moules"], a: ["mollusques"], t: ["fruitsdemer"] },
  anchois: { n: "filets d'anchois", v: ["anchois"], a: ["poissons"], t: ["poisson"], tf: 1 },
  thon: { n: "thon au naturel (boîte)", v: ["thon"], a: ["poissons"], t: ["poisson"], tf: 1 },
  safran: { n: "safran", v: ["safran"] },
  riz_rond: { n: "riz rond", v: ["riz rond", "riz a paella", "riz dessert"] },
  petits_pois: { n: "petits pois", v: ["petits pois", "petit pois"] },
  haricots_verts: { n: "haricots verts", v: ["haricots verts"] },
  semoule: { n: "semoule de blé", v: ["semoule", "couscous"], a: ["gluten"] },
  ras_el_hanout: { n: "ras el hanout", v: ["ras el hanout"], tr: ["moutarde", "celeri"], tf: 1 },
  courge: { n: "courge (potiron ou butternut)", v: ["potiron", "courge", "butternut", "potimarron", "citrouille"] },
  pate_curry: { n: "pâte de curry vert", v: ["pate de curry", "curry vert", "curry rouge"], a: ["crustaces"], tr: ["poissons"], tf: 1 },
  pate_pizza: { n: "pâte à pizza", v: ["pate a pizza"], a: ["gluten"], tf: 1 },
  pate_sablee: { n: "pâte sablée", v: ["pate sablee"], a: ["gluten", "lait"], tr: ["oeufs"], tf: 1 },
  biscuits_sables: { n: "biscuits sablés (type petit-beurre)", v: ["biscuits sables", "petit beurre", "petits beurres"], a: ["gluten", "lait"], tr: ["oeufs", "soja"], tf: 1 },
  beurre_cacahuete: { n: "beurre de cacahuète", v: ["beurre de cacahuete"], a: ["arachides"], tf: 1 },
  graines_chia: { n: "graines de chia", v: ["chia", "graines de chia"] },
  sucre_glace: { n: "sucre glace", v: ["sucre glace"] },
  cannelle: { n: "cannelle", v: ["cannelle"] },
  origan: { n: "origan", v: ["origan"] },
  noix: { n: "cerneaux de noix", v: ["noix", "cerneaux"], a: ["fruits_coque"] },
  amandes: { n: "poudre d'amande", v: ["poudre d amande", "amande", "amandes"], a: ["fruits_coque"] },
  poulet_cuisses: { n: "cuisses de poulet", v: ["cuisses de poulet", "hauts de cuisse"], t: ["viande"] },
  boeuf_joue: { n: "joue ou paleron de bœuf", v: ["joue de boeuf", "paleron"], t: ["viande"] },
  saumon_fume: { n: "saumon fumé", v: ["saumon fume"], a: ["poissons"], t: ["poisson"], tf: 1 },
  piment_frais: { n: "piment frais", v: ["piment frais", "piment rouge", "piment vert"] },
  brocoli: { n: "brocoli", pl: "brocolis", v: ["brocoli", "brocolis"] },
  chapelure: { n: "chapelure", v: ["chapelure", "panko"], a: ["gluten"], tf: 1 }
};


/* Remplacements : ingrédient manquant -> alternatives (avec ratio indicatif) */
S.SUBSTITUTIONS = {
  beurre: [["huile_olive", "même quantité, ou un peu moins"], ["margarine", "même quantité"]],
  lait: [["boisson_avoine", "même quantité"], ["boisson_riz", "même quantité"]],
  creme: [["creme_vegetale", "même quantité"], ["yaourt", "même quantité, hors cuisson forte"], ["lait_coco", "pour les plats salés épicés"]],
  oeuf: [["compote", "60 g par œuf (pâtisserie)"], ["graines_lin", "1 c. à s. + 3 c. à s. d'eau par œuf"]],
  farine: [["fecule", "moitié de la quantité pour lier une sauce"], ["farine_riz", "même quantité en pâtisserie"]],
  sucre: [["miel", "2/3 de la quantité"], ["sirop_erable", "3/4 de la quantité"]],
  parmesan: [["emmental", "même quantité"], ["levure_maltee", "moitié de la quantité, version végane"]],
  emmental: [["parmesan", "moitié de la quantité"], ["feta", "même quantité, goût plus salé"]],
  sauce_soja: [["tamari", "même quantité, sans gluten"]],
  vin_rouge: [["fond_veau", "même volume de fond + 1 c. à s. de vinaigre"]],
  vin_blanc: [["bouillon", "même volume + un trait de citron"]],
  citron: [["citron_vert", "même quantité"]],
  citron_vert: [["citron", "même quantité"]],
  echalote: [["oignon", "1 petit oignon pour 2 échalotes"]],
  oignon: [["echalote", "2 échalotes par oignon"]],
  yaourt: [["yaourt_vegetal", "même quantité"], ["creme", "même quantité"]],
  gelatine: [["agar", "2 g d'agar-agar pour 50 cl de liquide, à faire bouillir"]],
  spaghetti: [["ble_sans_gluten", "même quantité"], ["nouilles_riz", "même quantité"]],
  poulet: [["tofu", "même quantité, version végétale"]],
  boeuf_hache: [["lentilles_corail", "200 g de lentilles cuites pour 250 g de viande"]],
  riz: [["quinoa", "même quantité"]],
  quinoa: [["riz", "même quantité"]],
  cacahuetes: [["graines_tournesol", "même quantité, sans arachides"]],
  sesame: [["graines_tournesol", "même quantité"]],
  cognac: [["bouillon", "même volume de bouillon, sans alcool"]],
  vodka: [["eau", "même volume d'eau + un trait de citron"]],
  speculoos: [["biscuits_sables", "même quantité + une pincée de cannelle"]],
  creme_pistache: [["beurre_cacahuete", "même quantité, goût différent"]],
  cottage: [["yaourt", "même quantité de yaourt grec"]],
  pesto: [["huile_olive", "huile d'olive + basilic + ail mixés"]],
  mascarpone: [["creme", "même quantité de crème montée bien froide"]],
  pomme_de_terre: [["patate_douce", "même quantité, goût plus sucré"]],
  bouillon: [["eau", "eau + herbes + sel, plus léger en goût"]]
};

/* ---- Outils ---- */
S.norm = function (s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/œ/g, "oe").replace(/[’'`]/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
};

/* Index de reconnaissance : variantes triées de la plus longue à la plus courte */
S.ING_INDEX = (function () {
  var list = [];
  Object.keys(S.ING).forEach(function (k) {
    var ing = S.ING[k];
    var vs = (ing.v || []).concat([ing.n]);
    vs.forEach(function (v) { list.push({ k: k, v: S.norm(v) }); });
  });
  list.sort(function (a, b) { return b.v.length - a.v.length; });
  return list;
})();

/* Trouve les ingrédients cités dans un texte libre */
S.detectIngredients = function (text) {
  var t = " " + S.norm(text) + " ";
  var found = [];
  S.ING_INDEX.forEach(function (e) {
    var re = new RegExp(" " + e.v.replace(/ /g, "s? ") + "(s|x)? ");
    var m = t.match(re);
    if (m) {
      if (found.indexOf(e.k) < 0) found.push(e.k);
      t = t.replace(re, " # ");
    }
  });
  return found;
};

/* Allergènes d'une liste d'ingrédients */
S.allergenesDe = function (keys) {
  var a = {}, tr = {}, tags = {}, tf = [];
  keys.forEach(function (k) {
    var ing = S.ING[k];
    if (!ing) return;
    (ing.a || []).forEach(function (x) { a[x] = 1; });
    (ing.tr || []).forEach(function (x) { tr[x] = 1; });
    (ing.t || []).forEach(function (x) { tags[x] = 1; });
    if (ing.tf) tf.push(k);
  });
  Object.keys(a).forEach(function (x) { delete tr[x]; });
  return { contient: Object.keys(a), traces: Object.keys(tr), tags: Object.keys(tags), transformes: tf };
};
