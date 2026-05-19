import { Flex, Text } from "@chakra-ui/react"
import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth";

import { useStore } from "@/hooks/useStore"
import { db } from "@/lib/firebase"
import CardTask from "./components/CardTask/CardTask"
import MenuTask from "./MenuTask"

export default function ContainerTasks() {
    const { user } = useStore()
    const [tasks, setTasks] = useState([])



    useEffect(() => {
        if (user) {
            getTasks()
        }
    }, [user])
    // const getTasks = async () => {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "tasks"))
    //         const tasksList = []
    //         querySnapshot.forEach((doc) => {
    //             tasksList.push({ id: doc.id, ...doc.data() })
    //         });
    //         setTasks(tasksList)
    //     } catch (error) {
    //         console.error("Erro ao buscar tarefas: ", error)
    //     }
    // }

    const getTasks = async () => {
        const auth = getAuth();

        console.log("Usuário no Zustand:", user);
        console.log("Usuário autenticado no Firebase:", auth.currentUser);

        try {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            const tasksList = []
            querySnapshot.forEach((doc) => {
                tasksList.push({ id: doc.id, ...doc.data() })
            });
            setTasks(tasksList)
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };
    return (

        <>
            {
                user ? null : <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <Text>Faça login para adicionar tarefas</Text>
                    <MenuTask />
                </Flex>
            }
            <Flex mt={10}><Text fontSize={"lg"} fontWeight={"bold"}>Tarefas abertas</Text></Flex>
            < Flex flexDir={"column"} justifyContent={"space-around"} w={"100%"} h={"100%"} >
                {
                    tasks.map((task) => (
                        <CardTask key={task.id} title={task.title} priority={task.priority} tags={task.tags} />
                    ))
                }

            </Flex >
        </>
    )
}