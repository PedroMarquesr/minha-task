import { Flex, Text } from "@chakra-ui/react"

export default function ContainerProcess({
  numeroprocess,
  tipo,
  status,
  data,
}) {
  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      h={"100%"}
      justifyContent={"start"}
      alignItems={"center"}
      p={5}
      gap={5}
    >
      <Flex w={"100%"} justifyContent={"space-between"}>
        <Flex w={"20%"} justifyContent={"start"}>
          <Text>{numeroprocess}</Text>
        </Flex>
        <Flex w={"20%"} justifyContent={"center"}>
          <Text>{tipo}</Text>
        </Flex>
        <Flex w={"20%"}>
          <Text>{status}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
