"use client"
import { Flex, Text, Icon, Link } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function SimpleCard({
  title,
  icon,
  quantity,
  iconColor,
  bgIconColor,
  linkCard,
}) {
  const router = useRouter()
  const hadleClick = (linkCard) => {
    router.push(linkCard)
  }
  return (
    <Flex
      onClick={() => hadleClick(linkCard)}
      flexDir="row"
      gap={5}
      shadow={"base"}
      rounded={"lg"}
      border={"1px solid"}
      borderColor={"gray.300"}
      w={"500px"}
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
          p={{ base: 0, md: 5 }}
          align={{ base: "center", md: "start" }}
          justify={"center"}
          w={{ base: "full", md: "auto" }}
          bg={{ base: bgIconColor, md: "none" }}
          _dark={{ bg: { base: bgIconColor, md: "none" } }}
        >
          <Text
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"

            textAlign={"center"}
            borderRadius={{ base: "none", lg: "lg" }}
            pt={{ base: 3, lg: 0 }}
            _dark={{ color: "gray.900" }}
          >
            {title}
          </Text>

          <Text fontSize={30} textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
            _dark={{ textShadow: "0px 0px 2px rgba(255, 255, 255, 1)" }}
          >
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
              {icon}
            </Icon>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
