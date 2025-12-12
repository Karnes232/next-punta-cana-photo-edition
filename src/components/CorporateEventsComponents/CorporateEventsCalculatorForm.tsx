"use client"

import { useState, useCallback, useRef } from "react"
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
  const [serviceCalculationData, setServiceCalculationData] = useState<
    ServiceCalculationData | undefined
  >(undefined)

  // Store previous serialized data to prevent unnecessary updates
  const prevSerializedRef = useRef<string | null>(null)

  const handleDataChange = useCallback((data: ServiceCalculationData) => {
    // Serialize the data for comparison
    const serialized = JSON.stringify({
      serviceBlocks: data.serviceBlocks,
      totalCost: data.totalCost,
    })

    // Only update state if data has actually changed
    if (prevSerializedRef.current !== serialized) {
      prevSerializedRef.current = serialized
      setServiceCalculationData(data)
    }
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
