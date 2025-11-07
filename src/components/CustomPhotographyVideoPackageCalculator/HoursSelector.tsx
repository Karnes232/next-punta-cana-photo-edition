import { Clock } from "lucide-react"

import { TranslationFn } from "./types"

type HoursSelectorProps = {
  selectedHours: number
  normalizedMinimumHours: number
  maxHours: number
  onHoursChange: (value: number) => void
  hourSuffix: string
  t: TranslationFn
}

const HoursSelector = ({
  selectedHours,
  normalizedMinimumHours,
  maxHours,
  onHoursChange,
  hourSuffix,
  t,
}: HoursSelectorProps) => (
  <article className="rounded-2xl border border-elegantSilver/60 bg-white/95 p-6 shadow-sm backdrop-blur">
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-darkGray">
          {t("hoursLabel")}
        </h3>
        <p className="text-sm text-darkGray/60">{t("hoursHelper")}</p>
      </div>
      <div className="inline-flex items-center gap-2 rounded-full bg-darkGray/5 px-3 py-1 text-sm font-medium text-darkGray">
        <Clock className="h-4 w-4 text-caribbeanTurquoise" />
        <span>
          {selectedHours} {hourSuffix}
        </span>
      </div>
    </header>

    <div className="mt-6 space-y-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label={t("ariaDecreaseHours")}
            onClick={() => onHoursChange(selectedHours - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-elegantSilver text-darkGray transition-colors hover:border-caribbeanTurquoise hover:text-caribbeanTurquoise disabled:cursor-not-allowed disabled:opacity-40"
            disabled={selectedHours <= normalizedMinimumHours}
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <input
            type="number"
            min={normalizedMinimumHours}
            max={24}
            value={selectedHours}
            onChange={event => onHoursChange(Number(event.target.value))}
            className="w-24 rounded-xl border border-elegantSilver bg-pureWhite py-2 text-center text-lg font-semibold text-darkGray shadow-inner focus:border-caribbeanTurquoise focus:outline-none focus:ring-2 focus:ring-caribbeanTurquoise/40"
          />
          <button
            type="button"
            aria-label={t("ariaIncreaseHours")}
            onClick={() => onHoursChange(selectedHours + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-elegantSilver text-darkGray transition-colors hover:border-caribbeanTurquoise hover:text-caribbeanTurquoise disabled:cursor-not-allowed disabled:opacity-40"
            disabled={selectedHours >= 24}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1">
          <input
            type="range"
            min={normalizedMinimumHours}
            max={maxHours}
            step={1}
            value={selectedHours}
            onChange={event => onHoursChange(Number(event.target.value))}
            className="w-full accent-caribbeanTurquoise"
            aria-valuemin={normalizedMinimumHours}
            aria-valuemax={maxHours}
            aria-valuenow={selectedHours}
          />
          <div className="mt-2 flex justify-between text-xs text-darkGray/45">
            <span>{normalizedMinimumHours}</span>
            <span>{maxHours}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-darkGray/45">{t("hourlyServicesInfo")}</p>
    </div>
  </article>
)

type IconProps = {
  className?: string
}

const MinusIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
)

const PlusIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" x2="12" y1="5" y2="19" />
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
)

export default HoursSelector
