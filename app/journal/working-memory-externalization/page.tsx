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
  id: "post-005",
  slug: "working-memory-externalization",
  title: "Working Memory Externalization: Thinking Outside the Prefrontal Cortex",
  excerpt:
    "ADHD working memory is not broken—it is simply low-capacity and volatile. An external capture system must act like fast RAM rather than a deep file cabinet.",
  category: "Neuroscience",
  type: "Deep Dive",
  author: {
    name: "Dr. Aris Thorne",
    role: "Neuroscience Lead at LOAH",
    avatar: "/avatars/aris.jpg",
    bio: "Cognitive neuroscientist researching executive dysfunction and anticipatory dopamine signaling in adult ADHD.",
  },
  publishedAt: "Sep 04, 2026",
  isoDate: "2026-09-04T00:00:00Z",
  readTime: "5 min read",
  tags: ["Working Memory", "Cognitive Load", "Prefrontal Cortex"],
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
  { id: "the-volatile-ram-model", text: "The Volatile RAM Model of ADHD" },
  { id: "why-mental-tagging-fails", text: "Why Mental Tagging Fails" },
  { id: "zero-latency-externalization", text: "Zero-Latency Externalization Principles" },
];

export default function WorkingMemoryPage() {
  return (
    <>
      <JournalJsonLd post={postMeta} />

      <JournalLayout
        post={postMeta}
        headings={tableOfContents}
        prevPost={{
          title: "Sensory Overload in Software",
          slug: "sensory-overload-in-software",
        }}
        nextPost={{
          title: "Why You Abandon New Planners on Day 3",
          slug: "the-three-day-abandonment-cycle",
        }}
      >
        <P lead>
          Neurotypical brains can hold 4 to 7 discrete chunks of information simultaneously in active working memory.
          An ADHD brain under stress holds 1 to 2 before involuntary buffer overwrite occurs.
        </P>

        <H2 id="the-volatile-ram-model">The Volatile RAM Model of ADHD</H2>
        <P>
          Think of your brain like computer memory. Most productivity tools treat the mind as non-volatile SSD storage.
          In reality, the ADHD prefrontal cortex behaves like <Span variant="mint">unbuffered volatile RAM</Span>: the moment a new sensory interruption occurs, previous temporary variables are instantly wiped.
        </P>

        <JournalQuote author="Dr. Edward Hallowell" source="Driven to Distraction">
          The ADHD mind is like a Ferrari engine with bicycle brakes. The ideas come at 150 mph, but the holding pen is paper-thin.
        </JournalQuote>

        <H2 id="why-mental-tagging-fails">Why Mental Tagging Fails</H2>
        <P>
          Traditional tools ask you to classify every thought as you record it:
        </P>

        <JournalUL>
          <LI>
            <Span variant="bold">Cognitive Penalty 1:</Span> Choosing a project folder forces contextual task switching.
          </LI>
          <LI>
            <Span variant="bold">Cognitive Penalty 2:</Span> Estimating time or assigning urgency requires predictive executive estimation.
            <JournalUL nested>
              <LI>Both operations deplete available dopamine reserves.</LI>
              <LI>Result: You tell yourself &quot;I&apos;ll write this down later&quot;—and the thought is lost forever.</LI>
            </JournalUL>
          </LI>
        </JournalUL>

        <H2 id="zero-latency-externalization">Zero-Latency Externalization Principles</H2>
        <P>
          LOAH is designed to serve as an instant, externalized prefrontal buffer:
        </P>

        <JournalOL>
          <LI><Span variant="bold">Immediate Thought Ingestion:</Span> Type and press Enter. Zero categorization required.</LI>
          <LI><Span variant="bold">Asynchronous AI Structuring:</Span> The system organizes the context in the background while your focus remains intact.</LI>
          <LI><Span variant="bold">Ambient Recall:</Span> Surfaces items only at the exact point of relevance.</LI>
        </JournalOL>

        <JournalDivider />

        <JournalTakeaways
          points={[
            "ADHD working memory operates like volatile RAM—thoughts evaporate upon distraction.",
            "Requiring folder classification or tags creates task initiation roadblocks.",
            "LOAH acts as an instant external brain buffer with zero-latency thought dumping.",
          ]}
        />
      </JournalLayout>
    </>
  );
}
