import { Dialog, Flex, Input, Portal, Button } from "@chakra-ui/react"
import ComboboxProcess from "@/app/dashboard/processes/components/ComboboxProcess/ComboboxProcess"

export default function DialogNewEvent({ isOpen, setIsOpen, processId }) {

    const optionsTypeProcess = [
        { label: "Trabalhista", value: "trabalhista" },
        { label: "Cível", value: "civel" },
        { label: "Tributário", value: "tributario" },
        { label: "Administrativo", value: "administrativo" },
        { label: "Criminal", value: "criminal" },
        { label: "Família", value: "familia" },
    ]


    return (
        <Dialog.Root open={true}>
            <Portal>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Adicionar evento</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>

                            <ComboboxProcess label={"Tipo"} listOptions={optionsTypeProcess} />


                            <Flex>
                                <Flex>
                                    <Input type="date" placeholder="Data do evento" />
                                </Flex>

                                <Flex>
                                    <Input type="date" placeholder="Data do evento" />
                                </Flex>
                            </Flex>



                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" onClick={() => setIsOpen(false)}>
                                    Cancelar
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="purple" _hover={{ bg: "purple.500" }}>Salvar</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
