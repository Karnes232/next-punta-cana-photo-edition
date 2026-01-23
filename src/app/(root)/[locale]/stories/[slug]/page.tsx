import BlockContent from "@/components/BlockContent/BlockContent"
import BlogPostHeader from "@/components/BlogComponents/BlogPostHeader"
import BlogPostRecommendationsCard from "@/components/BlogComponents/BlogPostRecommendationsCard"
import {
  getBlogPostRecommendationsCard,
  getBlogPostSeo,
  getBlogPostStructuredData,
} from "@/sanity/queries/Stories/BlogPosts"
import { getBlogPost } from "@/sanity/queries/Stories/BlogPosts"
import { notFound } from "next/navigation"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>
}) {
  const { slug, locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, blogPost] = await Promise.all([
    getBlogPostStructuredData(slug),
    getBlogPost(slug),
  ])

  if (!blogPost) {
    return notFound()
  }

  // Fetch recommendations after we have the blog post
  let blogPostRecommendationsCard = await getBlogPostRecommendationsCard(
    blogPost.categories.map((category: any) => category._id),
  )
  blogPostRecommendationsCard = blogPostRecommendationsCard.filter(
    (post: any) => post._id !== blogPost._id,
  )

  return (
    <>
      {structuredData?.seo?.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData.seo.structuredData[locale],
          }}
        />
      )}
      <BlogPostHeader
        image={blogPost?.mainImage}
        publishedAt={blogPost?.publishedAt}
        title={blogPost?.title}
        locale={locale}
      />
      <section className="max-w-5xl my-5 mx-5 xl:mx-auto flex flex-col">
        <BlockContent content={blogPost?.body} locale={locale} />
      </section>
      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col">
        <BlogPostRecommendationsCard
          blogPostRecommendationsCard={blogPostRecommendationsCard}
          locale={locale}
        />
      </section>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>
}) {
  const { slug, locale } = await params
  const pageSeo = await getBlogPostSeo(slug)

  if (!pageSeo) {
    return {}
  }

  const enUrl = `https://puntacanaphotoedition.com/stories/${slug}`
  const esUrl = `https://puntacanaphotoedition.com/es/stories/${slug}`
  const canonicalUrl = locale === "en" ? enUrl : esUrl

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title:
        pageSeo.seo.openGraph[locale].title || pageSeo.seo.meta[locale].title,
      description:
        pageSeo.seo.openGraph[locale].description ||
        pageSeo.seo.meta[locale].description,
      images: pageSeo.seo.openGraph.image.url || "",
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
    // Add caching headers to metadata
    other: {
      "Cache-Control":
        "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    },
  }
}
