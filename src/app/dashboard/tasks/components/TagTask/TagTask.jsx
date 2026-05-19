import { HStack, Tag } from "@chakra-ui/react";

export default function TagTask({ tagTitle, functionDeleteTag }) {
    return (
        <HStack>

            <Tag.Root colorPalette={"purple"} variant={"subtle"}>
                <Tag.Label>{tagTitle}</Tag.Label>
                <Tag.EndElement>
                    <Tag.CloseTrigger cursor={"pointer"} onClick={() => functionDeleteTag(tagTitle)} />
                </Tag.EndElement>
            </Tag.Root>
        </HStack>
    )
}