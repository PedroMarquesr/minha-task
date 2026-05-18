"use client"
import { Flex, Text } from "@chakra-ui/react"
import IconStatus from "./IconStatus"

export default function IconStatusModel({ status }) {
  return (
    <Flex flexDir="row" gap={1}>
      <IconStatus status="concluido" />
      <IconStatus status="pendente" />
      <IconStatus status="andamento" />
    </Flex>
  )
}
