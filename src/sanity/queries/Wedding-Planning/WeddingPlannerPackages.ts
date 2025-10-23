import { client } from "@/sanity/lib/client"

export interface WeddingPlannerPackages {
  _id: string
  title: {
    en: string
    es: string
  }
  description: {
    en: string
    es: string
  }
  includedItems: {
    en: string
    es: string
  }[]
  ctaText: {
    en: string
    es: string
  }
  mostPopular: boolean
}

export const weddingPlannerPackagesQuery = `*[_type == "wedding-planner-packages"] {
  _id,
  title {
    en,
    es
  },
  description {
    en,
    es
  },
  includedItems[] {
    en,
    es
  },
  ctaText {
    en,
    es
  },
  mostPopular
}`

export async function getWeddingPlannerPackages(): Promise<
  WeddingPlannerPackages[] | null
> {
  return await client.fetch(
    weddingPlannerPackagesQuery,
    {},
    {
      // Add caching configuration
      cache: 'force-cache',
      next: { 
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ['wedding-planner-packages'] // For tag-based revalidation
      }
    }
  )
}