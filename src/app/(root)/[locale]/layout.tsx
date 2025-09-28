import type { Metadata } from "next"
import { Geist, Geist_Mono, Crimson_Pro } from "next/font/google"
import "../../globals.css"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { getLogo } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import Navbar from "@/components/layout/Navbar/Navbar"
import Footer from "@/components/layout/Footer/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Punta Cana Photo Edition",
  description: "Punta Cana Photo Edition",
}

// Add caching headers for better performance
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const logo = await getLogo()

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  let messages
  try {
    messages = (await import(`../../../../messages/${locale}.json`)).default
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error)
    // Fallback to English messages
    messages = (await import(`../../../../messages/en.json`)).default
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonPro.variable}`}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          key={locale}
        >
          <div className="min-h-screen bg-black/50 flex flex-col">
            {logo && <Navbar logo={logo} />}
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
