"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface JournalFaqProps {
  items: FaqItem[];
  title?: string;
  description?: string;
  className?: string;
}

export function JournalFaq({
  items,
  title = "Frequently Asked Questions",
  description = "Common questions about the science and application in this journal entry.",
  className,
}: JournalFaqProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <section className={cn("my-12 space-y-5 scroll-mt-24", className)} id="faq">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#161F2E] border border-white/10 text-xs font-semibold text-[#10B981]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQ Breakdown</span>
        </div>
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F8FAFC] tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="font-body text-sm text-[#94A3B8]">{description}</p>
        )}
      </div>

      <div className="space-y-3 pt-2">
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div
              key={index}
              className={cn(
                "rounded-2xl border transition-all duration-200 overflow-hidden",
                isOpen
                  ? "bg-[#161F2E]/90 border-[#10B981]/40 shadow-lg"
                  : "bg-[#161F2E]/40 border-white/10 hover:border-white/20"
              )}
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
                aria-expanded={isOpen}
              >
                <span className="font-heading font-semibold text-base sm:text-lg text-[#F8FAFC]">
                  {item.question}
                </span>
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200",
                    isOpen
                      ? "bg-[#10B981]/20 text-[#10B981] rotate-180"
                      : "bg-white/5 text-[#94A3B8]"
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 font-body text-sm sm:text-base text-[#CBD5E1] leading-relaxed animate-fade-in-scale border-t border-white/[0.04]">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
