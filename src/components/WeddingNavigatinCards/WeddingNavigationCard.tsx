import { Cormorant_Garamond, Montserrat } from "next/font/google"
import Link from "next/link"
import React from "react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const WeddingNavigationCard = ({
  href,
  title,
  paragraph,
  locale,
  svgPath,
  svg2ndPath,
}: {
  href: string
  title: string
  paragraph: string
  locale: string
  svgPath: string
  svg2ndPath: string
}) => {
  return (
    <Link
      href={href}
      className="group bg-pureWhite rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-elegantSilver/30 hover:border-luxuryGold/50"
    >
      <div className="p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-luxuryGold to-caribbeanTurquoise rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-pureWhite"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={svgPath}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={svg2ndPath}
              />
            </svg>
          </div>
        </div>
        <h3
          className={`${coromantGaramond.className} text-2xl lg:text-3xl font-semibold text-darkGray mb-3 group-hover:text-luxuryGold transition-colors duration-300`}
        >
          {title}
        </h3>
        <p
          className={`${montserrat.className} text-elegantSilver text-base leading-relaxed mb-6 group-hover:text-darkGray transition-colors duration-300`}
        >
          {paragraph}
        </p>
        <div className="flex justify-center">
          <svg
            className="w-10 h-5 text-caribbeanTurquoise opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 40 24"
          >
            <line
              x1="2"
              y1="12"
              x2="26"
              y2="12"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M26 6l6 6-6 6"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default WeddingNavigationCard
