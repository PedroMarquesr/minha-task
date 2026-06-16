"use client"

import { Flex, Text } from "@chakra-ui/react"
import ContainerSimpleCards from "./components/ContainerSimpleCards/ContainerSimpleCards"
import { useStore } from "@/hooks/useStore"
import ProcessesSimpleCardsContainer from "./processes/components/ProcessesSimpleCardsContainer/ProcessesSimpleCardsContainer"

export default function Dashboard() {
  const { user } = useStore()
  return (
    <Flex p={4} flexDir="column" gap={5}>
      <Text fontSize="2xl">Dashboard Home</Text>
      <ContainerSimpleCards linkTasks="/dashboard/tasks" />
      <ProcessesSimpleCardsContainer />
    </Flex>
  )
}
