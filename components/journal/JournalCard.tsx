import Link from "next/link";
import Image from "next/image";
import { JournalPostMeta } from "@/types/journal";
import { Clock, Calendar, Sparkles } from "lucide-react";

export function JournalCard({ post }: { post: JournalPostMeta }) {
  return (
    <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#161F2E]/80 border border-white/10 hover:border-[#10B981]/50 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:-translate-y-0.5">
      <div>
        {/* Top Badges Row: Category + Type Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-semibold border border-[#10B981]/20 whitespace-nowrap">
              {post.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/[0.06] text-[#94A3B8] text-xs font-medium border border-white/10 whitespace-nowrap">
              {post.type}
            </span>
          </div>

          {post.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 whitespace-nowrap">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8FAFC] group-hover:text-[#10B981] transition-colors line-clamp-2 mb-3 leading-snug">
          <Link href={`/journal/${post.slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" />
            {post.title}
          </Link>
        </h3>

        {/* Truncated Description */}
        <p className="font-body text-sm sm:text-base text-[#94A3B8] line-clamp-3 leading-relaxed mb-6">
          {post.excerpt}
        </p>
      </div>

      {/* Card Footer: Author + Metadata */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-[#94A3B8]">
        {/* Author */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-[#1E293B]">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#10B981] text-xs font-bold uppercase">
                {post.author.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[#F8FAFC] font-medium leading-none mb-1 truncate">{post.author.name}</p>
            <p className="text-[11px] text-[#94A3B8]/70 leading-none truncate">{post.author.role}</p>
          </div>
        </div>

        {/* Reading Time & Date */}
        <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 opacity-70 shrink-0" />
            <span>{post.publishedAt}</span>
          </span>
          <span className="opacity-40">•</span>
          <span className="inline-flex items-center gap-1 text-[#34D399] font-medium">
            <Clock className="w-3.5 h-3.5 opacity-80 shrink-0" />
            <span>{post.readTime}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
