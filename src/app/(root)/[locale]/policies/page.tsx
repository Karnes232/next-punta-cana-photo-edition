import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getPolicies } from "@/sanity/queries/Policies/Policies"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function Policies({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("policies")
  const policies = await getPolicies()

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
        {policies?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={policies?.hero?.heroVideo}
            fullSize={policies?.hero?.fullSize}
            title={policies?.hero?.title?.[locale]}
            subtitle={policies?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={policies?.hero?.heroImage || []}
            fullSize={policies?.hero?.fullSize}
            title={policies?.hero?.title?.[locale]}
            subtitle={policies?.hero?.subtitle?.[locale]}
          />
        )}
      </main>
      <div>
        <h1>Policies</h1>
      </div>
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
  const pageSeo = await getPageSeo("policies")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/policies"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/policies"
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
