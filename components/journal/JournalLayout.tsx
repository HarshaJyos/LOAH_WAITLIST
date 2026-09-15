"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SensoryBackdrop } from "@/components/SensoryBackdrop";
import { WaitlistForm } from "@/components/WaitlistForm";
import { JournalPostMeta } from "@/types/journal";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  ListOrdered,
  User,
} from "lucide-react";

interface JournalLayoutProps {
  post: JournalPostMeta;
  children: React.ReactNode;
  headings?: Array<{ id: string; text: string; level?: number }>;
  nextPost?: { title: string; slug: string };
  prevPost?: { title: string; slug: string };
}

export function JournalLayout({
  post,
  children,
  headings = [],
  nextPost,
  prevPost,
}: JournalLayoutProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Derive author slug for profile linking (e.g. "pavan-duggirala")
  const authorSlug = post.author.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  // Article JSON-LD Structured Data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate || post.publishedAt,
    dateModified: post.isoDate || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `https://loah.app/team/${authorSlug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "LOAH",
      url: "https://loah.app",
    },
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://loah.app/journal/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B0F17] text-[#F8FAFC] relative selection:bg-[#10B981]/20 selection:text-[#10B981]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Scroll Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-[#10B981] to-[#34D399] transition-all duration-75 shadow-[0_0_8px_#10B981]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <SensoryBackdrop />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-5 sm:px-8 py-8 sm:py-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#10B981] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>All Journals</span>
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161F2E] border border-white/10 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-all cursor-pointer"
            aria-label="Share article"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[#10B981]">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header (Clean & Immediate: Category + Title only) */}
        <header className="space-y-4 pb-6 border-b border-white/[0.08] mb-10">
          {/* Category & Type Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-semibold border border-[#10B981]/20">
              {post.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#161F2E] text-[#94A3B8] text-xs font-medium border border-white/10">
              {post.type}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F8FAFC] tracking-tight leading-[1.14]">
            {post.title}
          </h1>
        </header>

        {/* Table of Contents if headings provided */}
        {headings.length > 0 && (
          <nav className="mb-10 p-5 sm:p-6 rounded-2xl bg-[#161F2E]/60 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[#10B981] uppercase tracking-wider">
              <ListOrdered className="w-4 h-4" />
              <span>In This Journal Entry</span>
            </div>
            <ul className="space-y-2 text-sm">
              {headings.map((h, i) => (
                <li key={i} className={h.level === 3 ? "pl-4 text-xs" : ""}>
                  <a
                    href={`#${h.id}`}
                    className="text-[#94A3B8] hover:text-[#10B981] transition-colors underline-offset-4 hover:underline"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body Content */}
        <article className="prose-dark max-w-none">
          {children}
        </article>

        {/* Tags Row */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#94A3B8] mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-[#161F2E] border border-white/10 text-xs text-[#94A3B8]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio & Post Meta Box (Moved to Bottom to Keep Top Focused & Frictionless) */}
        {/* Author Bio & Post Meta Box */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#161F2E] via-[#111827] to-[#0B0F17] border border-white/10 shadow-xl space-y-4">
          {/* Top Row: Avatar + Name & Role Badge */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <Link
              href={authorSlug ? `/team/${authorSlug}` : "/team"}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-[#10B981]/50 shrink-0 bg-[#161F2E] shadow-md hover:scale-105 transition-transform group"
            >
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#10B981] text-lg font-bold uppercase">
                  {post.author.name.charAt(0)}
                </div>
              )}
            </Link>

            <div className="space-y-1 min-w-0">
              <h4 className="font-heading font-bold text-lg sm:text-xl text-[#F8FAFC]">
                <Link
                  href={authorSlug ? `/team/${authorSlug}` : "/team"}
                  className="hover:text-[#10B981] transition-colors"
                >
                  {post.author.name}
                </Link>
              </h4>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-[11px] font-semibold whitespace-nowrap">
                {post.author.role}
              </span>
            </div>
          </div>

          {/* Full-width Description taking space from left to right */}
          <p className="font-body text-xs sm:text-sm text-[#94A3B8] leading-relaxed w-full">
            {post.author.bio || `${post.author.role} at LOAH.`}
          </p>

          {/* Publishing Date, Read Time & Profile Link */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5 opacity-70" />
                <span>{post.publishedAt}</span>
              </span>
              <span className="opacity-40">•</span>
              <span className="inline-flex items-center gap-1.5 text-[#34D399] font-medium whitespace-nowrap">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <Link
              href={authorSlug ? `/team/${authorSlug}` : "/team"}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:underline whitespace-nowrap group self-end sm:self-auto pt-1 sm:pt-0"
            >
              <span>Profile</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Next / Previous Article Navigation */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/journal/${prevPost.slug}`}
              className="p-5 rounded-xl bg-[#161F2E] border border-white/10 hover:border-[#10B981]/40 transition-all text-left group"
            >
              <span className="text-xs text-[#94A3B8] block mb-1">← Previous Entry</span>
              <span className="font-heading font-semibold text-sm text-[#F8FAFC] group-hover:text-[#10B981] line-clamp-1">
                {prevPost.title}
              </span>
            </Link>
          ) : <div />}

          {nextPost && (
            <Link
              href={`/journal/${nextPost.slug}`}
              className="p-5 rounded-xl bg-[#161F2E] border border-white/10 hover:border-[#10B981]/40 transition-all text-right group ml-auto w-full"
            >
              <span className="text-xs text-[#94A3B8] block mb-1">Next Entry →</span>
              <span className="font-heading font-semibold text-sm text-[#F8FAFC] group-hover:text-[#10B981] line-clamp-1">
                {nextPost.title}
              </span>
            </Link>
          )}
        </div>

        {/* Bottom Waitlist Form */}
        <div id="waitlist" className="mt-16 scroll-mt-24 p-8 rounded-2xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-[#10B981]/30 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl text-[#F8FAFC]">
              Experience LOAH with Zero Activation Energy
            </h3>
            <p className="font-body text-sm sm:text-base text-[#94A3B8] max-w-md mx-auto leading-relaxed">
              Join early finders to receive your private testing application link directly in your inbox.
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
