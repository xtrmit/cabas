/* Service worker de Cabas : rend l'app disponible hors ligne et gère la mise à jour.
   - Chaque version (version.js) a son propre cache, préfixé par l'adresse du site
     (test et prod partagent le même domaine github.io : leurs caches ne se mélangent pas).
   - Une nouvelle version se télécharge en arrière-plan, puis prend la main toute seule. */
importScripts('version.js');

const PREFIX = 'cabas|' + self.registration.scope + '|';
const CACHE = PREFIX + self.CABAS_VERSION;
const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(self.location.hostname) || !/github\.io$/.test(self.location.hostname);

const ASSETS = [
  './', 'index.html', 'css/app.css', 'js/app.js', 'version.js',
  'manifest.webmanifest', 'manifest-test.webmanifest',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png',
  'icons/test-icon-192.png', 'icons/test-icon-512.png', 'icons/test-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'version' && e.source) e.source.postMessage({ type: 'version', version: self.CABAS_VERSION });
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Sur le PC (développement) : toujours le réseau d'abord, le cache seulement en secours.
  if (LOCAL) {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return r;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
    );
    return;
  }

  // Sur le téléphone : le cache d'abord (instantané, hors ligne), le réseau en secours.
  e.respondWith(
    caches.open(CACHE).then(c =>
      c.match(req, { ignoreSearch: true }).then(hit => {
        if (hit) return hit;
        if (req.mode === 'navigate') return c.match('index.html').then(r => r || fetch(req));
        return fetch(req);
      })
    )
  );
});
