import { notFound } from "next/navigation"
import BlockContent from "@/components/BlockContent/BlockContent"
import {
  getAllPhotographyVideoPackages,
  getPhotographyVideoPackageBySlug,
  getPhotographyVideoPackageSEO,
  PhotographyVideoPackages,
} from "@/sanity/queries/Photography-Video/Photography-video-packages"
import { getPageSeo } from "@/sanity/queries/SEO/seo"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import Link from "next/link"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid"
import ServicesCalculator from "@/components/PhotographyVideoPackageComponents/ServicesCalculator"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface PhotographyVideoPackagePageProps {
  params: Promise<{
    locale: "en" | "es"
    slug: string
  }>
}

export default async function PhotographyVideoPackagePage({
  params,
}: PhotographyVideoPackagePageProps) {
  const { locale, slug } = await params
  const packageItem = await getPhotographyVideoPackageBySlug(slug)
  console.log(packageItem)

  if (!packageItem) {
    notFound()
  }

  return (
    <>
      {packageItem.hero?.heroVideo ? (
        <BackgroundVideo
          heroVideo={packageItem.hero.heroVideo}
          fullSize={packageItem.hero.fullSize}
          title={packageItem.hero?.title?.[locale]}
          subtitle={packageItem.hero?.subtitle?.[locale]}
        />
      ) : (
        <BackgroundImage
          heroImages={packageItem.hero.heroImage || []}
          fullSize={packageItem.hero.fullSize}
          title={packageItem.hero.title?.[locale]}
          subtitle={packageItem.hero.subtitle?.[locale]}
        />
      )}
      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
        <BlockContent
          content={packageItem?.paragraph1 || { en: [], es: [] }}
          locale={locale}
        />
        <div className="my-10">
          <PhotoGrid photos={packageItem.gallery || []} />
        </div>
      </section>
      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
        <ServicesCalculator
          hourlyRate={packageItem.hourlyRate}
          minimumHours={packageItem.minimumHours}
          additions={packageItem.addtions}
          includedServices={packageItem.includedServices}
          locale={locale}
        />
      </section>
    </>
  )
}

export async function generateStaticParams() {
  const packages = await getAllPhotographyVideoPackages()

  if (!packages) return []

  const params: { locale: string; slug: string }[] = []

  packages.forEach(packageItem => {
    params.push({
      locale: "en",
      slug: packageItem.slug.current,
    })
    params.push({
      locale: "es",
      slug: packageItem.slug.current,
    })
  })

  return params
}

export async function generateMetadata({
  params,
}: PhotographyVideoPackagePageProps) {
  const { locale, slug } = await params

  const pageSeo = await getPhotographyVideoPackageSEO(slug)

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://www.puntacanaphotoedition.com/weddings/photography-video/${slug}`
  } else {
    canonicalUrl = `https://www.puntacanaphotoedition.com/es/weddings/photography-video/${slug}`
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
