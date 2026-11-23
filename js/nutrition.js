/* SAVORIA — Valeurs nutritionnelles
   Pour 100 g : [kcal, protéines, glucides, lipides, fibres, poids d'une pièce en g, poids d'une c. à s. en g]
   Valeurs moyennes arrondies (ordre de grandeur des tables Ciqual / USDA), à titre indicatif.
   Les pâtes, le riz, la semoule, le quinoa et les lentilles sont comptés crus. */
window.S = window.S || {};
S.NUTRI = {
  sel: [0, 0, 0, 0, 0, 0, 18], poivre: [250, 10, 64, 3, 25, 0, 6], huile_olive: [900, 0, 0, 100, 0, 0, 13], huile: [900, 0, 0, 100, 0, 0, 13], eau: [0, 0, 0, 0, 0],
  oeuf: [140, 12.5, 0.7, 9.5, 0, 55], jaune_oeuf: [320, 16, 1, 27, 0, 18], beurre: [745, 0.7, 0.6, 82, 0, 0, 14], lait: [64, 3.3, 4.8, 3.6, 0],
  creme: [300, 2.2, 3, 30, 0, 0, 15], parmesan: [390, 33, 0, 28, 0, 0, 6], emmental: [380, 28, 0, 30, 0, 25, 7], feta: [265, 14, 1, 22, 0],
  mascarpone: [430, 5, 4, 44, 0], yaourt: [80, 4, 5, 4.5, 0, 125, 15],
  lardons: [300, 15, 0.5, 27, 0], jambon: [115, 20, 1, 3.5, 0, 40], poulet: [120, 23, 0, 2.5, 0, 150], poulet_entier: [190, 19, 0, 12, 0, 1100],
  boeuf: [170, 27, 0, 7, 0], boeuf_hache: [215, 19, 0, 15, 0], filet_boeuf: [160, 28, 0, 5, 0, 180], veau: [140, 22, 0, 6, 0],
  os_moelle: [300, 5, 0, 30, 0, 40], agneau: [230, 18, 0, 17, 0],
  saumon: [200, 20, 0, 13, 0, 130], saumon_cru: [200, 20, 0, 13, 0], cabillaud: [80, 18, 0, 0.7, 0, 150], crevettes: [85, 19, 0, 1, 0], sauce_poisson: [35, 5, 4, 0, 0, 0, 18],
  oignon: [40, 1.1, 9, 0.1, 1.7, 120], echalote: [72, 2.5, 17, 0.1, 3, 30], ail: [130, 6, 28, 0.5, 2, 5], carotte: [40, 0.9, 9, 0.2, 2.8, 100],
  poivron: [30, 1, 6, 0.3, 2, 150], tomate: [18, 0.9, 3.9, 0.2, 1.2, 120], tomate_cerise: [20, 0.9, 4, 0.2, 1.2], tomates_concassees: [25, 1.2, 4, 0.2, 1.3],
  courgette: [17, 1.2, 3, 0.3, 1, 250], aubergine: [25, 1, 6, 0.2, 3, 300], champignon: [22, 3, 3, 0.3, 1], pomme_de_terre: [77, 2, 17, 0.1, 2.2, 150],
  patate_douce: [86, 1.6, 20, 0.1, 3, 250], epinards: [23, 2.9, 3.6, 0.4, 2.2], concombre: [15, 0.7, 3, 0.1, 0.5, 300], avocat: [160, 2, 9, 15, 7, 150],
  laitue: [15, 1.4, 3, 0.2, 1.3, 300], poireau: [31, 1.5, 7, 0.3, 1.8, 150], navet: [28, 0.9, 6, 0.1, 1.8, 120], celeri: [16, 0.7, 3, 0.2, 1.6, 40],
  gingembre: [80, 1.8, 18, 0.8, 2, 0, 6], citron: [29, 1.1, 9, 0.3, 2.8, 100], citron_vert: [30, 0.7, 10, 0.2, 2.8, 60], citron_confit: [30, 1, 6, 0.3, 3, 60],
  olives: [145, 1, 4, 15, 3], mais: [85, 3, 16, 1.2, 2.5], germes_soja: [30, 3, 6, 0.2, 1.8], edamame: [120, 12, 9, 5, 5],
  spaghetti: [355, 12.5, 72, 1.5, 3], riz: [350, 7, 78, 0.6, 1.3], riz_arborio: [350, 7, 78, 0.6, 1.3], nouilles_riz: [360, 6, 80, 0.5, 1.6],
  quinoa: [368, 14, 64, 6, 7], lentilles_corail: [340, 24, 57, 1.5, 11], pois_chiches: [140, 7, 20, 2.5, 6], haricots_rouges: [125, 8, 17, 0.5, 6.5],
  farine: [360, 10, 75, 1, 3, 0, 10], pain: [260, 9, 50, 1.5, 3, 40], pain_mie: [270, 8, 48, 4, 3, 25], tortilla: [310, 8, 50, 8, 3, 40],
  pate_brisee: [420, 6, 45, 24, 2, 230], pate_feuilletee: [400, 6, 38, 25, 2, 230], biscuits_cuillere: [400, 8, 80, 4, 1, 6],
  flocons_avoine: [370, 13, 60, 7, 10, 0, 8], levure_boulanger: [325, 40, 41, 7.6, 27, 0, 8], levure_chimique: [100, 0, 25, 0, 0, 0, 5],
  sauce_soja: [60, 8, 6, 0, 0, 0, 16], moutarde: [150, 7, 5, 11, 3, 0, 15], mayonnaise: [700, 1.5, 1, 77, 0, 0, 14], tahini: [600, 17, 20, 54, 9, 0, 15],
  sesame: [570, 18, 23, 50, 12, 0, 9], cacahuetes: [590, 25, 16, 50, 8], lait_coco: [190, 2, 3, 19, 0],
  curry: [325, 13, 58, 14, 33, 0, 6], garam_masala: [380, 13, 45, 15, 30, 0, 6], cumin: [375, 18, 44, 22, 10, 0, 6], paprika: [282, 14, 54, 13, 35, 0, 6],
  curcuma: [312, 10, 67, 3, 22, 0, 6], piment: [280, 12, 50, 14, 35, 0, 6], muscade: [525, 6, 49, 36, 21, 0, 6], clou_girofle: [274, 6, 65, 13, 34, 0.1],
  bouquet_garni: [0, 0, 0, 0, 0, 10], herbes_provence: [270, 10, 50, 6, 40, 0, 3], thym: [100, 5, 24, 1.7, 14, 0, 3], romarin: [131, 3.3, 21, 6, 14, 0, 3],
  persil: [36, 3, 6, 0.8, 3.3, 0, 3], ciboulette: [30, 3, 4, 0.7, 2.5, 0, 3], aneth: [43, 3.5, 7, 1.1, 2, 0, 3], menthe: [70, 3.8, 15, 0.9, 8, 0, 3],
  coriandre: [23, 2, 4, 0.5, 2.8, 0, 3], basilic: [23, 3, 2.7, 0.6, 1.6, 0, 3],
  bouillon: [5, 0.5, 0.5, 0.2, 0], fond_veau: [15, 1, 2, 0.5, 0], vin_rouge: [25, 0, 2.6, 0, 0], vin_blanc: [20, 0, 2.6, 0, 0], cafe: [2, 0.1, 0, 0, 0],
  sucre: [400, 0, 100, 0, 0, 0, 12], cassonade: [380, 0, 98, 0, 0, 0, 12], miel: [320, 0.3, 80, 0, 0, 0, 21], sirop_erable: [260, 0, 67, 0, 0, 0, 20],
  chocolat: [550, 7, 35, 40, 10], pepites_chocolat: [520, 5, 57, 30, 6], cacao: [380, 20, 15, 22, 30, 0, 7], vanille: [0, 0, 0, 0, 0, 2],
  gelatine: [340, 85, 0, 0, 0, 2], agar: [0, 0, 0, 0, 0, 0, 5],
  pomme: [52, 0.3, 12, 0.2, 2.4, 150], banane: [90, 1.1, 21, 0.3, 2.6, 120], mangue: [60, 0.8, 14, 0.4, 1.6, 300], fruits_rouges: [45, 1, 8, 0.4, 5],
  boisson_avoine: [45, 1, 7, 1.5, 0.8], boisson_riz: [50, 0.3, 10, 1, 0], creme_vegetale: [170, 2.5, 4, 16, 0.5, 0, 15], margarine: [700, 0, 0, 79, 0, 0, 14],
  fecule: [360, 0.3, 88, 0.1, 1, 0, 8], farine_riz: [365, 6, 80, 1.4, 2.4, 0, 10], compote: [75, 0.3, 17, 0.1, 1.5, 0, 15], graines_lin: [530, 18, 29, 42, 27, 0, 10],
  levure_maltee: [360, 45, 35, 5, 20, 0, 5], tofu: [130, 14, 2, 8, 1], yaourt_vegetal: [90, 1, 7, 6, 0.5, 125], tamari: [65, 10, 6, 0, 0, 0, 16],
  ble_sans_gluten: [355, 7, 78, 1.5, 3], graines_tournesol: [585, 21, 20, 51, 9, 0, 9],
  poivre_grains: [250, 10, 64, 3, 25, 0, 6], cognac: [0, 0, 0, 0, 0], vodka: [0, 0, 0, 0, 0],
  pates: [355, 12.5, 72, 1.5, 3], pates_lasagne: [355, 12.5, 72, 1.5, 3, 17], nouilles_ramen: [370, 11, 70, 4, 3],
  pesto: [450, 5, 5, 45, 2, 0, 15], speculoos: [480, 5, 72, 19, 1.5, 8], creme_pistache: [570, 12, 35, 43, 5, 0, 20], kadaif: [350, 10, 72, 2, 3],
  fraises: [33, 0.7, 7.7, 0.3, 2], cerises: [63, 1, 16, 0.2, 2], cottage: [100, 11, 3.4, 4.3, 0], fromage_frais: [250, 6, 4, 24, 0, 0, 15],
  mozzarella: [250, 18, 1, 19, 0, 125], cheddar: [400, 25, 1.3, 33, 0, 20], reblochon: [330, 20, 0, 28, 0, 450], oignon_rouge: [40, 1.1, 9, 0.1, 1.7, 120],
  pain_burger: [270, 9, 48, 4.5, 2.5, 70], pain_brioche: [370, 8, 50, 15, 2, 35], cornichons: [15, 0.5, 2, 0.2, 1, 10], ketchup: [110, 1, 25, 0.1, 0.3, 0, 17],
  sriracha: [95, 2, 19, 1, 2, 0, 15], vinaigre_riz: [20, 0, 5, 0, 0, 0, 15], vinaigre: [20, 0, 0.5, 0, 0, 0, 15], huile_sesame: [900, 0, 0, 100, 0, 0, 13],
  nori: [190, 40, 30, 2, 30, 3], tomates_sechees: [220, 5, 23, 14, 6], concentre_tomate: [82, 4.3, 19, 0.5, 4, 0, 16],
  chorizo: [450, 24, 2, 38, 0], merguez: [290, 15, 1, 25, 0, 50], moules: [30, 4, 1.3, 0.8, 0], anchois: [210, 29, 0, 10, 0, 4], thon: [116, 26, 0, 1, 0],
  safran: [0, 0, 0, 0, 0], riz_rond: [350, 7, 78, 0.6, 1.3], petits_pois: [80, 5.4, 14, 0.4, 5], haricots_verts: [31, 1.8, 7, 0.1, 3.4],
  semoule: [360, 12, 73, 1.5, 4], ras_el_hanout: [300, 10, 50, 10, 30, 0, 6], courge: [26, 1, 6.5, 0.1, 0.5], pate_curry: [100, 2, 12, 5, 4, 0, 16],
  pate_pizza: [270, 7, 48, 5, 2, 260], pate_sablee: [460, 6, 58, 22, 2, 230], biscuits_sables: [460, 7, 73, 15, 2.5, 8],
  beurre_cacahuete: [600, 25, 16, 50, 8, 0, 16], graines_chia: [490, 17, 42, 31, 34, 0, 10], sucre_glace: [400, 0, 100, 0, 0, 0, 8],
  cannelle: [250, 4, 80, 1.2, 53, 0, 6], origan: [265, 9, 69, 4, 42, 0, 3], noix: [680, 15, 14, 65, 7], amandes: [600, 21, 22, 50, 12],
  poulet_cuisses: [200, 18, 0, 14, 0, 250], boeuf_joue: [150, 22, 0, 7, 0], saumon_fume: [180, 22, 0, 10, 0], piment_frais: [40, 2, 9, 0.4, 1.5, 10],
  brocoli: [34, 2.8, 4, 0.4, 2.6, 300], chapelure: [395, 13, 72, 5, 4.5, null, 8]
};

/* Convertit une quantité en grammes */
S.enGrammes = function (q, u, k) {
  if (q === null || q === undefined || q === "") return 0;
  var n = S.NUTRI[k] || [], piece = n[5] || 0, cs = n[6] || 15;
  switch (u) {
    case "g": return q; case "kg": return q * 1000; case "ml": return q; case "cl": return q * 10; case "L": return q * 1000;
    case "c. à s.": return q * cs; case "c. à c.": return q * cs / 3; case "pincée": return q * .4; case "brins": return q * 1;
    case "poignée": return q * 30; case "tranches": return q * (piece || 25); case "feuilles": return q * (piece || 10);
    default: return q * (piece || 100);
  }
};

var CRUS = ["riz", "riz_arborio", "riz_rond", "spaghetti", "pates", "quinoa", "semoule", "nouilles_riz", "lentilles_corail"];
/* Valeurs par portion : { kcal, p, g, l, f, partiel } */
S.nutrition = function (r) {
  if (r._n) return r._n;
  var t = [0, 0, 0, 0, 0], partiel = false;
  r.ing.forEach(function (i) {
    var k = i[2], n = S.NUTRI[k];
    if (!k || !n) { if (!(k && S.ING[k] && S.ING[k].base)) partiel = true; return; }
    var g = S.enGrammes(i[0], i[1], k) / 100;
    /* Féculents indiqués « cuits » : environ 2,6 fois moins caloriques que crus */
    if (CRUS.indexOf(k) >= 0 && /cuit/i.test(i[3] || "")) g = g / 2.6;
    for (var j = 0; j < 5; j++) t[j] += (n[j] || 0) * g;
  });
  var p = r.portions || 1;
  r._n = { kcal: Math.round(t[0] / p / 5) * 5, p: Math.round(t[1] / p), g: Math.round(t[2] / p), l: Math.round(t[3] / p), f: Math.round(t[4] / p), partiel: partiel };
  return r._n;
};
