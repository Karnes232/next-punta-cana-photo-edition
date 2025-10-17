import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface WeddingPlanning {
  hero: Hero
  paragraph1: {
    en: any[]
    es: any[]
  }
  galleryImages: {
    asset: {
      url: string
      _type: string
      _ref: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
}

export const weddingPlanningQuery = `*[_type == "wedding-planning"][0] {
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
 galleryImages[] {
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
}`

export async function getWeddingPlanning(): Promise<WeddingPlanning | null> {
  return await client.fetch(weddingPlanningQuery)
}
