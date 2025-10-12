import { client } from "@/sanity/lib/client"
import { FaqComponent } from "./Photoshoot"

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
  photoGallery: {
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
  faqComponent: FaqComponent[]
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
  },
  photoGallery[] {
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
  faqComponent[] {
    title {
      en,
      es
    },
    content {
      en,
      es
    }
  }
}`

export async function getIndividualPhotoshootsPackage(
  slug: string,
): Promise<IndividualPhotoshootsPackage | null> {
  return await client.fetch(individualPhotoshootsPackageQuery, { slug })
}

export interface IndividualPhotoshootsPackageSEO {
  seo: {
    meta: {
      en: {
        title: string
        description: string
        keywords: string[]
      }
      es: {
        title: string
        description: string
        keywords: string[]
      }
    }
    openGraph: {
      en: {
        title: string
        description: string
      }
      es: {
        title: string
        description: string
      }
      image: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
    noIndex: boolean
    noFollow: boolean
  }
}

export const individualPhotoshootsPackageSEOQuery = `*[_type == "photoshootsPackages" && slug.current == $slug][0] {
  seo {
    meta {
      en {
        title,
        description,
        keywords
      },
      es {
        title,
        description,
        keywords
      }
    },  
    openGraph {
      en {
        title,
        description
      },
      es {
        title,
        description
      },
      "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    },
      },
      noIndex,
      noFollow
    }
}`

export async function getIndividualPhotoshootsPackageSEO(
  slug: string,
): Promise<IndividualPhotoshootsPackageSEO | null> {
  return await client.fetch(individualPhotoshootsPackageSEOQuery, { slug })
}

export interface IndividualPhotoshootsPackagesStructuredData {
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export const individualPhotoshootsPackagesStructuredDataQuery = `*[_type == "photoshootsPackages" && slug.current == $slug][0] {
  seo {
    structuredData {
      en,
      es
    }
  }
}`

export async function getIndividualPhotoshootsPackagesStructuredData(
  slug: string,
): Promise<IndividualPhotoshootsPackagesStructuredData | null> {
  return await client.fetch(individualPhotoshootsPackagesStructuredDataQuery, {
    slug,
  })
}
