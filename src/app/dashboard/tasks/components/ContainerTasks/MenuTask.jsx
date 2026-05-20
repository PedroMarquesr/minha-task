import { Flex, Button } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa"
import { MdModeEdit, MdDelete } from "react-icons/md"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function MenuTask({ showMenu, id }) {
  const handleDeleteTask = async (id) => {
    try {
      const taskRef = doc(db, "tasks", id)
      await deleteDoc(taskRef)
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error)
    }
  }

  return (
    <Flex opacity={showMenu ? 1 : 0} h={5} transition={"all 0.2s ease"} gap={2}>
      <Button color="white" bgColor={"green.400"} size={"xsm"}>
        <FaCheck />{" "}
      </Button>
      <Button color="white" bgColor={"orange.400"} size={"xsm"}>
        <MdModeEdit />{" "}
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
