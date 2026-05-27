import { Flex, Button } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa"
import { MdModeEdit, MdDelete } from "react-icons/md"
import { HiArrowCircleRight } from "react-icons/hi"

import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useStore } from "@/hooks/useStore"

export default function MenuTask({ showMenu, id, semanticButton }) {
  const { user } = useStore()

  const handleMoveTaskToInProgress = async (id) => {
    try {
      const taskRef = doc(db, "tasks", id)
      await updateDoc(taskRef, {
        status: "Fazendo",
        userMoveToInProgress: user.displayName,
        dateMoveToInProgress: new Date(),
      })
    } catch (error) {
      console.error("Erro ao mover tarefa para em progresso", error)
    }
  }

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
    <Flex
      opacity={showMenu ? 1 : 0}
      display={{ base: "none", md: "flex" }}
      h={5}
      transition={"all 0.2s ease"}
      gap={2}
    >
      <Button
        color="white"
        bgColor={"green.400"}
        size={"xsm"}
        onClick={() => handleCheckTask(id)}
      >
        <FaCheck />{" "}
      </Button>
      <Button
        color="white"
        bgColor={"orange.500"}
        size={"xsm"}
        onClick={() => handleMoveTaskToInProgress(id)}
        display={semanticButton === "A fazer" ? "flex" : "none"}
      >
        <HiArrowCircleRight />
      </Button>
      <Button
        color="white"
        bgColor={"red.400"}
        size={"xsm"}
        onClick={() => handleDeleteTask(id)}
      >
        <MdDelete />{" "}
      </Button>
    </Flex>
  )
}
