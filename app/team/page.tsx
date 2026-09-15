import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SensoryBackdrop } from "@/components/SensoryBackdrop";
import { WaitlistForm } from "@/components/WaitlistForm";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { getAllTeamMembers } from "@/lib/team-data";
import {
  ArrowLeft,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Team Behind LOAH — Zero-Activation Productivity",
  description:
    "Meet the engineers, strategists, and neurodivergent minds building LOAH's calm focus architecture.",
};

export default function TeamDirectoryPage() {
  const members = getAllTeamMembers();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B0F17] text-[#F8FAFC] relative selection:bg-[#10B981]/20 selection:text-[#10B981]">
      <SensoryBackdrop />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-5 sm:px-8 py-10 sm:py-16">
        {/* Top Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#10B981] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Journals</span>
        </Link>

        {/* Hero Section */}
        <div className="space-y-4 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161F2E] border border-white/10 text-xs font-semibold text-[#10B981]">
            <Users className="w-3.5 h-3.5" />
            <span>The LOAH Team</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight leading-[1.15]">
            Built by neurodivergent minds, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-[#10B981]">
              for ADHD brains.
            </span>
          </h1>

          <p className="font-body text-[#94A3B8] text-base sm:text-lg max-w-2xl leading-relaxed">
            We are building the tools we desperately needed ourselves—eliminating the cognitive hurdles and decision fatigue of traditional productivity software.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {members.map((member) => (
            <article
              key={member.slug}
              className="group p-6 sm:p-8 rounded-3xl bg-[#161F2E]/80 border border-white/10 hover:border-[#10B981]/50 transition-all duration-200 backdrop-blur-sm shadow-xl flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#10B981]/40 shrink-0 bg-[#161F2E]">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-[11px] font-semibold mb-1">
                      {member.role}
                    </span>
                    <h2 className="font-heading font-bold text-xl text-[#F8FAFC] group-hover:text-[#10B981] transition-colors">
                      <Link href={`/team/${member.slug}`}>
                        {member.name}
                      </Link>
                    </h2>
                  </div>
                </div>

                <p className="font-body text-sm text-[#94A3B8] leading-relaxed">
                  {member.shortBio}
                </p>

                {/* Social links on directory card */}
                {member.socials && (
                  <div className="pt-1">
                    <TeamSocialLinks
                      socials={member.socials}
                      memberName={member.name}
                      variant="compact"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">
                  {member.focusAreas[0]}
                </span>
                <Link
                  href={`/team/${member.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] group-hover:translate-x-1 transition-transform"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Waitlist Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-[#10B981]/30 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl text-[#F8FAFC]">
              Join Our Building Journey
            </h3>
            <p className="font-body text-sm sm:text-base text-[#94A3B8] max-w-md mx-auto leading-relaxed">
              Get early access to LOAH and watch our raw, behind-the-scenes build documentary.
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
