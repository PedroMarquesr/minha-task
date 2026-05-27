"use client"

import { useEffect } from "react"
import { Box, Text } from "@chakra-ui/react"
import NavBar from "@/components/NavBar/NavBar"
import HeroSection from "@/components/HeroSection/HeroSection"
import HeroTasksModel from "@/components/HeroTasksModel/HeroTasksModel"
import NotificationPermission from "@/components/NotificationPermission"
import { useStore } from "@/hooks/useStore"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  return (
    <>
      <Box bg="bgApp" minH="100vh">
        <NotificationPermission />
        <NavBar />
        <HeroSection />
        <HeroTasksModel />
      </Box>
    </>
  )
}
