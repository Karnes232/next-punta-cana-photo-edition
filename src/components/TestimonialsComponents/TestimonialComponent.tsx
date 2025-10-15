import React from "react"
import { Testimonial } from "@/sanity/queries/HomePage/Testimonials"
import TextComponent from "../TextComponent/TextComponent"
import TestimonialsWithLightbox from "./TestimonialsWithLightbox"

const TestimonialComponent = async ({ locale, titleTestimonials, testimonials }: { locale: "en" | "es", titleTestimonials: string, testimonials: Testimonial[] }) => {


  return (
    <section className="py-16 px-5 md:px-10 bg-elegantSilver/20">
      <div className="max-w-7xl mx-auto">
        <TextComponent
          title={titleTestimonials}
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
