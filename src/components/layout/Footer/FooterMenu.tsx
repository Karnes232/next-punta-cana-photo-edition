import { Cormorant_Garamond } from "next/font/google"
import Link from "next/link"
import React from "react"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const FooterMenu = () => {
  return (
    <aside className="ml-0 h-full flex flex-col justify-center space-y-3 overflow-hidden">
      <Link
        href="/"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Home
        </p>
      </Link>

      <Link
        href="/photoshoots"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Photoshoots
        </p>
      </Link>

      <Link
        href="/weddings"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Weddings
        </p>
      </Link>

      <Link
        href="/wedding-planning"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Wedding Planning
        </p>
      </Link>

      <Link
        href="/proposals"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Proposals
        </p>
      </Link>

      <Link
        href="/corporate-events"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Corporate Events
        </p>
      </Link>

      <Link
        href="/stories"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Stories & Blog
        </p>
      </Link>

      <Link
        href="/about"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          About
        </p>
      </Link>

      <Link
        href="/contact"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Contact
        </p>
      </Link>

      <Link
        href="/faq"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          FAQ
        </p>
      </Link>

      <Link
        href="/policies"
        className={`${coromantGaramond.className} hover:bg-transparent! no-underline uppercase text-sm space-x-3 text-darkGray`}
      >
        <p
          className={`${coromantGaramond.className} no-underline uppercase text-sm space-x-3 text-darkGray`}
        >
          Policies
        </p>
      </Link>
    </aside>
  )
}

export default FooterMenu
