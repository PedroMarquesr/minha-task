import { Button, Icon, Text } from "@chakra-ui/react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { useStore } from "@/hooks/useStore"
import { auth } from "@/lib/firebase"
import { useRouter, useSearchParams } from "next/navigation"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

import { findUserCompany, acceptInviteForUser } from "@/utils/company"

export default function GoogleButton({ onNeedsSetup }) {
  const provider = new GoogleAuthProvider()
  const { user, setUser } = useStore()
  const { member, setMember } = useStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const inviteId = searchParams.get("invite")

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const loggedUser = result.user

      // 1. Verifica se há um convite na URL
      if (inviteId) {
        try {
          const company = await acceptInviteForUser(
            inviteId, 
            loggedUser.uid, 
            loggedUser.displayName, 
            loggedUser.email
          )
          
          setUser({
            uid: loggedUser.uid,
            email: loggedUser.email,
            displayName: loggedUser.displayName,
            photoURL: loggedUser.photoURL,
            companyId: company.id,
            role: company.members?.[loggedUser.uid]?.role || "member",
          })
          console.log("Convite aceito, ingressou na empresa:", company)
          router.push("/dashboard")
          return // Finaliza o fluxo aqui
        } catch (inviteError) {
          console.error("Erro ao aceitar convite (pode ter expirado ou ser inválido):", inviteError.message)
          alert("Não foi possível aceitar o convite: " + inviteError.message)
          // Continua para o fluxo normal de login se o convite falhar
        }
      }

      // 2. Fluxo normal: Busca a empresa do usuário
      const company = await findUserCompany(loggedUser.uid)

      if (company) {
        // Se a empresa existir, salva usuário + empresa no store e vai para dashboard
        setUser({
          uid: loggedUser.uid,
          email: loggedUser.email,
          displayName: loggedUser.displayName,
          photoURL: loggedUser.photoURL,
          companyId: company.id,
          role: company.members?.[loggedUser.uid]?.role || "member",
        })
        console.log("Empresa encontrada:", company)
        router.push("/dashboard")
      } else {
        // Se não tiver empresa, avisa o componente pai para abrir o Drawer
        if (onNeedsSetup) {
          onNeedsSetup(loggedUser)
        }
      }
    } catch (error) {
      console.error("Erro:", error.message)
    }
  }

  return (
    <>
      <Button
        onClick={handleLoginGoogle}
        colorPalette="red"
        size="lg"
        w="100%"
        mt={4}
        borderRadius="md"
        variant="outline"
      >
        <Icon as={FcGoogle} size={"2xl"} mr={2} />
        Iniciar ou Entrar com Google
      </Button>

      {user && (
        <Text mt={4} textAlign="center">
          Logado como: {user.displayName}
        </Text>
      )}
    </>
  )
}
