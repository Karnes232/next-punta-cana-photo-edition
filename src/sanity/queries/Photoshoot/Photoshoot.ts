import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Photoshoot {
  hero: Hero
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
        fullSize
    }
}`

export async function getPhotoshoot(): Promise<Photoshoot | null> {
  return await client.fetch(photoshootQuery)
}
