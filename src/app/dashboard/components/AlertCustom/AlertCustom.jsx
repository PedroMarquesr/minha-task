import { Alert, Accordion } from "@chakra-ui/react";

export default function AlertCustom({ title, description, status, open }) {
    return (
        <Accordion.Root collapsible={true} position={"absolute"} top={0} left={0} w={"100vw"} zIndex={1000} animation={".5s ease-in-out"}>
            <Accordion.Item open={open} >
                <Accordion.ItemContent>
                    <Alert.Root status={status} title={title} variant="solid" borderRadius={"none"}>
                        <Alert.Indicator />
                        <Alert.Title>{description}</Alert.Title>
                    </Alert.Root>
                </Accordion.ItemContent>
            </Accordion.Item>
        </Accordion.Root>
    )
}