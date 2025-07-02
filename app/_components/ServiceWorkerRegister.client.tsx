'use client';
import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    console.log('🚀 ~ ServiceWorkerRegister ~ process.env.NODE_ENV:', process.env.NODE_ENV);
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log('[Service Worker] Registered:', registration);
          })
          .catch(registrationError => {
            console.error('[Service Worker] Registration failed:', registrationError);
          });
        navigator.serviceWorker
          .register('/sw-custom.js')
          .then(registration => {
            console.log('[Service Worker] Registered:', registration);
          })
          .catch(registrationError => {
            console.error('[Service Worker] Registration failed:', registrationError);
          });
      });
    }
  }, []);

  return <></>;
}
