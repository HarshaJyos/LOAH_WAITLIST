import type { Metadata } from "next";
import { JournalLayout } from "@/components/journal/JournalLayout";
import { JournalJsonLd } from "@/components/journal/JournalJsonLd";
import {
  P,
  Span,
  H2,
  H3,
  JournalUL,
  JournalOL,
  LI,
  JournalCallout,
  JournalQuote,
  JournalTakeaways,
  JournalDivider,
  JournalLink,
} from "@/components/journal/JournalComponents";
import { JournalPostMeta } from "@/types/journal";

export const postMeta: JournalPostMeta = {
  id: "post-003",
  slug: "why-calendars-fail",
  title: "Time Blindness vs. Time Blocking: Why Strict Schedules Cause Shame Spirals",
  excerpt:
    "Calendar-blocking works for neurotypical brains because their sense of future time is continuous. For ADHD brains, time is binary: 'Now' or 'Not Now.'",
  category: "ADHD Insights",
  type: "Deep Dive",
  author: {
    name: "Maya Lin",
    role: "Product & Community Lead",
    avatar: "/avatars/maya.jpg",
    bio: "Product strategist living with combined-type ADHD, exploring gentle productivity systems.",
  },
  publishedAt: "Sep 10, 2026",
  isoDate: "2026-09-10T00:00:00Z",
  readTime: "5 min read",
  tags: ["Time Blindness", "Time Blocking", "Shame Spirals", "Productivity"],
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
  { id: "the-myth-of-the-perfect-color-coded-calendar", text: "The Myth of the Color-Coded Calendar" },
  { id: "the-neurobiology-of-time-blindness", text: "The Neurobiology of Time Blindness" },
  { id: "the-domino-collapse-of-time-blocking", text: "The Domino Collapse of Time Blocking" },
  { id: "the-energy-first-alternative", text: "The Energy-First Alternative" },
];

export default function WhyCalendarsFailPage() {
  return (
    <>
      <JournalJsonLd post={postMeta} />

      <JournalLayout
        post={postMeta}
        headings={tableOfContents}
        prevPost={{
          title: "Building LOAH: Zero Activation Architecture",
          slug: "zero-activation-energy-architecture",
        }}
      >
        <P lead>
          Every Sunday evening, millions of adults with ADHD open Google Calendar or a pristine paper planner.
          They meticulously color-code every 30-minute block: 9:00 AM Deep Work, 10:30 AM Email, 11:15 AM Gym, 1:00 PM Writing.
          By Tuesday at 10:45 AM, the schedule is in ruins, and a familiar sense of personal failure creeps in.
        </P>

        <P>
          The problem was never your willpower. The problem is that <Span variant="highlight">time blocking assumes a continuous temporal perception</Span> that the ADHD brain does not possess.
        </P>

        {/* Section 1 */}
        <H2 id="the-myth-of-the-perfect-color-coded-calendar">The Myth of the Color-Coded Calendar</H2>
        <P>
          Time-blocking was popularized by executives who possess consistent baseline executive functioning and secretaries who shield them from disruptions.
          When an ADHD adult tries to execute a rigid hourly schedule, even a 10-minute unexpected delay creates a <Span variant="mint">total domino collapse</Span>.
        </P>

        {/* Section 2 */}
        <H2 id="the-neurobiology-of-time-blindness">The Neurobiology of Time Blindness</H2>
        <P>
          Dr. Russell Barkley, a leading clinical researcher on ADHD, famously identified time blindness as the cornerstone deficit of ADHD:
        </P>

        <JournalQuote author="Dr. Russell Barkley" source="ADHD and the Nature of Self-Control">
          ADHD is not a disorder of knowing what to do. It is a disorder of doing what you know at the point of performance in time.
        </JournalQuote>

        <P>
          To an ADHD nervous system, time is divided into two distinct dimensions:
        </P>

        <JournalUL>
          <LI>
            <Span variant="bold">1. NOW:</Span> The current sensory moment, whatever has grabbed your focus or crisis attention.
          </LI>
          <LI>
            <Span variant="bold">2. NOT NOW:</Span> Everything else (in 2 hours, tomorrow morning, next month, next year).
            <JournalUL nested>
              <LI>Because &quot;Not Now&quot; feels infinitely distant, tasks scheduled for 2:00 PM feel optional at 1:55 PM.</LI>
              <LI>Until 2:05 PM arrives, at which point the task becomes a sudden high-cortisol emergency.</LI>
            </JournalUL>
          </LI>
        </JournalUL>

        {/* Section 3 */}
        <H2 id="the-domino-collapse-of-time-blocking">The Domino Collapse of Time Blocking</H2>
        <P>
          When you miss a scheduled block on a calendar, three psychological reactions occur:
        </P>

        <JournalOL>
          <LI>
            <Span variant="bold">Cognitive Dissonance:</Span> The schedule says you should be writing, but your brain is still stuck in transition from the previous task.
          </LI>
          <LI>
            <Span variant="bold">Shame Spiral:</Span> You feel guilty for falling behind by 11:00 AM, which drains whatever little dopamine was left for the afternoon.
          </LI>
          <LI>
            <Span variant="bold">Total Abandonment:</Span> You close the planner tab entirely to avoid looking at the missed blocks.
          </LI>
        </JournalOL>

        {/* Section 4 */}
        <H2 id="the-energy-first-alternative">The Energy-First Alternative</H2>
        <P>
          At <Span variant="mint">LOAH</Span>, we replace rigid time-blocking with <Span variant="bold">Energy-Based Flow Routing</Span>:
        </P>

        <JournalCallout variant="tip" title="Energy-First Organizing">
          Instead of asking <Span variant="italic">&quot;What should I do at 2:00 PM?&quot;</Span>, LOAH asks:
          <Span variant="bold"> &quot;What kind of cognitive energy do you have right now?&quot;</Span>
          <JournalUL nested>
            <LI><Span variant="bold">⚡ High-Focus / Hyperfocus:</Span> Deep architecture, hard problem solving.</LI>
            <LI><Span variant="bold">☕ Low-Energy / Tired:</Span> Filing expenses, clearing spam, quick replies.</LI>
            <LI><Span variant="bold">🔥 Chaos / Agitated:</Span> Micro-organization, quick 2-minute physical actions.</LI>
          </JournalUL>
        </JournalCallout>

        <JournalDivider />

        <JournalTakeaways
          points={[
            "Time blocking requires continuous time perception that ADHD brains neurochemically lack.",
            "Missing a single scheduled block often triggers shame spirals and system abandonment.",
            "Time blindness separates life into 'Now' and 'Not Now'—future blocks feel unreal until they become emergencies.",
            "Energy-based routing matches tasks to your current dopamine state rather than the clock.",
          ]}
        />
      </JournalLayout>
    </>
  );
}
