import BlockContent from "@/components/BlockContent/BlockContent"
import ProposalPackageForm from "@/components/Forms/ProposalPackageForm"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import NewArrivals from "@/components/ProposalComponents/NewArrivals"
import {
  getProposalPackagesBySlug,
  getProposalPackagesBySlugSEO,
  getProposalPackagesBySlugStructuredData,
} from "@/sanity/queries/Proposal/ProposalPackages"
import { notFound } from "next/navigation"

// Add revalidation configuration
export const revalidate = 259200 // Revalidate every 3 days
export const dynamic = "force-static" // Force static generation

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
    slug: string
  }>
}

export default async function ProposalPackagePage({ params }: PageProps) {
  const { locale, slug } = await params

  // Fetch data with caching - parallel requests
  const [proposalPackage, structuredData] = await Promise.all([
    getProposalPackagesBySlug(slug),
    getProposalPackagesBySlugStructuredData(slug),
  ])

  if (!proposalPackage) {
    notFound()
  }

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
        {proposalPackage.hero.heroVideo ? (
          <BackgroundVideo
            heroVideo={proposalPackage.hero.heroVideo}
            fullSize={proposalPackage.hero.fullSize}
            title={proposalPackage.hero.title?.[locale]}
            subtitle={proposalPackage.hero.subtitle?.[locale]}
          />
        ) : (
          <BackgroundImage
            heroImages={proposalPackage.hero.heroImage || []}
            fullSize={proposalPackage.hero.fullSize}
            title={proposalPackage.hero?.title?.[locale]}
            subtitle={proposalPackage.hero?.subtitle?.[locale]}
          />
        )}
        <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={proposalPackage.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
          <PhotoGrid photos={proposalPackage?.photoGallery || []} />
        </section>
        <section className="max-w-7xl my-10 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={proposalPackage.paragraph2 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <section className="max-w-7xl my-5 xl:mx-auto flex flex-col gap-4">
          <ProposalPackageForm
            additions={proposalPackage.additions || []}
            startingPrice={proposalPackage.packageCardStartingPrice}
            page={proposalPackage.hero.title?.[locale] || ""}
            locale={locale}
          />
        </section>
      </main>
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const pageSeo = await getProposalPackagesBySlugSEO(slug)

  if (!pageSeo) {
    return {}
  }

  const enUrl = `https://puntacanaphotoedition.com/proposals/${slug}`
  const esUrl = `https://puntacanaphotoedition.com/es/proposals/${slug}`
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
