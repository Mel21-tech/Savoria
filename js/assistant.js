/* SAVORIA — Assistant culinaire (sans IA).
   Il reconnaît les ingrédients tapés, croise avec les recettes du site et le profil
   (allergies, régime, aliments refusés, ustensiles, temps) et propose des remplacements. */
window.S = window.S || {};
(function () {
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var esc = function (s) { return S.esc(s); };
  var etat = { ouvert: false, onglet: "chat", conv: null, attente: null };
  var EQUIV = [["poulet", "poulet_entier"], ["tomate", "tomate_cerise", "tomates_concassees"], ["oeuf", "jaune_oeuf"], ["riz", "riz_arborio"], ["saumon", "saumon_cru"], ["creme", "creme_vegetale"], ["pain", "pain_mie"]];
  function equivalents(k) { var g = EQUIV.find(function (x) { return x.indexOf(k) >= 0; }); return g || [k]; }
  var CATS_MOTS = [[/dessert|sucre|gouter|gateau|patiss/, "desserts"], [/healthy|leger|equilibre|sain|light|minceur/, "healthy"], [/monde|exotique|asiat|italien|indien|thai|mexicain|maroc|voyage/, "monde"], [/classique|traditionnel|francais|grand mere/, "classiques"], [/mijot|longue|week end|dimanche/, "longues"]];
  var ICO_ENV = '<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  var ICO_BULLE = '<svg viewBox="0 0 24 24"><path d="M5 18c-1.3-1.4-2-3.1-2-5 0-4.4 4-8 9-8s9 3.6 9 8-4 8-9 8c-1.3 0-2.5-.2-3.6-.6L4 21z"/><path d="M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01" stroke-width="2.4" stroke-linecap="round"/></svg>';

  function donnees() { return S.store.donnees(); }
  function prenom() { var u = S.store.utilisateur(); return u ? u.nom : ""; }

  /* ---------- Moteur de recherche ---------- */
  function candidates(opts) {
    var d = donnees(), p = d.profil, ecart = { allergenes: 0, regime: 0, refuses: 0 };
    var l = S.store.pourMoi().filter(function (r) {
      var c = S.compat(r, p);
      if (c.danger || (c.inconnus && p.allergies.length)) { ecart.allergenes++; return false; }
      if (c.regime) { ecart.regime++; return false; }
      if (c.refuses.length) { ecart.refuses++; return false; }
      if (opts.cat && r.cats.indexOf(opts.cat) < 0) return false;
      if (opts.tempsMax && r.temps > opts.tempsMax) return false;
      r._c = c; return true;
    });
    return { liste: l, ecart: ecart, profil: p };
  }
  function chercher(opts) {
    var res = candidates(opts), p = res.profil, H = [];
    (opts.ingredients || []).forEach(function (k) { equivalents(k).forEach(function (e) { if (H.indexOf(e) < 0) H.push(e); }); });
    var notes = res.liste.map(function (r) {
      var besoin = r._keys.filter(function (k) { return !(S.ING[k] && S.ING[k].base); });
      besoin = besoin.filter(function (k, i) { return besoin.indexOf(k) === i; });
      var ont = besoin.filter(function (k) { return H.indexOf(k) >= 0; });
      return { r: r, besoin: besoin.length, ont: ont.length, manque: besoin.filter(function (k) { return H.indexOf(k) < 0; }), ust: r._c.ustManquants.length };
    });
    if (H.length) notes = notes.filter(function (n) { return n.ont > 0; });
    var ustOk = true;
    var niv = { debutant: 1, intermediaire: 2, confirme: 3 }[p.niveau] || 2;
    notes.sort(function (a, b) {
      if (H.length) { var ka = a.ont - (a.ust ? .6 : 0), kb = b.ont - (b.ust ? .6 : 0); if (kb !== ka) return kb - ka; var ra = a.ont / a.besoin, rb = b.ont / b.besoin; if (rb !== ra) return rb - ra; }
      else if (a.ust !== b.ust) return a.ust - b.ust;
      var sa = (a.r.temps <= (opts.tempsMax || p.temps) ? 2 : 0) + (a.r.diff <= niv ? 1 : 0), sb = (b.r.temps <= (opts.tempsMax || p.temps) ? 2 : 0) + (b.r.diff <= niv ? 1 : 0);
      if (sb !== sa) return sb - sa;
      return a.r.temps - b.r.temps;
    });
    notes = notes.slice(0, 5); ustOk = notes.every(function (n) { return n.ust === 0; });
    return { notes: notes, ecart: res.ecart, ustOk: ustOk, total: notes.length };
  }
  function substituts(k) {
    var p = donnees().profil, reg = S.REGIMES[p.regime] || S.REGIMES.aucun;
    return (S.SUBSTITUTIONS[k] || []).filter(function (s) {
      var a = S.allergenesDe([s[0]]);
      if (a.contient.concat(a.traces).some(function (x) { return p.allergies.indexOf(x) >= 0; })) return false;
      if (a.tags.some(function (t) { return reg.exclut.indexOf(t) >= 0; })) return false;
      return true;
    });
  }
  function nomsIng(keys) { return keys.map(function (k) { return S.ING[k] ? S.ING[k].n : k; }); }
  function liste(arr) { return arr.length < 2 ? arr.join("") : arr.slice(0, -1).join(", ") + " et " + arr[arr.length - 1]; }

  /* ---------- Réponses ---------- */
  function repondre(texte) {
    var t = S.norm(texte), ings = S.detectIngredients(texte), reps = [];
    var attente = etat.attente; etat.attente = null;
    var veutSubst = attente === "subst" || /remplac|manque|alternative|a la place|substitu|j ai plus de|je n ai plus|je n ai pas de|pas de |plus de /.test(t);
    var rapide = /rapide|vite|presse|express|pas le temps|peu de temps|(10|15|20) ?min/.test(t);
    var cat = null; CATS_MOTS.forEach(function (c) { if (!cat && c[0].test(t)) cat = c[1]; });

    if (veutSubst && ings.length && !/j ai |avec /.test(t.replace(/j ai plus|je n ai/g, ""))) {
      ings.forEach(function (k) {
        var s = substituts(k), nom = S.ING[k].n;
        if (s.length) reps.push({ texte: "Pas de " + nom + " ? Tu peux le remplacer par :<br>" + s.map(function (x) { return "• <strong>" + esc(S.ING[x[0]].n) + "</strong> — " + esc(x[1]); }).join("<br>") });
        else if ((S.SUBSTITUTIONS[k] || []).length) reps.push({ texte: "Les remplacements que je connais pour " + esc(nom) + " ne sont pas compatibles avec tes allergies ou ton régime. Mieux vaut choisir une autre recette." });
        else reps.push({ texte: "Je n'ai pas d'alternative fiable pour " + esc(nom) + ". Dis-moi ce que tu as sous la main et je te trouve une recette sans." });
      });
      return reps;
    }
    if (veutSubst && !ings.length) { etat.attente = "subst"; return [{ texte: "Quel ingrédient te manque ? Écris son nom (par exemple « beurre » ou « œufs »)." }]; }

    if (attente === "ingredients" && !ings.length) return [{ texte: "Je n'ai reconnu aucun ingrédient. Essaie avec des mots simples, séparés par des virgules : « œufs, tomates, oignon »." }];

    if (ings.length || rapide || cat || /quoi|idee|propose|suggest|faim|ce soir|manger|cuisiner|recette/.test(t)) {
      var opts = { ingredients: ings, tempsMax: rapide ? 25 : null, cat: cat };
      var r = chercher(opts), intro;
      if (ings.length) intro = "Avec " + esc(liste(nomsIng(ings))) + ", voici ce que tu peux préparer :";
      else if (rapide) intro = "Voici des idées prêtes en 25 minutes maximum, adaptées à ton profil :";
      else if (cat) intro = "Voici une sélection " + S.CATEGORIES[cat].court.toLowerCase() + " adaptée à ton profil :";
      else intro = "Voici mes suggestions selon ton profil et ton temps disponible :";
      if (!r.notes.length) return [{ texte: ings.length ? "Je ne trouve pas de recette compatible avec ces ingrédients et ton profil. Ajoute d'autres ingrédients ou essaie « Repas rapide »." : "Je ne trouve pas de recette compatible avec ton profil pour cette demande." }];
      var recos = r.notes.map(function (n) { return { id: n.r.id, ont: n.ont, besoin: n.besoin, manque: n.manque.slice(0, 4), ust: n.r._c.ustManquants }; });
      var e = r.ecart, ex = [];
      if (e.allergenes) ex.push(e.allergenes + " pour tes allergies");
      if (e.regime) ex.push(e.regime + " pour ton régime");
      if (e.refuses) ex.push(e.refuses + " avec des aliments que tu n'aimes pas");
      var fin = ex.length ? "J'ai écarté " + ex.join(", ") + "." : "";
      if (!r.ustOk) fin += (fin ? " " : "") + "Certaines recettes demandent un ustensile que tu n'as pas indiqué : je l'ai précisé.";
      if (ings.length) fin += (fin ? " " : "") + "Il te manque un ingrédient ? Demande-moi par quoi le remplacer.";
      return [{ texte: intro, recos: recos }, fin ? { texte: fin } : null].filter(Boolean);
    }
    return [{ texte: "Je n'ai pas bien compris. Tu peux m'écrire les ingrédients que tu as (« poulet, riz, poivron »), demander un repas rapide ou me dire quel ingrédient te manque." }];
  }

  /* ---------- Conversations ---------- */
  function convCourante() {
    if (!etat.conv) return null;
    return donnees().conversations.find(function (c) { return c.id === etat.conv; }) || null;
  }
  function ajouter(msgs, nouvelle) {
    S.store.modifier(function (d) {
      var c = etat.conv && !nouvelle ? d.conversations.find(function (x) { return x.id === etat.conv; }) : null;
      if (c && Date.now() - c.maj > 30 * 60 * 1000) c = null;
      if (!c) {
        var premier = msgs.find(function (m) { return m.de === "moi"; });
        c = { id: "v" + Date.now(), titre: premier ? premier.texte.slice(0, 60) : "Conversation", date: Date.now(), maj: Date.now(), messages: [] };
        d.conversations.unshift(c); etat.conv = c.id;
        if (d.conversations.length > 50) d.conversations.length = 50;
      }
      c.messages = c.messages.concat(msgs); c.maj = Date.now();
    });
  }
  function envoyer(texte, nouvelle) {
    texte = (texte || "").trim(); if (!texte) return;
    var reps = repondre(texte);
    ajouter([{ de: "moi", texte: texte }].concat(reps.map(function (r) { return Object.assign({ de: "bot" }, r); })), nouvelle);
    rendreCorps(true);
  }

  /* ---------- Rendu ---------- */
  function msgHTML(m) {
    if (m.de === "moi") return '<div class="msg moi">' + esc(m.texte) + "</div>";
    var h = '<div class="msg bot"><p>' + m.texte + "</p></div>";
    if (m.recos) {
      h += '<div class="as-resultats">' + m.recos.map(function (x) {
        var r = S.store.recette(x.id); if (!r) return "";
        var sous = x.besoin && x.ont ? (x.manque.length ? "Manque : " + esc(nomsIng(x.manque).join(", ")) : "Tu as tout !") : S.duree(r.temps);
        if (x.ust && x.ust.length) sous += '<br><span style="color:#eba27f">Ustensile manquant : ' + x.ust.map(function (u) { return S.USTENSILES[u]; }).join(", ") + "</span>";
        return '<a class="as-reco" href="#/recette/' + encodeURIComponent(r.id) + '" data-ferme-mobile>' + S.photoHTML(r) + '<div style="min-width:0"><strong>' + esc(r.titre) + "</strong><small>" + sous + "</small></div>" +
          (x.ont ? '<span class="score">' + x.ont + "/" + x.besoin + "</span>" : '<span class="score">' + S.duree(r.temps) + "</span>") + "</a>";
      }).join("") + "</div>";
    }
    return h;
  }
  function accueilHTML() {
    return '<div class="msg bot"><p>Bonjour ' + esc(prenom()) + " ! Dis-moi ce que tu as dans ton frigo et je te trouve une recette adaptée à ton profil.</p><p class=\"muted\" style=\"font-size:.8rem\">Exemple : « j'ai des œufs, des tomates et un oignon »</p></div>";
  }
  function rendreCorps(defiler) {
    var corps = $("#as-corps"), u = S.store.utilisateur();
    $("#as-rapides").style.display = u && etat.onglet === "chat" ? "" : "none";
    $("#as-saisie").style.display = u && etat.onglet === "chat" ? "" : "none";
    $$(".as-onglets [data-o]").forEach(function (b) { b.classList.toggle("actif", b.dataset.o === etat.onglet); });
    $(".as-onglets").style.display = u ? "" : "none";
    if (!u) {
      corps.innerHTML = '<div class="as-verrou"><div><div class="avatar" style="margin:0 auto 1rem;width:54px;height:54px;border-radius:50%;border:1px solid var(--or);display:grid;place-items:center;font-family:var(--serif);color:var(--or);font-size:1.6rem">S</div><h3>Ton assistant culinaire</h3><p class="muted" style="font-size:.88rem">Connecte-toi pour obtenir des recettes adaptées à tes ingrédients, tes allergies et tes ustensiles.</p><a class="btn plein petit" href="#/connexion" data-ferme>Se connecter</a><p style="margin-top:.8rem"><a class="lien-or" style="font-size:.82rem" href="#/connexion?mode=inscription" data-ferme>Créer un compte</a></p></div></div>';
      return;
    }
    var d = donnees();
    if (etat.onglet === "histo") {
      corps.innerHTML = d.conversations.length ? d.conversations.map(function (c) {
        var nb = c.messages.reduce(function (s, m) { return s + (m.recos ? m.recos.length : 0); }, 0);
        var dt = new Date(c.date);
        return '<button class="histo-item" data-conv="' + c.id + '"><strong>' + esc(c.titre) + "</strong><small>" + dt.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) + " à " + dt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) + " · " + nb + " recette" + (nb > 1 ? "s" : "") + " proposée" + (nb > 1 ? "s" : "") + "</small></button>";
      }).join("") + '<button class="btn petit danger" id="as-effacer" style="align-self:center;margin-top:.6rem">Effacer l\'historique</button>' : '<p class="muted centre" style="margin-top:2rem;font-size:.88rem">Aucune conversation pour l\'instant.<br>Chaque recherche apparaîtra ici.</p>';
      Array.prototype.forEach.call(corps.querySelectorAll("[data-conv]"), function (b) { b.onclick = function () { etat.conv = b.dataset.conv; etat.onglet = "chat"; rendreCorps(true); }; });
      var ef = $("#as-effacer"); if (ef) ef.onclick = function () { S.store.modifier(function (d) { d.conversations = []; }); etat.conv = null; rendreCorps(); };
      return;
    }
    var c = convCourante();
    corps.innerHTML = accueilHTML() + (c ? c.messages.map(msgHTML).join("") : "");
    if (defiler) requestAnimationFrame(function () { corps.scrollTop = corps.scrollHeight; });
  }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function ouvrir(v) {
    etat.ouvert = v === undefined ? !etat.ouvert : v;
    $("#assistant").classList.toggle("ouvert", etat.ouvert);
    document.body.classList.toggle("as-ouvert", etat.ouvert);
    $("#bulle").setAttribute("aria-expanded", etat.ouvert);
    if (etat.ouvert) { rendreCorps(true); if (window.innerWidth > 560 && S.store.utilisateur()) setTimeout(function () { $("#as-input").focus(); }, 300); }
  }

  S.assistant = {
    init: function () {
      var b = document.createElement("button"); b.className = "bulle"; b.id = "bulle"; b.setAttribute("aria-label", "Ouvrir l'assistant culinaire"); b.innerHTML = ICO_BULLE;
      var p = document.createElement("div"); p.className = "assistant"; p.id = "assistant"; p.setAttribute("role", "dialog"); p.setAttribute("aria-label", "Assistant culinaire");
      p.innerHTML = '<div class="as-tete"><div class="avatar">S</div><div><strong>Assistant SAVORIA</strong><small>Trouve quoi cuisiner en quelques secondes</small></div><button class="fermer" aria-label="Fermer">×</button></div>' +
        '<div class="as-onglets"><button data-o="chat" class="actif">Discussion</button><button data-o="histo">Historique</button><button class="nouv" id="as-nouv">+ Nouvelle</button></div>' +
        '<div class="as-corps" id="as-corps"></div>' +
        '<div class="as-rapides" id="as-rapides"><button data-r="avec">Avec ce que j\'ai</button><button data-r="rapide">Repas rapide</button><button data-r="subst">Remplacer un ingrédient</button></div>' +
        '<form class="as-saisie" id="as-saisie"><input id="as-input" placeholder="J\'ai du poulet, du riz et un poivron…" autocomplete="off" aria-label="Ton message"><button aria-label="Envoyer">' + ICO_ENV + "</button></form>";
      document.body.appendChild(p); document.body.appendChild(b);
      b.onclick = function () { ouvrir(); };
      $(".fermer", p).onclick = function () { ouvrir(false); };
      Array.prototype.forEach.call(p.querySelectorAll("[data-o]"), function (x) { x.onclick = function () { etat.onglet = x.dataset.o; rendreCorps(true); }; });
      $("#as-nouv").onclick = function () { etat.conv = null; etat.attente = null; etat.onglet = "chat"; rendreCorps(); $("#as-input").focus(); };
      $("#as-saisie").onsubmit = function (e) { e.preventDefault(); var i = $("#as-input"); envoyer(i.value); i.value = ""; };
      Array.prototype.forEach.call(p.querySelectorAll("[data-r]"), function (x) {
        x.onclick = function () {
          var r = x.dataset.r;
          if (r === "rapide") { etat.conv = null; envoyer("Une idée de repas rapide", true); return; }
          if (r === "avec") { etat.conv = null; etat.attente = "ingredients"; rendreCorps(); var c = $("#as-corps"); c.insertAdjacentHTML("beforeend", '<div class="msg bot"><p>Écris-moi les ingrédients que tu as, séparés par des virgules.</p></div>'); c.scrollTop = c.scrollHeight; $("#as-input").focus(); return; }
          if (r === "subst") { etat.attente = "subst"; var c2 = $("#as-corps"); c2.insertAdjacentHTML("beforeend", '<div class="msg bot"><p>Quel ingrédient te manque ?</p></div>'); c2.scrollTop = c2.scrollHeight; $("#as-input").focus(); }
        };
      });
      p.addEventListener("click", function (e) {
        var a = e.target.closest("[data-ferme-mobile]"); if (a && window.innerWidth <= 560) ouvrir(false);
        if (e.target.closest("[data-ferme]")) ouvrir(false);
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && etat.ouvert) ouvrir(false); });
      rendreCorps();
    },
    rafraichir: function () { etat.conv = null; etat.onglet = "chat"; if ($("#as-corps")) rendreCorps(); },
    _repondre: repondre, _chercher: chercher
  };
})();
