"use client"
import { FaqCategory } from "@/sanity/queries/Faqs/faqCategory"
import React, { useState } from "react"
import FaqSearchBar from "./FaqSearchBar"
import FaqCategoryFilter from "./FaqCategoryFilter"
import FaqList from "./FaqList"
import FaqEmptyState from "./FaqEmptyState"

const FaqPageComponent = ({
  faqCategories,
  locale,
}: {
  faqCategories: FaqCategory[] | null
  locale: "en" | "es"
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  if (!faqCategories || faqCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-elegantSilver text-lg">
          No FAQs available at the moment.
        </p>
      </div>
    )
  }

  const toggleItem = (itemKey: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(itemKey)) {
      newOpenItems.delete(itemKey)
    } else {
      newOpenItems.add(itemKey)
    }
    setOpenItems(newOpenItems)
  }

  const filteredCategories = selectedCategory
    ? faqCategories.filter(
        category => category.title[locale] === selectedCategory,
      )
    : faqCategories

  // Flatten all FAQs into a single array
  const allFaqs = filteredCategories.flatMap(category =>
    category.faqs
      .filter(faq => {
        if (!searchTerm) return true
        const question = faq.question[locale].toLowerCase()
        const answer = faq.answer[locale].toLowerCase()
        const search = searchTerm.toLowerCase()
        return question.includes(search) || answer.includes(search)
      })
      .map((faq, index) => ({
        ...faq,
        id: `${category.title[locale]}-${index}`,
        question: faq.question[locale],
        answer: faq.answer[locale],
      })),
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FaqSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        locale={locale}
      />

      <FaqCategoryFilter
        faqCategories={faqCategories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        locale={locale}
      />

      {allFaqs.length > 0 ? (
        <FaqList
          faqs={allFaqs}
          openItems={openItems}
          onToggleItem={toggleItem}
        />
      ) : (
        <FaqEmptyState hasSearchTerm={!!searchTerm} locale={locale} />
      )}
    </div>
  )
}

export default FaqPageComponent
