import { notFound } from "next/navigation"
import BlockContent from "@/components/BlockContent/BlockContent"
import { getAllPhotographyVideoPackages, getPhotographyVideoPackageBySlug, PhotographyVideoPackages } from "@/sanity/queries/Photography-Video/Photography-video-packages"
import { getPageSeo } from "@/sanity/queries/SEO/seo"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import Link from "next/link"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import BackgroundImage from "@/components/HeroComponent/BackgroundImage"

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
    </>
  )
}

export async function generateStaticParams() {
  const packages = await getAllPhotographyVideoPackages()
  
  if (!packages) return []
  
  const params: { locale: string; slug: string }[] = []
  
  packages.forEach((packageItem) => {
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
  const packages = await getAllPhotographyVideoPackages()
  
  const packageItem = packages?.find(pkg => pkg.slug.current === slug)
  
  if (!packageItem) {
    return {
      title: "Package Not Found",
    }
  }

  const title = packageItem.title[locale] || packageItem.title.en
  const description = packageItem.description[locale] || packageItem.description.en

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = `https://www.puntacanaphotoedition.com/weddings/photography-video/${slug}`
  } else {
    canonicalUrl = `https://www.puntacanaphotoedition.com/es/weddings/photography-video/${slug}`
  }

  return {
    title: `${title} - Punta Cana Photo Edition`,
    description: description,
    url: canonicalUrl,
    openGraph: {
      title: `${title} - Punta Cana Photo Edition`,
      description: description,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
