import { Flex, Text } from "@chakra-ui/react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth";

import { useStore } from "@/hooks/useStore"
import { db } from "@/lib/firebase"
import CardTask from "./components/CardTask/CardTask"
import MenuTask from "./MenuTask"

export default function ContainerTasks() {
    const { user } = useStore()
    const [tasks, setTasks] = useState([])
    const [tasksActive, setTasksActive] = useState([])



    useEffect(() => {
        if (!user) return;

        const auth = getAuth();
        console.log("Usuário no Zustand:", user);
        console.log("Usuário autenticado no Firebase:", auth.currentUser);

        const unsubscribeTasks = onSnapshot(collection(db, "tasks"), (querySnapshot) => {
            const tasksList = []
            querySnapshot.forEach((doc) => {
                tasksList.push({ id: doc.id, ...doc.data() })
            });
            setTasks(tasksList)
        }, (error) => {
            console.error("Erro ao buscar tarefas:", error);
        });

        const q = query(collection(db, "tasks"), where("status", "==", "A fazer"))
        const unsubscribeActiveTasks = onSnapshot(q, (querySnapshot) => {
            const tasksList = []
            querySnapshot.forEach((doc) => {
                tasksList.push({ id: doc.id, ...doc.data() })
            })
            setTasksActive(tasksList)
        }, (error) => {
            console.error("Erro ao buscar tarefas ativas:", error)
        });

        return () => {
            unsubscribeTasks();
            unsubscribeActiveTasks();
        };
    }, [user])
    return (

        <>
            {
                user ? null : <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <Text>Faça login para adicionar tarefas</Text>
                    <MenuTask />
                </Flex>
            }
            <Flex mt={10}><Text fontSize={"lg"} fontWeight={"bold"}>Todas as tarefas</Text></Flex>
            < Flex flexDir={"column"} justifyContent={"space-around"} w={"100%"} h={"100%"} >
                {
                    tasks.map((task) => (
                        <CardTask key={task.id} title={task.title} priority={task.priority} tags={task.tags} />
                    ))
                }

            </Flex >

            <Flex mt={10}><Text fontSize={"lg"} fontWeight={"bold"}>Tarefas ativas</Text></Flex>
            < Flex flexDir={"column"} justifyContent={"space-around"} w={"100%"} h={"100%"} >
                {
                    tasksActive.map((task) => (
                        <CardTask key={task.id} title={task.title} priority={task.priority} tags={task.tags} />
                    ))
                }

            </Flex >
        </>
    )
}