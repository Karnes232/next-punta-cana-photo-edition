"use client"

import Image from "next/image"
import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"
import { useTranslations } from "next-intl"

const CoromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const BlogPostHeader = ({
  image,
  publishedAt,
  title,
  locale,
}: {
  image: any
  publishedAt: string
  title: { en: string; es: string }
  locale: "en" | "es"
}) => {
  const t = useTranslations("blog")
  return (
    <>
      <div className={`absolute top-0 w-full h-[65vh]`}>
        <motion.div
          initial={{ filter: "brightness(0)" }}
          whileInView={{ filter: "brightness(0.6)" }}
          viewport={{ once: true }}
          transition={{
            duration: 6,
            delay: 0.5,
          }}
          className="absolute top-0 left-0 w-full h-full z-0 opacity-100 overflow-hidden brightness-[0.6]"
        >
          <div className="relative w-full h-full">
            <Image
              src={image.asset.url}
              alt={image.alt}
              fill
              className="object-cover object-center"
              priority={true}
              sizes="100vw"
              quality={80}
            />
          </div>
        </motion.div>
      </div>
      <div className={`h-[55vh]`}></div>
      <section className="max-w-5xl my-5 mx-5 xl:mx-auto flex flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <Link
            href="/stories"
            className="inline-flex items-center text-darkGray hover:text-caribbeanTurquoise transition-colors"
          >
            <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5 mr-2 flex-shrink-0" />
            <span className="text-sm lg:text-base leading-4">
              {t("backToStories")}
            </span>
          </Link>
        </div>
        <div className="flex items-center text-darkGray">
          <Calendar className="h-4 w-4 lg:h-5 lg:w-5 mr-2 flex-shrink-0" />
          <span className="text-sm lg:text-base leading-4">
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </section>
      <h1
        className={`${CoromantGaramond.className} text-center text-3xl md:text-4xl lg:text-5xl font-bold text-darkGray mt-10 mb-10 leading-tight`}
      >
        {title[locale]}
      </h1>
    </>
  )
}

export default BlogPostHeader
