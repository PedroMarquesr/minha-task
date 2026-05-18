"use client"

import { Flex, Text } from "@chakra-ui/react"
import ContainerSimpleCards from "./components/ContainerSimpleCards/ContainerSimpleCards"

export default function Dashboard() {
  return (
    <Flex p={4} flexDir="column" gap={5}>
      <Text fontSize="2xl">Dashboard Home</Text>
      <ContainerSimpleCards />
    </Flex>
  )
}
