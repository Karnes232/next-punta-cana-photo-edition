"use client"
import React from "react"
import { ChevronDown } from "lucide-react"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-elegantSilver/30 last:border-b-0">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-luxuryGold/5 transition-colors duration-200"
        onClick={onToggle}
      >
        <span
          className={`${coromantGaramond.className} text-xl font-medium text-darkGray pr-4`}
        >
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-caribbeanTurquoise transition-transform duration-200 ${
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
          <div
            className={`${montserrat.className} text-darkGray/80 leading-relaxed whitespace-pre-line`}
          >
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqItem
