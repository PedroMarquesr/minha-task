"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Box, Flex, Text, Button, Spinner, Icon } from "@chakra-ui/react"
import { FaUsers } from "react-icons/fa6"
import { useStore } from "@/hooks/useStore"
import NavBar from "@/components/NavBar/NavBar"

export default function InvitePage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useStore()
  
  const [loading, setLoading] = useState(true)
  const [invite, setInvite] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const inviteRef = doc(db, "invites", id)
        const snap = await getDoc(inviteRef)
        
        if (!snap.exists()) {
          setError("Este convite não existe ou já foi cancelado.")
          setLoading(false)
          return
        }
        
        const data = snap.data()
        
        if (data.status !== "pending") {
          setError("Este convite já foi utilizado ou está inativo.")
          setLoading(false)
          return
        }
        
        if (data.expiresAt && data.expiresAt.toMillis() < Date.now()) {
          setError("Este convite expirou.")
          setLoading(false)
          return
        }
        
        setInvite(data)
      } catch (err) {
        console.error(err)
        setError("Ocorreu um erro ao buscar o convite.")
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchInvite()
    }
  }, [id])

  const handleGoToLogin = () => {
    // Redireciona para login passando o id do convite na URL
    router.push(`/login?invite=${id}`)
  }

  const handleGoDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <Box minH="100vh">
      <NavBar />
      <Flex mt={{ base: 10, md: 24 }} alignItems="center" justifyContent="center" px={{ base: 4, md: 0 }}>
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
          alignItems="center"
          textAlign="center"
        >
          {loading ? (
            <Spinner size="xl" />
          ) : error ? (
            <>
              <Text color="red.500" fontWeight="bold" fontSize="lg" mb={4}>{error}</Text>
              <Button onClick={handleGoDashboard} colorPalette="blue">Voltar ao Início</Button>
            </>
          ) : (
            <>
              <Icon as={FaUsers} fontSize="60px" color="blue.500" mb={4} />
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" mb={2}>
                Você foi convidado!
              </Text>
              <Text mb={6} color="gray.600" _dark={{ color: "gray.400" }}>
                Você foi convidado para participar de uma equipe. Aceite o convite para colaborar no painel.
              </Text>
              
              <Button onClick={handleGoToLogin} colorPalette="blue" w="100%" size="lg">
                Entrar para Aceitar
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
