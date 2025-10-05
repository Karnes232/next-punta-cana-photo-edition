import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getProposal } from "@/sanity/queries/Proposal/Proposal"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function Proposals({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("proposals")
  const proposal = await getProposal()

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
        {proposal?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={proposal?.hero?.heroVideo}
            fullSize={proposal?.hero?.fullSize}
            title={proposal?.hero?.title?.[locale]}
            subtitle={proposal?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={proposal?.hero?.heroImage || []}
            fullSize={proposal?.hero?.fullSize}
            title={proposal?.hero?.title?.[locale]}
            subtitle={proposal?.hero?.subtitle?.[locale]}
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
  const pageSeo = await getPageSeo("proposals")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/proposals"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/proposals"
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
