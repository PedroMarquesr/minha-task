"use client"

import { Provider } from "@/components/ui/provider"
import { Jost, DM_Serif_Display } from "next/font/google"


const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
})

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
})

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning className={`${jost.variable} ${dmSerif.variable}`}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}