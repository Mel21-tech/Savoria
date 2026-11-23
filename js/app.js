/* SAVORIA — Application : navigation, pages et interactions */
window.S = window.S || {};
(function () {
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  S.$ = $; S.$$ = $$;
  var esc = S.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var DIFF = { 1: "Facile", 2: "Intermédiaire", 3: "Confirmé" };
  var NIVEAUX = { debutant: "Débutant", intermediaire: "Intermédiaire", confirme: "Confirmé" };
  var NIV_MAX = { debutant: 1, intermediaire: 2, confirme: 3 };

  /* ---------- Utilitaires ---------- */
  S.toast = function (txt) {
    var t = $(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = txt; t.classList.add("visible"); clearTimeout(t._t);
    t._t = setTimeout(function () { t.classList.remove("visible"); }, 2600);
  };
  S.duree = function (m) {
    if (m < 60) return m + " min";
    var h = Math.floor(m / 60), r = m % 60; return h + " h" + (r ? " " + String(r).padStart(2, "0") : "");
  };
  function frac(v) {
    var e = Math.floor(v), d = v - e;
    var s = d >= .75 - 1e-9 ? "¾" : d >= .5 - 1e-9 ? "½" : d >= .25 - 1e-9 ? "¼" : "";
    if (d >= .875) { e++; s = ""; }
    return (e ? e : (s ? "" : "0")) + s;
  }
  /* Quantité ajustée au nombre de personnes */
  S.qte = function (q, u, f) {
    if (q === null || q === undefined || q === "") return u || "";
    var v = q * f;
    if (u === "g" || u === "ml") {
      if (v >= 1000) return String(Math.round(v / 100) / 10).replace(".", ",") + (u === "g" ? " kg" : " L");
      return (v >= 50 ? Math.round(v / 5) * 5 : Math.max(1, Math.round(v))) + " " + u;
    }
    if (u === "kg" || u === "L") { if (v < 1) return Math.round(v * 1000 / 10) * 10 + (u === "kg" ? " g" : " ml"); return String(Math.round(v * 10) / 10).replace(".", ",") + " " + u; }
    if (u === "cl") return Math.max(1, Math.round(v)) + " cl";
    if (u === "pincée" || u === "brins") { var n = Math.max(1, Math.round(v)); return n + " " + (u === "pincée" ? (n > 1 ? "pincées" : "pincée") : (n > 1 ? "brins" : "brin")); }
    if (u === "c. à s." || u === "c. à c.") return frac(Math.max(.25, Math.round(v * 2) / 2)) + " " + u;
    var p = Math.round(v * 2) / 2; if (p < .5) p = .5;
    return frac(p) + (u ? " " + u : "");
  };
  S.nomIng = function (i, f) {
    var ing = S.ING[i[2]];
    if (!ing || i[4]) return i[3] || (ing ? ing.n : "");
    var v = (i[0] || 0) * f;
    var nom = (i[1] === "" && v > 1 && ing.pl) ? ing.pl : ing.n;
    return nom;
  };
  var ICO_CAT = {
    rapides: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    classiques: '<path d="M3 17.5h18M5 17.5a7 7 0 0 1 14 0M12 8.5V6.5M10 6.5h4"/>',
    longues: '<path d="M7 3h10M7 21h10M8 3c0 5 8 6 8 9s-8 4-8 9M16 3c0 5-8 6-8 9s8 4 8 9"/>',
    healthy: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15zM5 19l8-8"/>',
    desserts: '<path d="M4 11h16l-2 9H6zM6 11a6 6 0 0 1 12 0M12 5V3"/>',
    monde: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18"/>'
  };
  S.iconeCat = function (k) { return '<svg class="icone-cat" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">' + (ICO_CAT[k] || ICO_CAT.classiques) + "</svg>"; };
  S.photoHTML = function (r, cat) {
    var src = r.photo || ("images/recettes/" + r.id + ".webp");
    var ic = S.iconeCat(cat || (r.cats && r.cats[0]));
    return '<div class="photo"><img src="' + esc(src) + '" alt="' + esc(r.titre) + '" loading="lazy" onerror="S.photoErr(this)">' +
      '<div class="repli"><div><div class="assiette">' + ic + '</div><small>Photo à venir</small></div></div></div>';
  };
  /* Essaie .webp, puis .jpg, puis .png, puis affiche le visuel de repli */
  S.photoErr = function (img) {
    var src = img.getAttribute("src") || "", ext = [".webp", ".jpg", ".png"];
    var i = ext.findIndex(function (e) { return src.slice(-e.length) === e; });
    if (src.indexOf("images/recettes/") === 0 && i >= 0 && i < ext.length - 1) { img.src = src.slice(0, -ext[i].length) + ext[i + 1]; return; }
    img.onerror = null; img.parentNode.classList.add("manquante");
  };
  var ICO = {
    coeur: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>',
    horloge: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    toque: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 14a4 4 0 1 1 1.5-7.7A5 5 0 0 1 16.5 6 4 4 0 1 1 18 14v5H6z"/><path d="M6 17h12"/></svg>',
    pers: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>',
    loupe: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    reglages: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
    alerte: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" style="flex:none;margin-top:1px"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/></svg>'
  };
  S.ICO = ICO;
  /* Pictogrammes des appareils (trait fin, couleur or) */
  S.ICONES_APP = {
    airfryer: '<svg viewBox="0 0 48 48"><rect x="11" y="6" width="26" height="36" rx="9"/><path d="M11 24h26"/><rect x="18" y="29" width="12" height="7" rx="2"/><circle cx="24" cy="15" r="3.5"/><path d="M24 11.5v-1M27.5 15h1M24 18.5v1M20.5 15h-1"/></svg>',
    microondes: '<svg viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="28" rx="4"/><rect x="9" y="15" width="24" height="18" rx="2"/><path d="M38 16v2M38 22v2M38 28v4"/><path d="M14 24c2-2 4 2 6 0s4 2 6 0"/></svg>',
    sanscuisson: '<svg viewBox="0 0 48 48"><path d="M6 24h36c0 9-8 15-18 15S6 33 6 24z"/><path d="M17 39l-1 4h16l-1-4"/><path d="M15 19c0-3 2-5 5-5M24 18c1-4 4-6 8-5M30 21c1-2 3-3 5-2"/></svg>',
    four: '<svg viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="4"/><path d="M6 15h36"/><circle cx="13" cy="10.5" r="1.5"/><circle cx="19" cy="10.5" r="1.5"/><rect x="12" y="21" width="24" height="15" rx="2"/><path d="M17 26h14"/></svg>'
  };

  function profil() { var d = S.store.donnees(); return d ? d.profil : null; }
  function estDans(liste, id) { var d = S.store.donnees(); return !!(d && d[liste].indexOf(id) >= 0); }

  /* Carte recette */
  S.carteHTML = function (r) {
    var p = profil(), c = p ? S.compat(r, p) : null;
    var al = r._a.contient.slice(0, 4).map(function (a) {
      var mine = p && p.allergies.indexOf(a) >= 0;
      return '<span class="pastille' + (mine ? " alerte" : "") + '">' + S.ALLERGENES[a] + "</span>";
    }).join("");
    var alerte = "";
    if (c && c.danger) alerte = '<div class="bandeau-alerte">' + ICO.alerte + "<span>Contient " + (c.allergenes.length ? "" : "peut-être ") + "un de tes allergènes : " + c.allergenes.concat(c.traces).map(function (a) { return S.ALLERGENES[a]; }).join(", ") + "</span></div>";
    else if (c && c.regime) alerte = '<div class="bandeau-alerte">' + ICO.alerte + "<span>Non compatible avec ton régime " + S.REGIMES[p.regime].n.toLowerCase() + "</span></div>";
    else if (c && c.ustManquants.length) alerte = '<div class="bandeau-info">Il te manque : ' + c.ustManquants.map(function (u) { return S.USTENSILES[u]; }).join(", ") + "</div>";
    var tend = r.tendance ? '<span class="badge-tendance">' + S.FLAMME + " Tendance</span>" : "";
    var priv = r.statut === "attente" ? '<span class="pastille or">En attente de validation</span>' : r.statut === "refusee" ? '<span class="pastille alerte">Non publiée</span>' : "";
    var nu = S.nutrition(r);
    var app = S.appareilsDe(r).filter(function (a) { return a !== "four"; }).map(function (a) { return '<span class="pastille app">' + S.APPAREILS[a].n + "</span>"; }).join("");
    return '<article class="carte revele">' +
      '<button class="coeur' + (estDans("favoris", r.id) ? " actif" : "") + '" data-fav="' + esc(r.id) + '" aria-label="Ajouter aux favoris">' + ICO.coeur + "</button>" +
      '<a href="#/recette/' + encodeURIComponent(r.id) + '" class="lien-photo">' + S.photoHTML(r) + tend + "</a>" +
      '<div class="corps"><a href="#/recette/' + encodeURIComponent(r.id) + '"><h3>' + esc(r.titre) + "</h3></a>" +
      '<div class="meta"><span>' + ICO.horloge + S.duree(r.temps) + "</span><span>" + ICO.toque + DIFF[r.diff] + "</span><span>" + ICO.pers + r.portions + " pers.</span><span>" + nu.kcal + " kcal</span></div>" +
      '<div class="pastilles">' + priv + app + al + "</div>" + alerte + "</div></article>";
  };

  /* ---------- Gabarit commun ---------- */
  function rendreHeader(route) {
    var u = S.store.utilisateur();
    var lien = function (h, t, r) { return '<a href="' + h + '" class="' + (route === r ? "actif" : "") + '">' + t + "</a>"; };
    $("#header").innerHTML = '<div class="wrap"><a href="#/" class="logo">SAVORIA</a>' +
      '<nav class="nav" id="nav">' + lien("#/", "Accueil", "accueil") + lien("#/recettes", "Recettes", "recettes") + lien("#/creer", "Créer", "creer") + lien("#/espace", "Mon espace", "espace") +
      (u ? '<a href="#/" class="nav-mobile" id="deco-mobile">Déconnexion</a>' : '<a href="#/connexion" class="nav-mobile">Connexion</a>') + "</nav>" +
      '<div class="header-compte"><form class="recherche-entete" id="rech-entete" role="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input placeholder="Rechercher une recette…" aria-label="Rechercher une recette"></form>' +
      '<a class="btn-loupe" href="#/recettes" aria-label="Rechercher"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></a>' +
      (u ? '<a class="avatar-entete" href="#/espace" title="Mon espace">' + esc(u.nom.charAt(0).toUpperCase()) + '</a><button class="btn petit discret" id="btn-deco">Déconnexion</button>'
        : '<a class="btn petit" href="#/connexion">Connexion</a>') +
      '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button></div></div>';
    $("#burger").onclick = function () { $("#nav").classList.toggle("ouvert"); };
    $("#rech-entete").onsubmit = function (e) { e.preventDefault(); etatCat.q = $("input", e.target).value.trim(); etatCat.cat = ""; etatCat.n = 12; go("#/recettes"); };
    var dm = $("#deco-mobile"); if (dm) dm.onclick = function (e) { e.preventDefault(); $("#btn-deco").click(); };
    var d = $("#btn-deco"); if (d) d.onclick = function () { S.store.deconnexion(); S.toast("À bientôt !"); S.assistant && S.assistant.rafraichir(); go("#/"); };
  }
  function pied() {
    return '<footer class="pied-site"><div class="wrap"><div><div class="logo">SAVORIA</div><p class="muted" style="margin:.6rem 0 0;font-size:.85rem">La cuisine qui s\'adapte à vous.</p></div>' +
      '<nav><a href="#/recettes">Recettes</a><a href="#/creer">Créer une recette</a><a href="#/espace">Mon espace</a><a href="#/mentions">Mentions légales</a><a href="#/confidentialite">Confidentialité</a></nav>' +
      '<p class="avert">Les informations sur les allergènes sont données à titre indicatif. Les produits du commerce peuvent contenir des traces d\'allergènes : vérifie toujours les étiquettes. En cas d\'allergie sévère, demande l\'avis d\'un professionnel de santé.</p></div></footer>';
  }
  function go(h) { if (location.hash === h) router(); else location.hash = h; }
  S.go = go;

  /* ---------- Pages ---------- */
  var pages = {};

  function rangee(sur, titre, lienTxt, lien, liste) {
    if (!liste.length) return "";
    return '<section class="section" style="padding-top:0"><div class="wrap"><div class="tete-rangee revele"><div><span class="sur-titre">' + sur + '</span><h2>' + titre + '</h2></div><a class="btn" href="' + lien + '">' + lienTxt + "</a></div>" +
      '<div class="rangee-tendances">' + liste.slice(0, 10).map(S.carteHTML).join("") + "</div></div></section>";
  }
  pages.accueil = function () {
    var tout = S.store.publiques(), pub = S.selonMode(tout), u = S.store.utilisateur(), mode = S.modeAppareil();
    var cats = Object.keys(S.CATEGORIES).map(function (k) {
      var liste = pub.filter(function (r) { return r.cats.indexOf(k) >= 0; });
      if (!liste.length) return "";
      var rep = liste.find(function (r) { return r.id === S.CATEGORIES[k].visuel; }) || liste.find(function (r) { return r.vedette; }) || liste[0];
      return '<a class="cat-carte revele" href="#/recettes?cat=' + k + '"><div class="visuel">' + S.photoHTML(Object.assign({}, rep, { titre: S.CATEGORIES[k].court }), k).replace('class="photo"', 'class="photo" style="height:100%"') + "</div>" +
        '<div class="contenu"><span class="nb">' + liste.length + " recettes</span><h3>" + S.CATEGORIES[k].court + "</h3><p>" + S.CATEGORIES[k].d + "</p></div></a>";
    }).join("");
    var apps = Object.keys(S.APPAREILS).map(function (k) {
      var n = tout.filter(function (r) { return S.appareilsDe(r).indexOf(k) >= 0; }).length;
      return '<a class="app-carte revele' + (mode === k ? " mode" : "") + '" href="#/recettes?appareil=' + k + '"><span class="app-ico">' + S.ICONES_APP[k] + "</span><span class=\"app-txt\"><strong>" + S.APPAREILS[k].n + "</strong><small>" + (mode === k ? "Ton mode actuel · " : "") + n + " recettes</small></span></a>";
    }).join("");
    var saison = pub.filter(function (r) { return S.deSaison(r) && !r.tendance; });
    var modeTxt = mode ? '<p class="muted centre" style="margin:-1rem 0 2rem;font-size:.88rem">Mode ' + S.APPAREILS[mode].n.toLowerCase() + ' activé : seules ces recettes sont affichées. <a class="lien-or" href="#/espace?t=profil">Modifier</a></p>' : "";
    return '<section class="hero" id="hero"><div class="hero-scene"><div class="hero-halo"></div>' +
      '<div class="hero-grille wrap"><div class="hero-copy" id="hero-copy"><span class="sur-titre">Cuisinez · Explorez · Savourez</span>' +
      "<h1>L'art de cuisiner, <em>à votre image</em></h1>" +
      '<p class="lead">Des recettes premium qui s\'adaptent à vos allergies, à vos appareils et au temps dont vous disposez.</p>' +
      '<div class="hero-ctas"><a class="btn plein" href="#/recettes">Explorer les recettes</a>' + (u ? '<a class="btn discret" href="#/espace">Mon espace</a>' : '<a class="btn discret" href="#/connexion?mode=inscription">Créer mon profil</a>') + "</div>" +
      '<div class="hero-indice"><span class="souris"></span>Faites défiler</div></div>' +
      '<div class="hero-plat-zone" id="plat-zone"><div class="plat-persp"><div class="orbite"></div><div class="orbite b"></div>' +
      '<div class="plat" id="plat"><div class="plat-epaisseur"></div><div class="plat-photo" role="img" aria-label="Plat signature SAVORIA : filet de bœuf, purée et jus réduit"></div><div class="plat-reflet"></div></div><div class="plat-ombre"></div></div></div></div>' +
      '<div class="hero-phrases"><div class="hero-phrase" data-i="0">Des recettes pensées pour vous.</div><div class="hero-phrase" data-i="1">Vos allergies, vos appareils, votre temps.</div><div class="hero-phrase" data-i="2">Il ne reste plus qu\'à cuisiner.</div></div>' +
      '<div class="hero-progress"><i></i></div></div></section>' +
      '<section class="section rdj-section"><div class="wrap"><div id="rdj"></div></div></section>' +
      '<section class="section" id="categories" style="padding-top:0"><div class="wrap"><div class="centre revele"><span class="sur-titre">Explorer</span><h2>Que voulez-vous cuisiner ?</h2><hr class="filet centre"></div>' + modeTxt +
      '<div class="raccourcis-types revele">' + Object.keys(S.TYPES).map(function (k) { return '<a class="type-onglet" href="#/recettes?type=' + k + '">' + S.TYPES[k] + "</a>"; }).join("") + '</div><div class="grille-cats">' + cats + "</div></div></section>" +
      '<section class="section" style="padding-top:0"><div class="wrap"><div class="tete-rangee revele"><div><span class="sur-titre">Votre cuisine</span><h2>Selon votre appareil</h2></div>' + (u ? '<a class="btn" href="#/espace?t=profil">' + (mode ? "Changer de mode" : "Choisir mon appareil") + "</a>" : "") + '</div><div class="grille-apps">' + apps + "</div></div></section>" +
      rangee(S.FLAMME + " Vu sur TikTok", "Les tendances du moment", "Toutes les tendances", "#/recettes?tendance=1", pub.filter(function (r) { return r.tendance; })) +
      rangee(S.FEUILLE + " En ce moment", "Les recettes " + S.nomSaison(), "Toutes les recettes de saison", "#/recettes?saison=1", saison) + pied();
  };
  /* Plat signature : rotation continue + rotation au scroll + inclinaison à la souris */
  pages.accueil.apres = function () {
    var hero = $("#hero"), plat = $("#plat"), zone = $("#plat-zone"), copie = $("#hero-copy"), halo = $(".hero-halo");
    var barre = $(".hero-progress i"), phrases = $$(".hero-phrase");
    var tactile = matchMedia("(pointer: coarse)").matches, reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var img = new Image(); img.onerror = function () { hero.classList.add("sans-photo"); }; img.src = "images/plat-signature.jpg";
    var souris = { x: 0, y: 0, cx: 0, cy: 0 }, pCible = 0, p = 0, spin = 0, dernier = performance.now(), base = null;
    function mesurer() {
      zone.style.transform = "none";
      var r = zone.getBoundingClientRect(), mobile = innerWidth <= 860;
      base = { dx: innerWidth / 2 - (r.left + r.width / 2), dy: mobile ? (innerHeight / 2 - (r.top + r.height / 2)) : 0, mobile: mobile };
    }
    function surScroll() {
      var r = hero.getBoundingClientRect(), total = r.height - innerHeight;
      pCible = Math.min(1, Math.max(0, -r.top / total));
      barre.style.height = (pCible * 100) + "%";
      var idx = pCible < .3 ? -1 : pCible < .52 ? 0 : pCible < .74 ? 1 : pCible < .95 ? 2 : -1;
      phrases.forEach(function (el, i) { el.classList.toggle("visible", i === idx); });
    }
    function surSouris(e) { souris.x = e.clientX / innerWidth * 2 - 1; souris.y = e.clientY / innerHeight * 2 - 1; }
    function lisse(t) { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); }
    function boucle(t) {
      if (!hero.isConnected) { removeEventListener("scroll", surScroll); removeEventListener("pointermove", surSouris); removeEventListener("resize", mesurer); return; }
      requestAnimationFrame(boucle);
      var dt = Math.min(.05, (t - dernier) / 1000); dernier = t;
      if (hero.getBoundingClientRect().bottom < 0) return;
      p += (pCible - p) * Math.min(1, dt * 7);
      souris.cx += (souris.x - souris.cx) * dt * 3; souris.cy += (souris.y - souris.cy) * dt * 3;
      if (!reduit) spin += dt * 9;
      var entree = lisse(p / .32), fin = lisse((p - .9) / .1);
      var tilt = 54 - entree * 22 + souris.cy * 7, ry = souris.cx * 9;
      plat.style.setProperty("--tilt", tilt.toFixed(2) + "deg");
      plat.style.setProperty("--ry", ry.toFixed(2) + "deg");
      plat.style.setProperty("--spin", (spin + p * 300).toFixed(2) + "deg");
      var s = 1 + entree * (base.mobile ? .08 : .14) + fin * .15;
      zone.style.transform = "translate3d(" + (base.dx * entree).toFixed(1) + "px," + (base.dy * entree).toFixed(1) + "px,0) scale(" + s.toFixed(3) + ")";
      zone.style.opacity = 1 - fin;
      copie.style.opacity = 1 - lisse(p / .2);
      copie.style.transform = "translateY(" + (-30 * lisse(p / .2)) + "px)";
      halo.style.opacity = 1 - fin;
    }
    S.recetteDuJour(function (r) {
      var z = $("#rdj"); if (!z) return;
      var j = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      z.innerHTML = '<a class="rdj revele" href="#/recette/' + encodeURIComponent(r.id) + '"><div class="rdj-photo">' + S.photoHTML(r) + '</div><div class="rdj-texte"><span class="sur-titre">La recette du jour · ' + j + "</span><h2>" + esc(r.titre) + '</h2><p class="muted">' + esc(r.accroche || "") + '</p><div class="meta"><span>' + ICO.horloge + S.duree(r.temps) + "</span><span>" + ICO.toque + DIFF[r.diff] + "</span><span>" + ICO.pers + r.portions + ' pers.</span></div><span class="btn plein" style="margin-top:1.6rem;align-self:flex-start">Découvrir la recette</span></div></a>';
      reveler();
    });
    mesurer(); surScroll();
    addEventListener("scroll", surScroll, { passive: true }); addEventListener("resize", mesurer);
    if (!tactile) addEventListener("pointermove", surSouris, { passive: true });
    requestAnimationFrame(boucle);
  };

  /* --- Catalogue --- */
  var etatCat = { q: "", cat: "", type: "", appareil: "", ignorerMode: false, tendance: false, saison: false, temps: "", diff: "", profil: false, ust: false, tri: "pertinence", n: 12 };
  S.etatCat = etatCat;
  var FLAMME = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 22c4.4 0 7-3 7-7 0-4.5-4-6.5-4.5-11-2.5 1.8-4 4.4-4 7-1.2-.8-2-2.2-2.2-3.6C6.200 9.300 5 11.800 5 15c0 4 2.600 7 7 7z"/></svg>';
  S.FLAMME = FLAMME;
  S.FEUILLE = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15zM5 19l8-8"/></svg>';
  function titreCatalogue() {
    if (etatCat.saison) return ["Recettes " + S.nomSaison(), "Les produits du moment, au meilleur de leur goût."];
    if (etatCat.tendance) return ["Tendances TikTok", "Les recettes virales du moment, testées et remises au propre."];
    if (etatCat.appareil) return [S.APPAREILS[etatCat.appareil].n, etatCat.appareil === "sanscuisson" ? "Des recettes à préparer sans rien allumer." : "Toutes les recettes à préparer " + (etatCat.appareil === "airfryer" ? "à l'air fryer." : "au " + S.APPAREILS[etatCat.appareil].n.toLowerCase() + ".")];
    if (etatCat.cat) return [S.CATEGORIES[etatCat.cat].n, S.CATEGORIES[etatCat.cat].d];
    if (etatCat.type) return [S.TYPES[etatCat.type], "Cherchez par nom, ingrédient ou envie."];
    return ["Toutes les recettes", "Cherchez par nom, ingrédient ou envie."];
  }
  pages.recettes = function (params) {
    if (["cat", "type", "tendance", "saison", "appareil"].some(function (k) { return params[k] !== undefined; })) {
      etatCat.cat = params.cat || ""; etatCat.type = params.type || ""; etatCat.tendance = params.tendance === "1"; etatCat.saison = params.saison === "1"; etatCat.appareil = params.appareil || "";
    }
    etatCat.n = 12;
    var t = titreCatalogue(), types = [["", "Tout"]].concat(Object.keys(S.TYPES).map(function (k) { return [k, S.TYPES[k]]; }));
    return '<div class="page"><div class="wrap"><div class="entete-page"><span class="sur-titre">Le carnet</span><h1 id="titre-cat">' + t[0] + '</h1><p class="muted" id="desc-cat">' + t[1] + "</p></div>" +
      '<div class="cat-barre"><label class="cat-recherche">' + ICO.loupe + '<input id="f-q" type="search" placeholder="Une recette, un ingrédient…" value="' + esc(etatCat.q) + '" autocomplete="off"></label>' +
      '<button class="btn-filtres" id="ouvrir-filtres" type="button">' + ICO.reglages + '<span>Filtres</span><span class="nb-filtres" id="nb-filtres"></span></button></div>' +
      '<div class="types" id="f-types">' + types.map(function (x) { return '<button class="type-onglet' + (etatCat.type === x[0] ? " actif" : "") + '" data-type="' + x[0] + '">' + x[1] + "</button>"; }).join("") + "</div>" +
      '<div id="bandeau-mode"></div>' +
      '<div class="cat-etat"><div class="actifs" id="actifs"></div><span class="compteur" id="compteur"></span>' +
      '<select class="champ tri" id="f-tri" aria-label="Trier">' + [["pertinence", "Pertinence"], ["rapide", "Plus rapides"], ["facile", "Plus faciles"], ["leger", "Plus légères"], ["az", "De A à Z"]].map(function (o) { return '<option value="' + o[0] + '"' + (etatCat.tri === o[0] ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select></div>" +
      '<div class="grille-recettes" id="grille"></div><div class="centre" style="margin-top:2.6rem"><button class="btn discret" id="plus">Voir plus de recettes</button></div></div></div>' +
      '<div class="panneau-voile" id="voile-filtres"></div><aside class="panneau" id="panneau-filtres" aria-label="Filtres" aria-hidden="true"><div class="panneau-tete"><h3>Filtres</h3><button class="fermer-x" id="fermer-filtres" aria-label="Fermer">×</button></div><div class="panneau-corps" id="corps-filtres"></div>' +
      '<div class="panneau-pied"><button class="btn discret" id="effacer-filtres">Tout effacer</button><button class="btn plein" id="valider-filtres">Voir les recettes</button></div></aside>' + pied();
  };
  /* Groupes du panneau de filtres : [clé, titre, options [valeur, libellé], connecté seulement] */
  function groupesFiltres() {
    var g = [
      ["appareil", "Appareil", Object.keys(S.APPAREILS).map(function (k) { return [k, S.APPAREILS[k].n]; })],
      ["cat", "Catégorie", Object.keys(S.CATEGORIES).map(function (k) { return [k, S.CATEGORIES[k].court]; })],
      ["temps", "Temps total", [["15", "15 min max"], ["30", "30 min max"], ["60", "1 h max"], ["9999", "Plus d'1 h"]]],
      ["diff", "Difficulté", [["1", "Facile"], ["2", "Intermédiaire"], ["3", "Confirmé"]]],
      ["envies", "Envies", [["tendance", "Tendances TikTok"], ["saison", "De saison"]]]
    ];
    if (S.store.utilisateur()) g.push(["moi", "Pour moi", [["profil", "Compatible avec mon profil"], ["ust", "Avec mes ustensiles"]]]);
    return g;
  }
  var BOOL = { tendance: 1, saison: 1, profil: 1, ust: 1 };
  function estActif(cle, v) { return cle === "envies" || cle === "moi" ? !!etatCat[v] : String(etatCat[cle]) === v; }
  function libelleFiltre(cle, v) {
    var g = groupesFiltres().find(function (x) { return x[0] === cle; }), o = g && g[2].find(function (x) { return x[0] === v; });
    return o ? o[1] : v;
  }
  function filtresActifs() {
    var l = [];
    ["appareil", "cat", "temps", "diff"].forEach(function (k) { if (etatCat[k]) l.push([k, String(etatCat[k])]); });
    ["tendance", "saison"].forEach(function (k) { if (etatCat[k]) l.push(["envies", k]); });
    ["profil", "ust"].forEach(function (k) { if (etatCat[k]) l.push(["moi", k]); });
    return l;
  }
  function filtrer() {
    var p = profil(), q = S.norm(etatCat.q), mode = !etatCat.appareil && !etatCat.ignorerMode ? S.modeAppareil() : "";
    var l = S.store.pourMoi().filter(function (r) {
      if (etatCat.cat && r.cats.indexOf(etatCat.cat) < 0) return false;
      if (etatCat.type && r.type !== etatCat.type) return false;
      if (etatCat.appareil && S.appareilsDe(r).indexOf(etatCat.appareil) < 0) return false;
      if (mode && S.appareilsDe(r).indexOf(mode) < 0) return false;
      if (etatCat.tendance && !r.tendance) return false;
      if (etatCat.saison && !S.deSaison(r)) return false;
      if (etatCat.temps) { var t = +etatCat.temps; if (t === 9999 ? r.temps <= 60 : r.temps > t) return false; }
      if (etatCat.diff && r.diff !== +etatCat.diff) return false;
      if (q) {
        var txt = S.norm(r.titre + " " + (S.TYPES[r.type] || "") + " " + S.appareilsDe(r).map(function (a) { return S.APPAREILS[a].n; }).join(" ") + " " + r.ing.map(function (i) { return S.nomIng(i, 1); }).join(" "));
        if (!q.split(" ").every(function (m) { return txt.indexOf(m) >= 0; })) return false;
      }
      if (p && (etatCat.profil || etatCat.ust)) {
        var c = S.compat(r, p);
        if (etatCat.profil && !c.ok) return false;
        if (etatCat.ust && c.ustManquants.length) return false;
      }
      return true;
    });
    var tri = etatCat.tri;
    l.sort(function (a, b) {
      if (tri === "rapide") return a.temps - b.temps;
      if (tri === "facile") return a.diff - b.diff || a.temps - b.temps;
      if (tri === "leger") return S.nutrition(a).kcal - S.nutrition(b).kcal;
      if (tri === "az") return a.titre.localeCompare(b.titre, "fr");
      if (p) { var d = score(b, p) - score(a, p); if (d) return d; }
      return ((b.vedette ? 2 : 0) + (b.tendance ? 1 : 0)) - ((a.vedette ? 2 : 0) + (a.tendance ? 1 : 0));
    });
    return l;
  }
  function score(r, p) {
    var c = S.compat(r, p), s = 0;
    if (c.ok) s += 10; if (c.danger) s -= 20; if (c.regime) s -= 10;
    s -= c.ustManquants.length * 2;
    if (r.temps <= (p.temps || 45)) s += 3;
    if (r.diff <= (NIV_MAX[p.niveau] || 2)) s += 2;
    return s;
  }
  pages.recettes.apres = function () {
    var panneau = $("#panneau-filtres"), voile = $("#voile-filtres");
    function majUrl() {
      var q = []; ["cat", "type", "appareil"].forEach(function (k) { if (etatCat[k]) q.push(k + "=" + etatCat[k]); }); if (etatCat.tendance) q.push("tendance=1"); if (etatCat.saison) q.push("saison=1");
      history.replaceState(null, "", "#/recettes" + (q.length ? "?" + q.join("&") : ""));
      var t = titreCatalogue(); $("#titre-cat").textContent = t[0]; $("#desc-cat").textContent = t[1];
    }
    function corps() {
      $("#corps-filtres").innerHTML = groupesFiltres().map(function (g) {
        return '<div class="groupe-filtre"><span class="lib">' + g[1] + '</span><div class="puces">' + g[2].map(function (o) { return '<button type="button" class="puce' + (estActif(g[0], o[0]) ? " actif" : "") + '" data-g="' + g[0] + '" data-v="' + o[0] + '">' + o[1] + "</button>"; }).join("") + "</div></div>";
      }).join("");
      $$("#corps-filtres [data-g]").forEach(function (b) { b.onclick = function () { basculer(b.dataset.g, b.dataset.v); }; });
    }
    function basculer(g, v) {
      if (g === "envies" || g === "moi") etatCat[v] = !etatCat[v];
      else etatCat[g] = String(etatCat[g]) === v ? "" : v;
      etatCat.n = 12; majUrl(); rendre(); if (panneau.classList.contains("ouvert")) corps();
    }
    function rendre() {
      var l = filtrer(), act = filtresActifs(), mode = S.modeAppareil();
      $("#compteur").textContent = l.length + " recette" + (l.length > 1 ? "s" : "");
      $("#valider-filtres").textContent = "Voir " + l.length + " recette" + (l.length > 1 ? "s" : "");
      $("#nb-filtres").textContent = act.length || ""; $("#ouvrir-filtres").classList.toggle("actif", act.length > 0);
      $("#actifs").innerHTML = act.map(function (a) { return '<button class="tag" data-g="' + a[0] + '" data-v="' + a[1] + '">' + esc(libelleFiltre(a[0], a[1])) + '<span aria-hidden="true">×</span></button>'; }).join("") +
        (act.length > 1 ? '<button class="lien-or effacer" id="tout-effacer">Tout effacer</button>' : "");
      $$("#actifs [data-g]").forEach(function (b) { b.onclick = function () { basculer(b.dataset.g, b.dataset.v); }; });
      var te = $("#tout-effacer"); if (te) te.onclick = effacer;
      var bm = $("#bandeau-mode");
      bm.innerHTML = mode && !etatCat.appareil ? '<div class="bandeau-mode">' + (etatCat.ignorerMode
        ? "<span>Toutes les recettes sont affichées.</span><button class=\"lien-or\" id=\"bascule-mode\">Revenir au mode " + S.APPAREILS[mode].n.toLowerCase() + "</button>"
        : "<span><strong>Mode " + S.APPAREILS[mode].n.toLowerCase() + "</strong> : seules les recettes " + (mode === "sanscuisson" ? "sans cuisson" : "faites " + (mode === "airfryer" ? "à l'air fryer" : "au " + S.APPAREILS[mode].n.toLowerCase())) + " sont affichées.</span><button class=\"lien-or\" id=\"bascule-mode\">Tout afficher</button>") + "</div>" : "";
      var bb = $("#bascule-mode"); if (bb) bb.onclick = function () { etatCat.ignorerMode = !etatCat.ignorerMode; etatCat.n = 12; rendre(); };
      $("#grille").innerHTML = l.length ? l.slice(0, etatCat.n).map(S.carteHTML).join("") : '<div class="vide" style="grid-column:1/-1">Aucune recette ne correspond.' + (act.length ? '<br><br><button class="btn petit" id="vide-effacer">Effacer les filtres</button>' : "") + "</div>";
      var ve = $("#vide-effacer"); if (ve) ve.onclick = effacer;
      $("#plus").style.display = l.length > etatCat.n ? "" : "none";
      reveler(); brancherCoeurs();
    }
    function effacer() { ["appareil", "cat", "temps", "diff"].forEach(function (k) { etatCat[k] = ""; }); Object.keys(BOOL).forEach(function (k) { etatCat[k] = false; }); etatCat.n = 12; majUrl(); rendre(); if (panneau.classList.contains("ouvert")) corps(); }
    function ouvrir() { corps(); panneau.classList.add("ouvert"); voile.classList.add("ouvert"); panneau.setAttribute("aria-hidden", "false"); document.body.classList.add("sans-scroll"); }
    function fermer() { panneau.classList.remove("ouvert"); voile.classList.remove("ouvert"); panneau.setAttribute("aria-hidden", "true"); document.body.classList.remove("sans-scroll"); }
    $("#ouvrir-filtres").onclick = ouvrir; $("#fermer-filtres").onclick = fermer; voile.onclick = fermer; $("#valider-filtres").onclick = fermer; $("#effacer-filtres").onclick = effacer;
    var tq; $("#f-q").oninput = function (e) { clearTimeout(tq); tq = setTimeout(function () { etatCat.q = e.target.value; etatCat.n = 12; rendre(); }, 200); };
    $("#f-tri").onchange = function (e) { etatCat.tri = e.target.value; rendre(); };
    $$("#f-types [data-type]").forEach(function (b) {
      b.onclick = function () { etatCat.type = b.dataset.type; etatCat.n = 12; $$("#f-types [data-type]").forEach(function (x) { x.classList.toggle("actif", x === b); }); majUrl(); rendre(); };
    });
    $("#plus").onclick = function () { etatCat.n += 12; rendre(); };
    rendre();
  };

  /* --- Fiche recette --- */
  var portionsCourantes = {};
  pages.recette = function (params, id) {
    var r = S.store.recette(id);
    if (!r) return '<div class="page"><div class="wrap vide"><h2>Recette introuvable</h2><p><a class="lien-or" href="#/recettes">Retour aux recettes</a></p></div></div>';
    var p = profil(), c = p ? S.compat(r, p) : null;
    var n = portionsCourantes[id] || (p && p.personnes) || r.portions;
    var alertes = "";
    if (c) {
      if (c.allergenes.length) alertes += '<div class="bandeau-alerte">' + ICO.alerte + "<span><strong>Attention :</strong> cette recette contient " + c.allergenes.map(function (a) { return S.ALLERGENES[a]; }).join(", ") + ", indiqué dans tes allergies.</span></div>";
      if (c.traces.length) alertes += '<div class="bandeau-alerte">' + ICO.alerte + "<span>Certains ingrédients peuvent contenir des traces de " + c.traces.map(function (a) { return S.ALLERGENES[a]; }).join(", ") + ". Vérifie les étiquettes.</span></div>";
      if (c.regime) alertes += '<div class="bandeau-alerte">' + ICO.alerte + "<span>Cette recette n'est pas compatible avec ton régime " + S.REGIMES[p.regime].n.toLowerCase() + ".</span></div>";
      if (c.refuses.length) alertes += '<div class="bandeau-info">Contient un aliment que tu n\'aimes pas : ' + c.refuses.map(function (k) { return S.ING[k].n; }).join(", ") + "</div>";
      if (c.inconnus) alertes += '<div class="bandeau-alerte">' + ICO.alerte + "<span>Allergènes non vérifiés pour : " + r._inconnus.map(esc).join(", ") + ".</span></div>";
    }
    var IC = {
      favoris: '<path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/>',
      aessayer: '<path d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8z"/>',
      realisees: '<circle cx="12" cy="12" r="8.5"/><path d="m8.3 12.2 2.6 2.6 4.8-5.4"/>',
      coll: '<path d="M3.5 6.5h6l2 2h9v10.5h-17z"/><path d="M12 11.5v5M9.5 14h5"/>',
      partager: '<path d="M4.5 12.5v7h15v-7M12 3.5v11.5M8 7.5l4-4 4 4"/>'
    };
    var ico = function (k, lib, attr, actif) { return '<button class="act-ico' + (actif ? " actif" : "") + '" ' + attr + ' aria-label="' + lib + '" data-lib="' + lib + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + IC[k] + "</svg></button>"; };
    var btn = function (liste, txt) { var a = estDans(liste, r.id); return ico(liste, a ? txt + " ✓" : txt, 'data-liste="' + liste + '"', a); };
    var tf = r._a.transformes.length, nu = S.nutrition(r);
    var moi = S.store.utilisateur(), crea = r.source === "membre" && moi ? S.store.mesCreations().find(function (x) { return x.id === r.id; }) : null;
    var monAuteur = !!crea;
    var etatProposition = !crea ? "" : crea.statut === "attente" ? '<div class="bandeau-info" style="margin-top:1.4rem;max-width:760px">Ta recette est en attente de validation. Elle sera visible par tous dès qu\'elle aura été relue.</div>'
      : crea.statut === "refusee" ? '<div class="bandeau-alerte" style="margin-top:1.4rem;max-width:760px">' + ICO.alerte + "<span>Ta recette n'a pas été publiée" + (crea.motif ? " : " + esc(crea.motif) : ".") + " Tu peux la modifier et la proposer à nouveau.</span></div>" : "";
    var tot = nu.p * 4 + nu.g * 4 + nu.l * 9 || 1;
    var blocNutri = '<div class="bloc nutri"><label class="lib">Valeurs nutritionnelles · par portion</label>' +
      '<div class="nutri-kcal"><strong>' + nu.kcal + "</strong><span>kcal</span></div>" +
      '<div class="nutri-barre"><i style="width:' + (nu.p * 400 / tot) + '%" class="np"></i><i style="width:' + (nu.g * 400 / tot) + '%" class="ng"></i><i style="width:' + (nu.l * 900 / tot) + '%" class="nl"></i></div>' +
      '<div class="nutri-grille"><div><span class="pt np"></span>Protéines<strong>' + nu.p + ' g</strong></div><div><span class="pt ng"></span>Glucides<strong>' + nu.g + ' g</strong></div><div><span class="pt nl"></span>Lipides<strong>' + nu.l + " g</strong></div><div><span class=\"pt nf\"></span>Fibres<strong>" + nu.f + " g</strong></div></div>" +
      '<p class="muted" style="font-size:.72rem;margin:.9rem 0 0">Estimation calculée à partir des ingrédients' + (nu.partiel ? ", certains ingrédients non pris en compte" : "") + ". À titre indicatif.</p></div>";
    return '<section class="fiche-hero">' + S.photoHTML(r) + '<div class="contenu wrap"><span class="sur-titre">' + (r.tendance ? "Tendance TikTok · " : "") + (S.TYPES[r.type] ? S.TYPES[r.type] + " · " : "") + r.cats.map(function (k) { return S.CATEGORIES[k] ? S.CATEGORIES[k].court : k; }).join(" · ") + "</span><h1>" + esc(r.titre) + "</h1>" +
      (r.accroche ? '<p class="muted" style="max-width:640px;font-size:1.05rem">' + esc(r.accroche) + "</p>" : "") +
      (r.auteurNom ? '<p class="auteur-recette">Proposée par <strong>' + esc(r.auteurNom) + "</strong></p>" : "") +
      '<div class="fiche-infos"><div><small>Temps total</small><strong>' + S.duree(r.temps) + "</strong></div><div><small>Préparation</small><strong>" + S.duree(r.prep || r.temps) + "</strong></div><div><small>Difficulté</small><strong>" + DIFF[r.diff] + "</strong></div><div><small>Base</small><strong>" + r.portions + " pers.</strong></div></div></div></section>" +
      '<div class="wrap"><div class="fiche-actions"><button class="btn plein" id="btn-cuisine">Mode cuisine</button><button class="btn discret" id="btn-courses"><span class="lg">Ajouter aux </span>courses</button><button class="btn discret" id="btn-planifier">Planifier</button>' +
      '<div class="actions-icones">' + btn("favoris", "Favori") + btn("aessayer", "À essayer") + btn("realisees", "Déjà réalisée") + ico("coll", "Ajouter à une collection", 'id="btn-coll"') + ico("partager", "Partager", 'id="btn-partager"') + "</div>" +
      (monAuteur ? '<a class="lien-or lien-modif" href="#/creer?edit=' + encodeURIComponent(r.id) + '">Modifier ma recette</a>' : "") +
      (S.store.estAdmin() ? '<a class="lien-or lien-modif" href="#/' + S.CONFIG.routeAdmin + '?vue=recettes&edit=' + encodeURIComponent(r.id) + '">Modifier (admin)</a>' : "") + "</div>" +
      etatProposition +
      (alertes ? '<div style="display:flex;flex-direction:column;gap:.6rem;margin-top:1.4rem;max-width:760px">' + alertes + "</div>" : "") +
      '<div class="fiche-corps"><aside><div class="bloc"><div class="portions"><div><label class="lib" style="margin:0">Portions</label></div><div class="ctrl"><button id="moins" aria-label="Moins">−</button><strong id="nb-p">' + n + '</strong><button id="plusp" aria-label="Plus">+</button></div></div><ul class="liste-ing" id="liste-ing"></ul>' +
      (tf ? '<p class="muted" style="font-size:.74rem;margin:1rem 0 0">* Produit du commerce : vérifie la liste des allergènes sur l\'étiquette.</p>' : "") + "</div>" +
      blocNutri +
      '<div class="bloc"><label class="lib">Ustensiles</label><div class="liste-ust">' + (r.ust || []).map(function (u) { var m = c && c.ustManquants.indexOf(u) >= 0; return '<span class="pastille' + (m ? " alerte" : "") + '">' + (S.USTENSILES[u] || u) + (m ? " · manquant" : "") + "</span>"; }).join("") + "</div></div>" +
      '<div class="bloc"><label class="lib">Allergènes</label>' +
      '<p style="margin:0 0 .4rem;font-size:.88rem"><span class="muted">Contient :</span> ' + (r._a.contient.length ? r._a.contient.map(function (a) { return S.ALLERGENES[a]; }).join(", ") : "aucun des 14 allergènes réglementaires") + "</p>" +
      (r._a.traces.length ? '<p style="margin:0 0 .4rem;font-size:.88rem"><span class="muted">Peut contenir :</span> ' + r._a.traces.map(function (a) { return S.ALLERGENES[a]; }).join(", ") + "</p>" : "") +
      '<p class="muted" style="font-size:.74rem;margin:.8rem 0 0">Informations indicatives. Risque de contamination croisée selon les produits utilisés et ta cuisine : vérifie toujours les étiquettes.</p></div></aside>' +
      '<div><span class="sur-titre">Préparation</span><h2 style="margin-bottom:2rem">Étapes</h2><ol class="etapes">' + r.etapes.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") + "</ol>" +
      (S.store.utilisateur() ? '<div class="notes-perso"><label class="lib" for="notes">Mes notes</label><textarea class="champ" id="notes" rows="3" placeholder="Un peu moins de sel, parfait avec du riz…">' + esc((S.store.donnees().notes || {})[r.id] || "") + '</textarea><small class="muted" id="notes-etat">Visibles par toi seul.</small></div>' : "") +
      "</div></div></div>" + pied();
  };
  pages.recette.apres = function (params, id) {
    var r = S.store.recette(id); if (!r) return;
    var p = profil();
    var n = portionsCourantes[id] || (p && p.personnes) || r.portions;
    function rendreIng() {
      var f = n / r.portions;
      $("#nb-p").textContent = n;
      $("#liste-ing").innerHTML = r.ing.map(function (i) {
        var ing = S.ING[i[2]];
        return '<li><span class="qte">' + esc(S.qte(i[0], i[1], f)) + "</span><span>" + esc(S.nomIng(i, f)) + (ing && ing.tf ? '<span class="tf"> *</span>' : "") + (i[3] && !i[4] ? ' <span class="note">(' + esc(i[3]) + ")</span>" : "") + "</span></li>";
      }).join("");
    }
    $("#moins").onclick = function () { if (n > 1) { n--; portionsCourantes[id] = n; rendreIng(); } };
    $("#plusp").onclick = function () { if (n < 30) { n++; portionsCourantes[id] = n; rendreIng(); } };
    rendreIng();
    $$("[data-liste]").forEach(function (b) {
      b.onclick = function () {
        if (!exigerCompte()) return;
        var l = b.dataset.liste, ajout;
        S.store.modifier(function (d) { var i = d[l].indexOf(id); ajout = i < 0; if (ajout) d[l].push(id); else d[l].splice(i, 1); });
        S._garderScroll = true;
        S.toast(ajout ? "Ajoutée à « " + { favoris: "Mes favoris", aessayer: "À essayer", realisees: "Déjà réalisées" }[l] + " »" : "Retirée de la liste");
        router();
      };
    });
    $("#btn-coll").onclick = function () { if (exigerCompte()) choisirCollection(id); };
    $("#btn-cuisine").onclick = function () { S.modeCuisine(r, n); };
    $("#btn-courses").onclick = function () { if (!exigerCompte()) return; S.ajouterAuxCourses(r, n); S.toast("Ingrédients ajoutés à ta liste de courses (" + n + " pers.)"); };
    $("#btn-planifier").onclick = function () { if (exigerCompte()) S.planifier(id, n); };
    $("#btn-partager").onclick = function () { S.partager(r); };
    var na = $("#notes"), tn;
    if (na) na.oninput = function () { clearTimeout(tn); $("#notes-etat").textContent = "…"; tn = setTimeout(function () { S.store.modifier(function (d) { d.notes = d.notes || {}; if (na.value.trim()) d.notes[id] = na.value; else delete d.notes[id]; }); $("#notes-etat").textContent = "Enregistré"; }, 500); };
  };

  function exigerCompte() {
    if (S.store.utilisateur()) return true;
    S.toast("Crée ton compte pour enregistrer tes recettes"); go("#/connexion"); return false;
  }
  S.exigerCompte = exigerCompte;

  /* ---------- Modale ---------- */
  function modale(html, apres) {
    var f = document.createElement("div"); f.className = "modale-fond";
    f.innerHTML = '<div class="modale">' + html + "</div>";
    f.addEventListener("click", function (e) { if (e.target === f || e.target.closest("[data-fermer]")) f.remove(); });
    document.body.appendChild(f); if (apres) apres(f); return f;
  }
  S.modale = modale;
  function choisirCollection(id) {
    var d = S.store.donnees();
    var liste = d.collections.map(function (c) { var dedans = c.recettes.indexOf(id) >= 0; return '<label class="case" style="display:block;margin-bottom:.4rem"><input type="checkbox" value="' + c.id + '"' + (dedans ? " checked" : "") + "><span>" + esc(c.nom) + "</span></label>"; }).join("");
    modale("<h3>Ajouter à une collection</h3>" + (liste || '<p class="muted">Tu n\'as pas encore de collection.</p>') +
      '<div style="display:flex;gap:.5rem;margin-top:1rem"><input class="champ" id="nouv-coll" placeholder="Nouvelle collection (ex. Repas de fête)"><button class="btn petit" id="creer-coll">Créer</button></div>' +
      '<div class="pied"><button class="btn petit plein" data-fermer id="ok-coll">Terminé</button></div>', function (f) {
        $("#creer-coll", f).onclick = function () {
          var nom = $("#nouv-coll", f).value.trim(); if (!nom) return;
          S.store.modifier(function (d) { d.collections.push({ id: "c" + Date.now(), nom: nom, recettes: [id] }); });
          f.remove(); S.toast("Collection « " + nom + " » créée"); choisirCollection(id);
        };
        $$("input[type=checkbox]", f).forEach(function (cb) {
          cb.onchange = function () {
            S.store.modifier(function (d) {
              var c = d.collections.find(function (x) { return x.id === cb.value; });
              var i = c.recettes.indexOf(id); if (cb.checked && i < 0) c.recettes.push(id); if (!cb.checked && i >= 0) c.recettes.splice(i, 1);
            });
          };
        });
      });
  }

  /* --- Connexion / inscription --- */
  pages.connexion = function (params) {
    var insc = params.mode === "inscription";
    return '<div class="page"><div class="wrap auth"><div class="centre" style="margin-bottom:2rem"><span class="sur-titre">Mon espace</span><h1 style="font-size:2.6rem">' + (insc ? "Créer mon compte" : "Connexion") + "</h1></div>" +
      '<form class="bloc" id="f-auth">' + (insc ? '<label class="lib">Prénom</label><input class="champ" name="nom" autocomplete="given-name" required>' : "") +
      '<label class="lib">Email</label><input class="champ" name="email" type="email" autocomplete="email" required>' +
      '<label class="lib">Mot de passe</label><input class="champ" name="mdp" type="password" autocomplete="' + (insc ? "new-password" : "current-password") + '" required minlength="8" placeholder="' + (insc ? "8 caractères minimum" : "") + '">' +
      '<p class="muted" id="err" style="color:#e58a82;font-size:.85rem;min-height:1.2em;margin:0 0 .8rem"></p>' +
      '<button class="btn plein" style="width:100%">' + (insc ? "Créer mon compte" : "Se connecter") + "</button>" +
      '<p class="centre muted" style="font-size:.88rem;margin:1.4rem 0 0">' + (insc ? 'Déjà inscrit ? <a class="lien-or" href="#/connexion">Se connecter</a>' : 'Pas encore de compte ? <a class="lien-or" href="#/connexion?mode=inscription">Créer un compte</a>') + "</p></form>" +
      '<p class="muted centre" style="font-size:.74rem;margin-top:1.4rem">Version maquette : ton compte est enregistré uniquement dans ce navigateur.</p></div></div>';
  };
  pages.connexion.apres = function (params) {
    $("#f-auth").onsubmit = async function (e) {
      e.preventDefault(); var fd = new FormData(e.target);
      try {
        if (params.mode === "inscription") { var u = await S.store.inscription(fd.get("nom"), fd.get("email"), fd.get("mdp")); S.toast("Bienvenue " + u.nom + " ! Complète ton profil culinaire."); go("#/espace?t=profil"); }
        else { var u2 = await S.store.connexion(fd.get("email"), fd.get("mdp")); S.toast("Content de te revoir, " + u2.nom); go("#/espace"); }
        S.assistant && S.assistant.rafraichir();
      } catch (err) { $("#err").textContent = err.message; }
    };
  };

  /* --- Mon espace --- */
  var SECTIONS = [
    ["Mes recettes", [["favoris", "Favoris"], ["aessayer", "À essayer"], ["realisees", "Déjà réalisées"], ["collections", "Collections"]]],
    ["Organisation", [["planning", "Planning de la semaine"], ["courses", "Liste de courses"]]],
    ["Mon compte", [["profil", "Profil culinaire"], ["compte", "Paramètres du compte"]]]
  ];
  var TITRES = {
    favoris: ["Mes favoris", "Les recettes que tu veux garder sous la main."], aessayer: ["À essayer", "Tes prochaines envies en cuisine."],
    realisees: ["Déjà réalisées", "Ton carnet de recettes cuisinées."], collections: ["Mes collections", "Organise tes recettes comme tu le souhaites."],
    planning: ["Planning de la semaine", "Prévois tes repas, puis génère ta liste de courses en un clic."], courses: ["Liste de courses", "Rangée par rayon, quantités additionnées."],
    profil: ["Profil culinaire", "Ces informations adaptent les recettes et l'assistant à toi."], compte: ["Paramètres du compte", "Ton nom, ton mot de passe et tes données."]
  };
  function moisAnnee(ts) { return new Date(ts || Date.now()).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }); }
  function navLaterale(base, sections, actif, nb, entete) {
    return '<aside class="esp-nav">' + entete + sections.map(function (g) {
      return '<div class="esp-groupe"><span class="esp-titre-groupe">' + g[0] + "</span>" + g[1].map(function (o) {
        var lien = o[2] || (base + o[0]);
        return '<a href="' + lien + '" class="esp-lien' + (actif === o[0] ? " actif" : "") + '"><span>' + o[1] + "</span>" + (nb[o[0]] ? '<span class="esp-nb">' + nb[o[0]] + "</span>" : "") + "</a>";
      }).join("") + "</div>";
    }).join("") + "</aside>";
  }
  pages.espace = function (params) {
    var u = S.store.utilisateur(); if (!u) { setTimeout(function () { go("#/connexion"); }); return ""; }
    var d = S.store.donnees(), t = TITRES[params.t] ? params.t : "favoris";
    var nb = { favoris: d.favoris.length, aessayer: d.aessayer.length, realisees: d.realisees.length, collections: d.collections.length,
      courses: (d.courses || []).filter(function (c) { return !c.coche; }).length, creer: S.store.mesCreations().length };
    var sections = SECTIONS.slice(); sections.splice(2, 0, ["Partage", [["creer", "Mes créations", "#/creer"]]]);
    var entete = '<div class="esp-carte"><div class="esp-avatar">' + esc(u.nom.charAt(0).toUpperCase()) + '</div><div><strong>' + esc(u.nom) + '</strong><small>Membre depuis ' + moisAnnee(u.cree) + "</small></div></div>";
    return '<div class="page"><div class="wrap esp">' + navLaterale("#/espace?t=", sections, t, nb, entete) +
      '<section class="esp-contenu"><header class="esp-entete"><span class="sur-titre">Mon espace</span><h1>' + TITRES[t][0] + '</h1><p class="muted">' + TITRES[t][1] + "</p></header>" +
      '<div id="contenu-espace"></div></section></div></div>' + pied();
  };
  pages.espace.apres = function (params) {
    if (!S.store.utilisateur()) return;
    var t = TITRES[params.t] ? params.t : "favoris", zone = $("#contenu-espace");
    ({ profil: vueProfil, compte: vueCompte, favoris: vueListe, realisees: vueListe, aessayer: vueListe, collections: vueCollections, planning: S.vuePlanning, courses: S.vueCourses })[t](zone, t, params);
    var a = $(".esp-lien.actif"); if (a && a.scrollIntoView && innerWidth < 900) a.scrollIntoView({ inline: "center", block: "nearest" });
  };

  function cases(nom, obj, coches) {
    return '<div class="cases">' + Object.keys(obj).map(function (k) { return '<label class="case"><input type="checkbox" name="' + nom + '" value="' + k + '"' + (coches.indexOf(k) >= 0 ? " checked" : "") + "><span>" + (obj[k].n || obj[k]) + "</span></label>"; }).join("") + "</div>";
  }
  function radios(nom, liste, val) {
    return '<div class="segment">' + liste.map(function (o) { return '<label><input type="radio" name="' + nom + '" value="' + o[0] + '"' + (String(val) === String(o[0]) ? " checked" : "") + "><span>" + o[1] + "</span></label>"; }).join("") + "</div>";
  }
  function stepper(nom, val, min, max) {
    return '<div class="stepper" data-min="' + min + '" data-max="' + max + '"><button type="button" data-pas="-1" aria-label="Moins">−</button><input name="' + nom + '" type="number" min="' + min + '" max="' + max + '" value="' + val + '"><button type="button" data-pas="1" aria-label="Plus">+</button></div>';
  }
  function brancherSteppers(f) {
    $$(".stepper", f).forEach(function (st) {
      var i = $("input", st), mn = +st.dataset.min, mx = +st.dataset.max;
      $$("[data-pas]", st).forEach(function (b) { b.onclick = function () { i.value = Math.min(mx, Math.max(mn, (+i.value || mn) + +b.dataset.pas)); i.dispatchEvent(new Event("input", { bubbles: true })); }; });
    });
  }
  function carteForm(titre, desc, contenu) {
    return '<section class="carte-form"><div class="cf-tete"><h3>' + titre + "</h3>" + (desc ? '<p class="muted">' + desc + "</p>" : "") + "</div>" + contenu + "</section>";
  }

  function vueProfil(zone) {
    var d = S.store.donnees(), p = d.profil, refuses = p.refuses.slice();
    zone.innerHTML = '<form id="f-profil" class="pile-form">' +
      carteForm("Allergies et intolérances", "Les recettes qui en contiennent sont signalées et écartées de l'assistant.", cases("allergies", S.ALLERGENES, p.allergies) +
        '<label class="consent" style="margin-top:1.2rem"><input type="checkbox" name="consent"' + (d.consentement ? " checked" : "") + '><span>J\'accepte que SAVORIA enregistre mes allergies et intolérances (données de santé) pour adapter les recettes. Je peux retirer ce consentement à tout moment. <a class="lien-or" href="#/confidentialite">En savoir plus</a></span></label>') +
      carteForm("Régime et goûts", "", '<label class="lib">Régime alimentaire</label>' + radios("regime", Object.keys(S.REGIMES).map(function (k) { return [k, S.REGIMES[k].n]; }), p.regime) +
        '<label class="lib" style="margin-top:1.6rem">Aliments que je n\'aime pas</label><div class="tags" id="tags-refuses"></div><input class="champ" id="ajout-refus" placeholder="Tape un aliment puis Entrée (ex. coriandre)">') +
      carteForm("Ma cuisine", "Les recettes qui demandent un ustensile que tu n'as pas sont signalées.", cases("ustensiles", S.USTENSILES, p.ustensiles) +
        '<label class="lib" style="margin-top:1.8rem">Recettes à afficher</label><p class="muted" style="font-size:.84rem;margin:0 0 .9rem">Tu cuisines surtout avec un appareil ? Le site et l\'assistant ne te montreront que ces recettes. Tu pourras toujours tout afficher en un clic.</p>' +
        radios("modeAppareil", [["", "Toutes les recettes"]].concat(Object.keys(S.APPAREILS).map(function (k) { return [k, k === "sanscuisson" ? "Que sans cuisson" : "Que " + (k === "airfryer" ? "à l'air fryer" : "au " + S.APPAREILS[k].n.toLowerCase())]; })), p.modeAppareil || "")) +
      carteForm("Mon rythme", "", '<div class="form-grille"><div class="plein"><label class="lib">Mon niveau</label>' + radios("niveau", [["debutant", "Débutant"], ["intermediaire", "Intermédiaire"], ["confirme", "Confirmé"]], p.niveau) + "</div>" +
        '<div class="plein"><label class="lib">Temps habituellement disponible</label>' + radios("temps", [[15, "15 min"], [30, "30 min"], [45, "45 min"], [60, "1 h"], [120, "2 h et +"]], p.temps) + "</div>" +
        '<div><label class="lib">Je cuisine pour</label>' + stepper("personnes", p.personnes, 1, 20) + "</div></div>") +
      '<div class="barre-enreg" id="barre-enreg"><span class="muted" id="etat-profil">Profil à jour</span><button class="btn plein">Enregistrer</button></div>' +
      '<p id="err-p" class="err-form"></p></form>';
    var f = $("#f-profil");
    function tags() {
      $("#tags-refuses", f).innerHTML = refuses.map(function (x, i) { return '<span class="tag">' + esc(x) + '<button type="button" data-tag="' + i + '" aria-label="Retirer">×</button></span>'; }).join("") || '<span class="muted" style="font-size:.85rem">Aucun pour l\'instant.</span>';
      $$("[data-tag]", f).forEach(function (b) { b.onclick = function () { refuses.splice(+b.dataset.tag, 1); tags(); modifie(); }; });
    }
    function modifie() { $("#etat-profil").textContent = "Modifications non enregistrées"; $("#barre-enreg").classList.add("modifie"); }
    tags(); brancherSteppers(f);
    $("#ajout-refus", f).onkeydown = function (e) {
      if (e.key === "Enter" || e.key === ",") { e.preventDefault(); var v = this.value.trim().replace(/,$/, ""); if (v && refuses.indexOf(v) < 0) { refuses.push(v); tags(); modifie(); } this.value = ""; }
    };
    f.addEventListener("change", modifie); f.addEventListener("input", function (e) { if (e.target.id !== "ajout-refus") modifie(); });
    f.onsubmit = function (e) {
      e.preventDefault(); var fd = new FormData(f), al = fd.getAll("allergies");
      var reste = $("#ajout-refus", f).value.trim(); if (reste && refuses.indexOf(reste) < 0) { refuses.push(reste); $("#ajout-refus", f).value = ""; tags(); }
      if (al.length && !fd.get("consent")) { $("#err-p").textContent = "Pour enregistrer tes allergies, coche la case de consentement."; return; }
      S.store.modifier(function (d) {
        d.consentement = !!fd.get("consent") && al.length > 0;
        d.profil = { allergies: al, regime: fd.get("regime") || "aucun", refuses: refuses.slice(), ustensiles: fd.getAll("ustensiles"), niveau: fd.get("niveau") || "intermediaire", temps: +fd.get("temps") || 45, personnes: Math.max(1, +fd.get("personnes") || 2), modeAppareil: fd.get("modeAppareil") || "" };
        var m = d.profil.modeAppareil; if (m && m !== "sanscuisson" && d.profil.ustensiles.indexOf(m) < 0) d.profil.ustensiles.push(m);
      });
      $("#err-p").textContent = ""; $("#etat-profil").textContent = "Profil enregistré"; $("#barre-enreg").classList.remove("modifie"); S.toast("Profil enregistré");
    };
  }
  function vueCompte(zone) {
    var u = S.store.utilisateur();
    zone.innerHTML = '<div class="pile-form">' +
      carteForm("Identité", "", '<form id="f-nom" class="ligne-form"><div style="flex:1"><label class="lib">Prénom</label><input class="champ" name="nom" value="' + esc(u.nom) + '" required></div><button class="btn">Mettre à jour</button></form>' +
        '<label class="lib" style="margin-top:1.4rem">Email</label><p style="margin:0">' + esc(u.email) + "</p>") +
      carteForm("Mot de passe", "", '<form id="f-mdp" class="form-grille"><div><label class="lib">Mot de passe actuel</label><input class="champ" type="password" name="ancien" autocomplete="current-password" required></div>' +
        '<div><label class="lib">Nouveau mot de passe</label><input class="champ" type="password" name="nouveau" autocomplete="new-password" minlength="8" required placeholder="8 caractères minimum"></div>' +
        '<div class="plein" style="display:flex;justify-content:flex-end"><button class="btn">Changer le mot de passe</button></div><p class="err-form plein" id="err-mdp"></p></form>') +
      carteForm("Session", "", '<button class="btn discret" id="c-deco">Se déconnecter</button>') +
      '<section class="carte-form zone-danger"><div class="cf-tete"><h3>Supprimer mon compte</h3><p class="muted">Ton profil, tes listes, tes notes et tes recettes non publiées seront définitivement effacés.</p></div><button class="btn danger" id="suppr-compte">Supprimer mon compte</button></section></div>';
    $("#f-nom").onsubmit = function (e) { e.preventDefault(); S.store.renommer(new FormData(e.target).get("nom")); S.toast("Prénom mis à jour"); S._garderScroll = true; router(); };
    $("#f-mdp").onsubmit = async function (e) {
      e.preventDefault(); var fd = new FormData(e.target);
      try { await S.store.changerMotDePasse(fd.get("ancien"), fd.get("nouveau")); e.target.reset(); $("#err-mdp").textContent = ""; S.toast("Mot de passe modifié"); }
      catch (er) { $("#err-mdp").textContent = er.message; }
    };
    $("#c-deco").onclick = function () { S.store.deconnexion(); S.toast("À bientôt !"); S.assistant && S.assistant.rafraichir(); go("#/"); };
    $("#suppr-compte").onclick = function () {
      modale('<h3>Supprimer mon compte ?</h3><p class="muted">Cette action est définitive.</p><div class="pied"><button class="btn petit discret" data-fermer>Annuler</button><button class="btn petit danger" id="ok-suppr">Supprimer</button></div>', function (f) {
        $("#ok-suppr", f).onclick = function () { S.store.supprimerCompte(); f.remove(); S.toast("Compte supprimé"); S.assistant && S.assistant.rafraichir(); go("#/"); };
      });
    };
  }
  function ligneRecette(r, actions, sous) {
    return '<div class="ligne-item">' + S.photoHTML(r) + '<a class="titre" href="#/recette/' + encodeURIComponent(r.id) + '"><strong>' + esc(r.titre) + '</strong><small class="muted">' + (sous || (S.duree(r.temps) + " · " + DIFF[r.diff])) + '</small></a><div class="actions">' + actions + "</div></div>";
  }
  function vueListe(zone, t) {
    var d = S.store.donnees();
    var l = d[t].map(function (id) { return S.store.recette(id); }).filter(Boolean);
    var vides = { favoris: "Clique sur le cœur d'une recette pour la retrouver ici.", realisees: "Les recettes terminées en mode cuisine arrivent ici automatiquement.", aessayer: "Ajoute ici les recettes que tu veux préparer bientôt." };
    zone.innerHTML = l.length ? '<div class="grille-recettes">' + l.map(S.carteHTML).join("") + "</div>" : '<div class="vide">' + vides[t] + '<br><br><a class="btn petit" href="#/recettes">Parcourir les recettes</a></div>';
    reveler(); brancherCoeurs();
  }
  function vueCollections(zone, t, params) {
    var d = S.store.donnees();
    if (params.c) {
      var c = d.collections.find(function (x) { return x.id === params.c; });
      if (!c) { go("#/espace?t=collections"); return; }
      var l = c.recettes.map(function (id) { return S.store.recette(id); }).filter(Boolean);
      zone.innerHTML = '<div class="outil-entete"><div><a class="lien-or" href="#/espace?t=collections">← Toutes les collections</a><h2 style="margin:.8rem 0 0">' + esc(c.nom) + '</h2></div><div class="outil-actions"><button class="btn petit discret" id="ren">Renommer</button><button class="btn petit danger" id="sup">Supprimer</button></div></div>' +
        (l.length ? '<div class="mini-liste">' + l.map(function (r) { return ligneRecette(r, '<button class="btn petit discret" data-retirer="' + esc(r.id) + '">Retirer</button>'); }).join("") + "</div>" : '<div class="vide">Collection vide. Ajoute des recettes depuis leur fiche.</div>');
      $$("[data-retirer]", zone).forEach(function (b) { b.onclick = function () { S.store.modifier(function (d) { var cc = d.collections.find(function (x) { return x.id === c.id; }); cc.recettes = cc.recettes.filter(function (x) { return x !== b.dataset.retirer; }); }); router(); }; });
      $("#ren").onclick = function () {
        modale('<h3>Renommer la collection</h3><input class="champ" id="nn" value="' + esc(c.nom) + '"><div class="pied"><button class="btn petit discret" data-fermer>Annuler</button><button class="btn petit plein" id="okn">Valider</button></div>', function (f) {
          $("#okn", f).onclick = function () { var v = $("#nn", f).value.trim(); if (!v) return; S.store.modifier(function (d) { d.collections.find(function (x) { return x.id === c.id; }).nom = v; }); f.remove(); router(); };
        });
      };
      $("#sup").onclick = function () { S.store.modifier(function (d) { d.collections = d.collections.filter(function (x) { return x.id !== c.id; }); }); S.toast("Collection supprimée"); go("#/espace?t=collections"); };
      return;
    }
    zone.innerHTML = '<form class="ajout-article" id="f-coll"><input class="champ" id="nc" placeholder="Nom de la nouvelle collection (ex. Repas de fête)"><button class="btn petit">Créer</button></form>' +
      (d.collections.length ? '<div class="collections">' + d.collections.map(function (c) {
        var r0 = c.recettes.map(function (id) { return S.store.recette(id); }).filter(Boolean)[0];
        return '<a class="coll-carte" href="#/espace?t=collections&c=' + c.id + '">' + (r0 ? S.photoHTML(r0) : '<div class="photo manquante"><div class="repli"><div><div class="assiette">' + S.iconeCat("classiques") + "</div></div></div></div>") + '<div class="coll-texte"><h4>' + esc(c.nom) + '</h4><span class="muted">' + c.recettes.length + " recette" + (c.recettes.length > 1 ? "s" : "") + "</span></div></a>";
      }).join("") + "</div>" : '<div class="vide">Crée des collections pour ranger tes recettes : « Repas de fête », « Batch cooking »…</div>');
    $("#f-coll").onsubmit = function (e) { e.preventDefault(); var v = $("#nc").value.trim(); if (!v) return; S.store.modifier(function (d) { d.collections.push({ id: "c" + Date.now(), nom: v, recettes: [] }); }); S.toast("Collection créée"); router(); };
  }

  /* --- Formulaire recette (membre et admin) --- */
  function ingVersTexte(r) {
    return (r.ing || []).map(function (i) {
      var q = i[0] === null || i[0] === undefined || i[0] === "" ? "" : String(i[0]).replace(".", ",");
      var nom = i[4] ? i[3] : (S.ING[i[2]] ? S.ING[i[2]].n : i[3]) + (i[3] && !i[4] ? " (" + i[3] + ")" : "");
      return (q + " " + (i[1] || "") + " " + nom).replace(/\s+/g, " ").trim();
    }).join("\n");
  }
  var RE_UNITE = /^(\d+(?:[.,]\d+)?|\d+\/\d+|½|¼|¾)?\s*(kg|g|ml|cl|l|c\.?\s?à\s?s\.?|cs|c\.?\s?à\s?c\.?|cc|pincées?|brins?|tranches?|feuilles?|poignées?)?\.?\s+(?:de\s+|d['’]\s*)?(.+)$/i;
  function parserIng(txt) {
    return txt.split("\n").map(function (l) { return l.trim().replace(/^[-•*]\s*/, ""); }).filter(Boolean).map(function (l) {
      var m = l.match(RE_UNITE), q = null, u = "", reste = l;
      if (m && (m[1] || m[2])) {
        var qs = m[1] || "";
        q = qs === "½" ? .5 : qs === "¼" ? .25 : qs === "¾" ? .75 : qs.indexOf("/") > 0 ? (+qs.split("/")[0] / +qs.split("/")[1]) : qs ? parseFloat(qs.replace(",", ".")) : null;
        var uu = (m[2] || "").toLowerCase().replace(/\s/g, "");
        u = uu === "l" ? "L" : /^c\.?às|^cs/.test(uu) ? "c. à s." : /^c\.?àc|^cc/.test(uu) ? "c. à c." : /^pinc/.test(uu) ? "pincée" : /^brin/.test(uu) ? "brins" : /^tranche/.test(uu) ? "tranches" : /^feuille/.test(uu) ? "feuilles" : /^poign/.test(uu) ? "poignée" : uu;
        reste = m[3];
      } else if (/^\d/.test(l)) { var mm = l.match(/^(\d+(?:[.,]\d+)?)\s+(.+)$/); if (mm) { q = parseFloat(mm[1].replace(",", ".")); reste = mm[2]; } }
      var k = S.detectIngredients(reste)[0] || null;
      return [q, u, k, reste, 1];
    });
  }
  function formRecette(r, admin) {
    var neuf = !r;
    r = r || { cats: [], ust: ["plaques"], ing: [], etapes: [], temps: 30, prep: 15, diff: 1, portions: 4, type: "plat" };
    return '<form id="f-rec" class="pile-form">' +
      carteForm("1. La photo", "Une belle photo de ton plat, prise de préférence à la lumière du jour.",
        '<label class="zone-photo' + (r.photo ? " remplie" : "") + '" id="zone-photo"><input type="file" accept="image/*" name="photo"><div class="zp-apercu" id="zp-apercu"' + (r.photo ? ' style="background-image:url(' + r.photo + ')"' : "") + '></div><span class="zp-texte">' + (r.photo ? "Changer la photo" : "Choisir une photo") + "</span></label>" +
        (admin && !r.photo ? '<p class="muted" style="font-size:.78rem;margin:.6rem 0 0">Facultatif pour l\'équipe : la photo peut aussi être déposée sur GitHub dans images/recettes/' + esc(r.id || "identifiant") + ".jpg</p>" : "")) +
      carteForm("2. L'essentiel", "", '<label class="lib">Nom de la recette</label><input class="champ" name="titre" required maxlength="90" value="' + esc(r.titre || "") + '" placeholder="Ex. Gratin de courge au parmesan">' +
        '<label class="lib" style="margin-top:1.2rem">En une phrase</label><input class="champ" name="accroche" maxlength="140" value="' + esc(r.accroche || "") + '" placeholder="Ce qui rend ta recette irrésistible">' +
        '<label class="lib" style="margin-top:1.4rem">Type de plat</label>' + radios("type", Object.keys(S.TYPES).map(function (k) { return [k, S.TYPES[k]]; }), r.type || "plat") +
        '<label class="lib" style="margin-top:1.4rem">Catégories</label>' + cases("cats", S.CATEGORIES, r.cats) +
        (admin ? '<label class="consent" style="margin-top:1.2rem"><input type="checkbox" name="tendance"' + (r.tendance ? " checked" : "") + '><span>Tendance TikTok (badge et section de l\'accueil)</span></label>' : "")) +
      carteForm("3. Temps et difficulté", "", '<div class="form-grille"><div><label class="lib">Temps total (min)</label><input class="champ" type="number" min="1" name="temps" required value="' + r.temps + '"></div>' +
        '<div><label class="lib">Dont préparation (min)</label><input class="champ" type="number" min="1" name="prep" required value="' + (r.prep || r.temps) + '"></div>' +
        '<div class="plein"><label class="lib">Difficulté</label>' + radios("diff", [[1, "Facile"], [2, "Intermédiaire"], [3, "Confirmé"]], r.diff) + "</div>" +
        '<div><label class="lib">Pour combien de personnes</label>' + stepper("portions", r.portions, 1, 30) + "</div></div>") +
      carteForm("4. Les ingrédients", "Un par ligne, avec la quantité : « 200 g de farine », « 3 œufs », « 1 c. à s. d'huile ».",
        '<textarea class="champ" name="ing" rows="8" required placeholder="200 g de farine&#10;3 œufs&#10;25 cl de lait">' + esc(ingVersTexte(r)) + '</textarea><div id="apercu-ing" class="apercu-ing"></div>') +
      carteForm("5. La préparation", "Une étape par ligne, dans l'ordre.",
        '<textarea class="champ" name="etapes" rows="7" required placeholder="Préchauffez le four à 180 °C.&#10;Mélangez la farine et les œufs.">' + esc((r.etapes || []).join("\n")) + '</textarea>' +
        '<label class="lib" style="margin-top:1.4rem">Ustensiles nécessaires</label>' + cases("ust", S.USTENSILES, r.ust || [])) +
      '<div class="barre-enreg"><span class="muted">' + (admin ? (r.source === "membre" ? "Correction de la proposition d'un membre." : "Recette de l'équipe : publiée immédiatement.") : "Ta recette sera relue avant d'être visible sur le site.") + '</span><div style="display:flex;gap:.5rem"><button type="button" class="btn discret" id="annuler-rec">Annuler</button><button class="btn plein">' + (admin ? "Enregistrer" : neuf ? "Envoyer pour validation" : "Renvoyer pour validation") + "</button></div></div>" +
      '<p id="err-r" class="err-form"></p></form>';
  }
  function apercuIng(f) {
    var lignes = parserIng($("[name=ing]", f).value);
    if (!lignes.length) { $("#apercu-ing", f).innerHTML = ""; return; }
    var al = S.allergenesDe(lignes.map(function (l) { return l[2]; }).filter(Boolean));
    $("#apercu-ing", f).innerHTML = '<div class="ing-reconnus">' + lignes.map(function (l) { return '<span class="tag' + (l[2] ? " ok" : " inconnu") + '" title="' + (l[2] ? "Reconnu : " + esc(S.ING[l[2]].n) : "Non reconnu : allergènes non vérifiés") + '">' + esc(l[3]) + "</span>"; }).join("") + "</div>" +
      (al.contient.length ? '<p class="muted" style="font-size:.82rem;margin:.8rem 0 0">Allergènes détectés : <span class="or">' + al.contient.map(function (a) { return S.ALLERGENES[a]; }).join(", ") + "</span>" + (al.traces.length ? " · traces possibles : " + al.traces.map(function (a) { return S.ALLERGENES[a]; }).join(", ") : "") + "</p>" : "") +
      (lignes.some(function (l) { return !l[2]; }) ? '<p class="muted" style="font-size:.78rem;margin:.4rem 0 0">Les ingrédients en orange ne sont pas reconnus : leurs allergènes ne pourront pas être vérifiés.</p>' : "");
  }
  function slug(t) { return S.norm(t).replace(/ /g, "-").slice(0, 60) || "recette"; }
  function lirePhoto(file) {
    return new Promise(function (ok, ko) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var max = 1000, s = Math.min(1, max / Math.max(img.width, img.height));
        var c = document.createElement("canvas"); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        var d = c.toDataURL("image/webp", .78); if (d.indexOf("image/webp") < 0) d = c.toDataURL("image/jpeg", .8); ok(d);
      };
      img.onerror = ko; img.src = url;
    });
  }
  function brancherForm(f, r, admin, surFin) {
    var t, photo = r && r.photo;
    $("[name=ing]", f).oninput = function () { clearTimeout(t); t = setTimeout(function () { apercuIng(f); }, 250); }; apercuIng(f);
    brancherSteppers(f);
    $("[name=photo]", f).onchange = async function () {
      var file = this.files[0]; if (!file) return;
      try { photo = await lirePhoto(file); $("#zp-apercu", f).style.backgroundImage = "url(" + photo + ")"; $("#zone-photo", f).classList.add("remplie"); $(".zp-texte", f).textContent = "Changer la photo"; }
      catch (e) { $("#err-r", f).textContent = "Impossible de lire cette image."; }
    };
    $("#annuler-rec", f).onclick = surFin;
    f.onsubmit = function (e) {
      e.preventDefault(); var fd = new FormData(f), err = $("#err-r", f);
      if (!photo && !admin) { err.textContent = "Ajoute une photo de ton plat."; $("#zone-photo", f).scrollIntoView({ block: "center", behavior: "smooth" }); return; }
      if (!fd.getAll("cats").length) { err.textContent = "Choisis au moins une catégorie."; return; }
      var n = {};
      Object.keys(r || {}).forEach(function (k) { if (k.charAt(0) !== "_") n[k] = r[k]; });
      n.titre = fd.get("titre").trim(); n.accroche = (fd.get("accroche") || "").trim(); n.cats = fd.getAll("cats"); n.type = fd.get("type") || "plat";
      n.temps = +fd.get("temps"); n.prep = Math.min(+fd.get("prep"), +fd.get("temps")); n.diff = +fd.get("diff") || 1; n.portions = +fd.get("portions") || 4;
      n.ust = fd.getAll("ust"); n.ing = parserIng(fd.get("ing")); n.etapes = String(fd.get("etapes")).split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
      if (photo) n.photo = photo;
      if (!n.ing.length || !n.etapes.length) { err.textContent = "Ajoute au moins un ingrédient et une étape."; return; }
      ["statut", "source", "auteurNom"].forEach(function (k) { delete n[k]; });
      if (admin) {
        if (fd.get("tendance")) n.tendance = 1; else delete n.tendance;
        var ok;
        if (r && r.source === "membre") ok = S.store.majSoumission(r.id, n) || S.store.sauverRecetteAdmin(n);
        else { if (!n.id) { n.id = slug(n.titre); if (S.store.catalogueComplet().some(function (x) { return x.id === n.id; })) n.id += "-" + Date.now().toString(36).slice(-4); } ok = S.store.sauverRecetteAdmin(n); }
        if (!ok) return; S.toast("Recette enregistrée");
      } else {
        if (!n.id) n.id = slug(n.titre) + "-" + Date.now().toString(36).slice(-5);
        if (!S.store.soumettre(n)) return;
        S.toast("Merci ! Ta recette est envoyée pour validation.");
      }
      surFin();
    };
  }

  /* --- Créer : les membres proposent leurs recettes --- */
  var STATUTS = { attente: ["En relecture", "st-attente"], publiee: ["Publiée", "st-ok"], refusee: ["Non publiée", "st-refus"] };
  pages.creer = function (params) {
    var u = S.store.utilisateur();
    if (!u) return '<div class="page"><div class="wrap creer-intro centre"><span class="sur-titre">À vous de créer</span><h1>Partagez vos recettes</h1><p class="muted">Proposez vos meilleures recettes à la communauté SAVORIA. Après relecture par notre équipe, elles rejoignent le carnet, avec votre nom.</p><div class="hero-ctas" style="justify-content:center;margin-top:2rem"><a class="btn plein" href="#/connexion?mode=inscription">Créer mon compte</a><a class="btn discret" href="#/connexion">Se connecter</a></div></div></div>' + pied();
    if (params.nouveau || params.edit) {
      return '<div class="page"><div class="wrap form-etroit"><a class="lien-or" href="#/creer">← Mes créations</a><header class="esp-entete" style="margin-top:1.4rem"><span class="sur-titre">À vous de créer</span><h1>' + (params.edit ? "Modifier ma recette" : "Proposer une recette") + '</h1><p class="muted">Cinq étapes, et ta recette part en relecture.</p></header><div id="zone-form"></div></div></div>' + pied();
    }
    var l = S.store.mesCreations().sort(function (a, b) { return (b.maj || 0) - (a.maj || 0); });
    return '<div class="page"><div class="wrap"><header class="entete-page creer-tete"><div><span class="sur-titre">À vous de créer</span><h1>Mes créations</h1><p class="muted">Proposez vos recettes : après relecture par l\'équipe SAVORIA, elles rejoignent le carnet avec votre nom.</p></div><a class="btn plein" href="#/creer?nouveau=1">Proposer une recette</a></header>' +
      (l.length ? '<div class="mini-liste">' + l.map(function (s) {
        var r = S.enrichir(Object.assign({}, s.recette, { id: s.id })), st = STATUTS[s.statut] || STATUTS.attente;
        var sous = '<span class="statut ' + st[1] + '">' + st[0] + "</span>" + (s.statut === "refusee" && s.motif ? " · " + esc(s.motif) : " · " + new Date(s.maj || s.cree).toLocaleDateString("fr-FR"));
        return ligneRecette(r, '<a class="btn petit discret" href="#/creer?edit=' + encodeURIComponent(s.id) + '">Modifier</a><button class="btn petit danger" data-suppr="' + esc(s.id) + '">Supprimer</button>', sous);
      }).join("") + "</div>" : '<div class="vide creer-vide"><div class="assiette" style="width:90px;margin:0 auto 1.4rem">' + S.iconeCat("classiques") + "</div><h3>Ta première recette t'attend</h3><p>Partage le plat que tout le monde te réclame.</p><br><a class=\"btn plein\" href=\"#/creer?nouveau=1\">Proposer une recette</a></div>") +
      "</div></div>" + pied();
  };
  pages.creer.apres = function (params) {
    if (!S.store.utilisateur()) return;
    if (params.nouveau || params.edit) {
      var s = params.edit ? S.store.mesCreations().find(function (x) { return x.id === params.edit; }) : null;
      if (params.edit && !s) { go("#/creer"); return; }
      var r = s ? Object.assign({}, s.recette, { id: s.id }) : null;
      $("#zone-form").innerHTML = formRecette(r, false);
      brancherForm($("#f-rec"), r, false, function () { go("#/creer"); });
      return;
    }
    $$("[data-suppr]").forEach(function (b) {
      b.onclick = function () {
        modale('<h3>Supprimer cette recette ?</h3><p class="muted">Elle sera retirée de tes créations' + ' et du site si elle était publiée.</p><div class="pied"><button class="btn petit discret" data-fermer>Annuler</button><button class="btn petit danger" id="oks">Supprimer</button></div>', function (f) {
          $("#oks", f).onclick = function () { S.store.supprimerCreation(b.dataset.suppr); f.remove(); S.toast("Recette supprimée"); router(); };
        });
      };
    });
  };

  /* --- Coulisses : l'espace admin caché --- */
  pages.coulisses = function (params) {
    if (!S.store.estAdmin()) return '<div class="page"><div class="wrap vide"><h2>Page introuvable</h2><p><a class="lien-or" href="#/">Retour à l\'accueil</a></p></div></div>';
    var soum = S.store.soumissions(), att = soum.filter(function (s) { return s.statut === "attente"; }).length;
    var vue = params.vue || "bord";
    var sections = [["Pilotage", [["bord", "Tableau de bord", "#/" + S.CONFIG.routeAdmin], ["valider", "À valider"]]], ["Contenu", [["recettes", "Recettes"]]], ["Communauté", [["membres", "Membres"]]]];
    var titres = { bord: ["Tableau de bord", "Une vue d'ensemble de SAVORIA."], valider: ["À valider", "Les recettes proposées par les membres."], recettes: ["Recettes", "Tout le catalogue, y compris les propositions publiées."], membres: ["Membres", "Les comptes inscrits."] };
    if (params.edit || params.nouveau) titres[vue] = [params.nouveau ? "Nouvelle recette" : "Modifier la recette", "Les recettes de l'équipe sont publiées immédiatement."];
    var entete = '<div class="esp-carte admin"><div class="esp-avatar">S</div><div><strong>Coulisses</strong><small>Espace réservé</small></div></div>';
    return '<div class="page"><div class="wrap esp">' + navLaterale("#/" + S.CONFIG.routeAdmin + "?vue=", sections, vue, { valider: att }, entete) +
      '<section class="esp-contenu"><header class="esp-entete"><span class="sur-titre">Coulisses</span><h1>' + titres[vue][0] + '</h1><p class="muted">' + titres[vue][1] + '</p></header><div id="zone-admin"></div></section></div></div>' + pied();
  };
  pages.coulisses.apres = function (params) {
    if (!S.store.estAdmin()) return;
    var zone = $("#zone-admin"), vue = params.vue || "bord", R = "#/" + S.CONFIG.routeAdmin;
    if (params.edit || params.nouveau) {
      var r = params.edit ? S.store.recette(params.edit) : null;
      zone.innerHTML = formRecette(r, true);
      brancherForm($("#f-rec"), r, true, function () { go(R + "?vue=" + (vue === "valider" ? "valider" : "recettes")); });
      return;
    }
    if (vue === "bord") {
      var pub = S.store.publiques(), soum = S.store.soumissions(), mem = S.store.membres();
      var fav = {}, all = {};
      mem.forEach(function (m) { m.favoris.forEach(function (id) { fav[id] = (fav[id] || 0) + 1; }); m.allergies.forEach(function (a) { all[a] = (all[a] || 0) + 1; }); });
      var topFav = Object.keys(fav).sort(function (a, b) { return fav[b] - fav[a]; }).slice(0, 5);
      var topAll = Object.keys(all).sort(function (a, b) { return all[b] - all[a]; }).slice(0, 5);
      var att = soum.filter(function (s) { return s.statut === "attente"; });
      zone.innerHTML = '<div class="kpis"><a class="kpi" href="' + R + '?vue=membres"><span>Membres</span><strong>' + mem.length + '</strong></a><a class="kpi" href="' + R + '?vue=recettes"><span>Recettes en ligne</span><strong>' + pub.length + '</strong></a>' +
        '<a class="kpi' + (att.length ? " alerte" : "") + '" href="' + R + '?vue=valider"><span>À valider</span><strong>' + att.length + '</strong></a><div class="kpi"><span>Proposées par les membres</span><strong>' + soum.filter(function (s) { return s.statut === "publiee"; }).length + "</strong></div></div>" +
        '<div class="bord-grille"><section class="carte-form"><div class="cf-tete"><h3>À relire en priorité</h3></div>' +
        (att.length ? '<div class="mini-liste">' + att.slice(0, 4).map(function (s) { var r = S.enrichir(Object.assign({}, s.recette, { id: s.id })); return ligneRecette(r, '<a class="btn petit plein" href="' + R + '?vue=valider">Relire</a>', "par " + esc(s.auteurNom) + " · " + new Date(s.maj || s.cree).toLocaleDateString("fr-FR")); }).join("") + "</div>" : '<p class="muted">Rien à relire pour le moment.</p>') + "</section>" +
        '<section class="carte-form"><div class="cf-tete"><h3>Les plus mises en favoris</h3></div>' + (topFav.length ? '<ol class="classement">' + topFav.map(function (id) { var r = S.store.recette(id); return r ? '<li><a href="#/recette/' + encodeURIComponent(id) + '">' + esc(r.titre) + "</a><span>" + fav[id] + "</span></li>" : ""; }).join("") + "</ol>" : '<p class="muted">Pas encore de favoris.</p>') + "</section>" +
        '<section class="carte-form"><div class="cf-tete"><h3>Allergies les plus déclarées</h3><p class="muted">Données regroupées, sans nom.</p></div>' + (topAll.length ? '<ol class="classement">' + topAll.map(function (a) { return "<li><span>" + S.ALLERGENES[a] + "</span><span>" + all[a] + "</span></li>"; }).join("") + "</ol>" : '<p class="muted">Aucune allergie déclarée.</p>') + "</section></div>" +
        '<p class="muted note-maquette">Version maquette : ces chiffres ne concernent que les comptes créés dans ce navigateur. Ils deviendront réels une fois Supabase branché.</p>';
      return;
    }
    if (vue === "valider") {
      var filtre = params.f || "attente", l = S.store.soumissions().filter(function (s) { return s.statut === filtre; }).sort(function (a, b) { return (b.maj || 0) - (a.maj || 0); });
      var cpt = function (st) { return S.store.soumissions().filter(function (s) { return s.statut === st; }).length; };
      zone.innerHTML = '<div class="types">' + [["attente", "En attente"], ["publiee", "Publiées"], ["refusee", "Refusées"]].map(function (o) { return '<a class="type-onglet' + (filtre === o[0] ? " actif" : "") + '" href="' + R + "?vue=valider&f=" + o[0] + '">' + o[1] + " · " + cpt(o[0]) + "</a>"; }).join("") + "</div>" +
        (l.length ? '<div class="pile-form">' + l.map(function (s) {
          var r = S.enrichir(Object.assign({}, s.recette, { id: s.id })), nu = S.nutrition(r);
          return '<article class="soum"><div class="soum-photo">' + S.photoHTML(r) + '</div><div class="soum-corps"><span class="sur-titre" style="margin:0">' + (S.TYPES[r.type] || "") + " · par " + esc(s.auteurNom) + " · " + new Date(s.maj || s.cree).toLocaleDateString("fr-FR") + "</span><h3>" + esc(r.titre) + "</h3>" +
            (r.accroche ? '<p class="muted">' + esc(r.accroche) + "</p>" : "") +
            '<div class="meta"><span>' + ICO.horloge + S.duree(r.temps) + "</span><span>" + ICO.toque + DIFF[r.diff] + "</span><span>" + r.ing.length + " ingrédients · " + r.etapes.length + " étapes</span><span>" + nu.kcal + " kcal</span></div>" +
            (r._inconnus.length ? '<div class="bandeau-alerte">' + ICO.alerte + "<span>Ingrédients non reconnus (allergènes à vérifier) : " + r._inconnus.map(esc).join(", ") + "</span></div>" : "") +
            (r._a.contient.length ? '<p class="muted" style="font-size:.82rem;margin:.6rem 0 0">Allergènes : ' + r._a.contient.map(function (a) { return S.ALLERGENES[a]; }).join(", ") + "</p>" : "") +
            (s.statut === "refusee" && s.motif ? '<p class="muted" style="font-size:.82rem">Motif : ' + esc(s.motif) + "</p>" : "") +
            '<div class="soum-actions"><a class="btn petit discret" href="#/recette/' + encodeURIComponent(s.id) + '">Aperçu</a><a class="btn petit discret" href="' + R + "?vue=valider&edit=" + encodeURIComponent(s.id) + '">Corriger</a>' +
            (s.statut !== "publiee" ? '<button class="btn petit plein" data-valider="' + esc(s.id) + '">Publier</button>' : "") +
            (s.statut !== "refusee" ? '<button class="btn petit danger" data-refuser="' + esc(s.id) + '">' + (s.statut === "publiee" ? "Retirer du site" : "Refuser") + "</button>" : "") + "</div></div></article>";
        }).join("") + "</div>" : '<div class="vide">' + (filtre === "attente" ? "Aucune recette en attente. Tout est à jour." : "Rien ici pour le moment.") + "</div>");
      $$("[data-valider]", zone).forEach(function (b) { b.onclick = function () { S.store.decider(b.dataset.valider, "publiee"); S.toast("Recette publiée sur le site"); S._garderScroll = true; router(); }; });
      $$("[data-refuser]", zone).forEach(function (b) {
        b.onclick = function () {
          modale('<h3>Ne pas publier cette recette</h3><p class="muted">Le motif sera affiché au membre pour qu\'il puisse la corriger.</p><textarea class="champ" id="motif" rows="3" placeholder="Ex. : la photo ne correspond pas au plat, il manque les quantités…"></textarea><div class="pied"><button class="btn petit discret" data-fermer>Annuler</button><button class="btn petit danger" id="okr">Confirmer</button></div>', function (f) {
            $("#okr", f).onclick = function () { S.store.decider(b.dataset.refuser, "refusee", $("#motif", f).value.trim()); f.remove(); S.toast("Recette non publiée"); S._garderScroll = true; router(); };
          });
        };
      });
      return;
    }
    if (vue === "recettes") {
      var q = params.q || "", src = params.src || "";
      var tout = S.store.catalogueComplet().filter(function (r) {
        if (src === "equipe" && r.source === "membre") return false; if (src === "membres" && r.source !== "membre") return false; if (src === "tendances" && !r.tendance) return false;
        return !q || S.norm(r.titre).indexOf(S.norm(q)) >= 0;
      }).sort(function (a, b) { return a.titre.localeCompare(b.titre, "fr"); });
      zone.innerHTML = '<div class="outil-entete"><input class="champ" id="q-admin" style="max-width:320px" placeholder="Rechercher…" value="' + esc(q) + '"><div class="outil-actions"><button class="btn petit discret" id="export">Exporter (JSON)</button><a class="btn petit plein" href="' + R + '?vue=recettes&nouveau=1">Nouvelle recette</a></div></div>' +
        '<div class="types">' + [["", "Toutes"], ["equipe", "Équipe"], ["membres", "Membres"], ["tendances", "Tendances"]].map(function (o) { return '<a class="type-onglet' + (src === o[0] ? " actif" : "") + '" href="' + R + "?vue=recettes" + (o[0] ? "&src=" + o[0] : "") + '">' + o[1] + "</a>"; }).join("") + '<span class="compteur">' + tout.length + " recettes</span></div>" +
        '<div class="mini-liste">' + tout.map(function (r) {
          var sous = (r.source === "membre" ? "Par " + esc(r.auteurNom || "un membre") : "Équipe SAVORIA") + " · " + S.nutrition(r).kcal + " kcal" + (r.tendance ? " · Tendance" : "");
          return ligneRecette(r, '<button class="btn petit discret" data-tend="' + esc(r.id) + '">' + (r.tendance ? "Retirer tendance" : "Mettre en tendance") + '</button><a class="btn petit discret" href="' + R + "?vue=recettes&edit=" + encodeURIComponent(r.id) + '">Modifier</a><button class="btn petit danger" data-supprimer="' + esc(r.id) + '">Supprimer</button>', sous);
        }).join("") + "</div>";
      var tq; $("#q-admin").oninput = function (e) { clearTimeout(tq); tq = setTimeout(function () { history.replaceState(null, "", R + "?vue=recettes&q=" + encodeURIComponent(e.target.value) + (src ? "&src=" + src : "")); pages.coulisses.apres({ vue: "recettes", q: e.target.value, src: src }); var i = $("#q-admin"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 300); };
      $$("[data-tend]", zone).forEach(function (b) {
        b.onclick = function () {
          var r = S.store.recette(b.dataset.tend), n = {}; Object.keys(r).forEach(function (k) { if (k.charAt(0) !== "_") n[k] = r[k]; });
          if (n.tendance) delete n.tendance; else n.tendance = 1;
          delete n.statut; delete n.auteurNom;
          if (r.source === "membre") S.store.majSoumission(r.id, n) || S.store.sauverRecetteAdmin(n); else { delete n.source; S.store.sauverRecetteAdmin(n); }
          S.toast(n.tendance ? "Ajoutée aux tendances" : "Retirée des tendances"); S._garderScroll = true; pages.coulisses.apres(params);
        };
      });
      $$("[data-supprimer]", zone).forEach(function (b) {
        b.onclick = function () {
          modale('<h3>Supprimer cette recette ?</h3><p class="muted">Elle disparaîtra du site.</p><div class="pied"><button class="btn petit discret" data-fermer>Annuler</button><button class="btn petit danger" id="oks">Supprimer</button></div>', function (f) {
            $("#oks", f).onclick = function () { S.store.supprimerRecetteAdmin(b.dataset.supprimer); f.remove(); S.toast("Recette supprimée"); pages.coulisses.apres(params); };
          });
        };
      });
      $("#export").onclick = function () {
        var data = { equipe: S.store.recettesAdmin(), membres: S.store.soumissions().filter(function (s) { return s.statut === "publiee"; }) };
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "savoria-recettes.json"; a.click();
        S.toast("Export téléchargé");
      };
      return;
    }
    if (vue === "membres") {
      var mem = S.store.membres();
      zone.innerHTML = mem.length ? '<div class="table-admin"><table class="tableau"><thead><tr><th>Membre</th><th>Inscrit le</th><th>Favoris</th><th>Créations</th></tr></thead><tbody>' + mem.map(function (m) {
        return "<tr><td><strong>" + esc(m.nom) + '</strong><br><small class="muted">' + esc(m.email) + "</small></td><td>" + (m.cree ? new Date(m.cree).toLocaleDateString("fr-FR") : "—") + "</td><td>" + m.favoris.length + "</td><td>" + m.creations + "</td></tr>";
      }).join("") + "</tbody></table></div>" : '<div class="vide">Aucun membre pour le moment.</div>';
      zone.innerHTML += '<p class="muted note-maquette">Version maquette : seuls les comptes créés dans ce navigateur apparaissent ici.</p>';
    }
  };

  /* --- Pages légales --- */
  pages.mentions = function () {
    return '<div class="page"><div class="wrap texte-legal"><span class="sur-titre">Informations</span><h1>Mentions légales</h1>' +
      "<h2>Éditeur du site</h2><p>SAVORIA — site édité à titre personnel par [Nom et prénom de l'éditeur], [adresse ou email de contact].</p>" +
      "<h2>Hébergement</h2><p>GitHub Pages, GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.</p>" +
      "<h2>Contenus</h2><p>Les recettes sont fournies à titre informatif. Les photographies des plats sont générées par intelligence artificielle et peuvent différer légèrement du résultat obtenu.</p>" +
      "<h2>Allergènes</h2><p>Les informations sur les allergènes sont calculées à partir des ingrédients et données à titre indicatif. Elles ne remplacent pas la lecture des étiquettes des produits utilisés, ni l'avis d'un professionnel de santé.</p>" +
      "<h2>Visuels</h2><p>Le plat présenté en page d'accueil est une image générée par intelligence artificielle.</p></div></div>" + pied();
  };
  pages.confidentialite = function () {
    return '<div class="page"><div class="wrap texte-legal"><span class="sur-titre">Vos données</span><h1>Politique de confidentialité</h1>' +
      "<h2>Données collectées</h2><p>Prénom, adresse email, mot de passe (chiffré), profil culinaire (régime, aliments non aimés, ustensiles, niveau, temps, nombre de personnes), listes de recettes, recettes personnelles, notes, liste de courses, planning de la semaine et historique de l'assistant.</p>" +
      "<h2>Allergies et intolérances</h2><p>Ces informations sont des données de santé. Elles ne sont enregistrées qu'avec ton consentement explicite et servent uniquement à adapter les recettes proposées. Tu peux les supprimer à tout moment depuis ton profil.</p>" +
      "<h2>Où sont stockées les données ?</h2><p>Dans cette version maquette, toutes les données restent dans ton navigateur, sur ton appareil. Elles ne sont envoyées à aucun serveur.</p>" +
      "<h2>Tes droits</h2><p>Tu peux consulter, modifier et supprimer tes données à tout moment depuis « Mon espace », y compris supprimer définitivement ton compte. Pour toute question : [email de contact].</p>" +
      "<h2>Cookies</h2><p>SAVORIA n'utilise ni cookie publicitaire ni outil de suivi.</p></div></div>" + pied();
  };

  /* ---------- Interactions communes ---------- */
  function brancherCoeurs() {
    $$("[data-fav]").forEach(function (b) {
      b.onclick = function (e) {
        e.preventDefault(); if (!exigerCompte()) return;
        var id = b.dataset.fav, ajout;
        S.store.modifier(function (d) { var i = d.favoris.indexOf(id); ajout = i < 0; if (ajout) d.favoris.push(id); else d.favoris.splice(i, 1); });
        b.classList.toggle("actif", ajout); S.toast(ajout ? "Ajoutée à tes favoris" : "Retirée de tes favoris");
      };
    });
  }
  S.brancherCoeurs = brancherCoeurs;
  var obs = "IntersectionObserver" in window ? new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" }) : null;
  function reveler() { $$(".revele:not(.visible)").forEach(function (el) { if (obs) obs.observe(el); else el.classList.add("visible"); }); brancherCoeurs(); }

  /* ---------- Routeur ---------- */
  function router() {
    var h = location.hash.replace(/^#\/?/, ""), parts = h.split("?"), chemin = parts[0].split("/"), params = {};
    (parts[1] || "").split("&").forEach(function (kv) { if (!kv) return; var x = kv.split("="); params[decodeURIComponent(x[0])] = decodeURIComponent(x[1] || ""); });
    var nom = chemin[0] || "accueil", arg = chemin[1] ? decodeURIComponent(chemin[1]) : null;
    if (nom === S.CONFIG.routeAdmin) nom = "coulisses"; else if (nom === "coulisses") nom = "accueil";
    if (!pages[nom]) nom = "accueil";
    rendreHeader(nom);
    $("#app").innerHTML = pages[nom](params, arg);
    if (pages[nom].apres) pages[nom].apres(params, arg);
    reveler();
    if (!S._garderScroll) window.scrollTo(0, 0); S._garderScroll = false;
    document.title = nom === "recette" && S.store.recette(arg) ? S.store.recette(arg).titre + " — SAVORIA" : "SAVORIA — L'art de cuisiner, à votre image";
  }
  S.router = router;
  window.addEventListener("hashchange", router);
  document.addEventListener("DOMContentLoaded", function () { S.store.migrer(); router(); S.assistant && S.assistant.init(); });
})();
