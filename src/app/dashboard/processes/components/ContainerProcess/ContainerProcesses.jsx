import { Flex, Text, Icon, Accordion } from "@chakra-ui/react"
import { GoLaw } from "react-icons/go"
import { FaCheck, FaArchive } from "react-icons/fa"

export default function ContainerProcesses({ processes = [] }) {
  const emAndamento = processes.filter((p) => p.status === "em-andamento")
  const encerrados = processes.filter((p) => p.status === "encerrados")
  const arquivados = processes.filter((p) => p.status === "arquivados")

  return (
    <Flex w={"100%"} flexDir={"column"} gap={2}>
      <Accordion.Root>
        <Accordion.Item value="em-andamento">
          <Flex
            shadow={"2xl"}
            border={"1px solid"}
            borderColor={"purple.500"}
            borderRadius={"md"}
            alignItems={"center"}
            px={3}
            py={2}
            borderInlineStartWidth={"5px"}
            bgColor={"purple.100"}
          >
            <Accordion.ItemTrigger>
              <Icon as={GoLaw} size={"md"} color={"purple.800"} />
              <Text fontWeight={"semibold"} ml={4} color={"purple.900"}>
                Em andamento ({emAndamento.length})
              </Text>
              <Accordion.ItemIndicator size={"md"} color={"purple.800"} />
            </Accordion.ItemTrigger>
          </Flex>

          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Flex flexDir="column" w={"full"} gap={2}>
                {emAndamento.length === 0 ? (
                  <Text color={"gray.500"} fontSize="sm">
                    Nenhum processo
                  </Text>
                ) : (
                  emAndamento.map((process) => (
                    <Text
                      key={process.id}
                      color={"gray.700"}
                      _dark={{ color: "gray.200" }}
                    >
                      {process.processNumber}
                    </Text>
                  ))
                )}
              </Flex>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="encerrados">
          <Flex
            px={3}
            py={2}
            shadow={"2xl"}
            border={"1px solid"}
            borderColor={"red.500"}
            borderRadius={"md"}
            alignItems={"center"}
            borderInlineStartWidth={"5px"}
            bgColor={"red.50"}
          >
            <Accordion.ItemTrigger>
              <Icon as={FaCheck} size={"md"} color={"red.700"} />
              <Text fontWeight={"semibold"} ml={4} color={"red.700"}>
                Encerrados ({encerrados.length})
              </Text>
              <Accordion.ItemIndicator size={"md"} color={"red.700"} />
            </Accordion.ItemTrigger>
          </Flex>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Flex flexDir="column" w={"full"} gap={2}>
                {encerrados.length === 0 ? (
                  <Text color={"gray.500"} fontSize="sm">
                    Nenhum processo
                  </Text>
                ) : (
                  encerrados.map((process) => (
                    <Text
                      key={process.id}
                      color={"gray.700"}
                      _dark={{ color: "gray.200" }}
                    >
                      {process.processNumber}
                    </Text>
                  ))
                )}
              </Flex>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="arquivados">
          <Flex
            px={3}
            py={2}
            shadow={"2xl"}
            border={"1px solid"}
            borderColor={"blue.500"}
            borderRadius={"md"}
            alignItems={"center"}
            borderInlineStartWidth={"5px"}
            bgColor={"blue.50"}
          >
            <Accordion.ItemTrigger>
              <Icon as={FaArchive} size={"md"} color={"blue.700"} />
              <Text fontWeight={"semibold"} ml={4} color={"blue.700"}>
                Arquivados ({arquivados.length})
              </Text>
              <Accordion.ItemIndicator size={"md"} color={"blue.700"} />
            </Accordion.ItemTrigger>
          </Flex>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Flex flexDir="column" w={"full"} gap={2}>
                {arquivados.length === 0 ? (
                  <Text color={"gray.500"} fontSize="sm">
                    Nenhum processo
                  </Text>
                ) : (
                  arquivados.map((process) => (
                    <Text
                      key={process.id}
                      color={"gray.700"}
                      _dark={{ color: "gray.200" }}
                    >
                      {process.processNumber}
                    </Text>
                  ))
                )}
              </Flex>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Flex>
  )
}
