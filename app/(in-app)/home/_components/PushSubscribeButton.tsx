'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store';

const VAPID_PUBLIC_KEY =
  'BNQyIwbMsS5qTVcg0VWppU-4SQSzdN6hu8WL7BIb1jlHOTQlmhIOLn7bsaj4JvtTVTcQLuP-bedtqsFdi-7tRkM';
const ENDPOINT = 'http://localhost:3000/api/v1/notification/subscribe-web';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushSubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const token = useAuthStore(s => s.token);

  async function autoSubscribeForPush() {
    setLoading(true);
    setResult(null);
    try {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        await navigator.serviceWorker.register('/sw.js');
        const registration = await navigator.serviceWorker.ready;
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          setResult('Notification permission denied.');
          setLoading(false);
          return;
        }
        const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ subscription }),
        });
        if (res.ok) {
          setResult('Subscribed and sent to backend successfully!');
        } else {
          setResult('Failed to send subscription to backend.');
        }
      } else {
        setResult('Push notifications are not supported in this browser.');
      }
    } catch (err: any) {
      setResult('Error: ' + (err?.message || err));
    }
    setLoading(false);
  }

  return (
    <div className="my-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={autoSubscribeForPush}
        disabled={loading}
      >
        {loading ? 'Subscribing...' : 'Subscribe to Push Notifications'}
      </button>
      {result && <div className="mt-2 text-sm">{result}</div>}
    </div>
  );
}
