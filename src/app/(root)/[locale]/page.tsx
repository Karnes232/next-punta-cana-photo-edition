import BackgroundImage from "@/components/HeroComponent/BackgroundImage"
import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import ServicesOffered from "@/components/ServicesOfferedComponents/ServicesOffered"
import { getHero } from "@/sanity/queries/HomePage/Hero"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
  }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  const hero = await getHero()

  return (
    <main>
      {hero?.heroVideo ? <BackgroundVideo heroVideo={hero.heroVideo} fullSize={true} title={hero.title[locale]} subtitle={hero.subtitle[locale]} /> : <BackgroundImage heroImages={hero?.heroImage || []} fullSize={true} title={hero?.title?.[locale]} subtitle={hero?.subtitle?.[locale]} /> }
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <ServicesOffered />
      </div>
    </main>
  )
}
