import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"
import { PageSeo } from "../SEO/seo"

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
  paragraph1: {
    en: any[]
    es: any[]
  }
  gallery: {
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
  }[]
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
  paragraph1 {
    en,
    es
  },
  gallery[] {
    asset -> {
      url,
      _type,
      _ref,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  startingPrice
}`

export async function getPhotographyVideoPackageBySlug(
  slug: string,
): Promise<PhotographyVideoPackagesBySlug | null> {
  return await client.fetch(photographyVideoPackagesQueryBySlug, { slug })
}


export interface PhotographyVideoPackageSEO {
  seo: {
    meta: {
      en: {
        title: string
        description: string
        keywords: string[]
      }
      es: {
        title: string
        description: string
        keywords: string[]
      }
    }
    openGraph: {
      en: {
        title: string
        description: string
      }
      es: {
        title: string
        description: string
      }
      image: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
    noIndex: boolean
    noFollow: boolean
  }
}

export const photographyVideoPackageSEOQuery = `*[_type == "photography-video-packages" && slug.current == $slug][0] {
  seo {
        meta {
          en {
            title,
            description,
            keywords
          },
          es {
            title,
            description,
            keywords
          }
        },
        // Open Graph data
        openGraph {
          en {
            title,
            description
          },
          es {
            title,
            description
          },
          "image": {
            "url": image.asset->url,
            "alt": image.alt,
            "width": image.asset->metadata.dimensions.width,
            "height": image.asset->metadata.dimensions.height
          }
        },
        // Other SEO settings
        noIndex,
        noFollow
    }
}`

export async function getPhotographyVideoPackageSEO(
  slug: string,
): Promise<PhotographyVideoPackageSEO | null> {
  return await client.fetch(photographyVideoPackageSEOQuery, { slug })
}