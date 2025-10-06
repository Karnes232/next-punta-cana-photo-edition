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

export interface IndividualPhotoshootsPackage {
  slug: {
    current: string
  }
  heroImages: {
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
  heroTitle: {
    en: string
    es: string
  }
  heroSubtitle: {
    en: string
    es: string
  }
  paragraph1: {
    en: any[]
    es: any[]
  }
}

export const individualPhotoshootsPackageQuery = `*[_type == "photoshootsPackages" && slug.current == $slug][0] {
  slug {
    current
  },
  heroImages[] {
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
  heroTitle {
    en,
    es
  },
  heroSubtitle {
    en,
    es
  },
  paragraph1 {
    en,
    es
  }
}`

export async function getIndividualPhotoshootsPackage(
  slug: string,
): Promise<IndividualPhotoshootsPackage | null> {
  return await client.fetch(individualPhotoshootsPackageQuery, { slug })
}
