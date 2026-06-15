import { Flex, Text, Avatar } from "@chakra-ui/react"
import { useStore } from "@/hooks/useStore"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"


import { useEffect, useState } from "react"

export default function ContainerListMembers() {
    const { user } = useStore()
    const [members, setMembers] = useState([])

    useEffect(() => {
        async function fetchMembers() {
            if (!user?.companyId) return

            const companyRef = doc(db, "companies", user.companyId)
            const snapshot = await getDoc(companyRef)

            const data = snapshot.data()
            const memberIds = Object.keys(data.members)
            const memberList = memberIds.map(id => ({
                id: id,
                ...data.members[id]
            }))
            setMembers(memberList)

        }
        fetchMembers()
    }, [user?.companyId])


    return (
        <Flex w="100%" >
            {members.length === 0 ? (
                <Text>Nenhum membro encontrado</Text>
            ) : (
                <Flex flexDir="column" alignItems="start" w="100%" gap={2} >
                    {members.map(member => (
                        <Flex key={member.id} p={2} borderRadius={8}
                            _hover={{ bgColor: member.role === "member" ? "green.300" : "blue.300" }}
                            _dark={{
                                _hover: { bgColor: member.role === "member" ? "green.600" : "blue.600" },
                                bg: member.role === "member" ? "green.400" : "blue.400"
                            }}
                            bg={member.role === "member" ? "green.200" : "blue.200"}
                            alignItems="center" gap={2} py={2} w={"100%"} justifyContent="space-between" >
                            <Flex alignItems="center" gap={2} >
                                <Avatar.Root
                                    _dark={{ bg: member.role === "member" ? "green.600" : "blue.600" }}
                                    bg={member.role === "member" ? "green.400" : "blue.400"} >
                                    <Avatar.Fallback name={member.displayName} />
                                </Avatar.Root>
                                <Text>{member.displayName}</Text>
                            </Flex>
                            <Flex pr={3}>
                                <Text>{member.role === "member" ? "Membro" : "Admin"}</Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}