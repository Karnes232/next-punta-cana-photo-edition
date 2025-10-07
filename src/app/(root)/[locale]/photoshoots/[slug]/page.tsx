import BlockContent from "@/components/BlockContent/BlockContent"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import PackageSwiperGallery from "@/components/SwiperGallery/PackageSwiperGallery"
import { getIndividualPhotoshootsPackage } from "@/sanity/queries/Photoshoot/PhotoshootsPackages"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
    slug: string
  }>
}

export default async function PhotoshootsPackage({ params }: PageProps) {
  const { locale, slug } = await params
  console.log(slug)
  const photoshootsPackage = await getIndividualPhotoshootsPackage(slug)
  console.log(photoshootsPackage)
  return (
    <>
      <main>
        <BackgroundImage
          heroImages={photoshootsPackage?.heroImages || []}
          fullSize={false}
          title={photoshootsPackage?.heroTitle?.[locale]}
          subtitle={photoshootsPackage?.heroSubtitle?.[locale]}
        />
        <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
          <BlockContent
            content={photoshootsPackage?.paragraph1 || { en: [], es: [] }}
            locale={locale}
          />
        </section>
        <PackageSwiperGallery
          images={photoshootsPackage?.photoGallery || []}
        />
      </main>
    </>
  )
}
