import {
  Button,
  CloseButton,
  Dialog,
  Icon,
  Portal,
  Input,
} from "@chakra-ui/react"
import { FaRegUser } from "react-icons/fa"

export default function DialogAddValueprocess({ isOpen, setIsOpen }) {
  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Editar valor do processo</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                type="number"
                placeholder="Valor do processo"
                leftElement={<Icon as={FaRegUser} />}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button>Salvar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
