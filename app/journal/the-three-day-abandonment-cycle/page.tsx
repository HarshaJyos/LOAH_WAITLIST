import type { Metadata } from "next";
import { JournalLayout } from "@/components/journal/JournalLayout";
import { JournalJsonLd } from "@/components/journal/JournalJsonLd";
import {
  P,
  Span,
  H2,
  JournalUL,
  JournalOL,
  LI,
  JournalCallout,
  JournalTakeaways,
  JournalDivider,
} from "@/components/journal/JournalComponents";
import { JournalPostMeta } from "@/types/journal";

export const postMeta: JournalPostMeta = {
  id: "post-006",
  slug: "the-three-day-abandonment-cycle",
  title: "Why You Abandon New Planners on Day 3 (And How to Fix It)",
  excerpt:
    "Novelty triggers initial hyperfocus, but when novelty decays, executive function crashes. We engineered LOAH so maintenance takes zero willpower.",
  category: "ADHD Insights",
  type: "Alpha Beta Release",
  author: {
    name: "Kiran Vance",
    role: "Founding Engineer",
    avatar: "/avatars/kiran.jpg",
    bio: "Systems architect diagnosed with ADHD in adulthood. Obsessed with reducing UI initiation friction.",
  },
  publishedAt: "Sep 01, 2026",
  isoDate: "2026-09-01T00:00:00Z",
  readTime: "4 min read",
  tags: ["Novelty Decay", "Hyperfocus", "Task Friction", "Habits"],
  featured: false,
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
  { id: "the-honeymoon-phase", text: "The Day 1-2 Honeymoon Phase" },
  { id: "the-novelty-cliff", text: "The Day 3 Novelty Cliff" },
  { id: "building-for-zero-maintenance", text: "Building For Zero Maintenance in LOAH" },
];

export default function ThreeDayAbandonmentCyclePage() {
  return (
    <>
      <JournalJsonLd post={postMeta} />

      <JournalLayout
        post={postMeta}
        headings={tableOfContents}
        prevPost={{
          title: "Working Memory Externalization",
          slug: "working-memory-externalization",
        }}
      >
        <P lead>
          The cycle is painfully familiar: You find a new app or leather journal.
          For 48 hours, you configure templates, set up colors, and feel like you have finally fixed your life.
          By Day 3 or 4, opening the app requires insurmountable activation energy, and the shame cycle restarts.
        </P>

        <H2 id="the-honeymoon-phase">The Day 1-2 Honeymoon Phase</H2>
        <P>
          In ADHD, <Span variant="mint">novelty is a substitute for dopamine</Span>. When a system is brand new, your brain enjoys a transient neurochemical spike.
          Setting up the system provides effortless hyperfocus because the setup itself feels like progress.
        </P>

        <H2 id="the-novelty-cliff">The Day 3 Novelty Cliff</H2>
        <P>
          Once the novelty wears off (typically within 72 hours), the system must be maintained by <Span variant="bold">habit and intrinsic executive motivation</Span>—the very functions ADHD brains struggle with.
        </P>

        <JournalCallout variant="warning" title="The System Debt Trap">
          When maintenance requires more energy than the task itself, the ADHD brain marks the app as an energy sink and actively resists opening it.
        </JournalCallout>

        <H2 id="building-for-zero-maintenance">Building For Zero Maintenance in LOAH</H2>
        <P>
          LOAH breaks the 3-day abandonment cycle by eliminating maintenance debt completely:
        </P>

        <JournalUL>
          <LI><Span variant="bold">No Daily Ritual Required:</Span> You don&apos;t have to do &quot;morning reviews&quot; or &quot;evening shutdowns&quot; for the system to work.</LI>
          <LI><Span variant="bold">Zero Cleanup Burden:</Span> Tasks that are no longer relevant fade away quietly without accumulating overdue guilt.</LI>
          <LI><Span variant="bold">Frictionless Re-entry:</Span> Come back after 2 weeks, and LOAH welcomes you with open arms and zero red warning counters.</LI>
        </JournalUL>

        <JournalDivider />

        <JournalTakeaways
          points={[
            "Novelty temporarily compensates for dopamine deficits during the first 48 hours of any new tool.",
            "Traditional apps fail because they require routine maintenance once novelty fades.",
            "LOAH is engineered with zero maintenance debt and zero-guilt re-entry.",
          ]}
        />
      </JournalLayout>
    </>
  );
}
