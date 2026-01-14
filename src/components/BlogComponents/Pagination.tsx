import { ChevronLeft, ChevronRight } from "lucide-react"
import { Montserrat } from "next/font/google"
import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5 // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    // Calculate start and end of the range around current page
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    // Adjust if we're near the start
    if (currentPage <= 3) {
      end = Math.min(4, totalPages - 1)
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - 3)
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...")
    }

    // Add pages in the range
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("...")
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 mt-12 px-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-elegantSilver hover:bg-luxuryGold/10 disabled:opacity-50 disabled:cursor-not-allowed text-darkGray hover:text-luxuryGold transition-colors duration-200"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className={`${montserrat.className} px-2 py-2 text-darkGray`}
            >
              ...
            </span>
          )
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`${montserrat.className} px-2 sm:px-4 py-2 rounded-lg transition-colors duration-200 min-w-[2.5rem] sm:min-w-0 ${
              currentPage === page
                ? "bg-luxuryGold text-pureWhite shadow-lg shadow-luxuryGold/25"
                : "border border-elegantSilver hover:bg-luxuryGold/10 text-darkGray hover:text-luxuryGold"
            }`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-elegantSilver hover:bg-luxuryGold/10 disabled:opacity-50 disabled:cursor-not-allowed text-darkGray hover:text-luxuryGold transition-colors duration-200"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export default Pagination
