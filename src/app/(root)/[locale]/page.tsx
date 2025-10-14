import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import ServicesOffered from "@/components/ServicesOfferedComponents/ServicesOffered"
import SwiperGallery from "@/components/SwiperGallery/SwiperGallery"
import { getHomePageGallery } from "@/sanity/queries/HomePage/Gallery"
import { getHero } from "@/sanity/queries/HomePage/Hero"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import TestimonialsComponent from "@/components/TestimonialsComponents/TestimonialComponent"
import ContentBlock from "@/components/ContentBlockComponents/ContentBlock"
import { getContentBlock } from "@/sanity/queries/HomePage/ContentBlock"
import { getHomepage } from "@/sanity/queries/HomePage/Homepage"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
  }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  const structuredData = await getStructuredData("home")
  const homepage = await getHomepage()

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
        />{" "}
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <SwiperGallery
            title={(homepage?.titleGallery?.[locale as keyof typeof homepage.titleGallery] as string) || ""}
            images={homepage?.galleryImages || []}
          />
        </div>
        <TestimonialsComponent locale={locale} titleTestimonials={homepage?.titleTestimonials?.[locale as keyof typeof homepage.titleTestimonials] as string || ""} testimonials={homepage?.testimonials || []} />
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
