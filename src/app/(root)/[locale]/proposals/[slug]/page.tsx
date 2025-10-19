import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getProposalPackagesBySlug } from "@/sanity/queries/Proposal/ProposalPackages"
import { notFound } from "next/navigation"


interface PageProps {
    params: Promise<{
      locale: "en" | "es"
      slug: string
    }>
}

export default async function ProposalPackagePage({ params }: PageProps) {
    const { locale, slug } = await params
    const proposalPackage = await getProposalPackagesBySlug(slug)
    console.log(proposalPackage)
    if (!proposalPackage) {
        notFound()
    }
    return (
      <>
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
        </section>
      </main>
      </>
    )
}