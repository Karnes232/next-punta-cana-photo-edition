import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Wedding {
  hero: Hero
  paragraph1: {
    en: any[]
    es: any[]
  }
  paragraph2: {
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

export const weddingQuery = `*[_type == "weddings"][0] {
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
    paragraph2 {
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
    }
}`

export async function getWedding(): Promise<Wedding | null> {
  return await client.fetch(weddingQuery)
}
