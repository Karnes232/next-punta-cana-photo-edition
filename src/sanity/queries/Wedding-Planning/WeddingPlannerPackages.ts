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
  return await client.fetch(weddingPlannerPackagesQuery)
}
