"use client"
import React from "react"
import { CorporateEventTestimonials } from "@/sanity/queries/CorporateEvents/CorporateEvents"
import CorporateEventTestimonialCard from "./CorporateEventTestimonialCard"

interface CorporateEventTestimonialsComponentProps {
  testimonials: CorporateEventTestimonials[]
  locale: "en" | "es"
  title?: {
    en: string
    es: string
  }
}

const CorporateEventTestimonialsComponent = ({
  testimonials,
  locale,
  title,
}: CorporateEventTestimonialsComponentProps) => {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-5 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title[locale]}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <CorporateEventTestimonialCard
              key={`${testimonial.clientName}-${index}`}
              testimonial={testimonial}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CorporateEventTestimonialsComponent
