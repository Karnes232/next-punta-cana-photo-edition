import { client } from "@/sanity/lib/client"

export interface Logo {
  companyLogo: {
    asset: {
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
}

export const logoQuery = `*[_type == "generalLayout"][0] {
    companyLogo {
        asset-> {
            url,
            metadata {
                dimensions
            }
        },
        alt
    }
}`

export async function getLogo(): Promise<Logo | null> {
  return await client.fetch(logoQuery)
}

export const socialLinksQuery = `*[_type == "generalLayout"][0] {
    companyName,
    telephone,
    email,
    socialLinks {
        facebook,
        instagram,
        xURL,
        instagramTag,
        MessengerURL
    }
}`

export interface SocialLinks {
  companyName: string
  telephone: string
  email: string
  socialLinks: {
    facebook: string
    instagram: string
    xURL: string
    instagramTag: string
    MessengerURL: string
  }
}

export async function getSocialLinks(): Promise<SocialLinks | null> {
  return await client.fetch(socialLinksQuery)
}

export interface favicon {
  favicon: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
}

export const faviconQuery = `*[_type == "generalLayout"][0] {
    favicon
}`

export async function getFavicon(): Promise<favicon | null> {
  return await client.fetch(faviconQuery)
}
