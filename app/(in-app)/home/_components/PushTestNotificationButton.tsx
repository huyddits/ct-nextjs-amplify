'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store';

const ENDPOINT = 'http://localhost:3000/api/v1/notification/send'; // Change to your backend URL if needed

export default function PushTestNotificationButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const token = useAuthStore(s => s.token);

  async function sendTestNotification() {
    setLoading(true);
    setResult(null);
    try {
      const payload = { title, message };
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setResult('Notification sent!');
      } else {
        setResult('Failed to send notification.');
      }
    } catch (err: any) {
      setResult('Error: ' + (err?.message || err));
    }
    setLoading(false);
  }

  return (
    <div className="my-4 space-y-2">
      <input
        className="border px-2 py-1 mr-2"
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className="border px-2 py-1 mr-2"
        type="text"
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        onClick={sendTestNotification}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Test Notification'}
      </button>
      {result && <div className="mt-2 text-sm">{result}</div>}
    </div>
  );
}
