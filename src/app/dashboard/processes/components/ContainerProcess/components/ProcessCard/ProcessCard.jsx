import {
  Flex,
  Text,
  Accordion,
  Badge,
  IconButton,
  Button,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FaRegUser, FaCalendarPlus } from "react-icons/fa"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { MdNextPlan, MdDelete } from "react-icons/md"
import { formatCurrency } from "@/utils/format"
import { Tooltip } from "@/components/ui/tooltip"
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import DialogNewEvent from "./components/DialogNewEvent/DialogNewEvent"
import DialogAddValueprocess from "./components/DialogAddValueprocess/DialogAddValueprocess"
import DialogChangeStatusProcess from "./components/DialogChangeStatusProcess/DialogChangeStatusProcess"
import DialogConfirmDelete from "./components/DialogConfirmDelete/DialogConfirmDelete"
import EventCard from "./components/EventCard/EventCard"
import { useStore } from "@/hooks/useStore"
export default function ProcessCard({
  processNumber,
  processId,
  processType,
  tribunal,
  status,
  partes = [],
  tags = [],
  events = [],
  valorCausa,
  companyId,
}) {
  const [isDialogAddValueOpen, setIsDialogAddValueOpen] = useState(false)
  const [isDialogNewEventOpen, setIsDialogNewEventOpen] = useState(false)
  const [isDialogChangeStatusOpen, setIsDialogChangeStatusOpen] = useState(false)
  const [isDialogConfirmDelProcessOpen, setIsDialogConfirmDelProcessOpen] = useState(false)
  const [processEvents, setProcessEvents] = useState([])
  const [userRole, setUserRole] = useState([])

  const { user } = useStore()
  const userId = user?.uid

  const handleColorStatus = (status) => {
    switch (status) {
      case "em_andamento":
        return {
          borderColor: "purple.300",
          bg: "purple.50",
          _dark: { borderColor: "purple.600", bg: "purple.950" },
          _hover: {
            borderColor: "purple.400",
            bg: "purple.100",
            _dark: { bg: "purple.900" },
          },
        }
      case "encerrado":
        return {
          borderColor: "green.300",
          bg: "green.50",
          _dark: { borderColor: "green.600", bg: "green.950" },
          _hover: {
            borderColor: "green.400",
            bg: "green.100",
            _dark: { bg: "green.900" },
          },
        }
      case "arquivado":
        return {
          borderColor: "blue.300",
          bg: "blue.50",
          _dark: { borderColor: "blue.600", bg: "blue.950" },
          _hover: {
            borderColor: "blue.400",
            bg: "blue.100",
            _dark: { bg: "blue.900" },
          },
        }
      default:
        return {
          borderColor: "gray.200",
          _dark: { borderColor: "gray.700" },
        }
    }
  }
  const handleOpenDialog = () => {
    setIsDialogAddValueOpen(!isDialogAddValueOpen)
  }

  const fetchUserRole = async () => {
    const companyRef = doc(db, "companies", companyId)
    const companySnap = await getDoc(companyRef)
    if (!companySnap.exists()) {
      console.log("Empresa não encontrada")
      return
    }

    const company = companySnap.data()
    const role = company.members?.[userId]?.role
    setUserRole(role)
  }

  useEffect(() => {
    if (!processId || !companyId) return

    const q = query(
      collection(db, "events"),
      where("companyId", "==", companyId),
      where("processId", "==", processId),
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProcessEvents(data)
    })

    return () => unsubscribe()
  }, [processId, companyId])

  useEffect(() => {
    if (!companyId || !userId) return
    fetchUserRole()
  }, [companyId, userId])

  return (
    <Flex
      key={processId}
      flexDir={"column"}
      border="1px solid"
      borderRadius={"lg"}
      p={3}
      gap={2}
      transition="all 0.15s ease"
      {...handleColorStatus(status)}
    >
      <Flex w={"full"} justify={"space-between"} align="center">
        <Text
          key={processId}
          fontWeight="semibold"
          fontSize="sm"
          color={"gray.800"}
          _dark={{ color: "gray.100" }}
          letterSpacing="tight"
        >
          {processNumber}
        </Text>

        <Flex>
          <Tooltip content="Adicionar evento" placement="top">
            <IconButton
              variant="ghost"
              cursor="pointer"
              p={0}
              minW="auto"
              h="auto"
              _hover={{ bg: "transparent", opacity: 0.8 }}
              color="purple.500"
              _dark={{ color: "purple.300" }}
              onClick={() => setIsDialogNewEventOpen(true)}
            >
              <FaCalendarPlus size={12} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Editar valor do processo" placement="top">
            <IconButton
              variant="ghost"
              cursor="pointer"
              p={0}
              minW="auto"
              h="auto"
              _hover={{ bg: "transparent", opacity: 0.8 }}
              color="orange.500"
              _dark={{ color: "yellow.500" }}
              onClick={handleOpenDialog}
            >
              <RiMoneyDollarCircleFill size={22} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Atualizar status do processo" placement="top">
            <IconButton
              variant="ghost"
              cursor="pointer"
              p={0}
              minW="auto"
              h="auto"
              _hover={{ bg: "transparent", opacity: 0.8 }}
              color="green.500"
              _dark={{ color: "green.300" }}
              onClick={() => setIsDialogChangeStatusOpen(true)}
            >
              <MdNextPlan size={20} />
            </IconButton>
          </Tooltip>
          {userRole === "owner" && (
            <Tooltip content="Deletar processo" placement="top">
              <IconButton
                variant="ghost"
                cursor="pointer"
                p={0}
                minW="auto"
                h="auto"
                _hover={{ bg: "transparent", opacity: 0.8 }}
                color="red.500"
                _dark={{ color: "red.300" }}
                onClick={() => setIsDialogConfirmDelProcessOpen(true)}
              >
                <MdDelete size={20} />
              </IconButton>
            </Tooltip>
          )}
        </Flex>
      </Flex>
      <Flex align={"center"} gap={2} flexWrap="wrap">
        <Flex
          gap={1}
          fontSize={"xs"}
          color={"gray.500"}
          _dark={{ color: "gray.400" }}
          align="center"
        >
          <Text>{processType}</Text>
          <Text opacity={0.5}>·</Text>
          <Text>{tribunal}</Text>
        </Flex>
        <Flex justify={"center"} gap={1} flexWrap="wrap">
          {tags.length > 0 &&
            tags.map((tag, index) => {
              return (
                <Badge
                  key={index}
                  colorPalette={
                    status === "encerrado"
                      ? "green"
                      : status === "arquivado"
                        ? "blue"
                        : "purple"
                  }
                  variant={"subtle"}
                  fontSize="2xs"
                  px={2}
                  borderRadius="full"
                >
                  {tag}
                </Badge>
              )
            })}
        </Flex>
      </Flex>
      <Flex>
        <Accordion.Root collapsible>
          <Accordion.Item>
            <Accordion.ItemTrigger>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Flex p={3} flexDir={"column"} gap={2}>
                <Flex flexDir={"column"} gap={1}>
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    color={"gray.400"}
                    _dark={{ color: "gray.500" }}
                  >
                    Valor do processo
                  </Text>
                  {!valorCausa ? (
                    <Text color={"gray.400"} fontSize="sm" fontStyle="italic">
                      Não registrado
                    </Text>
                  ) : (
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      color={"gray.700"}
                      _dark={{ color: "gray.200" }}
                    >
                      {formatCurrency(valorCausa)}
                    </Text>
                  )}
                </Flex>

                <Flex flexDir={"column"} gap={2}>
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    color={"gray.400"}
                    _dark={{ color: "gray.500" }}
                  >
                    Partes
                  </Text>
                  <Flex gap={2} flexWrap="wrap">
                    {partes.map((parte, index) => {
                      return (
                        <Flex
                          key={index}
                          gap={2}
                          px={3}
                          py={1}
                          align={"center"}
                          borderRadius={"full"}
                          bg={"purple.100"}
                          _dark={{ bg: "purple.900" }}
                        >
                          <Text
                            color={"purple.500"}
                            _dark={{ color: "purple.300" }}
                            fontSize="xs"
                          >
                            <FaRegUser />
                          </Text>
                          <Text
                            fontSize={"xs"}
                            fontWeight="medium"
                            color={"gray.700"}
                            _dark={{ color: "gray.200" }}
                          >
                            {parte.nome}
                          </Text>
                          <Badge
                            colorPalette={"purple"}
                            variant="subtle"
                            fontSize="2xs"
                            borderRadius="full"
                          >
                            {parte.polo}
                          </Badge>
                        </Flex>
                      )
                    })}
                  </Flex>
                </Flex>
                <Flex flexDir={"column"} gap={2} w="100%">
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    color={"gray.400"}
                    _dark={{ color: "gray.500" }}
                  >
                    Eventos
                  </Text>

                  <Flex gap={1} w="100%">
                    {processEvents.length === 0 ? (
                      <Text color={"gray.500"} fontSize="sm">
                        Nenhum evento cadastrado
                      </Text>
                    ) : (
                      <Flex flexDir="column" gap={2} w="100%">
                        <Accordion.Root collapsible w="100%">
                          <Accordion.Item value="eventos">
                            <Accordion.ItemTrigger>
                              <Flex
                                flexDir={"row"}
                                gap={2}
                                alignItems={"center"}
                                w="100%"
                              >
                                <Flex color={"gray.500"} fontSize="sm" gap={2}>
                                  <Text>Eventos cadastrados</Text>
                                  <Badge
                                    colorPalette={"purple"}
                                    variant={"surface"}
                                  >
                                    {processEvents.length}
                                  </Badge>
                                </Flex>
                                <Accordion.ItemIndicator />
                              </Flex>
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>
                              <Flex flexDir="column" gap={2}>
                                {processEvents.map((event) => (
                                  <EventCard key={event.id} event={event} />
                                ))}
                              </Flex>
                            </Accordion.ItemContent>
                          </Accordion.Item>
                        </Accordion.Root>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Flex>
      <DialogAddValueprocess
        isOpen={isDialogAddValueOpen}
        onClose={() => setIsDialogAddValueOpen(false)}
        setIsOpen={handleOpenDialog}
        processId={processId}
      />

      <DialogNewEvent
        isOpen={isDialogNewEventOpen}
        setIsOpen={setIsDialogNewEventOpen}
        processId={processId}
      />
      <DialogChangeStatusProcess
        isOpen={isDialogChangeStatusOpen}
        setIsOpen={setIsDialogChangeStatusOpen}
        processId={processId}
      />
      <DialogConfirmDelete
        isOpen={isDialogConfirmDelProcessOpen}
        setIsOpen={setIsDialogConfirmDelProcessOpen}
        contentDelete={"processo"}
        processNumber={processNumber}
        processType={processType}
        tribunal={tribunal}
        status={status}
        partes={partes}
        tags={tags}
        valorCausa={valorCausa}
        processId={processId}
      />
    </Flex>
  )
}