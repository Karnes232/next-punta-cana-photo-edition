"use client"

import React, { useState } from "react"
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaTimes,
} from "react-icons/fa"
import ContactForm from "../Forms/ContactForm"
import { useTranslations } from "next-intl"

interface FloatingCtaButtonProps {
  telephone: string
  email?: string
  locale: "en" | "es"
}

const FloatingCtaButton = ({
  telephone,
  email,
  locale,
}: FloatingCtaButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations("ContactForm")

  // Show button after 2 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const ctaOptions = [
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?phone=${telephone}`,
      color: "bg-[#25D366]",
      hoverColor: "hover:bg-[#128C7E]",
      external: true,
    },
    {
      id: "phone",
      icon: FaPhone,
      label: "Call",
      href: `tel:${telephone}`,
      color: "bg-luxuryGold",
      hoverColor: "hover:bg-yellow-600",
      external: true,
    },
    {
      id: "email",
      icon: FaEnvelope,
      label: "Email",
      href: email ? `mailto:${email}` : "#",
      color: "bg-caribbeanTurquoise",
      hoverColor: "hover:bg-teal-600",
      external: true,
      disabled: !email,
    },
    {
      id: "contact-form",
      icon: FaCommentDots,
      label: "Quick Quote",
      color: "bg-darkGray",
      hoverColor: "hover:bg-gray-800",
      action: () => setShowContactForm(true),
      external: false,
    },
  ]

  const handleCtaClick = (option: (typeof ctaOptions)[0]) => {
    if (option.action) {
      setIsOpen(false)
      option.action()
    } else if (option.external && option.href) {
      // For phone and email, use window.location for better UX
      if (option.id === "phone" || option.id === "email") {
        window.location.href = option.href
      } else {
        // For other links like WhatsApp, open in new tab
        window.open(option.href, "_blank", "noopener,noreferrer")
      }
    }
  }

  return (
    <>
      <div
        className={`fixed z-[9999] bottom-6 right-6 xl:right-10 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Main CTA Button */}
        <div className="relative">
          {/* Expanded Options */}
          {isOpen && (
            <div className="absolute bottom-16 right-0 mb-2 space-y-2">
              {ctaOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 ${option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} transform transition-all duration-300 ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="text-sm font-medium text-white bg-darkGray px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                    {option.label}
                  </span>
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (!option.disabled) {
                        handleCtaClick(option)
                      }
                    }}
                    className={`flex justify-center items-center rounded-full h-12 w-12 ${option.color} ${option.hoverColor} text-white shadow-lg transition-all duration-200 ${
                      option.disabled
                        ? "cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-105"
                    }`}
                    disabled={option.disabled}
                    aria-label={option.label}
                  >
                    <option.icon size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex justify-center items-center rounded-full h-14 w-14 bg-caribbeanTurquoise text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
            aria-label={isOpen ? "Close CTA options" : "Open CTA options"}
          >
            {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center md:p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close contact form"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="p-6">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingCtaButton
