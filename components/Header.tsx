"use client";

import Link from "next/link";
import { Sparkles, BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-5 px-6 sm:px-10 flex items-center justify-between z-20">
      {/* Brand Logo */}
      <Link
        href="/"
        className="group flex items-center text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-lg p-1 transition-transform active:scale-95"
      >
        <span className="font-heading font-extrabold text-2xl tracking-wider text-[#F8FAFC] group-hover:text-[#10B981] transition-colors">
          LOAH
        </span>
      </Link>

      {/* Nav Actions */}
      <nav className="flex items-center gap-3 sm:gap-6">
        {/* Journals Link */}
        <Link
          href="/journal"
          className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors py-2 px-3 rounded-md hover:bg-[#161F2E]/80 border border-transparent hover:border-white/10"
        >
          <BookOpen className="w-4 h-4 text-[#94A3B8]" />
          <span>Journals</span>
        </Link>

        {/* Live Build Badge */}
        <div className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#161F2E] border border-white/10 text-xs font-medium text-[#94A3B8]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span>Early Beta Invites Rolling Out</span>
        </div>
      </nav>
    </header>
  );
}
