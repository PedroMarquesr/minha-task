/**
 * Converte um Timestamp do Firestore (vivo ou serializado) ou Date em objeto Date
 */
export function toDate(timestamp) {
  if (!timestamp) return null

  if (typeof timestamp?.toDate === "function") {
    return timestamp.toDate()
  }

  if (timestamp?.seconds !== undefined) {
    return new Date(timestamp.seconds * 1000)
  }

  return new Date(timestamp)
}

/**
 * Formata apenas a data, em pt-BR (ex: "16/07/2026")
 */
export function formatDate(timestamp, options = {}) {
  const date = toDate(timestamp)
  if (!date) return "-"

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).format(date)
}

/**
 * Formata data + hora, em pt-BR (ex: "16/07/2026 às 09:41")
 */
export function formatDateTime(timestamp) {
  const date = toDate(timestamp)
  if (!date) return "salvando..."

  return `${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString(
    "pt-BR",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  )}`
}

/**
 * Formata valores monetários em BRL (Real brasileiro)
 * ex: formatCurrency(1500) → "R$ 1.500,00"
 * ex: formatCurrency(undefined) → "R$ 0,00"
 */
export function formatCurrency(value) {
  const num = Number(value) || 0
  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
