import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getPolicies } from "@/sanity/queries/Policies/Policies"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function Policies({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, policies] = await Promise.all([
    getStructuredData("policies"),
    getPolicies(),
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
      <div className="max-w-5xl mx-5 lg:p-2 xl:mx-auto">
        {policies?.termsAndConditions && (
          <BlockContent content={policies.termsAndConditions} locale={locale} />
        )}
        <hr className="my-10" />
        {policies?.privacyPolicy && (
          <BlockContent content={policies.privacyPolicy} locale={locale} />
        )}
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
    canonicalUrl = "https://puntacanaphotoedition.com/policies"
  } else {
    canonicalUrl = "https://puntacanaphotoedition.com/es/policies"
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
