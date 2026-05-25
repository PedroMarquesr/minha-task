"use client"

import { Box, Text } from "@chakra-ui/react"
import NavBar from "@/components/NavBar/NavBar"
import HeroSection from "@/components/HeroSection/HeroSection"
import HeroTasksModel from "@/components/HeroTasksModel/HeroTasksModel"
import NotificationPermission from "@/components/NotificationPermission"

export default function Home() {
  return (
    <Box bg="bgApp" minH="100vh">
      <NotificationPermission />
      <NavBar />
      <HeroSection />
      <HeroTasksModel />
    </Box>
  )
}
