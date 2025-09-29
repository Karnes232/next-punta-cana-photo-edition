import BackgroundVideo from "@/components/HeroComponent/BackgroundVideo"
import { getHero } from "@/sanity/queries/HomePage/Hero"

interface PageProps {
  params: Promise<{
    locale: "en" | "es"
  }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  const hero = await getHero()
  console.log(hero)
  return (
    <main>
      {hero?.heroVideo ? <BackgroundVideo heroVideo={hero.heroVideo} fullSize={true} title={hero.title[locale]} subtitle={hero.subtitle[locale]} /> : <></> }
      <h1>Home</h1>
    </main>
  )
}
