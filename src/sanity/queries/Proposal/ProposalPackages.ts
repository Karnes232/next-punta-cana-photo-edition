import { client } from "@/sanity/lib/client"

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

export const getAllProposalPackagesQuery = `*[_type == "proposalPackages"] {
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
