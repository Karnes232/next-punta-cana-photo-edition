import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import TextComponent from "@/components/TextComponent/TextComponent"
import { getProposal } from "@/sanity/queries/Proposal/Proposal"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getAllProposalPackages } from "@/sanity/queries/Proposal/ProposalPackages"
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

const ProposalComponent = dynamicImport(
  () => import("@/components/ProposalComponents/ProposalComponent"),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse text-gray-400">Loading packages...</div>
      </div>
    ),
  }
)

const NewArrivals = dynamicImport(
  () => import("@/components/ProposalComponents/NewArrivals"),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse text-gray-400">Loading new arrivals...</div>
      </div>
    ),
  }
)

const TestimonialsComponent = dynamicImport(
  () => import("@/components/TestimonialsComponents/TestimonialComponent"),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-gray-400">Loading testimonials...</div>
      </div>
    ),
  }
)

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

export default async function Proposals({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  // Fetch data with caching - parallel requests
  const [structuredData, proposal, proposalPackages] = await Promise.all([
    getStructuredData("proposals"),
    getProposal(),
    getAllProposalPackages(),
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
        {proposal?.hero?.heroVideo ? (
          <BackgroundVideo
            heroVideo={proposal?.hero?.heroVideo}
            fullSize={proposal?.hero?.fullSize}
            title={proposal?.hero?.title?.[locale]}
            subtitle={proposal?.hero?.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={proposal?.hero?.heroImage || []}
            fullSize={proposal?.hero?.fullSize}
            title={proposal?.hero?.title?.[locale]}
            subtitle={proposal?.hero?.subtitle?.[locale]}
          />
        )}
        <Suspense
          fallback={
            <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
              <TextComponent
                title={proposal?.galleryTitle?.[locale]}
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
              title={proposal?.galleryTitle?.[locale]}
              className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
            />
            <PhotoGrid photos={proposal?.gallery || []} />
          </section>
        </Suspense>
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={proposal?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <Suspense
          fallback={
            <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="animate-pulse text-gray-400">
                  Loading packages...
                </div>
              </div>
            </section>
          }
        >
          <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
            <ProposalComponent
              proposalPackages={proposalPackages || []}
              locale={locale}
            />
          </section>
        </Suspense>
        <Suspense
          fallback={
            <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="animate-pulse text-gray-400">
                  Loading new arrivals...
                </div>
              </div>
            </section>
          }
        >
          <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
            <NewArrivals
              title={proposal?.newArrivalsTitle?.[locale] || ""}
              subtitle={proposal?.newArrivalsSubtitle?.[locale] || ""}
              badge={proposal?.newArrivalsBadge?.[locale] || ""}
              images={proposal?.newArrivalImages || []}
              locale={locale}
            />
          </section>
        </Suspense>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="animate-pulse text-gray-400">
                Loading testimonials...
              </div>
            </div>
          }
        >
          <TestimonialsComponent
            locale={locale}
            titleTestimonials={
              (proposal?.titleTestimonials?.[
                locale as keyof typeof proposal.titleTestimonials
              ] as string) || ""
            }
            testimonials={proposal?.testimonials || []}
          />
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
  const pageSeo = await getPageSeo("proposals")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://puntacanaphotoedition.com/proposals"
  } else {
    canonicalUrl = "https://puntacanaphotoedition.com/es/proposals"
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
    // Add caching headers to metadata
    other: {
      "Cache-Control":
        "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    },
  }
}
