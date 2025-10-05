import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getWeddingPlanning } from "@/sanity/queries/Wedding-Planning/WeddingPlanning"

export default async function WeddingPlanning({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("wedding-planning")
  const weddingPlanning = await getWeddingPlanning()
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
        {weddingPlanning?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={weddingPlanning?.hero?.heroVideo}
            fullSize={weddingPlanning?.hero?.fullSize}
            title={weddingPlanning?.hero?.title?.[locale]}
            subtitle={weddingPlanning?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={weddingPlanning?.hero?.heroImage || []}
            fullSize={weddingPlanning?.hero?.fullSize}
            title={weddingPlanning?.hero?.title?.[locale]}
            subtitle={weddingPlanning?.hero?.subtitle?.[locale]}
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
  const pageSeo = await getPageSeo("wedding-planning")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/wedding-planning"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/wedding-planning"
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
