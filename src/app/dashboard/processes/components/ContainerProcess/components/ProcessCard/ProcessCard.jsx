import { Flex, Text } from "@chakra-ui/react"

export default function ProcessCard({
  processNumber,
  processId,
  processType,
  tribunal,
}) {
  return (
    <Flex
      flexDir={"column"}
      border="1px solid"
      borderColor={"purple.200"}
      _dark={{ borderColor: "purple.700" }}
      _hover={{
        borderColor: "purple.500",
        bg: "purple.50",
        _dark: { bg: "purple.900/40" },
      }}
      borderRadius={"md"}
      p={2}
      gap={1}
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
    </Flex>
  )
}
