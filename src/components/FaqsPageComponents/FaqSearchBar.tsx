"use client"
import React from "react"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

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
  const t = useTranslations("Faqs")
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-elegantSilver" />
        <input
          type="text"
          placeholder={t("searchFaqs")}
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-elegantSilver/50 rounded-lg focus:ring-2 focus:ring-luxuryGold/50 focus:border-luxuryGold outline-none transition-all duration-200 bg-pureWhite"
        />
      </div>
    </div>
  )
}

export default FaqSearchBar
