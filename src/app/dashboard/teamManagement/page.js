import { Flex, Text, Button } from "@chakra-ui/react"
import ContainerCounterMembers from "./components/ContainerCounterMembers/ContainerCounterMembers"
import { FaUserPlus } from "react-icons/fa6"

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
            fontSize="3xl"
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
            colorPalette={"green"}
            mr={{ base: 0, md: 10 }}
            //   onClick={() => setOpenDrawer(true)}
          >
            <FaUserPlus />
            Adicionar membro
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <ContainerCounterMembers />
      </Flex>
    </Flex>
  )
}
