"use client"

import React, { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import {
  Send,
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Heart,
  Users,
  MapPin,
  DollarSign,
  Clock,
  Package,
} from "lucide-react"
import { useSelectedPackage } from "@/contexts/SelectedPackageContext"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

interface FormData {
  name: string
  email: string
  telephone: string
  weddingDate: string
  guestCount: string
  venue: string
  budget: string
  message: string
  selectedPackageTitle: string
}

interface FormErrors {
  name?: string
  email?: string
  telephone?: string
  weddingDate?: string
  guestCount?: string
  venue?: string
  budget?: string
  message?: string
}

interface WeddingPlanningInquiryFormProps {
  locale: "en" | "es"
  formTitle: string
  formSubtitle?: string
  formSubmitText: string
}

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const WeddingPlanningInquiryForm = ({
  locale,
  formTitle,
  formSubtitle,
  formSubmitText,
}: WeddingPlanningInquiryFormProps) => {
  const t = useTranslations("WeddingPlanningForm")
  const { selectedPackageTitle } = useSelectedPackage()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    telephone: "",
    weddingDate: "",
    guestCount: "",
    venue: "",
    budget: "",
    message: "",
    selectedPackageTitle: selectedPackageTitle || "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle")

  // Update formData when selectedPackageTitle changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      selectedPackageTitle: selectedPackageTitle || "",
    }))
  }, [selectedPackageTitle])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t("requiredField")
    }

    if (!formData.email.trim()) {
      newErrors.email = t("requiredField")
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("invalidEmail")
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = t("requiredField")
    }

    if (!formData.weddingDate) {
      newErrors.weddingDate = t("requiredField")
    }

    if (!formData.guestCount.trim()) {
      newErrors.guestCount = t("requiredField")
    }

    if (!formData.venue.trim()) {
      newErrors.venue = t("requiredField")
    }

    if (!formData.budget.trim()) {
      newErrors.budget = t("requiredField")
    }

    if (!formData.message.trim()) {
      newErrors.message = t("requiredField")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("form-name", "wedding-planning-inquiry")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("telephone", formData.telephone)
      formDataToSend.append("weddingDate", formData.weddingDate)
      formDataToSend.append("guestCount", formData.guestCount)
      formDataToSend.append("venue", formData.venue)
      formDataToSend.append("budget", formData.budget)
      formDataToSend.append("message", formData.message)
      formDataToSend.append(
        "selectedPackageTitle",
        formData.selectedPackageTitle,
      )
      formDataToSend.append("locale", locale)

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formDataToSend as any),
      })

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          telephone: "",
          weddingDate: "",
          guestCount: "",
          venue: "",
          budget: "",
          message: "",
          selectedPackageTitle: selectedPackageTitle || "",
        })
      } else {
        throw new Error(
          `Form submission failed with status: ${response.status}`,
        )
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      id="wedding-planning-inquiry-form"
      className="w-full max-w-4xl mx-auto my-8 px-4"
    >
      <div className="bg-gradient-to-br from-pureWhite to-luxuryGold/5 rounded-2xl shadow-xl p-8 md:p-12 border border-luxuryGold/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h4
            className={`${coromantGaramond.className} text-3xl md:text-4xl font-bold text-darkGray mb-3`}
          >
            {formTitle}
          </h4>
          {formSubtitle && (
            <p className={`${montserrat.className} text-darkGray/70 text-lg`}>
              {formSubtitle}
            </p>
          )}
        </div>

        {/* Selected Package Display */}
        {selectedPackageTitle && (
          <div className="mb-6 p-4 bg-luxuryGold/10 border border-luxuryGold/30 rounded-lg flex items-start sm:items-center gap-3">
            <Package className="w-5 h-5 text-luxuryGold flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1 min-w-0">
              <p
                className={`${montserrat.className} text-sm font-semibold text-luxuryGold mb-1`}
              >
                {t("selectedPackage")}:
              </p>
              <p
                className={`${montserrat.className} text-darkGray font-medium break-words`}
              >
                {selectedPackageTitle}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className={`${montserrat.className} text-red-800`}>
              {t("errorMessage")}
            </p>
          </div>
        )}

        {submitStatus === "success" ? (
          <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className={`${montserrat.className} text-green-800`}>
              {t("successMessage")}
            </p>
          </div>
        ) : (
          <form
            name="wedding-planning-inquiry"
            method="POST"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden fields for Netlify */}
            <input
              type="hidden"
              name="form-name"
              value="wedding-planning-inquiry"
            />
            <input type="hidden" name="locale" value={locale} />

            {/* Honeypot field for spam protection */}
            <p style={{ display: "none" }}>
              <label>
                Don't fill this out if you're human:{" "}
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
              >
                <User className="w-4 h-4 text-darkGray" />
                {t("name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("namePlaceholder")}
                className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.name && (
                <p
                  className={`${montserrat.className} mt-1 text-sm text-red-600`}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email and Telephone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <Mail className="w-4 h-4 text-darkGray" />
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("emailPlaceholder")}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.email && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Telephone Field */}
              <div>
                <label
                  htmlFor="telephone"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <Phone className="w-4 h-4 text-darkGray" />
                  {t("telephone")}
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder={t("telephonePlaceholder")}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.telephone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.telephone && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.telephone}
                  </p>
                )}
              </div>
            </div>

            {/* Wedding Date and Guest Count Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wedding Date Field */}
              <div>
                <label
                  htmlFor="weddingDate"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <Heart className="w-4 h-4 text-luxuryGold" />
                  {t("weddingDate")}
                </label>
                <input
                  type="date"
                  id="weddingDate"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.weddingDate
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.weddingDate && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.weddingDate}
                  </p>
                )}
              </div>

              {/* Guest Count Field */}
              <div>
                <label
                  htmlFor="guestCount"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <Users className="w-4 h-4 text-darkGray" />
                  {t("guestCount")}
                </label>
                <select
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.guestCount
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectGuestCount")}</option>
                  <option value="1-25">1-25 {t("guests")}</option>
                  <option value="26-50">26-50 {t("guests")}</option>
                  <option value="51-100">51-100 {t("guests")}</option>
                  <option value="101-150">101-150 {t("guests")}</option>
                  <option value="151-200">151-200 {t("guests")}</option>
                  <option value="200+">200+ {t("guests")}</option>
                </select>
                {errors.guestCount && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.guestCount}
                  </p>
                )}
              </div>
            </div>

            {/* Venue and Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Venue Field */}
              <div>
                <label
                  htmlFor="venue"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <MapPin className="w-4 h-4 text-darkGray" />
                  {t("venue")}
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder={t("venuePlaceholder")}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.venue
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.venue && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.venue}
                  </p>
                )}
              </div>

              {/* Budget Field */}
              <div>
                <label
                  htmlFor="budget"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <DollarSign className="w-4 h-4 text-luxuryGold" />
                  {t("budget")}
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.budget
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectBudget")}</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
                {errors.budget && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.budget}
                  </p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
              >
                <MessageSquare className="w-4 h-4 text-darkGray" />
                {t("message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("messagePlaceholder")}
                rows={5}
                className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors resize-none`}
              />
              {errors.message && (
                <p
                  className={`${montserrat.className} mt-1 text-sm text-red-600`}
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${montserrat.className} w-full bg-gradient-to-r from-luxuryGold to-luxuryGold/80 hover:from-luxuryGold/90 hover:to-luxuryGold/70 disabled:from-elegantSilver disabled:to-elegantSilver/80 text-pureWhite font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-pureWhite border-t-transparent rounded-full animate-spin" />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {formSubmitText}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default WeddingPlanningInquiryForm
