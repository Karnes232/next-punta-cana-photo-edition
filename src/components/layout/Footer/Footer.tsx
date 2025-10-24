import { getSocialLinks } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import React from "react"
import { FaInstagram } from "react-icons/fa"
import FooterMenu from "./FooterMenu"
import Sitemap from "./Sitemap"
import SocialMedia from "./SocialMedia"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import Image from "next/image"
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
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 mt-4">
        <p className="text-sm text-gray-400 flex items-center gap-2 flex-1 justify-start md:justify-end md:mr-8">
          Built by
          <a
            href="https://dr-webstudio.com"
            className="flex items-center gap-1 hover:text-caribbeanTurquoise cursor-pointer"
          >
            <Image
              src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
              alt="DR Web Studio"
              className="h-4"
              width={16}
              height={16}
            />
            DR Web Studio
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer
