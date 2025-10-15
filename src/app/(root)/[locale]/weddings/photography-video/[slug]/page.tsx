import { notFound } from "next/navigation"
import BlockContent from "@/components/BlockContent/BlockContent"
import { getAllPhotographyVideoPackages } from "@/sanity/queries/Photography-Video/Photography-video-packages"
import { getPageSeo } from "@/sanity/queries/SEO/seo"
import { Cormorant_Garamond, Montserrat } from "next/font/google"

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
  const packages = await getAllPhotographyVideoPackages()
  
  const packageItem = packages?.find(pkg => pkg.slug.current === slug)
  
  if (!packageItem) {
    notFound()
  }

  const title = packageItem.title[locale] || packageItem.title.en
  const description = packageItem.description[locale] || packageItem.description.en

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-darkGray to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className={`${coromantGaramond.className} text-5xl md:text-6xl font-semibold mb-6`}>
            {title}
          </h1>
          <p className={`${montserrat.className} text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed`}>
            {description}
          </p>
        </div>
      </section>

      {/* Package Details */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-caribbeanTurquoise to-luxuryGold text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
                {title}
              </div>
              
              <div className="mb-8">
                <p className={`${montserrat.className} text-gray-600 text-lg leading-relaxed mb-6`}>
                  {description}
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className={`${coromantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                    Starting Price
                  </h3>
                  <p className={`${coromantGaramond.className} text-4xl font-semibold text-luxuryGold`}>
                    ${packageItem.startingPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center bg-gradient-to-r from-caribbeanTurquoise/10 to-luxuryGold/10 rounded-xl p-8">
              <h3 className={`${coromantGaramond.className} text-2xl font-semibold text-darkGray mb-4`}>
                Ready to Book?
              </h3>
              <p className={`${montserrat.className} text-gray-600 mb-6`}>
                Contact us today to discuss your photography and video needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className={`${montserrat.className} bg-caribbeanTurquoise hover:bg-caribbeanTurquoise/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300`}
                >
                  Get in Touch
                </a>
                <a
                  href="/weddings/photography-video"
                  className={`${montserrat.className} border-2 border-luxuryGold text-luxuryGold hover:bg-luxuryGold hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300`}
                >
                  View All Packages
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
