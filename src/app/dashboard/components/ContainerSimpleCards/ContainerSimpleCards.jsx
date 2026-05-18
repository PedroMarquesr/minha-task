"use client"
import { Flex } from "@chakra-ui/react"
import SimpleCard from "./components/SimpleCard/SimpleCard"
import { FiAlertTriangle } from "react-icons/fi"
import { CiSquareCheck } from "react-icons/ci"
import { FaRegCalendar } from "react-icons/fa6"
import { MdBalance } from "react-icons/md"
import { FaRegSquareCheck } from "react-icons/fa6"

export default function ContainerSimpleCards() {
  const chooseIcon = (type) => {
    switch (type) {
      case "tarefas abertas":
        return <FaRegSquareCheck />
      case "vencendo hoje":
        return <FiAlertTriangle />
      case "próximos 7 dias":
        return <FaRegCalendar />
      case "processos ativos":
        return <MdBalance />
      default:
        return null
    }
  }

  return (
    <Flex gap={5} justifyContent={"space-evenly"}>
      <SimpleCard
        title={"Tarefas abertas"}
        quantity={"10"}
        icon={chooseIcon("tarefas abertas")}
        iconColor={{ base: "green.400", _dark: "green.100" }}
        bgIconColor={{ base: "green.100", _dark: "green.400" }}
      />
      <SimpleCard
        title={"Vencendo hoje"}
        quantity={"10"}
        icon={chooseIcon("vencendo hoje")}
        iconColor={{ base: "red.400", _dark: "red.100" }}
        bgIconColor={{ base: "red.100", _dark: "red.400" }}
      />
      <SimpleCard
        title={"Próximos 7 dias"}
        quantity={"10"}
        icon={chooseIcon("próximos 7 dias")}
        iconColor={{ base: "blue.400", _dark: "blue.100" }}
        bgIconColor={{ base: "blue.100", _dark: "blue.400" }}
      />
      <SimpleCard
        title={"Processos Ativos"}
        quantity={"10"}
        icon={chooseIcon("processos ativos")}
        iconColor={{ base: "purple.400", _dark: "purple.100" }}
        bgIconColor={{ base: "purple.100", _dark: "purple.400" }}
      />
    </Flex>
  )
}
