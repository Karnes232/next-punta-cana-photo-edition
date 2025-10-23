import { getBlogPostSeo, getBlogPostStructuredData } from "@/sanity/queries/Stories/BlogPosts"

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>
}) {
  const { slug, locale } = await params
  
  const structuredData = await getBlogPostStructuredData(slug)
  console.log(structuredData)
  
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
        <h1>{structuredData?.seo?.structuredData[locale]}</h1>
      </main>
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
