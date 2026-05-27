import { Flex, Text, Accordion, Button, Span } from "@chakra-ui/react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"
import AccordionDefault from "./components/AccordionDefault/AccordionDefault"
import { FaChevronDown } from "react-icons/fa";


import { useStore } from "@/hooks/useStore"
import { db } from "@/lib/firebase"
import CardTask from "./components/CardTask/CardTask"
import MenuTask from "./MenuTask"

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
    <>
      {user ? null : (
        <Flex
          w={"100%"}
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text>Faça login para adicionar tarefas</Text>
        </Flex>
      )}

      <Accordion.Root collapsible>
        <Accordion.Item borderBottom={"1px solid"} borderColor={"gray.400"} mx={8}>
          <Accordion.ItemTrigger justifyContent={"space-between"} px={8} py={4}>
            <Flex mt={10}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Em andamento: {totalTasksInProgress}
              </Text>
            </Flex>


            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>

            <Flex
              flexDir={"column"}
              justifyContent={"space-around"}
              w={"100%"}
              h={"100%"}
            >
              {inProgressTasks.map((task) => (
                <CardTask
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  priority={task.priority}
                  tags={task.tags}
                  description={task.description}
                  dueDate={task.dueDate}
                  userCreator={task.userCreator}
                  userEmail={task.userEmail}
                  isCompleted={task.isCompleted}
                  userCompleted={task.userCompleted}
                  createdAt={task.createdAt}
                  status={task.status}
                />
              ))}
            </Flex></Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>



      <Accordion.Root collapsible>
        <Accordion.Item borderBottom={"1px solid"} borderColor={"gray.400"} mx={8}>
          <Accordion.ItemTrigger justifyContent={"space-between"} px={8} py={4}>
            <Flex mt={10}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Pendentes: {totalTasksActive}
              </Text>
            </Flex>


            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent><Flex
            flexDir={"column"}
            justifyContent={"space-around"}
            w={"100%"}
            h={"100%"}
          >
            {tasksActive.map((task) => (
              <CardTask
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                tags={task.tags}
                description={task.description}
                dueDate={task.dueDate}
                userCreator={task.userCreator}
                userEmail={task.userEmail}
                isCompleted={task.isCompleted}
                userCompleted={task.userCompleted}
                createdAt={task.createdAt}
                status={task.status}
              />
            ))}
          </Flex></Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      <Accordion.Root collapsible>
        <Accordion.Item borderBottom={"1px solid"} borderColor={"gray.400"} mx={8}>
          <Accordion.ItemTrigger justifyContent={"space-between"} px={8} py={4}>
            <Flex mt={10}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Concluídas: {totalTasksCompleted}
              </Text>
            </Flex>


            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent><Flex
            flexDir={"column"}
            justifyContent={"space-around"}
            w={"100%"}
            h={"100%"}
          >
            {completedTasks.map((task) => (
              <CardTask
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                tags={task.tags}
                description={task.description}
                dueDate={task.dueDate}
                userCreator={task.userCreator}
                userEmail={task.userEmail}
                isCompleted={task.isCompleted}
                userCompleted={task.userCompleted}
                createdAt={task.createdAt}
                status={task.status}
              />
            ))}
          </Flex></Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      <Accordion.Root collapsible>
        <Accordion.Item borderBottom={"1px solid"} borderColor={"gray.400"} mx={8}>
          <Accordion.ItemTrigger justifyContent={"space-between"} px={8} py={4}>
            <Flex mt={10}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Todas as tarefas: {totalTasks}
              </Text>
            </Flex>


            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent><Flex
            flexDir={"column"}
            justifyContent={"space-around"}
            w={"100%"}
            h={"100%"}
          >
            {tasks.map((task) => (
              <CardTask
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                tags={task.tags}
                description={task.description}
                dueDate={task.dueDate}
                userCreator={task.userCreator}
                userEmail={task.userEmail}
                isCompleted={task.isCompleted}
                userCompleted={task.userCompleted}
                createdAt={task.createdAt}
                status={task.status}
              />
            ))}
          </Flex></Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

    </>
  )
}
