"use client"
import { Flex, Text, Icon } from "@chakra-ui/react"

export default function SimpleCard({
  title,
  icon,
  quantity,
  iconColor,
  bgIconColor,
}) {
  return (
    <Flex
      flexDir="row"
      gap={5}
      shadow={"base"}
      rounded={"lg"}
      border={"1px solid"}
      borderColor={"gray.300"}
      w={"500px"}
      position="relative"
      overflow="hidden"
    >
      <Flex flexDir="row" justifyContent={"space-between"} w={"full"} gap={3}>
        <Flex flexDir="column" p={3}>
          <Text>{title}</Text>
          <Text fontSize={30}>{quantity}</Text>
        </Flex>

        <Flex
          justifyContent={"flex-end"}
          align={"center"}
          bg={bgIconColor}
          h={"100%"}
        >
          <Flex
            w={"100%"}
            justifyContent={"center"}
            align={"center"}
            px={7}
            borderLeftRadius={"lg"}
          >
            <Icon fontSize={"4xl"} color={iconColor}>
              {icon}
            </Icon>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
