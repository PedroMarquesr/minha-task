import { Flex, Button, Text } from "@chakra-ui/react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useStore } from "@/hooks/useStore"

export default function MenuTaskMb({ id }) {
    const { user } = useStore()

    const handleCheckTask = async (id) => {
        try {
            const taskRef = doc(db, "tasks", id)
            await updateDoc(taskRef, {
                isCompleted: true,
                completedDate: new Date(),
                status: "Concluído",
                userCompleted: user.displayName,
            })
        } catch (error) {
            console.error("Erro ao completar a tarefa", error)
        }
    }
    const handleDeleteTask = async (id) => {
        try {
            const taskRef = doc(db, "tasks", id)
            await deleteDoc(taskRef)
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error)
        }
    }
    return (
        <Flex transition={"all 0.2s ease"} flexDir={"column"} display={{ base: "flex", md: "none" }} mt={5} gap={1}>
            <Button bgColor={"green.500"} color={"white"} size={"sm"} onClick={() => handleCheckTask(id)}>
                <Text>Marcar como concluída</Text>
            </Button>

            <Button bgColor={"red.500"} color={"white"} size={"sm"} onClick={() => handleDeleteTask(id)}>

                <Text>Deletar</Text>
            </Button>
        </Flex>
    )
}