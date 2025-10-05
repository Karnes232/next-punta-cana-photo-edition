import React from "react"

import { Cormorant_Garamond } from "next/font/google"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const TextComponentHeading = ({
  heading,
  headingNumber,
  HeadingClassName,
}: {
  heading: string
  headingNumber: string
  HeadingClassName: string
}) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center max-w-5xl xl:mx-auto">
        {headingNumber === "h1" && (
          <h1
            className={`${coromantGaramond.className} text-gray-700 dark:text-white my-5 2xl:mb-2 2xl:mt-10 text-3xl md:text-4xl ${HeadingClassName}`}
          >
            {heading}
          </h1>
        )}
        {headingNumber === "h2" && (
          <h2
            className={`${coromantGaramond.className}  text-gray-700 dark:text-white my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl ${HeadingClassName}`}
          >
            {heading}
          </h2>
        )}
        {headingNumber === "h3" && (
          <h3
            className={`${coromantGaramond.className}  text-gray-700 dark:text-white my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl  ${HeadingClassName}`}
          >
            {heading}
          </h3>
        )}
        {headingNumber === "h4" && (
          <h4
            className={`${coromantGaramond.className}  text-gray-700 dark:text-white my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl ${HeadingClassName}`}
          >
            {heading}
          </h4>
        )}
        {headingNumber === "h5" && (
          <h5
            className={`${coromantGaramond.className}  text-gray-700 dark:text-white my-5 2xl:mb-2 2xl:mt-10 text-xl md:text-2xl  ${HeadingClassName}`}
          >
            {heading}
          </h5>
        )}
        {headingNumber === "h6" && (
          <h6
            className={`${coromantGaramond.className}  text-gray-700 dark:text-white my-5 2xl:mb-2 2xl:mt-10 text-lg md:text-xl  ${HeadingClassName}`}
          >
            {heading}
          </h6>
        )}
      </div>
    </div>
  )
}

export default TextComponentHeading
