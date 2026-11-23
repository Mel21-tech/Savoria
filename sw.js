/* SAVORIA — service worker : l'app s'ouvre même hors connexion.
   Après une mise à jour du site, change le numéro de VERSION pour forcer le rafraîchissement. */
const VERSION = "savoria-v4";
const ESSENTIELS = [
  "./", "./index.html", "./manifest.webmanifest", "./css/style.css",
  "./js/config.js", "./js/ingredients.js", "./js/nutrition.js", "./js/recipes.js", "./js/recettes-tendances.js", "./js/recettes-plus.js", "./js/recettes-appareils.js",
  "./js/store.js", "./js/app.js", "./js/extras.js", "./js/assistant.js",
  "./images/plat-signature.jpg", "./icons/icon-192.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ESSENTIELS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  /* Photos : cache d'abord (elles changent rarement). Le reste : réseau d'abord, cache si hors ligne. */
  if (req.destination === "image") {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(r => r || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  e.respondWith(fetch(req, { cache: "no-cache" }).then(res => { if (res.ok) caches.open(VERSION).then(c => c.put(req, res.clone())); return res; })
    .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html"))));
});
