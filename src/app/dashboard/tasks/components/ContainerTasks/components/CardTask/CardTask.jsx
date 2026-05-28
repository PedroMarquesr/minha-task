import { Flex, Text, Status, Badge, Box } from "@chakra-ui/react"
import { FcHighPriority } from "react-icons/fc"
import { FiCalendar, FiClock, FiUser, FiCheckCircle } from "react-icons/fi"
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
  status,
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
      p={5}
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
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      position="relative"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
        borderColor: `${priorityColor}.200`,
        _dark: { borderColor: `${priorityColor}.800`, bg: "whiteAlpha.100" },
      }}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Flex justifyContent="space-between" alignItems="flex-start" mb={description ? 3 : 1}>
        <Flex flexDir="column" gap={3}>
          <Flex align="center" gap={3} flexWrap="wrap">
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="gray.800"
              _dark={{ color: "whiteAlpha.900" }}
              lineHeight="tight"
            >
              {title}
            </Text>

            <Status.Root colorPalette={priorityColor} gap={1.5} fontSize="sm">
              {priority === "Urgente" ? <FcHighPriority size={16} /> : <Status.Indicator />}
              <Text
                fontSize="xs"
                fontWeight="bold"
                color={`${priorityColor}.700`}
                _dark={{ color: `${priorityColor}.300` }}
              >
                {priority?.toUpperCase()}
              </Text>
            </Status.Root>
          </Flex>

          {tags && tags.length > 0 && (
            <Flex gap={2} flexWrap="wrap">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  colorPalette={priorityColor}
                  variant="surface"
                  size="sm"
                  rounded="md"
                  px={2.5}
                  py={0.5}
                >
                  {tag}
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>

        <Flex align="center" position="relative" zIndex={2}>
          <MenuTask showMenu={showMenu} id={id} semanticButton={status} />
        </Flex>
      </Flex>

      {description && (
        <Box
          mt={2}
          p={3}
          rounded="lg"
          bg="gray.50"
          borderLeft="2px solid"
          borderLeftColor={`${priorityColor}.300`}
          _dark={{ borderLeftColor: `${priorityColor}.600`, bg: "whiteAlpha.100" }}
        >
          <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }} noOfLines={3}>
            {description}
          </Text>
        </Box>
      )}

      <Box mt={4} mb={3} borderTop="1px solid" borderColor="gray.100" _dark={{ borderColor: "whiteAlpha.200" }} w="100%" />

      <Flex
        flexWrap="wrap"
        gap={4}
        alignItems="center"
        color="gray.500"
        _dark={{ color: "gray.400" }}
        fontSize="xs"
      >
        {dueDate ? (
          <Flex align="center" gap={1.5}>
            <FiClock size={14} />
            <Text fontWeight="medium" color={new Date(dueDate) < new Date() && !isCompleted ? "red.500" : "inherit"} _dark={{ color: new Date(dueDate) < new Date() && !isCompleted ? "red.400" : "inherit" }}>
              Prazo:{" "}
              {dueDate?.toDate
                ? dueDate.toDate().toLocaleDateString()
                : new Date(dueDate).toLocaleDateString()}{" "}
              às{" "}
              {dueDate?.toDate
                ? dueDate.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : new Date(dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Flex>
        ) : (
          <Flex align="center" gap={1.5}>
            <FiCalendar size={14} />
            <Text>Sem prazo definido</Text>
          </Flex>
        )}

        <Flex align="center" gap={1.5}>
          <FiUser size={14} />
          <Text>
            Criado por {userCreator || (userEmail ? userEmail.split('@')[0] : "Sem nome")} em{" "}
            {createdAt?.toDate
              ? createdAt.toDate().toLocaleDateString()
              : createdAt ? new Date(createdAt).toLocaleDateString() : ""}
          </Text>
        </Flex>

        {isCompleted && completedDate && (
          <Flex align="center" gap={1.5} color="green.600" _dark={{ color: "green.400" }}>
            <FiCheckCircle size={14} />
            <Text fontWeight="medium">
              Concluída por {userCompleted ? userCompleted.split('@')[0] : "Usuário"} em{" "}
              {completedDate?.toDate
                ? completedDate.toDate().toLocaleDateString()
                : new Date(completedDate).toLocaleDateString()}
            </Text>
          </Flex>
        )}
      </Flex>

      <MenuTaskMb id={id} />
    </Flex>
  )
}
