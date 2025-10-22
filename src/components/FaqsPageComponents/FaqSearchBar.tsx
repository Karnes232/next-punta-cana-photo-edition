"use client"
import React from "react"
import { Search } from "lucide-react"

interface FaqSearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  locale: "en" | "es"
}

const FaqSearchBar: React.FC<FaqSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  locale,
}) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={
            locale === "en"
              ? "Search FAQs..."
              : "Buscar preguntas frecuentes..."
          }
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        />
      </div>
    </div>
  )
}

export default FaqSearchBar
