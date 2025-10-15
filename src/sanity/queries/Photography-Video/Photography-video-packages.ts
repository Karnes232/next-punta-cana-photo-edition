import { client } from "@/sanity/lib/client"

export interface PhotographyVideoPackages {
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
  startingPrice: number
}

export const photographyVideoPackagesQuery = `*[_type == "photography-video-packages"] {    
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
  startingPrice
}`

export async function getAllPhotographyVideoPackages(): Promise<
  PhotographyVideoPackages[] | null
> {
  return await client.fetch(photographyVideoPackagesQuery)
}