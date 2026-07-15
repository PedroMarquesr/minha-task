import { Flex, Text, Box, Badge } from "@chakra-ui/react"
import { FaGavel, FaSearch, FaFileAlt, FaEllipsisH } from "react-icons/fa"

const tipoConfig = {
    audiencia: { label: "Audiência", color: "#7c3aed" },
    pericia: { label: "Perícia", color: "#0d9488" },
    despacho: { label: "Despacho", color: "#3b82f6" },
    outro: { label: "Outro", color: "#6b7280" },
}

function formatDate(dateStr) {
    if (!dateStr) return null
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
}

export default function ContentConfirmDelEvent({
    tipo,
    data,
    status,
    local,
    tipoAudiencia,
    testemunhas = [],
    custos = [],
    userCreator,
    processNumber,
}) {
    const config = tipoConfig[tipo?.toLowerCase()] || tipoConfig.outro

    return (
        <Flex flexDir="column" gap={5}>
            <Flex
                justify="space-between"
                align="flex-start"
                pb={4}
                borderBottom="1px solid"
                borderColor="gray.300"
                _dark={{ borderColor: "gray.700" }}
            >
                <Box>
                    <Text
                        fontSize="2xs"
                        fontWeight="semibold"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        mb={1}
                    >
                        Evento
                    </Text>
                    <Text fontSize="lg" fontWeight="semibold">
                        {config.label}
                    </Text>
                </Box>
                <Flex align="center" gap={2} mt={1}>
                    <Box w="6px" h="6px" borderRadius="full" bg={config.color} flexShrink={0} />
                    <Text
                        fontSize="sm"
                        fontWeight="medium"
                        textTransform="capitalize"
                        color="gray.700"
                        _dark={{ color: "gray.300" }}
                    >
                        {status || "Sem status"}
                    </Text>
                </Flex>
            </Flex>

            {processNumber && (
                <Box>
                    <Text
                        fontSize="2xs"
                        fontWeight="semibold"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        mb={1}
                    >
                        Processo vinculado
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" fontFamily="mono" letterSpacing="tight">
                        {processNumber}
                    </Text>
                </Box>
            )}

            {/* Data e local */}
            <Flex gap={4}>
                <Box flex={1}>
                    <Text
                        fontSize="2xs"
                        fontWeight="semibold"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        mb={1}
                    >
                        Data
                    </Text>
                    <Text fontSize="sm" fontWeight="medium">
                        {formatDate(data) || "Não informado"}
                    </Text>
                </Box>
                <Box flex={1}>
                    <Text
                        fontSize="2xs"
                        fontWeight="semibold"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        mb={1}
                    >
                        Local
                    </Text>
                    <Text fontSize="sm" fontWeight="medium">
                        {local || "Não informado"}
                    </Text>
                </Box>
            </Flex>

            {/* Tipo de audiência, se houver */}
            {tipoAudiencia && (
                <Box>
                    <Text
                        fontSize="2xs"
                        fontWeight="semibold"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        mb={1}
                    >
                        Tipo de audiência
                    </Text>
                    <Text fontSize="sm" fontWeight="medium">
                        {tipoAudiencia}
                    </Text>
                </Box>
            )}

            {/* Testemunhas e custos vinculados, se houver */}
            {(testemunhas.length > 0 || custos.length > 0) && (
                <Flex gap={4}>
                    {testemunhas.length > 0 && (
                        <Flex align="center" gap={2}>
                            <Text
                                fontSize="2xs"
                                fontWeight="semibold"
                                color="gray.500"
                                textTransform="uppercase"
                                letterSpacing="widest"
                            >
                                Testemunhas
                            </Text>
                            <Badge variant="outline" fontSize="2xs" borderRadius="full">
                                {testemunhas.length}
                            </Badge>
                        </Flex>
                    )}
                    {custos.length > 0 && (
                        <Flex align="center" gap={2}>
                            <Text
                                fontSize="2xs"
                                fontWeight="semibold"
                                color="gray.500"
                                textTransform="uppercase"
                                letterSpacing="widest"
                            >
                                Custos vinculados
                            </Text>
                            <Badge variant="outline" fontSize="2xs" borderRadius="full">
                                {custos.length}
                            </Badge>
                        </Flex>
                    )}
                </Flex>
            )}

            {/* Criado por */}
            {userCreator && (
                <Flex
                    justify="space-between"
                    align="baseline"
                    pt={4}
                    borderTop="1px solid"
                    borderColor="gray.300"
                    _dark={{ borderColor: "gray.700" }}
                >
                    <Text
                        fontSize="xs"
                        fontWeight="semibold"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="widest"
                    >
                        Criado por
                    </Text>
                    <Text fontSize="sm" fontWeight="medium">
                        {userCreator}
                    </Text>
                </Flex>
            )}
        </Flex>
    )
}