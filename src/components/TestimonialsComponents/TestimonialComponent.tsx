import React from "react"
import { getTestimonials } from "@/sanity/queries/HomePage/Testimonials"
import { getSectionTitles } from "@/sanity/queries/HomePage/SectionTitles"
import TextComponent from "../TextComponent/TextComponent"
import TestimonialCard from "./TestimonialCard"
import TestimonialsWithLightbox from "./TestimonialsWithLightbox"

const TestimonialComponent = async ({ locale }: { locale: "en" | "es" }) => {
  const testimonials = await getTestimonials()
  const sectionTitles = await getSectionTitles()

  return (
    <section className="py-16 px-5 md:px-10 bg-elegantSilver/20">
      <div className="max-w-7xl mx-auto">
        <TextComponent
          title={sectionTitles.titleTestimonials[locale]}
          className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
        />

        {testimonials && testimonials.length > 0 && (
          <TestimonialsWithLightbox
            testimonials={testimonials}
            locale={locale}
          />
        )}
      </div>
    </section>
  )
}

export default TestimonialComponent
