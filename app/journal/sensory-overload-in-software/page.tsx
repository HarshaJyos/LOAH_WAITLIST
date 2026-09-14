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
  JournalQuote,
  JournalTakeaways,
  JournalDivider,
} from "@/components/journal/JournalComponents";
import { JournalPostMeta } from "@/types/journal";

export const postMeta: JournalPostMeta = {
  id: "post-004",
  slug: "sensory-overload-in-software",
  title: "Sensory Overload in Modern Productivity Software",
  excerpt:
    "Red badges, jumping notifications, and high-contrast white pages exhaust neurodivergent nervous systems. Here is how LOAH implements calm focus aesthetics.",
  category: "Product Strategy",
  type: "Research Brief",
  author: {
    name: "Maya Lin",
    role: "Product & Community Lead",
    avatar: "/avatars/maya.jpg",
    bio: "Product strategist living with combined-type ADHD, exploring gentle productivity systems.",
  },
  publishedAt: "Sep 07, 2026",
  isoDate: "2026-09-07T00:00:00Z",
  readTime: "3 min read",
  tags: ["Sensory Fatigue", "Dark Mode", "Calm Focus", "UI Design"],
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
  { id: "the-visual-noise-epidemic", text: "The Visual Noise Epidemic" },
  { id: "sensory-fatigue-mechanics", text: "Sensory Fatigue Mechanics in ADHD" },
  { id: "calm-focus-design-rules", text: "Calm Focus Design Rules in LOAH" },
];

export default function SensoryOverloadPage() {
  return (
    <>
      <JournalJsonLd post={postMeta} />

      <JournalLayout
        post={postMeta}
        headings={tableOfContents}
        prevPost={{
          title: "Time Blindness vs. Time Blocking",
          slug: "why-calendars-fail",
        }}
        nextPost={{
          title: "Working Memory Externalization",
          slug: "working-memory-externalization",
        }}
      >
        <P lead>
          Look at modern SaaS productivity dashboards: 14 saturated badge colors, blinking notifications, high-contrast pure white backgrounds, and popups prompting upgrades.
          To an ADHD nervous system, this is not a workspace—it is an energetic assault.
        </P>

        <H2 id="the-visual-noise-epidemic">The Visual Noise Epidemic</H2>
        <P>
          Adults with ADHD frequently have atypical sensory modulation. Sensory filtering is mediated by the thalamus, which in neurodivergent brains allows non-essential visual stimuli to compete equally with primary tasks.
        </P>

        <JournalCallout variant="warning" title="Sensory Strain Fact">
          High-luminance white backgrounds and hyper-saturated alert colors trigger micro-cortisol surges, draining executive stamina before work even begins.
        </JournalCallout>

        <H2 id="sensory-fatigue-mechanics">Sensory Fatigue Mechanics in ADHD</H2>
        <P>
          When you enter an overly complex UI, your brain performs micro-saccades (rapid eye shifts), trying to decode competing visual signals:
        </P>

        <JournalUL>
          <LI>
            <Span variant="bold">Alert Glare:</Span> Saturated red notification badges mimic evolutionary danger cues.
          </LI>
          <LI>
            <Span variant="bold">Information Density Overload:</Span> Seeing 50 items simultaneously triggers immediate decision fatigue.
            <JournalUL nested>
              <LI>Working memory is forced to hold unrelated tasks.</LI>
              <LI>The user experiences an instinctual urge to close the tab.</LI>
            </JournalUL>
          </LI>
        </JournalUL>

        <H2 id="calm-focus-design-rules">Calm Focus Design Rules in LOAH</H2>
        <JournalOL>
          <LI><Span variant="bold">Deep Matte Slate (#0B0F17):</Span> Low-emission matte dark theme that prevents eye fatigue during late-night focus sessions.</LI>
          <LI><Span variant="bold">Single High-Dopamine Target (#10B981):</Span> Electric Mint accent guides the eye directly to the next single action.</LI>
          <LI><Span variant="bold">Zero Jarring Micro-Animations:</Span> No pulsing popups or distracting banners.</LI>
        </JournalOL>

        <JournalDivider />

        <JournalTakeaways
          points={[
            "Sensory overstimulation accelerates executive fatigue in ADHD adults.",
            "High-contrast white pages and red badges trigger cortisol and avoidance behavior.",
            "LOAH employs calm dark slate palettes and single-focus focal points for zero visual strain.",
          ]}
        />
      </JournalLayout>
    </>
  );
}
