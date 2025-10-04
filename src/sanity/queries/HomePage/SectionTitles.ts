import { client } from "@/sanity/lib/client"

export interface SectionTitles {
  titleServicesOffered: {
    en: string
    es: string
  }
  titleTestimonials: {
    en: string
    es: string
  }
}

export const sectionTitlesQuery = `*[_type == "sectionTitles"][0] {
  titleServicesOffered {
    en,
    es
  },
  titleTestimonials {
    en,
    es
  }
}`

export async function getSectionTitles(): Promise<SectionTitles> {
  return await client.fetch(sectionTitlesQuery)
}
