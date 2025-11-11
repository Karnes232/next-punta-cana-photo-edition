"use client"
import { Montserrat } from "next/font/google"
import React from "react"

interface FaqEmptyStateProps {
  hasSearchTerm: boolean
  locale: "en" | "es"
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const FaqEmptyState: React.FC<FaqEmptyStateProps> = ({
  hasSearchTerm,
  locale,
}) => {
  return (
    <div className="text-center py-12">
      <p className={`${montserrat.className} text-elegantSilver text-lg`}>
        {hasSearchTerm
          ? locale === "en"
            ? "No FAQs found matching your search."
            : "No se encontraron preguntas frecuentes que coincidan con tu búsqueda."
          : locale === "en"
            ? "No FAQs available in the selected category."
            : "No hay preguntas frecuentes disponibles en la categoría seleccionada."}
      </p>
    </div>
  )
}

export default FaqEmptyState
