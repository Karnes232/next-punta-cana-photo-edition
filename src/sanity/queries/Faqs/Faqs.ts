import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"
import { createPageFetchOptions } from "@/sanity/lib/query-helpers"

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
  return await client.fetch(faqsQuery, {}, createPageFetchOptions("faqs"))
}
