import BlockContent from "@/components/BlockContent/BlockContent"
import BlogPostHeader from "@/components/BlogComponents/BlogPostHeader"
import {
  getBlogPostSeo,
  getBlogPostStructuredData,
} from "@/sanity/queries/Stories/BlogPosts"
import { getBlogPost } from "@/sanity/queries/Stories/BlogPosts"
import { notFound } from "next/navigation"

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>
}) {
  const { slug, locale } = await params

  const structuredData = await getBlogPostStructuredData(slug)
  const blogPost = await getBlogPost(slug)
  if (!blogPost) {
    return notFound()
  }

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

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://www.puntacanaphotoedition.com/stories/${slug}`
  } else {
    canonicalUrl = `https://www.puntacanaphotoedition.com/es/stories/${slug}`
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
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
    },
  }
}
