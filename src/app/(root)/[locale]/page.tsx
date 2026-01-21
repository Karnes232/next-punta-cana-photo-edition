import nextDynamic from "next/dynamic"
import ServicesOffered from "@/components/ServicesOfferedComponents/ServicesOffered"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getHomepage } from "@/sanity/queries/HomePage/Homepage"
import LazyLoadedSections from "@/components/LazyLoadedSections/LazyLoadedSections"

// Dynamically import heavy components to reduce initial bundle size
// Hero components are above-the-fold - keep SSR for SEO but still code-split
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

// ContentBlock uses react-icons - make it dynamic for better code splitting
const ContentBlock = nextDynamic(
  () => import("@/components/ContentBlockComponents/ContentBlock"),
  {
    ssr: true, // Keep SSR but code-split the component
  }
)

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
  }>
}

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  // Fetch data with caching - parallel requests
  const [structuredData, homepage] = await Promise.all([
    getStructuredData("home"),
    getHomepage(),
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
        {homepage?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={homepage?.hero?.heroVideo || ""}
            fullSize={homepage?.hero?.fullSize || false}
            title={homepage?.hero?.title?.[locale] || ""}
            subtitle={homepage?.hero?.subtitle?.[locale] || ""}
          />
        ) : (
          <BackgroundImage
            heroImages={homepage?.hero?.heroImage || []}
            fullSize={homepage?.hero?.fullSize || false}
            title={homepage?.hero?.title?.[locale] || ""}
            subtitle={homepage?.hero?.subtitle?.[locale] || ""}
          />
        )}
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <ServicesOffered locale={locale} />
        </div>
        <ContentBlock
          title={homepage?.contentBlock?.title[locale] || ""}
          subTitle={homepage?.contentBlock?.subTitle[locale] || ""}
          content={(homepage?.contentBlock?.content[locale] as string) || ""}
          image={homepage?.contentBlock?.image || ""}
          buttonText={homepage?.contentBlock?.buttonText[locale] || ""}
          buttonLink={homepage?.contentBlock?.buttonLink || ""}
          locale={locale}
          page="home"
        />
        <LazyLoadedSections
          galleryTitle={
            (homepage?.titleGallery?.[
              locale as keyof typeof homepage.titleGallery
            ] as string) || ""
          }
          galleryImages={homepage?.galleryImages || []}
          testimonialsLocale={locale}
          testimonialsTitle={
            (homepage?.titleTestimonials?.[
              locale as keyof typeof homepage.titleTestimonials
            ] as string) || ""
          }
          testimonials={homepage?.testimonials || []}
        />
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
    other: {
      "Cache-Control":
        "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    },
  }
}
