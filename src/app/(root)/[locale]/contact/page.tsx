import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import ContactForm from "@/components/Forms/ContactForm"
import { getContact } from "@/sanity/queries/Contact/Contact"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("contact")
  const contact = await getContact()

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
