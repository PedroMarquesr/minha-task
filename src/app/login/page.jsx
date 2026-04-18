"use client"

import { Box, Text, Flex, Input, Button, Icon } from "@chakra-ui/react"
import NavBar from "@/components/NavBar/NavBar"
import AlertDefault from "@/components/AlertDefault/AlertDefault"
import { IoPersonCircleSharp } from "react-icons/io5"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"


function traduzirErro(codigo) {
  const mensagens = {
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'Nenhuma conta encontrada com este e-mail.',
    'auth/wrong-password': 'Senha incorreta. Tente novamente.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/user-disabled': 'Esta conta foi desativada.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
    'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
  }
  return mensagens[codigo] ?? 'Ocorreu um erro inesperado. Tente novamente.'
}

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erro, setError] = useState("")
  const [loading, setLoading] = useState(false)





  useEffect(() => {
    if (erro) {
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }, [erro])


  const handleLogin = async () => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      setError(traduzirErro(error.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="100vh">
      <NavBar />
      <Flex
        mt={{ base: 10, md: 24 }}
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 0 }}
      >
        {erro && (
          <AlertDefault status="error" description={erro} />
        )}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleLogin}
              loading={loading}
              loadingText="Entrando..."

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
