"use client"

import React, { useState, useMemo } from "react"
import ServicesCalculator from "./ServicesCalculator"
import PhotographyVideoPackageForm from "../Forms/PhotographyVideoPackageForm"

interface Addition {
  title: {
    en: string
    es: string
  }
  price: number
  fixedorhourly: string
}

interface PhotographyVideoPackageWithFormProps {
  packageData: {
    title: { en: string; es: string }
    hourlyRate: number
    minimumHours: number
    additions: Addition[]
    includedServices: { en: string; es: string }[]
  }
  locale: "en" | "es"
}

const PhotographyVideoPackageWithForm = ({
  packageData,
  locale,
}: PhotographyVideoPackageWithFormProps) => {
  const [selectedHours, setSelectedHours] = useState(packageData.minimumHours)
  const [selectedAdditions, setSelectedAdditions] = useState<
    Record<string, boolean>
  >({})

  // Calculate total cost
  const totalCost = useMemo(() => {
    let cost = 0

    // Base hourly cost (ensure minimum hours)
    const hoursToCharge = Math.max(selectedHours, packageData.minimumHours)
    cost += hoursToCharge * packageData.hourlyRate

    // Add selected additions
    if (packageData.additions && packageData.additions.length > 0) {
      packageData.additions.forEach((addition, index) => {
        if (selectedAdditions[index]) {
          if (addition.fixedorhourly === "fixed") {
            cost += addition.price
          } else if (addition.fixedorhourly === "hourly") {
            cost += addition.price * hoursToCharge
          }
        }
      })
    }

    return cost
  }, [selectedHours, packageData.minimumHours, packageData.hourlyRate, selectedAdditions, packageData.additions])

  const handleHoursChange = (hours: number) => {
    setSelectedHours(Math.max(hours, 0))
  }

  const handleAdditionToggle = (index: number) => {
    setSelectedAdditions(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Create calculator data for the form
  const calculatorData = {
    selectedHours,
    totalCost,
    selectedAdditions,
  }

  return (
    <div className="space-y-8">
      <ServicesCalculator
        hourlyRate={packageData.hourlyRate}
        minimumHours={packageData.minimumHours}
        additions={packageData.additions}
        includedServices={packageData.includedServices}
        locale={locale}
        selectedHours={selectedHours}
        selectedAdditions={selectedAdditions}
        onHoursChange={handleHoursChange}
        onAdditionToggle={handleAdditionToggle}
      />
      <PhotographyVideoPackageForm
        packageData={packageData}
        calculatorData={calculatorData}
        locale={locale}
      />
    </div>
  )
}

export default PhotographyVideoPackageWithForm
