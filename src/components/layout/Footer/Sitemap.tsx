import { Cormorant_Garamond } from "next/font/google"
import Link from "next/link"
import React from "react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const Sitemap = () => {
  return (
    <div className="flex flex-row space-x-4">
      <Link href="/" className={`${coromantGaramond.className} no-underline`}>
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Home
        </button>
      </Link>
      <Link
        href="/photoshoots"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Photoshoots
        </button>
      </Link>
      <Link
        href="/weddings"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Weddings
        </button>
      </Link>
      <Link
        href="/wedding-planning"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Wedding Planning
        </button>
      </Link>
      <Link
        href="/proposals"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Proposals
        </button>
      </Link>
      <Link
        href="/corporate-events"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Corporate Events
        </button>
      </Link>
      <Link
        href="/stories"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Stories & Blog
        </button>
      </Link>
      <Link
        href="/about"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          About
        </button>
      </Link>
      <Link
        href="/contact"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Contact
        </button>
      </Link>
      <Link
        href="/faq"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer  `}
          translate="no"
        >
          FAQ
        </button>
      </Link>
      <Link
        href="/policies"
        className={`${coromantGaramond.className} no-underline`}
      >
        <button
          className={`${coromantGaramond.className} no-underline xl:text-lg cursor-pointer`}
          translate="no"
        >
          Policies
        </button>
      </Link>
    </div>
  )
}

export default Sitemap
