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
  getAllJournalPosts,
  filterAndSortPosts,
  JournalSortOption,
} from "@/lib/journal-data";
import {
  Search,
  BookOpen,
  X,
  Sparkles,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 4;

export default function JournalPage() {
  const manifest = getJournalManifest();
  const allPosts = useMemo(() => getAllJournalPosts(), []);

  // Filter State (Strictly persisted until reset)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<JournalSortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Accordion open states for filter groups
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);

  // Derive unique categories, types, and tags with counts from allPosts
  const availableCategories = useMemo(() => {
    return manifest.categories.filter((c) => c !== "All");
  }, [manifest.categories]);

  const availableTypes = useMemo(() => {
    return manifest.types.filter((t) => t !== "All Types");
  }, [manifest.types]);

  const availableTags = useMemo(() => {
    const tagMap: Record<string, number> = {};
    allPosts.forEach((post) => {
      post.tags?.forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });
    return Object.entries(tagMap).map(([tag, count]) => ({ tag, count }));
  }, [allPosts]);

  // Determine if any filters are active
  const isFiltering =
    searchQuery.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedTags.length > 0 ||
    sortBy !== "newest";

  const totalActiveFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    selectedCategories.length +
    selectedTypes.length +
    selectedTags.length +
    (sortBy !== "newest" ? 1 : 0);

  // Apply filters and sorting
  const filteredPosts = useMemo(() => {
    return filterAndSortPosts(allPosts, {
      query: searchQuery,
      categories: selectedCategories,
      types: selectedTypes,
      tags: selectedTags,
      sortBy,
    });
  }, [allPosts, searchQuery, selectedCategories, selectedTypes, selectedTags, sortBy]);

  // Pagination calculation with edge-case clamping
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const activePage = Math.min(Math.max(1, currentPage), totalPages);

  // Clamp current page when filters change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (activePage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, activePage]);

  // Featured Spotlight Post (displayed on page 1 when not actively searching)
  const featuredPost = useMemo(() => {
    if (isFiltering || activePage !== 1) return null;
    return allPosts.find((p) => p.featured);
  }, [isFiltering, activePage, allPosts]);

  // Filter Toggle Handlers
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedTags([]);
    setSortBy("newest");
    setCurrentPage(1);
  };

  // Category counts in current dataset
  const getCategoryCount = (cat: string) => {
    return allPosts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
  };

  const getTypeCount = (t: string) => {
    return allPosts.filter((p) => p.type.toLowerCase() === t.toLowerCase()).length;
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B0F17] text-[#F8FAFC] relative selection:bg-[#10B981]/20 selection:text-[#10B981]">
      <SensoryBackdrop />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#10B981] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Waitlist</span>
        </Link>

        {/* Hero Title Section */}
        <div className="space-y-3 mb-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F2E] border border-white/10 text-xs font-semibold text-[#10B981]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The LOAH Journals</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight leading-[1.15]">
            Building in public. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-[#10B981]">
              Documenting the science.
            </span>
          </h1>

          <p className="font-body text-[#94A3B8] text-sm sm:text-base max-w-2xl leading-relaxed">
            Neurobiology teardowns, executive function research, and zero-activation architecture logs.
          </p>
        </div>

        {/* Breathable Floating Search Bar */}
        <div className="relative mb-8 group">
          <div className="relative flex items-center rounded-2xl bg-[#161F2E]/90 border border-white/15 focus-within:border-[#10B981]/70 focus-within:ring-2 focus-within:ring-[#10B981]/20 transition-all duration-200 shadow-2xl backdrop-blur-md">
            <div className="pl-4 sm:pl-5 text-[#94A3B8] group-focus-within:text-[#10B981] transition-colors">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search journals by keyword, neuroscience topic, or tag (e.g. 'notes', 'working memory')..."
              className="w-full h-14 sm:h-16 pl-3.5 pr-28 rounded-2xl bg-transparent text-[#F8FAFC] placeholder-[#94A3B8]/60 text-sm sm:text-base font-body focus:outline-none"
            />

            <div className="absolute right-3.5 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-[#0B0F17]/70 border border-white/10 text-[11px] font-mono text-[#94A3B8]">
                {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"}
              </span>
            </div>
          </div>

          {/* Mobile Active Filter Chips Tray */}
          {isFiltering && (
            <div className="lg:hidden flex flex-wrap items-center gap-1.5 pt-3">
              <span className="text-[11px] font-semibold text-[#94A3B8] mr-1">Active:</span>
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981]">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button onClick={() => setSearchQuery("")} aria-label="Clear query filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981]"
                >
                  <span>{cat}</span>
                  <button onClick={() => toggleCategory(cat)} aria-label={`Remove ${cat} filter`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedTypes.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981]"
                >
                  <span>{t}</span>
                  <button onClick={() => toggleType(t)} aria-label={`Remove ${t} filter`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981]"
                >
                  <span>#{tag}</span>
                  <button onClick={() => toggleTag(tag)} aria-label={`Remove ${tag} tag`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-[#10B981] hover:underline font-semibold ml-1 py-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main Flipkart-Style 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ========================================================= */}
          {/* DESKTOP SIDEBAR FILTERS (Flipkart Style) */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5 sticky top-6">
            <div className="rounded-2xl bg-[#161F2E]/80 border border-white/10 p-5 shadow-xl backdrop-blur-sm space-y-5">
              {/* Filter Panel Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#10B981]" />
                  <h2 className="font-heading font-bold text-sm tracking-wider uppercase text-[#F8FAFC]">
                    Filters
                  </h2>
                </div>

                {isFiltering && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-[#10B981] hover:text-[#34D399] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Applied Filter Chips (Tray) */}
              {isFiltering && (
                <div className="space-y-2 pb-3.5 border-b border-white/[0.08]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                    Active Filters
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {searchQuery.trim() && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981]">
                        <span>&quot;{searchQuery}&quot;</span>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981]"
                      >
                        <span>{cat}</span>
                        <button
                          onClick={() => toggleCategory(cat)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {selectedTypes.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981]"
                      >
                        <span>{t}</span>
                        <button
                          onClick={() => toggleType(t)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981]"
                      >
                        <span>#{tag}</span>
                        <button
                          onClick={() => toggleTag(tag)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Filter Group: Categories */}
              <div className="space-y-3 pb-3.5 border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="font-heading font-semibold text-xs uppercase tracking-wider text-[#CBD5E1] group-hover:text-[#F8FAFC]">
                    Categories
                  </span>
                  {categoryOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </button>

                {categoryOpen && (
                  <div className="space-y-2 pt-1">
                    {availableCategories.map((cat) => {
                      const isChecked = selectedCategories.includes(cat);
                      const count = getCategoryCount(cat);
                      return (
                        <label
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer select-none text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "w-4 h-4 rounded flex items-center justify-center border transition-all",
                                isChecked
                                  ? "bg-[#10B981] border-[#10B981] text-[#022C22]"
                                  : "border-white/20 bg-[#0B0F17]"
                              )}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                              className={cn(
                                isChecked
                                  ? "text-[#F8FAFC] font-semibold"
                                  : "text-[#94A3B8]"
                              )}
                            >
                              {cat}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#94A3B8]/70">
                            ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Group: Article Type */}
              <div className="space-y-3 pb-3.5 border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setTypeOpen(!typeOpen)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="font-heading font-semibold text-xs uppercase tracking-wider text-[#CBD5E1] group-hover:text-[#F8FAFC]">
                    Article Type
                  </span>
                  {typeOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </button>

                {typeOpen && (
                  <div className="space-y-2 pt-1">
                    {availableTypes.map((t) => {
                      const isChecked = selectedTypes.includes(t);
                      const count = getTypeCount(t);
                      return (
                        <label
                          key={t}
                          onClick={() => toggleType(t)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer select-none text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "w-4 h-4 rounded flex items-center justify-center border transition-all",
                                isChecked
                                  ? "bg-[#10B981] border-[#10B981] text-[#022C22]"
                                  : "border-white/20 bg-[#0B0F17]"
                              )}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                              className={cn(
                                isChecked
                                  ? "text-[#F8FAFC] font-semibold"
                                  : "text-[#94A3B8]"
                              )}
                            >
                              {t}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#94A3B8]/70">
                            ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Group: Tags & Topics */}
              {availableTags.length > 0 && (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setTagsOpen(!tagsOpen)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="font-heading font-semibold text-xs uppercase tracking-wider text-[#CBD5E1] group-hover:text-[#F8FAFC]">
                      Topics &amp; Tags
                    </span>
                    {tagsOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                    )}
                  </button>

                  {tagsOpen && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {availableTags.map(({ tag, count }) => {
                        const isChecked = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={cn(
                              "px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
                              isChecked
                                ? "bg-[#10B981] text-[#022C22] font-semibold shadow-sm"
                                : "bg-[#0B0F17] text-[#94A3B8] border border-white/10 hover:text-[#F8FAFC] hover:border-white/20"
                            )}
                          >
                            #{tag} <span className="opacity-60 text-[10px]">({count})</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* ========================================================= */}
          {/* MAIN RESULTS COLUMN */}
          {/* ========================================================= */}
          <div className="lg:col-span-3 space-y-6">
            {/* Responsive Action Toolbar with Perfect Spacing & Hierarchy */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#161F2E]/80 border border-white/10 shadow-md space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
              {/* Mobile View: Clean 2-Button Action Row */}
              <div className="flex items-center gap-2.5 sm:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-3.5 rounded-xl bg-[#0B0F17] border border-white/15 text-xs font-semibold text-[#F8FAFC] hover:border-[#10B981]/50 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  <Filter className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Filters</span>
                  {totalActiveFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#10B981] text-[#022C22] text-[10px] font-bold flex items-center justify-center">
                      {totalActiveFilterCount}
                    </span>
                  )}
                </button>

                <div className="relative flex-1">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as JournalSortOption);
                      setCurrentPage(1);
                    }}
                    aria-label="Sort journal entries"
                    className="w-full h-10 pl-3 pr-8 rounded-xl bg-[#0B0F17] border border-white/15 text-xs font-medium text-[#F8FAFC] focus:outline-none focus:border-[#10B981]/50 appearance-none cursor-pointer"
                  >
                    <option value="newest" className="bg-[#161F2E] text-[#F8FAFC]">Newest</option>
                    <option value="oldest" className="bg-[#161F2E] text-[#F8FAFC]">Oldest</option>
                    <option value="shortest" className="bg-[#161F2E] text-[#F8FAFC]">Quick Read</option>
                    <option value="longest" className="bg-[#161F2E] text-[#F8FAFC]">Deep Read</option>
                    <option value="alphabetical" className="bg-[#161F2E] text-[#F8FAFC]">Title (A-Z)</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>

              {/* Status Counter & Reset Link */}
              <div className="flex items-center justify-between text-xs text-[#94A3B8] px-1 sm:px-0">
                <p>
                  Showing <span className="font-semibold text-[#F8FAFC]">{paginatedPosts.length}</span> of{" "}
                  <span className="font-semibold text-[#F8FAFC]">{filteredPosts.length}</span> {filteredPosts.length === 1 ? "article" : "articles"}
                </p>

                {isFiltering && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs text-[#10B981] hover:underline font-medium cursor-pointer sm:hidden"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              {/* Desktop Sort Control */}
              <div className="hidden sm:flex items-center gap-2.5">
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Sort By:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as JournalSortOption);
                      setCurrentPage(1);
                    }}
                    aria-label="Sort journal entries"
                    className="h-9 pl-3.5 pr-8 rounded-xl bg-[#0B0F17] border border-white/10 text-xs font-medium text-[#F8FAFC] focus:outline-none focus:border-[#10B981]/50 appearance-none cursor-pointer hover:border-white/20 transition-colors"
                  >
                    <option value="newest" className="bg-[#161F2E] text-[#F8FAFC]">Newest First</option>
                    <option value="oldest" className="bg-[#161F2E] text-[#F8FAFC]">Oldest First</option>
                    <option value="shortest" className="bg-[#161F2E] text-[#F8FAFC]">Reading Time (Shortest)</option>
                    <option value="longest" className="bg-[#161F2E] text-[#F8FAFC]">Reading Time (Longest)</option>
                    <option value="alphabetical" className="bg-[#161F2E] text-[#F8FAFC]">Title (A-Z)</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Featured Spotlight Card (Only on Page 1 without Active Search/Filters) */}
            {featuredPost && (
              <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-[#10B981]/40 shadow-2xl relative overflow-hidden group">
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

            {/* Articles Grid */}
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="journal-grid">
                {paginatedPosts.map((post) => (
                  <JournalCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="py-16 px-6 text-center rounded-3xl bg-[#161F2E]/40 border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#161F2E] border border-white/10 flex items-center justify-center text-[#94A3B8] mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-heading text-lg text-[#F8FAFC] font-semibold">
                    No matching journal entries found
                  </p>
                  <p className="font-body text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                    We couldn’t find any entries matching your filters. Try adjusting your search query or clearing selected categories.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#10B981] text-[#022C22] text-xs font-bold hover:bg-[#059669] transition-all cursor-pointer shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Component (Operates flawlessly even with filtered datasets) */}
            {totalPages > 1 && (
              <div className="pt-4">
                <JournalPagination
                  currentPage={activePage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    const el = document.getElementById("journal-grid");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE SLIDE-OVER FILTER DRAWER (Flipkart Mobile Pattern) */}
        {/* ========================================================= */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#0B0F17]/80 backdrop-blur-md lg:hidden animate-fade-in-scale">
            <div
              className="fixed inset-0"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-[#161F2E] border-t border-white/15 p-6 space-y-6 shadow-2xl">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#10B981]" />
                  <h3 className="font-heading font-bold text-base text-[#F8FAFC]">
                    Filters
                  </h3>
                  {totalActiveFilterCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold">
                      {totalActiveFilterCount} Active
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#94A3B8]">
                  Categories
                </h4>
                <div className="space-y-2">
                  {availableCategories.map((cat) => {
                    const isChecked = selectedCategories.includes(cat);
                    const count = getCategoryCount(cat);
                    return (
                      <label
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0F17]/60 border border-white/5 cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "w-4 h-4 rounded flex items-center justify-center border",
                              isChecked
                                ? "bg-[#10B981] border-[#10B981] text-[#022C22]"
                                : "border-white/20"
                            )}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={isChecked ? "text-[#F8FAFC] font-bold" : "text-[#94A3B8]"}>
                            {cat}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#94A3B8]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Article Types */}
              <div className="space-y-3">
                <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#94A3B8]">
                  Article Type
                </h4>
                <div className="space-y-2">
                  {availableTypes.map((t) => {
                    const isChecked = selectedTypes.includes(t);
                    const count = getTypeCount(t);
                    return (
                      <label
                        key={t}
                        onClick={() => toggleType(t)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0F17]/60 border border-white/5 cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "w-4 h-4 rounded flex items-center justify-center border",
                              isChecked
                                ? "bg-[#10B981] border-[#10B981] text-[#022C22]"
                                : "border-white/20"
                            )}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={isChecked ? "text-[#F8FAFC] font-bold" : "text-[#94A3B8]"}>
                            {t}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#94A3B8]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 rounded-xl bg-[#0B0F17] border border-white/15 text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC]"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-[#10B981] text-[#022C22] text-xs font-bold hover:bg-[#059669]"
                >
                  Show ({filteredPosts.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Early Access Waitlist Section */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-[#10B981]/30 text-center space-y-6 shadow-2xl">
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

      <Footer />
    </div>
  );
}
