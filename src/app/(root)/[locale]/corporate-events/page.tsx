import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCorporateEvents } from "@/sanity/queries/CorporateEvents/CorporateEvents"
import BlockContent from "@/components/BlockContent/BlockContent"
import TextComponent from "@/components/TextComponent/TextComponent"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import { getCorporateEventPackages } from "@/sanity/queries/CorporateEvents/CorporateEventPackages"
import CorporateEventsPackages from "@/components/CorporateEventsComponents/CorporateEventsPackages"
import CorporateEventForm from "@/components/Forms/CorporateEventForm"
import CorporateEventTestimonialsComponent from "@/components/CorporateEventsComponents/CorporateEventTestimonials"
import Faqs from "@/components/FaqsComponents/Faqs"
import CorporateFaqs from "@/components/CorporateEventsComponents/CorporateFaqs"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function CorporateEvents({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, corporateEvents, corporateEventPackages] =
    await Promise.all([
      getStructuredData("corporate-events"),
      getCorporateEvents(),
      getCorporateEventPackages(),
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
        {corporateEvents?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={corporateEvents?.hero?.heroVideo}
            fullSize={corporateEvents?.hero?.fullSize}
            title={corporateEvents?.hero?.title?.[locale]}
            subtitle={corporateEvents?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={corporateEvents?.hero?.heroImage || []}
            fullSize={corporateEvents?.hero?.fullSize}
            title={corporateEvents?.hero?.title?.[locale]}
            subtitle={corporateEvents?.hero?.subtitle?.[locale]}
          />
        )}
        <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={corporateEvents?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <TextComponent
            title={corporateEvents?.galleryTitle?.[locale]}
            className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
          />
          <PhotoGrid photos={corporateEvents?.gallery || []} />
        </section>
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <CorporateEventsPackages
            packages={corporateEventPackages}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <CorporateEventForm locale={locale} />
        </section>
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <CorporateEventTestimonialsComponent
            locale={locale}
            testimonials={corporateEvents?.testimonials || []}
            title={{ en: "Testimonials", es: "Testimonios" }}
          />
        </section>
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <CorporateFaqs faqs={corporateEvents?.corporateFaqs || []} locale={locale} />
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
  const pageSeo = await getPageSeo("corporate-events")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/corporate-events"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/corporate-events"
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
