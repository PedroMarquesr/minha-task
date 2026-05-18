"use client"

import { Flex, Text, Icon } from "@chakra-ui/react"
import { FaRegCheckCircle } from "react-icons/fa"
import { IoBriefcaseOutline } from "react-icons/io5"
import { FaCalendarTimes } from "react-icons/fa"

export default function MetricBox({ status, statusText, quantity }) {
  const getIconProps = (status) => {
    switch (status) {
      case "concluido":
        return { as: FaRegCheckCircle, color: "green.500" }
      case "andamento":
        return { as: IoBriefcaseOutline, color: "yellow.500" }
      case "atrasado":
        return { as: FaCalendarTimes, color: "red.500" }
      default:
        return { as: FaRegCheckCircle, color: "gray.500" }
    }
  }

  const iconProps = getIconProps(status)

  return (
    <Flex
      flexDir={"column"}
      gap={2}
      p={50}
      alignItems="center"
      flex={1}
      shadow={"xl"}
      justifyContent="center"
      border={"1px solid"}
      borderColor={"blue.200"}
      borderRadius={10}
      bgColor={"gray.150"}
      _dark={{
        borderColor: "gray.400",
        bg: "gray.700",
      }}
    >
      <Icon as={iconProps.as} color={iconProps.color} fontSize="4xl" />
      <Text fontSize={"4xl"} fontWeight="bold">
        {quantity}
      </Text>
      <Text fontFamily={"fangsong"} fontWeight="bold" color={iconProps.color}>
        {statusText}
      </Text>
    </Flex>
  )
}
