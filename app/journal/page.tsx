import { Header } from "@/components/Header";
import { SensoryBackdrop } from "@/components/SensoryBackdrop";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Sparkles, BookOpen, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Journals — LOAH",
  description: "Raw notes on ADHD neurobiology, dopamine mechanics, and building an executive function system from scratch.",
};

const journalEntries = [
  {
    slug: "dopamine-transfer-deficit",
    title: "The Dopamine Transfer Deficit: Why Traditional Planners Freeze ADHD Brains",
    excerpt:
      "When dopamine anticipatory signals don't fire predictably, standard to-do lists trigger cognitive paralysis. Here's what neuroscience says about the gap between intention and action.",
    date: "Coming with Episode 1",
    readTime: "4 min read",
    tag: "Neuroscience",
    featured: true,
  },
  {
    slug: "zero-activation-energy",
    title: "Building Loah Ep 01: The Zero Activation Energy Architecture",
    excerpt:
      "If opening an app requires more than 1 tap and 3 seconds of working memory, the ADHD brain will abandon it by Day 3. Inside our design principles for radical simplicity.",
    date: "Doc Series Ep. 1",
    readTime: "6 min read",
    tag: "Behind The Build",
    featured: false,
  },
  {
    slug: "why-calendars-fail",
    title: "Time Blindness vs. Time Blocking: Why Strict Schedules Cause Shame Spirals",
    excerpt:
      "Calendar-blocking works for neurotypical brains because their sense of future time is consistent. For ADHD brains, time is either 'Now' or 'Not Now.'",
    date: "Upcoming",
    readTime: "5 min read",
    tag: "Deep Dive",
    featured: false,
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B0F17] text-[#F8FAFC] relative">
      <SensoryBackdrop />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 sm:py-16">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#10B981] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Waitlist</span>
        </Link>

        {/* Page Title & Intro */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F2E] border border-white/10 text-xs font-medium text-[#10B981]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The LOAH Journals</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight">
            Building in public. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-[#10B981]">
              Documenting the science.
            </span>
          </h1>
          <p className="font-body text-[#94A3B8] text-base sm:text-lg max-w-2xl leading-relaxed">
            Raw research on ADHD neurobiology, dopamine transfer, and engineering logs from our weekly build documentary.
          </p>
        </div>

        {/* Journal Entries List */}
        <div className="space-y-6">
          {journalEntries.map((entry) => (
            <article
              key={entry.slug}
              className="group p-6 sm:p-8 rounded-2xl bg-[#161F2E]/80 border border-white/10 hover:border-[#10B981]/50 transition-all duration-200 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8] mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] font-medium border border-[#10B981]/20">
                  {entry.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {entry.readTime}
                </span>
              </div>

              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#F8FAFC] group-hover:text-[#10B981] transition-colors mb-3">
                {entry.title}
              </h2>

              <p className="font-body text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-4">
                {entry.excerpt}
              </p>

              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#10B981] group-hover:underline underline-offset-4">
                <span>Reading release notes with Episode 1</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          ))}
        </div>

        {/* Join Waitlist Banner at bottom of Journals */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-[#10B981]/30 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8FAFC]">
            Want early access before Episode 1 airs?
          </h3>
          <p className="font-body text-sm text-[#94A3B8] max-w-md mx-auto">
            Join the waitlist to receive private beta builds and behind-the-scenes research notes.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#022C22] font-heading font-bold text-sm tracking-tight transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
            >
              Get Early Access on the Waitlist
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8]/70 border-t border-white/[0.04] mt-16 gap-3">
        <span>© {new Date().getFullYear()} loah • Built for ADHD minds</span>
        <Link href="/" className="hover:text-[#F8FAFC] transition-colors">
          Return to Waitlist
        </Link>
      </footer>
    </div>
  );
}
