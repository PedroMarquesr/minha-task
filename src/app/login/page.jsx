"use client"

import { Box, Text, Flex, Input, Button, Icon } from "@chakra-ui/react"
import NavBar from "@/components/NavBar/NavBar"
import { IoPersonCircleSharp } from "react-icons/io5"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"

export default function Login() {
  return (
    <Box minH="100vh">
      <NavBar />
      <Flex
        mt={{ base: 10, md: 24 }}
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 0 }}
      >
        <Flex
          flexDir="column"
          w={{ base: "100%", sm: "400px" }}
          bg="white"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          boxShadow="2xl"
          borderRadius="2xl"
          p={8}
          border="1px solid"
          borderColor="gray.200"
        >
          <Flex flexDir="column" alignItems="center" mb={6}>
            <Icon
              as={IoPersonCircleSharp}
              fontSize="80px"
              color="blue.500"
              mb={4}
            />
            <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
              Bem-vindo de volta!
            </Text>
            <Text color="gray.500" fontSize="sm" textAlign="center" mt={1}>
              Insira suas credenciais para acessar sua área de gestão.
            </Text>
          </Flex>

          <Flex flexDir="column" w="100%" gap={4}>
            <Flex flexDir="column" gap={1}>
              <Text fontSize="sm" fontWeight="medium">
                E-mail
              </Text>
              <Input
                placeholder="seu@email.com"
                type="email"
                size="md"
                borderRadius="md"
              />
            </Flex>

            <Flex flexDir="column" gap={1}>
              <Text fontSize="sm" fontWeight="medium">
                Senha
              </Text>
              <Input
                placeholder="••••••••"
                type="password"
                size="md"
                borderRadius="md"
              />
              <Flex justifyContent="flex-end" w="100%">
                <Link href="#">
                  <Text
                    fontSize="xs"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                    mt={1}
                  >
                    Esqueceu a senha?
                  </Text>
                </Link>
              </Flex>
            </Flex>

            <Button
              colorPalette="blue"
              size="lg"
              w="100%"
              mt={4}
              borderRadius="md"
            >
              Entrar na sua conta
            </Button>
          </Flex>

          <Flex mt={6} justifyContent="center" gap={1}>
            <Text fontSize="sm" color="gray.500">
              Não tem uma conta?
            </Text>
            <Link href="#">
              <Text
                fontSize="sm"
                color="blue.500"
                fontWeight="bold"
                _hover={{ textDecoration: "underline" }}
              >
                Cadastre-se
              </Text>
            </Link>
          </Flex>
          <Button
            colorPalette="red"
            size="lg"
            w="100%"
            mt={4}
            borderRadius="md"
            variant="outline"
          >
            <Icon as={FcGoogle} size={"2xl"} mr={2} />
            Entrar com sua conta Google
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
