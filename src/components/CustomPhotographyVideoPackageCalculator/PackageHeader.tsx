import { Calculator, Clock } from "lucide-react"

import { TranslationFn } from "./types"

type PackageHeaderProps = {
  normalizedMinimumHours: number
  hourSuffix: string
  t: TranslationFn
}

const PackageHeader = ({
  normalizedMinimumHours,
  hourSuffix,
  t,
}: PackageHeaderProps) => (
  <div className=" px-6 py-10 sm:px-10">
    <div className="mx-auto flex flex-col gap-6 lg:max-w-3xl">
      <div className="flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-caribbeanTurquoise/20 text-caribbeanTurquoise">
          <Calculator className="h-6 w-6" />
        </span>
      </div>
      <div className="space-y-3 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-darkGray sm:text-4xl font-crimsonPro">
          {t("heading")}
        </h2>
        <p className="text-base leading-relaxed text-darkGray/70 sm:text-lg">
          {t("description")}
        </p>
      </div>
      <div className="inline-flex items-center gap-2 self-center rounded-full border border-caribbeanTurquoise/40 bg-caribbeanTurquoise/10 px-4 py-2 text-sm font-medium text-caribbeanTurquoise lg:self-start">
        <Clock className="h-4 w-4" />
        <span>
          {t("minimumHoursLabel")}: {normalizedMinimumHours} {hourSuffix}
        </span>
      </div>
    </div>
  </div>
)

export default PackageHeader
