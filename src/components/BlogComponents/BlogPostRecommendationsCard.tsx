"use client"

import { BlogPostRecommendationsCard as BlogPostRecommendationsCardType } from "@/sanity/queries/Stories/BlogPosts"
import { useTranslations } from "next-intl"
import { ArrowRight, Calendar } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const coromantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const BlogPostRecommendationsCard = ({
  blogPostRecommendationsCard,
  locale,
}: {
  blogPostRecommendationsCard: BlogPostRecommendationsCardType[]
  locale: "en" | "es"
}) => {
  const t = useTranslations("blog")

  // If no recommendations, don't render anything
  if (
    !blogPostRecommendationsCard ||
    blogPostRecommendationsCard.length === 0
  ) {
    return null
  }

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2
          className={`${coromantGaramond.className} text-3xl md:text-4xl font-bold text-darkGray mb-4 text-center`}
        >
          {t("recommendedForYou")}
        </h2>
        <p className="text-elegantSilver text-center max-w-2xl mx-auto">
          {t("recommendationsDescription")}
        </p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          loop={blogPostRecommendationsCard.length > 3}
          className="recommendations-swiper"
        >
          {blogPostRecommendationsCard.map(post => (
            <SwiperSlide key={post._id}>
              <Link
                href={`/stories/${post.slug.current}`}
                className="bg-pureWhite rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-elegantSilver/20 hover:border-luxuryGold/30 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                    quality={70}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="h-16 mb-1 flex items-start">
                    <h3
                      className={`${coromantGaramond.className} text-xl font-bold text-darkGray line-clamp-2 hover:text-luxuryGold transition-colors`}
                    >
                      {post.title[locale]}
                    </h3>
                  </div>

                  <div className="flex-grow mb-8">
                    {post.description && post.description[locale] ? (
                      <p className="text-elegantSilver text-sm line-clamp-3">
                        {post.description[locale]}
                      </p>
                    ) : (
                      <div className="text-elegantSilver text-sm line-clamp-3 opacity-50">
                        {t("noDescriptionAvailable")}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-sm text-elegantSilver">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(post.publishedAt).toLocaleDateString(
                        locale === "en" ? "en-US" : "es-ES",
                      )}
                    </div>
                    <Link
                      href={`/stories/${post.slug.current}`}
                      className="text-luxuryGold hover:text-caribbeanTurquoise font-medium flex items-center transition-colors group"
                    >
                      {t("readMore")}
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .recommendations-swiper .swiper-button-next,
        .recommendations-swiper .swiper-button-prev {
          color: #d4af37;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          margin-top: -22px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .recommendations-swiper .swiper-button-next:after,
        .recommendations-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .recommendations-swiper .swiper-button-next:hover,
        .recommendations-swiper .swiper-button-prev:hover {
          background: #d4af37;
          color: white;
        }

        .recommendations-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }

        .recommendations-swiper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .recommendations-swiper .swiper-pagination-bullet-active {
          background: #d4af37;
        }

        .recommendations-swiper .swiper-pagination-bullet-active-main {
          background: #d4af37;
        }

        .recommendations-swiper .swiper-pagination-bullet-active-prev,
        .recommendations-swiper .swiper-pagination-bullet-active-next {
          background: #f4d03f;
        }
      `}</style>
    </section>
  )
}

export default BlogPostRecommendationsCard
