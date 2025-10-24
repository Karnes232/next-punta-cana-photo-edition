import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"
import { ContentBlock } from "../HomePage/ContentBlock"
import { Testimonial } from "../HomePage/Testimonials"

export interface FaqComponent {
  title: {
    en: string
    es: string
  }
  content: {
    en: string
    es: string
  }
}

export interface Photoshoot {
  hero: Hero
  galleryTitle: {
    en: string
    es: string
  }
  gallery: {
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
  }[]
  paragraph1: {
    en: any[]
    es: any[]
  }
  contentBlock: ContentBlock
  paragraph2: {
    en: any[]
    es: any[]
  }
  testimonials: Testimonial[]
  faqComponent: FaqComponent[]
}

export const photoshootQuery = `*[_type == "photoshoots"][0] {
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
        fullSize,
    },
    galleryTitle {
      en,
      es
    },
    gallery[] {
      asset ->{
        url,
        _ref,
        _type,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    paragraph1 {
      en,
      es
    },
    contentBlock {
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
    },
    paragraph2 {
      en,
      es
    },
    testimonials[] {
      _id,
      name,
      photo {
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
      role,
      shortQuote
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

export async function getPhotoshoot(): Promise<Photoshoot | null> {
  return await client.fetch(
    photoshootQuery,
    {},
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["photoshoot"], // For tag-based revalidation
      },
    },
  )
}
