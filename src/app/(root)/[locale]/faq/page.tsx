import FaqPageComponent from "@/components/FaqsPageComponents/FaqPageComponent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getFaqCategories } from "@/sanity/queries/Faqs/faqCategory"
import { getFaqs } from "@/sanity/queries/Faqs/Faqs"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"

export default async function FAQ({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const structuredData = await getStructuredData("faq")
  const faq = await getFaqs()
  const faqCategories = await getFaqCategories()

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
        {faq?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={faq?.hero?.heroVideo}
            fullSize={faq?.hero?.fullSize}
            title={faq?.hero?.title?.[locale]}
            subtitle={faq?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={faq?.hero?.heroImage || []}
            fullSize={faq?.hero?.fullSize}
            title={faq?.hero?.title?.[locale]}
            subtitle={faq?.hero?.subtitle?.[locale]}
          />
        )}
      </main>
      <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
        <FaqPageComponent faqCategories={faqCategories} locale={locale} />
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
  const pageSeo = await getPageSeo("faq")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/faq"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/faq"
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
