"use client"

import { Flex, Text, Icon, Button } from "@chakra-ui/react"
import { TfiAgenda } from "react-icons/tfi"
import Link from "next/link"
import { useStore } from "@/hooks/useStore"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { ColorModeButton } from "@/components/ui/color-mode"
import MenuNavbarDashboard from "./components/MenuNavbarDashboard/MenuNavbarDashboard"
import { query, collection, onSnapshot, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useState, useEffect } from "react"

export default function NavBarDash({ setOpenMenu }) {
  const { user, setUser } = useStore()
  const router = useRouter()
  const [companyName, setCompanyName] = useState("")

  useEffect(() => {
    if (!user?.uid) return

    // Cria a query buscando na coleção "companies"
    // onde o campo "members" (que é um array) contém o ID do usuário logado
    const q = query(
      collection(db, "companies"),
      where("members", "array-contains", user.uid),
    )

    // onSnapshot "escuta" os resultados em tempo real
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        // Se encontrou alguma empresa, pegamos a primeira (índice 0)
        const companyDoc = querySnapshot.docs[0]
        // Setamos o estado com o valor do campo "name" do documento
        setCompanyName(companyDoc.data().name)
      } else {
        setCompanyName("Sem Equipe")
      }
    })

    // Função de limpeza: para de escutar o Firebase quando o componente for desmontado
    return () => unsubscribe()
  }, [user])

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null)
        router.push("/")
      })
      .catch((error) => {
        console.log("Erro ao deslogar:", error)
      })
  }
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      boxShadow={"lg"}
    >
      <Link href={user ? "/dashboard" : "/"}>
        <Flex flexDir={"row"} gap={4}>
          <Flex flexDir="row" gap={2} alignItems="center">
            <Icon size="lg" as={TfiAgenda} />
            <Text fontWeight="bold">MinhaTask</Text>
          </Flex>
          <Text> | </Text>
          <Flex flexDir="row" gap={2} alignItems="center">
            <Text fontWeight="bold">Equipe: {companyName}</Text>
          </Flex>
        </Flex>
      </Link>

      <Flex flexDir="row" gap={5} alignItems="center">
        <ColorModeButton />

        <MenuNavbarDashboard setOpenMenu={setOpenMenu} />

        <Button
          variant="outline"
          colorPalette="red"
          _dark={{ variant: "solid" }}
          onClick={handleLogout}
        >
          <Text fontFamily={"body"}>Sair</Text>
        </Button>
      </Flex>
    </Flex>
  )
}
