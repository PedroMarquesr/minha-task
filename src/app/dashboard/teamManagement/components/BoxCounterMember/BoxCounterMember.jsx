import { Flex, Text, Button } from "@chakra-ui/react"

export default function BoxCounterMember({ count, label }) {
  return (
    <Flex>
      <Flex>
        <Text>{count}</Text>
        <Text>{label}</Text>
      </Flex>
      
    </Flex>
  )
}
