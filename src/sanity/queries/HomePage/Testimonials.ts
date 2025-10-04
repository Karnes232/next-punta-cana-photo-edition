import { client } from "@/sanity/lib/client"

export interface Testimonial {
  _id: string
  name: string
  photo: {
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
  role: {
    en: string
    es: string
  }
  shortQuote: {
    en: string
    es: string
  }
}
export interface Testimonials {
  title: string
  testimonials: Testimonial[]
}

export const testimonialsQuery = `*[_type == "testimonial"] {
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
}`

export async function getTestimonials(): Promise<Testimonials> {
  return await client.fetch(testimonialsQuery)
}