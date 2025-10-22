"use client"
import React from "react"
import { FaqCategory } from "@/sanity/queries/Faqs/faqCategory"
import { useTranslations } from "next-intl"

interface FaqCategoryFilterProps {
  faqCategories: FaqCategory[]
  selectedCategory: string | null
  onCategorySelect: (categoryTitle: string | null) => void
  locale: "en" | "es"
}

const FaqCategoryFilter: React.FC<FaqCategoryFilterProps> = ({
  faqCategories,
  selectedCategory,
  onCategorySelect,
  locale,
}) => {
  const handleCategoryFilter = (categoryTitle: string) => {
    if (selectedCategory === categoryTitle) {
      onCategorySelect(null) // Clear filter if same category is clicked
    } else {
      onCategorySelect(categoryTitle)
    }
  }
  const t = useTranslations("Faqs")
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === null
              ? "bg-luxuryGold text-pureWhite shadow-lg shadow-luxuryGold/25"
              : "bg-elegantSilver/20 text-darkGray hover:bg-luxuryGold/10 hover:text-luxuryGold"
          }`}
        >
          {t("allCategories")}
        </button>
        {faqCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryFilter(category.title[locale])}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.title[locale]
                ? "bg-luxuryGold text-pureWhite shadow-lg shadow-luxuryGold/25"
                : "bg-elegantSilver/20 text-darkGray hover:bg-luxuryGold/10 hover:text-luxuryGold"
            }`}
          >
            {category.title[locale]}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FaqCategoryFilter
