interface PageProps {
  params: Promise<{
    locale: "en" | "es"
  }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
