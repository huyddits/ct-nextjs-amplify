import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDbwZGYe3RyjX6_jbee_42i9WtSlAnBZOQ",
  authDomain: "cheer-trainer-notifications.firebaseapp.com",
  projectId: "cheer-trainer-notifications",
  storageBucket: "cheer-trainer-notifications.firebasestorage.app",
  messagingSenderId: "371404659193",
  appId: "1:371404659193:web:4701914fbedf95a4c54528"
};

const VAPID_KEY = "BL4HARtYT1KWzVvDNn8X1nhoYrarmbRKvyhNxqTSB6yiIP9syiFHQ6PtgTPWNagDNCjYMRzX0xlw8tWLYtN5EVo"; // <-- Replace with your Web Push certificate key from Firebase Console

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default function FCMTestButton() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const buttonStyle = {
    background: '#2563eb', // blue-600
    color: 'white',
    border: 'none',
    borderRadius: 4,
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 600,
    marginRight: 8,
  };

  const handleGetToken = async () => {
    try {
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log('FCM Token:', currentToken);
      if (currentToken) {
        setToken(currentToken);
        setError("");
        setApiResponse("");
        alert("Token acquired! You can now send it to the backend.");
      } else {
        setError("No registration token available. Request permission to generate one.");
      }
    } catch (err) {
      setError("An error occurred while retrieving token. " + err.message);
      console.error('FCM Error:', err);
    }
  };

  const handleSendToBackend = async () => {
    try {
      const jwt = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/v1/notification/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          fcmToken: token,
          platform: 'web',
        }),
      });
      if (res.ok) {
        setApiResponse('Token sent to backend successfully!');
      } else {
        const data = await res.json().catch(() => ({}));
        setApiResponse('Failed to send token to backend: ' + (data.message || res.status));
      }
    } catch (err) {
      setApiResponse('Failed to send token to backend: ' + err.message);
      console.error('API Error:', err);
    }
  };

  // Listen for foreground messages
  onMessage(messaging, (payload) => {
    alert("Push received: " + JSON.stringify(payload));
  });

  return (
    <div>
      <button style={buttonStyle} onClick={handleGetToken}>Get FCM Token</button>
      <div style={{ marginTop: 8 }}>
        <button style={buttonStyle} onClick={handleSendToBackend}>Send Token to Backend</button>
      </div>
      {token && (
        <div>
          <p><b>FCM Token:</b></p>
          <textarea value={token} readOnly rows={4} cols={60} />
        </div>
      )}
      {apiResponse && <p style={{ color: "green" }}>{apiResponse}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
} 