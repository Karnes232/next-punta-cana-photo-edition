"use client"

import React, { useState } from "react"
import Image from "next/image"
import Lightbox from "./Lightbox"

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

interface PhotoGridProps {
  photos: SanityPhoto[]
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
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

  // Determine how many photos to show based on screen size
  const getVisiblePhotos = () => {
    // For mobile and md screens: show first 4 photos
    // For lg screens: show first 6 photos
    // For xl screens: show first 8 photos
    return {
      mobile: photos.slice(0, 4),
      lg: photos.slice(0, 6),
      xl: photos.slice(0, 8),
    }
  }

  const {
    mobile: mobilePhotos,
    lg: lgPhotos,
    xl: xlPhotos,
  } = getVisiblePhotos()
  const remainingMobile = photos.length - 4
  const remainingLg = photos.length - 6
  const remainingXl = photos.length - 8

  // Calculate grid classes based on number of photos
  const getGridClasses = (
    photoCount: number,
    screenSize: "mobile" | "lg" | "xl",
  ) => {
    if (screenSize === "mobile") {
      if (photoCount <= 2) return "grid-cols-1 sm:grid-cols-2"
      return "grid-cols-1 sm:grid-cols-2"
    }
    if (screenSize === "lg") {
      if (photoCount <= 2) return "grid-cols-2"
      if (photoCount <= 4) return "grid-cols-2"
      return "grid-cols-3"
    }
    if (screenSize === "xl") {
      if (photoCount <= 2) return "grid-cols-2"
      if (photoCount <= 4) return "grid-cols-2"
      if (photoCount <= 6) return "grid-cols-3"
      return "grid-cols-4"
    }
    return ""
  }

  const renderPhoto = (
    photo: SanityPhoto,
    index: number,
    showOverlay: boolean = false,
    remainingCount: number = 0,
  ) => {
    // Check if we have the required asset data
    if (!photo.asset || !photo.asset.url) {
      console.error(`Photo ${index} missing asset or URL:`, photo)
      return null
    }

    // Get the base URL without query parameters
    const baseUrl = photo.asset.url.split("?")[0]
    // Add quality and format parameters for better image quality
    const optimizedUrl = `${baseUrl}?q=100&fm=webp&fit=max&w=800`

    return (
      <div
        key={index}
        className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer aspect-square"
        onClick={() => openLightbox(index)}
      >
        <Image
          src={optimizedUrl}
          alt={photo.alt || `Photo ${index + 1}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          quality={100}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">+{remainingCount}</div>
              <div className="text-sm">more photos</div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-8">
      {/* Mobile and MD screens - show first 4 photos */}
      <div
        className={`grid ${getGridClasses(mobilePhotos.length, "mobile")} gap-4 lg:hidden`}
      >
        {mobilePhotos.map((photo, index) => {
          // Show overlay on the 4th image (index 3) if there are more than 4 photos
          const showOverlay = index === 3 && remainingMobile > 0
          return renderPhoto(photo, index, showOverlay, remainingMobile)
        })}
      </div>

      {/* LG screens - show first 6 photos */}
      <div
        className={`hidden lg:grid xl:hidden ${getGridClasses(lgPhotos.length, "lg")} gap-4`}
      >
        {lgPhotos.map((photo, index) => {
          // Show overlay on the 6th image (index 5) if there are more than 6 photos
          const showOverlay = index === 5 && remainingLg > 0
          return renderPhoto(photo, index, showOverlay, remainingLg)
        })}
      </div>

      {/* XL screens - show first 8 photos */}
      <div
        className={`hidden xl:grid ${getGridClasses(xlPhotos.length, "xl")} gap-4`}
      >
        {xlPhotos.map((photo, index) => {
          // Show overlay on the 8th image (index 7) if there are more than 8 photos
          const showOverlay = index === 7 && remainingXl > 0
          return renderPhoto(photo, index, showOverlay, remainingXl)
        })}
      </div>

      <Lightbox
        photos={photos}
        selectedIndex={selectedImage}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  )
}

export default PhotoGrid
