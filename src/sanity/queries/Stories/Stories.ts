import { client } from "@/sanity/lib/client"
import { Hero } from "../HomePage/Hero"

export interface Stories {
  hero: Hero
}

export const storiesQuery = `*[_type == "stories"][0]  {
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

export async function getStories(): Promise<Stories | null> {
  return await client.fetch(storiesQuery)
}

export interface BlogCategory {
  _id: string
  title: {
    en: string
    es: string
  }
}

export const blogCategoriesQuery = `*[_type == "blogCategory"]  {
  _id,
  title {
    en,
    es
  }
}`

export async function getAllBlogCategories(): Promise<BlogCategory[] | null> {
  return await client.fetch(blogCategoriesQuery)
}

export interface BlogPostCard {
  _id: string
  title: {
    en: string
    es: string
  }
  description: {
    en: string
    es: string
  }
  slug: string
  categories: BlogCategory[]
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

export const blogPostsQuery = `*[_type == "blogPost"]  {
  _id,
  title {
    en,
    es
  },
  description {
    en,
    es
  },
  slug {
    current
  },
  categories[]-> {
    _id,
    title {
      en,
      es
    }
  },
  mainImage {
    asset -> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      },
    },
    alt
  },
  publishedAt
}`

export async function getAllBlogPosts(): Promise<BlogPostCard[] | null> {
  return await client.fetch(blogPostsQuery)
}
