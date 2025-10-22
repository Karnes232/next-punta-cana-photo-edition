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

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("stories")
  const stories = await getStories()
  const blogCategories = await getAllBlogCategories()
  const blogPosts = await getAllBlogPosts()

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
    canonicalUrl = "https://www.puntacanaphotoedition.com/stories"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/stories"
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
