import { Testimonial } from "@/sanity/queries/HomePage/Testimonials"
import { useTranslations } from "next-intl"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import Image from "next/image"
import React from "react"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const PhotoshootTestimonialCard = ({
  testimonial,
  locale,
}: {
  testimonial: Testimonial
  locale: "en" | "es"
}) => {
  const t = useTranslations("PhotoshootPackage")
  return (
    <div className="w-full h-full flex flex-col">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full min-h-[500px]">
        <div className="aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={testimonial.photo.asset.url}
            alt={testimonial.name}
            width={testimonial.photo.asset.metadata.dimensions.width}
            height={testimonial.photo.asset.metadata.dimensions.height}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 px-4 py-6">
          <h2
            className={`${coromantGaramond.className} text-center font-bold uppercase tracking-widest text-lg text-stone-800`}
          >
            {t("testimonials")}
          </h2>
          <h3
            className={`${coromantGaramond.className} text-xl text-stone-800 text-center`}
          >
            {testimonial.name}
          </h3>
          <p
            className={`${montserrat.className} text-center text-stone-600 leading-relaxed max-w-sm`}
          >
            <FaQuoteLeft className="text-xs inline-block align-top" size={10} />{" "}
            {testimonial.shortQuote[locale]}{" "}
            <FaQuoteRight
              className="text-xs inline-block align-top"
              size={10}
            />
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-2 gap-8 items-center h-full min-h-[400px]">
        <div className="aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={testimonial.photo.asset.url}
            alt={testimonial.name}
            width={testimonial.photo.asset.metadata.dimensions.width}
            height={testimonial.photo.asset.metadata.dimensions.height}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6 px-4">
          <h2
            className={`${coromantGaramond.className} font-bold uppercase tracking-widest text-xl text-stone-800 mb-10`}
          >
            {t("testimonials")}
          </h2>
          <h3
            className={`${coromantGaramond.className} text-2xl text-stone-800`}
          >
            {testimonial.name}
          </h3>
          <p
            className={`${montserrat.className} text-stone-600 leading-relaxed`}
          >
            <FaQuoteLeft className="text-xs inline-block align-top" size={10} />{" "}
            {testimonial.shortQuote[locale]}{" "}
            <FaQuoteRight
              className="text-xs inline-block align-top"
              size={10}
            />
          </p>
        </div>
      </div>
    </div>
  )
}

export default PhotoshootTestimonialCard
