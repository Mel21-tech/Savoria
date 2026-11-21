/* SAVORIA — Outils du quotidien : liste de courses, planning, mode cuisine, partage, saisons, recette du jour */
window.S = window.S || {};
(function () {
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var esc = function (s) { return S.esc(s); };

  /* ---------- Rayons du supermarché ---------- */
  var RAYONS = [
    ["fl", "Fruits & légumes", "oignon echalote ail carotte poivron tomate tomate_cerise courgette aubergine champignon pomme_de_terre patate_douce epinards concombre avocat laitue poireau navet celeri gingembre citron citron_vert banane mangue pomme fruits_rouges fraises cerises courge oignon_rouge haricots_verts piment_frais thym romarin persil ciboulette aneth menthe coriandre basilic germes_soja"],
    ["bo", "Boucherie", "lardons jambon poulet poulet_entier poulet_cuisses boeuf boeuf_hache filet_boeuf veau os_moelle agneau chorizo merguez boeuf_joue"],
    ["po", "Poissonnerie", "saumon saumon_cru cabillaud crevettes moules saumon_fume"],
    ["cr", "Crèmerie & frais", "oeuf jaune_oeuf beurre lait creme parmesan emmental feta mascarpone yaourt cottage fromage_frais mozzarella cheddar reblochon margarine creme_vegetale yaourt_vegetal tofu pate_brisee pate_feuilletee pate_sablee pate_pizza"],
    ["bl", "Boulangerie", "pain pain_mie pain_burger pain_brioche tortilla"],
    ["es", "Épicerie salée", ""],
    ["su", "Épicerie sucrée", "sucre cassonade miel sirop_erable chocolat pepites_chocolat cacao vanille gelatine agar farine farine_riz fecule levure_boulanger levure_chimique flocons_avoine sucre_glace speculoos biscuits_cuillere biscuits_sables creme_pistache kadaif amandes noix beurre_cacahuete graines_chia compote cafe cannelle"],
    ["sg", "Surgelés", "petits_pois edamame"],
    ["bs", "Boissons & alcools", "vin_rouge vin_blanc cognac vodka boisson_avoine boisson_riz"],
    ["pl", "Dans tes placards", "sel poivre huile huile_olive eau"]
  ];
  var RAYON_DE = {};
  RAYONS.forEach(function (r) { r[2].split(" ").filter(Boolean).forEach(function (k) { RAYON_DE[k] = r[0]; }); });
  function rayonDe(k) { return RAYON_DE[k] || "es"; }

  /* ---------- Saisons (France) : mois où l'ingrédient frais est de saison ---------- */
  var SAISON = {
    tomate: [6, 7, 8, 9], tomate_cerise: [6, 7, 8, 9], courgette: [6, 7, 8, 9], aubergine: [7, 8, 9], poivron: [7, 8, 9, 10],
    concombre: [5, 6, 7, 8, 9], fraises: [5, 6, 7], cerises: [6, 7], fruits_rouges: [6, 7, 8, 9], haricots_verts: [7, 8, 9],
    petits_pois: [5, 6, 7], laitue: [5, 6, 7, 8, 9], courge: [9, 10, 11, 12, 1], poireau: [10, 11, 12, 1, 2, 3], navet: [10, 11, 12, 1, 2, 3],
    pomme: [9, 10, 11, 12, 1, 2, 3], champignon: [9, 10, 11], epinards: [3, 4, 5, 9, 10, 11], celeri: [9, 10, 11, 12],
    patate_douce: [10, 11, 12, 1, 2], mangue: [], avocat: [11, 12, 1, 2, 3, 4], citron: [12, 1, 2, 3]
  };
  S.deSaison = function (r, mois) {
    mois = mois || (new Date().getMonth() + 1);
    var dans = false;
    for (var i = 0; i < r._keys.length; i++) {
      var s = SAISON[r._keys[i]]; if (!s) continue;
      if (s.indexOf(mois) < 0) return false;
      dans = true;
    }
    return dans;
  };
  S.nomSaison = function () {
    var m = new Date().getMonth() + 1;
    return m <= 2 || m === 12 ? "d'hiver" : m <= 5 ? "de printemps" : m <= 8 ? "d'été" : "d'automne";
  };

  /* ---------- Recette du jour ---------- */
  S.recetteDuJour = function (cb) {
    var l = S.store.publiques().filter(function (r) { return r.type !== "accompagnement"; }).sort(function (a, b) { return a.id < b.id ? -1 : 1; });
    if (!l.length) return;
    var d = new Date(), seed = d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate();
    var start = (seed * 2654435761 >>> 0) % l.length, essai = 0;
    (function tester() {
      var r = l[(start + essai) % l.length], img = new Image(), exts = [".jpg", ".webp", ".png"], e = 0;
      if (r.photo) return cb(r);
      img.onload = function () { cb(r); };
      img.onerror = function () { e++; if (e < exts.length) img.src = "images/recettes/" + r.id + exts[e]; else if (++essai < 10) tester(); else cb(l[start]); };
      img.src = "images/recettes/" + r.id + exts[0];
    })();
  };

  /* ---------- Liste de courses ---------- */
  function base(q, u) {
    if (u === "kg") return [q * 1000, "g"]; if (u === "L") return [q * 1000, "ml"]; if (u === "cl") return [q * 10, "ml"];
    return [q, u];
  }
  S.ajouterAuxCourses = function (r, n) {
    var f = n / r.portions, ajoutes = 0;
    S.store.modifier(function (d) {
      r.ing.forEach(function (i) {
        var cle = i[2] && !i[4] ? i[2] : "t:" + S.norm(i[3] || ""), b = i[0] === null || i[0] === undefined || i[0] === "" ? [null, i[1] || ""] : base(i[0] * f, i[1] || "");
        var ex = d.courses.find(function (c) { return c.cle === cle && c.u === b[1] && !c.coche; });
        if (ex) { if (b[0] !== null) ex.q = (ex.q || 0) + b[0]; if (ex.src.indexOf(r.titre) < 0) ex.src.push(r.titre); }
        else d.courses.push({ id: "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), cle: cle, nom: i[2] && !i[4] ? null : (i[3] || ""), q: b[0], u: b[1], rayon: i[2] ? rayonDe(i[2]) : "es", coche: false, src: [r.titre] });
        ajoutes++;
      });
    });
    return ajoutes;
  };
  function libelle(c) {
    var ing = S.ING[c.cle];
    var nom = c.nom || (ing ? ((c.u === "" && c.q > 1 && ing.pl) ? ing.pl : ing.n) : "");
    var q = c.q === null || c.q === undefined ? "" : (c.u === "" ? String(Math.max(1, Math.ceil(c.q - .01))) : S.qte(c.q, c.u, 1));
    return { q: q, nom: nom };
  }
  S.vueCourses = function (zone) {
    var d = S.store.donnees(), l = d.courses;
    var restants = l.filter(function (c) { return !c.coche; }).length;
    var html = '<div class="outil-entete"><p class="muted">' + (l.length ? restants + " article" + (restants > 1 ? "s" : "") + " à acheter" : "Ta liste est vide.") + '</p><div class="outil-actions">' +
      (l.some(function (c) { return c.coche; }) ? '<button class="btn petit discret" id="crs-retirer">Retirer les articles cochés</button>' : "") +
      (l.length ? '<button class="btn petit discret" id="crs-vider">Tout effacer</button>' : "") + "</div></div>" +
      '<form class="ajout-article" id="crs-ajout"><input class="champ" placeholder="Ajouter un article (ex. papier cuisson)" aria-label="Ajouter un article"><button class="btn petit">Ajouter</button></form>';
    if (!l.length) {
      html += '<div class="vide">Ajoute les ingrédients d\'une recette depuis sa fiche, ou génère toute ta semaine depuis le planning.<br><br><a class="btn petit" href="#/espace?t=planning">Ouvrir mon planning</a></div>';
    } else {
      html += '<div class="rayons">' + RAYONS.map(function (ry) {
        var items = l.filter(function (c) { return c.rayon === ry[0]; });
        if (!items.length) return "";
        items.sort(function (a, b) { return (a.coche - b.coche) || libelle(a).nom.localeCompare(libelle(b).nom, "fr"); });
        return '<section class="rayon' + (ry[0] === "pl" ? " placard" : "") + '"><h4>' + ry[1] + "</h4><ul>" + items.map(function (c) {
          var lb = libelle(c);
          return '<li class="' + (c.coche ? "coche" : "") + '"><label><input type="checkbox" data-coche="' + c.id + '"' + (c.coche ? " checked" : "") + '><span class="case-ronde"></span><span class="crs-nom">' + esc(lb.nom) + "</span>" + (lb.q ? '<span class="crs-q">' + esc(lb.q) + "</span>" : "") + "</label>" +
            '<button class="crs-suppr" data-suppr="' + c.id + '" aria-label="Supprimer">×</button></li>';
        }).join("") + "</ul></section>";
      }).join("") + "</div>";
    }
    zone.innerHTML = html;
    function maj(fn) { S.store.modifier(fn); S.vueCourses(zone); }
    $$("[data-coche]", zone).forEach(function (cb) { cb.onchange = function () { maj(function (d) { var c = d.courses.find(function (x) { return x.id === cb.dataset.coche; }); if (c) c.coche = cb.checked; }); }; });
    $$("[data-suppr]", zone).forEach(function (b) { b.onclick = function () { maj(function (d) { d.courses = d.courses.filter(function (x) { return x.id !== b.dataset.suppr; }); }); }; });
    var rt = $("#crs-retirer", zone); if (rt) rt.onclick = function () { maj(function (d) { d.courses = d.courses.filter(function (x) { return !x.coche; }); }); };
    var vd = $("#crs-vider", zone); if (vd) vd.onclick = function () { maj(function (d) { d.courses = []; }); S.toast("Liste effacée"); };
    $("#crs-ajout", zone).onsubmit = function (e) {
      e.preventDefault(); var v = $("input", e.target).value.trim(); if (!v) return;
      var k = S.detectIngredients(v)[0];
      maj(function (d) { d.courses.push({ id: "c" + Date.now().toString(36), cle: "t:" + S.norm(v), nom: v, q: null, u: "", rayon: k ? rayonDe(k) : "es", coche: false, src: [] }); });
    };
  };

  /* ---------- Planning de la semaine ---------- */
  var JOURS = [["lun", "Lundi"], ["mar", "Mardi"], ["mer", "Mercredi"], ["jeu", "Jeudi"], ["ven", "Vendredi"], ["sam", "Samedi"], ["dim", "Dimanche"]];
  function personnes() { var d = S.store.donnees(); return (d && d.profil.personnes) || 2; }
  S.planifier = function (id, n) {
    var r = S.store.recette(id); if (!r) return;
    S.modale('<h3>Planifier « ' + esc(r.titre) + ' »</h3><p class="muted" style="margin-top:-.4rem">Choisis le jour.</p><div class="choix-jours">' +
      JOURS.map(function (j) { return '<button class="type-onglet" data-jour="' + j[0] + '">' + j[1] + "</button>"; }).join("") + "</div>" +
      '<div class="pied"><button class="btn petit discret" data-fermer>Annuler</button></div>', function (f) {
        $$("[data-jour]", f).forEach(function (b) {
          b.onclick = function () {
            S.store.modifier(function (d) { (d.planning[b.dataset.jour] = d.planning[b.dataset.jour] || []).push({ id: id, n: n || personnes() }); });
            f.remove(); S.toast("Ajoutée au planning de " + b.textContent.toLowerCase());
          };
        });
      });
  };
  S.vuePlanning = function (zone) {
    var d = S.store.donnees(), pl = d.planning, total = 0;
    JOURS.forEach(function (j) { total += (pl[j[0]] || []).length; });
    var auj = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"][new Date().getDay()];
    zone.innerHTML = '<div class="outil-entete"><p class="muted">' + (total ? total + " repas prévu" + (total > 1 ? "s" : "") + " cette semaine" : "Organise tes repas de la semaine.") + '</p><div class="outil-actions">' +
      (total ? '<button class="btn petit plein" id="pl-courses">Générer la liste de courses</button><button class="btn petit discret" id="pl-vider">Vider la semaine</button>' : "") + "</div></div>" +
      '<div class="semaine">' + JOURS.map(function (j) {
        var l = pl[j[0]] || [];
        return '<div class="jour' + (j[0] === auj ? " auj" : "") + '"><div class="jour-tete"><strong>' + j[1] + "</strong>" + (j[0] === auj ? "<small>Aujourd'hui</small>" : "") + "</div>" +
          l.map(function (x, i) {
            var r = S.store.recette(x.id); if (!r) return "";
            return '<div class="repas"><a href="#/recette/' + encodeURIComponent(r.id) + '">' + S.photoHTML(r) + "<span>" + esc(r.titre) + "<small>" + x.n + " pers. · " + S.duree(r.temps) + "</small></span></a>" +
              '<button class="crs-suppr" data-retirer="' + j[0] + ":" + i + '" aria-label="Retirer">×</button></div>';
          }).join("") +
          '<button class="ajout-repas" data-ajout="' + j[0] + '">+ Ajouter</button></div>';
      }).join("") + "</div>";
    $$("[data-retirer]", zone).forEach(function (b) {
      b.onclick = function () { var p = b.dataset.retirer.split(":"); S.store.modifier(function (d) { d.planning[p[0]].splice(+p[1], 1); }); S.vuePlanning(zone); };
    });
    $$("[data-ajout]", zone).forEach(function (b) { b.onclick = function () { choisirRecette(b.dataset.ajout, zone); }; });
    var c = $("#pl-courses", zone); if (c) c.onclick = function () {
      var nb = 0;
      JOURS.forEach(function (j) { (S.store.donnees().planning[j[0]] || []).forEach(function (x) { var r = S.store.recette(x.id); if (r) { S.ajouterAuxCourses(r, x.n); nb++; } }); });
      S.toast(nb + " recette" + (nb > 1 ? "s" : "") + " ajoutée" + (nb > 1 ? "s" : "") + " à ta liste de courses"); S.go("#/espace?t=courses");
    };
    var v = $("#pl-vider", zone); if (v) v.onclick = function () { S.store.modifier(function (d) { d.planning = {}; }); S.vuePlanning(zone); };
  };
  function choisirRecette(jour, zone) {
    var d = S.store.donnees(), fav = d.favoris;
    var toutes = S.store.pourMoi().sort(function (a, b) { return (fav.indexOf(b.id) >= 0) - (fav.indexOf(a.id) >= 0); });
    S.modale('<h3>Ajouter un repas</h3><input class="champ" id="pl-q" placeholder="Rechercher une recette…"><div class="mini-liste" id="pl-res" style="margin-top:1rem;max-height:50vh;overflow:auto"></div><div class="pied"><button class="btn petit discret" data-fermer>Fermer</button></div>', function (f) {
      function rendre() {
        var q = S.norm($("#pl-q", f).value);
        var l = toutes.filter(function (r) { return !q || S.norm(r.titre).indexOf(q) >= 0; }).slice(0, 8);
        $("#pl-res", f).innerHTML = l.map(function (r) { return '<button class="as-reco" data-choix="' + esc(r.id) + '">' + S.photoHTML(r) + '<div style="min-width:0"><strong>' + esc(r.titre) + "</strong><small>" + S.duree(r.temps) + (fav.indexOf(r.id) >= 0 ? " · Favori" : "") + "</small></div></button>"; }).join("") || '<p class="muted">Aucune recette.</p>';
        $$("[data-choix]", f).forEach(function (b) {
          b.onclick = function () { S.store.modifier(function (d) { (d.planning[jour] = d.planning[jour] || []).push({ id: b.dataset.choix, n: personnes() }); }); f.remove(); S.vuePlanning(zone); };
        });
      }
      $("#pl-q", f).oninput = rendre; rendre(); setTimeout(function () { $("#pl-q", f).focus(); }, 50);
    });
  }

  /* ---------- Partage ---------- */
  S.partager = function (r) {
    var url = location.href, txt = r.titre + " — une recette SAVORIA";
    if (navigator.share) { navigator.share({ title: r.titre, text: txt, url: url }).catch(function () {}); return; }
    S.modale('<h3>Partager la recette</h3><p class="muted">' + esc(r.titre) + '</p><div class="choix-partage"><button class="btn discret" id="pt-copier">Copier le lien</button><a class="btn discret" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(txt + " " + url) + '">WhatsApp</a></div><div class="pied"><button class="btn petit discret" data-fermer>Fermer</button></div>', function (f) {
      $("#pt-copier", f).onclick = function () {
        (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () { S.toast("Lien copié"); f.remove(); }, function () { prompt("Copie ce lien :", url); });
      };
    });
  };

  /* ---------- Minuteurs ---------- */
  var minuteurs = [], tic = null, audio = null;
  function bip() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      [0, .35, .7].forEach(function (t) {
        var o = audio.createOscillator(), g = audio.createGain();
        o.type = "sine"; o.frequency.value = 880; o.connect(g); g.connect(audio.destination);
        g.gain.setValueAtTime(.0001, audio.currentTime + t); g.gain.exponentialRampToValueAtTime(.3, audio.currentTime + t + .02); g.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + t + .3);
        o.start(audio.currentTime + t); o.stop(audio.currentTime + t + .32);
      });
    } catch (e) {}
    if (navigator.vibrate) navigator.vibrate([300, 150, 300]);
  }
  function fmt(s) { s = Math.max(0, Math.round(s)); var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(x).padStart(2, "0"); }
  function rendreMinuteurs() {
    var box = $("#minuteurs");
    if (!box) { box = document.createElement("div"); box.id = "minuteurs"; box.className = "minuteurs"; document.body.appendChild(box); }
    box.innerHTML = minuteurs.map(function (m, i) {
      var reste = (m.fin - Date.now()) / 1000;
      return '<div class="minuteur' + (reste <= 0 ? " fini" : "") + '"><span class="m-lib">' + esc(m.lib) + '</span><strong>' + (reste <= 0 ? "Terminé" : fmt(reste)) + '</strong><button data-stop="' + i + '" aria-label="Arrêter">×</button></div>';
    }).join("");
    $$("[data-stop]", box).forEach(function (b) { b.onclick = function () { minuteurs.splice(+b.dataset.stop, 1); rendreMinuteurs(); }; });
    if (!minuteurs.length && tic) { clearInterval(tic); tic = null; }
  }
  S.lancerMinuteur = function (secondes, lib) {
    try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === "suspended") audio.resume(); } catch (e) {}
    minuteurs.push({ fin: Date.now() + secondes * 1000, lib: lib, sonne: false });
    if (!tic) tic = setInterval(function () {
      minuteurs.forEach(function (m) { if (!m.sonne && m.fin <= Date.now()) { m.sonne = true; bip(); S.toast("Minuteur terminé : " + m.lib); } });
      rendreMinuteurs();
    }, 500);
    rendreMinuteurs(); S.toast("Minuteur lancé : " + lib);
  };
  /* Repère les durées dans le texte d'une étape : « 20 min », « 1 h 30 », « 2 à 3 min », « 30 secondes » */
  S.dureesEtape = function (txt) {
    var res = [], re = /(\d+)\s*h\s*(\d{1,2})\b|(\d+(?:,\d+)?)(?:\s*(?:à|-)\s*(\d+(?:,\d+)?))?\s*(heures?|h|minutes?|min|secondes?)(?![a-z])/gi, m;
    while ((m = re.exec(txt))) {
      var s;
      if (m[1]) s = (+m[1]) * 3600 + (+m[2]) * 60;
      else {
        var v = parseFloat((m[4] || m[3]).replace(",", ".")), u = m[5].toLowerCase();
        s = /^h/.test(u) ? v * 3600 : /^s/.test(u) ? v : v * 60;
      }
      if (s >= 10 && s <= 12 * 3600) res.push({ s: s, lib: m[0].replace(/\s+/g, " ") });
    }
    return res;
  };

  /* ---------- Mode cuisine ---------- */
  var verrou = null;
  S.modeCuisine = function (r, n) {
    var i = 0, f = n / r.portions;
    var o = document.createElement("div"); o.className = "cuisine"; o.setAttribute("role", "dialog"); o.setAttribute("aria-label", "Mode cuisine");
    o.innerHTML = '<div class="cui-tete"><div><span class="sur-titre" style="margin:0">Mode cuisine</span><strong>' + esc(r.titre) + '</strong></div><div class="cui-tete-act"><button class="btn petit discret" id="cui-ing">Ingrédients</button><button class="cui-fermer" aria-label="Fermer">×</button></div></div>' +
      '<div class="cui-prog">' + r.etapes.map(function () { return "<i></i>"; }).join("") + "</div>" +
      '<div class="cui-corps"><div class="cui-num" id="cui-num"></div><p class="cui-txt" id="cui-txt"></p><div class="cui-minut" id="cui-minut"></div></div>' +
      '<div class="cui-ing" id="cui-ing-liste"><h4>Ingrédients · ' + n + " pers.</h4><ul>" + r.ing.map(function (x) { return "<li><span>" + esc(S.qte(x[0], x[1], f)) + "</span>" + esc(S.nomIng(x, f)) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="cui-pied"><button class="btn discret" id="cui-prec">Précédent</button><button class="btn plein" id="cui-suiv">Suivant</button></div>';
    document.body.appendChild(o); document.body.style.overflow = "hidden"; document.body.classList.add("en-cuisine");
    if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (w) { verrou = w; }).catch(function () {});
    function rendre() {
      $("#cui-num", o).textContent = String(i + 1).padStart(2, "0") + " / " + String(r.etapes.length).padStart(2, "0");
      $("#cui-txt", o).textContent = r.etapes[i];
      $$(".cui-prog i", o).forEach(function (x, k) { x.classList.toggle("fait", k <= i); });
      var d = S.dureesEtape(r.etapes[i]);
      $("#cui-minut", o).innerHTML = d.map(function (x, k) { return '<button class="btn petit discret" data-min="' + k + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg> Minuteur ' + esc(x.lib) + "</button>"; }).join("");
      $$("[data-min]", o).forEach(function (b) { b.onclick = function () { var x = d[+b.dataset.min]; S.lancerMinuteur(x.s, r.titre.split(",")[0] + " · " + x.lib); }; });
      $("#cui-prec", o).disabled = i === 0;
      $("#cui-suiv", o).textContent = i === r.etapes.length - 1 ? "Terminer" : "Suivant";
      var c = $(".cui-corps", o); c.classList.remove("entree"); void c.offsetWidth; c.classList.add("entree");
    }
    function fermer() {
      o.remove(); document.body.style.overflow = ""; document.body.classList.remove("en-cuisine"); document.removeEventListener("keydown", clavier);
      if (verrou) { verrou.release().catch(function () {}); verrou = null; }
    }
    function suiv() {
      if (i < r.etapes.length - 1) { i++; rendre(); return; }
      fermer();
      if (S.store.utilisateur()) {
        var deja = S.store.donnees().realisees.indexOf(r.id) >= 0;
        if (!deja) { S.store.modifier(function (d) { d.realisees.push(r.id); }); S.toast("Bon appétit ! Recette ajoutée à « Déjà réalisées »"); }
        else S.toast("Bon appétit !");
      } else S.toast("Bon appétit !");
    }
    function prec() { if (i > 0) { i--; rendre(); } }
    function clavier(e) { if (e.key === "ArrowRight") suiv(); else if (e.key === "ArrowLeft") prec(); else if (e.key === "Escape") fermer(); }
    document.addEventListener("keydown", clavier);
    $("#cui-suiv", o).onclick = suiv; $("#cui-prec", o).onclick = prec; $(".cui-fermer", o).onclick = fermer;
    $("#cui-ing", o).onclick = function () { o.classList.toggle("ing-ouvert"); };
    var x0 = null;
    o.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    o.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 60) (dx < 0 ? suiv : prec)(); x0 = null; });
    rendre();
  };
})();
