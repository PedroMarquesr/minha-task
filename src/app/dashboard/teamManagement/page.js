import { Flex, Text, Button } from "@chakra-ui/react"
import BoxCounterMember from "./components/BoxCounterMember/BoxCounterMember"

export default function TeamManagement() {
  return (
    <Flex
      p={{ base: 4, md: 10 }}
      flexDir={"column"}
      gap={5}
      w="100%"
      overflowX="hidden"
      boxSizing="border-box"
    >
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
            fontSize="5xl"
            fontWeight={"bold"}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
          >
            Gerenciamento de equipe
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
            //   onClick={() => setOpenDrawer(true)}
          >
            Adicionar membro
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <BoxCounterMember count={10} label="Membros" />
        <BoxCounterMember count={10} label="Membros" />
        <BoxCounterMember count={10} label="Membros" />
      </Flex>
    </Flex>
  )
}
