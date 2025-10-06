"use client"
import { Testimonial } from "@/sanity/queries/HomePage/Testimonials"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Autoplay, Pagination, Navigation } from "swiper/modules"
import PhotoshootTestimonialCard from "./PhotoshootTestimonialCard"

const PhotoshootTestimonials = ({
  testimonials,
  locale,
}: {
  testimonials: Testimonial[]
  locale: "en" | "es"
}) => {
  return (
    <div className="flex flex-col max-w-5xl mx-5 my-5 lg:p-2 xl:mx-auto">
      <div className={`w-full`}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={true}
          loop={true}
          navigation={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            type: "fraction",
          }}
          className={`testimonialSwiper h-[600px] md:h-[500px]`}
        >
          {testimonials.map((testimonial, index) => {
            return (
              <SwiperSlide className={`relative h-full w-full`} key={index}>
                <PhotoshootTestimonialCard
                  testimonial={testimonial}
                  locale={locale}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default PhotoshootTestimonials
