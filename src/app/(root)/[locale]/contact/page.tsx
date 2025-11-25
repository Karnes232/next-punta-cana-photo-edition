import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import ContactForm from "@/components/Forms/ContactForm"
import { getContact } from "@/sanity/queries/Contact/Contact"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, contact] = await Promise.all([
    getStructuredData("contact"),
    getContact(),
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
        {contact?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={contact?.hero?.heroVideo}
            fullSize={contact?.hero?.fullSize}
            title={contact?.hero?.title?.[locale]}
            subtitle={contact?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={contact?.hero?.heroImage || []}
            fullSize={contact?.hero?.fullSize}
            title={contact?.hero?.title?.[locale]}
            subtitle={contact?.hero?.subtitle?.[locale]}
          />
        )}
      </main>
      <ContactForm locale={locale} />
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
  const pageSeo = await getPageSeo("contact")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/contact"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/contact"
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title || pageSeo.seo.meta[locale].title,
      description: pageSeo.seo.openGraph[locale].description || pageSeo.seo.meta[locale].description,
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
