"use client"

import { Flex, Text } from "@chakra-ui/react"
import TaskItem from "./TaskItem"

export default function TaskModel({ task }) {
  return (
    <Flex flexDir="column">
      <TaskItem
        taskTitle={"Petição inicial — Ação de indenização"}
        status="concluido"
        textDate="17/11/2026"
      />
      <TaskItem
        taskTitle={"Audiência de conciliação — Vara de Família"}
        status="pendente"
        textDate="25/05/2026"
      />
      <TaskItem
        taskTitle={"Prazo para contestação — Processo trabalhista"}
        status="pendente"
        textDate="20/05/2026"
      />
      <TaskItem
        taskTitle={"Recurso de apelação — TJSP"}
        status="pendente"
        textDate="15/05/2026"
      />
      <TaskItem
        taskTitle={"Manifestação sobre laudo pericial — Processo cível"}
        status="andamento"
        textDate="10/05/2026"
      />
    </Flex>
  )
}
