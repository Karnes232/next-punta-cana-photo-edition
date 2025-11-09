"use client"

import React, { useMemo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Image from "next/image"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type Locale = "en" | "es"

interface NewArrivalImage {
  asset?: {
    url?: string
    metadata?: {
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }
  alt?: {
    en: string
    es: string
  }
}

interface NewArrivalsProps {
  title: string
  subtitle: string
  badge: string
  images: NewArrivalImage[]
  locale: Locale
}

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const createOptimizedUrl = (source?: string, width: number = 900) => {
  if (!source) return ""
  const [base] = source.split("?")
  return `${base}?w=${width}&q=85&auto=format&fit=crop`
}

const NewArrivals: React.FC<NewArrivalsProps> = ({
  title,
  subtitle,
  badge,
  images,
  locale,
}) => {
  const slides = useMemo(
    () =>
      (images || []).filter(
        image => image?.asset?.url && typeof image.asset.url === "string",
      ),
    [images],
  )

  if (!slides.length) {
    return null
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2 text-left">
          {title && (
            <h2
              className={`${cormorant.className} text-3xl tracking-wide text-gray-900 md:text-4xl`}
            >
              {title}
            </h2>
          )}
          <p
            className={`${montserrat.className} text-sm text-gray-500 md:text-base`}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            aria-label={
              locale === "en"
                ? "Previous new arrival"
                : "Anterior nuevo lanzamiento"
            }
            className="new-arrivals-prev rounded-full border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-900 hover:text-white disabled:opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            aria-label={
              locale === "en"
                ? "Next new arrival"
                : "Siguiente nuevo lanzamiento"
            }
            className="new-arrivals-next rounded-full border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-900 hover:text-white disabled:opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5L15.75 12l-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative mt-8">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          centeredSlides={false}
          loop={slides.length > 4}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".new-arrivals-prev",
            nextEl: ".new-arrivals-next",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1280: {
              slidesPerView: 4.2,
            },
          }}
          className="new-arrivals-swiper pb-12"
        >
          {slides.map((image, index) => {
            const imageUrl = createOptimizedUrl(image.asset?.url)
            const displayAlt =
              image.alt?.[locale as keyof typeof image.alt] || "New Arrival"

            return (
              <SwiperSlide key={`${image.asset?.url}-${index}`}>
                <article className="group flex h-full flex-col">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <div className="absolute left-4 top-4 z-30">
                      <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-900 shadow-sm">
                        {badge}
                      </span>
                    </div>
                    <div className="relative h-72 w-full md:h-80 lg:h-96">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={displayAlt}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 22vw"
                          priority={index < 2}
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute inset-x-6 bottom-6 z-20">
                        <h3
                          className={`${cormorant.className} mt-2 text-2xl font-semibold text-white`}
                        >
                          {displayAlt}
                        </h3>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <style jsx global>{`
        .new-arrivals-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .new-arrivals-swiper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.2s ease;
        }

        .new-arrivals-swiper .swiper-pagination-bullet-active {
          background: #111827;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
}

export default NewArrivals
