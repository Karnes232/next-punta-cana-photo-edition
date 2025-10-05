import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface About {
  hero: Hero
}

export const aboutQuery = `*[_type == "about"][0]  {
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

export async function getAbout(): Promise<About | null> {
  return await client.fetch(aboutQuery)
}