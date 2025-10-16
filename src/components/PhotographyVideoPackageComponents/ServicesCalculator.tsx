"use client"

import { useTranslations } from "next-intl"
import React, { useState, useMemo } from "react"

interface Addition {
  title: {
    en: string
    es: string
  }
  price: number
  fixedorhourly: string
}

interface ServicesCalculatorProps {
  hourlyRate: number
  minimumHours: number
  additions: Addition[]
  includedServices: { en: string; es: string }[]
  locale: "en" | "es"
}

const ServicesCalculator = ({
  hourlyRate,
  minimumHours,
  additions,
  includedServices,
  locale,
}: ServicesCalculatorProps) => {
  const [selectedHours, setSelectedHours] = useState(minimumHours)
  const [selectedAdditions, setSelectedAdditions] = useState<
    Record<string, boolean>
  >({})
  const t = useTranslations("ServicesCalculator")

  // Calculate total cost
  const totalCost = useMemo(() => {
    let cost = 0

    // Base hourly cost (ensure minimum hours)
    const hoursToCharge = Math.max(selectedHours, minimumHours)
    cost += hoursToCharge * hourlyRate

    // Add selected additions
    additions.forEach((addition, index) => {
      if (selectedAdditions[index]) {
        if (addition.fixedorhourly === "fixed") {
          cost += addition.price
        } else if (addition.fixedorhourly === "hourly") {
          cost += addition.price * hoursToCharge
        }
      }
    })

    return cost
  }, [selectedHours, minimumHours, hourlyRate, selectedAdditions, additions])

  const handleHoursChange = (hours: number) => {
    setSelectedHours(Math.max(hours, 0))
  }

  const handleAdditionToggle = (index: number) => {
    setSelectedAdditions(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pureWhite rounded-xl shadow-xl border border-elegantSilver/30">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-darkGray mb-2"
          style={{ fontFamily: "var(--font-crimson-pro)" }}
        >
          {t("Services Calculator")}
        </h2>
        <p className="text-elegantSilver">
          {t("Estimate your photography and video package costs")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          {/* Hours Selection */}
          <div className="bg-pureWhite p-6 rounded-xl border border-elegantSilver/30 shadow-sm">
            <h3
              className="text-xl font-semibold text-darkGray mb-4"
              style={{ fontFamily: "var(--font-crimson-pro)" }}
            >
              {t("Hours Required")}
            </h3>
            <div className="flex items-center space-x-4">
              <label htmlFor="hours" className="text-darkGray font-medium">
                {t("Hours:")}
              </label>
              <input
                id="hours"
                type="number"
                min="0"
                max="24"
                value={selectedHours}
                onChange={e => handleHoursChange(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-elegantSilver rounded-md focus:outline-none focus:ring-2 focus:ring-luxuryGold focus:border-luxuryGold transition-all duration-300"
              />
            </div>
            <div className="mt-2 text-sm text-elegantSilver">
              <p>
                {t("Minimum:")} {minimumHours} {t("hours")}
              </p>
              <p className="text-luxuryGold font-medium">
                {t("Rate:")} ${hourlyRate}/{t("hour")}
              </p>
            </div>
          </div>

          {/* Additions Selection */}
          <div className="bg-pureWhite p-6 rounded-xl border border-elegantSilver/30 shadow-sm">
            <h3
              className="text-xl font-semibold text-darkGray mb-4"
              style={{ fontFamily: "var(--font-crimson-pro)" }}
            >
              {t("Additional Services")}
            </h3>
            <div className="space-y-3">
              {additions.map((addition, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-pureWhite rounded-lg border border-elegantSilver/30 hover:border-luxuryGold/50 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-darkGray">
                      {addition.title[locale]}
                    </h4>
                    <p className="text-sm text-elegantSilver">
                      {addition.fixedorhourly === "fixed"
                        ? `$${addition.price} ${t("fixed")}`
                        : `$${addition.price}/${t("hour")}`}
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAdditions[index] || false}
                      onChange={() => handleAdditionToggle(index)}
                      className="w-5 h-5 text-luxuryGold border-elegantSilver rounded focus:ring-luxuryGold focus:ring-2"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Cost Breakdown */}
        <div className="space-y-6">
          <div className="bg-pureWhite p-6 rounded-xl border border-luxuryGold/30 shadow-sm">
            <h3
              className="text-xl font-semibold text-darkGray mb-4"
              style={{ fontFamily: "var(--font-crimson-pro)" }}
            >
              {t("Cost Breakdown")}
            </h3>

            <div className="space-y-3">
              {/* Base Hours Cost */}
              <div className="flex justify-between items-center py-2 border-b border-elegantSilver/30">
                <span className="text-darkGray">
                  {Math.max(selectedHours, minimumHours)} {t("hours")} × $
                  {hourlyRate}
                </span>
                <span className="font-semibold text-luxuryGold">
                  ${Math.max(selectedHours, minimumHours) * hourlyRate}
                </span>
              </div>

              {/* Additions Cost */}
              {additions.map((addition, index) => {
                if (!selectedAdditions[index]) return null

                const additionCost =
                  addition.fixedorhourly === "fixed"
                    ? addition.price
                    : addition.price * Math.max(selectedHours, minimumHours)

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-elegantSilver/30"
                  >
                    <span className="text-darkGray">
                      {addition.title[locale]}
                    </span>
                    <span className="font-semibold text-caribbeanTurquoise">
                      ${additionCost}
                    </span>
                  </div>
                )
              })}

              {/* Total */}
              <div className="flex justify-between items-center py-4 border-t-2 border-luxuryGold bg-luxuryGold/5 px-4 rounded-lg">
                <span
                  className="text-lg font-bold text-darkGray"
                  style={{ fontFamily: "var(--font-crimson-pro)" }}
                >
                  {t("Total:")}
                </span>
                <span className="text-3xl font-bold text-luxuryGold">
                  ${totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-pureWhite p-6 rounded-xl border border-caribbeanTurquoise/30 shadow-sm">
            <h4
              className="text-lg font-semibold text-darkGray mb-2"
              style={{ fontFamily: "var(--font-crimson-pro)" }}
            >
              {t("Package Summary")}
            </h4>
            <div className="text-sm text-elegantSilver space-y-3">
              <p>
                {`• ${Math.max(selectedHours, minimumHours)} ${t("hours")} of ${t("photography/video")}`}
              </p>

              {/* Included Services List */}
              <div>
                <p className="font-medium text-darkGray mb-1">
                  {t("Included Services:")}
                </p>
                <ul className="space-y-1">
                  {includedServices.map((service, index) => (
                    <li key={index} className="text-elegantSilver">
                      • {service[locale]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selected Additional Services */}
              {Object.values(selectedAdditions).filter(Boolean).length > 0 && (
                <div>
                  <p className="font-medium text-darkGray mb-1">
                    {t("Additional Services:")}
                  </p>
                  <ul className="space-y-1">
                    {additions.map((addition, index) => {
                      if (!selectedAdditions[index]) return null
                      return (
                        <li key={index} className="text-caribbeanTurquoise">
                          • {addition.title[locale]}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              <p className="font-medium text-caribbeanTurquoise mt-3">
                {t("Startingfromthisestimate")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesCalculator
