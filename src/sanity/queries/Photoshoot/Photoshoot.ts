import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Photoshoot {
  hero: Hero
  galleryTitle: {
    en: string
    es: string
  }
  gallery: {
    asset: {
      url: string
      _ref: string
      _type: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
  paragraph1: {
    en: any[]
    es: any[]
  }
}

export const photoshootQuery = `*[_type == "photoshoots"][0] {
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
        fullSize,
    },
    galleryTitle {
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
    paragraph1 {
      en,
      es
    }
}`

export async function getPhotoshoot(): Promise<Photoshoot | null> {
  return await client.fetch(photoshootQuery)
}
