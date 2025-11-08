import { DollarSign } from "lucide-react"

import { Locale, SelectedItem, TranslationFn } from "./types"

type SummarySidebarProps = {
  selectedHours: number
  hourSuffix: string
  selectedItems: SelectedItem[]
  locale: Locale
  formatCurrency: (value: number) => string
  totalEstimate: number
  currencyLabel: string
  t: TranslationFn
}

const SummarySidebar = ({
  selectedHours,
  hourSuffix,
  selectedItems,
  locale,
  formatCurrency,
  totalEstimate,
  currencyLabel,
  t,
}: SummarySidebarProps) => (
  <aside className="self-start rounded-2xl border border-elegantSilver/60 bg-white/95 p-6 shadow-md backdrop-blur lg:sticky lg:top-6">
    <div className="flex flex-col items-center gap-3 border-b border-elegantSilver/60 pb-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-luxuryGold/15 text-luxuryGold">
        <DollarSign className="h-5 w-5" />
      </span>
      <div className="text-center lg:text-left">
        <h3 className="text-lg font-semibold text-darkGray">
          {t("summaryHeading")}
        </h3>
        <p className="text-sm text-darkGray/60">{t("summaryDescription")}</p>
      </div>
    </div>

    <dl className="mt-5 space-y-4 text-sm text-darkGray">
      <div className="flex items-center justify-between">
        <dt className="text-darkGray/60">{t("summaryHours")}</dt>
        <dd className="font-semibold text-darkGray">
          {selectedHours} {hourSuffix}
        </dd>
      </div>

      <div>
        <dt className="mb-2 text-darkGray/60">{t("summaryAdditions")}</dt>
        {selectedItems.length === 0 ? (
          <dd className="rounded-xl border border-dashed border-elegantSilver/70 bg-white/60 px-4 py-3 text-darkGray/55">
            {t("summaryEmpty")}
          </dd>
        ) : (
          <dd className="space-y-3">
            {selectedItems.map(item => {
              const localizedTitle = item.title[locale] ?? item.title.en
              return (
                <div
                  key={`${item.title.en}-${item.isHourly ? "hourly" : "fixed"}`}
                  className="flex items-start justify-between gap-3 rounded-xl border border-elegantSilver/60 bg-white/70 px-4 py-3"
                >
                  <span className="text-darkGray">
                    {localizedTitle}
                    {item.isHourly && (
                      <span className="text-darkGray/45">
                        {" "}
                        ({item.quantity} {hourSuffix})
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-darkGray">
                    {formatCurrency(item.lineTotal)}
                  </span>
                </div>
              )
            })}
          </dd>
        )}
      </div>

      <div className="border-t border-elegantSilver/60 pt-4 text-base font-semibold text-darkGray">
        <div className="flex items-center justify-between">
          <span>{t("summaryTotal")}</span>
          <span>
            {formatCurrency(totalEstimate)} {currencyLabel}
          </span>
        </div>
      </div>
    </dl>

    <p className="mt-4 rounded-xl bg-caribbeanTurquoise/10 px-4 py-3 text-xs text-darkGray/60">
      {t("summaryDisclaimer")}
    </p>
  </aside>
)

export default SummarySidebar

