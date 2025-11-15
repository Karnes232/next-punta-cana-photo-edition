import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"
import { createPageFetchOptions } from "@/sanity/lib/query-helpers"
import { CategorizedFaqs } from "../Faqs/faqCategory"

export interface CorporateEventTestimonials {
  clientName: string
  clientRole: {
    en: string
    es: string
  }
  companyName: string
  testimonial: {
    en: string
    es: string
  }
  companyLogo: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }
}

export interface CorporateEvents {
  hero: Hero
  paragraph1: {
    en: any[]
    es: any[]
  }
  galleryTitle: {
    en: string
    es: string
  }
  gallery: {
    asset: {
      url: string
      _ref: string
      _type: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }[]
  testimonials: CorporateEventTestimonials[]
  faqsTitle: {
    en: string
    es: string
  }
  corporateFaqs: CategorizedFaqs[]
  servicesCalculator: { title: { en: string; es: string }; rate: number }[]
}

export const corporateEventsQuery = `*[_type == "corporate-events"][0] {
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
  galleryTitle {
      en,
      es
    },
    gallery[] {
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
    testimonials[] {
      clientName,
      clientRole {
        en,
        es
      },
      companyName,
      testimonial {
        en,
        es
      },
      companyLogo {
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
      }
    },
    faqsTitle {
      en,
      es
    },
    corporateFaqs[] {
      question {
        en,
        es
      },
      answer {
        en,
        es
      }
    },
    servicesCalculator[] {
      title {
        en,
        es
      },
      rate
    }
}`

export async function getCorporateEvents(): Promise<CorporateEvents | null> {
  return await client.fetch(
    corporateEventsQuery,
    {},
    createPageFetchOptions("corporate-events"),
  )
}
