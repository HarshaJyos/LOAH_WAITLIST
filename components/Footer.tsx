"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, Sparkles, ArrowRight } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#070A10]/90 backdrop-blur-md z-10 relative">
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
        {/* Left Branding & Mission Note */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-center sm:text-left">
          <Link href="/" className="font-heading font-extrabold text-sm text-[#F8FAFC] tracking-wider hover:text-[#10B981] transition-colors">
            LOAH
          </Link>
          <span className="opacity-30">•</span>
          <span className="font-body text-[#94A3B8]/90">
            © {new Date().getFullYear()} Built for ADHD minds by ADHD minds.
          </span>
        </div>

        {/* Right Navigation & Status */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-5 text-xs font-medium">
          <Link
            href="/team"
            className="hover:text-[#10B981] text-[#94A3B8] transition-colors underline-offset-4 hover:underline inline-flex items-center gap-1"
          >
            <Users className="w-3.5 h-3.5 opacity-70" />
            <span>Team</span>
          </Link>

          <span className="opacity-30">•</span>

          <Link
            href="/journal"
            className="hover:text-[#10B981] text-[#94A3B8] transition-colors underline-offset-4 hover:underline inline-flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 opacity-70" />
            <span>Journals</span>
          </Link>

          <span className="opacity-30">•</span>

          {isHome ? (
            <span className="text-[#34D399] font-medium inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>Private Beta In Progress</span>
            </span>
          ) : (
            <Link
              href="/"
              className="text-[#10B981] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
