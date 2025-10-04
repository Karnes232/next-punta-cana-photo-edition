import { client } from "@/sanity/lib/client"

export interface HomePageGallery {
  title: {
    en: string
    es: string
  }
  galleryImages: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }[]
}

export const homePageGalleryQuery = `*[_type == "homePageGallery"][0] {
  title {   
    en,
    es
  },
  galleryImages[] {
    asset {
      _ref,
      _type
    },
    alt
  }
}`

export async function getHomePageGallery(): Promise<HomePageGallery> {
  return await client.fetch(homePageGalleryQuery)
}
