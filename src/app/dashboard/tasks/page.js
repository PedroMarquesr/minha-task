"use client"

import {
  Flex,
  Text,
  Button,
  CloseButton,
  Drawer,
  Portal,
  Field,
  Fieldset,
  Input,
  Stack,
  NativeSelect,
  For,
  Icon,
  IconButton,
  Textarea,
} from "@chakra-ui/react"
import { FaPlusSquare } from "react-icons/fa"

import { useState } from "react"

export default function Tasks() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    tags: [],
    dueDate: "",
  })

  return (
    <Flex p={10}>
      <Flex
        align={"center"}
        w={"100%"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex flexDir="column" ml={10}>
          <Text
            fontSize="5xl"
            fontWeight={"bold"}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
          >
            Tarefas
          </Text>
          <Text fontSize="xl" color={"gray.600"} _dark={{ color: "gray.400" }}>
            8 tarefas
          </Text>{" "}
          {/*Aqui serão informadas as tarefas vigentes*/}
        </Flex>
        <Flex>
          <Button
            colorPalette={"purple"}
            mr={10}
            onClick={() => setOpenDrawer(true)}
          >
            Adicionar tarefa
          </Button>
        </Flex>
      </Flex>

      <Drawer.Root open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Adicionar tarefa</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Fieldset.Root>
                  <Fieldset.Content>
                    <Field.Root>
                      <Stack>
                        <Field.Label>Titulo</Field.Label>
                        <Input placeholder="Titulo da tarefa" />
                      </Stack>
                    </Field.Root>
                    <Field.Root>
                      <Stack>
                        <Field.Label>Descrição</Field.Label>
                        <Textarea placeholder="Descrição..." />
                      </Stack>
                    </Field.Root>
                    <Field.Root>
                      <Stack>
                        <Field.Label>Prioridade</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field name="Prioridade">
                            <For each={["Baixa", "Media", "Alta", "Urgente"]}>
                              {(item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              )}
                            </For>
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                        <Field.Label>Status</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field name="Status">
                            <For each={["A fazer", "Fazendo", "Concluido"]}>
                              {(item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              )}
                            </For>
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>{" "}
                      </Stack>
                    </Field.Root>

                    <Field.Root>
                      <Stack>
                        <Field.Label>Tags</Field.Label>
                        <Flex>
                          <Input placeholder="Tags da tarefa" />
                          <IconButton
                            size="lg"
                            variant="link"
                            color={"purple.700"}
                            aria-label="Adicionar tag"
                            _hover={{
                              color: "purple.400",
                              cursor: "pointer",
                              transform: "translate(0, -2px)",
                            }}
                            //onClick={() => console.log("Adicionar tag")}
                          >
                            <Icon as={FaPlusSquare} />
                          </IconButton>
                        </Flex>
                      </Stack>
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant="outline" onClick={() => setOpenDrawer(false)}>
                  Sair
                </Button>
                <Button>Salvar</Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger onClick={() => setOpenDrawer(false)}>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Flex>
  )
}
