"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

type PortfolioImage = {
  asset: {
    url: string
    metadata?: {
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }
  alt?: string
}

interface PortfolioImagesProps {
  portfolioImages: PortfolioImage[]
  className?: string
}

const PortfolioImages: React.FC<PortfolioImagesProps> = ({
  portfolioImages,
  className = "",
}) => {
  if (!portfolioImages || portfolioImages.length === 0) {
    return null
  }

  return (
    <div
      className={`w-full max-w-md mx-auto md:mx-0 md:w-5/12 lg:w-2/5 lg:max-w-md xl:max-w-xl ${className}`}
    >
      <Swiper
        className="portfolio-images-swiper h-full"
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        loop={portfolioImages.length > 1}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        //   bulletClass: "swiper-pagination-bullet portfolio-bullet",
        //   bulletActiveClass: "portfolio-bullet-active",
        // }}
      >
        {portfolioImages.map((image, index) => (
          <SwiperSlide key={`${image.asset.url}-${index}`}>
            <div className="relative h-full w-full">
              <div
                className="relative w-full overflow-hidden rounded-2xl shadow-lg"
                style={{ aspectRatio: "3 / 4" }}
              >
                <Image
                  src={image.asset.url}
                  alt={image.alt || `Wedding portfolio image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 35vw, (max-width: 1280px) 30vw, 350px"
                  className="object-cover"
                  priority={index === 0}
                  quality={85}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .portfolio-images-swiper {
          width: 100%;
        }

        .portfolio-images-swiper .swiper-pagination {
          position: relative;
          margin-top: 1rem;
        }

        .portfolio-bullet {
          background: #d4d4d8;
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: background-color 0.3s ease;
        }

        .portfolio-bullet-active {
          background: #0f172a;
        }
      `}</style>
    </div>
  )
}

export default PortfolioImages
