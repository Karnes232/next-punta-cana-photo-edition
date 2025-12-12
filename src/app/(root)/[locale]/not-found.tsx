"use client"

import { Cormorant_Garamond, Montserrat } from "next/font/google"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import React from "react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function NotFound() {
  const t = useTranslations("notFound")

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto w-full text-center">
        {/* 404 Number Display */}
        <div className="mb-8">
          <h1
            className={`${coromantGaramond.className} text-5xl font-bold text-darkGray opacity-20 leading-none`}
          >
            {t("title")}
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <h2
            className={`${coromantGaramond.className} text-4xl md:text-5xl lg:text-6xl font-semibold text-darkGray mb-6`}
          >
            {t("heading")}
          </h2>

          <p
            className={`${montserrat.className} text-lg md:text-xl text-gray-600 mb-10 leading-relaxed`}
          >
            {t("description")}
          </p>

          {/* Back to Home Button */}
          <div className="mt-10">
            <Link
              href="/"
              className={`${montserrat.className} inline-block no-underline border py-3 px-8 md:px-10 text-lg rounded-3xl text-gray-600 border-gray-400 transition duration-500 hover:bg-darkGray hover:text-white hover:border-darkGray`}
              aria-label={t("backToHome")}
            >
              {t("backToHome")}
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center items-center gap-3">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-elegantSilver to-luxuryGold"></div>
          <div className="w-3 h-3 rounded-full bg-luxuryGold opacity-60"></div>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-elegantSilver to-caribbeanTurquoise"></div>
        </div>
      </div>
    </main>
  )
}

