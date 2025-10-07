"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Autoplay, Pagination, Navigation } from "swiper/modules"
import Image from "next/image"
interface PackageSwiperGalleryProps {
  images: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
}

const PackageSwiperGallery = ({ images }: PackageSwiperGalleryProps) => {
  const photoListEdited: {
    src: string
    alt: string
    width: number
    height: number
  }[] = []
  const HeroStyles = {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
  }
  const imageHeight = "h-[15rem] md:h-[29rem] lg:h-[35rem] xl:h-[26rem]"
  const slideHeight = "h-[17.5rem] md:h-[32rem] lg:h-[38rem] xl:h-[28rem]"

  images.forEach(image => {
    photoListEdited.push({
      src: image.asset.url,
      alt: image.alt,
      width: image.asset.metadata.dimensions.width,
      height: image.asset.metadata.dimensions.height,
    })
  })
  return (
    <>
      <div className={`w-full ${slideHeight}`}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          // lazy={"true"}
          centeredSlides={true}
          breakpoints={{
            768: {
              slidesPerView: 1.7,
            },
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          //navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{
            type: "fraction",
          }}
          className={`mySwiper  ${slideHeight} h-60`}
        >
          {photoListEdited.map((image, index) => {
            return (
              <SwiperSlide
                className={`relative object-cover object-center h-full w-full ${imageHeight}`}
                key={index}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover object-center ${imageHeight}`}
                  width={image.width}
                  height={image.height}
                  quality={90}
                  priority={index < 4}
                />
                <div
                  className={`absolute inset-0 ${imageHeight}`}
                  style={HeroStyles}
                ></div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}

export default PackageSwiperGallery
