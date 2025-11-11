import { BlogCategory } from "@/sanity/queries/Stories/Stories"
import React from "react"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const BlogFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  blogCategories,
  locale,
}: {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  selectedCategory: string
  setSelectedCategory: (selectedCategory: string) => void
  blogCategories: BlogCategory[]
  locale: "en" | "es"
}) => {
  const t = useTranslations("blog")
  return (
    <div className="bg-pureWhite shadow-sm border-b border-elegantSilver py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative w-full lg:w-[40rem] mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-elegantSilver h-5 w-5" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={`${montserrat.className} w-full pl-10 pr-4 py-2 border border-elegantSilver rounded-lg focus:ring-2 focus:ring-luxuryGold focus:border-transparent`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`${montserrat.className} px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                selectedCategory === "All"
                  ? "bg-luxuryGold text-pureWhite"
                  : "bg-elegantSilver/20 text-darkGray hover:bg-elegantSilver/30"
              }`}
            >
              {t("all")}
            </button>
            {blogCategories.map((category: BlogCategory) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.title[locale])}
                className={`${montserrat.className} px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  selectedCategory === category.title[locale]
                    ? "bg-luxuryGold text-pureWhite"
                    : "bg-elegantSilver/20 text-darkGray hover:bg-elegantSilver/30"
                }`}
              >
                {category.title[locale]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogFilters
