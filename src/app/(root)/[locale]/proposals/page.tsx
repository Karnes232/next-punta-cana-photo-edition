import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import TextComponent from "@/components/TextComponent/TextComponent"
import { getProposal } from "@/sanity/queries/Proposal/Proposal"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import TestimonialsComponent from "@/components/TestimonialsComponents/TestimonialComponent"
import { getAllProposalPackages } from "@/sanity/queries/Proposal/ProposalPackages"
import ProposalComponent from "@/components/ProposalComponents/ProposalComponent"
import NewArrivals from "@/components/ProposalComponents/NewArrivals"

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
        <section className="max-w-7xl mx-auto flex flex-col my-5 gap-4">
          <TextComponent
            title={proposal?.galleryTitle?.[locale]}
            className="mb-12 tracking-wide text-3xl lg:text-4xl text-center"
          />
          <PhotoGrid photos={proposal?.gallery || []} />
        </section>
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={proposal?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <ProposalComponent
            proposalPackages={proposalPackages || []}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl my-12 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <NewArrivals
            title={proposal?.newArrivalsTitle?.[locale] || ""}
            subtitle={proposal?.newArrivalsSubtitle?.[locale] || ""}
            badge={proposal?.newArrivalsBadge?.[locale] || ""}
            images={proposal?.newArrivalImages || []}
            locale={locale}
          />
        </section>
        <TestimonialsComponent
          locale={locale}
          titleTestimonials={
            (proposal?.titleTestimonials?.[
              locale as keyof typeof proposal.titleTestimonials
            ] as string) || ""
          }
          testimonials={proposal?.testimonials || []}
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
  const pageSeo = await getPageSeo("proposals")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.puntacanaphotoedition.com/proposals"
  } else {
    canonicalUrl = "https://www.puntacanaphotoedition.com/es/proposals"
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
