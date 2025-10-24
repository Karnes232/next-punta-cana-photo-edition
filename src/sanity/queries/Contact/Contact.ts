import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Contact {
  hero: Hero
}

export const contactQuery = `*[_type == "contact"][0]  {
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

export async function getContact(): Promise<Contact | null> {
  return await client.fetch(
    contactQuery,
    {},
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["contact"], // For tag-based revalidation
      },
    },
  )
}
