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
            default:
                return "gray";
        }
    }

    const priorityColor = chooseBorderPriority(priority);

    return (
        <Flex
            p={4} 
            mb={4} 
            border="1px solid"
            borderColor="gray.200"
            _dark={{ borderColor: "whiteAlpha.200", bg: "whiteAlpha.50" }}
            bg="white"
            rounded="xl" 
            flexDir="column"
            borderLeftWidth="4px"
            borderLeftColor={`${priorityColor}.500`}
            boxShadow="sm"
            transition="all 0.2s ease"
            _hover={{ 
                boxShadow: "md", 
                transform: "translateY(-2px)",
                borderColor: "gray.300",
                _dark: { borderColor: "whiteAlpha.300", bg: "whiteAlpha.100" }
            }}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            <Flex justifyContent="space-between" mb={tags && tags.length > 0 ? 3 : 0}>
                <Flex align="center" gap={3}>
                    <Text fontWeight="semibold" fontSize="md" color="gray.800" _dark={{ color: "whiteAlpha.900" }}>
                        {title}
                    </Text>

                    <Status.Root colorPalette={priorityColor} gap={1} fontSize="lg">
                        {priority === "Urgente" ? <FcHighPriority /> : <Status.Indicator />}
                        <Text fontSize="xs" fontWeight="bold" color={`${priorityColor}.600`} _dark={{ color: `${priorityColor}.300` }}>
                            {priority?.toUpperCase()}
                        </Text>
                    </Status.Root>
                </Flex>

                <Flex align="center">
                    <MenuTask showMenu={showMenu} />
                </Flex>
            </Flex>
            
            {tags && tags.length > 0 && (
                <Flex gap={2} flexWrap="wrap">
                    {tags.map((tag) => (
                        <Badge key={tag} colorPalette={priorityColor} variant="subtle" size="sm" rounded="md">
                            {tag}
                        </Badge>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}