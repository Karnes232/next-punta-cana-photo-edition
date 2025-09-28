import { Logo } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import LogoComponent from "./LogoComponent"
import React from "react"
import HamburgerMenu from "./HamburgerMenu"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"

const Navbar = ({ logo }: { logo: Logo }) => {
  return (
    <nav className="bg-transparent pt-5 z-50 h-24 md:h-36">
      <div className="flex items-center justify-between bg-transparent max-w-6xl mx-5 md:mx-10 lg:mx-8 xl:mx-auto">
        <div className="hidden lg:block"></div>
        <LogoComponent logo={logo} />
        <div className="flex space-x-2 items-center">
          <div className="hidden mb-2 xl:block">
          <LanguageSwitcher color="white" /></div>
        <HamburgerMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
