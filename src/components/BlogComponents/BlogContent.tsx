"use client"
import { BlogCategory, BlogPostCard } from "@/sanity/queries/Stories/Stories"
import React, { useState } from "react"
import BlogFilters from "./BlogFilters"
import BlogCard from "./BlogCard"
import Pagination from "./Pagination"
import FeaturedPost from "./FeaturedPost"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const BlogContent = ({
  blogPosts,
  blogCategories,
  locale,
  featuredPost,
}: {
  blogPosts: BlogPostCard[]
  blogCategories: BlogCategory[]
  locale: "en" | "es"
  featuredPost: { _id: string } | null
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const filteredPosts = blogPosts.filter((post: any) => {
    const matchesSearch =
      post.title[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description[locale].toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" ||
      post.categories.some((cat: any) => cat.title[locale] === selectedCategory)
    return matchesSearch && matchesCategory
  })

  const filteredFeaturedPost = blogPosts.find(
    (post: any) => post._id === featuredPost?._id,
  )

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  )
  return (
    <div>
      <BlogFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        blogCategories={blogCategories}
        locale={locale}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {searchTerm === "" &&
          selectedCategory === "All" &&
          currentPage === 1 &&
          filteredFeaturedPost && (
            <FeaturedPost post={filteredFeaturedPost} locale={locale} />
          )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post: any) => (
            <BlogCard key={post.slug.current} post={post} locale={locale} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className={`${montserrat.className} text-slate-600 text-lg`}>
              No articles found
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogContent
