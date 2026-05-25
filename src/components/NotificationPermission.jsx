"use client"

import { useEffect } from "react"
import { getToken } from "firebase/messaging"
import { messaging } from "@/lib/firebase"

export default function NotificationPermission() {
  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission()

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        })
      }
    }

    requestPermission()
  }, [])

  return null
}
