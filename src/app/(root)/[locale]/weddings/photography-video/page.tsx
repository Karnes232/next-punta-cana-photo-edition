import BlockContent from "@/components/BlockContent/BlockContent"
import CustomPhotographyVideoPackageCalculatorForm from "@/components/Forms/CustomPhotographyVideoPackageCalculatorForm"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import PhotographyVideoPackages from "@/components/PhotographyVideoPackageComponents/PhotographyVideoPackages"
import { getPhotographyVideo } from "@/sanity/queries/Photography-Video/Photography-Video"
import { getAllPhotographyVideoPackages } from "@/sanity/queries/Photography-Video/Photography-video-packages"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function PhotographyVideo({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, photographyVideo, photographyVideoPackages] =
    await Promise.all([
      getStructuredData("photography-video"),
      getPhotographyVideo(),
      getAllPhotographyVideoPackages(),
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
      {photographyVideo?.hero?.heroVideo ? (
        <BackgroundVideo
          heroVideo={photographyVideo.hero.heroVideo}
          fullSize={photographyVideo.hero.fullSize}
          title={photographyVideo.hero.title[locale]}
          subtitle={photographyVideo.hero.subtitle[locale]}
        />
      ) : (
        <BackgroundImage
          heroImages={photographyVideo?.hero.heroImage || []}
          fullSize={photographyVideo?.hero.fullSize}
          title={photographyVideo?.hero.title?.[locale]}
          subtitle={photographyVideo?.hero.subtitle?.[locale]}
        />
      )}

      <PhotographyVideoPackages
        packages={photographyVideoPackages || []}
        title={photographyVideo?.packageTitle?.[locale]}
        subtitle={photographyVideo?.packageSubtitle?.[locale]}
        locale={locale}
        mostPopularPackage={photographyVideo?.mostPopularPackage?._id}
      />
      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
        <CustomPhotographyVideoPackageCalculatorForm
          minimumHours={photographyVideo?.minimumHours || 0}
          addtions={photographyVideo?.addtions || []}
          locale={locale}
        />
      </section>

      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
        <BlockContent
          content={photographyVideo?.paragraph1 || { en: [], es: [] }}
          locale={locale}
        />
        <div className="my-10">
          <PhotoGrid photos={photographyVideo?.gallery || []} />
        </div>
      </section>

      {/* Photography & Video Packages Section */}

      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
        <BlockContent
          content={photographyVideo?.paragraph2 || { en: [], es: [] }}
          locale={locale}
        />
      </section>
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
  const pageSeo = await getPageSeo("photography-video")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl =
      "https://www.puntacanaphotoedition.com/weddings/photography-video"
  } else {
    canonicalUrl =
      "https://www.puntacanaphotoedition.com/es/weddings/photography-video"
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
    // Add caching headers to metadata
    other: {
      "Cache-Control":
        "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    },
  }
}
