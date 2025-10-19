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
  return await client.fetch(getAllProposalPackagesQuery)
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
  }
}`

export async function getProposalPackagesBySlug(
  slug: string,
): Promise<ProposalPackagesBySlug | null> {
  return await client.fetch(proposalPackagesBySlugQuery, { slug })
}
