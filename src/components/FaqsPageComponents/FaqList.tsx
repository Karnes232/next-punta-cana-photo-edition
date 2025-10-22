"use client"
import React from "react"
import FaqItem from "./FaqItem"

interface Faq {
  id: string
  question: string
  answer: string
}

interface FaqListProps {
  faqs: Faq[]
  openItems: Set<string>
  onToggleItem: (itemKey: string) => void
}

const FaqList: React.FC<FaqListProps> = ({ faqs, openItems, onToggleItem }) => {
  if (faqs.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {faqs.map(faq => (
        <FaqItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isOpen={openItems.has(faq.id)}
          onToggle={() => onToggleItem(faq.id)}
        />
      ))}
    </div>
  )
}

export default FaqList
