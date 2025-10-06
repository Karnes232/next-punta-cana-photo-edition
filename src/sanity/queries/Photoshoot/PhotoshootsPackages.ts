import { client } from "@/sanity/lib/client"

export interface PhotoshootsPackages {
  _id: string
  title: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
  description: {
    en: string
    es: string
  }
  cardImage: {
    _type: string
    _ref: string
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  alt: string
  includedItems: {
    en: string
    es: string
  }[]
  startingPrice: number
}

export const photoshootsPackagesQuery = `*[_type == "photoshootsPackages"] {
  _id,
  title {
    en,
    es
  },
  slug {
    current
  },
  description {
    en,
    es
  },
  cardImage {
    _type,
    _ref,
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
  includedItems[] {
    en,
    es
  },
  startingPrice
}`

export async function getAllPhotoshootsPackages(): Promise<
  PhotoshootsPackages[] | null
> {
  return await client.fetch(photoshootsPackagesQuery)
}
