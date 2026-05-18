import { Button, CloseButton, Drawer, Flex, Portal, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"



export default function DrawerMenu({ openMenu, setOpenMenu }) {
    const router = useRouter()

    const menuItems = [
        {
            label: "Home",
            href: "/dashboard",
            icon: ""
        },
        {
            label: "Tarefas",
            href: "/dashboard/tasks",
            icon: ""
        },
        {
            label: "Calendário",
            href: "/dashboard/calendar",
            icon: ""
        },
        {
            label: "Contatos",
            href: "/dashboard/contacts",
            icon: ""
        },
    ]
    return (
        <Drawer.Root open={openMenu} onOpenChange={(e) => setOpenMenu(e.open)}>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Menu</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Flex flexDirection={"column"} gap={"1rem"} mt={"2rem"} >
                                {menuItems.map((item, index) => {
                                    return (
                                        <Button key={index} justifyContent={"left"} onClick={() => {
                                            router.push(item.href)
                                            setOpenMenu(false)

                                        }}>
                                            {item.label}
                                        </Button>
                                    )
                                })}

                            </Flex>
                        </Drawer.Body>

                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}