



export default async function WeddingPlanning({
    params,
  }: {
    params: Promise<{ locale: "en" | "es" }>
  }) {
    const { locale } = await params

    return (
        <div>
            <h1>Wedding Planning</h1>
        </div>
    )
  }


  export async function generateMetadata({
    params,
  }: {
    params: Promise<{
      locale: "en" | "es"
    }>
  }) {
    const { locale } = await params

    return {
        title: "Wedding Planning",
        description: "Wedding Planning",
    }
}