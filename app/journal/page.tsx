"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SensoryBackdrop } from "@/components/SensoryBackdrop";
import { WaitlistForm } from "@/components/WaitlistForm";
import { JournalCard } from "@/components/journal/JournalCard";
import { JournalPagination } from "@/components/journal/JournalPagination";
import {
  getJournalManifest,
  getJournalPage,
  getAllJournalPosts,
  filterPosts,
} from "@/lib/journal-data";
import { JournalPostMeta } from "@/types/journal";
import {
  Search,
  BookOpen,
  X,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  ArrowLeft,
} from "lucide-react";

export default function JournalPage() {
  const manifest = getJournalManifest();

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All Types");

  // Determine if the user is in search / filter mode
  const isFiltering =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "All" ||
    selectedType !== "All Types";

  // Data Loading:
  // - If standard browsing: load only the current page's JSON chunk for maximum speed & small bundle
  // - If searching/filtering: concatenate all page chunks into a unified dataset for comprehensive search
  const displayedPosts = useMemo(() => {
    if (isFiltering) {
      const allPosts = getAllJournalPosts();
      return filterPosts(allPosts, {
        query: searchQuery,
        category: selectedCategory,
        type: selectedType,
      });
    }

    const chunk = getJournalPage(currentPage);
    return chunk.posts || [];
  }, [currentPage, isFiltering, searchQuery, selectedCategory, selectedType]);

  // Featured Post (shown when not filtering and on page 1)
  const featuredPost = useMemo(() => {
    if (isFiltering || currentPage !== 1) return null;
    const allPosts = getAllJournalPosts();
    return allPosts.find((p) => p.featured);
  }, [isFiltering, currentPage]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedType("All Types");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B0F17] text-[#F8FAFC] relative selection:bg-[#10B981]/20 selection:text-[#10B981]">
      <SensoryBackdrop />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 sm:px-8 py-10 sm:py-16">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#10B981] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Waitlist</span>
        </Link>

        {/* Hero Title Section */}
        <div className="space-y-4 mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161F2E] border border-white/10 text-xs font-semibold text-[#10B981]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The LOAH Journals</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight leading-[1.15]">
            Building in public. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-[#10B981]">
              Documenting the science.
            </span>
          </h1>

          <p className="font-body text-[#94A3B8] text-base sm:text-lg max-w-2xl leading-relaxed">
            Raw research on ADHD neurobiology, dopamine transfer mechanics, and design notes behind the zero-activation architecture.
          </p>
        </div>

        {/* Search Bar & Filters Bar */}
        <div className="space-y-4 mb-10 p-5 rounded-2xl bg-[#161F2E]/80 border border-white/10 backdrop-blur-md shadow-xl">
          {/* Real-time Search Input */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search journals by keyword, neuroscience topic, or tag..."
              className="w-full h-12 pl-12 pr-10 rounded-xl bg-[#0B0F17]/80 border border-white/10 text-[#F8FAFC] placeholder-[#94A3B8]/60 text-sm font-body focus:outline-none focus:border-[#10B981]/60 focus:ring-2 focus:ring-[#10B981]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 p-1 rounded-md text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories Pill Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-[#94A3B8] mr-1 hidden sm:inline-block">
                Category:
              </span>
              {manifest.categories.map((cat) => {
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

            {/* Type Selector Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-semibold text-[#94A3B8] hidden sm:inline-block">
                Type:
              </span>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by article type"
                className="h-8 px-3 rounded-lg bg-[#0B0F17] border border-white/10 text-xs text-[#94A3B8] focus:text-[#F8FAFC] focus:outline-none focus:border-[#10B981]/50 cursor-pointer"
              >
                {manifest.types.map((t) => (
                  <option key={t} value={t} className="bg-[#161F2E] text-[#F8FAFC]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Filter State Indicator */}
        {isFiltering && (
          <div className="flex items-center justify-between gap-2 mb-6 px-1">
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Showing <span className="font-semibold text-[#F8FAFC]">{displayedPosts.length}</span>{" "}
              {displayedPosts.length === 1 ? "entry" : "entries"} matching your filters
            </p>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#10B981] hover:underline underline-offset-4 font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Featured Spotlight Card */}
        {featuredPost && (
          <div className="mb-10 p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-[#10B981]/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-semibold border border-[#10B981]/30">
                  {featuredPost.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#F8FAFC] text-xs font-medium">
                  {featuredPost.type}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Spotlight
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F8FAFC] group-hover:text-[#10B981] transition-colors leading-tight">
                <Link href={`/journal/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="font-body text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-3xl">
                {featuredPost.excerpt}
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 text-xs sm:text-sm text-[#94A3B8]">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-[#1E293B]">
                    {featuredPost.author.avatar ? (
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#10B981] text-xs font-bold uppercase">
                        {featuredPost.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <Link
                      href="/team/pavan-duggirala"
                      className="text-[#F8FAFC] font-medium hover:text-[#10B981] transition-colors"
                    >
                      {featuredPost.author.name}
                    </Link>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <Link
                  href={`/journal/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 font-heading font-bold text-sm text-[#10B981] group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Entry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Journal Entries Grid */}
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedPosts.map((post) => (
              <JournalCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 px-6 text-center rounded-2xl bg-[#161F2E]/40 border border-white/10 space-y-4">
            <p className="font-heading text-lg text-[#F8FAFC] font-semibold">
              No journal entries found
            </p>
            <p className="font-body text-sm text-[#94A3B8] max-w-sm mx-auto">
              We couldn’t find any entries matching your query. Try searching for &quot;Dopamine&quot;, &quot;Architecture&quot;, or reset filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-[#10B981] text-[#022C22] text-xs font-bold hover:bg-[#059669] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination (Active in standard browsing view) */}
        {!isFiltering && (
          <JournalPagination
            currentPage={currentPage}
            totalPages={manifest.totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* Early Access Waitlist Form */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-[#10B981]/30 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
              Join Early Finders for LOAH
            </h3>
            <p className="font-body text-sm sm:text-base text-[#94A3B8] max-w-md mx-auto leading-relaxed">
              Receive private testing application links and neuroscience teardowns directly in your inbox.
            </p>
          </div>
          <div className="w-full pt-1">
            <WaitlistForm />
          </div>
        </div>
      </main>

      {/* Unified Footer */}
      <Footer />
    </div>
  );
}
