import { client } from "@/sanity/lib/client"

export interface BlogSeo {
  seo: {
    meta: {
      en: {
        title: string
        description: string
        keywords: string[]
      }
      es: {
        title: string
        description: string
        keywords: string[]
      }
    }
    openGraph: {
      en: {
        title: string
        description: string
      }
      es: {
        title: string
        description: string
      }
      image: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
    noIndex: boolean
    noFollow: boolean
  }
}

export const blogPostsSeoQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
    seo {
        meta {
    en {
      title,
      description,
      keywords
    },
    es {
      title,
      description,
      keywords
    }
  },
  // Open Graph data
  openGraph {
    en {
      title,
      description
    },
    es {
      title,
      description
    },
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  },
  // Other SEO settings
  noIndex,
  noFollow
    }
}`

export async function getBlogPostSeo(slug: string): Promise<BlogSeo | null> {
  return await client.fetch(blogPostsSeoQuery, { slug })
}

export const blogPostsStructuredDataQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
    seo {
        structuredData {
            en,
            es
        }
    }
}`

export interface structuredData {
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export async function getBlogPostStructuredData(
  slug: string,
): Promise<structuredData | null> {
  return await client.fetch(blogPostsStructuredDataQuery, { slug })
}

export interface BlogPost {
  _id: string
  title: {
    en: string
    es: string
  }
  body: {
    en: any[]
    es: any[]
  }
  mainImage: {
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
  publishedAt: string
}

export const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title {
    en,
    es
  },
  body {
    en,
    es
  },
  mainImage {
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
  publishedAt
}`

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return await client.fetch(blogPostQuery, { slug })
}
