"use client"

import { Flex, Image, Box } from "@chakra-ui/react"
import IconStatusModel from "./components/IconStatus/IconStatusModel"
import TaskModel from "./components/TaskModel/TaskModel"
import MetricsGroupModel from "./components/MetricsGroupModel/MetricsGroupModel"

export default function HeroTasksModel() {
  return (
    <Flex flexDir="column" px={{ base: 2, md: 60 }} borderRadius={10}>
      <Flex
        boxShadow="xl"
        flexDir="column"
        gap={2}
        borderRadius="xl"
        borderColor="gray.200"
        borderWidth="1px"
        bg="whiteAlpha.400"
        _dark={{
          bg: "gray.800",
          borderColor: "gray.700",
          boxShadow: "dark-lg",
        }}
        p={5}
      >
        <Flex flexDir="column" py={2}>
          <IconStatusModel />
        </Flex>

        <Flex flexDir="column" gap={2}>
          <MetricsGroupModel />
        </Flex>

        <Flex flexDir="column" gap={2}>
          <TaskModel />
        </Flex>
      </Flex>
    </Flex>
  )
}
