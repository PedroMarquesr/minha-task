"use client"

import { Flex, Text } from "@chakra-ui/react"

export default function DueDateBox({ textDate }) {
  return (
    <Flex>
      <Text>{textDate}</Text>
    </Flex>
  )
}
