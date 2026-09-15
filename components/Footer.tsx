"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="w-full py-4 sm:py-5 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8]/80 border-t border-white/[0.04] z-10 gap-3">
      {/* Left Branding / ADHD Mission Note */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
        <span className="font-medium text-[#F8FAFC]">© {new Date().getFullYear()} LOAH</span>
        <span>•</span>
        <span className="text-[#94A3B8]">Built by founders who live with ADHD</span>
      </div>

      {/* Right Navigation & Status */}
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-xs">
        <Link
          href="/team"
          className="hover:text-[#F8FAFC] text-[#94A3B8] transition-colors underline-offset-4 hover:underline"
        >
          Team
        </Link>
        <span>•</span>
        {isHome ? (
          <Link
            href="/journal"
            className="hover:text-[#F8FAFC] text-[#94A3B8] transition-colors underline-offset-4 hover:underline"
          >
            Read Our Journals
          </Link>
        ) : (
          <Link
            href="/"
            className="hover:text-[#F8FAFC] text-[#94A3B8] transition-colors underline-offset-4 hover:underline"
          >
            Back to Waitlist
          </Link>
        )}
        <span>•</span>
        <span className="text-[#94A3B8]/60">Testing app links rolling out soon</span>
      </div>
    </footer>
  );
}
