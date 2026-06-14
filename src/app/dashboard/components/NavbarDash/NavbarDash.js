"use client"

import { Flex, Text, Icon, Button, Box } from "@chakra-ui/react"
import { TfiAgenda } from "react-icons/tfi"
import { FaUsers } from "react-icons/fa"
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

    const q = query(
      collection(db, "companies"),
      where(`members.${user.uid}`, "!=", null),
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const companyDoc = querySnapshot.docs[0]
        setCompanyName(companyDoc.data().name)
      } else {
        setCompanyName("Sem Equipe")
      }
    })

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
      as="nav"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: 4, md: 8 }}
      py={3}
      bg="white"
      _dark={{ bg: "gray.900", borderBottomColor: "whiteAlpha.200" }}
      boxShadow="sm"
      borderBottom="1px solid"
      borderBottomColor="gray.100"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Link href={user ? "/dashboard" : "/"}>
        <Flex flexDir="row" alignItems="center" gap={{ base: 2, md: 4 }}>
          <Flex flexDir="row" gap={3} alignItems="center">
            <Flex
              align="center"
              justify="center"
              bg="purple.600"
              _dark={{ bg: "purple.500" }}
              color="white"
              w={8}
              h={8}
              rounded="lg"
              boxShadow="sm"
            >
              <Icon size="md" as={TfiAgenda} />
            </Flex>
            <Text fontSize="xl" fontWeight="black" letterSpacing="tight" display={{ base: "none", sm: "block" }} color="gray.800" _dark={{ color: "whiteAlpha.900" }}>
              MinhaTask
            </Text>
          </Flex>

          <Box w="1px" h="24px" bg="gray.300" _dark={{ bg: "gray.600" }} mx={{ base: 1, md: 2 }} />

          <Flex
            flexDir="row"
            gap={2}
            alignItems="center"
            bg="purple.50"
            color="purple.700"
            px={4}
            py={1.5}
            rounded="full"
            border="1px solid"
            borderColor="purple.200"
            _dark={{ borderColor: "purple.800", color: "purple.200", bg: "purple.900/40" }}
            transition="all 0.2s"
            _hover={{
              bg: "purple.100",
              _dark: { bg: "purple.900/60" }
            }}
          >
            <Icon as={FaUsers} />
            <Text fontSize="sm" fontWeight="bold" noOfLines={1} maxW={{ base: "120px", md: "250px" }}>
              {companyName ? companyName : "Carregando..."}
            </Text>
          </Flex>
        </Flex>
      </Link>

      <Flex flexDir="row" gap={{ base: 2, md: 4 }} alignItems="center">
        <ColorModeButton />

        <MenuNavbarDashboard setOpenMenu={setOpenMenu} />

        <Button
          variant="subtle"
          colorPalette="red"
          size="sm"
          onClick={handleLogout}
          rounded="md"
        >
          <Text fontWeight="bold">Sair</Text>
        </Button>
      </Flex>
    </Flex>
  )
}
