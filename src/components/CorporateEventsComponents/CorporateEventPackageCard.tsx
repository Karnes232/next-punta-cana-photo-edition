"use client"
import { CorporateEventPackages } from "@/sanity/queries/CorporateEvents/CorporateEventPackages"
import React from "react"
import Image from "next/image"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import { useTranslations } from "next-intl"
import Link from "next/link"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface CorporateEventPackageCardProps {
  package: CorporateEventPackages
  locale: string
}

const CorporateEventPackageCard: React.FC<CorporateEventPackageCardProps> = ({
  package: corporatePackage,
  locale,
}) => {
  const t = useTranslations("CorporateEventsPackages")

  const title =
    corporatePackage.title[locale as "en" | "es"] || corporatePackage.title.en
  const description =
    corporatePackage.description[locale as "en" | "es"] ||
    corporatePackage.description.en
  const imageUrl = corporatePackage.cardImage?.asset?.url
  const imageAlt = corporatePackage.cardImage?.alt || title

  if (!imageUrl) return null

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group w-full h-full flex flex-col cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden h-96 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-6 text-center flex flex-col flex-grow">
        <div className="flex-grow">
          <h3
            className={`${coromantGaramond.className} text-2xl font-semibold text-gray-900 mb-6 line-clamp-2`}
          >
            {title}
          </h3>

          {/* Description */}
          <div className="mb-8">
            <p
              className={`${montserrat.className} text-sm text-gray-600 leading-relaxed line-clamp-3`}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Contact Button - Always at bottom */}
        <div className="border-t border-gray-200 pt-4 mt-auto flex-shrink-0">
          <Link href={`#corporate-event-inquiry-form`} className="w-full bg-gradient-to-r from-caribbeanTurquoise to-cyan-400 hover:from-caribbeanTurquoise/90 hover:to-cyan-400/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-caribbeanTurquoise/25 hover:-translate-y-0.5">
            <span className={`${montserrat.className} text-sm`}>
              {t("Contact Us")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CorporateEventPackageCard
