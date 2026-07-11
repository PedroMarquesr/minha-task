import {
  Flex,
  Text,
  Accordion,
  Badge,
  IconButton,
  Button,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  FaAngleDown,
  FaAngleUp,
  FaRegUser,
  FaCalendarPlus,
} from "react-icons/fa"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { MdNextPlan } from "react-icons/md"
import DialogAddValueprocess from "./components/DialogAddValueprocess/DialogAddValueprocess"
import { formatCurrency } from "@/utils/format"
import { Tooltip } from "@/components/ui/tooltip"

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
}) {
  const [isDialogAddValueOpen, setIsDialogAddValueOpen] = useState(false)
  const [isOpenAlert, setIsOpenAlert] = useState(false)

  const handleColorStatus = (status) => {
    switch (status) {
      case "em_andamento":
        return {
          borderColor: "purple.200",
          _dark: { borderColor: "purple.700" },
          _hover: {
            borderColor: "purple.500",
            bg: "purple.50",
            _dark: { bg: "purple.900/40" },
          },
        }
      case "encerrado":
        return {
          borderColor: "green.200",
          _dark: { borderColor: "green.700" },
          _hover: {
            borderColor: "green.500",
            bg: "green.50",
            _dark: { bg: "green.900/40" },
          },
        }
      case "arquivado":
        return {
          borderColor: "blue.200",
          _dark: { borderColor: "blue.700" },
          _hover: {
            borderColor: "blue.500",
            bg: "blue.50",
            _dark: { bg: "blue.900/40" },
          },
        }
    }
  }
  const handleOpenDialog = () => {
    setIsDialogAddValueOpen(!isDialogAddValueOpen)
  }

  return (
    <Flex
      key={processId}
      flexDir={"column"}
      border="1px solid"
      borderRadius={"md"}
      p={2}
      gap={1}
      {...handleColorStatus(status)}
    >
      <Flex w={"full"} justify={"space-between"}>
        <Text key={processId} color={"gray.700"} _dark={{ color: "gray.200" }}>
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
            >
              <MdNextPlan size={20} />
            </IconButton>
          </Tooltip>
        </Flex>
      </Flex>
      <Flex align={"center"} gap={2}>
        <Flex
          gap={2}
          fontSize={"xs"}
          color={"gray.600"}
          _dark={{ color: "gray.300" }}
        >
          <Text>{processType} </Text>
          <Text>-</Text>

          <Text>{tribunal}</Text>
        </Flex>
        <Flex justify={"center"} gap={1}>
          {tags.length > 0 &&
            tags.map((tag, index) => {
              return (
                <Flex key={index} gap={2}>
                  <Badge
                    colorPalette={
                      status === "encerrado"
                        ? "green"
                        : status === "arquivado"
                          ? "blue"
                          : "purple"
                    }
                    variant={"surface"}
                  >
                    {tag}
                  </Badge>
                </Flex>
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

                <Flex flexDir={"column"}>
                  <Text>Valor do processo</Text>
                  {!valorCausa ? (
                    <Text color={"gray.500"} fontSize="sm">
                      Não registrado
                    </Text>
                  ) : (
                    <Text color={"gray.500"} fontSize="sm">
                      {formatCurrency(valorCausa)}
                    </Text>
                  )}
                </Flex>

                <Flex flexDir={"column"}>
                  <Text>Partes</Text>

                  <Flex gap={1}>
                    {partes.map((parte, index) => {
                      return (
                        <Flex
                          key={index}
                          gap={2}
                          p={2}
                          align={"center"}
                          border={"1px solid"}
                          borderRadius={"md"}
                          borderColor={handleColorStatus(status).borderColor}
                        >
                          <Text
                            color={"gray.500"}
                            _dark={{ color: "gray.200" }}
                          >
                            <FaRegUser />
                          </Text>
                          <Text
                            fontSize={"xs"}
                            color={"gray.700"}
                            _dark={{ color: "gray.200" }}
                          >
                            {parte.nome}
                          </Text>
                          <Badge colorPalette={"purple"} variant="outline">
                            {parte.polo}
                          </Badge>
                        </Flex>
                      )
                    })}
                  </Flex>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Eventos</Text>

                  <Flex gap={1}>
                    {!events ? (
                      <Text color={"gray.500"} fontSize="sm">
                        Nenhum evento
                      </Text>
                    ) : (
                      <Text color={"gray.500"} fontSize="sm">
                        Evento aqui
                      </Text>
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
    </Flex>
  )
}
