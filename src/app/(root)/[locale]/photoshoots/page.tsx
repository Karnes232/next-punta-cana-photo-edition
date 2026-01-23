import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import TextComponent from "@/components/TextComponent/TextComponent"
import { getPhotoshoot } from "@/sanity/queries/Photoshoot/Photoshoot"
import {
  getAllPhotoshootsPackages,
  PhotoshootsPackages,
} from "@/sanity/queries/Photoshoot/PhotoshootsPackages"

import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import dynamicImport from "next/dynamic"
import { Suspense } from "react"

// Dynamically import below-the-fold components for better performance
const PhotoGrid = dynamicImport(
  () => import("@/components/PhotoGrid/PhotoGrid"),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading gallery...</div>
      </div>
    ),
  }
)

const PhotoshootPackageCard = dynamicImport(
  () =>
    import(
      "@/components/PhotoshootPackageComponents/PhotoshootPackageCard"
    ),
  {
    loading: () => (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse h-full">
        <div className="h-96 bg-gray-200"></div>
        <div className="p-5 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    ),
  }
)

const ContentBlock = dynamicImport(
  () => import("@/components/ContentBlockComponents/ContentBlock"),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse text-gray-400">Loading content...</div>
      </div>
    ),
  }
)

const PhotoshootTestimonials = dynamicImport(
  () =>
    import("@/components/TestimonialsComponents/PhotoshootTestimonials"),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-gray-400">Loading testimonials...</div>
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
        <Suspense
          fallback={
            <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
              <TextComponent
                title={photoshoot?.galleryTitle?.[locale]}
                className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
              />
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-pulse text-gray-400">
                  Loading gallery...
                </div>
              </div>
            </section>
          }
        >
          <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
            <TextComponent
              title={photoshoot?.galleryTitle?.[locale]}
              className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
            />
            <PhotoGrid photos={photoshoot?.gallery || []} />
          </section>
        </Suspense>
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={photoshoot?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <Suspense
          fallback={
            <section className="max-w-7xl my-12 mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse h-full"
                  >
                    <div className="h-96 bg-gray-200"></div>
                    <div className="p-5 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          }
        >
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
        </Suspense>
        {photoshoot?.contentBlock && (
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="animate-pulse text-gray-400">
                  Loading content...
                </div>
              </div>
            }
          >
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
          </Suspense>
        )}
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={photoshoot?.paragraph2 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <Suspense
          fallback={
            <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-pulse text-gray-400">
                  Loading testimonials...
                </div>
              </div>
            </section>
          }
        >
          <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
            <PhotoshootTestimonials
              testimonials={photoshoot?.testimonials || []}
              locale={locale}
            />
          </section>
        </Suspense>
        <Suspense
          fallback={
            <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4">
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-pulse text-gray-400">Loading FAQs...</div>
              </div>
            </section>
          }
        >
          <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4">
            <Faqs faqs={photoshoot?.faqComponent || []} locale={locale} />
          </section>
        </Suspense>
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

  const enUrl = "https://puntacanaphotoedition.com/photoshoots"
  const esUrl = "https://puntacanaphotoedition.com/es/photoshoots"
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
