'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { useImageProtection } from '@/hooks/useImageProtection'

interface GalleryImage {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
}

interface SwiperGalleryProps {
  title: string
  images: GalleryImage[]
}

const coromantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  })

const MontserratFont = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  })

const SwiperGallery: React.FC<SwiperGalleryProps> = ({ title, images }) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
    useImageProtection()
  // Prepare lightbox slides
  const lightboxSlides = images.map((image) => ({
    src: urlFor(image.asset).quality(90).url(),
    alt: image.alt || 'Gallery image',
  }))

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  if (!images || images.length === 0) {
    return (
      <div className="py-16 px-4">
        <h2 className={`${coromantGaramond.className} tracking-wide text-3xl lg:text-4xl text-center mb-8`}>
          {title}
        </h2>
        <p className={`${MontserratFont.className} text-center text-gray-600`}>No images available</p>
      </div>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className={`${coromantGaramond.className} tracking-wide text-3xl lg:text-4xl text-center mb-12`}>
          {title}
        </h2>

        {/* Swiper Gallery - Clean Implementation */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
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
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              }
            }}
            loop={images.length > 4}
            className="gallery-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {images.map((image, index) => {
              const imageUrl = urlFor(image.asset).width(800).height(600).quality(85).url()
              
              return (
                <SwiperSlide key={index}>
                  <div 
                    className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                      <Image
                        src={imageUrl}
                        alt={image.alt || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={index < 4}
                      />
                      
                      {/* Click overlay - only show icon, no background */}
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
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* Gallery Info */}
        {/* <div className="text-center mt-8">
          <p className={`${MontserratFont.className} text-gray-600 text-sm`}>
            {images.length} {images.length === 1 ? 'photo' : 'photos'} in gallery
          </p>
        </div> */}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        carousel={{
          finite: true,
        }}
        render={{
          slide: ({ slide }) => {
            useImageProtection()
            return (
              <div className="flex items-center justify-center h-full w-full relative">
                <Image
                  src={slide.src}
                  alt={slide.alt || 'Gallery image'}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                  priority={true}
                />
              </div>
            )
          }
        }}
      />

      <style jsx global>{`
        .gallery-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        
        .gallery-swiper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 12px;
          height: 12px;
        }
        
        .gallery-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
        }
        
        .gallery-swiper .swiper-pagination-bullet-active-main {
          background: #3b82f6;
        }
        
        .gallery-swiper .swiper-pagination-bullet-active-prev,
        .gallery-swiper .swiper-pagination-bullet-active-next {
          background: #60a5fa;
        }

        /* Lightbox rounded corners - target lightbox's own classes */
        .yarl__slide img {
          border-radius: 12px !important;
        }
        
        .yarl__slide__content {
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        
        .yarl__slide__image {
          border-radius: 12px !important;
        }
        
        .lightbox-image-container {
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        
        .lightbox-image-container img {
          border-radius: 12px !important;
        }
      `}</style>
    </section>
  )
}

export default SwiperGallery