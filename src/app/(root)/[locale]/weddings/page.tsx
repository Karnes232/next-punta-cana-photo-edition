import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import WeddingNavigationCard from "@/components/WeddingNavigatinCards/WeddingNavigationCard"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getWedding } from "@/sanity/queries/Weddings/Wedding"
import { getTranslations } from "next-intl/server"

export default async function Weddings({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const t = await getTranslations("weddings")
  const { locale } = await params
  const structuredData = await getStructuredData("weddings")
  const wedding = await getWedding()

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
        {wedding?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={wedding?.hero?.heroVideo}
            fullSize={wedding?.hero?.fullSize}
            title={wedding?.hero?.title?.[locale]}
            subtitle={wedding?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={wedding?.hero?.heroImage || []}
            fullSize={wedding?.hero?.fullSize}
            title={wedding?.hero?.title?.[locale]}
            subtitle={wedding?.hero?.subtitle?.[locale]}
          />
        )}
        <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={wedding?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
          <div className="my-10">
            <PhotoGrid photos={wedding?.gallery || []} />
          </div>
          <BlockContent
            content={wedding?.paragraph2 || { en: [], es: [] }}
            locale={locale}
          />

          {/* Navigation Cards Section */}
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <WeddingNavigationCard
                href="/weddings/photography-video"
                title={t("weddingNavigationCardTitle")}
                paragraph={t("weddingNavigationCardParagraph")}
                locale={locale}
                svgPath="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z"
                svg2ndPath="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />

              <WeddingNavigationCard
                href="/wedding-planning"
                title={t("weddingPlanningCardTitle")}
                paragraph={t("weddingPlanningCardParagraph")}
                locale={locale}
                svgPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                svg2ndPath=""
              />
            </div>
          </div>
        </section>
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
