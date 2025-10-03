



export default async function Stories({
    params,
  }: {
    params: Promise<{ locale: "en" | "es" }>
  }) {
    const { locale } = await params

    return (
        <div>
            <h1>Stories</h1>
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
        title: "Stories",
        description: "Stories",
    }
}