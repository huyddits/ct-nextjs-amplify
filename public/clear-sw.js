// Add this script to your main layout or a page to manually clear service worker cache
// Remove this after deployment is confirmed working

(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
        console.log('Service Worker unregistered:', registration);
      }
    });

    // Clear all caches
    if ('caches' in window) {
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      });
    }
  }
})();
