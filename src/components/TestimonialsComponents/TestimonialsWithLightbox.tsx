"use client"
import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Testimonial } from "@/sanity/queries/HomePage/Testimonials"
import TestimonialCard from "./TestimonialCard"
import Lightbox from "./Lightbox"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface TestimonialsWithLightboxProps {
  testimonials: Testimonial[]
  locale: "en" | "es"
}

const TestimonialsWithLightbox = ({
  testimonials,
  locale,
}: TestimonialsWithLightboxProps) => {
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
    setCurrentImageIndex(prev =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    )
  }

  const handleNext = () => {
    setCurrentImageIndex(prev =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    )
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-testimonials",
            prevEl: ".swiper-button-prev-testimonials",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-testimonials",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="testimonials-swiper !h-auto"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial._id} className="!h-auto">
              <div className="h-full flex">
                <TestimonialCard
                  testimonial={testimonial}
                  locale={locale}
                  onImageClick={handleImageClick}
                  index={index}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button className="swiper-button-prev-testimonials bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="swiper-pagination-testimonials"></div>

          <button className="swiper-button-next-testimonials bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
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
