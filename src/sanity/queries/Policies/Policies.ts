import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Policies {
  hero: Hero
}

export const policiesQuery = `*[_type == "policies"][0]  {
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

export async function getPolicies(): Promise<Policies | null> {
  return await client.fetch(policiesQuery)
}