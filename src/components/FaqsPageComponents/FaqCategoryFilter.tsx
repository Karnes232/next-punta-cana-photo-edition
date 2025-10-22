"use client"
import React from "react"
import { FaqCategory } from "@/sanity/queries/Faqs/faqCategory"

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

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === null
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {locale === "en" ? "All Categories" : "Todas las Categorías"}
        </button>
        {faqCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryFilter(category.title[locale])}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.title[locale]
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
