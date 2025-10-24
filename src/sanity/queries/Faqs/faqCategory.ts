import { client } from "@/sanity/lib/client"

export interface CategorizedFaqs {
  question: {
    en: string
    es: string
  }
  answer: {
    en: string
    es: string
  }
}

export interface FaqCategory {
  title: {
    en: string
    es: string
  }
  faqs: CategorizedFaqs[]
}

export const faqCategoriesQuery = `*[_type == "faqCategory"]  {
_type,
  title {
    en,
    es
  },
  faqs[] {
    question {
      en,
      es
    },
    answer {
      en,
      es
    }
  }
}`

export async function getFaqCategories(): Promise<FaqCategory[] | null> {
  return await client.fetch(
    faqCategoriesQuery,
    {},
    {
      // Add caching configuration
      cache: "force-cache",
      next: {
        revalidate: 259200, // 3 days (259200 seconds)
        tags: ["faqCategory"], // For tag-based revalidation
      },
    },
  )
}
