import { Flex, Text, Accordion } from "@chakra-ui/react"
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


export default function ProcessCard({
  processNumber,
  processId,
  processType,
  tribunal,
  status,
}) {


  const handleColorStatus = (status) => {
    switch (status) {
      case "em_andamento":
        return {
          borderColor: "purple.200",
          _dark: { borderColor: "purple.700" },
          _hover: {
            borderColor: "purple.500",
            bg: "purple.50",
            _dark: { bg: "purple.900/40" },
          },
        }
      case "encerrado":
        return {
          borderColor: "green.200",
          _dark: { borderColor: "green.700" },
          _hover: {
            borderColor: "green.500",
            bg: "green.50",
            _dark: { bg: "green.900/40" },
          },
        }
      case "arquivado":
        return {
          borderColor: "blue.200",
          _dark: { borderColor: "blue.700" },
          _hover: {
            borderColor: "blue.500",
            bg: "blue.50",
            _dark: { bg: "blue.900/40" },
          },
        }
    }
  }

  return (
    <Flex
      key={processId}
      flexDir={"column"}
      border="1px solid"

      borderRadius={"md"}
      p={2}
      gap={1}
      {...handleColorStatus(status)}


    >
      <Text key={processId} color={"gray.700"} _dark={{ color: "gray.200" }}>
        {processNumber}
      </Text>
      <Flex
        gap={2}
        fontSize={"xs"}
        color={"gray.600"}
        _dark={{ color: "gray.300" }}
      >
        <Text>{processType} </Text>
        <Text>-</Text>

        <Text>{tribunal}</Text>
      </Flex>
      <Flex>
        <Accordion.Root collapsible>
          <Accordion.Item>
            <Accordion.ItemTrigger>
              <Accordion.ItemIndicator />

            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Text>Conteudo do card em accordiom</Text>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Flex>
    </Flex>
  )
}
