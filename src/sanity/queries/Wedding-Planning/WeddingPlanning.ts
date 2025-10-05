import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface WeddingPlanning {
  hero: Hero
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
  }
}`

export async function getWeddingPlanning(): Promise<WeddingPlanning | null> {
  return await client.fetch(weddingPlanningQuery)
}
