import { client } from "@/sanity/lib/client"

export interface Hero {
  title: {
    en: string
    es: string
  }
  subtitle: {
    en: string
    es: string
  }
  heroImage: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
  heroVideo: string
}

export const heroQuery = `*[_type == "hero"][0] {
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
    heroVideo
}`

export async function getHero(): Promise<Hero | null> {
  return await client.fetch(heroQuery)
}
