import { Flex, Text, Badge } from "@chakra-ui/react"
import { formatCurrency } from "@/utils/format"
export default function ContentConfirmDelProcesse({
  processNumber,
  processType,
  tribunal,
  status,
  partes = [],
  tags = [],
  valorCausa,
}) {
  return (
    <Flex flexDir="column" gap={2}>
      <Flex>
        <Text fontWeight={"semibold"}>Número do processo: </Text>
        <Text>{processNumber}</Text>
      </Flex>
      <Flex>
        <Text fontWeight={"semibold"}>Tipo do processo: </Text>
        <Text>{processType}</Text>
      </Flex>
      <Flex>
        <Text fontWeight={"semibold"}>Tribunal: </Text>
        <Text>{tribunal}</Text>
      </Flex>
      <Flex>
        <Text fontWeight={"semibold"}>Status: </Text>
        <Text>{status}</Text>
      </Flex>
      <Flex
        flexDir="column"
        p={1}
        gap={2}
        border={"1px solid "}
        borderColor="gray.400"
        _dark={{ borderColor: "gray.500" }}
        borderRadius={"lg"}
      >
        <Flex>
          <Text fontWeight={"semibold"}>Partes </Text>
        </Flex>
        <Flex flexDir="column">
          {partes?.map((parte, index) => (
            <Flex
              key={index}
              gap={2}
              borderBottom={"1px solid "}
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
              pb={2}
              w={"70%"}
            >
              <Text fontWeight={"semibold"}>{parte.polo}:</Text>
              <Text>{parte.nome}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex>
        <Text fontWeight={"semibold"}>Tags: </Text>
        {tags.map((tag, index) => (
          <Badge key={index} variant="solid" colorPalette={"green"}>
            {tag}
          </Badge>
        ))}
      </Flex>
      <Flex>
        <Text fontWeight={"semibold"}>Valor da causa: </Text>
        <Text>{formatCurrency(valorCausa)}</Text>
      </Flex>
    </Flex>
  )
}
