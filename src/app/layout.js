"use client"

import { Provider } from "@/components/ui/provider"
import { Jost, DM_Serif_Display } from "next/font/google"
import { Box } from "@chakra-ui/react"
import { useStore } from "@/hooks/useStore"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
})

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
})

// Componente separado para os listeners
function ActivityTracker() {
  const updateActivity = useStore((s) => s.updateActivity)
  const checkInactivity = useStore((s) => s.checkInactivity)
  const user = useStore((s) => s.user)
  const router = useRouter()

  // Redireciona quando deslogar por inatividade
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user])

  useEffect(() => {
    const eventos = ["click", "keydown", "scroll", "mousemove"]
    eventos.forEach((e) => window.addEventListener(e, updateActivity))

    const intervalo = setInterval(checkInactivity, 30 * 1000)

    return () => {
      eventos.forEach((e) => window.removeEventListener(e, updateActivity))
      clearInterval(intervalo)
    }
  }, [])

  return null
}

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      className={`${jost.variable} ${dmSerif.variable}`}
    >
      <body>
        <Provider>
          <ActivityTracker /> {/* ← dentro do Provider */}
          <Box bg="bgApp" minH="100vh">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  )
}
