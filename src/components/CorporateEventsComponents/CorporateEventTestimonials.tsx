"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { CorporateEventTestimonials } from "@/sanity/queries/CorporateEvents/CorporateEvents"
import CorporateEventTestimonialCard from "./CorporateEventTestimonialCard"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

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
    <section className="py-16 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title[locale]}
            </h2>
            <div className="w-24 h-1 bg-caribbeanTurquoise mx-auto rounded-full"></div>
          </div>
        )}

        {/* Testimonials Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            //navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
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
            loop={testimonials.length > 3}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={`${testimonial.clientName}-${index}`}>
                <CorporateEventTestimonialCard
                  testimonial={testimonial}
                  locale={locale}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #0891b2;
          background: white;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .testimonials-swiper .swiper-button-next:hover,
        .testimonials-swiper .swiper-button-prev:hover {
          background: #0891b2;
          color: white;
          transform: scale(1.1);
        }

        .testimonials-swiper .swiper-button-next:after,
        .testimonials-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .testimonials-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }

        .testimonials-swiper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #0891b2;
          transform: scale(1.2);
        }

        .testimonials-swiper .swiper-pagination-bullet-active-main {
          background: #0891b2;
        }

        .testimonials-swiper .swiper-pagination-bullet-active-prev,
        .testimonials-swiper .swiper-pagination-bullet-active-next {
          background: #40e0d0;
        }

        /* Ensure cards maintain equal height in swiper */
        .testimonials-swiper .swiper-slide {
          height: auto;
          display: flex;
        }

        .testimonials-swiper .swiper-slide > div {
          width: 100%;
        }
      `}</style>
    </section>
  )
}

export default CorporateEventTestimonialsComponent
