



export default async function Proposals({
    params,
  }: {
    params: Promise<{ locale: "en" | "es" }>
  }) {
    const { locale } = await params

    return (
        <div>
            <h1>Proposals</h1>
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
        title: "Proposals",
        description: "Proposals",
    }
}