import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Wedding {
  hero: Hero
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
  }
}`

export async function getWedding(): Promise<Wedding | null> {
  return await client.fetch(weddingQuery)
}
