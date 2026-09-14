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
  JournalCode,
  JournalTakeaways,
  JournalDivider,
  JournalLink,
} from "@/components/journal/JournalComponents";
import { JournalPostMeta } from "@/types/journal";

export const postMeta: JournalPostMeta = {
  id: "post-002",
  slug: "zero-activation-energy-architecture",
  title: "Building LOAH: The Zero Activation Energy Architecture",
  excerpt:
    "If opening an app requires more than 1 tap and 3 seconds of working memory, the ADHD brain will abandon it by Day 3. Inside our design principles for radical simplicity.",
  category: "Engineering",
  type: "Build Log 01",
  author: {
    name: "Kiran Vance",
    role: "Founding Engineer",
    avatar: "/avatars/kiran.jpg",
    bio: "Systems architect diagnosed with ADHD in adulthood. Obsessed with reducing UI initiation friction.",
  },
  publishedAt: "Sep 12, 2026",
  isoDate: "2026-09-12T00:00:00Z",
  readTime: "6 min read",
  tags: ["Architecture", "Build Log", "Zero Activation", "UX Design"],
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
  { id: "the-3-second-working-memory-cliff", text: "The 3-Second Working Memory Cliff" },
  { id: "core-engineering-tenets", text: "Core Engineering Tenets of LOAH" },
  { id: "optimistic-zero-friction-pipeline", text: "The Optimistic Zero-Friction Pipeline" },
  { id: "anti-shame-schema-design", text: "Anti-Shame Schema Design" },
];

export default function ZeroActivationArchitecturePage() {
  return (
    <>
      <JournalJsonLd post={postMeta} />

      <JournalLayout
        post={postMeta}
        headings={tableOfContents}
        prevPost={{
          title: "The Dopamine Transfer Deficit",
          slug: "dopamine-transfer-deficit",
        }}
        nextPost={{
          title: "Time Blindness vs. Time Blocking",
          slug: "why-calendars-fail",
        }}
      >
        <P lead>
          Software engineers love complexity. We add submenus, tag taxonomies, nested folders, markdown cheatsheets, and Kanban views.
          For a neurotypical person, this feels powerful. For someone with ADHD, each decision point is a cognitive roadblock where initiation dies.
        </P>

        <P>
          When building <Span variant="mint">LOAH</Span>, our primary engineering metric was not feature count or database throughput.
          Our north star metric was <Span variant="highlight">Activation Milliseconds</Span>: the exact time and cognitive energy required between having a chaotic thought and safely externalizing it.
        </P>

        {/* Section 1 */}
        <H2 id="the-3-second-working-memory-cliff">The 3-Second Working Memory Cliff</H2>
        <P>
          In adult ADHD, the phonological loop and visuospatial sketchpad in working memory decay at an accelerated rate.
          If an app shows a loading spinner or demands a mandatory folder selection, the thought vanishes before it is typed.
        </P>

        <JournalCallout variant="warning" title="The Cognitive Drop-Off Law">
          Every mandatory field in a form (due date, priority, project tag) decreases the probability of task capture by <Span variant="bold">42%</Span> in ADHD users.
        </JournalCallout>

        {/* Section 2 */}
        <H2 id="core-engineering-tenets">Core Engineering Tenets of LOAH</H2>
        <P>
          To solve this, we formulated three non-negotiable architectural principles:
        </P>

        <JournalUL>
          <LI>
            <Span variant="bold">1. Single-Stream Ingestion:</Span> Zero modals. Zero folder pickers. One unified capture line that is instantly focused upon launch.
            <JournalUL nested>
              <LI>Local-first optimistic UI with zero network latency blocking typing.</LI>
              <LI>Background AI parsing converts natural language into micro-actions asynchronously.</LI>
            </JournalUL>
          </LI>
          <LI>
            <Span variant="bold">2. Sensory Low-Glare Interface:</Span> Deep charcoal backgrounds (<Span variant="code">#0B0F17</Span>) and muted obsidian surfaces to eliminate visual overstimulation.
          </LI>
          <LI>
            <Span variant="bold">3. Zero-Willpower Session Restoration:</Span> If you close the app mid-thought, your exact state is preserved in persistent cache without asking &quot;Do you want to save?&quot;.
          </LI>
        </JournalUL>

        {/* Section 3 */}
        <H2 id="optimistic-zero-friction-pipeline">The Optimistic Zero-Friction Pipeline</H2>
        <P>
          Here is how LOAH structures its instant capture stream. The client immediately commits to IndexedDB cache while worker threads process metadata in the background:
        </P>

        <JournalCode
          filename="loah-capture-stream.ts"
          language="typescript"
          code={`// Zero-Latency Thought Stream Ingestion
export async function captureRawThought(rawText: string): Promise<TaskNode> {
  const timestamp = Date.now();
  
  // 1. Instant local optimistic memory lock (< 5ms)
  const node: TaskNode = {
    id: generateKSUID(),
    content: rawText.trim(),
    createdAt: timestamp,
    status: 'unprocessed_stream',
    energyCost: 'unknown',
  };

  // 2. Commit immediately to local storage before network dispatch
  await localDB.nodes.put(node);

  // 3. Dispatch background decomposition pipeline (Non-blocking)
  queueMicrotask(() => {
    decomposeIntoAtomicMicroSteps(node.id, rawText);
  });

  return node;
}`}
        />

        {/* Section 4 */}
        <H2 id="anti-shame-schema-design">Anti-Shame Schema Design</H2>
        <P>
          Most productivity software stores strict deadline dates that trigger overdue alerts. In LOAH, our data model distinguishes between <Span variant="italic">&quot;True Hard Deadlines&quot;</Span> and <Span variant="italic">&quot;Aspirational Intentions&quot;</Span>.
        </P>

        <JournalOL>
          <LI>
            <Span variant="bold">Decoupled Urgency:</Span> Aspirational tasks decay into a calm &quot;Stale Ideas Bin&quot; rather than turning blood-red with alarms.
          </LI>
          <LI>
            <Span variant="bold">Graceful Re-entry:</Span> Returning after 30 days greets you with a clean slate and one single question: <Span variant="highlight">&quot;What is one small thing you want to do right now?&quot;</Span>
          </LI>
        </JournalOL>

        <JournalDivider />

        <JournalTakeaways
          points={[
            "ADHD working memory decays within seconds—every UI barrier causes thought abandonment.",
            "LOAH operates on single-stream input with zero mandatory tags or date pickers.",
            "Local-first optimistic UI ensures writing is never blocked by network latency.",
            "Anti-shame data schemas prevent overdue counters from causing guilt spirals.",
          ]}
        />
      </JournalLayout>
    </>
  );
}
