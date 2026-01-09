import { notFound } from "next/navigation"
import BlockContent from "@/components/BlockContent/BlockContent"
import {
  getAllPhotographyVideoPackages,
  getPhotographyVideoPackageBySlug,
  getPhotographyVideoPackageSEO,
} from "@/sanity/queries/Photography-Video/Photography-video-packages"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import PhotoSwiper from "@/components/PhotoSwiper/PhotoSwiper"
import PhotographyVideoPackageWithForm from "@/components/PhotographyVideoPackageComponents/PhotographyVideoPackageWithForm"
import VimeoVideo from "@/components/VimeoVideo/VimeoVideo"

interface PhotographyVideoPackagePageProps {
  params: Promise<{
    locale: "en" | "es"
    slug: string
  }>
}

// Add revalidation configuration
export const revalidate = 259200
export const dynamic = "force-static"

export default async function PhotographyVideoPackagePage({
  params,
}: PhotographyVideoPackagePageProps) {
  const { locale, slug } = await params

  // Fetch data with caching - parallel requests
  const [packageItem] = await Promise.all([
    getPhotographyVideoPackageBySlug(slug),
  ])

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
          <PhotoSwiper photos={packageItem.gallery || []} />
        </div>
      </section>
      {packageItem.vimeoUrl && ( 
        <section className="max-w-7xl my-10 mx-5 xl:mx-auto flex flex-col gap-4">
          <VimeoVideo vimeoUrl={packageItem.vimeoUrl} />
        </section>
       )} 
      <section className="max-w-7xl my-5 mx-5 xl:mx-auto flex flex-col gap-4 text-center">
        <PhotographyVideoPackageWithForm
          packageData={{
            title: packageItem.hero.title,
            startingPrice: packageItem.startingPrice,

            includedItems: packageItem.includedItems,
          }}
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
