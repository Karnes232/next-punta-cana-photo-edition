"use client"
import { PhotographyVideoPackages } from "@/sanity/queries/Photography-Video/Photography-video-packages"
import React from "react"
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

interface PhotographyVideoPackageCardProps {
  package: PhotographyVideoPackages
  locale: string
}

const PhotographyVideoPackageCard: React.FC<
  PhotographyVideoPackageCardProps
> = ({ package: photoPackage, locale }) => {
  const t = useTranslations("PhotographyVideoPackage")

  const title =
    photoPackage.title[locale as "en" | "es"] || photoPackage.title.en
  const description =
    photoPackage.description[locale as "en" | "es"] ||
    photoPackage.description.en
  const startingPrice = photoPackage.minimumHours * photoPackage.hourlyRate

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
      href={`/weddings/photography-video/${photoPackage.slug.current}`}
      className="block w-full h-full"
    >
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group w-full h-full flex flex-col cursor-pointer border-2 ${tierStyles.borderColor}`}
      >
        {/* Header with package tier badge */}
        <div className={`${tierStyles.bgGradient} p-4 border-b`}>
          <div className="flex items-center justify-center">
            <span
              className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${tierStyles.badgeColor}`}
            >
              {title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center flex flex-col flex-grow">
          <div className="flex-grow">
            <h3
              className={`${coromantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}
            >
              {title}
            </h3>

            <div className="mb-6">
              <p
                className={`${montserrat.className} text-gray-600 text-sm leading-relaxed`}
              >
                {description}
              </p>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <p
                className={`${montserrat.className} text-sm font-semibold text-gray-800 mb-2`}
              >
                {t("Starting Price")}
              </p>
              <p
                className={`${coromantGaramond.className} text-3xl font-semibold ${tierStyles.textColor}`}
              >
                {startingPrice
                  ? `$${startingPrice.toLocaleString()}`
                  : t("Contact Us")}
              </p>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="mt-auto flex-shrink-0">
            <div
              className={`inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-500 ease-in-out group-hover:scale-105 bg-gradient-to-r ${tierStyles.badgeColor} ${tierStyles.buttonHover} hover:transition-all hover:duration-300`}
            >
              <span className={`${montserrat.className} text-sm`}>
                {photoPackage.buttonText[locale as "en" | "es"] ||
                  photoPackage.buttonText.en}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PhotographyVideoPackageCard
