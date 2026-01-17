import { Logo } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import LogoComponent from "./LogoComponent"
import React from "react"
import HamburgerMenu from "./HamburgerMenu"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"

const Navbar = ({ logo }: { logo: Logo }) => {
  return (
    <nav className="bg-black z-50">
    {/* <nav className="bg-black/50 z-50 h-24 md:h-28 lg:h-36 2xl:h-40"> */}
      <div className="flex items-center justify-between bg-transparent max-w-6xl mx-5 md:mx-10 lg:mx-8 xl:mx-auto">
        <div className="hidden lg:block lg:flex-1"></div>
        <div className="lg:flex lg:justify-center lg:flex-1">
          <LogoComponent logo={logo} />
        </div>
        <div className="flex space-x-2 items-center lg:flex-1 lg:justify-end">
          {/* <div className="hidden mb-2 xl:block">
            <LanguageSwitcher color="luxuryGold" />
          </div> */}
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
