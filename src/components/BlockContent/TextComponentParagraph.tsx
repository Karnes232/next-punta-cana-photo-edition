import React from "react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const TextComponentParagraph = ({
  paragraph,
  ParagraphClassName,
}: {
  paragraph: string
  ParagraphClassName: string
}) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center max-w-5xl xl:mx-auto">
        <p
          className={`${montserrat.className} lg:text-lg text-gray-700 dark:text-white ${ParagraphClassName}`}
        >
          {paragraph}
        </p>
      </div>
    </div>
  )
}

export default TextComponentParagraph
