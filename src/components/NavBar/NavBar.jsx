"use client"

import { Flex, Text, IconButton, Link, Icon, Button } from "@chakra-ui/react"
import { ColorModeButton } from "../ui/color-mode"
import { TfiAgenda } from "react-icons/tfi";


export default function NavBar() {
    return (
        <Flex flexDir="row" justifyContent="space-between" alignItems="center">
            <Flex flexDir="row" gap={2} alignItems="center">
                <Icon size="lg" as={TfiAgenda} />
                <Text fontWeight="bold">MinhaTask</Text>
            </Flex>
            <Flex flexDir="row" gap={5}>
                <ColorModeButton />

                <Button colorPalette="blue">
                    <Text fontFamily={"heading"}>Começar agora</Text>
                </Button>
            </Flex>
        </Flex>
    )
}