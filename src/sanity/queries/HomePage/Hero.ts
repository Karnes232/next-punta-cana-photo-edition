import { client } from "@/sanity/lib/client"

export interface Hero {
  pageName: string
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
  fullSize: boolean
}

export const heroQuery = `*[_type == "hero" && pageName == $pageName][0] {
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
}`

export async function getHero(pageName: string): Promise<Hero | null> {
  return await client.fetch(heroQuery, { pageName })
}
