"use client"

import nextDynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Testimonial } from "@/sanity/queries/HomePage/Testimonials"

// SwiperGallery is heavy (Swiper + Lightbox) - lazy load client-side only
const SwiperGallery = nextDynamic(
  () => import("@/components/SwiperGallery/SwiperGallery"),
  {
    loading: () => (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-12 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse aspect-[4/3] bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false, // Client-side only for true lazy loading
  }
)

// TestimonialsComponent uses Swiper - lazy load client-side only
const TestimonialsComponent = nextDynamic(
  () => import("@/components/TestimonialsComponents/TestimonialComponent"),
  {
    loading: () => (
      <section className="py-16 px-5 md:px-10 bg-elegantSilver/20">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-12 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: false, // Client-side only for true lazy loading
  }
)

interface GalleryImage {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
}

interface LazyLoadedSectionsProps {
  galleryTitle: string
  galleryImages: GalleryImage[]
  testimonialsLocale: "en" | "es"
  testimonialsTitle: string
  testimonials: Testimonial[]
}

export default function LazyLoadedSections({
  galleryTitle,
  galleryImages,
  testimonialsLocale,
  testimonialsTitle,
  testimonials,
}: LazyLoadedSectionsProps) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Use Intersection Observer to load components when they're about to be visible
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before the component is visible
      }
    )

    const target = document.getElementById("lazy-sections-trigger")
    if (target) {
      observer.observe(target)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Trigger element for intersection observer */}
      <div id="lazy-sections-trigger" className="h-1" />
      {shouldLoad && (
        <>
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <SwiperGallery title={galleryTitle} images={galleryImages} />
          </div>
          <TestimonialsComponent
            locale={testimonialsLocale}
            titleTestimonials={testimonialsTitle}
            testimonials={testimonials}
          />
        </>
      )}
    </>
  )
}
