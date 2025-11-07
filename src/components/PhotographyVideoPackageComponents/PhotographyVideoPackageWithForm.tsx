"use client"

import React from "react"
import { useTranslations } from "next-intl"
import PhotographyVideoPackageForm from "../Forms/PhotographyVideoPackageForm"

interface Addition {
  title: {
    en: string
    es: string
  }
  price: number
  fixedorhourly: string
}

interface PhotographyVideoPackageWithFormProps {
  packageData: {
    title: { en: string; es: string }
    startingPrice: number
    includedItems: { en: string; es: string }[]
  }
  locale: "en" | "es"
}

const PhotographyVideoPackageWithForm = ({
  packageData,
  locale,
}: PhotographyVideoPackageWithFormProps) => {
  const t = useTranslations("PhotographyVideoPackage")
  const includedItems = packageData.includedItems
    ?.map(item => item[locale] || item.en)
    .filter(Boolean)

  return (
    <div className="space-y-8">
      {includedItems && includedItems.length > 0 && (
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-pureWhite rounded-2xl shadow-lg p-6 border border-elegantSilver/40 text-left">
            <h3 className="text-2xl font-semibold text-darkGray mb-4">
              {t("includedItems")}
            </h3>
            <ul className="grid gap-3 md:grid-cols-2">
              {includedItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-darkGray"
                >
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-caribbeanTurquoise" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <PhotographyVideoPackageForm
        packageData={packageData}
        // calculatorData={calculatorData}
        locale={locale}
      />
    </div>
  )
}

export default PhotographyVideoPackageWithForm
