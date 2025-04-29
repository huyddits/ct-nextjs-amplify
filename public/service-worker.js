const CACHE_NAME = 'cheer-trainer';
const STATIC_ASSETS = [
    '/',
    '/offline.html',
    '/icons/icon-32x32.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
]

// Install and cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activate');
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((key) => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }))
        )
    );
    self.clients.claim();
});

// Serve from cache first, fallback to network, then to offline.html
self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    event.respondWith(
        caches.match(request).then((cached) => {
            return cached || fetch(request).catch(() => {
                if (request.mode === 'navigate') {
                    return caches.match('/offline.html')
                }
            });
        })
    );
});
