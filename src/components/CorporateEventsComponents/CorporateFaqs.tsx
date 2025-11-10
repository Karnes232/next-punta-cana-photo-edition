"use client"

import React, { useEffect, useMemo, useState } from "react"
import FaqItem from "@/components/FaqsPageComponents/FaqItem"
import { CategorizedFaqs } from "@/sanity/queries/Faqs/faqCategory"

interface CorporateFaqsProps {
  faqs: CategorizedFaqs[]
  locale: "en" | "es"
}

interface LocalizedFaq {
  id: string
  question: string
  answer: string
}

const CorporateFaqs: React.FC<CorporateFaqsProps> = ({ faqs, locale }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const localizedFaqs: LocalizedFaq[] = useMemo(() => {
    return faqs.map((faq, index) => ({
      id: `corporate-faq-${index}`,
      question: faq.question?.[locale] ?? "",
      answer: faq.answer?.[locale] ?? "",
    }))
  }, [faqs, locale])

  useEffect(() => {
    setOpenItems(new Set())
  }, [localizedFaqs])

  if (localizedFaqs.length === 0) {
    return null
  }

  const toggleItem = (itemKey: string) => {
    setOpenItems(prevOpenItems => {
      const nextOpenItems = new Set(prevOpenItems)
      if (nextOpenItems.has(itemKey)) {
        nextOpenItems.delete(itemKey)
      } else {
        nextOpenItems.add(itemKey)
      }
      return nextOpenItems
    })
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-pureWhite rounded-lg shadow-lg border border-elegantSilver/30 overflow-hidden">
        {localizedFaqs.map(faq => (
          <FaqItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openItems.has(faq.id)}
            onToggle={() => toggleItem(faq.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default CorporateFaqs