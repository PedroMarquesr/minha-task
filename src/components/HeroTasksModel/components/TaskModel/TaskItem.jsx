"use client"

import { Flex, Text } from "@chakra-ui/react"
import IconStatus from "../IconStatus/IconStatus"
import DueDateBox from "../DueDateBox/DueDateBox"

export default function TaskItem({ taskTitle, status, textDate }) {
  return (
    <Flex flexDir="row" p={2} gap={2} justifyContent={"space-between"}>
      <Flex flexDir="row" gap={2} alignItems={"center"}>
        <IconStatus status={status} />
        <Text>{taskTitle}</Text>
      </Flex>
      <DueDateBox textDate={textDate} />
    </Flex>
  )
}
