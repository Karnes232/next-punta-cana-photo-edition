import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Policies {
  hero: Hero
  termsAndConditions: {
    en: any[]
    es: any[]
  }
  privacyPolicy: {
    en: any[]
    es: any[]
  }
}

export const policiesQuery = `*[_type == "policies"][0]  {
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
  termsAndConditions {
    en,
    es
  },
  privacyPolicy {
    en,
    es
  } 
}`

export async function getPolicies(): Promise<Policies | null> {
  return await client.fetch(policiesQuery)
}