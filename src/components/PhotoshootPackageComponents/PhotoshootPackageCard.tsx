"use client"
import { PhotoshootsPackages } from '@/sanity/queries/Photoshoot/PhotoshootsPackages'
import React from 'react'
import Image from 'next/image'
import { Cormorant_Garamond, Montserrat } from "next/font/google"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface PhotoshootPackageCardProps {
  photoPackage: PhotoshootsPackages
  locale: string
}

const PhotoshootPackageCard: React.FC<PhotoshootPackageCardProps> = ({ photoPackage, locale }) => {


  const title = photoPackage.title[locale as "en" | "es"] || photoPackage.title.en
  const description = photoPackage.description[locale as "en" | "es"] || photoPackage.description.en
  const imageUrl = photoPackage.cardImage?.asset?.url
  const imageAlt = photoPackage.alt || title

  if (!imageUrl) return null

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group w-full">
      {/* Image */}
      <div className="relative overflow-hidden h-64">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h3
          className={`${coromantGaramond.className} text-2xl font-semibold text-gray-900 mb-2 line-clamp-2`}
        >
          {title}
        </h3>
        <p
          className={`${montserrat.className} text-gray-600 text-sm leading-relaxed line-clamp-3`}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default PhotoshootPackageCard