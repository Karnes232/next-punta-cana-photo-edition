import { getPageSeo } from "@/sanity/queries/SEO/seo"

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  return (
    <div>
      <h1>Stories</h1>
    </div>
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
  