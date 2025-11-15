"use client"

import React, { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import {
  Plus,
  Trash2,
  Clock,
  Calendar,
  AlertCircle,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

type ServiceBlock = {
  id: string
  serviceId: string
  date: string
  startTime: string
  endTime: string
  hours: number
}

type OverlapWarning = {
  type: "same-service" | "different-service"
  serviceIds: string[]
  date: string
  timeRange: string
  message: string
}

const ServicesCalculator = ({
  services,
  locale,
}: {
  services: { title: { en: string; es: string }; rate: number }[]
  locale: "en" | "es"
}) => {
  const t = useTranslations("ServicesCalculator")
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`

  // State: blocks for each service
  const [serviceBlocks, setServiceBlocks] = useState<
    Record<string, ServiceBlock[]>
  >({})

  // State: expanded services
  const [expandedServices, setExpandedServices] = useState<
    Record<string, boolean>
  >({})

  // Calculate hours from start and end time (full hours, minimum 1h, round up)
  const calculateHours = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0

    const [startHour, startMin] = startTime.split(":").map(Number)
    const [endHour, endMin] = endTime.split(":").map(Number)

    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin

    // Handle case where end time is next day (e.g., 23:00 to 01:00)
    let diffMinutes = endMinutes - startMinutes
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60 // Add 24 hours
    }

    const hoursDecimal = diffMinutes / 60
    const hoursRounded = Math.ceil(hoursDecimal) // Round up
    return Math.max(1, hoursRounded) // Minimum 1 hour
  }

  // Add a new block to a service
  const addBlock = (serviceId: string) => {
    const today = new Date().toISOString().split("T")[0]
    const defaultStartTime = "09:00"
    const defaultEndTime = "10:00"

    const newBlock: ServiceBlock = {
      id: `${serviceId}-${Date.now()}-${Math.random()}`,
      serviceId,
      date: today,
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      hours: calculateHours(defaultStartTime, defaultEndTime),
    }

    setServiceBlocks(prev => ({
      ...prev,
      [serviceId]: [...(prev[serviceId] || []), newBlock],
    }))
  }

  // Remove a block
  const removeBlock = (serviceId: string, blockId: string) => {
    setServiceBlocks(prev => ({
      ...prev,
      [serviceId]: (prev[serviceId] || []).filter(b => b.id !== blockId),
    }))
  }

  // Update a block
  const updateBlock = (
    serviceId: string,
    blockId: string,
    field: "date" | "startTime" | "endTime",
    value: string,
  ) => {
    setServiceBlocks(prev => {
      const serviceBlocks = prev[serviceId] || []
      const updatedBlocks = serviceBlocks.map(block => {
        if (block.id === blockId) {
          const updates: Partial<ServiceBlock> = { [field]: value }
          if (field === "startTime" || field === "endTime") {
            const startTime = field === "startTime" ? value : block.startTime
            const endTime = field === "endTime" ? value : block.endTime
            updates.hours = calculateHours(startTime, endTime)
          }
          return { ...block, ...updates }
        }
        return block
      })
      return { ...prev, [serviceId]: updatedBlocks }
    })
  }

  // Toggle service expansion
  const toggleService = (serviceId: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }))
  }

  // Detect overlaps and generate warnings
  const overlaps = useMemo<OverlapWarning[]>(() => {
    const warnings: OverlapWarning[] = []
    const allBlocks: (ServiceBlock & { serviceName: string })[] = []

    // Collect all blocks with service names
    services.forEach(service => {
      const serviceKey = service.title.en
      const blocks = serviceBlocks[serviceKey] || []
      blocks.forEach(block => {
        allBlocks.push({
          ...block,
          serviceName: service.title[locale] || service.title.en,
        })
      })
    })

    // Check for overlaps
    for (let i = 0; i < allBlocks.length; i++) {
      for (let j = i + 1; j < allBlocks.length; j++) {
        const blockA = allBlocks[i]
        const blockB = allBlocks[j]

        // Same date
        if (blockA.date !== blockB.date) continue

        // Check time overlap
        const parseTime = (time: string): number => {
          const [h, m] = time.split(":").map(Number)
          return h * 60 + m
        }

        let startA = parseTime(blockA.startTime)
        let endA = parseTime(blockA.endTime)
        let startB = parseTime(blockB.startTime)
        let endB = parseTime(blockB.endTime)

        // Handle end time on next day (e.g., 23:00 to 01:00)
        if (endA <= startA) endA += 24 * 60
        if (endB <= startB) endB += 24 * 60

        // Normalize times to same day if needed
        // If start times are far apart, might span multiple days
        const dayLength = 24 * 60
        if (Math.abs(startA - startB) > dayLength / 2) {
          if (startA > startB) {
            startB += dayLength
            endB += dayLength
          } else {
            startA += dayLength
            endA += dayLength
          }
        }

        // Check if blocks overlap (two ranges overlap if startA < endB AND startB < endA)
        const overlaps = startA < endB && startB < endA

        if (overlaps) {
          const isSameService = blockA.serviceId === blockB.serviceId
          const warningType: OverlapWarning["type"] = isSameService
            ? "same-service"
            : "different-service"

          if (
            !warnings.some(
              w =>
                w.type === warningType &&
                w.serviceIds.includes(blockA.serviceId) &&
                w.serviceIds.includes(blockB.serviceId) &&
                w.date === blockA.date,
            )
          ) {
            const serviceIds = isSameService
              ? [blockA.serviceId]
              : [blockA.serviceId, blockB.serviceId].sort()
            const timeRange = `${blockA.startTime} - ${blockA.endTime}`

            warnings.push({
              type: warningType,
              serviceIds,
              date: blockA.date,
              timeRange,
              message: isSameService
                ? `${t("overlapSameService")}: ${blockA.serviceName} on ${new Date(blockA.date).toLocaleDateString(locale)} at ${timeRange}. ${t("parallelTeamsNotice")}`
                : `${t("overlapDifferentService")}: ${blockA.serviceName} and ${blockB.serviceName} on ${new Date(blockA.date).toLocaleDateString(locale)} at ${timeRange}.`,
            })
          }
        }
      }
    }

    return warnings
  }, [serviceBlocks, services, locale, t])

  // Calculate total cost
  const totalCost = useMemo(() => {
    let total = 0

    services.forEach(service => {
      const serviceKey = service.title.en
      const blocks = serviceBlocks[serviceKey] || []
      blocks.forEach(block => {
        total += block.hours * service.rate
      })
    })

    return total
  }, [serviceBlocks, services])

  // Get service total
  const getServiceTotal = (serviceId: string) => {
    const service = services.find(s => s.title.en === serviceId)
    if (!service) return 0

    const blocks = serviceBlocks[serviceId] || []
    return blocks.reduce((sum, block) => sum + block.hours * service.rate, 0)
  }

  // Get service blocks count
  const getServiceBlocksCount = (serviceId: string) => {
    return (serviceBlocks[serviceId] || []).length
  }

  return (
    <div className="w-full space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-elegantSilver/50 bg-gradient-to-r from-caribbeanTurquoise/15 via-pureWhite to-pureWhite shadow-xl p-6 sm:p-10">
        <header className="mb-8 space-y-3 text-center">
          <h2 className="text-2xl font-bold text-darkGray sm:text-3xl font-crimsonPro">
            {t("title")}
          </h2>
          <p className="text-base leading-relaxed text-darkGray/70">
            {t("description")}
          </p>
        </header>

        {/* Overlap Warnings */}
        {overlaps.length > 0 && (
          <div className="mb-6 space-y-3">
            {overlaps.map((warning, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 rounded-2xl border p-4 ${
                  warning.type === "same-service"
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : "border-blue-200 bg-blue-50 text-blue-800"
                }`}
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold mb-1">
                    {warning.type === "same-service"
                      ? t("warningParallelTeams")
                      : t("warningSimultaneousServices")}
                  </p>
                  <p>{warning.message}</p>
                  {warning.type === "same-service" && (
                    <p className="mt-1 text-xs opacity-80">
                      {t("parallelTeamsNotice")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Services List */}
        <div className="space-y-4">
          {services.map(service => {
            const serviceKey = service.title.en
            const serviceName = service.title[locale] || service.title.en
            const isExpanded = expandedServices[serviceKey] ?? false
            const blocks = serviceBlocks[serviceKey] || []
            const serviceTotal = getServiceTotal(serviceKey)
            const blocksCount = getServiceBlocksCount(serviceKey)

            return (
              <div
                key={serviceKey}
                className="rounded-2xl border border-elegantSilver/60 bg-white/95 shadow-sm overflow-hidden"
              >
                {/* Service Header */}
                <button
                  type="button"
                  onClick={() => toggleService(serviceKey)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-elegantSilver/5 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-caribbeanTurquoise/10 text-caribbeanTurquoise">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-darkGray">
                        {serviceName}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-darkGray/60">
                        <span>
                          {t("rate")}: {formatCurrency(service.rate)}/
                          {t("hour")}
                        </span>
                        {blocksCount > 0 && (
                          <span>
                            {blocksCount}{" "}
                            {blocksCount === 1
                              ? t("blockOne")
                              : t("blockMultiple")}
                          </span>
                        )}
                        {serviceTotal > 0 && (
                          <span className="font-semibold text-darkGray">
                            {t("subtotal")}: {formatCurrency(serviceTotal)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-darkGray/60" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-darkGray/60" />
                  )}
                </button>

                {/* Service Content */}
                {isExpanded && (
                  <div className="border-t border-elegantSilver/60 p-5 space-y-4">
                    {/* Add Block Button */}
                    <button
                      type="button"
                      onClick={() => addBlock(serviceKey)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-elegantSilver/60 bg-white/70 py-3 text-sm font-medium text-darkGray transition hover:border-caribbeanTurquoise hover:bg-caribbeanTurquoise/5"
                    >
                      <Plus className="h-4 w-4" />
                      {t("addTimeBlock")}
                    </button>

                    {/* Blocks List */}
                    {blocks.length > 0 && (
                      <div className="space-y-3">
                        {blocks.map(block => (
                          <div
                            key={block.id}
                            className="rounded-xl border border-elegantSilver/60 bg-white/70 p-4 space-y-3"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2 text-sm text-darkGray/60">
                                <Calendar className="h-4 w-4" />
                                <span>{t("timeBlock")}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  removeBlock(serviceKey, block.id)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-elegantSilver/60 text-red-500 transition hover:border-red-300 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                              {/* Date */}
                              <div>
                                <label className="mb-1.5 block text-xs font-semibold text-darkGray">
                                  {t("date")}
                                </label>
                                <input
                                  type="date"
                                  value={block.date}
                                  min={new Date().toISOString().split("T")[0]}
                                  onChange={e =>
                                    updateBlock(
                                      serviceKey,
                                      block.id,
                                      "date",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full rounded-lg border border-elegantSilver/60 px-3 py-2 text-sm text-darkGray shadow-sm transition focus:border-caribbeanTurquoise focus:outline-none focus:ring-2 focus:ring-caribbeanTurquoise/20"
                                />
                              </div>

                              {/* Start Time */}
                              <div>
                                <label className="mb-1.5 block text-xs font-semibold text-darkGray">
                                  {t("startTime")}
                                </label>
                                <input
                                  type="time"
                                  value={block.startTime}
                                  onChange={e =>
                                    updateBlock(
                                      serviceKey,
                                      block.id,
                                      "startTime",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full rounded-lg border border-elegantSilver/60 px-3 py-2 text-sm text-darkGray shadow-sm transition focus:border-caribbeanTurquoise focus:outline-none focus:ring-2 focus:ring-caribbeanTurquoise/20"
                                />
                              </div>

                              {/* End Time */}
                              <div>
                                <label className="mb-1.5 block text-xs font-semibold text-darkGray">
                                  {t("endTime")}
                                </label>
                                <input
                                  type="time"
                                  value={block.endTime}
                                  onChange={e =>
                                    updateBlock(
                                      serviceKey,
                                      block.id,
                                      "endTime",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full rounded-lg border border-elegantSilver/60 px-3 py-2 text-sm text-darkGray shadow-sm transition focus:border-caribbeanTurquoise focus:outline-none focus:ring-2 focus:ring-caribbeanTurquoise/20"
                                />
                              </div>
                            </div>

                            {/* Hours Display */}
                            <div className="flex items-center justify-between rounded-lg bg-caribbeanTurquoise/10 px-3 py-2">
                              <span className="text-xs font-medium text-darkGray/70">
                                {t("calculatedHours")}
                              </span>
                              <span className="text-sm font-semibold text-darkGray">
                                {block.hours}{" "}
                                {block.hours === 1 ? t("hour") : t("hours")}
                              </span>
                            </div>

                            {/* Block Cost */}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-darkGray/60">
                                {block.hours}{" "}
                                {block.hours === 1 ? t("hour") : t("hours")} ×{" "}
                                {formatCurrency(service.rate)}
                              </span>
                              <span className="font-semibold text-darkGray">
                                {formatCurrency(block.hours * service.rate)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Empty State */}
                    {blocks.length === 0 && (
                      <div className="rounded-xl border border-dashed border-elegantSilver/70 bg-white/60 px-4 py-8 text-center text-sm text-darkGray/60">
                        {t("noBlocksAdded")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Total Summary */}
        {totalCost > 0 && (
          <div className="mt-8 rounded-2xl border border-caribbeanTurquoise/30 bg-caribbeanTurquoise/10 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-caribbeanTurquoise text-darkGray">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">
                    {t("total")}
                  </h3>
                  <p className="text-sm text-darkGray/60">
                    {t("totalDescription")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-darkGray">
                  {formatCurrency(totalCost)}
                </div>
                <div className="text-xs text-darkGray/60">{t("currency")}</div>
              </div>
            </div>
          </div>
        )}

        {/* Info Notice */}
        <div className="mt-6 rounded-xl bg-elegantSilver/10 px-4 py-3 text-xs text-darkGray/60">
          <p>{t("infoNotice")}</p>
        </div>
      </div>
    </div>
  )
}

export default ServicesCalculator
