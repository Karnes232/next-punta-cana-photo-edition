import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface PhotographyVideoPackages {
  _id: string
  title: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
  description: {
    en: string
    es: string
  }
  startingPrice: number
}

export const photographyVideoPackagesQuery = `*[_type == "photography-video-packages"] {    
  _id,
  title {
    en,
    es
  },
  slug {
    current
  },
  description {
    en,
    es
  },
  startingPrice
}`

export async function getAllPhotographyVideoPackages(): Promise<
  PhotographyVideoPackages[] | null
> {
  return await client.fetch(photographyVideoPackagesQuery)
}

export interface PhotographyVideoPackagesBySlug {
  hero: Hero
  startingPrice: number
}

export const photographyVideoPackagesQueryBySlug = `*[_type == "photography-video-packages" && slug.current == $slug][0] {    
  hero {
    title {
      en,
      es
    },
    subtitle {
      en,
      es
    },
    heroImage[] {
      asset -> {
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    heroVideo,
    fullSize
  },
  startingPrice
}`

export async function getPhotographyVideoPackageBySlug(slug: string): Promise<
  PhotographyVideoPackagesBySlug | null
> {
  return await client.fetch(photographyVideoPackagesQueryBySlug, { slug })
}