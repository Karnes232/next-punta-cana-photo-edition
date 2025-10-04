import { client } from "@/sanity/lib/client"

export interface ContentBlock {
  title: {
    en: string
    es: string
  }
  subTitle: {
    en: string
    es: string
  }
  content: {
    en: string
    es: string
  }
  image: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }
  buttonText: {
    en: string
    es: string
  }
  buttonLink: string
}

export const contentBlockQuery = `*[_type == "contentBlock"][0] {
  title {
    en,
    es
  },
  subTitle {
    en,
    es
  },
  content {
    en,
    es
  },
  image {
    asset-> {
      _id,
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
  buttonText {
    en,
    es
  },
  buttonLink
}`

export async function getContentBlock(): Promise<ContentBlock> {
  return await client.fetch(contentBlockQuery)
}
