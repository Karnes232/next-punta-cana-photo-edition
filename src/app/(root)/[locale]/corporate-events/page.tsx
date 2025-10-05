import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCorporateEvents } from "@/sanity/queries/CorporateEvents/CorporateEvents"

export default async function CorporateEvents({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("corporate-events")
  const corporateEvents = await getCorporateEvents()

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
        {corporateEvents?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={corporateEvents?.hero?.heroVideo}
            fullSize={corporateEvents?.hero?.fullSize}
            title={corporateEvents?.hero?.title?.[locale]}
            subtitle={corporateEvents?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={corporateEvents?.hero?.heroImage || []}
            fullSize={corporateEvents?.hero?.fullSize}
            title={corporateEvents?.hero?.title?.[locale]}
            subtitle={corporateEvents?.hero?.subtitle?.[locale]}
          />
        )}
      </main>
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
  const pageSeo = await getPageSeo("corporate-events")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/corporate-events"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/corporate-events"
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
