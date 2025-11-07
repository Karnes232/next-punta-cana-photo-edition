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
  portfolioImages: {
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
  formTitle: {
    en: string
    es: string
  }
  formSubtitle: {
    en: string
    es: string
  }
  formSubmitText: {
    en: string
    es: string
  }
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
  portfolioImages[] {
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
      },
      formTitle {
        en,
        es
      },
      formSubtitle {
        en,
        es
      },
      formSubmitText {
        en,
        es
      }
}`

export async function getWeddingPlanning(): Promise<WeddingPlanning | null> {
  return await client.fetch(
    weddingPlanningQuery,
    {},
    createPageFetchOptions("wedding-planning"),
  )
}
