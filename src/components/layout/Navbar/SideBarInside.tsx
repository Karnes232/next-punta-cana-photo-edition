import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { Cormorant_Garamond } from "next/font/google"
import Link from "next/link"
import React from "react"
import { Menu, MenuItem } from "react-pro-sidebar"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const SideBarInside = ({
  footer,
  setIsOpen,
}: {
  footer: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  return (
    <>
      <Menu className="ml-0 h-full w-full flex flex-col justify-center items-center overflow-hidden bg-elegantSilver">
        <MenuItem
          component={
            <Link
              href="/"
              className={`${coromantGaramond.className} hover:bg-transparent!  ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Home
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/photoshoots"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Photoshoots
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/weddings"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Weddings
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/wedding-planning"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Wedding Planning
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/proposals"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Proposals
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/corporate-events"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Corporate Events
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/stories"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Stories & Blog
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/about"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            About
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/contact"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Contact
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/faq"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            FAQ
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href="/policies"
              className={`${coromantGaramond.className} hover:bg-transparent! ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray" : "uppercase no-underline text-xl space-x-3 text-darkGray"}`}
              onClick={footer ? undefined : () => setIsOpen(false)}
            />
          }
        >
          <p
            className={`${coromantGaramond.className} ${footer ? "no-underline uppercase text-sm space-x-3 text-darkGray hover:text-caribbeanTurquoise" : "uppercase no-underline text-xl space-x-3 text-darkGray hover:text-caribbeanTurquoise"}`}
          >
            Policies
          </p>
        </MenuItem>
        <div className="w-full flex justify-center items-center">
          <LanguageSwitcher color="darkGray" />
        </div>
      </Menu>
    </>
  )
}

export default SideBarInside
