import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface ServicesPage {
  hero: Hero
}

export const servicesPageQuery = `*[_type == "servicesOffered" && hero.pageName == $pageName][0] {
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

export async function getServicesPage(
  pageName: string,
): Promise<ServicesPage | null> {
  return await client.fetch(servicesPageQuery, { pageName })
}
