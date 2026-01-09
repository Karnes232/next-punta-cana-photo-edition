"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface VimeoVideoProps {
  vimeoUrl: string
}

const VimeoVideo: React.FC<VimeoVideoProps> = ({ vimeoUrl }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Extract Vimeo video ID from URL
  const getVimeoId = (url: string): string | null => {
    const regex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const videoId = getVimeoId(vimeoUrl)

  const handleOpenFullscreen = () => {
    setIsFullscreen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
  }

  const handleCloseFullscreen = () => {
    setIsFullscreen(false)
    document.body.style.overflow = "unset"
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        handleCloseFullscreen()
      }
    }

    if (isFullscreen) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isFullscreen, handleCloseFullscreen])

  // Early return after all hooks
  if (!videoId) {
    console.error("Invalid Vimeo URL")
    return null
  }

  // Vimeo embed URLs
  const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`
  const thumbnailUrl = `https://vumbnail.com/${videoId}.jpg`

  return (
    <>
      {/* Preview/Thumbnail */}
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={handleOpenFullscreen}
      >
        {/* Thumbnail Image */}
        <div className="absolute inset-0 bg-gray-900">
          <Image
            src={thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
            quality={85}
            loading="lazy"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-4 group-hover:bg-white group-hover:scale-110 transition-transform duration-300">
            <Play className="w-12 h-12 text-gray-900 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4"
          onClick={handleCloseFullscreen}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 z-10 transition-colors duration-200"
            aria-label="Close video"
          >
            ×
          </button>

          {/* Video Container */}
          <div
            className="relative w-full max-w-7xl aspect-video"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className="w-full h-full rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vimeo video player"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default VimeoVideo

