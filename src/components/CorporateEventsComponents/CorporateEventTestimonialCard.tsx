"use client"
import React from "react"
import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import Image from "next/image"
import { CorporateEventTestimonials } from "@/sanity/queries/CorporateEvents/CorporateEvents"
import { urlFor } from "@/sanity/lib/image"

interface CorporateEventTestimonialCardProps {
  testimonial: CorporateEventTestimonials
  locale: "en" | "es"
  index: number
}

const CorporateEventTestimonialCard = ({
  testimonial,
  locale,
  index,
}: CorporateEventTestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group flex flex-col h-full"
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-gray-200 group-hover:text-gray-300 transition-colors">
        <Quote size={24} />
      </div>

      {/* Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed italic flex-grow">
        "{testimonial.testimonial[locale]}"
      </blockquote>

      {/* Company Logo */}
      {testimonial.companyLogo?.asset?.url && (
        <div className="mb-4 flex justify-center">
          <div className="relative w-20 h-20">
            <Image
              src={urlFor(testimonial.companyLogo)
                .width(120)
                .height(120)
                .quality(90)
                .url()}
              alt={testimonial.companyLogo.alt || testimonial.companyName}
              width={120}
              height={60}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Client Info */}
      <div className="text-center mt-auto">
        <h4 className="font-semibold text-gray-900 text-sm mb-1">
          {testimonial.clientName}
        </h4>
        <p className="text-gray-600 text-xs mb-1">
          {testimonial.clientRole[locale]}
        </p>
        <p className="text-gray-500 text-xs font-medium">
          {testimonial.companyName}
        </p>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 pointer-events-none" />
    </motion.div>
  )
}

export default CorporateEventTestimonialCard
