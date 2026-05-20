import { Flex, Text } from "@chakra-ui/react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"

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
    //Total Tasks Active
    const unsubscribeTasks = onSnapshot(
      collection(db, "tasks"),
      (querySnapshot) => {
        const tasksList = []
        querySnapshot.forEach((doc) => {
          tasksList.push({ id: doc.id, ...doc.data() })
        })
        setTotalTasks(tasksList.length)
        setTasks(sortTasks(tasksList))
      },
      (error) => {
        console.error("Erro ao buscar tarefas:", error)
      },
    )
    // Tarefas A Fazer
    const q = query(collection(db, "tasks"), where("status", "==", "A fazer"))
    const unsubscribeActiveTasks = onSnapshot(
      q,
      (querySnapshot) => {
        const tasksList = []
        querySnapshot.forEach((doc) => {
          tasksList.push({ id: doc.id, ...doc.data() })
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
    )
    const unsubscribeCompletedTasks = onSnapshot(
      qCompleted,
      (querySnapshot) => {
        const completedTasksList = []
        querySnapshot.forEach((doc) => {
          completedTasksList.push({ id: doc.id, ...doc.data() })
        })
        setTotalTasksCompleted(completedTasksList.length)
        setCompletedTasks(sortTasks(completedTasksList))
      },
    )

    return () => {
      unsubscribeTasks()
      unsubscribeActiveTasks()
      unsubscribeCompletedTasks()
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

      <Flex mt={10}>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          Pendentes: {totalTasksActive}
        </Text>
      </Flex>
      <Flex
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
          />
        ))}
      </Flex>

      <Flex mt={10}>
        <Text>Concluídas: {totalTasksCompleted}</Text>
      </Flex>
      <Flex
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
          />
        ))}
      </Flex>
      <Flex mt={10}>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          Todas as tarefas: {totalTasks}
        </Text>
      </Flex>
      <Flex
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
          />
        ))}
      </Flex>
    </>
  )
}
