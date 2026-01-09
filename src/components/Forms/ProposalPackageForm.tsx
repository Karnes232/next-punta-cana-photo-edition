"use client"

import React, { useMemo, useState } from "react"
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
  Clock,
  DollarSign,
  Gift,
  Building2,
} from "lucide-react"

interface FormData {
  name: string
  email: string
  telephone: string
  date: string
  partnerName: string
  hotel: string
  specialRequests: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  telephone?: string
  date?: string
  partnerName?: string
  hotel?: string
  message?: string
}

const ProposalPackageForm = ({
  page,
  locale,
  additions,
  startingPrice,
}: {
  page: string
  locale: "en" | "es"
  additions: {
    _id: string
    additionName: {
      en: string
      es: string
    }
    additionPrice: number
  }[]
  startingPrice: number
}) => {
  const t = useTranslations("ProposalBookingForm")

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    telephone: "",
    date: "",
    partnerName: "",
    hotel: "",
    specialRequests: "",
    message: "",
  })
  const [selectedAdditions, setSelectedAdditions] = useState<string[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle")

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === "es" ? "es-DO" : "en-US", {
        style: "currency",
        currency: "USD",
      }),
    [locale],
  )

  const selectedAdditionsDetails = useMemo(
    () =>
      additions.filter(addition => selectedAdditions.includes(addition._id)),
    [additions, selectedAdditions],
  )

  const selectedAdditionsSummary = useMemo(
    () =>
      selectedAdditionsDetails
        .map(
          addition =>
            `${addition.additionName[locale]} (${currencyFormatter.format(
              addition.additionPrice,
            )})`,
        )
        .join(", "),
    [currencyFormatter, locale, selectedAdditionsDetails],
  )

  const totalInvestment = useMemo(() => {
    const additionsTotal = selectedAdditionsDetails.reduce(
      (total, addition) => total + (addition.additionPrice || 0),
      0,
    )
    return startingPrice + additionsTotal
  }, [selectedAdditionsDetails, startingPrice])

  const hasAdditions = additions.length > 0
  const hasSelectedAdditions = selectedAdditions.length > 0

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

    if (!formData.date) {
      newErrors.date = t("requiredField")
    }

    if (!formData.partnerName.trim()) {
      newErrors.partnerName = t("requiredField")
    }

    if (!formData.hotel.trim()) {
      newErrors.hotel = t("requiredField")
    }

    if (!formData.message.trim()) {
      newErrors.message = t("requiredField")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleAdditionToggle = (additionId: string) => {
    setSelectedAdditions(prev =>
      prev.includes(additionId)
        ? prev.filter(id => id !== additionId)
        : [...prev, additionId],
    )
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
      formDataToSend.append("form-name", "proposal-booking")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("telephone", formData.telephone)
      formDataToSend.append("date", formData.date)
      formDataToSend.append("partnerName", formData.partnerName)
      formDataToSend.append("hotel", formData.hotel)
      formDataToSend.append("specialRequests", formData.specialRequests)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("package", page)
      formDataToSend.append("locale", locale)
      formDataToSend.append(
        "startingPrice",
        currencyFormatter.format(startingPrice),
      )
      formDataToSend.append(
        "selectedAdditions",
        selectedAdditionsSummary || t("noAdditionsSelected"),
      )
      formDataToSend.append(
        "totalInvestment",
        currencyFormatter.format(totalInvestment),
      )
      formDataToSend.append("selectedAdditionIds", selectedAdditions.join(","))

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
          date: "",
          partnerName: "",
          hotel: "",
          specialRequests: "",
          message: "",
        })
        setSelectedAdditions([])
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
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="bg-gradient-to-br from-pureWhite to-elegantSilver/30 rounded-2xl shadow-xl p-8 md:p-12 border border-elegantSilver/50">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-darkGray mb-3 font-crimsonPro">
            {t("title")}
          </h2>
          <p className="text-darkGray/70 text-lg">{t("subtitle")}</p>
        </div>

        {/* Package Info */}
        <div className="mb-6 p-6 bg-luxuryGold/5 rounded-xl border border-luxuryGold/30">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-darkGray flex items-center gap-2">
              <Heart className="w-5 h-5 text-luxuryGold" />
              {t("packageInfo")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-darkGray">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-caribbeanTurquoise" />
                <span>
                  <strong>{t("package")}:</strong> {page}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-caribbeanTurquoise" />
                <span>
                  <strong>{t("startingPriceLabel")}:</strong>{" "}
                  {currencyFormatter.format(startingPrice)}
                </span>
              </div>
              {hasAdditions && (
                <div className="flex flex-col md:col-span-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-caribbeanTurquoise" />
                    <span>
                      <strong>{t("totalInvestment")}:</strong>{" "}
                      {currencyFormatter.format(totalInvestment)}
                    </span>
                  </div>
                  {hasSelectedAdditions && (
                    <span className="pl-6 text-xs text-darkGray/70">
                      {t("selectedAdditionsLabel")}: {selectedAdditionsSummary}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
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
            name="proposal-booking"
            method="POST"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="proposal-booking" />
            <input type="hidden" name="package" value={page} />
            <input type="hidden" name="locale" value={locale} />
            <input
              type="hidden"
              name="startingPrice"
              value={currencyFormatter.format(startingPrice)}
            />
            <input
              type="hidden"
              name="selectedAdditions"
              value={selectedAdditionsSummary || t("noAdditionsSelected")}
            />
            <input
              type="hidden"
              name="selectedAdditionIds"
              value={selectedAdditions.join(",")}
            />
            <input
              type="hidden"
              name="totalInvestment"
              value={currencyFormatter.format(totalInvestment)}
            />

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
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
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
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
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
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                  } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.telephone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.telephone}
                  </p>
                )}
              </div>
            </div>

            {/* Partner Name and Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Partner Name Field */}
              <div>
                <label
                  htmlFor="partnerName"
                  className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
                >
                  <Heart className="w-4 h-4 text-darkGray" />
                  {t("partnerName")}
                </label>
                <input
                  type="text"
                  id="partnerName"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  placeholder={t("partnerNamePlaceholder")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.partnerName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                  } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.partnerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.partnerName}
                  </p>
                )}
              </div>

              {/* Date Field */}
              <div>
                <label
                  htmlFor="date"
                  className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
                >
                  <Calendar className="w-4 h-4 text-darkGray" />
                  {t("date")}
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.date
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                  } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>
            </div>

            {/* Hotel Field */}
            <div>
              <label
                htmlFor="hotel"
                className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
              >
                <Building2 className="w-4 h-4 text-darkGray" />
                {t("hotel")}
              </label>
              <input
                type="text"
                id="hotel"
                name="hotel"
                value={formData.hotel}
                onChange={handleChange}
                placeholder={t("hotelPlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.hotel
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.hotel && (
                <p className="mt-1 text-sm text-red-600">{errors.hotel}</p>
              )}
            </div>

            {/* Optional Additions */}
            {hasAdditions && (
              <div className="p-6 bg-pureWhite border border-elegantSilver rounded-xl shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-caribbeanTurquoise" />
                  <div>
                    <h3 className="text-lg font-semibold text-darkGray">
                      {t("additionsHeading")}
                    </h3>
                    <p className="text-sm text-darkGray/70">
                      {t("additionsHelper")}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 md:space-y-0 md:gap-4! md:grid md:grid-cols-2">
                  {additions.map(addition => {
                    const isSelected = selectedAdditions.includes(addition._id)
                    return (
                      <label
                        key={addition._id}
                        className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                          isSelected
                            ? "border-caribbeanTurquoise bg-caribbeanTurquoise/5"
                            : "border-elegantSilver hover:border-caribbeanTurquoise/60"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="additions"
                          value={addition._id}
                          checked={isSelected}
                          onChange={() => handleAdditionToggle(addition._id)}
                          className="mt-1 h-4 w-4 text-caribbeanTurquoise focus:ring-caribbeanTurquoise border-elegantSilver rounded"
                        />
                        <span className="flex-1">
                          <span className="block font-semibold text-darkGray">
                            {addition.additionName[locale]}
                          </span>
                          <span className="block text-sm font-medium text-caribbeanTurquoise">
                            {currencyFormatter.format(addition.additionPrice)}
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Special Requests Field */}
            <div>
              <label
                htmlFor="specialRequests"
                className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2"
              >
                <Heart className="w-4 h-4 text-darkGray" />
                {t("specialRequests")}
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder={t("specialRequestsPlaceholder")}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors resize-none"
              />
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
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise"
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
              className="w-full bg-gradient-to-r from-luxuryGold to-luxuryGold/80 hover:from-luxuryGold/90 hover:to-luxuryGold/70 disabled:from-elegantSilver disabled:to-elegantSilver/80 text-darkGray font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-darkGray border-t-transparent rounded-full animate-spin" />
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

export default ProposalPackageForm
