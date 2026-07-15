import {
  Dialog,
  Flex,
  Input,
  Portal,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react"
import ComboboxProcess from "@/app/dashboard/processes/components/ComboboxProcess/ComboboxProcess"
import { useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa"
import { Tooltip } from "@/components/ui/tooltip"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useStore } from "@/hooks/useStore"
import { v4 as uuidv4 } from "uuid"
import AlertCustom from "@/app/dashboard/components/AlertCustom/AlertCustom"

const initialEventState = {
  tipo: null,
  data: "",
  status: null,
  local: "",
  tipoAudiencia: "",
  testemunhas: [],
  camposCustomizaveis: [],
  custos: [],
}

export default function DialogNewEvent({ isOpen, setIsOpen, processId }) {
  const [event, setEvent] = useState(initialEventState)
  const [openAlert, setOpenAlert] = useState(false)
  const { user } = useStore()

  const handleClose = () => {
    setEvent(initialEventState)
    setIsOpen(false)
  }

  const handleSalvar = async () => {
    if (!user?.companyId) return

    const eventId = uuidv4()
    const eventData = {
      ...event,
      processId,
      id: eventId,
      companyId: user.companyId,
      creatorId: user.uid,
      userCreator: user.displayName ?? "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    console.log("Evento a salvar:", eventData)
    await setDoc(doc(db, "events", eventId), eventData)

    handleClose()
    setOpenAlert(true)
    setTimeout(() => {
      setOpenAlert(false)
    }, 2000)
  }

  const optionsTypeEvent = [
    { label: "Audiência", value: "audiencia" },
    { label: "Perícia", value: "pericia" },
    { label: "Despacho", value: "despacho" },
    { label: "Outro", value: "outro" },
  ]
  const optionsStatusEvent = [
    { label: "Agendado", value: "agendado" },
    { label: "Realizado", value: "realizado" },
    { label: "Cancelado", value: "cancelado" },
    { label: "Redesignado", value: "redesignado" },
    { label: "Concluído", value: "concluido" },
    { label: "Em andamento", value: "em_andamento" },
    { label: "Suspenso", value: "suspenso" },
  ]
  const optionsCustomFieldType = [
    { label: "Texto", value: "text" },
    { label: "Data", value: "data" },
    { label: "Check (Sim/Não)", value: "check" },
    { label: "Número", value: "numero" },
    { label: "Lista", value: "lista" },
  ]
  const optionsCostType = [
    { label: "Translado", value: "translado" },
    { label: "Honorário", value: "honorario" },
    { label: "Diligência", value: "diligencia" },
    { label: "Outro", value: "outro" },
  ]

  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Adicionar evento</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex flexDir={"column"} gap={3}>
                <ComboboxProcess
                  label={"Tipo"}
                  listOptions={optionsTypeEvent}
                  value={event.tipo}
                  onValueChange={(e) =>
                    setEvent((prev) => ({ ...prev, tipo: e.value[0] ?? null }))
                  }
                />

                <Flex justify={"space-between"}>
                  <Flex flexDir={"column"}>
                    <Text>Data</Text>
                    <Input
                      w={"200px"}
                      mt={2}
                      type="date"
                      placeholder="Data do evento"
                      value={event.data}
                      onChange={(e) =>
                        setEvent((prev) => ({ ...prev, data: e.target.value }))
                      }
                    />
                  </Flex>

                  <Flex flexDir={"column"}>
                    <Text>Status</Text>
                    <ComboboxProcess
                      listOptions={optionsStatusEvent}
                      value={event.status}
                      onValueChange={(e) =>
                        setEvent((prev) => ({
                          ...prev,
                          status: e.value[0] ?? null,
                        }))
                      }
                    />
                  </Flex>
                </Flex>

                <Flex flexDir={"column"}>
                  <Text>Local</Text>
                  <Input
                    mt={2}
                    type="text"
                    placeholder="Local do evento"
                    value={event.local}
                    onChange={(e) =>
                      setEvent((prev) => ({ ...prev, local: e.target.value }))
                    }
                  />
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Tipo de audiência</Text>
                  <Input
                    mt={2}
                    type="text"
                    placeholder="Tipo de audiência"
                    value={event.tipoAudiencia}
                    onChange={(e) =>
                      setEvent((prev) => ({
                        ...prev,
                        tipoAudiencia: e.target.value,
                      }))
                    }
                  />
                </Flex>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Text fontWeight={"bold"}>Testemunhas</Text>
                  <Button
                    variant="ghost"
                    colorPalette="purple"
                    size={"sm"}
                    onClick={() =>
                      setEvent((prev) => ({
                        ...prev,
                        testemunhas: [
                          ...prev.testemunhas,
                          { id: Date.now(), nome: "", contato: "" },
                        ],
                      }))
                    }
                  >
                    <FaPlus /> Adicionar
                  </Button>
                </Flex>
                {event.testemunhas.map((witness) => (
                  <Flex
                    key={witness.id}
                    alignItems={"center"}
                    borderRadius={"md"}
                    borderColor={"gray.200"}
                    justify={"space-between"}
                  >
                    <Flex gap={1}>
                      <Flex flexDir={"column"}>
                        <Input
                          size={"sm"}
                          placeholder="Nome da testemunha"
                          value={witness.nome}
                          onChange={(e) =>
                            setEvent((prev) => ({
                              ...prev,
                              testemunhas: prev.testemunhas.map((w) =>
                                w.id === witness.id
                                  ? { ...w, nome: e.target.value }
                                  : w,
                              ),
                            }))
                          }
                        />
                      </Flex>
                      <Flex flexDir={"column"}>
                        <Input
                          size={"sm"}
                          placeholder="Telefone ou e-mail"
                          value={witness.contato}
                          onChange={(e) =>
                            setEvent((prev) => ({
                              ...prev,
                              testemunhas: prev.testemunhas.map((w) =>
                                w.id === witness.id
                                  ? { ...w, contato: e.target.value }
                                  : w,
                              ),
                            }))
                          }
                        />
                      </Flex>
                    </Flex>
                    <Tooltip content="Remover testemunha" placement="bottom">
                      <IconButton
                        aria-label="Remover testemunha"
                        variant="ghost"
                        colorPalette="red"
                        size={"sm"}
                        onClick={() =>
                          setEvent((prev) => ({
                            ...prev,
                            testemunhas: prev.testemunhas.filter(
                              (w) => w.id !== witness.id,
                            ),
                          }))
                        }
                      >
                        <FaTrash />
                      </IconButton>
                    </Tooltip>
                  </Flex>
                ))}

                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Text fontWeight={"bold"}>Campos customizáveis</Text>
                  <Button
                    variant="ghost"
                    colorPalette="purple"
                    size={"sm"}
                    onClick={() =>
                      setEvent((prev) => ({
                        ...prev,
                        camposCustomizaveis: [
                          ...prev.camposCustomizaveis,
                          { id: Date.now(), label: "", tipo: "", valor: "" },
                        ],
                      }))
                    }
                  >
                    <FaPlus /> Adicionar
                  </Button>
                </Flex>

                {event.camposCustomizaveis.map((field) => (
                  <Flex
                    key={field.id}
                    flexDir={"column"}
                    gap={2}
                    borderRadius={"md"}
                    p={3}
                    border={"1px solid"}
                    borderColor={"gray.200"}
                    _dark={{ borderColor: "gray.700" }}
                  >
                    <Flex gap={2} alignItems={"flex-end"}>
                      <Flex flexDir={"column"} flex={1} gap={1}>
                        <Input
                          size={"sm"}
                          placeholder="Nome do campo"
                          value={field.label}
                          onChange={(e) =>
                            setEvent((prev) => ({
                              ...prev,
                              camposCustomizaveis: prev.camposCustomizaveis.map(
                                (f) =>
                                  f.id === field.id
                                    ? { ...f, label: e.target.value }
                                    : f,
                              ),
                            }))
                          }
                        />
                      </Flex>
                      <Tooltip content="Tipo de campo" placement="bottom">
                        <Flex flex={1}>
                          <ComboboxProcess
                            listOptions={optionsCustomFieldType}
                            value={field.tipo}
                            placeholder="Tipo"
                            onValueChange={(e) =>
                              setEvent((prev) => ({
                                ...prev,
                                camposCustomizaveis:
                                  prev.camposCustomizaveis.map((f) =>
                                    f.id === field.id
                                      ? {
                                          ...f,
                                          tipo: e.value[0] ?? "",
                                          valor: "",
                                        }
                                      : f,
                                  ),
                              }))
                            }
                          />
                        </Flex>
                      </Tooltip>

                      <Tooltip content="Remover campo" placement="bottom">
                        <IconButton
                          aria-label="Remover campo"
                          variant="ghost"
                          colorPalette="red"
                          size={"sm"}
                          mb={"2px"}
                          onClick={() =>
                            setEvent((prev) => ({
                              ...prev,
                              camposCustomizaveis:
                                prev.camposCustomizaveis.filter(
                                  (f) => f.id !== field.id,
                                ),
                            }))
                          }
                        >
                          <FaTrash />
                        </IconButton>
                      </Tooltip>
                    </Flex>

                    {field.tipo && (
                      <Flex flexDir={"column"} gap={1}>
                        <Text fontSize={"xs"} color={"gray.500"}>
                          {field.tipo === "lista" ? "Itens da lista" : "Valor"}
                        </Text>

                        {field.tipo === "check" && (
                          <Flex alignItems={"center"} gap={2} mt={1}>
                            <input
                              type="checkbox"
                              checked={field.valor === true}
                              onChange={(e) =>
                                setEvent((prev) => ({
                                  ...prev,
                                  camposCustomizaveis:
                                    prev.camposCustomizaveis.map((f) =>
                                      f.id === field.id
                                        ? { ...f, valor: e.target.checked }
                                        : f,
                                    ),
                                }))
                              }
                              style={{
                                width: 16,
                                height: 16,
                                accentColor: "purple",
                                cursor: "pointer",
                              }}
                            />
                            <Text fontSize={"sm"}>
                              {field.valor ? "Sim" : "Não"}
                            </Text>
                          </Flex>
                        )}

                        {field.tipo === "lista" && (
                          <Flex flexDir={"column"} gap={2}>
                            {(Array.isArray(field.valor)
                              ? field.valor
                              : []
                            ).map((item) => (
                              <Flex key={item.id} alignItems={"center"} gap={2}>
                                <Input
                                  size={"sm"}
                                  flex={1}
                                  value={item.texto}
                                  placeholder="Item da lista"
                                  onChange={(e) =>
                                    setEvent((prev) => ({
                                      ...prev,
                                      camposCustomizaveis:
                                        prev.camposCustomizaveis.map((f) =>
                                          f.id === field.id
                                            ? {
                                                ...f,
                                                valor: f.valor.map((v) =>
                                                  v.id === item.id
                                                    ? {
                                                        ...v,
                                                        texto: e.target.value,
                                                      }
                                                    : v,
                                                ),
                                              }
                                            : f,
                                        ),
                                    }))
                                  }
                                />
                                <Tooltip
                                  content="Remover item"
                                  placement="bottom"
                                >
                                  <IconButton
                                    aria-label="Remover item"
                                    variant="ghost"
                                    colorPalette="red"
                                    size={"xs"}
                                    onClick={() =>
                                      setEvent((prev) => ({
                                        ...prev,
                                        camposCustomizaveis:
                                          prev.camposCustomizaveis.map((f) =>
                                            f.id === field.id
                                              ? {
                                                  ...f,
                                                  valor: f.valor.filter(
                                                    (v) => v.id !== item.id,
                                                  ),
                                                }
                                              : f,
                                          ),
                                      }))
                                    }
                                  >
                                    <FaTrash />
                                  </IconButton>
                                </Tooltip>
                              </Flex>
                            ))}

                            <Button
                              variant="outline"
                              colorPalette="purple"
                              size={"xs"}
                              alignSelf={"flex-start"}
                              onClick={() =>
                                setEvent((prev) => ({
                                  ...prev,
                                  camposCustomizaveis:
                                    prev.camposCustomizaveis.map((f) =>
                                      f.id === field.id
                                        ? {
                                            ...f,
                                            valor: [
                                              ...(Array.isArray(f.valor)
                                                ? f.valor
                                                : []),
                                              { id: Date.now(), texto: "" },
                                            ],
                                          }
                                        : f,
                                    ),
                                }))
                              }
                            >
                              <FaPlus /> Adicionar item
                            </Button>
                          </Flex>
                        )}

                        {field.tipo !== "check" && field.tipo !== "lista" && (
                          <Input
                            size={"sm"}
                            type={
                              field.tipo === "data"
                                ? "date"
                                : field.tipo === "numero"
                                  ? "number"
                                  : "text"
                            }
                            placeholder={
                              field.tipo === "numero"
                                ? "0"
                                : field.tipo === "data"
                                  ? ""
                                  : "Digite o valor"
                            }
                            value={field.valor}
                            onChange={(e) =>
                              setEvent((prev) => ({
                                ...prev,
                                camposCustomizaveis:
                                  prev.camposCustomizaveis.map((f) =>
                                    f.id === field.id
                                      ? { ...f, valor: e.target.value }
                                      : f,
                                  ),
                              }))
                            }
                          />
                        )}
                      </Flex>
                    )}
                  </Flex>
                ))}

                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Text fontWeight={"bold"}>Custos</Text>
                  <Button
                    variant="ghost"
                    colorPalette="purple"
                    size={"sm"}
                    onClick={() =>
                      setEvent((prev) => ({
                        ...prev,
                        custos: [
                          ...prev.custos,
                          {
                            id: Date.now(),
                            descricao: "",
                            valor: "",
                            data: "",
                            tipo: "",
                          },
                        ],
                      }))
                    }
                  >
                    <FaPlus /> Adicionar
                  </Button>
                </Flex>

                {event.custos.map((cost) => (
                  <Flex
                    key={cost.id}
                    flexDir={"column"}
                    gap={3}
                    borderRadius={"md"}
                    p={3}
                    border={"1px solid"}
                    borderColor={"gray.200"}
                    _dark={{ borderColor: "gray.700" }}
                  >
                    <Flex
                      gap={2}
                      alignItems={"flex-end"}
                      justifyContent={"space-between"}
                    >
                      <Flex flexDir={"column"} gap={1} flex={1}>
                        <Text fontSize={"xs"} color={"gray.500"}>
                          Descrição
                        </Text>
                        <Input
                          size={"sm"}
                          placeholder="Ex: Passagem aérea"
                          value={cost.descricao}
                          onChange={(e) =>
                            setEvent((prev) => ({
                              ...prev,
                              custos: prev.custos.map((c) =>
                                c.id === cost.id
                                  ? { ...c, descricao: e.target.value }
                                  : c,
                              ),
                            }))
                          }
                        />
                      </Flex>
                      <Tooltip content="Remover custo" placement="bottom">
                        <IconButton
                          aria-label="Remover custo"
                          variant="ghost"
                          colorPalette="red"
                          size={"sm"}
                          mb={"2px"}
                          onClick={() =>
                            setEvent((prev) => ({
                              ...prev,
                              custos: prev.custos.filter(
                                (c) => c.id !== cost.id,
                              ),
                            }))
                          }
                        >
                          <FaTrash />
                        </IconButton>
                      </Tooltip>
                    </Flex>

                    <Flex gap={2} alignItems={"flex-end"} flexWrap={"wrap"}>
                      <Flex flexDir={"column"} gap={1} flex={1} minW={"100px"}>
                        <Text fontSize={"xs"} color={"gray.500"}>
                          Valor (R$)
                        </Text>
                        <Input
                          size={"sm"}
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="0,00"
                          value={cost.valor}
                          onChange={(e) =>
                            setEvent((prev) => ({
                              ...prev,
                              custos: prev.custos.map((c) =>
                                c.id === cost.id
                                  ? { ...c, valor: e.target.value }
                                  : c,
                              ),
                            }))
                          }
                        />
                      </Flex>

                      <Flex flexDir={"column"} gap={1} flex={1} minW={"120px"}>
                        <Text fontSize={"xs"} color={"gray.500"}>
                          Data
                        </Text>
                        <Input
                          size={"sm"}
                          type="date"
                          value={cost.data}
                          onChange={(e) =>
                            setEvent((prev) => ({
                              ...prev,
                              custos: prev.custos.map((c) =>
                                c.id === cost.id
                                  ? { ...c, data: e.target.value }
                                  : c,
                              ),
                            }))
                          }
                        />
                      </Flex>

                      <Flex flex={1} minW={"140px"}>
                        <ComboboxProcess
                          label={"Tipo"}
                          listOptions={optionsCostType}
                          value={cost.tipo}
                          onValueChange={(e) =>
                            setEvent((prev) => ({
                              ...prev,
                              custos: prev.custos.map((c) =>
                                c.id === cost.id
                                  ? { ...c, tipo: e.value[0] ?? "" }
                                  : c,
                              ),
                            }))
                          }
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="purple"
                _hover={{ bg: "purple.500" }}
                onClick={handleSalvar}
              >
                Salvar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
      <AlertCustom
        open={openAlert}
        title="Teste"
        description="Evento criado com sucesso"
        status="success"
      />
    </Dialog.Root>
  )
}
