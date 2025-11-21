"use client"

import { useState, useCallback } from "react"
import ServicesCalculator, { type ServiceBlock } from "./ServicesCalculator"
import CorporateEventForm from "@/components/Forms/CorporateEventForm"

interface ServiceCalculationData {
  serviceBlocks: Record<string, ServiceBlock[]>
  totalCost: number
}

interface CorporateEventsCalculatorFormProps {
  services: { title: { en: string; es: string }; rate: number }[]
  locale: "en" | "es"
}

const CorporateEventsCalculatorForm = ({
  services,
  locale,
}: CorporateEventsCalculatorFormProps) => {
  const [serviceCalculationData, setServiceCalculationData] =
    useState<ServiceCalculationData | undefined>(undefined)

  const handleDataChange = useCallback((data: ServiceCalculationData) => {
    setServiceCalculationData(data)
  }, [])

  return (
    <>
      <ServicesCalculator
        services={services}
        locale={locale}
        onDataChange={handleDataChange}
      />
      <CorporateEventForm
        locale={locale}
        serviceCalculationData={serviceCalculationData}
      />
    </>
  )
}

export default CorporateEventsCalculatorForm

