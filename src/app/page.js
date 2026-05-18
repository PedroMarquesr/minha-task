"use client"

import { Box, Text } from "@chakra-ui/react"

import NavBar from "@/components/NavBar/NavBar"
import HeroSection from "@/components/HeroSection/HeroSection"
import HeroTasksModel from "@/components/HeroTasksModel/HeroTasksModel"

export default function Home() {
  return (
    <Box bg="bgApp" minH="100vh">
      <NavBar />
      <HeroSection />
      <HeroTasksModel />
    </Box>
  )
}
