import {
  Button,
  CloseButton,
  Dialog,
  Icon,
  Portal,
  Flex,
  Text,
  Input,
} from "@chakra-ui/react"
import { FaRegUser } from "react-icons/fa"

import { useState } from "react"
import { formatCurrency } from "@/utils/format"
import { doc, updateDoc, serverTimestamp } from "firebase/firestore"
import AlertDefault from "@/components/AlertDefault/AlertDefault"
import ComboboxProcess from "@/app/dashboard/processes/components/ComboboxProcess/ComboboxProcess"
import { db } from "@/lib/firebase"

export default function DialogChangeStatusProcess({
  isOpen,
  setIsOpen,
  processId,
}) {
  const [status, setStatus] = useState()
  const [showAlert, setShowAlert] = useState(false)

  const optionsStatusProcess = [
    { label: "Em andamento", value: "em_andamento" },
    { label: "Encerrado", value: "encerrado" },
    { label: "Arquivado", value: "arquivado" },
  ]
  const handleUpdateProcessStatus = async () => {
    try {
      if (!status) return

      setIsOpen(false)
      setShowAlert(true)

      setTimeout(async () => {
        const processRef = doc(db, "processes", processId)
        await updateDoc(processRef, {
          status: status,
        })
        setShowAlert(false)
        setStatus(undefined)
      }, 1500)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Dialog.Root open={isOpen}>
        <Portal>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Flex flexDir="column">
                  <Dialog.Title>Alterar status do processo</Dialog.Title>
                </Flex>
              </Dialog.Header>
              <Dialog.Body>
                <ComboboxProcess
                  listOptions={optionsStatusProcess}
                  placeholder="Selecione o status"
                  value={status}
                  onValueChange={(e) => setStatus(e.value[0])}
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancelar
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  onClick={handleUpdateProcessStatus}
                  colorPalette="purple"
                  _hover={{ bg: "purple.500" }}
                >
                  Salvar
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {showAlert && (
        <AlertDefault
          title="Sucesso"
          description="Status atualizado com sucesso"
          status="success"
        />
      )}
    </>
  )
}
