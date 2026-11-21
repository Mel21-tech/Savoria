/* SAVORIA — Stockage des données.
   MODE MAQUETTE : tout est enregistré dans le navigateur (localStorage).
   Pour passer en ligne (comptes partagés entre appareils), ce fichier sera
   remplacé par une version Supabase qui garde exactement les mêmes fonctions. */
window.S = window.S || {};

(function () {
  var K = { users: "sav_users", session: "sav_session", admin: "sav_admin_recettes", suppr: "sav_admin_supprimees" };
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
      profil: { allergies: [], regime: "aucun", refuses: [], ustensiles: ["plaques", "four", "poele", "casserole"], niveau: "intermediaire", temps: 45, personnes: 2 },
      consentement: false, favoris: [], aessayer: [], realisees: [], collections: [], mesRecettes: [], conversations: []
    };
  }

  S.store = {
    utilisateur: function () {
      var e = lire(K.session, null); if (!e) return null;
      var u = lire(K.users, {})[e]; return u || null;
    },
    estAdmin: function () { var u = this.utilisateur(); return !!(u && u.role === "admin"); },
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
      ecrire(K.session, email); return u;
    },
    deconnexion: function () { localStorage.removeItem(K.session); },
    supprimerCompte: function () {
      var u = this.utilisateur(); if (!u) return;
      var users = lire(K.users, {}); delete users[u.email]; ecrire(K.users, users);
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

    /* ----- Recettes ----- */
    recettesAdmin: function () { return lire(K.admin, []); },
    sauverRecetteAdmin: function (r) {
      var l = this.recettesAdmin().filter(function (x) { return x.id !== r.id; });
      l.push(r); var ok = ecrire(K.admin, l);
      var s = lire(K.suppr, []).filter(function (id) { return id !== r.id; }); ecrire(K.suppr, s);
      return ok;
    },
    supprimerRecetteAdmin: function (id) {
      ecrire(K.admin, this.recettesAdmin().filter(function (x) { return x.id !== id; }));
      if (S.RECETTES.some(function (r) { return r.id === id; })) { var s = lire(K.suppr, []); if (s.indexOf(id) < 0) s.push(id); ecrire(K.suppr, s); }
    },
    /* Toutes les recettes du site (base + modifications admin), y compris en attente */
    catalogueComplet: function () {
      var adm = this.recettesAdmin(), suppr = lire(K.suppr, []);
      var map = {};
      S.RECETTES.forEach(function (r) { map[r.id] = Object.assign({ statut: "publiee", source: "base" }, r); });
      adm.forEach(function (r) { map[r.id] = Object.assign({ source: "admin" }, r); });
      return Object.keys(map).filter(function (id) { return suppr.indexOf(id) < 0; }).map(function (id) { return S.enrichir(map[id]); });
    },
    publiques: function () { return this.catalogueComplet().filter(function (r) { return r.statut === "publiee"; }); },
    privees: function () { var d = this.donnees(); return d ? d.mesRecettes.map(function (r) { return S.enrichir(Object.assign({ statut: "privee", source: "client" }, r)); }) : []; },
    pourMoi: function () { return this.publiques().concat(this.privees()); },
    recette: function (id) {
      var r = this.pourMoi().find(function (x) { return x.id === id; });
      if (!r && this.estAdmin()) r = this.catalogueComplet().find(function (x) { return x.id === id; });
      return r || null;
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
})();
