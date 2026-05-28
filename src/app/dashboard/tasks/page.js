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
  Switch,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FaPlusSquare } from "react-icons/fa"
import TagTask from "./components/TagTask/TagTask"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import AlertCustom from "../components/AlertCustom/AlertCustom"
import ContainerTasks from "./components/ContainerTasks/ContainerTasks"
import { v4 as uuid } from "uuid"
import { useRouter } from "next/navigation"
import { useStore } from "@/hooks/useStore"

export default function Tasks() {
  const router = useRouter()
  const { user } = useStore()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [task, setTask] = useState({
    id: uuid(),
    userCreator: user?.displayName || "",
    userEmail: user?.email || "",
    title: "",
    description: "",
    priority: "",
    status: "",
    tags: [],
    dueDate: "",
    isCompleted: false,
  })
  const [hasDueDate, setHasDueDate] = useState(false)
  const [tag, setTag] = useState("")
  const [showAler, setShowAler] = useState(false)

  const handleAddTag = (tag) => {
    if (tag === "") {
      return
    }
    setTask({ ...task, tags: [...task.tags, tag] })
    setTag("")
  }

  const handleDeleteTag = (tag) => {
    setTask({ ...task, tags: task.tags.filter((t) => t !== tag) })
  }

  const handleSaveTask = async () => {
    const tasksCol = collection(db, "tasks")
    const newTask = {
      ...task,
      userCreator: user?.displayName,
      userEmail: user?.email,
      createdAt: new Date(),
      userId: user?.uid,
      companyId: user?.companyId,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }
    await addDoc(tasksCol, newTask)
    setOpenDrawer(false)
    setTask({
      id: uuid(),
      userCreator: user?.displayName || "",
      userEmail: user?.email || "",
      title: "",
      description: "",
      priority: "",
      status: "",
      tags: [],
      dueDate: "",
      isCompleted: false,
    })
    setShowAler(true)
    setTimeout(() => {
      setShowAler(false)
    }, 3000)
  }

  return (
    <Flex p={{ base: 4, md: 10 }} flexDir={"column"} gap={5} w="100%" overflowX="hidden" boxSizing="border-box">
      <AlertCustom
        description="Tarefa adicionada com sucesso"
        status={"success"}
        open={showAler}
      />
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
            Tarefas
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
            onClick={() => setOpenDrawer(true)}
          >
            Adicionar tarefa
          </Button>
        </Flex>
      </Flex>
      <ContainerTasks />

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
                        <Input
                          placeholder="Titulo da tarefa"
                          value={task.title}
                          onChange={(e) =>
                            setTask({ ...task, title: e.target.value })
                          }
                        />
                      </Stack>
                    </Field.Root>
                    <Field.Root>
                      <Stack>
                        <Field.Label>Descrição</Field.Label>
                        <Textarea
                          placeholder="Descrição..."
                          value={task.description}
                          onChange={(e) =>
                            setTask({ ...task, description: e.target.value })
                          }
                        />
                      </Stack>
                    </Field.Root>
                    <Field.Root>
                      <Stack>
                        <Field.Label>Prioridade</Field.Label>
                        <NativeSelect.Root
                          defaultValue={"Selecione a prioridade"}
                          onChange={(e) =>
                            setTask({ ...task, priority: e.target.value })
                          }
                        >
                          <NativeSelect.Field name="Prioridade">
                            <For
                              each={[
                                { label: "Selecione a prioridade", icon: "" },
                                { label: "Baixa", icon: "🟢" },
                                { label: "Media", icon: "🟡" },
                                { label: "Alta", icon: "🟠" },
                                { label: "Urgente", icon: "🔴" },
                              ]}
                            >
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
                        <NativeSelect.Root
                          defaultValue={"Selecione o status"}
                          onChange={(e) => {
                            const isCompleted =
                              e.target.value === "Concluido" ? true : false
                            setTask({
                              ...task,
                              status: e.target.value,
                              isCompleted,
                            })
                          }}
                        >
                          <NativeSelect.Field name="Status">
                            <For
                              each={[
                                "Selecione o status",
                                "A fazer",
                                "Fazendo",
                                "Concluido",
                              ]}
                            >
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
                          <Input
                            placeholder="Tags da tarefa"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddTag(tag)
                            }
                          />
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
                          <TagTask
                            functionDeleteTag={handleDeleteTag}
                            key={tag}
                            tagTitle={tag}
                          />
                        ))}
                      </Stack>
                    </Field.Root>

                    <Field.Root>
                      <Stack>
                        <Switch.Root
                          colorPalette="purple"
                          checked={hasDueDate}
                          onChange={() => setHasDueDate(!hasDueDate)}
                        >
                          <Switch.Label>Contém prazo?</Switch.Label>
                          <Switch.HiddenInput />
                          <Switch.Control>
                            <Switch.Thumb />
                          </Switch.Control>
                        </Switch.Root>
                      </Stack>
                    </Field.Root>

                    {hasDueDate && (
                      <Field.Root>
                        <Stack>
                          <Field.Label>Prazo</Field.Label>
                          <Input
                            placeholder="Prazo da tarefa"
                            value={task.dueDate}
                            type="datetime-local"
                            onChange={(e) =>
                              setTask({ ...task, dueDate: e.target.value })
                            }
                          />
                        </Stack>
                      </Field.Root>
                    )}
                  </Fieldset.Content>
                </Fieldset.Root>
              </Drawer.Body>
              <Drawer.Footer>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpenDrawer(false)
                    setTask({
                      id: uuid(),
                      userCreator: user?.displayName,
                      userEmail: user?.email,
                      title: "",
                      description: "",
                      priority: "",
                      status: "",
                      tags: [],
                      dueDate: "",
                      isCompleted: false,
                    })
                    setTag("")
                    setHasDueDate(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    handleSaveTask()
                    setTag("")
                    setHasDueDate(false)
                  }}
                >
                  Salvar
                </Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Flex>
  )
}
