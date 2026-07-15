import { Flex, Text, Badge, Box, Grid } from "@chakra-ui/react"
import { formatCurrency } from "@/utils/format"

const statusColorMap = {
  em_andamento: "green",
  arquivado: "gray",
  suspenso: "yellow",
  encerrado: "red",
}

const poloColorMap = {
  ativo: "blue",
  passivo: "orange",
}

export default function ContentConfirmDelProcesse({
  processNumber,
  processType,
  tribunal,
  status,
  partes = [],
  tags = [],
  valorCausa,
}) {
  const statusColor = statusColorMap[status?.toLowerCase()] || "purple"

  return (
    <Flex flexDir="column" gap={4}>
      <Flex
        justify="space-between"
        align="center"
        pb={3}
        borderBottom="1px solid"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700" }}
      >
        <Box>
          <Text fontSize="xs" fontWeight="medium" color="gray.500" _dark={{ color: "gray.400" }}>
            Nº do processo
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {processNumber}
          </Text>
        </Box>
        <Badge
          variant="solid"
          colorPalette={statusColor}
          borderRadius="full"
          px={3}
          py={1}
          textTransform="capitalize"
        >
          {status}
        </Badge>
      </Flex>

      <Grid templateColumns="1fr 1fr" gap={3}>
        <Box>
          <Text fontSize="xs" fontWeight="medium" color="gray.500" _dark={{ color: "gray.400" }}>
            Tipo do processo
          </Text>
          <Text fontWeight="semibold">{processType}</Text>
        </Box>
        <Box>
          <Text fontSize="xs" fontWeight="medium" color="gray.500" _dark={{ color: "gray.400" }}>
            Tribunal
          </Text>
          <Text fontWeight="semibold">{tribunal}</Text>
        </Box>
      </Grid>

      <Box
        p={3}
        border="1px solid"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700", bg: "#1a1d27" }}
        bg="gray.50"
        borderRadius="lg"
      >
        <Text fontSize="xs" fontWeight="bold" color="gray.500" _dark={{ color: "gray.400" }} mb={2} textTransform="uppercase" letterSpacing="wide">
          Partes
        </Text>
        <Flex flexDir="column" gap={2}>
          {partes.map((parte, index) => (
            <Flex key={index} align="center" gap={2}>
              <Badge
                variant="subtle"
                colorPalette={poloColorMap[parte.polo?.toLowerCase()] || "purple"}
                borderRadius="md"
                fontSize="2xs"
                textTransform="capitalize"
                flexShrink={0}
              >
                {parte.polo}
              </Badge>
              <Text fontSize="sm" fontWeight="medium">
                {parte.nome}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>

      {tags.length > 0 && (
        <Flex align="center" gap={2} wrap="wrap">
          <Text fontSize="xs" fontWeight="medium" color="gray.500" _dark={{ color: "gray.400" }}>
            Tags:
          </Text>
          {tags.map((tag, index) => (
            <Badge key={index} variant="surface" colorPalette="green" borderRadius="full">
              {tag}
            </Badge>
          ))}
        </Flex>
      )}

      <Flex
        justify="space-between"
        align="center"
        pt={3}
        mt={1}
        borderTop="1px solid"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700" }}
      >
        <Text fontWeight="semibold" color="gray.600" _dark={{ color: "gray.300" }}>
          Valor da causa
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="#7c3aed">
          {formatCurrency(valorCausa)}
        </Text>
      </Flex>
    </Flex>
  )
}
