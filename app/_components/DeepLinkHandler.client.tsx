'use client';

import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useRouter } from 'next/navigation';

export default function DeepLinkHandler() {
  const router = useRouter();

  useEffect(() => {
    App.addListener('appUrlOpen', data => {
      try {
        const url = new URL(data.url);
        const path = url.pathname + url.search;
        console.log('[DeepLink] Navigating to:', path);
        router.push(path);
      } catch (e) {
        console.warn('[DeepLink] Invalid URL:', data.url);
      }
    });
    return () => {
      App.removeAllListeners();
    };
  }, [router]);
  return null;
}
