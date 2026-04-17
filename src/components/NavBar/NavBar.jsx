"use client"

import { Flex, Text, Icon, Button } from "@chakra-ui/react"
import { ColorModeButton } from "../ui/color-mode"
import { TfiAgenda } from "react-icons/tfi"
import Link from "next/link"

export default function NavBar() {
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      boxShadow={"lg"}
    >
      <Link href="/">
        <Flex flexDir="row" gap={2} alignItems="center">
          <Icon size="lg" as={TfiAgenda} />
          <Text fontWeight="bold">MinhaTask</Text>
        </Flex>
      </Link>

      <Flex flexDir="row" gap={5} alignItems="center">
        <ColorModeButton />

        <Link href="/login">
          <Button
            variant="outline"
            colorPalette="green"
            _dark={{ variant: "solid" }}
          >
            <Text fontFamily={"body"}>Entrar</Text>
          </Button>
        </Link>
        <Button colorPalette="blue">
          <Text fontFamily={"body"}>Começar agora</Text>
        </Button>
      </Flex>
    </Flex>
  )
}
