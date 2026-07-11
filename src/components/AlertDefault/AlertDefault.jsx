"use client"

import { Alert, Flex, Text } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"

export default function AlertDefault({ description, status }) {
    return (
        <Alert.Root
            status={status}
            w="100%"
            left={0}
            right={0}
            zIndex={100}
            position="fixed"
            variant="solid"
            top={0}
            data-state="open"
            _open={{
                animation: "fade-in 300ms ease-out",
            }}

        >
            <Alert.Indicator />
            <Alert.Content w={"100vw"}>
                <Flex flexDir={"row"} alignItems={"center"} >
                    <Alert.Description>{description}</Alert.Description>
                </Flex>
            </Alert.Content>
        </Alert.Root>
    )
}