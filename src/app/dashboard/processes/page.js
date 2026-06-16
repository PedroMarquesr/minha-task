import { Flex, Text, Button } from "@chakra-ui/react"
import ProcessesSimpleCardsContainer from "./components/ProcessesSimpleCardsContainer/ProcessesSimpleCardsContainer"

export default function PageProcess() {
  return (
    <Flex p={4} flexDir="column" gap={5}>
      <Flex
        align={"center"}
        w={"100%"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex
          flexDir="column"
          ml={{ base: 0, md: 10 }}
          align={{ base: "center", md: "start" }}
        >
          <Text
            fontSize="2xl"
            fontWeight={"bold"}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
          >
            Processos
          </Text>
        </Flex>
        <Flex
          align={"center"}
          justify={"center"}
          w={{ base: "100%", md: "auto" }}
          mt={{ base: 4, md: 0 }}
        >
          <Button
            w={{ base: "100%", md: "auto" }}
            colorPalette={"purple"}
            mr={{ base: 0, md: 10 }}
            // onClick={() => setOpenDrawer(true)}
          >
            Adicionar processo
          </Button>
        </Flex>
      </Flex>
      <ProcessesSimpleCardsContainer />
    </Flex>
  )
}
