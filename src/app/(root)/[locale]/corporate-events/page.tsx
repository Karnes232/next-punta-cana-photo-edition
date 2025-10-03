



export default async function CorporateEvents({
    params,
  }: {
    params: Promise<{ locale: "en" | "es" }>
  }) {
    const { locale } = await params

    return (
        <div>
            <h1>Corporate Events</h1>
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
        title: "Corporate Events",
        description: "Corporate Events",
    }
}