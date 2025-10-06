import React from "react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface TextComponentListProps {
  items: React.ReactNode[]
  listType: "bullet" | "number"
  ListClassName?: string
}

const TextComponentList: React.FC<TextComponentListProps> = ({
  items,
  listType,
  ListClassName = "",
}) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center max-w-5xl mx-5 lg:p-2 xl:mx-auto">
        {listType === "bullet" ? (
          <ul
            className={`${montserrat.className} list-disc pl-6 space-y-2 ${ListClassName}`}
          >
            {items}
          </ul>
        ) : (
          <ol
            className={`${montserrat.className} list-decimal pl-6 space-y-2 ${ListClassName}`}
          >
            {items}
          </ol>
        )}
      </div>
    </div>
  )
}

export default TextComponentList
