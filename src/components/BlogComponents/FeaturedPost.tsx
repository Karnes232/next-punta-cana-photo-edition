import { ArrowRight, Calendar, Clock, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const FeaturedPost = ({ post, locale }: { post: any; locale: "en" | "es" }) => {
  return (
    <div className="relative bg-pureWhite rounded-xl shadow-lg overflow-hidden mb-12">
      <div className="md:flex">
        <div className="md:w-1/2 relative">
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt}
            width={500}
            height={500}
            className="h-64 md:h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-pureWhite/90 text-luxuryGold text-xs px-3 tracking-wider py-1 rounded-full shadow-md backdrop-blur-sm">
              Featured
            </span>
          </div>
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex items-center mb-4">
            {post.categories[0] && (
              <span className="bg-elegantSilver/20 text-darkGray text-xs font-medium px-3 py-1 rounded-full">
                {post.categories[0].title[locale]}
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-darkGray mb-4">
            {post.title[locale]}
          </h2>

          <p className="text-darkGray/70 mb-6 leading-relaxed">
            {post.description[locale]}
          </p>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-sm text-darkGray/60">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {/* {post.tags &&
              post.tags[locale]?.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))} */}
          </div>
          <div className="mt-8">
            <Link
              href={`/stories/${post.slug.current}`}
              className="inline-flex items-center bg-luxuryGold text-pureWhite px-6 py-3 rounded-lg font-medium hover:bg-luxuryGold/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost
