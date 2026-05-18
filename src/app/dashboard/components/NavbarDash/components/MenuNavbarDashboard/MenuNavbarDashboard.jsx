import { Flex, IconButton, Text } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi"

export default function MenuNavbarDashboard({ setOpenMenu }) {
  return (
    <Flex>
      <IconButton
        aria-label="Menu"
        onClick={() => setOpenMenu(true)}
        cursor="pointer"
        _hover={{
          backgroundColor: "blue.500",
          color: "white",
        }}
        _dark={{
          color: "gray.500",
        }}
      >
        <Text fontSize={"xl"}>
          <GiHamburgerMenu />
        </Text>
      </IconButton>
    </Flex>
  )
}
