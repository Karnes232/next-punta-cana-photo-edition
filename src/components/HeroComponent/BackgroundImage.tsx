"use client"
import React, { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const MontserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface HeroImageAsset {
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
}

interface BackgroundImageProps {
  heroImages: HeroImageAsset[]
  fullSize?: boolean
  title?: string
  subtitle?: string
}

const BackgroundImage = ({
  heroImages,
  fullSize = true,
  title,
  subtitle,
}: BackgroundImageProps) => {
  const swiperRef = useRef<any>(null)

  let height = ""
  let blankDivHeight = ""
  if (fullSize) {
    height = "h-[57rem]"
    blankDivHeight = "h-[51rem]"
  } else {
    height = "h-[36.5625rem]"
    blankDivHeight = "h-[30.9375rem]"
  }
  // Helper function to get optimized image URL from Sanity
  const getImageUrl = (url: string, width: number = 1920) => {
    return url.replace("image-upload", `image-upload/w_${width},q_auto,f_auto`)
  }

  // If no images, return a simple div
  if (!heroImages || heroImages.length === 0) {
    return (
      <div
        className={`absolute top-0 w-full ${height} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center`}
      >
        <div className="text-center px-4 max-w-6xl mx-auto">
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`${coromantGaramond.className} text-pureWhite ${fullSize ? "text-5xl md:text-7xl lg:text-8xl xl:text-9xl" : "text-3xl md:text-4xl lg:text-5xl xl:text-6xl"} font-bold mb-6 leading-tight tracking-wide`}
              style={{
                textShadow:
                  "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
                WebkitTextStroke: "1px rgba(255,255,255,0.1)",
              }}
            >
              {title}
            </motion.h1>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className={`${MontserratFont.className} text-pureWhite ${fullSize ? "text-lg md:text-xl lg:text-2xl xl:text-3xl" : "text-base md:text-lg lg:text-xl xl:text-2xl"} font-medium leading-relaxed max-w-4xl mx-auto`}
              style={{
                textShadow:
                  "1px 1px 3px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)",
              }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`absolute top-0 w-full ${height}`}>
        <motion.div
          initial={{ filter: "brightness(0)" }}
          whileInView={{ filter: "brightness(0.6)" }}
          viewport={{ once: true }}
          transition={{
            duration: 6,
            delay: 0.5,
          }}
          className="absolute top-0 left-0 w-full h-full z-0 opacity-100 overflow-hidden brightness-[0.6]"
        >
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full"
          >
            {heroImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={getImageUrl(image.asset.url, 1920)}
                    // src={image.asset.url}
                    alt={image.alt || `Hero background ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Centered content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>

          {/* Text content with enhanced styling */}
          <div className="relative z-10 max-w-6xl mx-auto">
            {title && (
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`${coromantGaramond.className} text-pureWhite ${fullSize ? "text-5xl md:text-7xl lg:text-8xl xl:text-9xl" : "text-3xl md:text-4xl lg:text-5xl xl:text-6xl"} font-bold mb-6 leading-tight tracking-wide`}
                style={{
                  textShadow:
                    "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
                  WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                }}
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className={`${MontserratFont.className} text-pureWhite ${fullSize ? "text-lg md:text-xl lg:text-2xl xl:text-3xl" : "text-base md:text-lg lg:text-xl xl:text-2xl"} font-medium leading-relaxed max-w-4xl mx-auto`}
                style={{
                  textShadow:
                    "1px 1px 3px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)",
                }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </div>
      <div className={`${blankDivHeight}`}></div>
    </>
  )
}

export default BackgroundImage
