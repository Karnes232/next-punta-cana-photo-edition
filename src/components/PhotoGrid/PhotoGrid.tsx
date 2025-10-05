'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

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
    return <div className="w-full px-2 sm:px-4 md:px-8">No photos available</div>
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
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1)
    }
  }


  return (
    <div className="w-full px-2 sm:px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {photos.map((photo, index) => {
          // Check if we have the required asset data
          if (!photo.asset || !photo.asset.url) {
            console.error(`Photo ${index} missing asset or URL:`, photo)
            return null
          }
          
          // Get the base URL without query parameters
          const baseUrl = photo.asset.url.split('?')[0]
          // Add quality and format parameters for better image quality
          const optimizedUrl = `${baseUrl}?q=100&fm=webp&fit=max&w=800`
          
          const aspectRatio = photo.asset.metadata?.dimensions?.height 
            ? photo.asset.metadata.dimensions.width / photo.asset.metadata.dimensions.height 
            : 1
          
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              style={{ aspectRatio: aspectRatio }}
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
            </div>
          )
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