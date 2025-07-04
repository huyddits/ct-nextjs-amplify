importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDbwZGYe3RyjX6_jbee_42i9WtSlAnBZOQ',
  authDomain: 'cheer-trainer-notifications.firebaseapp.com',
  projectId: 'cheer-trainer-notifications',
  storageBucket: 'cheer-trainer-notifications.firebasestorage.app',
  messagingSenderId: '371404659193',
  appId: '1:371404659193:web:4701914fbedf95a4c54528',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.jpg',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
