import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Photo } from 'react-photo-album'
import { ServiceCard as ServiceCardType } from '@/sanity/queries/ServicesOffered/ServicesOffered'
import { useLocale } from 'next-intl'
import { Cormorant_Garamond } from 'next/font/google'

const coromantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  })


interface ServiceCardProps {
  service: ServiceCardType
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const locale = useLocale()
  
  // Get the first image from heroImage array
  const image = service.heroImage[0]
  
  if (!image) return null
  
  // Create photo object for react-photo-album
  const photo: Photo = {
    src: image.asset.url,
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
    alt: image.alt || service.title[locale as 'en' | 'es'] || 'Service image'
  }

  return (
    <Link 
      href={`/${service.slug.current}`}
      className="block group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt || 'Service image'}
          width={photo.width}
          height={photo.height}
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
          style={{
            aspectRatio: `${photo.width} / ${photo.height}`,
            minHeight: '200px',
            maxHeight: '400px'
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      
      {/* Content */}
      <div className="p-6 text-center">
        <h3 className={`${coromantGaramond.className} text-xl font-semibold text-gray-900 mb-3`}>
          {service.title[locale as 'en' | 'es']}
        </h3>
        <p className={`${coromantGaramond.className} text-gray-600 text-sm leading-relaxed mb-4`}>
          {service.subtitle[locale as 'en' | 'es']}
        </p>
        {/* Arrow - visible on mobile/tablet, visible on hover for desktop */}
        <div className="flex justify-center">
          <svg 
            className="w-10 h-5 text-gray-600 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 40 24"
          >
            <line x1="2" y1="12" x2="26" y2="12" strokeWidth={1.5} strokeLinecap="round" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M26 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default ServiceCard
