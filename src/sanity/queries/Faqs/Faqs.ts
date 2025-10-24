import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Faqs {
  hero: Hero
}

export const faqsQuery = `*[_type == "faqs"][0]  {
  hero {
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

export async function getFaqs(): Promise<Faqs | null> {
  return await client.fetch(
    faqsQuery,
    {},
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["faqs"], // For tag-based revalidation
      },
    },
  )
}
