"use client"

import { Flex, Text, Icon, Button } from "@chakra-ui/react"
import { ColorModeButton } from "../ui/color-mode"
import { TfiAgenda } from "react-icons/tfi"
import Link from "next/link"
import { useStore } from "@/hooks/useStore"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function NavBar() {
  const { user, setUser } = useStore()
  const router = useRouter()

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
        <Flex flexDir="row" gap={2} alignItems="center">
          <Icon size="lg" as={TfiAgenda} />
          <Text fontWeight="bold">MinhaTask</Text>
        </Flex>
      </Link>

      <Flex flexDir="row" gap={5} alignItems="center">
        <ColorModeButton />

        {!user ? (
          <Link href="/login">
            <Button
              variant="outline"
              colorPalette="green"
              _dark={{ variant: "solid" }}
            >
              <Text fontFamily={"body"}>Entrar</Text>
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            colorPalette="red"
            _dark={{ variant: "solid" }}
            onClick={handleLogout}
          >
            <Text fontFamily={"body"}>Sair</Text>
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
