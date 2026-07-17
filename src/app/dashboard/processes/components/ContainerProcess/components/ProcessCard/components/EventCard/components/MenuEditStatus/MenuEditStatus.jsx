import { Menu, Portal, IconButton } from "@chakra-ui/react"
import { MdNextPlan } from "react-icons/md"
import { Tooltip } from "@/components/ui/tooltip"
import { useState } from "react"
import FloatingComentEvent from "./components/FloatingComentEvent/FloatingComentEvent"
export default function MenuEditStatus() {
  const [openFloating, setOpenFloating] = useState(false)

  const optionsStatusEvent = [
    { label: "Agendado", value: "agendado" },
    { label: "Realizado", value: "realizado" },
    { label: "Cancelado", value: "cancelado" },
    { label: "Redesignado", value: "redesignado" },
    { label: "Concluído", value: "concluido" },
    { label: "Em andamento", value: "em_andamento" },
    { label: "Suspenso", value: "suspenso" },
  ]

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          variant="ghost"
          cursor="pointer"
          p={0}
          minW="auto"
          h="auto"
          _hover={{ bg: "transparent", opacity: 0.8 }}
          color="blue.500"
          _dark={{ color: "blue.300" }}
        >
          <Tooltip content="Atualizar status do evento" placement="top">
            <MdNextPlan size={20} />
          </Tooltip>
        </IconButton>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {optionsStatusEvent.map((option) => (
              <Menu.Item
                _hover={{ bgColor: "gray.400" }}
                _dark={{ _hover: "gray.200" }}
                onClick={() => setOpenFloating(!openFloating)}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
      <FloatingComentEvent
        isOpen={openFloating}
        onOpenChange={(details) => setOpenFloating(details.open)}
      />
    </Menu.Root>
  )
}
