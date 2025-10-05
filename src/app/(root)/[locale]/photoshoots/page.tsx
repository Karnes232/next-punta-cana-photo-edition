import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import TextComponent from "@/components/TextComponent/TextComponent"
import { getPhotoshoot } from "@/sanity/queries/Photoshoot/Photoshoot"

import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function Photoshoots({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("photoshoots")
  const photoshoot = await getPhotoshoot()
  console.log(photoshoot)
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
        {photoshoot?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={photoshoot?.hero?.heroVideo}
            fullSize={photoshoot?.hero?.fullSize}
            title={photoshoot?.hero?.title?.[locale]}
            subtitle={photoshoot?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={photoshoot?.hero?.heroImage || []}
            fullSize={photoshoot?.hero?.fullSize}
            title={photoshoot?.hero?.title?.[locale]}
            subtitle={photoshoot?.hero?.subtitle?.[locale]}
          />
        )}
        <section className="max-w-7xl mx-auto flex flex-col gap-4">
          <TextComponent
            title={photoshoot?.galleryTitle?.[locale]}
            className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
          />
          <PhotoGrid photos={photoshoot?.gallery || []} />
        </section>
        <section className="max-w-7xl my-12 mx-auto flex flex-col gap-4">
          <BlockContent
            content={photoshoot?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
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
  const pageSeo = await getPageSeo("photoshoots")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/photoshoots"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/photoshoots"
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
