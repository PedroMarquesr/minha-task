import { Button, Dialog, Portal, Flex } from "@chakra-ui/react"
import ContentConfirmDelProcesse from "./components/ContentConfirmDelProcesse/ContentConfirmDelProcesse"
import ContentConfirmDelEvent from "./components/ContentConfirmDelEvent/ContentConfirmDelEvent"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useState } from "react"
export default function DialogConfirmDelete({
  isOpen,
  setIsOpen,
  contentDelete,
  processNumber,
  processId,
  processType,
  tribunal,
  status,
  tipo,
  data,
  local,
  tipoAudiencia,
  testemunhas,
  custos,
  userCreator,
  partes,
  tags,
  valorCausa,
  eventId,
}) {
  const handleDeleteProcess = async () => {
    try {
      const processRef = doc(db, "processes", processId)
      await deleteDoc(processRef)
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteEvent = async () => {
    try {
      const eventRef = doc(db, "events", eventId)
      await deleteDoc(eventRef)
      setIsOpen(false)
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
                  <Dialog.Title>
                    {contentDelete === "processo" ? (
                      <>
                        Confirmação de exclusão de processo
                      </>
                    ) : (
                      <>
                        Confirmação de exclusão de evento
                      </>
                    )}
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
                  <ContentConfirmDelEvent
                    tipo={tipo}
                    data={data}
                    status={status}
                    local={local}
                    tipoAudiencia={tipoAudiencia}
                    testemunhas={testemunhas}
                    custos={custos}
                    userCreator={userCreator}
                    processNumber={processNumber}
                  />
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancelar
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette="red"
                  _hover={{ bg: "red.500" }}
                  onClick={contentDelete === "processo" ? handleDeleteProcess : handleDeleteEvent
                  }
                >
                  Excluir processo
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
