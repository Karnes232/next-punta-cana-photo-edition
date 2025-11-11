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
  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-elegantSilver hover:bg-luxuryGold/10 disabled:opacity-50 disabled:cursor-not-allowed text-darkGray hover:text-luxuryGold transition-colors duration-200"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${montserrat.className} px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === page
              ? "bg-luxuryGold text-pureWhite shadow-lg shadow-luxuryGold/25"
              : "border border-elegantSilver hover:bg-luxuryGold/10 text-darkGray hover:text-luxuryGold"
          }`}
        >
          {page}
        </button>
      ))}

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
