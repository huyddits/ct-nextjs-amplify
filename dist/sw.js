const CACHE_NAME = "cheer-trainer-v1";
const STATIC_ASSETS = [
    // "/_next/static/media/569ce4b8f30dc480-s.p.woff2",
    // "/_next/static/media/93f479601ee12b01-s.p.woff2",
    // "/_next/static/css/ae0b20ccefa798e8.css",
    // "/_next/static/chunks/webpack-05cc406d6a87b1a9.js",
    // "/_next/static/chunks/4bd1b696-7b9071663a568a36.js",
    // "/_next/static/chunks/684-874e8e27a5a83ea9.js",
    // "/_next/static/chunks/main-app-f10c36a7cb2cddae.js",
    // "/_next/static/chunks/179-63132270c544f357.js",
    // "/_next/static/chunks/app/page-925ec1aed177fc58.js",
];

// install
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
})

// activate
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

// fetch
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    const req = event.request;
    const url = new URL(req.url);

    // Match only requests to your domain
    if (url.origin !== location.origin) return;

    // Static assets (HTML, CSS, JS from /_next/)
    if (url.pathname.startsWith("/_next/")) {
        event.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                const cached = await cache.match(req);
                if (cached) return cached;

                try {
                    const fresh = await fetch(req);
                    cache.put(req, fresh.clone());
                    return fresh;
                } catch (e) {
                    return new Response("Offline", { status: 503 });
                }
            })
        );
        return;
    }

    if (STATIC_ASSETS.includes(url.pathname)) {
        event.respondWith(
            caches.match(req).then((res) => res || fetch(req))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response ||
                fetch(event.request).catch(() =>
                    caches.match("/offline.html") // fallback for offline
                )
            );
        })
    );
});


// push
self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json()
        const options = {
            body: data.body,
            icon: data.icon || '/icon.png',
            badge: '/badge.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
            },
        }
        event.waitUntil(self.registration.showNotification(data.title, options))
    }
})


// notification click
self.addEventListener('notificationclick', function (event) {
    console.log('Notification click received.')
    event.notification.close()
    event.waitUntil(clients.openWindow(process.env.NEXT_PUBLIC_URL))
})


