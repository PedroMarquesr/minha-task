"use client"

import { Flex, Text, Mark } from "@chakra-ui/react"

export default function HeroSection() {
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: 0, md: 60 }}
    >
      <Flex
        flexDir="column"
        gap={2}
        alignItems="center"
        justifyContent={"center"}
        w={"100%"}
        p={10}
      >
        <Flex>
          <Text
            fontWeight="bold"
            fontFamily={"heading"}
            fontSize={"6xl"}
            textAlign={"center"}
          >
            Gestão de tarefas que
            <Mark color="blue.500"> simplificam</Mark> a sua rotina
          </Text>
        </Flex>
        <Flex>
          <Text
            fontSize={"xl"}
            color={"gray.500"}
            _dark={{ color: "gray.200" }}
            textAlign="center"
            fontFamily={"heading"}
          >
            Controle processos, prazos, contratos e equipes em uma só
            plataforma.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
