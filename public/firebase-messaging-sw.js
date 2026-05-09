importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBSxxZOEAn5kyj5xRZpkX3i8Pcvj7YQV2A",
  authDomain: "rovix-home.firebaseapp.com",
  projectId: "rovix-home",
  storageBucket: "rovix-home.firebasestorage.app",
  messagingSenderId: "443037415645",
  appId: "1:443037415645:web:a66aee2b19c69f7c464334"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/img/logo.png"
  });

});