import BlockContent from "@/components/BlockContent/BlockContent"
import ContentBlock from "@/components/ContentBlockComponents/ContentBlock"
import Faqs from "@/components/FaqsComponents/Faqs"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import PhotoshootPackageCard from "@/components/PhotoshootPackageComponents/PhotoshootPackageCard"
import PhotoshootTestimonials from "@/components/TestimonialsComponents/PhotoshootTestimonials"
import TextComponent from "@/components/TextComponent/TextComponent"
import { getPhotoshoot } from "@/sanity/queries/Photoshoot/Photoshoot"
import {
  getAllPhotoshootsPackages,
  PhotoshootsPackages,
} from "@/sanity/queries/Photoshoot/PhotoshootsPackages"

import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function Photoshoots({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, photoshoot, photoshootsPackages] = await Promise.all([
    getStructuredData("photoshoots"),
    getPhotoshoot(),
    getAllPhotoshootsPackages(),
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
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <TextComponent
            title={photoshoot?.galleryTitle?.[locale]}
            className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
          />
          <PhotoGrid photos={photoshoot?.gallery || []} />
        </section>
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={photoshoot?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl my-12 mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoshootsPackages?.map((photoPackage: PhotoshootsPackages) => (
              <PhotoshootPackageCard
                key={photoPackage._id}
                photoPackage={photoPackage}
                locale={locale}
              />
            ))}
          </div>
        </section>
        {photoshoot?.contentBlock && (
          <ContentBlock
            title={photoshoot.contentBlock.title?.[locale] || ""}
            subTitle={photoshoot.contentBlock.subTitle?.[locale] || ""}
            content={photoshoot.contentBlock.content?.[locale] || ""}
            image={photoshoot.contentBlock.image}
            buttonText={photoshoot.contentBlock.buttonText?.[locale] || ""}
            buttonLink={photoshoot.contentBlock.buttonLink || ""}
            locale={locale}
            page="photoshoots"
          />
        )}
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={photoshoot?.paragraph2 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <PhotoshootTestimonials
            testimonials={photoshoot?.testimonials || []}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4">
          <Faqs faqs={photoshoot?.faqComponent || []} locale={locale} />
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
    // Add caching headers to metadata
    other: {
      "Cache-Control":
        "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    },
  }
}
