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
import { db } from "@/lib/firebase"


export default function DialogAddValueprocess({ isOpen, setIsOpen, processId }) {
  const [value, setValue] = useState(0)
  const [showAlert, setShowAlert] = useState(false)


  const handleUpdateProcessValue = async () => {
    try {
      const processRef = doc(db, "processes", processId)
      await updateDoc(processRef, {
        valorCausa: value,
        updatedAt: serverTimestamp(),
      })

      setValue(0)
      setIsOpen(false)
      setShowAlert(true)

      setTimeout(() => {
        setShowAlert(false)
      }, 2000)

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
                  <Dialog.Title>Editar valor do processo</Dialog.Title>
                  <Text fontSize={"lg"}>{formatCurrency(value)}</Text>
                </Flex>

              </Dialog.Header>
              <Dialog.Body>
                <Input
                  type="number"
                  placeholder="Valor do processo"
                  leftElement={<Icon as={FaRegUser} />}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancelar
                  </Button>
                </Dialog.ActionTrigger>
                <Button onClick={handleUpdateProcessValue} colorPalette="purple" _hover={{ bg: "purple.500" }}>Salvar</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>

      </Dialog.Root>

      {showAlert && (
        <AlertDefault
          title="Sucesso"
          description="Valor atualizado com sucesso"
          status="success"
        />
      )}
    </>
  )
}
