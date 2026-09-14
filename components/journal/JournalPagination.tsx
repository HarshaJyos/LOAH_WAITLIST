import { ChevronLeft, ChevronRight } from "lucide-react";

interface JournalPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function JournalPagination({
  currentPage,
  totalPages,
  onPageChange,
}: JournalPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-2 my-10"
      aria-label="Journal pages navigation"
    >
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#161F2E] border border-white/10 text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#10B981] text-[#022C22] shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-[#161F2E] text-[#94A3B8] border border-white/10 hover:text-[#F8FAFC] hover:border-white/20"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#161F2E] border border-white/10 text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        aria-label="Next Page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
