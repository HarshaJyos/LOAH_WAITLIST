"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { JournalPostMeta } from "@/types/journal";
import { JournalPagination } from "@/components/journal/JournalPagination";
import {
  Search,
  BookOpen,
  X,
  Clock,
  Calendar,
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

interface AuthorArticlesListProps {
  posts: JournalPostMeta[];
  authorName: string;
  postsPerPage?: number;
}

export function AuthorArticlesList({
  posts,
  authorName,
  postsPerPage = 4,
}: AuthorArticlesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState<"newest" | "oldest" | "shortest" | "longest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories available among this author's posts
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...cats];
  }, [posts]);

  // Filter & Sort
  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      // Category filter
      if (selectedCategory !== "All" && post.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(query);
        const matchExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchCategory = post.category.toLowerCase().includes(query);
        const matchTags = post.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchTitle && !matchExcerpt && !matchCategory && !matchTags) {
          return false;
        }
      }

      return true;
    });

    // Sort
    result = [...result].sort((a, b) => {
      if (selectedSort === "newest") {
        return new Date(b.isoDate || b.publishedAt).getTime() - new Date(a.isoDate || a.publishedAt).getTime();
      }
      if (selectedSort === "oldest") {
        return new Date(a.isoDate || a.publishedAt).getTime() - new Date(b.isoDate || b.publishedAt).getTime();
      }
      if (selectedSort === "shortest") {
        return (parseInt(a.readTime) || 0) - (parseInt(b.readTime) || 0);
      }
      if (selectedSort === "longest") {
        return (parseInt(b.readTime) || 0) - (parseInt(a.readTime) || 0);
      }
      return 0;
    });

    return result;
  }, [posts, searchQuery, selectedCategory, selectedSort]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const activePage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (activePage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, activePage, postsPerPage]);

  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSort("newest");
    setCurrentPage(1);
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 mb-12" id="articles">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#10B981] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles by {authorName.split(" ")[0]}</span>
          </div>
          <h2 className="font-heading font-bold text-2xl text-[#F8FAFC]">
            Published Journal Entries
          </h2>
        </div>

        <span className="text-xs text-[#94A3B8] bg-[#161F2E] px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
          {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} available
        </span>
      </div>

      {/* Breathable Search & Filter Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#161F2E]/80 border border-white/10 space-y-3.5 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={`Search within ${authorName.split(" ")[0]}'s articles...`}
              className="w-full h-11 pl-10 pr-9 rounded-xl bg-[#0B0F17]/90 border border-white/10 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#10B981]/50 focus:ring-1 focus:ring-[#10B981]/30 transition-all font-body"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#94A3B8] hidden sm:inline" />
            <select
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Sort articles"
              className="h-11 px-3 rounded-xl bg-[#0B0F17]/90 border border-white/10 text-xs text-[#94A3B8] focus:text-[#F8FAFC] focus:outline-none focus:border-[#10B981]/50 cursor-pointer font-medium"
            >
              <option value="newest" className="bg-[#161F2E] text-[#F8FAFC]">Newest First</option>
              <option value="oldest" className="bg-[#161F2E] text-[#F8FAFC]">Oldest First</option>
              <option value="shortest" className="bg-[#161F2E] text-[#F8FAFC]">Quick Read (Shortest)</option>
              <option value="longest" className="bg-[#161F2E] text-[#F8FAFC]">Deep Read (Longest)</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        {categories.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            <span className="text-xs font-semibold text-[#94A3B8] mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#10B981] text-[#022C22] font-semibold shadow-sm"
                      : "bg-[#0B0F17] text-[#94A3B8] border border-white/10 hover:text-[#F8FAFC] hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Filter Summary / Reset */}
        {isFiltering && (
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-xs">
            <span className="text-[#94A3B8]">
              Showing <strong className="text-[#F8FAFC]">{filteredPosts.length}</strong> filtered{" "}
              {filteredPosts.length === 1 ? "result" : "results"}
            </span>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#10B981] hover:underline font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Articles Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="space-y-4">
          {paginatedPosts.map((post) => (
            <article
              key={post.id}
              className="group p-6 sm:p-7 rounded-2xl bg-[#161F2E]/80 border border-white/10 hover:border-[#10B981]/50 transition-all duration-200 backdrop-blur-sm shadow-xl hover:-translate-y-0.5 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-semibold">
                  {post.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[#94A3B8] text-xs">
                  {post.type}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#F8FAFC] group-hover:text-[#10B981] transition-colors leading-snug">
                <Link href={`/journal/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p className="font-body text-sm sm:text-base text-[#94A3B8] line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-3.5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 opacity-70 shrink-0" />
                    <span>{post.publishedAt}</span>
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="inline-flex items-center gap-1.5 text-[#34D399] font-medium whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <Link
                  href={`/journal/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] group-hover:translate-x-1 transition-transform whitespace-nowrap shrink-0"
                >
                  <span>Read Journal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12 px-6 text-center rounded-2xl bg-[#161F2E]/40 border border-white/10 space-y-3">
          <p className="font-heading text-base font-semibold text-[#F8FAFC]">
            No matching articles found
          </p>
          <p className="font-body text-xs sm:text-sm text-[#94A3B8] max-w-sm mx-auto">
            Try adjusting your search terms or clearing your category filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#10B981] text-[#022C22] text-xs font-bold hover:bg-[#059669] transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination (Works even when filtered) */}
      {totalPages > 1 && (
        <div className="pt-2">
          <JournalPagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              const el = document.getElementById("articles");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      )}
    </section>
  );
}
