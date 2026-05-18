"use client"

import { Flex, Text } from "@chakra-ui/react"
import MetricBox from "../MetricBox/MetricBox"

export default function MetricsGroupModel() {
  return (
    <Flex
      gap={2}
      justifyContent={{ base: "center", md: "space-around" }}
      flexDir={{ base: "column", md: "row" }}
    >
      <MetricBox status="concluido" statusText="Concluídos" quantity={35} />
      <MetricBox status="andamento" statusText="Em Andamento" quantity={20} />
      <MetricBox status="atrasado" statusText="Atrasados" quantity={5} />
    </Flex>
  )
}
