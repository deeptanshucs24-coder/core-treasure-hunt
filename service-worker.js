const CACHE = 'core-hunt-shell-v1';
const ASSETS = ['./', './index.html', './login.html', './game.html', './checkpoint.html', './admin.html', './rules.html', './css/style.css', './js/game-data.js', './js/storage.js', './js/auth.js', './js/login.js', './js/game.js', './js/checkpoint.js', './js/admin.js', './js/qr.js'];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS))));
self.addEventListener('fetch', (event) => event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => caches.match('./index.html')))));
