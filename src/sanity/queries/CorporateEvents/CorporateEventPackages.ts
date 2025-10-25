import { client } from "@/sanity/lib/client"
import { createFetchOptions } from "@/sanity/lib/query-helpers"

export interface CorporateEventPackages {
  title: {
    en: string
    es: string
  }
  description: {
    en: string
    es: string
  }
  cardImage: {
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
  }
}

export const corporateEventPackagesQuery = `*[_type == "corporate-event-packages"] {
  title {
    en,
    es
  },
  description {
    en,
    es
  },
  cardImage {
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
  }
}`

export const getCorporateEventPackages = async (): Promise<
  CorporateEventPackages[]
> => {
  return await client.fetch(
    corporateEventPackagesQuery,
    {},
    createFetchOptions(3, ["corporate-event-packages"]),
  )
}
