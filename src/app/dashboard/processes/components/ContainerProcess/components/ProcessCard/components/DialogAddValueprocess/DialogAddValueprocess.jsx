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


export default function DialogAddValueprocess({ isOpen, setIsOpen }) {
  const [value, setValue] = useState(0)
  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Flex flexDir="column">
                <Dialog.Title>Editar valor do processo</Dialog.Title>
                <Text>Valor atual: {formatCurrency(value)}</Text>
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
              <Button>Salvar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
