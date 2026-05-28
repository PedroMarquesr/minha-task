import { Flex, Text, Accordion } from "@chakra-ui/react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"
import { FaPlay, FaClock, FaCheck, FaListUl } from "react-icons/fa"

import { useStore } from "@/hooks/useStore"
import { db } from "@/lib/firebase"
import CardTask from "./components/CardTask/CardTask"

const TaskCategory = ({ value, title, count, icon: IconComponent, colorScheme, tasks }) => (
  <Accordion.Item
    value={value}
    bg="white"
    _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    borderRadius="xl"
    boxShadow="sm"
    border="1px solid"
    borderColor="gray.200"
    overflow="hidden"
    mb={4}
  >
    <Accordion.ItemTrigger
      px={{ base: 4, md: 6 }}
      py={4}
      _hover={{ bg: "gray.50", _dark: { bg: "whiteAlpha.50" } }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <Flex alignItems="center" w="100%" justifyContent="space-between">
        <Flex alignItems="center" gap={4}>
          <Flex
            alignItems="center"
            justifyContent="center"
            w={10}
            h={10}
            borderRadius="full"
            bg={`${colorScheme}.100`}
            color={`${colorScheme}.600`}
            _dark={{ bg: `${colorScheme}.900`, color: `${colorScheme}.200` }}
          >
            <IconComponent size={18} />
          </Flex>
          <Text fontSize="lg" fontWeight="semibold" color="gray.800" _dark={{ color: "gray.100" }}>
            {title}
          </Text>
        </Flex>

        <Flex alignItems="center" gap={4}>
          <Flex
            alignItems="center"
            justifyContent="center"
            px={3}
            py={1}
            borderRadius="full"
            bg="gray.100"
            color="gray.700"
            fontWeight="bold"
            fontSize="sm"
            _dark={{ bg: "gray.700", color: "gray.300" }}
          >
            {count}
          </Flex>
          <Accordion.ItemIndicator color="gray.400" />
        </Flex>
      </Flex>
    </Accordion.ItemTrigger>
    <Accordion.ItemContent px={{ base: 4, md: 6 }} pb={6} pt={2}>
      {tasks.length > 0 ? (
        <Flex flexDir="column" gap={4} w="100%">
          {tasks.map((task) => (
            <CardTask key={task.id} {...task} />
          ))}
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" py={8} color="gray.400" _dark={{ color: "gray.500" }}>
          <Text fontSize="sm">Nenhuma tarefa encontrada.</Text>
        </Flex>
      )}
    </Accordion.ItemContent>
  </Accordion.Item>
);

export default function ContainerTasks() {
  const { user } = useStore()
  const [tasks, setTasks] = useState([])
  const [tasksActive, setTasksActive] = useState([])
  const [totalTasks, setTotalTasks] = useState(0)
  const [totalTasksActive, setTotalTasksActive] = useState(0)
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0)
  const [completedTasks, setCompletedTasks] = useState([])
  const [inProgressTasks, setInProgressTasks] = useState([])
  const [totalTasksInProgress, setTotalTasksInProgress] = useState(0)

  useEffect(() => {
    if (!user) return

    const auth = getAuth()
    console.log("Usuário no Zustand:", user)
    console.log("Usuário autenticado no Firebase:", auth.currentUser)

    const sortTasks = (tasks) => {
      return tasks.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
        return dateA - dateB
      })
    }
    // Total Tasks Active
    const allTasksQuery = query(
      collection(db, "tasks"),
      where("companyId", "==", user.companyId),
    )
    const unsubscribeTasks = onSnapshot(
      allTasksQuery,
      (querySnapshot) => {
        const tasksList = []
        querySnapshot.forEach((doc) => {
          tasksList.push({ ...doc.data(), id: doc.id })
        })
        setTotalTasks(tasksList.length)
        setTasks(sortTasks(tasksList))
      },
      (error) => {
        console.error("Erro ao buscar tarefas:", error)
      },
    )
    // Tarefas em Andamento
    const qinProgress = query(
      collection(db, "tasks"),
      where("status", "==", "Fazendo"),
      where("companyId", "==", user.companyId),
    )

    const unsubscribeInProgressTasks = onSnapshot(
      qinProgress,
      (querySnapshot) => {
        const inProgressTasksList = []
        querySnapshot.forEach((doc) => {
          inProgressTasksList.push({ ...doc.data(), id: doc.id })
        })
        setInProgressTasks(sortTasks(inProgressTasksList))
        setTotalTasksInProgress(inProgressTasksList.length)
      },
      (error) => {
        console.error("Erro ao buscar tarefas em andamento:", error)
      },
    )

    // Tarefas A Fazer
    const q = query(
      collection(db, "tasks"),
      where("status", "==", "A fazer"),
      where("companyId", "==", user.companyId),
    )
    const unsubscribeActiveTasks = onSnapshot(
      q,
      (querySnapshot) => {
        const tasksList = []
        querySnapshot.forEach((doc) => {
          tasksList.push({ ...doc.data(), id: doc.id })
        })
        setTotalTasksActive(tasksList.length)
        setTasksActive(sortTasks(tasksList))
      },
      (error) => {
        console.error("Erro ao buscar tarefas ativas:", error)
      },
    )
    // Tarefas concluidas
    const qCompleted = query(
      collection(db, "tasks"),
      where("isCompleted", "==", true),
      where("companyId", "==", user?.companyId),
    )
    const unsubscribeCompletedTasks = onSnapshot(
      qCompleted,
      (querySnapshot) => {
        const completedTasksList = []
        querySnapshot.forEach((doc) => {
          completedTasksList.push({ ...doc.data(), id: doc.id })
        })
        setTotalTasksCompleted(completedTasksList.length)
        setCompletedTasks(sortTasks(completedTasksList))
      },
    )

    return () => {
      unsubscribeTasks()
      unsubscribeActiveTasks()
      unsubscribeCompletedTasks()
      unsubscribeInProgressTasks()
    }
  }, [user])

  return (
    <Flex flexDir="column" w="100%" maxW="1000px" mx="auto" px={4} py={8}>
      {!user ? (
        <Flex
          w="100%"
          p={8}
          bg="blue.50"
          color="blue.700"
          _dark={{ color: "blue.200" }}
          borderRadius="xl"
          justifyContent="center"
          alignItems="center"
          boxShadow="sm"
        >
          <Text fontSize="lg" fontWeight="medium">Faça login para adicionar tarefas</Text>
        </Flex>
      ) : (
        <Accordion.Root collapsible multiple defaultValue={["in-progress"]} w="100%">
          <TaskCategory
            value="in-progress"
            title="Em andamento"
            count={totalTasksInProgress}
            icon={FaPlay}
            colorScheme="blue"
            tasks={inProgressTasks}
          />
          <TaskCategory
            value="pending"
            title="Pendentes"
            count={totalTasksActive}
            icon={FaClock}
            colorScheme="orange"
            tasks={tasksActive}
          />
          <TaskCategory
            value="completed"
            title="Concluídas"
            count={totalTasksCompleted}
            icon={FaCheck}
            colorScheme="green"
            tasks={completedTasks}
          />
          <TaskCategory
            value="all"
            title="Todas as tarefas"
            count={totalTasks}
            icon={FaListUl}
            colorScheme="purple"
            tasks={tasks}
          />
        </Accordion.Root>
      )}
    </Flex>
  )
}
