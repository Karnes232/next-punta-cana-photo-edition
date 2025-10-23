import { getBlogPostSeo } from "@/sanity/queries/Stories/BlogPosts"

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>
}) {
  const { slug, locale } = await params

  return (
    <div>
      <h1>Story Page</h1>
    </div>
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
