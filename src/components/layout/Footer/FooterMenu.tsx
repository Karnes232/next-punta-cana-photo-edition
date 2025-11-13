"use client"
import { useTranslations } from "next-intl"
import { Cormorant_Garamond } from "next/font/google"
import Link from "next/link"
import React from "react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const FooterMenu = () => {
  const t = useTranslations("Footer")
  return (
    <aside className="ml-0 h-full flex flex-col justify-center space-y-3 overflow-hidden">
      <Link
        href="/"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Home")}
        </p>
      </Link>

      <Link
        href="/photoshoots"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Photoshoots")}
        </p>
      </Link>

      <Link
        href="/wedding-photography"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Weddings")}
        </p>
      </Link>

      <Link
        href="/wedding-planning"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Wedding Planning")}
        </p>
      </Link>

      <Link
        href="/proposals"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Proposals")}
        </p>
      </Link>

      <Link
        href="/corporate-events"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Corporate Events")}
        </p>
      </Link>

      <Link
        href="/stories"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Stories & Blog")}
        </p>
      </Link>

      <Link
        href="/about"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("About")}
        </p>
      </Link>

      <Link
        href="/contact"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Contact")}
        </p>
      </Link>

      <Link
        href="/faq"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("FAQ")}
        </p>
      </Link>

      <Link
        href="/policies"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          {t("Policies")}
        </p>
      </Link>
    </aside>
  )
}

export default FooterMenu
