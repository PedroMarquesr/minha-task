// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js",
)

firebase.initializeApp({
  apiKey: "AIzaSyAf3jfszEYRi9dXju2FS-yOUDEkw4OAU0E",
  authDomain: "minha-task-pm.firebaseapp.com",
  projectId: "minha-task-pm",
  storageBucket: "minha-task-pm.firebasestorage.app",
  messagingSenderId: "991926162185",
  appId: "1:991926162185:web:38c14e153bfa29a34439d8",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  })
})
