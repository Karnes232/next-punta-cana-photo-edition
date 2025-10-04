import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import ServicesOffered from "@/components/ServicesOfferedComponents/ServicesOffered"
import SwiperGallery from "@/components/SwiperGallery/SwiperGallery"
import { getHomePageGallery } from "@/sanity/queries/HomePage/Gallery"
import { getHero } from "@/sanity/queries/HomePage/Hero"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
  }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  const hero = await getHero()
  const structuredData = await getStructuredData("home")
  const gallery = await getHomePageGallery()


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
        {structuredData?.seo?.structuredData[locale] && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: structuredData.seo.structuredData[locale],
            }}
          />
        )}
        {hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={hero.heroVideo}
            fullSize={true}
            title={hero.title[locale]}
            subtitle={hero.subtitle[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={hero?.heroImage || []}
            fullSize={true}
            title={hero?.title?.[locale]}
            subtitle={hero?.subtitle?.[locale]}
          />
        )}
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <ServicesOffered locale={locale} />
          <SwiperGallery
            title={gallery.title[locale]}
            images={gallery.galleryImages}
          />
        </div>
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
  const pageSeo = await getPageSeo("home")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es"
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
