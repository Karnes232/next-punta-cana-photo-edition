import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import {
  getIndividualPhotoshootsPackage,
  getIndividualPhotoshootsPackageSEO,
  getIndividualPhotoshootsPackagesStructuredData,
} from "@/sanity/queries/Photoshoot/PhotoshootsPackages"
import dynamicImport from "next/dynamic"
import { Suspense } from "react"

// Dynamically import below-the-fold components for better performance
const PackageSwiperGallery = dynamicImport(
  () => import("@/components/SwiperGallery/PackageSwiperGallery"),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading gallery...</div>
      </div>
    ),
  }
)

const PhotoshootPackageForm = dynamicImport(
  () => import("@/components/Forms/PhotoshootPackageForm"),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse text-gray-400">Loading form...</div>
      </div>
    ),
  }
)

const Faqs = dynamicImport(() => import("@/components/FaqsComponents/Faqs"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-pulse text-gray-400">Loading FAQs...</div>
    </div>
  ),
})

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
    slug: string
  }>
}

export default async function PhotoshootsPackage({ params }: PageProps) {
  const { locale, slug } = await params

  // Fetch data with caching - parallel requests
  const [photoshootsPackage, structuredData] = await Promise.all([
    getIndividualPhotoshootsPackage(slug),
    getIndividualPhotoshootsPackagesStructuredData(slug),
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
        {photoshootsPackage?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={photoshootsPackage?.hero?.heroVideo}
            fullSize={photoshootsPackage?.hero?.fullSize}
            title={photoshootsPackage?.hero?.title?.[locale]}
            subtitle={photoshootsPackage?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={photoshootsPackage?.hero?.heroImage || []}
            fullSize={photoshootsPackage?.hero?.fullSize}
            title={photoshootsPackage?.hero?.title?.[locale]}
            subtitle={photoshootsPackage?.hero?.subtitle?.[locale]}
          />
        )}
        <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={photoshootsPackage?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-pulse text-gray-400">Loading gallery...</div>
            </div>
          }
        >
          <PackageSwiperGallery images={photoshootsPackage?.photoGallery || []} />
        </Suspense>
        <Suspense
          fallback={
            <section className="max-w-7xl my-5 xl:mx-auto flex flex-col gap-4">
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="animate-pulse text-gray-400">Loading form...</div>
              </div>
            </section>
          }
        >
          <section className="max-w-7xl my-5 xl:mx-auto flex flex-col gap-4">
            <PhotoshootPackageForm
              page={photoshootsPackage?.slug?.current || ""}
              locale={locale}
            />
          </section>
        </Suspense>
        <Suspense
          fallback={
            <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4">
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-pulse text-gray-400">Loading FAQs...</div>
              </div>
            </section>
          }
        >
          <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4">
            <Faqs faqs={photoshootsPackage?.faqComponent || []} locale={locale} />
          </section>
        </Suspense>
      </main>
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const pageSeo = await getIndividualPhotoshootsPackageSEO(slug)

  if (!pageSeo) {
    return {}
  }

  const enUrl = `https://puntacanaphotoedition.com/photoshoots/${slug}`
  const esUrl = `https://puntacanaphotoedition.com/es/photoshoots/${slug}`
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
