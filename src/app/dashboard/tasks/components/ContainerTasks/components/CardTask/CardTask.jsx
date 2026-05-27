import { Flex, Text, Status, Badge } from "@chakra-ui/react"
import { FcHighPriority } from "react-icons/fc"
import MenuTask from "../../MenuTask"
import MenuTaskMb from "../../MenuTaskMb"
import { useState } from "react"
import { useStore } from "@/hooks/useStore"

export default function CardTask({
  id,
  title,
  priority,
  tags,
  description,
  dueDate,
  userCreator,
  userEmail,
  isCompleted,
  userCompleted,
  completedDate,
  createdAt,
}) {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useStore()
  const chooseBorderPriority = (priority) => {
    switch (priority) {
      case "Baixa":
        return "green"
      case "Media":
        return "yellow"
      case "Alta":
        return "orange"
      case "Urgente":
        return "red"
      default:
        return "gray"
    }
  }

  const priorityColor = chooseBorderPriority(priority)

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
        _dark: { borderColor: "whiteAlpha.300", bg: "whiteAlpha.100" },
      }}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Flex justifyContent="space-between" mb={tags && tags.length > 0 ? 3 : 0}>
        <Flex align="center" gap={3}>
          <Text
            fontWeight="semibold"
            fontSize="md"
            color="gray.800"
            _dark={{ color: "whiteAlpha.900" }}
          >
            {title}
          </Text>

          <Status.Root colorPalette={priorityColor} gap={1} fontSize="lg">
            {priority === "Urgente" ? <FcHighPriority /> : <Status.Indicator />}
            <Text
              fontSize="xs"
              fontWeight="bold"
              color={`${priorityColor}.600`}
              _dark={{ color: `${priorityColor}.300` }}
            >
              {priority?.toUpperCase()}
            </Text>
          </Status.Root>
        </Flex>

        <Flex align="center">
          <MenuTask showMenu={showMenu} id={id} />
        </Flex>
      </Flex>

      {tags && tags.length > 0 && (
        <Flex gap={2} flexWrap="wrap">
          {tags.map((tag) => (
            <Badge
              key={tag}
              colorPalette={priorityColor}
              variant="subtle"
              size="sm"
              rounded="md"
            >
              {tag}
            </Badge>
          ))}
        </Flex>
      )}
      <Flex
        mt={2}
        p={2}
        rounded={"xl"}
        backgroundColor={"gray.300"}
        _dark={{ backgroundColor: "gray.800" }}
      >
        <Text>{description}</Text>
      </Flex>
      {dueDate && (
        <Flex mt={2}>
          <Text fontWeight={"bold"}>Prazo:</Text>
          <Text pl={2}>
            {dueDate?.toDate
              ? dueDate.toDate().toLocaleDateString()
              : new Date(dueDate).toLocaleDateString()}
          </Text>
          <Text pl={2}>
            {dueDate?.toDate
              ? dueDate.toDate().toLocaleTimeString()
              : new Date(dueDate).toLocaleTimeString()}
          </Text>
        </Flex>
      )}
      {!dueDate && (
        <Flex mt={2}>
          <Text fontWeight={"bold"}>Sem prazo definido</Text>
        </Flex>
      )}

      <Flex
        mt={2}
        flexWrap="wrap"
        gap={1}
        flexDir={{ base: "column", md: "row" }}
        backgroundColor={"blue.100"}
        _dark={{ backgroundColor: "purple.400", color: "black" }}
        p={1}
        rounded={"lg"}
      >
        <Text fontSize={"xs"}>
          Criada por: {userCreator || userEmail || "Sem nome"} em
        </Text>
        <Text fontSize={"xs"} fontWeight={"bold"}>
          {createdAt?.toDate
            ? createdAt.toDate().toLocaleDateString()
            : new Date(createdAt).toLocaleDateString()}{" "}
          -{" "}
          {createdAt?.toDate
            ? createdAt.toDate().toLocaleTimeString()
            : new Date(createdAt).toLocaleTimeString()}
        </Text>
      </Flex>

      {isCompleted && completedDate && (
        <Flex
          mt={2}
          align="center"
          flexWrap="wrap"
          gap={1}
          backgroundColor={"blue.100"}
          _dark={{ backgroundColor: "blue.400", color: "black" }}
          p={1}
          rounded={"lg"}
        >
          <Text fontSize={"xs"}>Concluída por: {userCompleted} em</Text>
          <Text fontSize={"xs"} fontWeight={"bold"}>
            {completedDate?.toDate
              ? completedDate.toDate().toLocaleDateString()
              : new Date(completedDate).toLocaleDateString()}{" "}
            -{" "}
            {completedDate?.toDate
              ? completedDate.toDate().toLocaleTimeString()
              : new Date(completedDate).toLocaleTimeString()}
          </Text>
        </Flex>
      )}
      <MenuTaskMb id={id} />
    </Flex>
  )
}
