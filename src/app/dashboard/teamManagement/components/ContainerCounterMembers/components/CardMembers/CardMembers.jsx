"use client"

import { Flex, Text, Icon } from "@chakra-ui/react"
import { FaUserPlus } from "react-icons/fa6"

export default function CardMembers({
  hadleClick,
  bgIconColor,
  iconColor,
  title,
  quantity,
  icon,
}) {
  return (
    <Flex
      flexDir="row"
      gap={5}
      shadow={"base"}
      rounded={"lg"}
      border={"1px solid"}
      borderColor={"gray.300"}
      w={"30vw"}
      position="relative"
      overflow="hidden"
      _hover={{
        shadow: "lg",
        borderColor: "purple.400",
        transform: "translateY(-2px)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <Flex flexDir="row" justifyContent={"space-between"} w={"full"} gap={3}>
        <Flex
          flexDir="column"
          p={{ base: 0, md: 3 }}
          align={{ base: "center", md: "start" }}
        >
          <Text
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
            textAlign={"center"}
            borderRadius={{ base: "none", md: "lg" }}
            pt={{ base: 3, md: 0 }}
          >
            {title}
          </Text>

          <Text fontSize={30} textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)">
            {quantity}
          </Text>
        </Flex>

        <Flex
          justifyContent={"flex-end"}
          align={"center"}
          bg={bgIconColor}
          h={"100%"}
          display={{ base: "none", md: "flex" }}
        >
          <Flex
            w={"100%"}
            justifyContent={"center"}
            align={"center"}
            px={7}
            borderLeftRadius={"lg"}
          >
            <Icon fontSize={"4xl"} color={iconColor}>
              {icon}{" "}
            </Icon>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
