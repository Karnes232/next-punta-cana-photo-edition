"use client"
import React, { useState } from 'react'
import { Testimonial } from '@/sanity/queries/HomePage/Testimonials'
import TestimonialCard from './TestimonialCard'
import Lightbox from './Lightbox'

interface TestimonialsWithLightboxProps {
  testimonials: Testimonial[]
  locale: "en" | "es"
}

const TestimonialsWithLightbox = ({ testimonials, locale }: TestimonialsWithLightboxProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (testimonial: Testimonial, index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false)
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial._id}
            testimonial={testimonial}
            locale={locale}
            onImageClick={handleImageClick}
            index={index}
          />
        ))}
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        currentImage={testimonials[currentImageIndex] || null}
        allImages={testimonials}
        currentIndex={currentImageIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        locale={locale}
      />
    </>
  )
}

export default TestimonialsWithLightbox
