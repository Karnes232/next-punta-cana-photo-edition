import { client } from "@/sanity/lib/client"

export interface ServiceCard {
  title: {
    en: string
    es: string
  }
  subtitle: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
  heroImage: {
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
  }[]
}

export const serviceCardQuery = `*[_type == "servicesOffered"] {
    title {
        en,
        es
    },
    subtitle {
        en,
        es
    },
    slug {
        current
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
    }
}`

export async function getServiceCard(): Promise<ServiceCard[]> {
  return await client.fetch(serviceCardQuery)
}
