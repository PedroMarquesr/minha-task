'use client';

import { Box, Text } from "@chakra-ui/react";

import NavBar from "@/components/NavBar/NavBar";

export default function Home() {
  return (
    <Box p={5} bg="bgApp" minH="100vh">
      <NavBar />
    </Box>
  );
}
