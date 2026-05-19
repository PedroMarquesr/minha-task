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
  Tag,
} from "@chakra-ui/react"
import { FaPlusSquare } from "react-icons/fa"
import TagTask from "./components/TagTask/TagTask"

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

  const [tag, setTag] = useState("")

  const handleAddTag = (tag) => {
    if (tag === "") {
      return;
    }
    setTask({ ...task, tags: [...task.tags, tag] })
    setTag("")
  }

  const handleDeleteTag = (tag) => {
    setTask({ ...task, tags: task.tags.filter((t) => t !== tag) })
  }

  return (
    <Flex p={10}>
      <Flex
        align={"center"}
        w={"100%"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex flexDir="column" ml={{ base: 0, md: 10 }} align={{ base: "center", md: "start" }} >
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
        <Flex align={"center"} justify={"center"} w={{ base: "100%", md: "auto" }} mt={{ base: 4, md: 0 }}>
          <Button
            w={{ base: "100%", md: "auto" }}
            colorPalette={"purple"}
            mr={{ base: 0, md: 10 }}
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
                        <Input placeholder="Titulo da tarefa" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
                      </Stack>
                    </Field.Root>
                    <Field.Root>
                      <Stack>
                        <Field.Label>Descrição</Field.Label>
                        <Textarea placeholder="Descrição..." value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
                      </Stack>
                    </Field.Root>
                    <Field.Root>
                      <Stack>
                        <Field.Label>Prioridade</Field.Label>
                        <NativeSelect.Root defaultValue={"Selecione a prioridade"} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
                          <NativeSelect.Field name="Prioridade">
                            <For each={[
                              { label: "Selecione a prioridade", icon: "" },
                              { label: "Baixa", icon: "🟢" },
                              { label: "Media", icon: "🟡" },
                              { label: "Alta", icon: "🟠" },
                              { label: "Urgente", icon: "🔴" }
                            ]}>
                              {(item) => (
                                <option key={item.label} value={item.label}>
                                  {item.icon} {item.label}
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
                          <Input placeholder="Tags da tarefa" value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddTag(tag)} />
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
                            onClick={() => handleAddTag(tag)}
                          >
                            <Icon as={FaPlusSquare} />
                          </IconButton>
                        </Flex>
                        {task.tags.map((tag) => (
                          <TagTask functionDeleteTag={handleDeleteTag} key={tag} tagTitle={tag} />
                        ))}

                      </Stack>
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant="outline" onClick={() => {
                  setOpenDrawer(false)
                  setTask({
                    title: "",
                    description: "",
                    priority: "",
                    status: "",
                    tags: [],
                    dueDate: "",
                  })
                }}>
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
