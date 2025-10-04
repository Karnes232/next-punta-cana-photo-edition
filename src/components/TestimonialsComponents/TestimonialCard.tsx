"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { Testimonial } from '@/sanity/queries/HomePage/Testimonials'
import { urlFor } from '@/sanity/lib/image'

interface TestimonialCardProps {
  testimonial: Testimonial
  locale: "en" | "es"
  onImageClick: (testimonial: Testimonial, index: number) => void
  index: number
}

const TestimonialCard = ({ testimonial, locale, onImageClick, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg mb-4 hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group flex flex-col "
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-gray-200 group-hover:text-gray-300 transition-colors">
        <Quote size={24} />
      </div>

      {/* Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="text-yellow-400 fill-current"
          />
        ))}
      </div>

      {/* Quote - flex-grow to push client info to bottom */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed italic flex-grow">
        "{testimonial.shortQuote[locale]}"
      </blockquote>

      {/* Work Example and Client Info - always at bottom */}
      <div className="mt-auto">
        {/* Work Example Image */}
        {testimonial.photo?.asset?.url && (
          <div className="mb-4 relative group cursor-pointer" onClick={() => onImageClick(testimonial, index)}>
            <Image
              src={urlFor(testimonial.photo).width(600).height(400).quality(90).url()}
              alt={testimonial.photo.alt || `Work example for ${testimonial.name}`}
              width={600}
              height={400}
              className="w-full h-32 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay with zoom icon */}
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
            </div>
          </div>
        )}
        
        {/* Client Info */}
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 text-sm">
            {testimonial.name}
          </h4>
          <p className="text-gray-600 text-xs">
            {testimonial.role[locale]}
          </p>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 pointer-events-none" />
    </motion.div>
  )
}

export default TestimonialCard
