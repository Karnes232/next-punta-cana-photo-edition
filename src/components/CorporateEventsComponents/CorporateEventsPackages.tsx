import { CorporateEventPackages } from "@/sanity/queries/CorporateEvents/CorporateEventPackages"
import CorporateEventPackageCard from "./CorporateEventPackageCard"
import { useTranslations } from "next-intl"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

interface CorporateEventsPackagesProps {
  packages: CorporateEventPackages[]
  locale: string
}

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const CorporateEventsPackages: React.FC<CorporateEventsPackagesProps> = ({
  packages,
  locale,
}) => {
  const t = useTranslations("CorporateEventsPackages")
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`${coromantGaramond.className} text-4xl font-bold text-gray-900 mb-4`}
          >
            {t("title")}
          </h2>
          <p
            className={`${montserrat.className} text-lg text-gray-600 max-w-3xl mx-auto`}
          >
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((packageItem, index) => (
            <CorporateEventPackageCard
              key={index}
              package={packageItem}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CorporateEventsPackages
