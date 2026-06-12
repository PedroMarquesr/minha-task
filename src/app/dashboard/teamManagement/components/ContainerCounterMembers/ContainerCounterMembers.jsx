import { Flex, Text, Button } from "@chakra-ui/react"
import CardMembers from "./components/CardMembers/CardMembers"
import { FaPeopleGroup } from "react-icons/fa6"
import { MdOutlineSecurity } from "react-icons/md"

export default function ContainerCounterMembers({ count, label }) {
  return (
    <Flex
      alignItems={"start"}
      w={"full"}
      gap={5}
      flexDir={{ base: "column", md: "column" }}
    >
      <CardMembers
        title={"Total de membros"}
        quantity={"10"}
        icon={<FaPeopleGroup />}
        iconColor={"blue.400"}
        bgIconColor={"blue.100"}
      />
      <CardMembers
        title={"Administradores"}
        quantity={"10"}
        icon={<MdOutlineSecurity />}
        iconColor={"red.400"}
        bgIconColor={"red.100"}
      />
    </Flex>
  )
}
