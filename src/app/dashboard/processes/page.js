"use client"
import {
  Flex,
  Text,
  Button,
  CloseButton,
  Dialog,
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

export default function PageProcess() {
  const [showAlert, setShowAlert] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [process, setProcess] = useState({
    id: uuid(),
    // companyId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    // userCreator: user.displayName
    // creatorId: user.uid
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
  })

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
                      onValueChange={(
                        details, // ✅
                      ) =>
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
                      <Flex w={"100%"} justifyContent={"space-between"}>
                        <Field.Label>Partes</Field.Label>
                        <Flex>
                          <Button
                            variant={"ghost"}
                            colorPalette={"green"}
                            size={"sm"}
                          >
                            <Flex gap={2} align={"center"}>
                              <FaPlus /> Adicionar parte
                            </Flex>
                          </Button>
                        </Flex>
                      </Flex>
                    </Field.Root>
                    <Field.Root>
                      <Flex w={"100%"} justifyContent={"space-between"}>
                        <Field.Label>Tags</Field.Label>
                        <Flex>
                          <Button
                            variant={"ghost"}
                            colorPalette={"purple"}
                            size={"sm"}
                          >
                            <Flex gap={2} align={"center"}>
                              <FaPlus /> Adicionar Tag
                            </Flex>
                          </Button>
                        </Flex>
                      </Flex>
                    </Field.Root>
                    {JSON.stringify(process, null, 2)}
                  </Flex>
                </Flex>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Fechar
                </Button>
                <Button>Salvar</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Flex>
  )
}
