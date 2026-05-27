"use client"
import { Flex, Spinner, Link } from "@chakra-ui/react"
import SimpleCard from "./components/SimpleCard/SimpleCard"
import { FiAlertTriangle } from "react-icons/fi"
import { CiSquareCheck } from "react-icons/ci"
import { FaRegCalendar } from "react-icons/fa6"
import { MdBalance } from "react-icons/md"
import { FaRegSquareCheck } from "react-icons/fa6"
import { useState, useEffect } from "react"
import { useStore } from "@/hooks/useStore"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot } from "firebase/firestore"

export default function ContainerSimpleCards({ linkTasks }) {
  const [activeTasksCount, setActiveTasksCount] = useState(null)
  const [tasksExpiringTodayCount, setTasksExpiringTodayCount] = useState(null)
  const { user } = useStore()

  // Tarefas ativas
  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "tasks"),
      where("status", "==", "A fazer"),
      where("companyId", "==", user.companyId),
    )

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setActiveTasksCount(querySnapshot.docs.length)
      },
      (error) => {
        console.error("Erro ao buscar tarefas ativas:", error)
      },
    )

    return () => unsubscribe()
  }, [user])

  // Vencendo hoje
  useEffect(() => {
    if (!user) return

    const today = new Date()
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
    )
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    )

    const q = query(
      collection(db, "tasks"),
      where("dueDate", ">=", startOfDay),
      where("dueDate", "<=", endOfDay),
      where("status", "==", "A fazer"),
      where("companyId", "==", user.companyId),
    )

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setTasksExpiringTodayCount(querySnapshot.docs.length)
      },
      (error) => {
        console.error("Erro ao buscar tarefas vencendo hoje:", error)
      },
    )

    return () => unsubscribe()
  }, [user])

  const chooseIcon = (type) => {
    switch (type) {
      case "tarefas abertas":
        return <FaRegSquareCheck />
      case "vencendo hoje":
        return <FiAlertTriangle />
      case "próximos 7 dias":
        return <FaRegCalendar />
      case "processos ativos":
        return <MdBalance />
      default:
        return null
    }
  }

  return (
    <Flex gap={5} justifyContent={"space-evenly"}>
      <SimpleCard
        title={"Tarefas abertas"}
        quantity={activeTasksCount !== null ? activeTasksCount : <Spinner />}
        icon={chooseIcon("tarefas abertas")}
        iconColor={{ base: "green.400", _dark: "green.100" }}
        bgIconColor={{ base: "green.100", _dark: "green.400" }}
        linkCard={"/dashboard/tasks"}
      />
      <SimpleCard
        title={"Vencendo hoje"}
        quantity={
          tasksExpiringTodayCount !== null ? (
            tasksExpiringTodayCount === 0 ? (
              0
            ) : (
              tasksExpiringTodayCount
            )
          ) : (
            <Spinner />
          )
        }
        icon={chooseIcon("vencendo hoje")}
        iconColor={{ base: "red.400", _dark: "red.100" }}
        bgIconColor={{ base: "red.100", _dark: "red.400" }}
        linkCard={"/dashboard/tasks"}
      />
      <SimpleCard
        title={"Próximos 7 dias"}
        quantity={"10"}
        icon={chooseIcon("próximos 7 dias")}
        iconColor={{ base: "blue.400", _dark: "blue.100" }}
        bgIconColor={{ base: "blue.100", _dark: "blue.400" }}
      />
      <SimpleCard
        title={"Processos Ativos"}
        quantity={"10"}
        icon={chooseIcon("processos ativos")}
        iconColor={{ base: "purple.400", _dark: "purple.100" }}
        bgIconColor={{ base: "purple.100", _dark: "purple.400" }}
      />
    </Flex>
  )
}
