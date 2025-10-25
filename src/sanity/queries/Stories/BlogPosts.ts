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
  return await client.fetch(
    blogPostsSeoQuery,
    { slug },
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["blog-post-seo"], // For tag-based revalidation
      },
    },
  )
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
  return await client.fetch(
    blogPostsStructuredDataQuery,
    { slug },
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ['stories','blogPost', `post:${slug}`], // For tag-based revalidation
      },
    },
  )
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
  categories: {
    _id: string
  }[]
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
  publishedAt,
  categories[]->{
    _id
  }
}`

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return await client.fetch(
    blogPostQuery,
    { slug },
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ['stories','blogPost', `post:${slug}`], // For tag-based revalidation
      },
    },
  )
}

export interface BlogPostRecommendationsCard {
  _id: string
  title: {
    en: string
    es: string
  }
  slug: {
    current: string
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
  description: {
    en: string
    es: string
  }
}

export const blogPostRecommendationsCardQuery = `*[_type == "blogPost" && count(categories[@._ref in $categoryIds]) > 0] {
  _id,
  title {
    en,
    es
  },
  slug,
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
  publishedAt,
  description {
    en,
    es
  }
}`

export async function getBlogPostRecommendationsCard(
  categoryIds: string[],
): Promise<BlogPostRecommendationsCard[]> {
  return await client.fetch(
    blogPostRecommendationsCardQuery,
    { categoryIds },
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ['stories','blogPost'], // For tag-based revalidation
      },
    },
  )
}
