import { Flex, Text } from "@chakra-ui/react"
import SimpleCard from "@/app/dashboard/components/ContainerSimpleCards/components/SimpleCard/SimpleCard"
import {
  MdBalance,
  MdCalendarToday,
  MdOutlineDocumentScanner,
  MdOutlineArchive,
} from "react-icons/md"

export default function ProcessesSimpleCardsContainer() {
  return (
    <Flex gap={5} justifyContent={"space-evenly"}>
      <SimpleCard
        title="Processos Ativos"
        quantity="10"
        icon={<MdBalance />}
        iconColor={{ base: "purple.400", _dark: "purple.100" }}
        bgIconColor={{ base: "purple.100", _dark: "purple.400" }}
      />
      <SimpleCard
        title="Audiências este mês"
        quantity="3"
        icon={<MdCalendarToday />}
        iconColor={{ base: "purple.400", _dark: "purple.100" }}
        bgIconColor={{ base: "purple.100", _dark: "purple.400" }}
      />
      <SimpleCard
        title="Perícias este mês"
        quantity="3"
        icon={<MdOutlineDocumentScanner />}
        iconColor={{ base: "green.400", _dark: "green.100" }}
        bgIconColor={{ base: "green.100", _dark: "green.400" }}
      />
      <SimpleCard
        title="Processos arquivados"
        quantity="3"
        icon={<MdOutlineArchive />}
        iconColor={{ base: "blue.400", _dark: "blue.100" }}
        bgIconColor={{ base: "blue.100", _dark: "blue.400" }}
      />
    </Flex>
  )
}
