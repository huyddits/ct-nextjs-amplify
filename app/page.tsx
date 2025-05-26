'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, STORAGE_KEY } from '@/utils/constants';

export default function Home() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);
    router.push(token ? ROUTES.HOME : ROUTES.WELCOME);
  });

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setInstallPrompt(null);
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Cheer Trainer App</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Status</h2>
          <p className={`text-lg ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </p>
        </div>

        {installPrompt && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Install App</h3>
            <p className="text-blue-700 mb-4">Install this app for a better experience!</p>
            <button
              onClick={handleInstallClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Install Now
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">PWA Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Offline support</li>
              <li>✅ Push notifications</li>
              <li>✅ Install to home screen</li>
              <li>✅ Fast loading</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Android Wrapper</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Native Android app</li>
              <li>✅ App store distribution</li>
              <li>✅ Full screen experience</li>
              <li>✅ Hardware access</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
