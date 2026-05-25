// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
)

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
)

firebase.initializeApp({
  apiKey: "SUA_API_KEY",
  authDomain: "SUA_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log("Mensagem recebida:", payload)

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  })
})
