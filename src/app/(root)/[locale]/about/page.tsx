import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import TeamVideo from "@/components/HeroComponent/TeamVideo"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import TextComponent from "@/components/TextComponent/TextComponent"
import { getAbout } from "@/sanity/queries/About/About"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function About({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, about] = await Promise.all([
    getStructuredData("about"),
    getAbout(),
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
        {about?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={about?.hero?.heroVideo}
            fullSize={about?.hero?.fullSize}
            title={about?.hero?.title?.[locale]}
            subtitle={about?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={about?.hero?.heroImage || []}
            fullSize={about?.hero?.fullSize}
            title={about?.hero?.title?.[locale]}
            subtitle={about?.hero?.subtitle?.[locale]}
          />
        )}
      </main>
      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4">
        <BlockContent
          content={about?.brandStory || { en: [], es: [] }}
          locale={locale}
        />
      </section>
      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4">
        <TextComponent
          title={about?.galleryTitle?.[locale]}
          className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
        />
        <PhotoGrid photos={about?.gallery || []} />
      </section>
      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4">
        <BlockContent
          content={about?.bio || { en: [], es: [] }}
          locale={locale}
        />
      </section>
      {about?.teamVideo && <TeamVideo heroVideo={about?.teamVideo} />}
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
  const pageSeo = await getPageSeo("about")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/about"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/about"
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
