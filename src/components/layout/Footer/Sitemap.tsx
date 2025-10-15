import { useTranslations } from "next-intl"
import { Cormorant_Garamond } from "next/font/google"
import Link from "next/link"
import React from "react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const Sitemap = () => {
  const t = useTranslations("Footer")
  return (
    <div className="flex flex-row space-x-4">
      <Link href="/" className={`${coromantGaramond.className} no-underline`}>
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Home")}
        </button>
      </Link>
      <Link
        href="/photoshoots"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Photoshoots")}
        </button>
      </Link>
      <Link
        href="/weddings"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Weddings")}
        </button>
      </Link>
      <Link
        href="/wedding-planning"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Wedding Planning")}
        </button>
      </Link>
      <Link
        href="/proposals"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Proposals")}
        </button>
      </Link>
      <Link
        href="/corporate-events"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Corporate Events")}
        </button>
      </Link>
      <Link
        href="/stories"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Stories & Blog")}
        </button>
      </Link>
      <Link
        href="/about"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("About")}
        </button>
      </Link>
      <Link
        href="/contact"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Contact")}
        </button>
      </Link>
      <Link
        href="/faq"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("FAQ")}
        </button>
      </Link>
      <Link
        href="/policies"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer hover:text-caribbeanTurquoise`}
          translate="no"
        >
          {t("Policies")}
        </button>
      </Link>
    </div>
  )
}

export default Sitemap
