"use client"

import React, { useMemo, useState } from "react"
import { useTranslations } from "next-intl"

import AdditionsSelection from "../CustomPhotographyVideoPackageCalculator/AdditionsSelection"
import InquiryForm from "../CustomPhotographyVideoPackageCalculator/InquiryForm"
import PackageHeader from "../CustomPhotographyVideoPackageCalculator/PackageHeader"
import SummarySidebar from "../CustomPhotographyVideoPackageCalculator/SummarySidebar"
import {
  Addition,
  ContactFormErrors,
  ContactFormState,
  Locale,
  SelectedItem,
  SubmitStatus,
} from "../CustomPhotographyVideoPackageCalculator/types"

interface CustomPhotographyVideoPackageCalculatorFormProps {
  minimumHours: number
  addtions: Addition[]
  locale: Locale
}

const CustomPhotographyVideoPackageCalculatorForm = ({
  minimumHours,
  addtions,
  locale,
}: CustomPhotographyVideoPackageCalculatorFormProps) => {
  const t = useTranslations("CustomPhotographyVideoPackageCalculatorForm")
  const hourSuffix = t("hourSuffix")
  const currencyLabel = t("currency")
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`
  const maxHourlyHours = 24

  const normalizedMinimumHours = useMemo(() => {
    if (!minimumHours || minimumHours < 1) {
      return 1
    }
    return Math.floor(minimumHours)
  }, [minimumHours])

  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>(
    () =>
      addtions.reduce(
        (acc, addition) => {
          acc[addition.title.en] = false
          return acc
        },
        {} as Record<string, boolean>,
      ),
  )
  const [additionHours, setAdditionHours] = useState<Record<string, number>>(
    () =>
      addtions.reduce(
        (acc, addition) => {
          if (addition.fixedorhourly === "hourly") {
            acc[addition.title.en] = normalizedMinimumHours
          }
          return acc
        },
        {} as Record<string, number>,
      ),
  )

  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    telephone: "",
    date: "",
    hotel: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")

  React.useEffect(() => {
    setSelectedAddOns(prev => {
      const next: Record<string, boolean> = {}
      addtions.forEach(addition => {
        next[addition.title.en] = prev[addition.title.en] ?? false
      })
      return next
    })
  }, [addtions])

  React.useEffect(() => {
    setAdditionHours(prev => {
      const next: Record<string, number> = {}

      addtions.forEach(addition => {
        if (addition.fixedorhourly !== "hourly") {
          return
        }

        const additionKey = addition.title.en
        const previousValue = prev[additionKey] ?? normalizedMinimumHours
        const rounded = Math.round(previousValue)
        const clamped = Math.min(
          Math.max(rounded, normalizedMinimumHours),
          maxHourlyHours,
        )

        next[additionKey] = clamped
      })

      return next
    })
  }, [addtions, maxHourlyHours, normalizedMinimumHours])

  const selectedItems = useMemo<SelectedItem[]>(() => {
    return addtions
      .filter(addition => selectedAddOns[addition.title.en])
      .map(addition => {
        const isHourly = addition.fixedorhourly === "hourly"
        const quantity = isHourly
          ? (additionHours[addition.title.en] ?? normalizedMinimumHours)
          : 1
        const lineTotal = addition.price * quantity
        return {
          title: addition.title,
          isHourly,
          unitPrice: addition.price,
          quantity,
          lineTotal,
        }
      })
  }, [addtions, additionHours, normalizedMinimumHours, selectedAddOns])

  const totalEstimate = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.lineTotal, 0)
  }, [selectedItems])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const errors: ContactFormErrors = {}

    if (!formState.name.trim()) {
      errors.name = t("requiredField")
    }

    if (!formState.email.trim()) {
      errors.email = t("requiredField")
    } else if (!validateEmail(formState.email)) {
      errors.email = t("invalidEmail")
    }

    if (!formState.telephone.trim()) {
      errors.telephone = t("requiredField")
    }

    if (!formState.date) {
      errors.date = t("requiredField")
    }

    if (!formState.message.trim()) {
      errors.message = t("requiredField")
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleContactFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormState(prev => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof ContactFormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const toggleAddOn = (additionKey: string) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [additionKey]: !prev[additionKey],
    }))
  }

  const summaryLines = selectedItems.map(item => {
    const localizedTitle = item.title[locale] ?? item.title.en
    if (item.isHourly) {
      return `${localizedTitle} — ${formatCurrency(item.unitPrice)} x ${item.quantity} ${hourSuffix}`
    }
    return `${localizedTitle} — ${formatCurrency(item.lineTotal)}`
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const formData = new FormData()
      formData.append("form-name", "custom-photography-video-calculator")
      formData.append("name", formState.name)
      formData.append("email", formState.email)
      formData.append("telephone", formState.telephone)
      formData.append("date", formState.date)
      formData.append("hotel", formState.hotel)
      formData.append("message", formState.message)
      formData.append("locale", locale)
      formData.append("estimatedTotal", totalEstimate.toString())
      formData.append("addOns", summaryLines.join(" | "))

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData as any),
      })

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`)
      }

      setSubmitStatus("success")
      setFormState({
        name: "",
        email: "",
        telephone: "",
        date: "",
        hotel: "",
        message: "",
      })
    } catch (error) {
      console.error("Failed to submit custom package request", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAdditionHoursChange = (additionKey: string, value: number) => {
    if (Number.isNaN(value)) {
      return
    }

    setAdditionHours(prev => {
      const rounded = Math.round(value)
      const clamped = Math.min(
        Math.max(rounded, normalizedMinimumHours),
        maxHourlyHours,
      )
      return {
        ...prev,
        [additionKey]: clamped,
      }
    })
  }

  return (
    <div className="w-full space-y-10">
      <section className="overflow-hidden rounded-3xl border border-elegantSilver/50 bg-gradient-to-r from-caribbeanTurquoise/15 via-pureWhite to-pureWhitee shadow-xl">
        <PackageHeader
          normalizedMinimumHours={normalizedMinimumHours}
          hourSuffix={hourSuffix}
          t={t}
        />

        <div className="px-6 pb-10 sm:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr),minmax(0,2fr)]">
            <div className="space-y-8">
              <AdditionsSelection
                addtions={addtions}
                locale={locale}
                selectedAddOns={selectedAddOns}
                additionHours={additionHours}
                normalizedMinimumHours={normalizedMinimumHours}
                maxHourlyHours={maxHourlyHours}
                onToggle={toggleAddOn}
                onHoursChange={handleAdditionHoursChange}
                formatCurrency={formatCurrency}
                hourSuffix={hourSuffix}
                t={t}
              />
            </div>

            <SummarySidebar
              hourSuffix={hourSuffix}
              selectedItems={selectedItems}
              locale={locale}
              formatCurrency={formatCurrency}
              totalEstimate={totalEstimate}
              currencyLabel={currencyLabel}
              t={t}
            />
          </div>
        </div>
      </section>

      <InquiryForm
        locale={locale}
        formState={formState}
        formErrors={formErrors}
        onFieldChange={handleContactFieldChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        t={t}
        totalEstimate={totalEstimate}
        currencyLabel={currencyLabel}
        summaryLines={summaryLines}
        formatCurrency={formatCurrency}
      />
    </div>
  )
}

export default CustomPhotographyVideoPackageCalculatorForm
