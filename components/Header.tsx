"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isJournalActive = pathname?.startsWith("/journal");
  const isTeamActive = pathname?.startsWith("/team");

  return (
    <header className="w-full py-4 sm:py-5 px-4 sm:px-8 lg:px-12 flex items-center justify-between z-30 relative max-w-7xl mx-auto">
      {/* Brand Logo */}
      <Link
        href="/"
        className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-xl p-1 transition-transform active:scale-95"
        aria-label="LOAH Home"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center text-[#022C22] shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all">
          <Sparkles className="w-4 h-4 fill-current stroke-[2.5]" />
        </div>
        <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-wider text-[#F8FAFC] group-hover:text-[#10B981] transition-colors">
          LOAH
        </span>
      </Link>

      {/* Navigation Actions */}
      <nav className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Journals Link with Icon */}
        <Link
          href="/journal"
          className={cn(
            "group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium py-2 px-3 sm:px-3.5 rounded-xl border transition-all duration-200 cursor-pointer",
            isJournalActive
              ? "bg-[#161F2E] text-[#10B981] border-[#10B981]/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
              : "bg-transparent text-[#94A3B8] border-transparent hover:text-[#F8FAFC] hover:bg-[#161F2E]/70 hover:border-white/10"
          )}
        >
          <BookOpen
            className={cn(
              "w-4 h-4 transition-colors shrink-0",
              isJournalActive ? "text-[#10B981]" : "text-[#94A3B8] group-hover:text-[#10B981]"
            )}
          />
          <span className="font-heading font-semibold tracking-wide">Journals</span>
        </Link>

        {/* Team Link with Icon */}
        <Link
          href="/team"
          className={cn(
            "group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium py-2 px-3 sm:px-3.5 rounded-xl border transition-all duration-200 cursor-pointer",
            isTeamActive
              ? "bg-[#161F2E] text-[#10B981] border-[#10B981]/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
              : "bg-transparent text-[#94A3B8] border-transparent hover:text-[#F8FAFC] hover:bg-[#161F2E]/70 hover:border-white/10"
          )}
        >
          <Users
            className={cn(
              "w-4 h-4 transition-colors shrink-0",
              isTeamActive ? "text-[#10B981]" : "text-[#94A3B8] group-hover:text-[#10B981]"
            )}
          />
          <span className="font-heading font-semibold tracking-wide">Team</span>
        </Link>

        {/* Live Build Badge (Hidden on mobile for balanced spatial economy) */}
        <div className="hidden md:flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#161F2E]/80 border border-white/10 text-xs font-medium text-[#94A3B8] shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span className="font-body tracking-tight text-[11px] lg:text-xs">Early Beta Invites Rolling Out</span>
        </div>
      </nav>
    </header>
  );
}
