"use client"

import { useEffect, useMemo, useState } from "react"

import { Check, DollarSign, Search, X } from "lucide-react"

import { Addition, Locale, TranslationFn } from "./types"

type AdditionsSelectionProps = {
  addtions: Addition[]
  locale: Locale
  selectedAddOns: Record<string, boolean>
  selectedHours: number
  onToggle: (key: string) => void
  formatCurrency: (value: number) => string
  hourSuffix: string
  t: TranslationFn
}

const PAGE_SIZE = 9

const AdditionsSelection = ({
  addtions,
  locale,
  selectedAddOns,
  selectedHours,
  onToggle,
  formatCurrency,
  hourSuffix,
  t,
}: AdditionsSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredAdditions = useMemo(() => {
    if (!searchTerm.trim()) {
      return addtions
    }

    const normalizedQuery = searchTerm.trim().toLowerCase()

    return addtions.filter(addition => {
      const localizedTitle = addition.title[locale] ?? addition.title.en
      return localizedTitle.toLowerCase().includes(normalizedQuery)
    })
  }, [addtions, locale, searchTerm])

  const totalPages = useMemo(() => {
    if (filteredAdditions.length === 0) {
      return 1
    }
    return Math.ceil(filteredAdditions.length / PAGE_SIZE)
  }, [filteredAdditions.length])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const visibleAdditions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    return filteredAdditions.slice(startIndex, startIndex + PAGE_SIZE)
  }, [currentPage, filteredAdditions])

  const shouldShowPagination = filteredAdditions.length > PAGE_SIZE

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setCurrentPage(1)
  }

  return (
    <article className="rounded-2xl border border-elegantSilver/60 bg-white/95 p-6 shadow-sm backdrop-blur">
      <header className="space-y-1">
        <h3 className="text-xl font-semibold text-darkGray">
          {t("additionsHeading")}
        </h3>
        <p className="text-sm text-darkGray/60">{t("additionsHelper")}</p>
      </header>

      {addtions.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-elegantSilver/70 bg-white/70 p-6 text-center text-sm text-darkGray/60">
          {t("noAdditionsMessage")}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-elegantSilver" />
            <input
              type="search"
              value={searchTerm}
              onChange={event => handleSearchChange(event.target.value)}
              placeholder={t("additionsSearchPlaceholder")}
              aria-label={t("additionsSearchAria")}
              className="w-full rounded-xl border border-elegantSilver/60 bg-white py-2.5 pl-10 pr-10 text-sm text-darkGray shadow-sm transition focus:border-caribbeanTurquoise/60 focus:outline-none focus:ring-2 focus:ring-caribbeanTurquoise/20 h-11"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label={t("additionsClearSearch")}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-darkGray/50 transition hover:bg-caribbeanTurquoise/10 hover:text-caribbeanTurquoise"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-start text-xs font-medium text-darkGray/60">
            <span>
              {t("additionsCountLabel", { count: filteredAdditions.length })}
            </span>
          </div>

          {filteredAdditions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-elegantSilver/70 bg-white/70 p-6 text-center text-sm text-darkGray/60">
              {t("additionsNoResults")}
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleAdditions.map(addition => {
                  const additionKey = addition.title.en
                  const localizedTitle =
                    addition.title[locale] ?? addition.title.en
                  const isSelected = selectedAddOns[additionKey] ?? false
                  const isHourly = addition.fixedorhourly === "hourly"
                  const quantity = isHourly ? selectedHours : 1
                  const subtotal = addition.price * quantity

                  return (
                    <button
                      key={additionKey}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => onToggle(additionKey)}
                      className={`group flex h-full flex-col gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-caribbeanTurquoise bg-caribbeanTurquoise/10 shadow-md"
                          : "border-elegantSilver bg-white hover:-translate-y-0.5 hover:border-caribbeanTurquoise/60 hover:shadow"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                              isSelected
                                ? "border-caribbeanTurquoise bg-caribbeanTurquoise text-darkGray"
                                : "border-elegantSilver bg-pureWhite text-transparent"
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <div className="space-y-1">
                            <p className="text-base font-semibold text-darkGray">
                              {localizedTitle}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-darkGray/70">
                        <div className="flex items-center gap-0">
                          <DollarSign className="h-4 w-4 text-luxuryGold" />
                          <span className="flex items-center gap-1">
                            {addition.price}{" "}
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                                isHourly
                                  ? "bg-caribbeanTurquoise/20 text-caribbeanTurquoise"
                                  : "bg-luxuryGold/20 text-luxuryGold"
                              }`}
                            >
                              {isHourly ? t("hourlyLabel") : t("fixedLabel")}
                            </span>
                          </span>
                        </div>
                        <span className="font-semibold text-darkGray">
                          {formatCurrency(subtotal)}
                        </span>
                      </div>

                      {isSelected && isHourly && (
                        <p className="text-xs text-darkGray/50">
                          {quantity} {hourSuffix} ×{" "}
                          {formatCurrency(addition.price)}
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
              {shouldShowPagination && (
                <nav
                  className="flex items-center justify-end gap-3 pt-4 text-sm text-darkGray"
                  aria-label={t("additionsPaginationAria")}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(prev => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-lg border border-elegantSilver/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-darkGray/30 hover:border-caribbeanTurquoise/60 hover:text-caribbeanTurquoise"
                  >
                    {t("additionsPrevious")}
                  </button>
                  <span className="text-xs font-medium text-darkGray/70">
                    {t("additionsPageLabel", {
                      current: currentPage,
                      total: totalPages,
                    })}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(prev => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-elegantSilver/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-darkGray/30 hover:border-caribbeanTurquoise/60 hover:text-caribbeanTurquoise"
                  >
                    {t("additionsNext")}
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      )}
    </article>
  )
}

export default AdditionsSelection
