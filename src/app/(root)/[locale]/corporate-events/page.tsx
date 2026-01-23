import nextDynamic from "next/dynamic"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCorporateEvents } from "@/sanity/queries/CorporateEvents/CorporateEvents"
import BlockContent from "@/components/BlockContent/BlockContent"
import TextComponent from "@/components/TextComponent/TextComponent"
import { getCorporateEventPackages } from "@/sanity/queries/CorporateEvents/CorporateEventPackages"

// Dynamically import hero components - keep SSR for SEO
const BackgroundImage = nextDynamic(
  () => import("@/components/HeroComponent/BackgroundImage"),
  {
    ssr: true, // Keep SSR for above-the-fold content and SEO
  }
)

const BackgroundVideo = nextDynamic(
  () => import("@/components/HeroComponent/BackgroundVideo"),
  {
    ssr: true, // Keep SSR for above-the-fold content and SEO
  }
)

// Code-split below-the-fold components for better performance
const PhotoGrid = nextDynamic(
  () => import("@/components/PhotoGrid/PhotoGrid"),
  {
    loading: () => (
      <div className="w-full px-2 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="animate-pulse aspect-square bg-gray-200 rounded-lg"
            />
          ))}
        </div>
      </div>
    ),
  }
)

const CorporateEventsPackages = nextDynamic(
  () =>
    import("@/components/CorporateEventsComponents/CorporateEventsPackages"),
  {
    loading: () => (
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-12 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="animate-pulse h-96 bg-gray-200 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  }
)

const CorporateEventsCalculatorForm = nextDynamic(
  () =>
    import(
      "@/components/CorporateEventsComponents/CorporateEventsCalculatorForm"
    ),
  {
    loading: () => (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
          <div className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    ),
  }
)

const CorporateEventTestimonialsComponent = nextDynamic(
  () =>
    import(
      "@/components/CorporateEventsComponents/CorporateEventTestimonials"
    ),
  {
    loading: () => (
      <section className="py-16 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-12 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="animate-pulse h-64 bg-gray-200 rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  }
)

const CorporateFaqs = nextDynamic(
  () => import("@/components/CorporateEventsComponents/CorporateFaqs"),
  {
    loading: () => (
      <div className="max-w-4xl mx-auto w-full py-16">
        <div className="animate-pulse h-12 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="animate-pulse h-24 bg-gray-200 rounded-lg"
            />
          ))}
        </div>
      </div>
    ),
  }
)

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
          <CorporateEventsCalculatorForm
            services={corporateEvents?.servicesCalculator || []}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <CorporateEventTestimonialsComponent
            locale={locale}
            testimonials={corporateEvents?.testimonials || []}
            title={{ en: "Testimonials", es: "Testimonios" }}
          />
        </section>
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <CorporateFaqs
            title={corporateEvents?.faqsTitle || { en: "", es: "" }}
            faqs={corporateEvents?.corporateFaqs || []}
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
  const pageSeo = await getPageSeo("corporate-events")

  if (!pageSeo) {
    return {}
  }

  const enUrl = "https://puntacanaphotoedition.com/corporate-events"
  const esUrl = "https://puntacanaphotoedition.com/es/corporate-events"
  const canonicalUrl = locale === "en" ? enUrl : esUrl

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
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
    // Add caching headers to metadata
    other: {
      "Cache-Control":
        "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    },
  }
}
