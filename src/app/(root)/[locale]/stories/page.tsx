import BlogContent from "@/components/BlogComponents/BlogContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import {
  BlogCategory,
  getAllBlogCategories,
  getAllBlogPosts,
  getStories,
} from "@/sanity/queries/Stories/Stories"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, stories, blogCategories, blogPosts] =
    await Promise.all([
      getStructuredData("stories"),
      getStories(),
      getAllBlogCategories(),
      getAllBlogPosts(),
    ])

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
      <main>
        {stories?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={stories?.hero?.heroVideo}
            fullSize={stories?.hero?.fullSize}
            title={stories?.hero?.title?.[locale]}
            subtitle={stories?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={stories?.hero?.heroImage || []}
            fullSize={stories?.hero?.fullSize}
            title={stories?.hero?.title?.[locale]}
            subtitle={stories?.hero?.subtitle?.[locale]}
          />
        )}
      </main>
      <BlogContent
        blogPosts={blogPosts || []}
        blogCategories={blogCategories || ([] as BlogCategory[])}
        locale={locale}
        featuredPost={stories?.featuredPost || null}
      />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("stories")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://puntacanaphotoedition.com/stories"
  } else {
    canonicalUrl = "https://puntacanaphotoedition.com/es/stories"
  }

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
    },
    // Add caching headers to metadata
    other: {
      "Cache-Control":
        "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    },
  }
}
