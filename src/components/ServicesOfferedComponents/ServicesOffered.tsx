import React from "react"
import TextComponent from "../TextComponent/TextComponent"
import { getServiceCard } from "@/sanity/queries/ServicesOffered/ServicesOffered"
import ServiceCard from "./ServiceCard"
import { getSectionTitles } from "@/sanity/queries/HomePage/SectionTitles"
import { getTranslations } from "next-intl/server"
import { Montserrat } from "next/font/google"

const MontserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const ServicesOffered = async ({ locale }: { locale: "en" | "es" }) => {
  const serviceCards = await getServiceCard()
  const sectionTitles = await getSectionTitles()
  const t = await getTranslations("homePage")
  return (
    <section className="py-16 px-5 md:px-10">
      <TextComponent
        title={sectionTitles.titleServicesOffered[locale]}
        className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
      />

      {serviceCards.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          {/* CSS Masonry Layout - Clean and performant */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {serviceCards
              .filter(
                service => service.heroImage && service.heroImage.length > 0,
              )
              .map((service, index) => (
                <div
                  key={`service-${index}`}
                  className="break-inside-avoid mb-6"
                >
                  <ServiceCard service={service} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p className={`${MontserratFont.className} text-center text-gray-500`}>
          {t("noServicesAvailable")}
        </p>
      )}
    </section>
  )
}

export default ServicesOffered
