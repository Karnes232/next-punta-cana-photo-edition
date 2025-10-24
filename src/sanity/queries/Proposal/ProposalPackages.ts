import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface ProposalPackages {
  _id: string
  packageName: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
  packageCardImage: {
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
  packageCardIncludedItems: {
    en: string
    es: string
  }[]
  packageCardStartingPrice: number
}

export const getAllProposalPackagesQuery = `*[_type == "proposalPackages"] | order(packageCardStartingPrice asc) {
  _id,
  packageName {
    en,
    es
  },
  slug {
    current
  },
  packageCardImage { 
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
  packageCardIncludedItems[] {
    en, 
    es
  },
  packageCardStartingPrice
}`

export async function getAllProposalPackages(): Promise<
  ProposalPackages[] | null
> {
  return await client.fetch(
    getAllProposalPackagesQuery,
    {},
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["proposalPackages"], // For tag-based revalidation
      },
    },
  )
}

export interface ProposalPackagesBySlug {
  _id: string
  hero: Hero
  paragraph1: {
    en: any[]
    es: any[]
  }
  photoGallery: {
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
  paragraph2: {
    en: any[]
    es: any[]
  }
}

export const proposalPackagesBySlugQuery = `*[_type == "proposalPackages" && slug.current == $slug][0] {
  _id,
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
  photoGallery[] {
    _type,
    _ref,
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
  paragraph2 {
    en,
    es
  }
}`

export async function getProposalPackagesBySlug(
  slug: string,
): Promise<ProposalPackagesBySlug | null> {
  return await client.fetch(
    proposalPackagesBySlugQuery,
    { slug },
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["proposalPackages"], // For tag-based revalidation
      },
    },
  )
}

export interface ProposalPackagesBySlugSEO {
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

export const proposalPackagesBySlugSEOQuery = `*[_type == "proposalPackages" && slug.current == $slug][0] {
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

export async function getProposalPackagesBySlugSEO(
  slug: string,
): Promise<ProposalPackagesBySlugSEO | null> {
  return await client.fetch(
    proposalPackagesBySlugSEOQuery,
    { slug },
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["proposalPackages"], // For tag-based revalidation
      },
    },
  )
}

export interface ProposalPackagesBySlugStructuredData {
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export const proposalPackagesBySlugStructuredDataQuery = `*[_type == "proposalPackages" && slug.current == $slug][0] {
seo {
    structuredData {
      en,
      es
    }
  }
}`

export async function getProposalPackagesBySlugStructuredData(
  slug: string,
): Promise<ProposalPackagesBySlugStructuredData | null> {
  return await client.fetch(
    proposalPackagesBySlugStructuredDataQuery,
    { slug },
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["proposalPackages"], // For tag-based revalidation
      },
    },
  )
}
