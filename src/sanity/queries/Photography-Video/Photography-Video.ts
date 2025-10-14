import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface PhotographyVideo {
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
}

export const photographyVideoQuery = `*[_type == "photography-video"][0] {
  hero {
    pageName,
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
      asset ->{
        url,
        _ref,
        _type,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
}`

export async function getPhotographyVideo(): Promise<PhotographyVideo | null> {
  const data = await client.fetch(photographyVideoQuery)
  return data
}
