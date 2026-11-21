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
    alerte: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" style="flex:none;margin-top:1px"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/></svg>'
  };
  S.ICO = ICO;

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
    var priv = r.statut === "privee" ? '<span class="pastille or">Ma recette</span>' : r.statut === "attente" ? '<span class="pastille alerte">En attente</span>' : "";
    return '<article class="carte revele">' +
      '<button class="coeur' + (estDans("favoris", r.id) ? " actif" : "") + '" data-fav="' + esc(r.id) + '" aria-label="Ajouter aux favoris">' + ICO.coeur + "</button>" +
      '<a href="#/recette/' + encodeURIComponent(r.id) + '" class="lien-photo">' + S.photoHTML(r) + tend + "</a>" +
      '<div class="corps"><a href="#/recette/' + encodeURIComponent(r.id) + '"><h3>' + esc(r.titre) + "</h3></a>" +
      '<div class="meta"><span>' + ICO.horloge + S.duree(r.temps) + "</span><span>" + ICO.toque + DIFF[r.diff] + "</span><span>" + ICO.pers + r.portions + " pers.</span></div>" +
      '<div class="pastilles">' + priv + al + "</div>" + alerte + "</div></article>";
  };

  /* ---------- Gabarit commun ---------- */
  function rendreHeader(route) {
    var u = S.store.utilisateur();
    var lien = function (h, t, r) { return '<a href="' + h + '" class="' + (route === r ? "actif" : "") + '">' + t + "</a>"; };
    $("#header").innerHTML = '<div class="wrap"><a href="#/" class="logo">SAVORIA</a>' +
      '<nav class="nav" id="nav">' + lien("#/", "Accueil", "accueil") + lien("#/recettes", "Recettes", "recettes") + lien("#/espace", "Mon espace", "espace") + (u ? (u.role === "admin" ? '<a href="#/admin" class="nav-mobile">Admin</a>' : "") + '<a href="#/" class="nav-mobile" id="deco-mobile">Déconnexion</a>' : '<a href="#/connexion" class="nav-mobile">Connexion</a>') + "</nav>" +
      '<div class="header-compte"><form class="recherche-entete" id="rech-entete" role="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input placeholder="Rechercher une recette…" aria-label="Rechercher une recette"></form>' +
      '<a class="btn-loupe" href="#/recettes" aria-label="Rechercher"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></a>' + (u ? '<span class="nom-compte">' + esc(u.nom) + (u.role === "admin" ? ' · <a class="lien-or" href="#/admin">Admin</a>' : "") + '</span><button class="btn petit discret" id="btn-deco">Déconnexion</button>'
        : '<a class="btn petit" href="#/connexion">Connexion</a>') +
      '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button></div></div>';
    $("#burger").onclick = function () { $("#nav").classList.toggle("ouvert"); };
    $("#rech-entete").onsubmit = function (e) { e.preventDefault(); etatCat.q = $("input", e.target).value.trim(); etatCat.cat = ""; etatCat.n = 12; go("#/recettes"); };
    var dm = $("#deco-mobile"); if (dm) dm.onclick = function (e) { e.preventDefault(); $("#btn-deco").click(); };
    var d = $("#btn-deco"); if (d) d.onclick = function () { S.store.deconnexion(); S.toast("À bientôt !"); S.assistant && S.assistant.rafraichir(); go("#/"); };
  }
  function pied() {
    return '<footer class="pied-site"><div class="wrap"><div><div class="logo">SAVORIA</div><p class="muted" style="margin:.6rem 0 0;font-size:.85rem">La cuisine qui s\'adapte à vous.</p></div>' +
      '<nav><a href="#/recettes">Recettes</a><a href="#/espace">Mon espace</a><a href="#/mentions">Mentions légales</a><a href="#/confidentialite">Confidentialité</a></nav>' +
      '<p class="avert">Les informations sur les allergènes sont données à titre indicatif. Les produits du commerce peuvent contenir des traces d\'allergènes : vérifie toujours les étiquettes. En cas d\'allergie sévère, demande l\'avis d\'un professionnel de santé.</p></div></footer>';
  }
  function go(h) { if (location.hash === h) router(); else location.hash = h; }
  S.go = go;

  /* ---------- Pages ---------- */
  var pages = {};

  pages.accueil = function () {
    var pub = S.store.publiques(), u = S.store.utilisateur();
    var cats = Object.keys(S.CATEGORIES).map(function (k) {
      var liste = pub.filter(function (r) { return r.cats.indexOf(k) >= 0; });
      var rep = liste.find(function (r) { return r.id === S.CATEGORIES[k].visuel; }) || liste.find(function (r) { return r.vedette; }) || liste[0] || { id: "x", titre: S.CATEGORIES[k].court };
      return '<a class="cat-carte revele" href="#/recettes?cat=' + k + '"><div class="visuel">' + S.photoHTML(Object.assign({}, rep, { titre: S.CATEGORIES[k].court }), k).replace('class="photo"', 'class="photo" style="height:100%"') + "</div>" +
        '<div class="contenu"><span class="nb">' + liste.length + " recettes</span><h3>" + S.CATEGORIES[k].court + "</h3><p>" + S.CATEGORIES[k].d + "</p></div></a>";
    }).join("");
    var saison = pub.filter(function (r) { return S.deSaison(r) && !r.tendance; });
    var sel = pub.filter(function (r) { return r.vedette; }).concat(pub.filter(function (r) { return !r.vedette && !r.tendance; }).sort(function (a, b) { return a.id < b.id ? -1 : 1; }).filter(function (_, i) { return i % 6 === 2; })).slice(0, 6);
    return '<section class="hero" id="hero"><div class="hero-scene"><div class="hero-halo"></div>' +
      '<div class="hero-grille wrap"><div class="hero-copy" id="hero-copy"><span class="sur-titre">Cuisinez · Explorez · Savourez</span>' +
      "<h1>L'art de cuisiner, <em>à votre image</em></h1>" +
      '<p class="lead">Des recettes premium qui s\'adaptent à vos allergies, à vos ustensiles et au temps dont vous disposez.</p>' +
      '<div class="hero-ctas"><a class="btn plein" href="#/recettes">Explorer les recettes</a>' + (u ? '<a class="btn discret" href="#/espace">Mon espace</a>' : '<a class="btn discret" href="#/connexion?mode=inscription">Créer mon profil</a>') + "</div>" +
      '<div class="hero-indice"><span class="souris"></span>Faites défiler</div></div>' +
      '<div class="hero-plat-zone" id="plat-zone"><div class="plat-persp"><div class="orbite"></div><div class="orbite b"></div>' +
      '<div class="plat" id="plat"><div class="plat-epaisseur"></div><div class="plat-photo" role="img" aria-label="Plat signature SAVORIA : filet de bœuf, purée et jus réduit"></div><div class="plat-reflet"></div></div><div class="plat-ombre"></div></div></div></div>' +
      '<div class="hero-phrases"><div class="hero-phrase" data-i="0">Des recettes pensées pour vous.</div><div class="hero-phrase" data-i="1">Vos allergies, vos ustensiles, votre temps.</div><div class="hero-phrase" data-i="2">Il ne reste plus qu\'à cuisiner.</div></div>' +
      '<div class="hero-progress"><i></i></div></div></section>' +
      '<section class="section" id="categories"><div class="wrap"><div class="centre revele"><span class="sur-titre">Explorer</span><h2>Que voulez-vous cuisiner ?</h2><hr class="filet centre"></div><div class="grille-cats">' + cats + "</div></div></section>" +
      '<section class="section rdj-section" style="padding-top:0"><div class="wrap"><div id="rdj"></div></div></section>' +
      '<section class="section" style="padding-top:0"><div class="wrap"><div class="revele" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:2.4rem"><div><span class="sur-titre">' + S.FLAMME + ' Vu sur TikTok</span><h2 style="margin:0">Les tendances du moment</h2></div><a class="btn" href="#/recettes?tendance=1">Toutes les tendances</a></div>' +
      '<div class="rangee-tendances">' + pub.filter(function (r) { return r.tendance; }).slice(0, 10).map(S.carteHTML).join("") + "</div></div></section>" +
      (saison.length ? '<section class="section" style="padding-top:0"><div class="wrap"><div class="revele" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;margin-bottom:2.4rem"><div><span class="sur-titre">' + S.FEUILLE + ' En ce moment</span><h2 style="margin:0">Les recettes ' + S.nomSaison() + '</h2></div><a class="btn" href="#/recettes?saison=1">Toutes les recettes de saison</a></div>' +
      '<div class="rangee-tendances">' + saison.slice(0, 10).map(S.carteHTML).join("") + "</div>" : '<section class="section" style="padding-top:0"><div class="wrap">') +

      '<div class="raccourcis-types revele">' + Object.keys(S.TYPES).map(function (k) { return '<a class="type-onglet" href="#/recettes?type=' + k + '">' + S.TYPES[k] + "</a>"; }).join("") + "</div></div></section>" + pied();
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
  var etatCat = { q: "", cat: "", type: "", tendance: false, saison: false, temps: "", diff: "", profil: false, ust: false, tri: "pertinence", n: 12 };
  S.etatCat = etatCat;
  var FLAMME = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 22c4.4 0 7-3 7-7 0-4.5-4-6.5-4.5-11-2.5 1.8-4 4.4-4 7-1.2-.8-2-2.2-2.2-3.6C6.200 9.300 5 11.800 5 15c0 4 2.600 7 7 7z"/></svg>';
  S.FLAMME = FLAMME;
  S.FEUILLE = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15zM5 19l8-8"/></svg>';
  function titreCatalogue() {
    if (etatCat.saison) return ["Recettes " + S.nomSaison(), "Les produits du moment, au meilleur de leur goût."];
    if (etatCat.tendance) return ["Tendances TikTok", "Les recettes virales du moment, testées et remises au propre."];
    if (etatCat.cat) return [S.CATEGORIES[etatCat.cat].n, S.CATEGORIES[etatCat.cat].d];
    if (etatCat.type) return [S.TYPES[etatCat.type], "Cherchez par nom, ingrédient ou envie."];
    return ["Toutes les recettes", "Cherchez par nom, ingrédient ou envie."];
  }
  pages.recettes = function (params) {
    if (params.cat !== undefined || params.type !== undefined || params.tendance !== undefined || params.saison !== undefined) {
      etatCat.cat = params.cat || ""; etatCat.type = params.type || ""; etatCat.tendance = params.tendance === "1"; etatCat.saison = params.saison === "1";
    }
    etatCat.n = 12;
    var co = !!S.store.utilisateur(), t = titreCatalogue();
    var opt = function (v, x, cur) { return '<option value="' + v + '"' + (String(cur) === String(v) ? " selected" : "") + ">" + x + "</option>"; };
    var types = [["", "Tout"]].concat(Object.keys(S.TYPES).map(function (k) { return [k, S.TYPES[k]]; }));
    return '<div class="page"><div class="wrap"><div class="entete-page"><span class="sur-titre">Le carnet</span><h1 id="titre-cat">' + t[0] + '</h1><p class="muted" id="desc-cat">' + t[1] + "</p></div>" +
      '<div class="types" id="f-types">' + types.map(function (x) { return '<button class="type-onglet' + (etatCat.type === x[0] ? " actif" : "") + '" data-type="' + x[0] + '">' + x[1] + "</button>"; }).join("") + "</div>" +
      '<div class="filtres"><input class="champ recherche" id="f-q" placeholder="Rechercher une recette ou un ingrédient…" value="' + esc(etatCat.q) + '">' +
      '<select class="champ" id="f-cat" aria-label="Catégorie">' + opt("", "Catégorie", etatCat.cat) + Object.keys(S.CATEGORIES).map(function (k) { return opt(k, S.CATEGORIES[k].court, etatCat.cat); }).join("") + "</select>" +
      '<select class="champ" id="f-temps" aria-label="Temps">' + opt("", "Temps", etatCat.temps) + opt(15, "15 min max", etatCat.temps) + opt(30, "30 min max", etatCat.temps) + opt(60, "1 h max", etatCat.temps) + opt(9999, "Plus d'1 h", etatCat.temps) + "</select>" +
      '<select class="champ" id="f-diff" aria-label="Difficulté">' + opt("", "Difficulté", etatCat.diff) + opt(1, "Facile", etatCat.diff) + opt(2, "Intermédiaire", etatCat.diff) + opt(3, "Confirmé", etatCat.diff) + "</select></div>" +
      '<div class="filtres-ligne2"><button class="puce puce-tendance' + (etatCat.tendance ? " actif" : "") + '" id="f-tendance">' + FLAMME + " Tendances TikTok</button>" + '<button class="puce puce-tendance puce-saison' + (etatCat.saison ? " actif" : "") + '" id="f-saison">' + S.FEUILLE + " De saison</button>" +
      (co ? '<button class="puce' + (etatCat.profil ? " actif" : "") + '" id="f-profil">Compatible avec mon profil</button><button class="puce' + (etatCat.ust ? " actif" : "") + '" id="f-ust">Avec mes ustensiles</button>'
        : '<span class="muted" style="font-size:.82rem"><a class="lien-or" href="#/connexion">Connecte-toi</a> pour filtrer selon tes allergies.</span>') +
      '<span class="compteur" id="compteur"></span><select class="champ tri" id="f-tri" aria-label="Trier">' + opt("pertinence", "Trier : pertinence", etatCat.tri) + opt("rapide", "Plus rapides", etatCat.tri) + opt("facile", "Plus faciles", etatCat.tri) + opt("az", "De A à Z", etatCat.tri) + "</select></div>" +
      '<div class="grille-recettes" id="grille"></div><div class="centre" style="margin-top:2.6rem"><button class="btn discret" id="plus">Voir plus de recettes</button></div></div></div>' + pied();
  };
  function filtrer() {
    var p = profil(), q = S.norm(etatCat.q);
    var l = S.store.pourMoi().filter(function (r) {
      if (etatCat.cat && r.cats.indexOf(etatCat.cat) < 0) return false;
      if (etatCat.type && r.type !== etatCat.type) return false;
      if (etatCat.tendance && !r.tendance) return false;
      if (etatCat.saison && !S.deSaison(r)) return false;
      if (etatCat.temps) { var t = +etatCat.temps; if (t === 9999 ? r.temps <= 60 : r.temps > t) return false; }
      if (etatCat.diff && r.diff !== +etatCat.diff) return false;
      if (q) {
        var txt = S.norm(r.titre + " " + (S.TYPES[r.type] || "") + " " + r.ing.map(function (i) { return S.nomIng(i, 1); }).join(" "));
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
    if (r.statut === "privee") s += 1;
    return s;
  }
  pages.recettes.apres = function () {
    function majUrl() {
      var q = []; if (etatCat.cat) q.push("cat=" + etatCat.cat); if (etatCat.type) q.push("type=" + etatCat.type); if (etatCat.tendance) q.push("tendance=1"); if (etatCat.saison) q.push("saison=1");
      history.replaceState(null, "", "#/recettes" + (q.length ? "?" + q.join("&") : ""));
      var t = titreCatalogue(); $("#titre-cat").textContent = t[0]; $("#desc-cat").textContent = t[1];
    }
    function rendre() {
      var l = filtrer();
      $("#compteur").textContent = l.length + " recette" + (l.length > 1 ? "s" : "");
      $("#grille").innerHTML = l.length ? l.slice(0, etatCat.n).map(S.carteHTML).join("") : '<div class="vide" style="grid-column:1/-1">Aucune recette ne correspond. Essaie d\'élargir tes filtres.</div>';
      $("#plus").style.display = l.length > etatCat.n ? "" : "none";
      reveler();
    }
    var tq; $("#f-q").oninput = function (e) { clearTimeout(tq); tq = setTimeout(function () { etatCat.q = e.target.value; etatCat.n = 12; rendre(); }, 200); };
    $("#f-cat").onchange = function (e) { etatCat.cat = e.target.value; etatCat.n = 12; majUrl(); rendre(); };
    $("#f-temps").onchange = function (e) { etatCat.temps = e.target.value; etatCat.n = 12; rendre(); };
    $("#f-diff").onchange = function (e) { etatCat.diff = e.target.value; etatCat.n = 12; rendre(); };
    $("#f-tri").onchange = function (e) { etatCat.tri = e.target.value; rendre(); };
    $$("#f-types [data-type]").forEach(function (b) {
      b.onclick = function () { etatCat.type = b.dataset.type; etatCat.n = 12; $$("#f-types [data-type]").forEach(function (x) { x.classList.toggle("actif", x === b); }); majUrl(); rendre(); };
    });
    $("#f-saison").onclick = function () { etatCat.saison = !etatCat.saison; etatCat.n = 12; this.classList.toggle("actif"); majUrl(); rendre(); };
    $("#f-tendance").onclick = function () { etatCat.tendance = !etatCat.tendance; etatCat.n = 12; this.classList.toggle("actif"); majUrl(); rendre(); };
    var fp = $("#f-profil"); if (fp) fp.onclick = function () { etatCat.profil = !etatCat.profil; fp.classList.toggle("actif"); rendre(); };
    var fu = $("#f-ust"); if (fu) fu.onclick = function () { etatCat.ust = !etatCat.ust; fu.classList.toggle("actif"); rendre(); };
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
    var tf = r._a.transformes.length;
    return '<section class="fiche-hero">' + S.photoHTML(r) + '<div class="contenu wrap"><span class="sur-titre">' + (r.tendance ? "Tendance TikTok · " : "") + (S.TYPES[r.type] ? S.TYPES[r.type] + " · " : "") + r.cats.map(function (k) { return S.CATEGORIES[k] ? S.CATEGORIES[k].court : k; }).join(" · ") + (r.statut === "privee" ? " · Ma recette" : "") + "</span><h1>" + esc(r.titre) + "</h1>" +
      (r.accroche ? '<p class="muted" style="max-width:640px;font-size:1.05rem">' + esc(r.accroche) + "</p>" : "") +
      '<div class="fiche-infos"><div><small>Temps total</small><strong>' + S.duree(r.temps) + "</strong></div><div><small>Préparation</small><strong>" + S.duree(r.prep || r.temps) + "</strong></div><div><small>Difficulté</small><strong>" + DIFF[r.diff] + "</strong></div><div><small>Base</small><strong>" + r.portions + " pers.</strong></div></div></div></section>" +
      '<div class="wrap"><div class="fiche-actions"><button class="btn plein" id="btn-cuisine">Mode cuisine</button><button class="btn discret" id="btn-courses"><span class="lg">Ajouter aux </span>courses</button><button class="btn discret" id="btn-planifier">Planifier</button>' +
      '<div class="actions-icones">' + btn("favoris", "Favori") + btn("aessayer", "À essayer") + btn("realisees", "Déjà réalisée") + ico("coll", "Ajouter à une collection", 'id="btn-coll"') + ico("partager", "Partager", 'id="btn-partager"') + "</div>" +
      (r.statut === "privee" ? '<a class="lien-or lien-modif" href="#/espace?t=mesrecettes&edit=' + encodeURIComponent(r.id) + '">Modifier</a>' : "") +
      (S.store.estAdmin() && r.statut !== "privee" ? '<a class="lien-or lien-modif" href="#/admin?edit=' + encodeURIComponent(r.id) + '">Modifier (admin)</a>' : "") + "</div>" +
      (alertes ? '<div style="display:flex;flex-direction:column;gap:.6rem;margin-top:1.4rem;max-width:760px">' + alertes + "</div>" : "") +
      '<div class="fiche-corps"><aside><div class="bloc"><div class="portions"><div><label class="lib" style="margin:0">Portions</label></div><div class="ctrl"><button id="moins" aria-label="Moins">−</button><strong id="nb-p">' + n + '</strong><button id="plusp" aria-label="Plus">+</button></div></div><ul class="liste-ing" id="liste-ing"></ul>' +
      (tf ? '<p class="muted" style="font-size:.74rem;margin:1rem 0 0">* Produit du commerce : vérifie la liste des allergènes sur l\'étiquette.</p>' : "") + "</div>" +
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
  var ONGLETS = [["profil", "Mon profil"], ["favoris", "Mes favoris"], ["realisees", "Déjà réalisées"], ["aessayer", "À essayer"], ["collections", "Mes collections"], ["mesrecettes", "Mes recettes"], ["planning", "Planning"], ["courses", "Courses"]];
  pages.espace = function (params) {
    var u = S.store.utilisateur(); if (!u) { setTimeout(function () { go("#/connexion"); }); return ""; }
    var d = S.store.donnees(), t = params.t || "favoris";
    var nb = { favoris: d.favoris.length, realisees: d.realisees.length, aessayer: d.aessayer.length, collections: d.collections.length, mesrecettes: d.mesRecettes.length, courses: (d.courses || []).filter(function (c) { return !c.coche; }).length };
    return '<div class="page"><div class="wrap"><div class="entete-page"><span class="sur-titre">Mon espace</span><h1>Bonjour ' + esc(u.nom) + "</h1></div>" +
      '<div class="onglets">' + ONGLETS.map(function (o) { return '<button data-t="' + o[0] + '" class="' + (t === o[0] ? "actif" : "") + '">' + o[1] + (nb[o[0]] !== undefined ? '<span class="nb">' + nb[o[0]] + "</span>" : "") + "</button>"; }).join("") + "</div>" +
      '<div id="contenu-espace"></div></div></div>' + pied();
  };
  pages.espace.apres = function (params) {
    if (!S.store.utilisateur()) return;
    var t = params.t || "favoris";
    $$(".onglets button").forEach(function (b) { b.onclick = function () { go("#/espace?t=" + b.dataset.t); }; });
    var zone = $("#contenu-espace");
    ({ profil: vueProfil, favoris: vueListe, realisees: vueListe, aessayer: vueListe, collections: vueCollections, mesrecettes: vueMesRecettes, planning: S.vuePlanning, courses: S.vueCourses })[t](zone, t, params);
  };

  function cases(nom, obj, coches) {
    return '<div class="cases">' + Object.keys(obj).map(function (k) { return '<label class="case"><input type="checkbox" name="' + nom + '" value="' + k + '"' + (coches.indexOf(k) >= 0 ? " checked" : "") + "><span>" + (obj[k].n || obj[k]) + "</span></label>"; }).join("") + "</div>";
  }
  function vueProfil(zone) {
    var d = S.store.donnees(), p = d.profil;
    zone.innerHTML = '<form id="f-profil" class="bloc" style="padding:2rem"><div class="form-grille">' +
      '<div class="plein"><label class="lib">Allergies et intolérances</label>' + cases("allergies", S.ALLERGENES, p.allergies) +
      '<label class="consent" style="margin-top:1rem"><input type="checkbox" name="consent"' + (d.consentement ? " checked" : "") + '><span>J\'accepte que SAVORIA enregistre mes allergies et intolérances (données de santé) pour adapter les recettes proposées. Je peux retirer ce consentement à tout moment en décochant mes allergies. <a class="lien-or" href="#/confidentialite">En savoir plus</a></span></label></div>' +
      '<div><label class="lib">Régime alimentaire</label><select class="champ" name="regime">' + Object.keys(S.REGIMES).map(function (k) { return '<option value="' + k + '"' + (p.regime === k ? " selected" : "") + ">" + S.REGIMES[k].n + "</option>"; }).join("") + "</select></div>" +
      '<div><label class="lib">Aliments que je n\'aime pas</label><input class="champ" name="refuses" value="' + esc(p.refuses.join(", ")) + '" placeholder="ex. coriandre, champignons"></div>' +
      '<div class="plein"><label class="lib">Mes ustensiles et appareils</label>' + cases("ustensiles", S.USTENSILES, p.ustensiles) + "</div>" +
      '<div><label class="lib">Mon niveau en cuisine</label><select class="champ" name="niveau">' + Object.keys(NIVEAUX).map(function (k) { return '<option value="' + k + '"' + (p.niveau === k ? " selected" : "") + ">" + NIVEAUX[k] + "</option>"; }).join("") + "</select></div>" +
      '<div><label class="lib">Temps habituellement disponible</label><select class="champ" name="temps">' + [[15, "15 minutes"], [30, "30 minutes"], [45, "45 minutes"], [60, "1 heure"], [120, "2 heures et plus"]].map(function (o) { return '<option value="' + o[0] + '"' + (+p.temps === o[0] ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select></div>" +
      '<div><label class="lib">Je cuisine pour</label><input class="champ" type="number" min="1" max="20" name="personnes" value="' + p.personnes + '"></div>' +
      '<div style="display:flex;align-items:flex-end"><button class="btn plein" style="width:100%">Enregistrer mon profil</button></div></div>' +
      '<p class="muted" id="err-p" style="color:#e58a82;font-size:.85rem;margin:.8rem 0 0"></p></form>' +
      '<div style="margin-top:2.5rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;align-items:center"><span class="muted" style="font-size:.85rem">Les recettes et l\'assistant s\'adaptent automatiquement à ce profil.</span><button class="btn petit danger" id="suppr-compte">Supprimer mon compte</button></div>';
    $("#f-profil").onsubmit = function (e) {
      e.preventDefault(); var fd = new FormData(e.target);
      var al = fd.getAll("allergies");
      if (al.length && !fd.get("consent")) { $("#err-p").textContent = "Pour enregistrer tes allergies, coche la case de consentement."; return; }
      S.store.modifier(function (d) {
        d.consentement = !!fd.get("consent") && al.length > 0;
        d.profil = { allergies: al, regime: fd.get("regime"), refuses: String(fd.get("refuses") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean), ustensiles: fd.getAll("ustensiles"), niveau: fd.get("niveau"), temps: +fd.get("temps"), personnes: Math.max(1, +fd.get("personnes") || 2) };
      });
      $("#err-p").textContent = ""; S.toast("Profil enregistré");
    };
    $("#suppr-compte").onclick = function () {
      modale('<h3>Supprimer mon compte ?</h3><p class="muted">Ton profil, tes listes, tes recettes et ton historique seront définitivement effacés.</p><div class="pied"><button class="btn petit discret" data-fermer>Annuler</button><button class="btn petit danger" id="ok-suppr">Supprimer</button></div>', function (f) {
        $("#ok-suppr", f).onclick = function () { S.store.supprimerCompte(); f.remove(); S.toast("Compte supprimé"); S.assistant && S.assistant.rafraichir(); go("#/"); };
      });
    };
  }
  function ligneRecette(r, actions) {
    return '<div class="ligne-item">' + S.photoHTML(r) + '<a class="titre" href="#/recette/' + encodeURIComponent(r.id) + '"><strong>' + esc(r.titre) + '</strong><small class="muted">' + S.duree(r.temps) + " · " + DIFF[r.diff] + '</small></a><div class="actions">' + actions + "</div></div>";
  }
  function vueListe(zone, t) {
    var d = S.store.donnees();
    var l = d[t].map(function (id) { return S.store.recette(id); }).filter(Boolean);
    var vides = { favoris: "Clique sur le cœur d'une recette pour la retrouver ici.", realisees: "Marque une recette « Déjà réalisée » depuis sa fiche.", aessayer: "Ajoute ici les recettes que tu veux préparer bientôt." };
    zone.innerHTML = l.length ? '<div class="grille-recettes">' + l.map(S.carteHTML).join("") + "</div>" : '<div class="vide">' + vides[t] + '<br><br><a class="btn petit" href="#/recettes">Parcourir les recettes</a></div>';
    reveler(); brancherCoeurs();
  }
  function vueCollections(zone, t, params) {
    var d = S.store.donnees();
    if (params.c) {
      var c = d.collections.find(function (x) { return x.id === params.c; });
      if (!c) { go("#/espace?t=collections"); return; }
      var l = c.recettes.map(function (id) { return S.store.recette(id); }).filter(Boolean);
      zone.innerHTML = '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.6rem"><a class="lien-or" href="#/espace?t=collections">← Collections</a><h2 style="margin:0;flex:1">' + esc(c.nom) + '</h2><button class="btn petit discret" id="ren">Renommer</button><button class="btn petit danger" id="sup">Supprimer</button></div>' +
        (l.length ? '<div class="mini-liste">' + l.map(function (r) { return ligneRecette(r, '<button class="btn petit discret" data-retirer="' + esc(r.id) + '">Retirer</button>'); }).join("") + "</div>" : '<div class="vide">Collection vide. Ajoute des recettes depuis leur fiche avec « + Collection ».</div>');
      $$("[data-retirer]", zone).forEach(function (b) { b.onclick = function () { S.store.modifier(function (d) { var cc = d.collections.find(function (x) { return x.id === c.id; }); cc.recettes = cc.recettes.filter(function (x) { return x !== b.dataset.retirer; }); }); router(); }; });
      $("#ren").onclick = function () {
        modale('<h3>Renommer la collection</h3><input class="champ" id="nn" value="' + esc(c.nom) + '"><div class="pied"><button class="btn petit discret" data-fermer>Annuler</button><button class="btn petit plein" id="okn">Valider</button></div>', function (f) {
          $("#okn", f).onclick = function () { var v = $("#nn", f).value.trim(); if (!v) return; S.store.modifier(function (d) { d.collections.find(function (x) { return x.id === c.id; }).nom = v; }); f.remove(); router(); };
        });
      };
      $("#sup").onclick = function () { S.store.modifier(function (d) { d.collections = d.collections.filter(function (x) { return x.id !== c.id; }); }); S.toast("Collection supprimée"); go("#/espace?t=collections"); };
      return;
    }
    zone.innerHTML = '<div style="display:flex;gap:.6rem;margin-bottom:1.8rem;max-width:520px"><input class="champ" id="nc" placeholder="Nom de la nouvelle collection"><button class="btn" id="cc">Créer</button></div>' +
      (d.collections.length ? '<div class="collections">' + d.collections.map(function (c) { return '<a class="coll-carte" href="#/espace?t=collections&c=' + c.id + '"><h4>' + esc(c.nom) + '</h4><span class="muted" style="font-size:.82rem">' + c.recettes.length + " recette" + (c.recettes.length > 1 ? "s" : "") + "</span></a>"; }).join("") + "</div>" : '<div class="vide">Crée des collections pour organiser tes recettes comme tu veux : « Repas de fête », « Batch cooking »…</div>');
    $("#cc").onclick = function () { var v = $("#nc").value.trim(); if (!v) return; S.store.modifier(function (d) { d.collections.push({ id: "c" + Date.now(), nom: v, recettes: [] }); }); S.toast("Collection créée"); router(); };
  }

  /* --- Formulaire recette (client et admin) --- */
  function ingVersTexte(r) {
    return (r.ing || []).map(function (i) {
      var q = i[0] === null || i[0] === undefined || i[0] === "" ? "" : String(i[0]).replace(".", ",");
      var nom = i[4] ? i[3] : (S.ING[i[2]] ? S.ING[i[2]].n : i[3]) + (i[3] && !i[4] ? " (" + i[3] + ")" : "");
      return (q + " " + (i[1] || "") + " " + nom).replace(/\s+/g, " ").trim();
    }).join("\n");
  }
  var RE_UNITE = /^(\d+(?:[.,]\d+)?|\d+\/\d+|½|¼|¾)?\s*(kg|g|ml|cl|l|c\.?\s?à\s?s\.?|cs|c\.?\s?à\s?c\.?|cc|pincées?|brins?)?\.?\s+(?:de\s+|d['’]\s*)?(.+)$/i;
  function parserIng(txt) {
    return txt.split("\n").map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
      var m = l.match(RE_UNITE), q = null, u = "", reste = l;
      if (m && (m[1] || m[2])) {
        var qs = m[1] || "";
        q = qs === "½" ? .5 : qs === "¼" ? .25 : qs === "¾" ? .75 : qs.indexOf("/") > 0 ? (+qs.split("/")[0] / +qs.split("/")[1]) : qs ? parseFloat(qs.replace(",", ".")) : null;
        var uu = (m[2] || "").toLowerCase().replace(/\s/g, "");
        u = uu === "l" ? "L" : /^c\.?às|^cs/.test(uu) ? "c. à s." : /^c\.?àc|^cc/.test(uu) ? "c. à c." : /^pinc/.test(uu) ? "pincée" : /^brin/.test(uu) ? "brins" : uu;
        reste = m[3];
      } else if (/^\d/.test(l)) { var mm = l.match(/^(\d+(?:[.,]\d+)?)\s+(.+)$/); if (mm) { q = parseFloat(mm[1].replace(",", ".")); reste = mm[2]; } }
      var k = S.detectIngredients(reste)[0] || null;
      return [q, u, k, reste, 1];
    });
  }
  function formRecette(r, admin) {
    r = r || { cats: [], ust: [], ing: [], etapes: [], temps: 30, prep: 15, diff: 1, portions: 4 };
    return '<form id="f-rec" class="bloc" style="padding:2rem"><div class="form-grille">' +
      '<div class="plein"><label class="lib">Nom de la recette</label><input class="champ" name="titre" required value="' + esc(r.titre || "") + '"></div>' +
      '<div class="plein"><label class="lib">Phrase de présentation (facultatif)</label><input class="champ" name="accroche" value="' + esc(r.accroche || "") + '"></div>' +
      '<div class="plein"><label class="lib">Catégories (plusieurs possibles)</label>' + cases("cats", S.CATEGORIES, r.cats) + "</div>" +
      '<div><label class="lib">Type de plat</label><select class="champ" name="type">' + Object.keys(S.TYPES).map(function (k) { return '<option value="' + k + '"' + ((r.type || "plat") === k ? " selected" : "") + ">" + S.TYPES[k] + "</option>"; }).join("") + "</select></div>" +
      (admin ? '<div style="display:flex;align-items:flex-end"><label class="consent"><input type="checkbox" name="tendance"' + (r.tendance ? " checked" : "") + '><span>Tendance TikTok (badge + section de l\'accueil)</span></label></div>' : '<div></div>') +
      '<div><label class="lib">Temps total (minutes)</label><input class="champ" type="number" min="1" name="temps" required value="' + r.temps + '"></div>' +
      '<div><label class="lib">Préparation (minutes)</label><input class="champ" type="number" min="1" name="prep" required value="' + (r.prep || r.temps) + '"></div>' +
      '<div><label class="lib">Difficulté</label><select class="champ" name="diff">' + [1, 2, 3].map(function (k) { return '<option value="' + k + '"' + (r.diff === k ? " selected" : "") + ">" + DIFF[k] + "</option>"; }).join("") + "</select></div>" +
      '<div><label class="lib">Nombre de personnes</label><input class="champ" type="number" min="1" name="portions" required value="' + r.portions + '"></div>' +
      '<div class="plein"><label class="lib">Ustensiles nécessaires</label>' + cases("ust", S.USTENSILES, r.ust) + "</div>" +
      '<div class="plein"><label class="lib">Ingrédients — un par ligne (ex. « 200 g farine », « 3 œufs »)</label><textarea class="champ" name="ing" rows="8" required>' + esc(ingVersTexte(r)) + '</textarea><div id="apercu-ing" style="margin-top:.6rem"></div></div>' +
      '<div class="plein"><label class="lib">Étapes — une par ligne</label><textarea class="champ" name="etapes" rows="7" required>' + esc((r.etapes || []).join("\n")) + "</textarea></div>" +
      '<div class="plein"><label class="lib">Photo du plat' + (admin ? " (ou fichier images/recettes/&lt;id&gt;.webp sur GitHub)" : " (obligatoire)") + '</label><input type="file" accept="image/*" name="photo" class="champ"' + (!admin && !r.photo ? " required" : "") + ">" + (r.photo ? '<p class="muted" style="font-size:.8rem;margin:.5rem 0 0">Une photo est déjà enregistrée. Choisis un fichier pour la remplacer.</p>' : "") + "</div>" +
      (admin ? '<div><label class="lib">Statut</label><select class="champ" name="statut"><option value="publiee"' + (r.statut !== "attente" ? " selected" : "") + '>Publiée</option><option value="attente"' + (r.statut === "attente" ? " selected" : "") + ">En attente de validation</option></select></div>" +
        '<div><label class="lib">Identifiant (nom du fichier photo)</label><input class="champ" name="id" value="' + esc(r.id || "") + '" placeholder="généré automatiquement"' + (r.id ? " readonly" : "") + "></div>" : "") +
      '<div class="plein" style="display:flex;gap:.6rem;justify-content:flex-end;flex-wrap:wrap"><button type="button" class="btn discret" id="annuler-rec">Annuler</button><button class="btn plein">Enregistrer la recette</button></div></div>' +
      '<p id="err-r" style="color:#e58a82;font-size:.85rem;margin:.8rem 0 0"></p></form>';
  }
  function apercuIng(f) {
    var lignes = parserIng($("[name=ing]", f).value);
    var inc = lignes.filter(function (l) { return !l[2]; }).map(function (l) { return l[3]; });
    var al = S.allergenesDe(lignes.map(function (l) { return l[2]; }).filter(Boolean));
    $("#apercu-ing", f).innerHTML = (al.contient.length ? '<div class="bandeau-info" style="margin-bottom:.4rem">Allergènes détectés : ' + al.contient.map(function (a) { return S.ALLERGENES[a]; }).join(", ") + (al.traces.length ? " · traces possibles : " + al.traces.map(function (a) { return S.ALLERGENES[a]; }).join(", ") : "") + "</div>" : "") +
      (inc.length ? '<div class="bandeau-alerte">' + ICO.alerte + "<span>Ingrédients non reconnus (allergènes non vérifiés) : " + inc.map(esc).join(", ") + "</span></div>" : "");
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
    var t; $("[name=ing]", f).oninput = function () { clearTimeout(t); t = setTimeout(function () { apercuIng(f); }, 250); }; apercuIng(f);
    $("#annuler-rec", f).onclick = surFin;
    f.onsubmit = async function (e) {
      e.preventDefault(); var fd = new FormData(f);
      if (!fd.getAll("cats").length) { $("#err-r", f).textContent = "Choisis au moins une catégorie."; return; }
      var n = Object.assign({}, r || {});
      ["_a", "_keys", "_inconnus"].forEach(function (k) { delete n[k]; });
      n.titre = fd.get("titre").trim(); n.accroche = (fd.get("accroche") || "").trim(); n.cats = fd.getAll("cats"); n.type = fd.get("type") || "plat"; if (admin) { if (fd.get("tendance")) n.tendance = 1; else delete n.tendance; }
      n.temps = +fd.get("temps"); n.prep = +fd.get("prep"); n.diff = +fd.get("diff"); n.portions = +fd.get("portions");
      n.ust = fd.getAll("ust"); n.ing = parserIng(fd.get("ing")); n.etapes = String(fd.get("etapes")).split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
      var file = fd.get("photo");
      if (file && file.size) { try { n.photo = await lirePhoto(file); } catch (er) { $("#err-r", f).textContent = "Impossible de lire cette image."; return; } }
      if (admin) {
        n.statut = fd.get("statut");
        if (!n.id) { n.id = (fd.get("id") || "").trim() ? slug(fd.get("id")) : slug(n.titre); if (S.store.catalogueComplet().some(function (x) { return x.id === n.id; })) n.id += "-" + Date.now().toString(36).slice(-4); }
        if (!S.store.sauverRecetteAdmin(n)) return;
        S.toast(n.statut === "publiee" ? "Recette publiée" : "Recette mise en attente");
      } else {
        if (!n.photo) { $("#err-r", f).textContent = "Ajoute une photo du plat."; return; }
        if (!n.id) n.id = "perso-" + Date.now().toString(36);
        var ok = S.store.modifier(function (d) { d.mesRecettes = d.mesRecettes.filter(function (x) { return x.id !== n.id; }); d.mesRecettes.push(n); });
        if (!ok) return; S.toast("Recette enregistrée dans ton espace");
      }
      surFin();
    };
  }
  function vueMesRecettes(zone, t, params) {
    var d = S.store.donnees();
    if (params.edit || params.nouveau) {
      var r = params.edit ? d.mesRecettes.find(function (x) { return x.id === params.edit; }) : null;
      zone.innerHTML = '<h2 style="margin-bottom:1.4rem">' + (r ? "Modifier ma recette" : "Ajouter une recette") + '</h2><p class="muted" style="margin-top:-.6rem;margin-bottom:1.6rem">Elle restera privée : toi seul pourras la voir.</p>' + formRecette(r, false);
      brancherForm($("#f-rec"), r, false, function () { go("#/espace?t=mesrecettes"); });
      return;
    }
    var l = S.store.privees();
    zone.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.8rem"><p class="muted" style="margin:0">Tes recettes personnelles, visibles uniquement par toi.</p><a class="btn plein" href="#/espace?t=mesrecettes&nouveau=1">+ Ajouter une recette</a></div>' +
      (l.length ? '<div class="mini-liste">' + l.map(function (r) { return ligneRecette(r, '<a class="btn petit discret" href="#/espace?t=mesrecettes&edit=' + encodeURIComponent(r.id) + '">Modifier</a><button class="btn petit danger" data-suppr="' + esc(r.id) + '">Supprimer</button>'); }).join("") + "</div>" : '<div class="vide">Tu n\'as pas encore ajouté de recette.</div>');
    $$("[data-suppr]", zone).forEach(function (b) {
      b.onclick = function () { S.store.modifier(function (d) { d.mesRecettes = d.mesRecettes.filter(function (x) { return x.id !== b.dataset.suppr; }); ["favoris", "aessayer", "realisees"].forEach(function (k) { d[k] = d[k].filter(function (x) { return x !== b.dataset.suppr; }); }); }); S.toast("Recette supprimée"); router(); };
    });
  }

  /* --- Administration --- */
  pages.admin = function () {
    if (!S.store.estAdmin()) { setTimeout(function () { go("#/"); }); return ""; }
    return '<div class="page"><div class="wrap"><div class="entete-page"><span class="sur-titre">Administration</span><h1>Gérer les recettes</h1></div><div id="zone-admin"></div></div></div>' + pied();
  };
  pages.admin.apres = function (params) {
    if (!S.store.estAdmin()) return;
    var zone = $("#zone-admin");
    if (params.edit || params.nouveau) {
      var r = params.edit ? S.store.catalogueComplet().find(function (x) { return x.id === params.edit; }) : null;
      zone.innerHTML = '<p><a class="lien-or" href="#/admin">← Retour</a></p><h2 style="margin:1rem 0 1.4rem">' + (r ? "Modifier : " + esc(r.titre) : "Nouvelle recette") + "</h2>" + formRecette(r, true);
      brancherForm($("#f-rec"), r, true, function () { go("#/admin"); });
      return;
    }
    var tout = S.store.catalogueComplet(), att = tout.filter(function (r) { return r.statut === "attente"; });
    var q = params.q || "";
    var liste = tout.filter(function (r) { return !q || S.norm(r.titre).indexOf(S.norm(q)) >= 0; }).sort(function (a, b) { return a.titre.localeCompare(b.titre); });
    zone.innerHTML = '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-bottom:2rem"><a class="btn plein" href="#/admin?nouveau=1">+ Nouvelle recette</a><button class="btn discret" id="export">Exporter les recettes (JSON)</button></div>' +
      '<h3>En attente de validation <span class="muted" style="font-size:1rem">(' + att.length + ")</span></h3>" +
      (att.length ? '<div class="mini-liste" style="margin-bottom:2.6rem">' + att.map(function (r) { return ligneRecette(r, '<a class="btn petit discret" href="#/recette/' + encodeURIComponent(r.id) + '">Relire</a><button class="btn petit plein" data-valider="' + esc(r.id) + '">Valider</button>'); }).join("") + "</div>" : '<p class="muted" style="margin-bottom:2.6rem">Aucune recette en attente.</p>') +
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1rem"><h3 style="margin:0">Toutes les recettes <span class="muted" style="font-size:1rem">(' + tout.length + ')</span></h3><input class="champ" id="q-admin" style="max-width:300px" placeholder="Filtrer…" value="' + esc(q) + '"></div>' +
      '<div class="mini-liste">' + liste.map(function (r) { return ligneRecette(r, (r.statut === "attente" ? '<span class="pastille alerte">En attente</span>' : "") + '<a class="btn petit discret" href="#/admin?edit=' + encodeURIComponent(r.id) + '">Modifier</a><button class="btn petit danger" data-supprimer="' + esc(r.id) + '">Supprimer</button>'); }).join("") + "</div>";
    $$("[data-valider]", zone).forEach(function (b) { b.onclick = function () { var r = tout.find(function (x) { return x.id === b.dataset.valider; }); var n = Object.assign({}, r, { statut: "publiee" }); ["_a", "_keys", "_inconnus", "source"].forEach(function (k) { delete n[k]; }); S.store.sauverRecetteAdmin(n); S.toast("Recette publiée"); router(); }; });
    $$("[data-supprimer]", zone).forEach(function (b) {
      b.onclick = function () {
        modale('<h3>Supprimer cette recette ?</h3><p class="muted">Elle disparaîtra du site.</p><div class="pied"><button class="btn petit discret" data-fermer>Annuler</button><button class="btn petit danger" id="oks">Supprimer</button></div>', function (f) {
          $("#oks", f).onclick = function () { S.store.supprimerRecetteAdmin(b.dataset.supprimer); f.remove(); S.toast("Recette supprimée"); router(); };
        });
      };
    });
    var tq; $("#q-admin").oninput = function (e) { clearTimeout(tq); tq = setTimeout(function () { history.replaceState(null, "", "#/admin?q=" + encodeURIComponent(e.target.value)); pages.admin.apres({ q: e.target.value }); var i = $("#q-admin"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 300); };
    $("#export").onclick = function () {
      var data = S.store.recettesAdmin();
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "savoria-recettes-admin.json"; a.click();
      S.toast(data.length + " recette(s) exportée(s)");
    };
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
  document.addEventListener("DOMContentLoaded", function () { router(); S.assistant && S.assistant.init(); });
})();
