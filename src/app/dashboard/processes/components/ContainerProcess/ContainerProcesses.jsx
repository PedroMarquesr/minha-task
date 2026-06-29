"use client"

import { Flex, Text, Icon, Accordion } from "@chakra-ui/react"
import { GoLaw } from "react-icons/go"
import { FaCheck, FaArchive } from "react-icons/fa"
import ProcessCard from "./components/ProcessCard/ProcessCard"

export default function ContainerProcesses({ processes = [] }) {
  const emAndamento = processes.filter((p) => p.status === "em_andamento")
  const encerrados = processes.filter((p) => p.status === "encerrado")
  const arquivados = processes.filter((p) => p.status === "arquivado")

  return (
    <Flex w={"100%"} flexDir={"column"} gap={3}>
      <Accordion.Root multiple>
        <Accordion.Item value="em-andamento" border="none">
          <Flex
            flexDir="column"
            w="100%"
            borderRadius="md"
            overflow="hidden"
            border="1px solid"
            borderColor="purple.200"
            _dark={{ borderColor: "purple.800" }}
            borderInlineStartWidth="4px"
            borderInlineStartColor="purple.500"
          >
            <Accordion.ItemTrigger
              display="flex"
              alignItems="center"
              w="100%"
              px={4}
              py={3}
              cursor="pointer"
              bg="purple.50"
              _dark={{ bg: "purple.900/40" }}
            >
              <Icon
                as={GoLaw}
                boxSize={4}
                color="purple.700"
                _dark={{ color: "purple.300" }}
              />

              <Text
                fontWeight="semibold"
                ml={4}
                color="purple.900"
                _dark={{ color: "purple.100" }}
                flex="1"
              >
                Em andamento ({emAndamento.length})
              </Text>

              <Accordion.ItemIndicator
                color="purple.700"
                _dark={{ color: "purple.300" }}
              />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody
                px={4}
                py={3}
                bg="white"
                _dark={{ bg: "gray.900" }}
              >
                <Flex flexDir="column" w={"full"} gap={2}>
                  {emAndamento.length === 0 ? (
                    <Text color={"gray.500"} fontSize="sm">
                      Nenhum processo
                    </Text>
                  ) : (
                    emAndamento.map((process) => (
                      <ProcessCard
                        status={process.status}
                        processId={process.id}
                        processNumber={process.processNumber}
                        processType={process.typeProcess}
                        tribunal={process.tribunal}
                      />
                    ))
                  )}
                </Flex>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Flex>
        </Accordion.Item>

        <Accordion.Item value="encerrados" border="none">
          <Flex
            flexDir="column"
            w="100%"
            borderRadius="md"
            overflow="hidden"
            border="1px solid"
            borderColor="green.200"
            _dark={{ borderColor: "green.800" }}
            borderInlineStartWidth="4px"
            borderInlineStartColor="green.500"
            mt={3}
          >
            <Accordion.ItemTrigger
              display="flex"
              alignItems="center"
              w="100%"
              px={4}
              py={3}
              cursor="pointer"
              bg="green.50"
              _dark={{ bg: "green.900/40" }}
            >
              <Icon
                as={FaCheck}
                boxSize={4}
                color="green.700"
                _dark={{ color: "green.300" }}
              />
              <Text
                fontWeight="semibold"
                ml={4}
                color="green.900"
                _dark={{ color: "green.100" }}
                flex="1"
              >
                Encerrados ({encerrados.length})
              </Text>
              <Accordion.ItemIndicator
                color="green.700"
                _dark={{ color: "green.300" }}
              />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody
                px={4}
                py={3}
                bg="white"
                _dark={{ bg: "gray.900" }}
              >
                <Flex flexDir="column" w={"full"} gap={2}>
                  {encerrados.length === 0 ? (
                    <Text color={"gray.500"} fontSize="sm">
                      Nenhum processo
                    </Text>
                  ) : (
                    encerrados.map((process) => (
                      <ProcessCard
                        status={process.status}

                        processId={process.id}
                        processNumber={process.processNumber}
                        processType={process.typeProcess}
                        tribunal={process.tribunal}
                      />
                    ))
                  )}
                </Flex>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Flex>
        </Accordion.Item>

        <Accordion.Item value="arquivados" border="none">
          <Flex
            flexDir="column"
            w="100%"
            borderRadius="md"
            overflow="hidden"
            border="1px solid"
            borderColor="blue.200"
            _dark={{ borderColor: "blue.800" }}
            borderInlineStartWidth="4px"
            borderInlineStartColor="blue.500"
            mt={3}
          >
            <Accordion.ItemTrigger
              display="flex"
              alignItems="center"
              w="100%"
              px={4}
              py={3}
              cursor="pointer"
              bg="blue.50"
              _dark={{ bg: "blue.900/40" }}
            >
              <Icon
                as={FaArchive}
                boxSize={4}
                color="blue.700"
                _dark={{ color: "blue.300" }}
              />
              <Text
                fontWeight="semibold"
                ml={4}
                color="blue.900"
                _dark={{ color: "blue.100" }}
                flex="1"
              >
                Arquivados ({arquivados.length})
              </Text>
              <Accordion.ItemIndicator
                color="blue.700"
                _dark={{ color: "blue.300" }}
              />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody
                px={4}
                py={3}
                bg="white"
                _dark={{ bg: "gray.900" }}
              >
                <Flex flexDir="column" w={"full"} gap={2}>
                  {arquivados.length === 0 ? (
                    <Text color={"gray.500"} fontSize="sm">
                      Nenhum processo
                    </Text>
                  ) : (
                    arquivados.map((process) => (
                      <ProcessCard
                        status={process.status}

                        processId={process.id}
                        processNumber={process.processNumber}
                        processType={process.typeProcess}
                        tribunal={process.tribunal}
                      />
                    ))
                  )}
                </Flex>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Flex>
        </Accordion.Item>
      </Accordion.Root>
    </Flex>
  )
}
