import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Proposal {
  hero: Hero
}

export const proposalQuery = `*[_type == "proposal"][0] {
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

export async function getProposal(): Promise<Proposal | null> {
  return await client.fetch(proposalQuery)
}
