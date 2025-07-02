'use client';
import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    console.log('🚀 ~ ServiceWorkerRegister ~ process.env.NODE_ENV:', process.env.NODE_ENV);
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js', { updateViaCache: 'none' })
          .then(registration => {
            console.log('[Service Worker] Registered:', registration);

            // Force update check
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[Service Worker] New version available, updating...');
                    // Force the new service worker to take control
                    newWorker.postMessage({ action: 'skipWaiting' });
                  }
                });
              }
            });

            // Check for updates every time the page loads
            registration.update();
          })
          .catch(registrationError => {
            console.error('[Service Worker] Registration failed:', registrationError);
          });
      });
    }
  }, []);

  return <></>;
}
