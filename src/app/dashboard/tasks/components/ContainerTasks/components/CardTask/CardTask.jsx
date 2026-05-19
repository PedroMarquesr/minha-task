import { Flex, Text, Status, Badge } from "@chakra-ui/react";
import { FcHighPriority } from "react-icons/fc";
import MenuTask from "../../MenuTask";
import { useState } from "react";



export default function CardTask({ title, priority, tags }) {
    const [showMenu, setShowMenu] = useState(false);
    const chooseBorderPriority = (priority) => {
        switch (priority) {
            case "Baixa":
                return "green";
            case "Media":
                return "yellow";
            case "Alta":
                return "orange";
            case "Urgente":
                return "red";
        }
    }
    return (
        <Flex
            p={2} mb={3} border={"1px solid #ddd"} rounded={"lg"} flexDir={"column"}
            borderLeft={`4px solid ${chooseBorderPriority(priority)}`}
            _hover={{ transition: "all 0.2s ease" }}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            <Flex justifyContent={"space-between"}>

                <Flex align={"center"} gap={2}>
                    <Text mr={3}>{title}</Text>

                    <Status.Root colorPalette={chooseBorderPriority(priority)} gap={1} fontSize={"lg"}>
                        {priority === "Urgente" ? <FcHighPriority /> : <Status.Indicator />}
                        <Text fontSize={"sm"} color={chooseBorderPriority(priority)}>{priority} </Text>

                    </Status.Root>
                </Flex>

                <Flex  >
                    <MenuTask showMenu={showMenu} />
                </Flex>
            </Flex>
            <Flex gap={2}>
                {tags.map((tag) => (
                    <Badge key={tag} colorPalette={chooseBorderPriority(priority)}>{tag} </Badge>
                ))}
            </Flex>


        </Flex>
    )
}