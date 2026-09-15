import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SensoryBackdrop } from "@/components/SensoryBackdrop";
import { WaitlistForm } from "@/components/WaitlistForm";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { AuthorArticlesList } from "@/components/team/AuthorArticlesList";
import { getTeamMember, getAllTeamMembers } from "@/lib/team-data";
import { getAllJournalPosts } from "@/lib/journal-data";
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  ArrowRight,
  User,
  HeartHandshake,
} from "lucide-react";

export function generateStaticParams() {
  const members = getAllTeamMembers();
  return members.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return { title: "Team Member Not Found" };

  return {
    title: `${member.name} — ${member.role} | LOAH Team`,
    description: member.shortBio,
    openGraph: {
      title: `${member.name} — LOAH`,
      description: member.shortBio,
      images: [member.avatar],
    },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    notFound();
  }

  // Get articles written by this team member
  const allPosts = getAllJournalPosts();
  const authorPosts = allPosts.filter(
    (post) =>
      post.author.name.toLowerCase() === member.name.toLowerCase() ||
      post.author.avatar.includes(member.slug.split("-")[0])
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B0F17] text-[#F8FAFC] relative selection:bg-[#10B981]/20 selection:text-[#10B981]">
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
            <span>Back to Journal</span>
          </Link>

          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161F2E] border border-white/10 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span>LOAH Team</span>
          </Link>
        </div>

        {/* Profile Card */}
        <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#161F2E] via-[#111827] to-[#0B0F17] border border-white/10 shadow-2xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative z-10">
            {/* High-res Avatar with Glow */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#10B981]/50 shadow-[0_0_25px_rgba(16,185,129,0.2)] bg-[#161F2E] relative">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#10B981] text-[#022C22] text-[10px] font-bold uppercase tracking-wider shadow-md">
                Team
              </div>
            </div>

            {/* Header Details */}
            <div className="space-y-3.5 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-semibold border border-[#10B981]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{member.role}</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight">
                {member.name}
              </h1>

              <p className="font-body text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                {member.shortBio}
              </p>

              {member.location && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#94A3B8]">
                  <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{member.location}</span>
                </div>
              )}

              {/* Social Media Links (Rendered only if provided) */}
              {member.socials && (
                <div className="pt-2 flex justify-center sm:justify-start">
                  <TeamSocialLinks
                    socials={member.socials}
                    memberName={member.name}
                    variant="pill"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Story / About Section */}
        <section className="space-y-6 mb-12">
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-2xl text-[#F8FAFC] tracking-tight">
              About &amp; Perspective
            </h2>
            <div className="h-0.5 w-12 bg-[#10B981] rounded-full" />
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#161F2E]/60 border border-white/10 space-y-4 font-body text-[#CBD5E1] text-base leading-[1.75]">
            {member.story.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Focus Areas as an Ordered List */}
          {member.focusAreas && member.focusAreas.length > 0 && (
            <div className="space-y-3 pt-4">
              <h3 className="font-heading font-semibold text-sm text-[#94A3B8] uppercase tracking-wider">
                Focus Areas at LOAH
              </h3>
              <ol className="space-y-2.5 font-body list-none p-0 m-0">
                {member.focusAreas.map((area, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#161F2E]/60 border border-white/[0.08] hover:border-[#10B981]/30 transition-colors"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#10B981]/15 text-[#10B981] font-mono font-bold text-xs shrink-0 border border-[#10B981]/30">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base text-[#E2E8F0] font-medium">
                      {area}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* Written Journals by Member (Interactive, filterable, and paginated) */}
        <AuthorArticlesList posts={authorPosts} authorName={member.name} />

        {/* Waitlist Box */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-[#10B981]/30 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl text-[#F8FAFC]">
              Join the LOAH Beta &amp; Build Journey
            </h3>
            <p className="font-body text-sm sm:text-base text-[#94A3B8] max-w-md mx-auto leading-relaxed">
              Experience the zero-activation brain dump tool designed for ADHD minds.
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
