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
    <div className="bg-pureWhite rounded-lg shadow-lg border border-elegantSilver/30 overflow-hidden">
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
