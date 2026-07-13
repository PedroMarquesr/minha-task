import { Flex, Text, Badge, IconButton } from "@chakra-ui/react"
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaGavel,
  FaSearch,
  FaFileAlt,
  FaEllipsisH,
} from "react-icons/fa"
import { HiAnnotation } from "react-icons/hi"
import { MdNextPlan, MdDelete } from "react-icons/md"

import { Tooltip } from "@/components/ui/tooltip"

const statusColorMap = {
  agendado: "blue",
  realizado: "green",
  cancelado: "red",
  redesignacao: "orange",
}

const tipoConfig = {
  audiencia: { label: "Audiência", icon: FaGavel, color: "purple" },
  pericia: { label: "Perícia", icon: FaSearch, color: "teal" },
  despacho: { label: "Despacho", icon: FaFileAlt, color: "blue" },
  outro: { label: "Outro", icon: FaEllipsisH, color: "gray" },
}

const tipoBorderColor = {
  audiencia: "purple.400",
  pericia: "teal.400",
  despacho: "blue.400",
  outro: "gray.400",
}

const tipoBg = {
  audiencia: { light: "purple.50", dark: "purple.950" },
  pericia: { light: "teal.50", dark: "teal.950" },
  despacho: { light: "blue.50", dark: "blue.950" },
  outro: { light: "gray.50", dark: "gray.900" },
}

function formatDate(dateStr) {
  if (!dateStr) return null
  const [year, month, day] = dateStr.split("-")
  return `${day}/${month}/${year}`
}

function formatCurrency(value) {
  const num = parseFloat(value)
  if (isNaN(num)) return value
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function SectionLabel({ children }) {
  return (
    <Text
      fontSize="2xs"
      fontWeight="semibold"
      textTransform="uppercase"
      letterSpacing="wider"
      color="gray.400"
      _dark={{ color: "gray.500" }}
    >
      {children}
    </Text>
  )
}

export default function EventCard({ event }) {
  const {
    tipo,
    data,
    status,
    local,
    tipoAudiencia,
    testemunhas = [],
    camposCustomizaveis = [],
    custos = [],
  } = event

  const config = tipoConfig[tipo] ?? tipoConfig.outro
  const TipoIcon = config.icon
  const statusColor = statusColorMap[status] ?? "gray"
  const borderLeft = tipoBorderColor[tipo] ?? "gray.300"
  const bg = tipoBg[tipo] ?? tipoBg.outro

  return (
    <Flex
      flexDir="column"
      gap={3}
      p={3}
      borderRadius="md"
      border="1px solid"
      borderColor="gray.100"
      borderLeftWidth="3px"
      borderLeftColor={borderLeft}
      bg={bg.light}
      _dark={{ bg: bg.dark, borderColor: "gray.800" }}
      w="100%"
      transition="all 0.15s ease"
      _hover={{ borderColor: "gray.200", _dark: { borderColor: "gray.700" } }}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={2}>
          <Flex
            align="center"
            justify="center"
            w={6}
            h={6}
            borderRadius="full"
            bg={`${config.color}.100`}
            _dark={{ bg: `${config.color}.900` }}
            color={`${config.color}.600`}
            _dark_color={`${config.color}.300`}
            fontSize="xs"
          >
            <TipoIcon />
          </Flex>
          <Text
            fontWeight="semibold"
            fontSize="sm"
            color="gray.800"
            _dark={{ color: "gray.100" }}
          >
            {config.label}
          </Text>
        </Flex>
        {status && (
          <Badge
            colorPalette={statusColor}
            variant="subtle"
            fontSize="2xs"
            px={2}
            borderRadius="full"
            textTransform="capitalize"
          >
            {status}
          </Badge>
        )}
      </Flex>

      {(data || local) && (
        <Flex gap={4} flexWrap="wrap">
          {data && (
            <Flex
              align="center"
              gap={1}
              fontSize="xs"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              <FaCalendarAlt size={11} />
              <Text fontWeight="medium">{formatDate(data)}</Text>
            </Flex>
          )}
          {local && (
            <Flex
              align="center"
              gap={1}
              fontSize="xs"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              <FaMapMarkerAlt size={11} />
              <Text fontWeight="medium">{local}</Text>
            </Flex>
          )}
        </Flex>
      )}

      {tipoAudiencia && (
        <Flex flexDir="column" gap={1}>
          <SectionLabel>Tipo de audiência</SectionLabel>
          <Text
            fontSize="xs"
            fontWeight="medium"
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            {tipoAudiencia}
          </Text>
        </Flex>
      )}

      {(testemunhas.length > 0 ||
        camposCustomizaveis.length > 0 ||
        custos.length > 0) && (
        <Flex
          flexDir="column"
          gap={3}
          mt={1}
          pt={3}
          borderTop="1px dashed"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
        >
          {testemunhas.length > 0 && (
            <Flex flexDir="column" gap={1.5}>
              <Flex align="center" gap={1}>
                <SectionLabel>Testemunhas</SectionLabel>
                <Badge
                  colorPalette="purple"
                  variant="subtle"
                  fontSize="2xs"
                  borderRadius="full"
                >
                  {testemunhas.length}
                </Badge>
              </Flex>
              <Flex gap={2} flexWrap="wrap">
                {testemunhas.map((w) => (
                  <Flex
                    key={w.id}
                    align="center"
                    gap={1.5}
                    px={2.5}
                    py={1}
                    borderRadius="md"
                    bg="purple.50"
                    border="1px solid"
                    borderColor="purple.100"
                    _dark={{ bg: "purple.900", borderColor: "purple.800" }}
                    fontSize="xs"
                  >
                    <FaUsers
                      size={10}
                      color="var(--chakra-colors-purple-500)"
                    />
                    <Text
                      color="gray.800"
                      _dark={{ color: "gray.100" }}
                      fontWeight="medium"
                    >
                      {w.nome}
                    </Text>
                    {w.contato && (
                      <Text color="gray.500" _dark={{ color: "gray.400" }}>
                        · {w.contato}
                      </Text>
                    )}
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}

          {camposCustomizaveis.length > 0 && (
            <Flex flexDir="column" gap={1.5}>
              <SectionLabel>Campos adicionais</SectionLabel>
              <Flex gap={2} flexWrap="wrap">
                {camposCustomizaveis.map((field) => {
                  let valorDisplay = field.valor
                  if (field.tipo === "check")
                    valorDisplay = field.valor ? "Sim" : "Não"
                  if (field.tipo === "lista" && Array.isArray(field.valor))
                    valorDisplay = field.valor.map((v) => v.texto).join(", ")

                  return (
                    <Flex
                      key={field.id}
                      fontSize="xs"
                      bg="white"
                      _dark={{ bg: "gray.800" }}
                      px={2.5}
                      py={1}
                      borderRadius="md"
                      border="1px solid"
                      borderColor="gray.200"
                      _dark_borderColor="gray.700"
                      gap={1.5}
                      align="center"
                    >
                      <Text color="gray.500" _dark={{ color: "gray.400" }}>
                        {field.label}:
                      </Text>
                      <Text
                        fontWeight="semibold"
                        color="gray.800"
                        _dark={{ color: "gray.200" }}
                      >
                        {valorDisplay ?? "—"}
                      </Text>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          )}

          {custos.length > 0 && (
            <Flex flexDir="column" gap={1.5}>
              <Flex align="center" gap={2}>
                <SectionLabel>Custos</SectionLabel>
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  color="orange.600"
                  _dark={{ color: "orange.400" }}
                >
                  Total:{" "}
                  {formatCurrency(
                    custos.reduce(
                      (acc, c) => acc + (parseFloat(c.valor) || 0),
                      0,
                    ),
                  )}
                </Text>
              </Flex>
              <Flex gap={2} flexWrap="wrap">
                {custos.map((cost) => (
                  <Flex
                    key={cost.id}
                    fontSize="xs"
                    bg="orange.50"
                    _dark={{ bg: "orange.950" }}
                    border="1px solid"
                    borderColor="orange.200"
                    _dark_borderColor="orange.800"
                    px={2.5}
                    py={1.5}
                    borderRadius="md"
                    gap={2}
                    align="center"
                  >
                    <FaDollarSign
                      size={11}
                      color="var(--chakra-colors-orange-500)"
                    />
                    <Flex flexDir="column">
                      <Text
                        fontWeight="medium"
                        color="gray.800"
                        _dark={{ color: "gray.200" }}
                      >
                        {cost.descricao || cost.tipo || "Custo"}
                      </Text>
                    </Flex>
                    <Text
                      color="orange.700"
                      _dark={{ color: "orange.300" }}
                      fontWeight="bold"
                    >
                      {formatCurrency(cost.valor)}
                    </Text>
                    {cost.data && (
                      <Text color="gray.500" fontSize="2xs">
                        · {formatDate(cost.data)}
                      </Text>
                    )}
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      )}
      <Flex justify="flex-start" align="center">
        <Tooltip content="Adicionar anotação" placement="top">
          <IconButton
            variant="ghost"
            cursor="pointer"
            p={0}
            minW="auto"
            h="auto"
            _hover={{ bg: "transparent", opacity: 0.8 }}
            color="purple.500"
            _dark={{ color: "purple.300" }}
          >
            <HiAnnotation size={12} />
          </IconButton>
        </Tooltip>
        <Tooltip content="Atualizar status do Evento" placement="top">
          <IconButton
            variant="ghost"
            cursor="pointer"
            p={0}
            minW="auto"
            h="auto"
            _hover={{ bg: "transparent", opacity: 0.8 }}
            color="blue.500"
            _dark={{ color: "blue.300" }}
          >
            <MdNextPlan size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip content="Deletar Evento" placement="top">
          <IconButton
            variant="ghost"
            cursor="pointer"
            p={0}
            minW="auto"
            h="auto"
            _hover={{ bg: "transparent", opacity: 0.8 }}
            color="red.500"
            _dark={{ color: "red.300" }}
          >
            <MdDelete size={20} />
          </IconButton>
        </Tooltip>
      </Flex>
    </Flex>
  )
}
