import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"
import { createPageFetchOptions } from "@/sanity/lib/query-helpers"

export interface About {
  hero: Hero
  brandStory: {
    en: any[]
    es: any[]
  }
  bio: {
    en: any[]
    es: any[]
  }
  galleryTitle: {
    en: string
    es: string
  }
  gallery: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
      _type: string
      _ref?: string
    }
    alt: string
  }[]
  teamVideo: string
}

export const aboutQuery = `*[_type == "about"][0]  {
  hero {
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
  bio {
    en,
    es
  },
  galleryTitle {
    en,
    es
  },
  gallery[] {
    asset -> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      },
      _type,
      _ref
    },
    alt
  },
  brandStory {
    en,
    es
  },
  teamVideo
}`

export async function getAbout(): Promise<About | null> {
  return await client.fetch(aboutQuery, {}, createPageFetchOptions("about"))
}
