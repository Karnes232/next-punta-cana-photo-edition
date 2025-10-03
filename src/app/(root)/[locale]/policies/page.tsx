



export default async function Policies({
    params,
  }: {
    params: Promise<{ locale: "en" | "es" }>
  }) {
    const { locale } = await params

    return (
        <div>
            <h1>Policies</h1>
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
        title: "Policies",
        description: "Policies",
    }
}