import type { Metadata } from "next";
import { JournalLayout } from "@/components/journal/JournalLayout";
import { JournalJsonLd } from "@/components/journal/JournalJsonLd";
import {
  P,
  Span,
  H2,
  JournalOL,
  LI,
  JournalCallout,
  JournalQuote,
  JournalTakeaways,
  JournalDivider,
  JournalLink,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from "@/components/journal/JournalComponents";
import { JournalPostMeta } from "@/types/journal";
import { ArrowRight, Sparkles, Video } from "lucide-react";

export const postMeta: JournalPostMeta = {
  id: "post-001",
  slug: "why-notes-apps-fail-adhd-brains",
  title: "Why Notes Apps Fail ADHD Brains (And How to Brain Dump Without Overwhelm)",
  excerpt:
    "Most notes apps force you to decide too early. Here is why capturing and organizing at the same time exhausts ADHD working memory—and the 3 simple rules to brain dump without overwhelm.",
  category: "ADHD Insights",
  type: "Deep Dive",
  author: {
    name: "Pavan Duggirala",
    role: "Product & Community Lead",
    avatar: "/avatars/pavan.jpg",
    bio: "Product strategist living with ADHD, exploring calm, zero-friction externalization systems.",
  },
  publishedAt: "Sep 15, 2026",
  isoDate: "2026-09-15T00:00:00Z",
  readTime: "3 min read",
  tags: ["ADHD", "Brain Dump", "Working Memory", "Notes Apps", "Calm Focus"],
  featured: true,
};

export const metadata: Metadata = {
  title: `${postMeta.title} — LOAH Journals`,
  description: postMeta.excerpt,
  openGraph: {
    title: postMeta.title,
    description: postMeta.excerpt,
    type: "article",
    publishedTime: postMeta.isoDate,
    authors: [postMeta.author.name],
  },
};

const tableOfContents = [
  { id: "the-real-problem", text: "The real problem" },
  { id: "what-actually-worked-for-me", text: "What actually worked for me" },
  { id: "three-simple-rules-i-follow", text: "Three simple rules I follow" },
  { id: "if-this-sounds-familiar", text: "If this sounds familiar" },
];

export default function WhyNotesAppsFailPage() {
  return (
    <>
      <JournalJsonLd post={postMeta} />

      <JournalLayout
        post={postMeta}
        headings={tableOfContents}
      >
        <P lead>
          I used to open my notes app every day and feel worse after five minutes.
        </P>

        <P>
          Apple Notes. Notion. Obsidian. All of them. I’d start typing and suddenly there were twenty half-finished pages. Titles I never finished. Random thoughts mixed with to-dos. Lists that never got checked.
        </P>

        <P>
          And my brain just… shut down.
        </P>

        <P>
          It wasn’t the apps. It was me trying to use them the way “normal” people do.
        </P>

        <H2 id="the-real-problem">The real problem</H2>

        <P>
          Most notes apps force you to decide too early.
        </P>

        <P>
          You have a thought. You open the app. Now you have to pick a folder. Or a tag. Or a page. Or a database. Or some pretty template. Your brain is already tired from holding the original thought, and now it has to organise it at the same time.
        </P>

        <P>
          <Span variant="bold">That’s two jobs at once. ADHD brains hate two jobs at once.</Span>
        </P>

        <JournalCallout variant="science" title="The Working Memory Bottleneck">
          Working memory is tiny. It’s like trying to carry water in your hands. You can hold a little bit. The moment you try to pour it into neat cups while still walking, most of it spills.
        </JournalCallout>

        <P>
          That’s what regular notes apps ask you to do. Capture and organise at the same time. By the time you finish picking where it should go, the original idea is already gone.
        </P>

        <P>
          So you close the app. Or you leave another mess. Or you promise yourself you’ll clean it later (you won’t).
        </P>

        <H2 id="what-actually-worked-for-me">What actually worked for me</H2>

        <P>
          I lived like that for years. Every notes app felt like it was laughing at me. “Look how organised other people are.” Meanwhile my brain was full of open tabs that never closed.
        </P>

        <P>
          Then I stopped trying to be organised in the moment.
        </P>

        <P>
          <Span variant="highlight">I started dumping instead.</Span>
        </P>

        <P>
          No folders. No tags. No perfect titles. No deciding if this is a task or a note or a journal entry. Just get it out of the head as fast as possible.
        </P>

        <P>
          When a thought shows up — a worry, a random idea, something I need to buy, a half-remembered conversation — I open one empty space and type the mess exactly as it is.
        </P>

        <JournalQuote author="Real Brain Dump Example">
          Remember to call mom about the thing. Also why did I feel weird after that meeting. Need eggs. Oh and that idea about the morning routine maybe change the stretch part. Ugh I still haven’t paid that bill.
        </JournalQuote>

        <P>
          All in one place. Ugly. Mixed. Fine.
        </P>

        <P>
          Later, when my brain has a bit more energy, I look at the dump. Now I can decide. This bit becomes a task. That bit becomes a note. Some of it just gets deleted because it doesn’t matter anymore.
        </P>

        <JournalCallout variant="insight" title="Relief For Your Executive Function">
          The dump held it for me so my working memory didn’t have to.
        </JournalCallout>

        <H2 id="three-simple-rules-i-follow">Three simple rules I follow</H2>

        <JournalOL>
          <LI>
            <Span variant="bold">1. One single place to dump.</Span> If I have to choose a location before I can type, the system is already broken.
          </LI>
          <LI>
            <Span variant="bold">2. Zero polishing.</Span> Spelling doesn’t matter. Grammar doesn’t matter. Speed is the only thing that counts.
          </LI>
          <LI>
            <Span variant="bold">3. Decide later.</Span> Never organise a thought the second it leaves my head. Let it sit until my brain has energy again.
          </LI>
        </JournalOL>

        <P>
          That’s it. <Span variant="mint">Capture first. Decide later.</Span>
        </P>

        {/* Comparison Table */}
        <Table caption="Table 1: Traditional Note-Taking vs. The Dump & Decide Later Flow">
          <THead>
            <TR>
              <TH>Workflow Stage</TH>
              <TH>Traditional Notes App</TH>
              <TH>Dump &amp; Decide Later</TH>
              <TH>ADHD Impact</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD variant="bold">Initiation</TD>
              <TD>Select folder, subpage, or tag</TD>
              <TD variant="mint">1 single blank space</TD>
              <TD>Zero initiation friction</TD>
            </TR>
            <TR>
              <TD variant="bold">Input Mode</TD>
              <TD>Forced formatting &amp; neatness</TD>
              <TD variant="mint">Raw, unpolished mess</TD>
              <TD>Spares fragile working memory</TD>
            </TR>
            <TR>
              <TD variant="bold">Organization</TD>
              <TD>Simultaneous (2 jobs at once)</TD>
              <TD variant="mint">Deferred to high-energy moments</TD>
              <TD>Eliminates shame spirals</TD>
            </TR>
          </TBody>
        </Table>

        <H2 id="if-this-sounds-familiar">If this sounds familiar</H2>

        <P>
          If your notes apps keep making you feel behind instead of better, try this for a week. Open a blank page. Dump everything without sorting. Come back later and sort only what still matters.
        </P>

        <P>
          Your brain will thank you. The open tabs in your head start closing. And for once the notes app stops feeling like another thing you’re failing at.
        </P>

        <P>
          We’re building a tool around exactly this flow — one empty space for the mess, then an easy way to turn the dump into tasks or notes when you’re ready. No folders. No pressure. Just get it out, then decide later.
        </P>

        <P>
          We’re documenting the whole build week by week in a raw video series so you can see how it’s being made.
        </P>

        {/* Call to action card */}
        <div className="my-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#161F2E] via-[#111827] to-[#0B0F17] border border-[#10B981]/40 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#10B981] uppercase tracking-wider">
            <Video className="w-4 h-4" />
            <span>Behind The Scenes Build Series</span>
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8FAFC]">
            Watch how we&apos;re building the zero-friction dump tool
          </h3>
          <p className="font-body text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            If you want early access when it’s ready (and to watch the build process), you can join the waitlist below.
          </p>
          <div className="pt-2">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#0B0F17] font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-[#10B981]/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Join the waitlist &amp; watch the build documentary</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <P>
          <Span variant="bold">Just dump. Decide later. That’s the whole trick.</Span>
        </P>

        <JournalDivider />

        <JournalTakeaways
          title="Summary Takeaways"
          points={[
            "Most notes apps fail ADHD brains because they demand capturing and organizing at the exact same moment.",
            "Working memory is tiny and spills easily—dump thoughts raw into one single place with zero folders or tags.",
            "Sort, convert to tasks, or discard only later when your brain has recovered executive energy.",
          ]}
        />
      </JournalLayout>
    </>
  );
}
