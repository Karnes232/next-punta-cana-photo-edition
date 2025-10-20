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
  DollarSign,
  Clock,
  MapPin,
  Camera,
} from "lucide-react"

interface FormData {
  name: string
  email: string
  telephone: string
  eventDate: string
  serviceType: string
  budget: string
  location: string
  duration: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  telephone?: string
  eventDate?: string
  serviceType?: string
  budget?: string
  location?: string
  duration?: string
  message?: string
}

interface ContactFormProps {
  locale: "en" | "es"
}

const ContactForm = ({ locale }: ContactFormProps) => {
  const t = useTranslations("ContactForm")

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    telephone: "",
    eventDate: "",
    serviceType: "",
    budget: "",
    location: "",
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

    if (!formData.eventDate) {
      newErrors.eventDate = t("requiredField")
    }

    if (!formData.serviceType) {
      newErrors.serviceType = t("requiredField")
    }

    if (!formData.budget) {
      newErrors.budget = t("requiredField")
    }

    if (!formData.location.trim()) {
      newErrors.location = t("requiredField")
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
      formDataToSend.append("form-name", "contact-quote-request")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("telephone", formData.telephone)
      formDataToSend.append("eventDate", formData.eventDate)
      formDataToSend.append("serviceType", formData.serviceType)
      formDataToSend.append("budget", formData.budget)
      formDataToSend.append("location", formData.location)
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
          eventDate: "",
          serviceType: "",
          budget: "",
          location: "",
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
    <div id="contact-quote-form" className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="bg-gradient-to-br from-pureWhite to-luxuryGold/5 rounded-2xl shadow-xl p-8 md:p-12 border border-luxuryGold/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-darkGray mb-3 font-crimsonPro">
            {t("title")}
          </h2>
          <p className="text-darkGray/70 text-lg">{t("subtitle")}</p>
        </div>

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{t("errorMessage")}</p>
          </div>
        )}

        {submitStatus === "success" ? (
          <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800">{t("successMessage")}</p>
          </div>
        ) : (
          <form
            name="contact-quote-request"
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
              value="contact-quote-request"
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
                className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
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
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email and Telephone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
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
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Telephone Field */}
              <div>
                <label
                  htmlFor="telephone"
                  className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
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
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.telephone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.telephone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.telephone}
                  </p>
                )}
              </div>
            </div>

            {/* Event Date and Service Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Date Field */}
              <div>
                <label
                  htmlFor="eventDate"
                  className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
                >
                  <Calendar className="w-4 h-4 text-luxuryGold" />
                  {t("eventDate")}
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.eventDate
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.eventDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.eventDate}
                  </p>
                )}
              </div>

              {/* Service Type Field */}
              <div>
                <label
                  htmlFor="serviceType"
                  className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
                >
                  <Camera className="w-4 h-4 text-darkGray" />
                  {t("serviceType")}
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.serviceType
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectServiceType")}</option>
                  <option value="wedding">{t("wedding")}</option>
                  <option value="photoshoot">{t("photoshoot")}</option>
                  <option value="proposal">{t("proposal")}</option>
                  <option value="corporate-event">{t("corporateEvent")}</option>
                  <option value="wedding-planning">
                    {t("weddingPlanning")}
                  </option>
                  <option value="photography-video">
                    {t("photographyVideo")}
                  </option>
                  <option value="other">{t("other")}</option>
                </select>
                {errors.serviceType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.serviceType}
                  </p>
                )}
              </div>
            </div>

            {/* Budget and Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget Field */}
              <div>
                <label
                  htmlFor="budget"
                  className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
                >
                  <DollarSign className="w-4 h-4 text-luxuryGold" />
                  {t("budget")}
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.budget
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectBudget")}</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
                )}
              </div>

              {/* Duration Field */}
              <div>
                <label
                  htmlFor="duration"
                  className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
                >
                  <Clock className="w-4 h-4 text-darkGray" />
                  {t("duration")}
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.duration
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">{t("selectDuration")}</option>
                  <option value="2-hours">{t("twoHours")}</option>
                  <option value="4-hours">{t("fourHours")}</option>
                  <option value="6-hours">{t("sixHours")}</option>
                  <option value="8-hours">{t("eightHours")}</option>
                  <option value="full-day">{t("fullDay")}</option>
                  <option value="multiple-days">{t("multipleDays")}</option>
                  <option value="custom">{t("custom")}</option>
                </select>
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                )}
              </div>
            </div>

            {/* Location Field */}
            <div>
              <label
                htmlFor="location"
                className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
              >
                <MapPin className="w-4 h-4 text-darkGray" />
                {t("location")}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={t("locationPlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.location
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
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
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-luxuryGold focus:ring-luxuryGold"
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-luxuryGold to-luxuryGold/80 hover:from-luxuryGold/90 hover:to-luxuryGold/70 disabled:from-elegantSilver disabled:to-elegantSilver/80 text-pureWhite font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:transform-none"
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

export default ContactForm
