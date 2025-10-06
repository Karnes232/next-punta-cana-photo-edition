"use client"

import React from "react"
import Image from "next/image"

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

interface LightboxProps {
  photos: SanityPhoto[]
  selectedIndex: number | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const Lightbox: React.FC<LightboxProps> = ({
  photos,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  if (selectedIndex === null) return null

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowRight") onNext()
    if (e.key === "ArrowLeft") onPrev()
  }

  const currentPhoto = photos[selectedIndex]
  const optimizedUrl =
    currentPhoto.asset.url.split("?")[0] + "?q=100&fm=webp&fit=max&w=1200"

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-7xl max-h-full p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300 z-10"
        >
          ×
        </button>

        <button
          onClick={e => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-gray-300 z-10"
        >
          ‹
        </button>

        <button
          onClick={e => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-gray-300 z-10"
        >
          ›
        </button>

        <div className="relative">
          <Image
            src={optimizedUrl}
            alt={currentPhoto.alt || `Photo ${selectedIndex + 1}`}
            width={currentPhoto.asset.metadata?.dimensions?.width || 1200}
            height={currentPhoto.asset.metadata?.dimensions?.height || 800}
            className="max-w-full max-h-[90vh] object-contain"
            quality={90}
            priority
          />
        </div>

        <div className="text-white text-center mt-4">
          <p className="text-lg">
            {currentPhoto.alt || `Photo ${selectedIndex + 1}`}
          </p>
          <p className="text-sm text-gray-300">
            {selectedIndex + 1} of {photos.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
