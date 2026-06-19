"use client"
import {
  Flex,
  Text,
  Button,
  CloseButton,
  Dialog,
  Badge,
  Field,
  Input,
  Stack,
  Combobox,
  Portal,
  useFilter,
  useListCollection,
  IconButton,
} from "@chakra-ui/react"
import { useState } from "react"
import ProcessesSimpleCardsContainer from "./components/ProcessesSimpleCardsContainer/ProcessesSimpleCardsContainer"
import AlertCustom from "../components/AlertCustom/AlertCustom"
import ComboboxProcess from "./components/ComboboxProcess/ComboboxProcess"
import { v4 as uuid } from "uuid"
import { FaPlus } from "react-icons/fa"
import { useStore } from "@/hooks/useStore"
export default function PageProcess() {
  const { user } = useStore()
  const [showAlert, setShowAlert] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [partes, setPartes] = useState([])
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState("")
  const [process, setProcess] = useState({
    id: uuid(),
    companyId: user?.companyId || null,
    createdAt: new Date(),
    updatedAt: [],
    userCreator: user?.displayName || "",
    creatorId: user?.uid || "",
    tags: [],
    status: "",
    processNumber: "",
    typeProcess: "",
    tribunal: "",
    partes: [{ nome: "", polo: "" }],
    arquivado: false,
    observacoes: "",
    valorCausa: 0,
    custos: [
      {
        descricao: "",
        valor: 0,
        tipo: "",
        data: new Date(),
      },
    ],
  })
  const defaultProcess = {
    id: uuid(),
    companyId: user?.companyId || null,
    createdAt: new Date(),
    updatedAt: new Date(),
    userCreator: user?.displayName || "",
    creatorId: user?.uid || "",
    tags: [],
    status: "",
    processNumber: "",
    typeProcess: "",
    tribunal: "",
    partes: [{ nome: "", papel: "" }],
    arquivado: false,
    observacoes: "",
    valorCausa: 0,
    custos: [
      {
        descricao: "",
        valor: 0,
        tipo: "",
        data: new Date(),
      },
    ],
  }
  const optionsTypeProcess = [
    { label: "Trabalhista", value: "trabalhista" },
    { label: "Cível", value: "civel" },
    { label: "Tributário", value: "tributario" },
    { label: "Administrativo", value: "administrativo" },
    { label: "Criminal", value: "criminal" },
    { label: "Família", value: "familia" },
  ]

  const optionsStatusProcess = [
    { label: "Em andamento", value: "em_andamento" },
    { label: "Encerrado", value: "encerrado" },
    { label: "Arquivado", value: "arquivado" },
  ]

  return (
    <Flex p={4} flexDir="column" gap={5}>
      <AlertCustom
        status="success"
        title="Sucesso"
        description="Processo criado com sucesso!"
        open={showAlert}
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
            onClick={() => setOpenDialog(true)}
          >
            Adicionar processo
          </Button>
        </Flex>
      </Flex>
      <ProcessesSimpleCardsContainer />



      <Dialog.Root motionPreset={"slide-in-bottom"} open={openDialog}>
        <Portal>
          <Dialog.Backdrop backdropFilter={"blur(4px)"} />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Novo Processo</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {/* Aqui !!!!!!!!!!!!!!*/}
                <Flex flexDir={"column"} gap={2} w={"100%"}>
                  <Field.Root>
                    <Field.Label>Número do Processo</Field.Label>
                    <Input
                      placeholder="0000000-00.0000.0.00.0000"
                      value={process.processNumber}
                      onChange={(e) =>
                        setProcess({
                          ...process,
                          processNumber: e.target.value,
                        })
                      }
                    />
                  </Field.Root>
                  <Flex gap={2} w={"100%"} justifyContent={"space-between"}>
                    <ComboboxProcess
                      label={"Tipo de processo"}
                      listOptions={optionsTypeProcess}
                      placeholder={"Selecione o tipo de processo"}
                      value={process.typeProcess}
                      onValueChange={(details) =>
                        setProcess({
                          ...process,
                          typeProcess: details.value[0] ?? "",
                        })
                      }
                    />
                    <ComboboxProcess
                      label={"Status"}
                      listOptions={optionsStatusProcess}
                      placeholder={"Selecione o status"}
                      value={process.status}
                      onValueChange={(details) =>
                        setProcess({
                          ...process,
                          status: details.value[0] ?? "",
                        })
                      }
                    />
                  </Flex>
                  <Flex flexDir={"column"} gap={2} w={"100%"}>
                    <Field.Root>
                      <Field.Label>Tribunal</Field.Label>
                      <Input
                        placeholder="TRT 2° Região"
                        value={process.tribunal}
                        onChange={(e) =>
                          setProcess({ ...process, tribunal: e.target.value })
                        }
                      />
                    </Field.Root>
                  </Flex>
                  <Flex flexDir={"column"} gap={2} w={"100%"}>
                    <Field.Root>
                      <Flex w={"100%"} flexDir={"column"}>
                        <Flex justifyContent={"space-between"}>
                          <Field.Label>Partes</Field.Label>
                          <Button
                            variant={"ghost"}
                            colorPalette={"green"}
                            size={"sm"}
                            onClick={() =>
                              setPartes([...partes, { nome: "", polo: "" }])
                            }
                          >
                            <FaPlus /> Adicionar parte
                          </Button>
                        </Flex>
                        <Flex>
                          <Flex
                            gap={2}
                            align={"center"}
                            flexDir={"column"}
                            w={"100%"}
                          >


                            {partes.map((parte, index) => (
                              <Flex
                                key={index}
                                gap={4}
                                align="center"
                                w="100%"
                                p={3}
                                borderRadius="lg"
                                bgColor="purple.50"
                                border="1px solid"
                                borderColor="purple.100"
                                _dark={{
                                  bgColor: "purple.950",
                                  borderColor: "purple.800",
                                }}
                                transition="all 0.2s ease"
                                _hover={{
                                  borderColor: "purple.400",
                                  _dark: { borderColor: "purple.600" },
                                }}
                              >
                                <Field.Root flex={1}>
                                  <Field.Label fontSize="xs" color="purple.600" _dark={{ color: "purple.300" }}>
                                    Nome
                                  </Field.Label>
                                  <Input
                                    placeholder="Arnaldo Junior Pereira"
                                    size="sm"
                                    bgColor="transparent"
                                    value={parte.nome}
                                    onChange={(e) =>
                                      setPartes(
                                        partes.map((p, i) =>
                                          i === index ? { ...p, nome: e.target.value } : p
                                        )
                                      )
                                    }
                                  />
                                </Field.Root>

                                <Field.Root flex={1}>
                                  <Field.Label fontSize="xs" color="purple.600" _dark={{ color: "purple.300" }}>
                                    Polo
                                  </Field.Label>
                                  <Input
                                    placeholder="Reclamante/Reclamada"
                                    size="sm"
                                    bgColor="transparent"
                                    value={parte.polo}
                                    onChange={(e) =>
                                      setPartes(
                                        partes.map((p, i) =>
                                          i === index ? { ...p, polo: e.target.value } : p
                                        )
                                      )
                                    }
                                  />
                                </Field.Root>

                                <CloseButton
                                  size="sm"
                                  color="red.500"
                                  bgColor="transparent"
                                  alignSelf="flex-end"
                                  mb={1}
                                  _hover={{
                                    bgColor: "transparent",
                                    color: "red.400",
                                    transform: "translateY(-2px)",
                                    transition: "all 0.2s ease",
                                  }}
                                  onClick={() => setPartes(partes.filter((_, i) => i !== index))}
                                />
                              </Flex>
                            ))}
                          </Flex>
                        </Flex>
                      </Flex>
                    </Field.Root>
                    <Field.Root>
                      <Flex w={"100%"} justifyContent={"space-between"} flexDir={"column"} gap={2}>
                        <Field.Label>Tags</Field.Label>
                        <Flex>
                          <Input pr={2} placeholder="Digite uma tag" value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                if (!tag.trim()) return;
                                setTags((prev) => [tag, ...prev]);
                                setTag("");
                              }
                            }}
                          />
                          <Button
                            variant={"ghost"}
                            colorPalette={"purple"}
                            size={"sm"}
                            ml={3}
                            onClick={() => {
                              if (!tag.trim()) return;
                              setTags((prev) => [tag, ...prev]);
                              setTag("");
                            }}
                          >
                            <Flex gap={2} align={"center"}>
                              <FaPlus /> Adicionar Tag
                            </Flex>
                          </Button>
                        </Flex>

                        <Flex flexWrap="wrap" gap={2} mt={1}>
                          {tags.length > 0 &&
                            tags.map((t, index) => (
                              <Badge
                                key={index}
                                size="lg"
                                colorPalette="purple"
                                variant="surface"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                gap={1.5}
                                fontWeight="medium"
                                _hover={{ bgColor: "purple.700", color: "white" }}
                                transition="all 0.2s ease"
                              >
                                {t}
                                <CloseButton
                                  size="2xs"
                                  colorPalette="purple"
                                  variant="ghost"
                                  borderRadius="full"
                                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                                />
                              </Badge>
                            ))}
                        </Flex>
                      </Flex>
                    </Field.Root>
                    {JSON.stringify(process, null, 2)}
                  </Flex>
                </Flex>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  variant="outline"
                  onClick={() => {
                    ; (setOpenDialog(false),
                      setPartes([]),
                      setTags([]),
                      setProcess(defaultProcess))
                  }}
                >
                  Fechar
                </Button>
                <Button>Salvar</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root >
    </Flex >
  )
}