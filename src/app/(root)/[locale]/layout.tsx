import type { Metadata } from "next"
import { Geist, Geist_Mono, Crimson_Pro } from "next/font/google"
import "../../globals.css"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import {
  getFavicon,
  getLogo,
  getWhatsAppNumber,
  getSocialLinks,
} from "@/sanity/queries/GeneralLayout/GeneralLayout"
import Navbar from "@/components/layout/Navbar/Navbar"
import Footer from "@/components/layout/Footer/Footer"
import ImageProtectionScript from "@/components/ImageProtection/ImageProtectionScript"
import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/lib/client"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import FloatingCtaButton from "@/components/FloatingCtaButton/FloatingCtaButton"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevent render blocking
  preload: true, // Preload critical font
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Prevent render blocking
  preload: false, // Not critical for initial render
})

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  display: "swap", // Prevent render blocking
  preload: false, // Not critical for initial render
})

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
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

  const [logo, whatsAppNumber, socialLinks] = await Promise.all([
    getLogo(),
    getWhatsAppNumber(),
    getSocialLinks(),
  ])

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
          <div className="min-h-screen flex flex-col">
            {logo && <Navbar logo={logo} />}
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
          <FloatingCtaButton
            telephone={whatsAppNumber?.telephone || "18295222900"}
            email={socialLinks?.email || "info@puntacanaphotoedition.com"}
            locale={locale as "en" | "es"}
          />
          {/* <ImageProtectionScript /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export async function generateMetadata() {
  const data = await getFavicon()

  const faviconUrl = data?.favicon
    ? urlFor(data.favicon).width(64).url()
    : "/favicon.png"

  return {
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  }
}
