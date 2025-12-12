import { ArrowRight, Calendar } from "lucide-react"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useTranslations } from "next-intl"
const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const BlogCard = ({ post, locale }: { post: any; locale: "en" | "es" }) => {
  const t = useTranslations("blog")
  return (
    <Link
      href={`/stories/${post.slug.current}`}
      className="bg-pureWhite rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-elegantSilver/20 hover:border-luxuryGold/30"
    >
      <div className="relative">
        <Image
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt}
          width={500}
          height={500}
          className="w-full h-48 object-cover"
        />
        {post.categories[0] && (
          <div className="absolute top-4 left-4">
            <span
              className={`${coromantGaramond.className} bg-pureWhite/90 backdrop-blur-sm text-darkGray text-sm font-medium px-3 py-1 rounded-full border border-luxuryGold/20`}
            >
              {post.categories[0].title[locale]}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3
          className={`${coromantGaramond.className} text-2xl font-bold text-darkGray mb-3 line-clamp-2`}
        >
          {post.title[locale]}
        </h3>

        {post.description && post.description[locale] && (
          <p
            className={`${montserrat.className} text-elegantSilver text-sm mb-4 line-clamp-3`}
          >
            {post.description[locale]}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div
            className={`${coromantGaramond.className} flex items-center text-lg text-elegantSilver`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <Link
            href={`/stories/${post.slug.current}`}
            className={`${montserrat.className} text-luxuryGold hover:text-caribbeanTurquoise font-medium flex items-center transition-colors`}
          >
            {t("readMore")}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
