/* SAVORIA — Stockage des données.
   MODE MAQUETTE : tout est enregistré dans le navigateur (localStorage).
   Pour passer en ligne (comptes partagés entre appareils), ce fichier sera
   remplacé par une version Supabase qui garde exactement les mêmes fonctions. */
window.S = window.S || {};
S.CONFIG = S.CONFIG || { adminEmails: [], routeAdmin: "coulisses" };
if (!S.CONFIG.routeAdmin) S.CONFIG.routeAdmin = "coulisses";

(function () {
  var K = { users: "sav_users", session: "sav_session", admin: "sav_admin_recettes", suppr: "sav_admin_supprimees", soum: "sav_soumissions" };
  function lire(k, def) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function ecrire(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { S.toast && S.toast("Stockage du navigateur plein : supprime des photos ou des recettes."); return false; }
  }
  async function hash(txt) {
    if (window.crypto && crypto.subtle) {
      var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("savoria:" + txt));
      return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    }
    return btoa(unescape(encodeURIComponent("savoria:" + txt)));
  }
  function donneesVides() {
    return {
      profil: { allergies: [], regime: "aucun", refuses: [], ustensiles: ["plaques", "four", "poele", "casserole"], niveau: "intermediaire", temps: 45, personnes: 2, modeAppareil: "" },
      consentement: false, favoris: [], aessayer: [], realisees: [], collections: [], conversations: [], courses: [], planning: {}, notes: {}
    };
  }
  function emailsAdmin() {
    return ((S.CONFIG && S.CONFIG.adminEmails) || []).map(function (e) { return String(e).trim().toLowerCase(); }).filter(function (e) { return e && e.indexOf("@exemple") < 0; });
  }
  function propre(r) { var n = Object.assign({}, r); Object.keys(n).forEach(function (k) { if (k.charAt(0) === "_") delete n[k]; }); return n; }

  S.store = {
    /* ----- Comptes ----- */
    utilisateur: function () {
      var e = lire(K.session, null); if (!e) return null;
      var u = lire(K.users, {})[e]; return u || null;
    },
    estAdmin: function () {
      var u = this.utilisateur(); if (!u) return false;
      var l = emailsAdmin();
      return l.length ? l.indexOf(u.email) >= 0 : u.role === "admin";
    },
    inscription: async function (nom, email, mdp) {
      email = (email || "").trim().toLowerCase();
      if (!nom || !email || !mdp) throw new Error("Remplis tous les champs.");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Adresse email invalide.");
      if (mdp.length < 8) throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
      var users = lire(K.users, {});
      if (users[email]) throw new Error("Un compte existe déjà avec cet email.");
      var premier = Object.keys(users).length === 0;
      users[email] = { email: email, nom: nom.trim(), hash: await hash(mdp), role: premier ? "admin" : "client", cree: Date.now() };
      ecrire(K.users, users);
      ecrire("sav_data_" + email, donneesVides());
      ecrire(K.session, email);
      return users[email];
    },
    connexion: async function (email, mdp) {
      email = (email || "").trim().toLowerCase();
      var u = lire(K.users, {})[email];
      if (!u || u.hash !== await hash(mdp)) throw new Error("Email ou mot de passe incorrect.");
      ecrire(K.session, email); this.migrer(); return u;
    },
    changerMotDePasse: async function (ancien, nouveau) {
      var u = this.utilisateur(); if (!u) throw new Error("Non connecté.");
      if (u.hash !== await hash(ancien)) throw new Error("Mot de passe actuel incorrect.");
      if ((nouveau || "").length < 8) throw new Error("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      var users = lire(K.users, {}); users[u.email].hash = await hash(nouveau); ecrire(K.users, users);
    },
    renommer: function (nom) {
      var u = this.utilisateur(); if (!u || !nom.trim()) return;
      var users = lire(K.users, {}); users[u.email].nom = nom.trim(); ecrire(K.users, users);
    },
    deconnexion: function () { localStorage.removeItem(K.session); },
    supprimerCompte: function () {
      var u = this.utilisateur(); if (!u) return;
      var users = lire(K.users, {}); delete users[u.email]; ecrire(K.users, users);
      ecrire(K.soum, lire(K.soum, []).filter(function (s) { return s.auteur !== u.email || s.statut === "publiee"; }));
      localStorage.removeItem("sav_data_" + u.email); this.deconnexion();
    },
    donnees: function () {
      var u = this.utilisateur(); if (!u) return null;
      var d = lire("sav_data_" + u.email, null) || donneesVides();
      var vide = donneesVides();
      Object.keys(vide).forEach(function (k) { if (d[k] === undefined) d[k] = vide[k]; });
      return d;
    },
    sauver: function (d) { var u = this.utilisateur(); if (u) return ecrire("sav_data_" + u.email, d); },
    modifier: function (fn) { var d = this.donnees(); if (!d) return null; fn(d); this.sauver(d); return d; },
    /* Anciennes « recettes privées » → propositions en attente de validation */
    migrer: function () {
      var u = this.utilisateur(); if (!u) return;
      var d = lire("sav_data_" + u.email, null); if (!d || !d.mesRecettes || !d.mesRecettes.length) return;
      var l = lire(K.soum, []);
      d.mesRecettes.forEach(function (r) { l.push({ id: r.id, auteur: u.email, auteurNom: u.nom, statut: "attente", cree: Date.now(), maj: Date.now(), recette: propre(r) }); });
      delete d.mesRecettes; ecrire(K.soum, l); ecrire("sav_data_" + u.email, d);
    },

    /* ----- Recettes proposées par les membres ----- */
    soumissions: function () { return lire(K.soum, []); },
    mesCreations: function () { var u = this.utilisateur(); return u ? this.soumissions().filter(function (s) { return s.auteur === u.email; }) : []; },
    soumettre: function (r) {
      var u = this.utilisateur(); if (!u) return false;
      var l = this.soumissions(), ex = l.find(function (s) { return s.id === r.id; });
      if (ex && ex.auteur !== u.email && !this.estAdmin()) return false;
      var s = ex || { id: r.id, auteur: u.email, auteurNom: u.nom, cree: Date.now() };
      s.recette = propre(r); s.statut = "attente"; s.motif = ""; s.maj = Date.now();
      if (!ex) l.push(s);
      return ecrire(K.soum, l);
    },
    supprimerCreation: function (id) {
      var u = this.utilisateur(), adm = this.estAdmin();
      ecrire(K.soum, this.soumissions().filter(function (s) { return !(s.id === id && (adm || (u && s.auteur === u.email))); }));
    },
    /* L'admin corrige une proposition sans changer son statut */
    majSoumission: function (id, r) {
      if (!this.estAdmin()) return false;
      var l = this.soumissions(), x = l.find(function (s) { return s.id === id; }); if (!x) return false;
      x.recette = propre(r); x.maj = Date.now(); return ecrire(K.soum, l);
    },
    decider: function (id, statut, motif) {
      if (!this.estAdmin()) return;
      var l = this.soumissions(), s = l.find(function (x) { return x.id === id; }); if (!s) return;
      s.statut = statut; s.motif = motif || ""; s.decide = Date.now(); ecrire(K.soum, l);
    },

    /* ----- Recettes de l'équipe SAVORIA ----- */
    recettesAdmin: function () { return lire(K.admin, []); },
    sauverRecetteAdmin: function (r) {
      var l = this.recettesAdmin().filter(function (x) { return x.id !== r.id; });
      l.push(propre(r)); var ok = ecrire(K.admin, l);
      ecrire(K.suppr, lire(K.suppr, []).filter(function (id) { return id !== r.id; }));
      return ok;
    },
    supprimerRecetteAdmin: function (id) {
      ecrire(K.admin, this.recettesAdmin().filter(function (x) { return x.id !== id; }));
      if (S.RECETTES.some(function (r) { return r.id === id; })) { var s = lire(K.suppr, []); if (s.indexOf(id) < 0) s.push(id); ecrire(K.suppr, s); }
      this.supprimerCreation(id);
    },

    /* ----- Catalogue ----- */
    /* Toutes les recettes publiables : base + équipe + propositions validées */
    catalogueComplet: function () {
      var adm = this.recettesAdmin(), suppr = lire(K.suppr, []), map = {};
      S.RECETTES.forEach(function (r) { map[r.id] = Object.assign({ statut: "publiee", source: "base" }, r); });
      this.soumissions().forEach(function (s) {
        if (s.statut === "publiee") map[s.id] = Object.assign({}, s.recette, { id: s.id, statut: "publiee", source: "membre", auteurNom: s.auteurNom });
      });
      adm.forEach(function (r) { map[r.id] = Object.assign({ statut: "publiee" }, r, { source: map[r.id] && map[r.id].source === "membre" ? "membre" : "admin", auteurNom: map[r.id] && map[r.id].auteurNom }); });
      return Object.keys(map).filter(function (id) { return suppr.indexOf(id) < 0; }).map(function (id) { return S.enrichir(map[id]); });
    },
    publiques: function () { return this.catalogueComplet().filter(function (r) { return r.statut === "publiee"; }); },
    /* Mes propositions pas encore publiées (visibles par moi seul) */
    privees: function () {
      return this.mesCreations().filter(function (s) { return s.statut !== "publiee"; }).map(function (s) {
        return S.enrichir(Object.assign({}, s.recette, { id: s.id, statut: s.statut === "refusee" ? "refusee" : "attente", source: "membre", auteurNom: s.auteurNom }));
      });
    },
    pourMoi: function () { return this.publiques().concat(this.privees()); },
    recette: function (id) {
      var r = this.pourMoi().find(function (x) { return x.id === id; });
      if (!r && this.estAdmin()) {
        var s = this.soumissions().find(function (x) { return x.id === id; });
        if (s) r = S.enrichir(Object.assign({}, s.recette, { id: s.id, statut: s.statut, source: "membre", auteurNom: s.auteurNom }));
      }
      return r || null;
    },

    /* ----- Vue d'ensemble pour l'admin ----- */
    membres: function () {
      if (!this.estAdmin()) return [];
      var users = lire(K.users, {}), soum = this.soumissions();
      return Object.keys(users).map(function (e) {
        var u = users[e], d = lire("sav_data_" + e, null) || {};
        return { email: e, nom: u.nom, cree: u.cree, favoris: d.favoris || [], realisees: d.realisees || [], allergies: (d.profil && d.profil.allergies) || [],
          creations: soum.filter(function (s) { return s.auteur === e; }).length };
      }).sort(function (a, b) { return (b.cree || 0) - (a.cree || 0); });
    }
  };

  /* Calcule les allergènes, régimes, etc. d'une recette */
  S.enrichir = function (r) {
    if (r._a) return r;
    var keys = r.ing.map(function (i) { return i[2]; }).filter(Boolean);
    r._a = S.allergenesDe(keys);
    r._keys = keys;
    r._inconnus = r.ing.filter(function (i) { return !i[2]; }).map(function (i) { return i[3] || ""; });
    return r;
  };

  /* Compatibilité d'une recette avec un profil */
  S.compat = function (r, p) {
    if (!p) return null;
    var res = { allergenes: [], traces: [], regime: false, refuses: [], ustManquants: [], inconnus: r._inconnus.length > 0 };
    res.allergenes = r._a.contient.filter(function (a) { return p.allergies.indexOf(a) >= 0; });
    res.traces = r._a.traces.filter(function (a) { return p.allergies.indexOf(a) >= 0; });
    var reg = S.REGIMES[p.regime] || S.REGIMES.aucun;
    res.regime = r._a.tags.some(function (t) { return reg.exclut.indexOf(t) >= 0; });
    var refKeys = S.detectIngredients((p.refuses || []).join(", "));
    res.refuses = r._keys.filter(function (k) { return refKeys.indexOf(k) >= 0; });
    var ust = p.ustensiles || [];
    res.ustManquants = (r.ust || []).filter(function (u) { return ust.indexOf(u) < 0; });
    res.danger = res.allergenes.length > 0 || res.traces.length > 0;
    res.ok = !res.danger && !res.regime && res.refuses.length === 0 && !(res.inconnus && p.allergies.length);
    return res;
  };

  /* Appareils : comment se cuisine une recette */
  S.APPAREILS = {
    airfryer: { n: "Air fryer", d: "Croustillant, sans friture" },
    microondes: { n: "Micro-ondes", d: "Prêt en quelques minutes" },
    sanscuisson: { n: "Sans cuisson", d: "Aucun appareil à allumer" },
    four: { n: "Four", d: "Gratins, rôtis et pâtisseries" }
  };
  var CHAUFFE = ["plaques", "four", "microondes", "airfryer", "cocotte", "wok", "poele", "casserole", "chalumeau"];
  S.appareilsDe = function (r) {
    if (r._app) return r._app;
    var u = r.ust || [], l = ["airfryer", "microondes", "four"].filter(function (a) { return u.indexOf(a) >= 0; });
    if (!u.some(function (x) { return CHAUFFE.indexOf(x) >= 0; })) l.push("sanscuisson");
    r._app = l; return l;
  };
  /* Mode « que mon appareil » choisi dans le profil */
  S.modeAppareil = function () {
    var d = S.store.utilisateur() && S.store.donnees();
    var m = d && d.profil && d.profil.modeAppareil;
    return S.APPAREILS[m] ? m : "";
  };
  S.selonMode = function (l) {
    var m = S.modeAppareil();
    return m ? l.filter(function (r) { return S.appareilsDe(r).indexOf(m) >= 0; }) : l;
  };
})();
