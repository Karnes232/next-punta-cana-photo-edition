"use client"
import { PhotographyVideoPackages } from "@/sanity/queries/Photography-Video/Photography-video-packages"
import React from "react"
import Link from "next/link"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import { useTranslations } from "next-intl"
import { CheckCircle, Star } from "lucide-react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface PhotographyVideoPackageCardProps {
  package: PhotographyVideoPackages
  locale: string
  isMostPopular?: boolean
}

const PhotographyVideoPackageCard: React.FC<
  PhotographyVideoPackageCardProps
> = ({ package: photoPackage, locale, isMostPopular = false }) => {
  const t = useTranslations("PhotographyVideoPackage")
  const mostPopularLabel = t("Most Popular")

  const title =
    photoPackage.title[locale as "en" | "es"] || photoPackage.title.en
  // const startingPrice = photoPackage.minimumHours * photoPackage.hourlyRate

  // Determine package tier color scheme using brand colors
  const getPackageTierStyles = (packageTitle: string) => {
    const titleLower = packageTitle.toLowerCase()
    if (titleLower.includes("gold")) {
      return {
        borderColor: "border-luxuryGold",
        bgGradient: "from-luxuryGold/10 to-luxuryGold/20",
        badgeColor: "bg-luxuryGold",
        textColor: "text-luxuryGold",
        buttonHover:
          "hover:from-luxuryGold hover:to-yellow-400 hover:shadow-lg hover:shadow-luxuryGold/25",
      }
    } else if (titleLower.includes("silver")) {
      return {
        borderColor: "border-elegantSilver",
        bgGradient: "from-elegantSilver/10 to-elegantSilver/20",
        badgeColor: "bg-elegantSilver",
        textColor: "text-elegantSilver",
        buttonHover:
          "hover:from-elegantSilver hover:to-gray-300 hover:shadow-lg hover:shadow-elegantSilver/25",
      }
    } else if (titleLower.includes("bronze")) {
      return {
        borderColor: "border-caribbeanTurquoise",
        bgGradient: "from-caribbeanTurquoise/10 to-caribbeanTurquoise/20",
        badgeColor: "bg-caribbeanTurquoise",
        textColor: "text-caribbeanTurquoise",
        buttonHover:
          "hover:from-caribbeanTurquoise/20 hover:to-cyan-400/20 hover:shadow-lg hover:shadow-caribbeanTurquoise/25",
      }
    }
    return {
      borderColor: "border-caribbeanTurquoise",
      bgGradient: "from-caribbeanTurquoise/10 to-caribbeanTurquoise/20",
      badgeColor: "bg-caribbeanTurquoise",
      textColor: "text-caribbeanTurquoise",
      buttonHover:
        "hover:from-caribbeanTurquoise hover:to-cyan-400 hover:shadow-lg hover:shadow-caribbeanTurquoise/25",
    }
  }

  const tierStyles = getPackageTierStyles(photoPackage.title.en)

  return (
    <Link
      href={`/photography-video/${photoPackage.slug.current}`}
      className="block h-full w-full"
    >
      <div
        className={`relative flex h-full flex-col rounded-xl border-2 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${tierStyles.borderColor} hover:border-luxuryGold`}
      >
        {isMostPopular && (
          <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-luxuryGold px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-luxuryGold/30">
            <Star className="h-4 w-4 fill-current" />
            <span>{mostPopularLabel}</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 text-center">
          <div
            className={`${tierStyles.bgGradient} mx-auto inline-flex items-center justify-center rounded-full px-4 py-1`}
          >
            <span
              className={`${montserrat.className} text-xs font-semibold uppercase tracking-wide text-darkGray`}
            >
              {title}
            </span>
          </div>
          <h3
            className={`${coromantGaramond.className} mt-4 text-2xl font-semibold text-gray-900`}
          >
            {title}
          </h3>
        </div>

        {/* Included Items */}
        <div className="flex-1">
          <ul className="space-y-3">
            {photoPackage.includedItems.map((item, index) => {
              const itemText = item[locale as "en" | "es"] || item.en
              return (
                <li
                  key={index}
                  className={`${montserrat.className} flex items-start gap-3 text-sm text-gray-600`}
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 text-luxuryGold" />
                  <span>{itemText}</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Price Section */}
        <div className="mt-6 border-t pt-4 text-center">
          <p
            className={`${montserrat.className} mb-1 text-xs font-semibold uppercase text-gray-500`}
          >
            {t("Starting Price")}
          </p>
          <p
            className={`${coromantGaramond.className} text-3xl font-semibold ${tierStyles.textColor}`}
          >
            {photoPackage.startingPrice
              ? `$${photoPackage.startingPrice.toLocaleString()}`
              : t("Contact Us")}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <span
            className={`${montserrat.className} inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ${tierStyles.badgeColor} hover:opacity-90 hover:shadow-lg`}
          >
            {photoPackage.buttonText[locale as "en" | "es"] ||
              photoPackage.buttonText.en}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default PhotographyVideoPackageCard
