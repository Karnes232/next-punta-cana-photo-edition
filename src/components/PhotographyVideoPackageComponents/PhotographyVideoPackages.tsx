"use client"
import { PhotographyVideoPackages as PhotographyVideoPackagesType } from "@/sanity/queries/Photography-Video/Photography-video-packages"
import PhotographyVideoPackageCard from "./PhotographyVideoPackageCard"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface PhotographyVideoPackagesProps {
  packages: PhotographyVideoPackagesType[]
  locale: string
  title?: string
  subtitle?: string
}

const PhotographyVideoPackages: React.FC<PhotographyVideoPackagesProps> = ({
  packages,
  locale,
  title = "Photography & Video Packages",
  subtitle = "Choose the perfect package for your special day",
}) => {
  if (!packages || packages.length === 0) {
    return null
  }

  // Sort packages by starting price (lowest to highest)
  const sortedPackages = [...packages].sort(
    (a, b) => a.startingPrice - b.startingPrice,
  )

  return (
    <section className="max-w-7xl mx-auto px-5 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className={`${coromantGaramond.className} text-4xl md:text-5xl font-semibold text-darkGray mb-4`}
        >
          {title}
        </h2>
        <p
          className={`${montserrat.className} text-lg text-gray-600 max-w-2xl mx-auto`}
        >
          {subtitle}
        </p>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPackages.map(packageItem => (
          <PhotographyVideoPackageCard
            key={packageItem._id}
            package={packageItem}
            locale={locale}
          />
        ))}
      </div>
    </section>
  )
}

export default PhotographyVideoPackages
