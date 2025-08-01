import { useCallback } from "react"

export function useCurrency(locale = "es-AR", currency = "ARS") {
  const formatCurrency = useCallback(
    (value) => {
      if (typeof value !== "number") return ""
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(value)
    },
    [locale, currency]
  )

  return { formatCurrency }
}