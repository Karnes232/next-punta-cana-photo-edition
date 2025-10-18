"use client"

import React from "react"
import { WeddingPlannerPackages as WeddingPlannerPackagesType } from "@/sanity/queries/Wedding-Planning/WeddingPlannerPackages"
import { useTranslations } from "next-intl"
import { CheckCircle, Star } from "lucide-react"
import Link from "next/link"

interface WeddingPlannerPackageCardProps {
  packageData: WeddingPlannerPackagesType
  locale: "en" | "es"
}

const WeddingPlannerPackageCard: React.FC<WeddingPlannerPackageCardProps> = ({
  packageData,
  locale,
}) => {
  const t = useTranslations()

  return (
    <div
      className={`relative bg-pureWhite rounded-lg shadow-lg p-6 border-2 transition-all duration-300 hover:shadow-xl flex flex-col h-full ${
        packageData.mostPopular
          ? "border-luxuryGold ring-2 ring-luxuryGold/20"
          : "border-elegantSilver hover:border-luxuryGold"
      }`}
    >
      {/* Most Popular Badge */}
      {packageData.mostPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-luxuryGold text-pureWhite px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      {/* Card Header - Fixed height */}
      <div className="text-center mb-6 h-32 flex flex-col justify-center">
        <h3
          className="text-3xl font-bold text-darkGray mb-2 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {packageData.title[locale]}
        </h3>
        <p
          className="text-elegantSilver text-base overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {packageData.description[locale]}
        </p>
      </div>

      {/* Bullet List - Flexible height */}
      <div className="flex-1 mb-6 text-left">
        <ul className="space-y-3">
          {packageData.includedItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-luxuryGold flex-shrink-0 mt-0.5" />
              <span className="text-darkGray text-sm">{item[locale]}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button - Fixed position from bottom */}
      <div className="text-center mt-auto">
        <Link
          href={`#wedding-planning-inquiry-form`}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-pureWhite transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            packageData.mostPopular
              ? "bg-luxuryGold hover:bg-luxuryGold/90 shadow-lg hover:shadow-xl hover:shadow-luxuryGold/25"
              : "bg-darkGray hover:bg-darkGray/90 hover:shadow-lg hover:shadow-darkGray/25"
          }`}
        >
          {packageData.ctaText[locale]}
        </Link>
      </div>
    </div>
  )
}

export default WeddingPlannerPackageCard
