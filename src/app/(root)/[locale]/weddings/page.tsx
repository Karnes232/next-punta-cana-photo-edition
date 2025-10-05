import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getServicesPage } from "@/sanity/queries/ServicesOffered/ServicesPage"

export default async function Weddings({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("weddings")
  const servicesPage = await getServicesPage("weddings")
  console.log(servicesPage?.hero)
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
   {servicesPage?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={servicesPage?.hero?.heroVideo}
            fullSize={servicesPage?.hero?.fullSize}
            title={servicesPage?.hero?.title?.[locale]}
            subtitle={servicesPage?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={servicesPage?.hero?.heroImage || []}
            fullSize={servicesPage?.hero?.fullSize}
            title={servicesPage?.hero?.title?.[locale]}
            subtitle={servicesPage?.hero?.subtitle?.[locale]}
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
  const pageSeo = await getPageSeo("weddings")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/weddings"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/weddings"
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
