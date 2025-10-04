import { Cormorant_Garamond, Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const ContentBlock = async ({
  title,
  subTitle,
  content,
  image,
  buttonText,
  buttonLink,
  locale,
  page,
}: {
  title: string
  subTitle: string
  content: string
  image: any
  buttonText: string
  buttonLink: string
  locale: "en" | "es"
  page: string
}) => {
  let cardHeight = "h-[60rem] md:h-[44rem] lg:h-[50rem]"
  let secondaryCardHeight =
    "md:h-[32rem] lg:h-[39rem] xl:h-[45rem] lg:w-[40rem]"
  if (page === "gender-reveal-and-baby-showers") {
    cardHeight = "h-[72rem] md:h-[44rem] lg:h-[50rem]"
    secondaryCardHeight = "md:h-[34rem] lg:h-[45rem] xl:h-[45rem] lg:w-[45rem] "
  }
  return (
    <>
      <div className={`bg-elegantSilver/20 relative xl:static ${cardHeight}`}>
        <div className="xl:mx-auto xl:max-w-7xl xl:relative xl:h-[50rem]">
          <div className="overflow-hidden mx-auto w-80 md:w-[26rem] lg:w-[29rem] xl:w-[37rem] h-96 md:h-[22rem] lg:h-[29rem] xl:h-[37rem] top-10 md:top-6 left-0 right-0 md:bottom-0 md:my-auto md:left-6 md:mx-0 z-50 absolute">
            <Image
              src={image.asset.url}
              alt={image.alt || "Content image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 464px, 592px"
            />
          </div>
          <div
            className={`absolute bottom-14 md:bottom-0 md:top-0 md:my-auto left-0 md:left-[20rem] right-0 w-11/12 md:w-[22rem] lg:w-[30rem] xl:w-[45rem] pt-96 md:pt-6 md:pl-6 lg:pl-72 md:pr-6 lg:pr-28 xl:pr-[30rem] bg-white mx-auto p-5 pb-24 xl:left-1/2 xl:transform xl:-translate-x-1/4 ${secondaryCardHeight}`}
          >
            <div className="md:flex md:flex-col md:justify-center h-full md:pl-16 lg:pl-0 md:mt-5 lg:mt-0 xl:w-80 group">
              <h2
                className={`${coromantGaramond.className} text-2xl lg:text-3xl font-normal tracking-wider text-gray-800`}
              >
                {title}
              </h2>
              <h3
                className={`${coromantGaramond.className} text-sm lg:text-base font-light text-gray-600 uppercase tracking-widest mt-3 md:mt-5`}
              >
                {subTitle}
              </h3>
              <p
                className={`${montserrat.className} mt-7 md:mt-10 text-base text-gray-800 leading-loose`}
              >
                {content}
              </p>
              <div className="mt-10">
                {buttonText === "&#8594;" ? (
                  <>
                    <Link
                      href={buttonLink}
                      className="no-underline flex justify-center items-center"
                      aria-label="Home"
                    >
                      {" "}
                      <span>
                        <HiOutlineArrowNarrowRight className="mb-10 text-4xl text-black xl:opacity-0 group-hover:opacity-100 xl:transition-opacity duration-300" />
                      </span>{" "}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={buttonLink}
                      className={`${montserrat.className} no-underline border py-2 xl:py-3 px-6 xl:px-8 xl:text-lg rounded-3xl mt-10 text-gray-400 border-gray-500 transition duration-500 hover:bg-black hover:text-white`}
                      aria-label="Home"
                    >
                      {buttonText}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContentBlock
