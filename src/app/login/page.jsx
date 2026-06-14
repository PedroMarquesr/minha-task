"use client"
import { GoogleAuthProvider } from "firebase/auth"

import { Box, Text, Flex, Input, Button, Icon, Spinner } from "@chakra-ui/react"
import NavBar from "@/components/NavBar/NavBar"
import AlertDefault from "@/components/AlertDefault/AlertDefault"
import { IoPersonCircleSharp } from "react-icons/io5"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import GoogleButton from "./components/GoogleButton/GoogleButton"
import { useStore } from "@/hooks/useStore"

function traduzirErro(codigo) {
  const mensagens = {
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/user-not-found": "Nenhuma conta encontrada com este e-mail.",
    "auth/wrong-password": "Senha incorreta. Tente novamente.",
    "auth/invalid-email": "E-mail inválido.",
    "auth/user-disabled": "Esta conta foi desativada.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos.",
    "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
  }
  return mensagens[codigo] ?? "Ocorreu um erro inesperado. Tente novamente."
}

export default function Login() {
  const provider = new GoogleAuthProvider()
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

  const { setUser } = useStore()

  // const findUserCompany = async (uid) => {
  //   const q = query(
  //     collection(db, "companies"),
  //     where("members", "array-contains", uid),
  //   )

  //   const snapshot = await getDocs(q)
  //   if (!snapshot.empty) {
  //     const doc = snapshot.docs[0]
  //     return { id: doc.id, ...doc.data() }
  //   }
  //   return null
  // }

  // const handleLogin = async () => {
  //   try {
  //     setLoading(true)
  //     const result = await signInWithEmailAndPassword(auth, email, password)
  //     const loggedUser = result.user

  //     const company = await findUserCompany(loggedUser.uid)

  //     setUser({
  //       uid: loggedUser.uid,
  //       email: loggedUser.email,
  //       displayName: loggedUser.displayName,
  //       photoURL: loggedUser.photoURL,
  //       companyId: company?.id || null,
  //       role: company?.roles?.[loggedUser.uid] || "member",
  //     })

  //     router.push("/dashboard")
  //   } catch (error) {
  //     console.log(error)
  //     setError(traduzirErro(error.code))
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <Box minH="100vh">
      <NavBar />
      <Flex
        mt={{ base: 10, md: 24 }}
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 0 }}
      >
        {erro && <AlertDefault status="error" description={erro} />}

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
          {loading && <Spinner />}

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

          </Flex>


          <Flex justifyContent="center"></Flex>
          <GoogleButton />
        </Flex>
      </Flex>
    </Box>
  )
}
