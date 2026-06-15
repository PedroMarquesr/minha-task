
"use client"

import { Flex, Text, Button, Dialog, Clipboard, IconButton, CloseButton } from "@chakra-ui/react"
import ContainerCounterMembers from "./components/ContainerCounterMembers/ContainerCounterMembers"
import ContainerListMembers from "./components/ContainerListMembers/ContainerListMembers"
import { FaUserPlus } from "react-icons/fa6"
import { useStore } from "@/hooks/useStore"
import { doc, collection, setDoc, serverTimestamp, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useState } from "react"
export default function TeamManagement() {
  const [openDialog, setOpenDialog] = useState(false)
  const [linkInvite, setLinkInvite] = useState("")


  const { user } = useStore()

  const handleInvite = async () => {
    if (!user?.companyId) {
      console.error("companyId ainda não carregado")
      return
    }
    const inviteRef = doc(collection(db, "invites"))

    await setDoc(inviteRef, {
      companyId: user.companyId,
      role: "member",
      status: "pending",
      createdAt: serverTimestamp(),
      expiresAt: Timestamp.fromMillis(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    const link = `${window.location.origin}/invite/${inviteRef.id}`

    setLinkInvite(link)
    setOpenDialog(true)
  }

  return (
    <Flex
      p={{ base: 4, md: 10 }}
      flexDir={"column"}
      gap={5}
      w="100%"
      overflowX="hidden"
      boxSizing="border-box"
    >
      <Flex
        align={"center"}
        w={"100%"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex
          flexDir="column"
          ml={{ base: 0, md: 10 }}
          align={{ base: "center", md: "start" }}
        >
          <Text
            fontSize="3xl"
            fontWeight={"bold"}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
          >
            Gerenciamento de equipe
          </Text>
        </Flex>
        <Flex
          align={"center"}
          justify={"center"}
          w={{ base: "100%", md: "auto" }}
          mt={{ base: 4, md: 0 }}
        >
          <Button
            w={{ base: "100%", md: "auto" }}
            colorPalette={"green"}
            mr={{ base: 0, md: 10 }}
            onClick={handleInvite}
          >
            <FaUserPlus />
            Adicionar membro
          </Button>

          <Dialog.Root open={openDialog} onOpenChange={(e) => setOpenDialog(e.open)} >
            <Dialog.Trigger />
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.CloseTrigger />
                <Dialog.Header>

                  <Dialog.Title>Compartilhe o link com o novo usuário</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Flex align={"center"} flexDir={"row"} gap={4}>
                    <Text>{linkInvite}</Text>
                    <Clipboard.Root value={linkInvite}>
                      <Clipboard.Trigger asChild>
                        <IconButton variant="surface" size="xs">
                          <Clipboard.Indicator />
                        </IconButton>
                      </Clipboard.Trigger>

                    </Clipboard.Root>
                  </Flex>

                </Dialog.Body>
                <Dialog.Footer>

                  <Dialog.CloseTrigger asChild>
                    <CloseButton onClick={() => setOpenDialog(false)} size="sm" />
                  </Dialog.CloseTrigger>


                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </Flex>
      </Flex>

      <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
        <Flex >
          <ContainerCounterMembers />
        </Flex>
        <Flex w={"100%"} >
          <ContainerListMembers />
        </Flex>
      </Flex>
    </Flex >
  )
}