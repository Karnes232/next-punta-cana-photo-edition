import { getSocialLinks } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import React from "react"
import { FaInstagram } from "react-icons/fa"
import FooterMenu from "./FooterMenu"
import Sitemap from "./Sitemap"
import SocialMedia from "./SocialMedia"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
const Footer = async () => {
  const socialLinks = await getSocialLinks()
  return (
    <div className="flex flex-col h-screen md:h-auto lg:h-[50vh] xl:max-w-7xl xl:w-full xl:mx-auto justify-between py-10 mx-8 md:mx-10">
      <div className="flex justify-center items-center">
        {socialLinks?.socialLinks.instagram && (
          <a
            href={socialLinks.socialLinks.instagram}
            target="_blank"
            aria-label="Instagram"
            rel="noreferrer"
            className="flex flex-row items-center justify-center space-x-2 text-gray-400 hover:text-caribbeanTurquoise"
          >
            <FaInstagram className="text-2xl" />{" "}
            <p className="uppercase text-sm tracking-widest">
              {socialLinks.socialLinks.instagramTag}
            </p>
          </a>
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0">
        <div className="lg:hidden md:w-1/2">
          <FooterMenu />
        </div>
        <div className="hidden lg:flex lg:w-full lg:gap-5 lg:justify-center lg:items-center mt-0">
          <Sitemap />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 md:mt-5 md:w-full md:mx-auto md:px-10">
        <LanguageSwitcher color="gray-400" />
        {socialLinks && <SocialMedia socialLinks={socialLinks} />}
      </div>
    </div>
  )
}

export default Footer
