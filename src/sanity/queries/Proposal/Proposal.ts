import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"
import { Testimonial } from "../HomePage/Testimonials"

export interface Proposal {
  hero: Hero
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
  paragraph1: {
    en: any[]
    es: any[]
  }
  titleTestimonials: {
    en: string
    es: string
  }
  testimonials: Testimonial[]
}

export const proposalQuery = `*[_type == "proposal"][0] {
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
  paragraph1 {
    en,
    es
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

export async function getProposal(): Promise<Proposal | null> {
  return await client.fetch(
    proposalQuery,
    {},
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["proposal"], // For tag-based revalidation
      },
    },
  )
}
