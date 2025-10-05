import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface CorporateEvents {
  hero: Hero
}

export const corporateEventsQuery = `*[_type == "corporate-events"][0] {
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

export async function getCorporateEvents(): Promise<CorporateEvents | null> {
  return await client.fetch(corporateEventsQuery)
}
