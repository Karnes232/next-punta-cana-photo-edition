"use client"
import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { Testimonial } from "@/sanity/queries/HomePage/Testimonials"

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  currentImage: Testimonial | null
  allImages: Testimonial[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
  locale: "en" | "es"
}

const Lightbox = ({
  isOpen,
  onClose,
  currentImage,
  allImages,
  currentIndex,
  onPrevious,
  onNext,
  locale,
}: LightboxProps) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          onPrevious()
          break
        case "ArrowRight":
          onNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onPrevious, onNext])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!currentImage) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>

          {/* Navigation buttons */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={e => {
                  e.stopPropagation()
                  onPrevious()
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation()
                  onNext()
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Image container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={e => e.stopPropagation()}
          >
            {currentImage.photo?.asset?.url && (
              <Image
                src={urlFor(currentImage.photo)
                  .width(1200)
                  .height(1200)
                  .quality(95)
                  .url()}
                alt={
                  currentImage.photo.alt ||
                  `Work example for ${currentImage.name}`
                }
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
              />
            )}

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-6 rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2">
                {currentImage.name}
              </h3>
              <p className="text-sm opacity-90 mb-3">
                {currentImage.role[locale]}
              </p>

              {/* Testimonial Quote */}
              <blockquote className="text-base italic leading-relaxed mb-3 border-l-2 border-white/30 pl-4">
                "{currentImage.shortQuote[locale]}"
              </blockquote>

              {allImages.length > 1 && (
                <p className="text-xs opacity-75">
                  {currentIndex + 1} of {allImages.length}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
