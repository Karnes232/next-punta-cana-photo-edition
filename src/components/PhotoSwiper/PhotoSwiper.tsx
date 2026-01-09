"use client"

import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"
import Lightbox from "@/components/PhotoGrid/Lightbox"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

interface SanityPhoto {
  asset: {
    url: string
    metadata: {
      dimensions: {
        width: number
        height: number
      }
    }
    _type: string
    _ref?: string
  }
  alt: string
}

interface PhotoSwiperProps {
  photos: SanityPhoto[]
}

const PhotoSwiper: React.FC<PhotoSwiperProps> = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Don't render if no photos
  if (!photos || photos.length === 0) {
    return (
      <div className="w-full px-2 sm:px-4 md:px-8">No photos available</div>
    )
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? photos.length - 1 : selectedImage - 1,
      )
    }
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-8">
      <div className="relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          loop={photos.length > 4}
          className="photo-swiper"
        >
          {photos.map((photo, index) => {
            // Check if we have the required asset data
            if (!photo.asset || !photo.asset.url) {
              console.error(`Photo ${index} missing asset or URL:`, photo)
              return null
            }

            return (
              <SwiperSlide key={index}>
                <div
                  className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer aspect-square"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={photo.asset.url}
                    alt={photo.alt || `Photo ${index + 1}`}
                    fill
                    priority={index < 2}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />

                  {/* Hover overlay with zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-12 h-12 text-white drop-shadow-lg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <Lightbox
        photos={photos}
        selectedIndex={selectedImage}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />

      <style jsx global>{`
        .photo-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }

        .photo-swiper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .photo-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
        }

        .photo-swiper .swiper-pagination-bullet-active-main {
          background: #3b82f6;
        }

        .photo-swiper .swiper-pagination-bullet-active-prev,
        .photo-swiper .swiper-pagination-bullet-active-next {
          background: #60a5fa;
        }
      `}</style>
    </div>
  )
}

export default PhotoSwiper
