import { Logo } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const LogoComponent = ({ logo }: { logo: Logo }) => {
  return (
    <>
      <div className="flex justify-center items-center overflow-hidden">
        <Link href="/" className="no-underline" aria-label="Home">
          <div className="cursor-pointer flex items-center w-20 lg:w-32">
            <Image
              src={logo.companyLogo.asset.url}
              width={150}
              height={150}
              alt={logo.companyLogo.alt}
              className="w-20 md:w-32"
              priority
            />
          </div>
        </Link>
      </div>
    </>
  )
}

export default LogoComponent
