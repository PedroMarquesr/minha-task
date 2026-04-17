"use client"

import { Flex, Box, Text } from "@chakra-ui/react"
import { GrStatusGoodSmall } from "react-icons/gr"

export default function IconStatus({ status }) {
  const handleColor = (status) => {
    switch (status) {
      case "concluido":
        return "green.500"
      case "pendente":
        return "red.500"
      case "andamento":
        return "yellow.500"
      default:
        return "gray"
    }
  }
  return (
    <Flex>
      <Text color={handleColor(status)}>
        <GrStatusGoodSmall />
      </Text>
    </Flex>
  )
}
