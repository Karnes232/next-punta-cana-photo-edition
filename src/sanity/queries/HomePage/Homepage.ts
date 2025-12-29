import { client } from "@/sanity/lib/client"
import { Hero } from "./Hero"
import { Testimonial } from "./Testimonials"
import { ContentBlock } from "./ContentBlock"
import { createPageFetchOptions } from "@/sanity/lib/query-helpers"

export interface Homepage {
  hero: Hero
  titleServicesOffered: string
  titleGallery: string
  galleryImages: any[]
  titleTestimonials: string
  testimonials: Testimonial[]
  contentBlock: ContentBlock
}

export const homepageQuery = `*[_type == "homepage"][0] {
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
    titleServicesOffered,
    titleGallery,
    galleryImages[] {
        asset {
        _ref,
        _type
        },
        alt
    },
    titleTestimonials,
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
        role {
            en,
            es
        },
        shortQuote {
            en,
            es
        }
    }
    ,
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
    }
}`

export async function getHomepage(): Promise<Homepage | null> {
  const homepage = await client.fetch<Homepage>(
    homepageQuery,
    {},
    createPageFetchOptions("homepage"),
  )
  return homepage
}
