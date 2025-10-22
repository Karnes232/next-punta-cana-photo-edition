"use client"
import { BlogCategory, BlogPostCard } from "@/sanity/queries/Stories/Stories"
import React, { useState } from "react"
import BlogFilters from "./BlogFilters"
import BlogCard from "./BlogCard"

const BlogContent = ({
  blogPosts,
  blogCategories,
  locale,
}: {
  blogPosts: BlogPostCard[]
  blogCategories: BlogCategory[]
  locale: "en" | "es"
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
        {/* {searchTerm === "" &&
          selectedCategory === "All" &&
          currentPage === 1 &&
          featuredPost && <FeaturedPost post={featuredPost} lang={lang} />} */}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post: any) => (
            <BlogCard key={post.slug.current} post={post} locale={locale} />
          ))}
        </div>

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )} */}

        {/* No Results */}
        {/* {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              {t("blog.noArticlesFound")}
            </p>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default BlogContent
