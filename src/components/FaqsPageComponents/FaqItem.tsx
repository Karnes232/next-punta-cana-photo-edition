"use client"
import React from "react"
import { ChevronDown } from "lucide-react"

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
        onClick={onToggle}
      >
        <span className="text-lg font-medium text-gray-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqItem
