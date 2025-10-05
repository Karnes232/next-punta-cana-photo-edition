import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Stories {
  hero: Hero
}

export const storiesQuery = `*[_type == "stories"][0]  {
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

export async function getStories(): Promise<Stories | null> {
  return await client.fetch(storiesQuery)
}