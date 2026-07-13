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
import ContentConfirmDelProcesse from "./components/ContentConfirmDelProcesse/ContentConfirmDelProcesse"
import ContentConfirmDelEvent from "./components/ContentConfirmDelEvent/ContentConfirmDelEvent"

export default function DialogConfirmDelete({
  isOpen,
  setIsOpen,
  contentDelete,
  processNumber,
  processType,
  tribunal,
  status,
  partes,
  tags,
  valorCausa,
}) {
  return (
    <>
      <Dialog.Root open={isOpen}>
        <Portal>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Flex flexDir="column">
                  <Dialog.Title>
                    Confirmação de exclusão de processo
                  </Dialog.Title>
                </Flex>
              </Dialog.Header>
              <Dialog.Body>
                {contentDelete === "processo" ? (
                  <ContentConfirmDelProcesse
                    processNumber={processNumber}
                    processType={processType}
                    tribunal={tribunal}
                    status={status}
                    partes={partes}
                    tags={tags}
                    valorCausa={valorCausa}
                  />
                ) : (
                  <ContentConfirmDelEvent />
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancelar
                  </Button>
                </Dialog.ActionTrigger>
                <Button colorPalette="red" _hover={{ bg: "red.500" }}>
                  Excluir
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* {showAlert && (
        <AlertDefault
          title="Sucesso"
          description="Status atualizado com sucesso"
          status="success"
        />
      )} */}
    </>
  )
}
