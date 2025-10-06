"use client"
import { FaqComponent } from "@/sanity/queries/Photoshoot/Photoshoot"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const Faqs = ({
  faqs,
  locale,
}: {
  faqs: FaqComponent[]
  locale: "en" | "es"
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="lg:mx-10 xl:mx-auto xl:w-full max-w-5xl my-10">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-pureWhite"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-4 text-left bg-pureWhite hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-luxuryGold focus:ring-inset"
            >
              <h3 className="text-lg font-medium text-darkGray pr-4">
                {faq.title[locale]}
              </h3>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-luxuryGold" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-elegantSilver/20">
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      className="text-gray-700 leading-relaxed"
                    >
                      {faq.content[locale]}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faqs
