import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"
import { Testimonial } from "../HomePage/Testimonials"
import { createPageFetchOptions } from "@/sanity/lib/query-helpers"

export interface WeddingPlanning {
  hero: Hero
  paragraph1: {
    en: any[]
    es: any[]
  }
  galleryImages: {
    asset: {
      url: string
      _type: string
      _ref: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
  titleTestimonials: string
  testimonials: Testimonial[]
}

export const weddingPlanningQuery = `*[_type == "wedding-planning"][0] {
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
  },
  paragraph1 {
    en,
    es
  },
 galleryImages[] {
    asset -> {
      url,
      _type,
      _ref,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  titleTestimonials {
    en,
    es
  },
  testimonials[] {
        _id,
        name,
        photo {
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
        role {
            en,
            es
        },
        shortQuote {
            en,
            es
        }
  }
}`

export async function getWeddingPlanning(): Promise<WeddingPlanning | null> {
  return await client.fetch(
    weddingPlanningQuery,
    {},
    createPageFetchOptions("wedding-planning"),
  )
}
