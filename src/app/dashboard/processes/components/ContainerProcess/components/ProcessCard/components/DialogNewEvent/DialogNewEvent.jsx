import { Dialog, Flex, Input, Portal, Button, Text, IconButton } from "@chakra-ui/react"
import ComboboxProcess from "@/app/dashboard/processes/components/ComboboxProcess/ComboboxProcess"
import { useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip"




export default function DialogNewEvent({ isOpen, setIsOpen, processId }) {
    const [typeEvent, setTypeEvent] = useState(null)
    const [date, setDate] = useState("")
    const [status, setStatus] = useState(null)
    const [local, setLocal] = useState("")
    const [typeAudience, setTypeAudience] = useState("")
    const [witnesses, setWitnesses] = useState([])
    const [customFields, setCustomFields] = useState([])
    const [costs, setCosts] = useState([])

    const handleClose = () => {
        setTypeEvent(null)
        setDate("")
        setStatus(null)
        setLocal("")
        setTypeAudience("")
        setWitnesses([])
        setCustomFields([])
        setCosts([])
        setIsOpen(false)
    }

    const handleSalvar = () => {
        const eventData = {
            processId,
            tipo: typeEvent,
            data: date,
            status,
            local,
            tipoAudiencia: typeAudience,
            testemunhas: witnesses,
            camposCustomizaveis: customFields,
            custos: costs,
        }
        // TODO: integrar com backend
        console.log("Evento a salvar:", eventData)
        handleClose()
    }




    const optionsTypeEvent = [
        { label: "Audiência", value: "audiencia" },
        { label: "Perícia", value: "pericia" },
        { label: "Despacho", value: "despacho" },
        { label: "Outro", value: "outro" },
    ]
    const optionsStatusProcess = [
        { label: "Agendado", value: "agendado" },
        { label: "Realizado", value: "realizado" },
        { label: "Cancelado", value: "cancelado" },
        { label: "Redesignação", value: "redesignacao" },
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
                        <Dialog.Body >
                            <Flex flexDir={"column"} gap={3}>

                                <ComboboxProcess
                                    label={"Tipo"}
                                    listOptions={optionsTypeEvent}
                                    value={typeEvent}
                                    onValueChange={(e) => setTypeEvent(e.value[0] ?? null)}
                                />

                                <Flex justify={"space-between"}>
                                    <Flex flexDir={"column"}>
                                        <Text>Data</Text>
                                        <Input
                                            w={"200px"} mt={2} type="date"
                                            placeholder="Data do evento"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </Flex>

                                    <Flex flexDir={"column"}>
                                        <Text>Status</Text>
                                        <ComboboxProcess
                                            listOptions={optionsStatusProcess}
                                            value={status}
                                            onValueChange={(e) => setStatus(e.value[0] ?? null)}
                                        />
                                    </Flex>
                                </Flex>

                                <Flex flexDir={"column"}>
                                    <Text>Local</Text>
                                    <Input
                                        mt={2} type="text" placeholder="Local do evento"
                                        value={local}
                                        onChange={(e) => setLocal(e.target.value)}
                                    />
                                </Flex>
                                <Flex flexDir={"column"}>
                                    <Text>Tipo de audiência</Text>
                                    <Input
                                        mt={2} type="text" placeholder="Tipo de audiência"
                                        value={typeAudience}
                                        onChange={(e) => setTypeAudience(e.target.value)}
                                    />
                                </Flex>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Text fontWeight={"bold"}>Testemunhas</Text>
                                    <Button
                                        variant="ghost"
                                        colorPalette="purple"
                                        size={"sm"}
                                        onClick={() =>
                                            setWitnesses(prev => [...prev, { id: Date.now(), nome: "", contato: "" }])
                                        }
                                    >
                                        <FaPlus /> Adicionar
                                    </Button>
                                </Flex>
                                {witnesses.map((witness) => (
                                    <Flex key={witness.id} alignItems={"center"}

                                        borderRadius={"md"}
                                        borderColor={"gray.200"}
                                        justify={"space-between"}
                                    >

                                        <Flex gap={1}>
                                            <Flex flexDir={"column"} >
                                                <Input
                                                    size={"sm"}
                                                    placeholder="Nome da testemunha"
                                                    value={witness.nome}
                                                    onChange={(e) =>
                                                        setWitnesses(prev =>
                                                            prev.map(w =>
                                                                w.id === witness.id ? { ...w, nome: e.target.value } : w
                                                            )
                                                        )
                                                    }
                                                />
                                            </Flex>
                                            <Flex flexDir={"column"} >
                                                <Input
                                                    size={"sm"}
                                                    placeholder="Telefone ou e-mail"
                                                    value={witness.contato}
                                                    onChange={(e) =>
                                                        setWitnesses(prev =>
                                                            prev.map(w =>
                                                                w.id === witness.id ? { ...w, contato: e.target.value } : w
                                                            )
                                                        )
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
                                                    setWitnesses(prev => prev.filter(w => w.id !== witness.id))
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
                                            setCustomFields(prev => [...prev, { id: Date.now(), label: "", tipo: "", valor: "" }])
                                        }
                                    >
                                        <FaPlus /> Adicionar
                                    </Button>
                                </Flex>

                                {customFields.map((field) => (
                                    <Flex key={field.id} flexDir={"column"} gap={2}
                                        borderRadius={"md"} p={3}
                                        border={"1px solid"}
                                        borderColor={"gray.200"} _dark={{ borderColor: "gray.700" }}
                                    >
                                        <Flex gap={2} alignItems={"flex-end"}>
                                            {/* Label */}
                                            <Flex flexDir={"column"} flex={1} gap={1}>
                                                <Text fontSize={"xs"} color={"gray.500"}>Label</Text>
                                                <Input
                                                    size={"sm"}
                                                    placeholder="Nome do campo"
                                                    value={field.label}
                                                    onChange={(e) =>
                                                        setCustomFields(prev =>
                                                            prev.map(f =>
                                                                f.id === field.id ? { ...f, label: e.target.value } : f
                                                            )
                                                        )
                                                    }
                                                />
                                            </Flex>

                                            {/* Tipo via ComboboxProcess */}
                                            <Flex flex={1}>
                                                <ComboboxProcess
                                                    label={"Tipo"}
                                                    listOptions={optionsCustomFieldType}
                                                    value={field.tipo}
                                                    onValueChange={(e) =>
                                                        setCustomFields(prev =>
                                                            prev.map(f =>
                                                                f.id === field.id ? { ...f, tipo: e.value[0] ?? "", valor: "" } : f
                                                            )
                                                        )
                                                    }
                                                />
                                            </Flex>

                                            {/* Botão excluir */}
                                            <Tooltip content="Remover campo" placement="bottom">
                                                <IconButton
                                                    aria-label="Remover campo"
                                                    variant="ghost"
                                                    colorPalette="red"
                                                    size={"sm"}
                                                    mb={"2px"}
                                                    onClick={() =>
                                                        setCustomFields(prev => prev.filter(f => f.id !== field.id))
                                                    }
                                                >
                                                    <FaTrash />
                                                </IconButton>
                                            </Tooltip>
                                        </Flex>

                                        {/* Valor — renderiza conforme o tipo */}
                                        {field.tipo && (
                                            <Flex flexDir={"column"} gap={1}>
                                                <Text fontSize={"xs"} color={"gray.500"}>
                                                    {field.tipo === "lista" ? "Itens da lista" : "Valor"}
                                                </Text>

                                                {/* CHECK */}
                                                {field.tipo === "check" && (
                                                    <Flex alignItems={"center"} gap={2} mt={1}>
                                                        <input
                                                            type="checkbox"
                                                            checked={field.valor === true}
                                                            onChange={(e) =>
                                                                setCustomFields(prev =>
                                                                    prev.map(f =>
                                                                        f.id === field.id ? { ...f, valor: e.target.checked } : f
                                                                    )
                                                                )
                                                            }
                                                            style={{ width: 16, height: 16, accentColor: "purple", cursor: "pointer" }}
                                                        />
                                                        <Text fontSize={"sm"}>{field.valor ? "Sim" : "Não"}</Text>
                                                    </Flex>
                                                )}

                                                {/* LISTA */}
                                                {field.tipo === "lista" && (
                                                    <Flex flexDir={"column"} gap={2}>
                                                        {/* Itens existentes */}
                                                        {(Array.isArray(field.valor) ? field.valor : []).map((item) => (
                                                            <Flex key={item.id} alignItems={"center"} gap={2}>
                                                                <Input
                                                                    size={"sm"}
                                                                    flex={1}
                                                                    value={item.texto}
                                                                    placeholder="Item da lista"
                                                                    onChange={(e) =>
                                                                        setCustomFields(prev =>
                                                                            prev.map(f =>
                                                                                f.id === field.id
                                                                                    ? {
                                                                                        ...f,
                                                                                        valor: f.valor.map(v =>
                                                                                            v.id === item.id ? { ...v, texto: e.target.value } : v
                                                                                        )
                                                                                    }
                                                                                    : f
                                                                            )
                                                                        )
                                                                    }
                                                                />
                                                                <Tooltip content="Remover item" placement="bottom">
                                                                    <IconButton
                                                                        aria-label="Remover item"
                                                                        variant="ghost"
                                                                        colorPalette="red"
                                                                        size={"xs"}
                                                                        onClick={() =>
                                                                            setCustomFields(prev =>
                                                                                prev.map(f =>
                                                                                    f.id === field.id
                                                                                        ? { ...f, valor: f.valor.filter(v => v.id !== item.id) }
                                                                                        : f
                                                                                )
                                                                            )
                                                                        }
                                                                    >
                                                                        <FaTrash />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Flex>
                                                        ))}

                                                        {/* Botão adicionar item */}
                                                        <Button
                                                            variant="outline"
                                                            colorPalette="purple"
                                                            size={"xs"}
                                                            alignSelf={"flex-start"}
                                                            onClick={() =>
                                                                setCustomFields(prev =>
                                                                    prev.map(f =>
                                                                        f.id === field.id
                                                                            ? {
                                                                                ...f,
                                                                                valor: [
                                                                                    ...(Array.isArray(f.valor) ? f.valor : []),
                                                                                    { id: Date.now(), texto: "" }
                                                                                ]
                                                                            }
                                                                            : f
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <FaPlus /> Adicionar item
                                                        </Button>
                                                    </Flex>
                                                )}

                                                {/* TEXT / DATA / NUMERO */}
                                                {field.tipo !== "check" && field.tipo !== "lista" && (
                                                    <Input
                                                        size={"sm"}
                                                        type={
                                                            field.tipo === "data" ? "date" :
                                                            field.tipo === "numero" ? "number" :
                                                            "text"
                                                        }
                                                        placeholder={
                                                            field.tipo === "numero" ? "0" :
                                                            field.tipo === "data" ? "" :
                                                            "Digite o valor"
                                                        }
                                                        value={field.valor}
                                                        onChange={(e) =>
                                                            setCustomFields(prev =>
                                                                prev.map(f =>
                                                                    f.id === field.id ? { ...f, valor: e.target.value } : f
                                                                )
                                                            )
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
                                            setCosts(prev => [
                                                ...prev,
                                                { id: Date.now(), descricao: "", valor: "", data: "", tipo: "" }
                                            ])
                                        }
                                    >
                                        <FaPlus /> Adicionar
                                    </Button>
                                </Flex>

                                {costs.map((cost) => (
                                    <Flex key={cost.id} flexDir={"column"} gap={3}
                                        borderRadius={"md"} p={3}
                                        border={"1px solid"}
                                        borderColor={"gray.200"} _dark={{ borderColor: "gray.700" }}
                                    >
                                        {/* Linha 1: Descrição + botão excluir */}
                                        <Flex gap={2} alignItems={"flex-end"} justifyContent={"space-between"}>
                                            <Flex flexDir={"column"} gap={1} flex={1}>
                                                <Text fontSize={"xs"} color={"gray.500"}>Descrição</Text>
                                                <Input
                                                    size={"sm"}
                                                    placeholder="Ex: Passagem aérea"
                                                    value={cost.descricao}
                                                    onChange={(e) =>
                                                        setCosts(prev =>
                                                            prev.map(c =>
                                                                c.id === cost.id ? { ...c, descricao: e.target.value } : c
                                                            )
                                                        )
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
                                                        setCosts(prev => prev.filter(c => c.id !== cost.id))
                                                    }
                                                >
                                                    <FaTrash />
                                                </IconButton>
                                            </Tooltip>
                                        </Flex>

                                        {/* Linha 2: Valor + Data + Tipo */}
                                        <Flex gap={2} alignItems={"flex-end"} flexWrap={"wrap"}>
                                            <Flex flexDir={"column"} gap={1} flex={1} minW={"100px"}>
                                                <Text fontSize={"xs"} color={"gray.500"}>Valor (R$)</Text>
                                                <Input
                                                    size={"sm"}
                                                    type="number"
                                                    min={0}
                                                    step="0.01"
                                                    placeholder="0,00"
                                                    value={cost.valor}
                                                    onChange={(e) =>
                                                        setCosts(prev =>
                                                            prev.map(c =>
                                                                c.id === cost.id ? { ...c, valor: e.target.value } : c
                                                            )
                                                        )
                                                    }
                                                />
                                            </Flex>

                                            <Flex flexDir={"column"} gap={1} flex={1} minW={"120px"}>
                                                <Text fontSize={"xs"} color={"gray.500"}>Data</Text>
                                                <Input
                                                    size={"sm"}
                                                    type="date"
                                                    value={cost.data}
                                                    onChange={(e) =>
                                                        setCosts(prev =>
                                                            prev.map(c =>
                                                                c.id === cost.id ? { ...c, data: e.target.value } : c
                                                            )
                                                        )
                                                    }
                                                />
                                            </Flex>

                                            <Flex flex={1} minW={"140px"}>
                                                <ComboboxProcess
                                                    label={"Tipo"}
                                                    listOptions={optionsCostType}
                                                    value={cost.tipo}
                                                    onValueChange={(e) =>
                                                        setCosts(prev =>
                                                            prev.map(c =>
                                                                c.id === cost.id ? { ...c, tipo: e.value[0] ?? "" } : c
                                                            )
                                                        )
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
                            <Button colorPalette="purple" _hover={{ bg: "purple.500" }} onClick={handleSalvar}>Salvar</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
