"use client"
import { PhotoshootsPackages } from "@/sanity/queries/Photoshoot/PhotoshootsPackages"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import { useTranslations } from "next-intl"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface PhotoshootPackageCardProps {
  photoPackage: PhotoshootsPackages
  locale: string
}

const PhotoshootPackageCard: React.FC<PhotoshootPackageCardProps> = ({
  photoPackage,
  locale,
}) => {
  const t = useTranslations("PhotoshootPackage")

  const title =
    photoPackage.title[locale as "en" | "es"] || photoPackage.title.en
  const description =
    photoPackage.description[locale as "en" | "es"] ||
    photoPackage.description.en
  const imageUrl = photoPackage.cardImage?.asset?.url
  const imageAlt = photoPackage.alt || title
  const includedItems =
    photoPackage.includedItems?.map(
      item => item[locale as "en" | "es"] || item.en,
    ) || []
  const startingPrice = photoPackage.startingPrice

  if (!imageUrl) return null

  // Debug logging

  return (
    <Link
      href={`/photoshoots/${photoPackage.slug.current}`}
      className="block w-full h-full"
    >
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
        <div className="p-5 text-center flex flex-col flex-grow">
          <div className="flex-grow">
            <h3
              className={`${coromantGaramond.className} text-2xl font-semibold text-gray-900 mb-2 line-clamp-2`}
            >
              {title}
            </h3>
            <p
              className={`${montserrat.className} text-gray-600 text-sm leading-relaxed mb-4 h-20 overflow-hidden`}
            >
              {description}
            </p>

            {/* Included Items */}
            {includedItems.length > 0 && (
              <div className="mb-4">
                <h4
                  className={`${montserrat.className} text-sm font-semibold text-gray-800 mb-2`}
                >
                  {t("includedItems")}
                </h4>
                <ul className="space-y-1">
                  {includedItems.map((item, index) => (
                    <li
                      key={index}
                      className={`${montserrat.className} text-xs text-gray-600 flex items-center`}
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Starting Price - Always at bottom */}
          <div className="border-t pt-3 mt-auto flex-shrink-0">
            <p
              className={`${montserrat.className} text-sm font-semibold text-gray-800`}
            >
              {t("startingPrice")}
            </p>
            <p
              className={`${coromantGaramond.className} text-xl font-semibold text-gray-900`}
            >
              {startingPrice
                ? `$${startingPrice.toLocaleString()}`
                : t("priceNotAvailable")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PhotoshootPackageCard
