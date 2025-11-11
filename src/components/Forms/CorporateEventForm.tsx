"use client"

import React, { useState } from "react"
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
  Building,
  Users,
  DollarSign,
  Clock,
  MapPin,
} from "lucide-react"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface FormData {
  name: string
  email: string
  telephone: string
  company: string
  eventDate: string
  eventType: string
  guestCount: string
  budget: string
  venue: string
  duration: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  telephone?: string
  company?: string
  eventDate?: string
  eventType?: string
  guestCount?: string
  budget?: string
  venue?: string
  duration?: string
  message?: string
}

interface CorporateEventFormProps {
  locale: "en" | "es"
}

const CorporateEventForm = ({ locale }: CorporateEventFormProps) => {
  const t = useTranslations("CorporateEventForm")

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    telephone: "",
    company: "",
    eventDate: "",
    eventType: "",
    guestCount: "",
    budget: "",
    venue: "",
    duration: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle")

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

    if (!formData.company.trim()) {
      newErrors.company = t("requiredField")
    }

    if (!formData.eventDate) {
      newErrors.eventDate = t("requiredField")
    }

    if (!formData.eventType) {
      newErrors.eventType = t("requiredField")
    }

    if (!formData.guestCount) {
      newErrors.guestCount = t("requiredField")
    }

    if (!formData.budget) {
      newErrors.budget = t("requiredField")
    }

    if (!formData.venue.trim()) {
      newErrors.venue = t("requiredField")
    }

    if (!formData.duration) {
      newErrors.duration = t("requiredField")
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
      formDataToSend.append("form-name", "corporate-event-inquiry")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("telephone", formData.telephone)
      formDataToSend.append("company", formData.company)
      formDataToSend.append("eventDate", formData.eventDate)
      formDataToSend.append("eventType", formData.eventType)
      formDataToSend.append("guestCount", formData.guestCount)
      formDataToSend.append("budget", formData.budget)
      formDataToSend.append("venue", formData.venue)
      formDataToSend.append("duration", formData.duration)
      formDataToSend.append("message", formData.message)
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
          company: "",
          eventDate: "",
          eventType: "",
          guestCount: "",
          budget: "",
          venue: "",
          duration: "",
          message: "",
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
      id="corporate-event-inquiry-form"
      className="w-full max-w-4xl mx-auto my-8 px-4"
    >
      <div className="bg-gradient-to-br from-pureWhite to-caribbeanTurquoise/5 rounded-2xl shadow-xl p-8 md:p-12 border border-caribbeanTurquoise/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className={`${coromantGaramond.className} text-3xl md:text-4xl font-bold text-darkGray mb-3`}
          >
            {t("title")}
          </h2>
          <p className={`${montserrat.className} text-darkGray/70 text-lg`}>
            {t("subtitle")}
          </p>
        </div>

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
            name="corporate-event-inquiry"
            method="POST"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className={`${montserrat.className} space-y-6`}
          >
            {/* Hidden fields for Netlify */}
            <input
              type="hidden"
              name="form-name"
              value="corporate-event-inquiry"
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
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
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
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
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
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
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

            {/* Company Field */}
            <div>
              <label
                htmlFor="company"
                className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
              >
                <Building className="w-4 h-4 text-darkGray" />
                {t("company")}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t("companyPlaceholder")}
                className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                  errors.company
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.company && (
                <p
                  className={`${montserrat.className} mt-1 text-sm text-red-600`}
                >
                  {errors.company}
                </p>
              )}
            </div>

            {/* Event Date and Event Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Date Field */}
              <div>
                <label
                  htmlFor="eventDate"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <Calendar className="w-4 h-4 text-caribbeanTurquoise" />
                  {t("eventDate")}
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.eventDate
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.eventDate && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.eventDate}
                  </p>
                )}
              </div>

              {/* Event Type Field */}
              <div>
                <label
                  htmlFor="eventType"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <Building className="w-4 h-4 text-darkGray" />
                  {t("eventType")}
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.eventType
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectEventType")}</option>
                  <option value="conference">{t("conference")}</option>
                  <option value="seminar">{t("seminar")}</option>
                  <option value="workshop">{t("workshop")}</option>
                  <option value="product-launch">{t("productLaunch")}</option>
                  <option value="team-building">{t("teamBuilding")}</option>
                  <option value="gala">{t("gala")}</option>
                  <option value="awards-ceremony">{t("awardsCeremony")}</option>
                  <option value="other">{t("other")}</option>
                </select>
                {errors.eventType && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.eventType}
                  </p>
                )}
              </div>
            </div>

            {/* Guest Count and Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectGuestCount")}</option>
                  <option value="1-25">1-25 {t("guests")}</option>
                  <option value="26-50">26-50 {t("guests")}</option>
                  <option value="51-100">51-100 {t("guests")}</option>
                  <option value="101-200">101-200 {t("guests")}</option>
                  <option value="201-500">201-500 {t("guests")}</option>
                  <option value="500+">500+ {t("guests")}</option>
                </select>
                {errors.guestCount && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.guestCount}
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
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectBudget")}</option>
                  <option value="under-5k">{t("under5k")}</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
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

            {/* Venue and Duration Row */}
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
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
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

              {/* Duration Field */}
              <div>
                <label
                  htmlFor="duration"
                  className={`${montserrat.className} flex items-center gap-2 text-sm font-semibold text-darkGray mb-2`}
                >
                  <Clock className="w-4 h-4 text-darkGray" />
                  {t("duration")}
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`${montserrat.className} w-full px-4 py-3 rounded-lg border ${
                    errors.duration
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectDuration")}</option>
                  <option value="two-hours">{t("twoHours")}</option>
                  <option value="four-hours">{t("fourHours")}</option>
                  <option value="six-hours">{t("sixHours")}</option>
                  <option value="eight-hours">{t("eightHours")}</option>
                  <option value="full-day">{t("fullDay")}</option>
                  <option value="multiple-days">{t("multipleDays")}</option>
                  <option value="custom">{t("custom")}</option>
                </select>
                {errors.duration && (
                  <p
                    className={`${montserrat.className} mt-1 text-sm text-red-600`}
                  >
                    {errors.duration}
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
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
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
              className={`${montserrat.className} w-full bg-gradient-to-r from-caribbeanTurquoise to-caribbeanTurquoise/80 hover:from-caribbeanTurquoise/90 hover:to-caribbeanTurquoise/70 disabled:from-elegantSilver disabled:to-elegantSilver/80 text-pureWhite font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-pureWhite border-t-transparent rounded-full animate-spin" />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t("submit")}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default CorporateEventForm
