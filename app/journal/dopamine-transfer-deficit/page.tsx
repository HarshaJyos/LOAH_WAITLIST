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
  id: "post-001",
  slug: "dopamine-transfer-deficit",
  title: "The Dopamine Transfer Deficit: Why Traditional Planners Freeze ADHD Brains",
  excerpt:
    "When dopamine anticipatory signals don't fire predictably, standard to-do lists trigger cognitive paralysis. Here is what neuroscience says about the gap between intention and action.",
  category: "Neuroscience",
  type: "Alpha Beta Release",
  author: {
    name: "Dr. Aris Thorne",
    role: "Neuroscience Lead at LOAH",
    avatar: "/avatars/aris.jpg",
    bio: "Cognitive neuroscientist researching executive dysfunction and anticipatory dopamine signaling in adult ADHD.",
  },
  publishedAt: "Sep 14, 2026",
  isoDate: "2026-09-14T00:00:00Z",
  readTime: "4 min read",
  tags: ["Dopamine", "Neuroscience", "Task Paralysis", "Executive Function"],
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
  { id: "the-task-initiation-paradox", text: "The Task Initiation Paradox" },
  { id: "what-is-the-dopamine-transfer-deficit", text: "What is the Dopamine Transfer Deficit?" },
  { id: "the-failure-loop-of-traditional-planners", text: "The Failure Loop of Traditional Planners" },
  { id: "how-loah-engineers-around-the-gap", text: "How LOAH Engineers Around The Gap" },
];

export default function DopamineTransferDeficitPage() {
  return (
    <>
      <JournalJsonLd post={postMeta} />

      <JournalLayout
        post={postMeta}
        headings={tableOfContents}
        nextPost={{
          title: "Building LOAH: The Zero Activation Energy Architecture",
          slug: "zero-activation-energy-architecture",
        }}
      >
        {/* Lead Paragraph */}
        <P lead>
          You are sitting at your desk. You know with 100% precision that you have a report to submit in three hours.
          You want to start. Your career matters to you. And yet, your body remains physically immobile, staring at a blank document while your chest tightens in guilt.
        </P>

        <P>
          Neurotypicals label this as <Span variant="highlight">“laziness”</Span> or <Span variant="highlight">“lack of discipline”</Span>.
          Traditional productivity gurus tell you to <Span variant="italic">“eat the frog”</Span> or use the Pomodoro technique.
          What they do not understand is that you are not dealing with a motivation problem—you are dealing with a{" "}
          <Span variant="mint">neurochemical signalling failure</Span>.
        </P>

        {/* Section 1 */}
        <H2 id="the-task-initiation-paradox">The Task Initiation Paradox</H2>
        <P>
          In a neurotypical brain, when a cue signals a reward (e.g. completing a task, receiving validation, feeling relief),
          dopamine neurons in the striatum fire <Span variant="bold">in anticipation</Span> of the outcome. This neurochemical surge provides the precise spark of activation energy required to move muscles and initiate cognitive work.
        </P>

        <JournalCallout variant="science" title="Anticipatory Dopamine Transfer">
          In healthy executive function, the dopamine peak shifts backward in time from the actual consumption of the reward to the <Span variant="bold">predictive cue</Span>.
          In ADHD, this anticipatory shift is delayed or absent. The brain does not experience the prospective reward until the finish line is in immediate proximity.
        </JournalCallout>

        <P>
          Without anticipatory dopamine, your brain treats opening a spreadsheet as an energetic black hole.
          The prefrontal cortex simply does not receive the signal to allocate working memory resources.
        </P>

        {/* Section 2 */}
        <H2 id="what-is-the-dopamine-transfer-deficit">What is the Dopamine Transfer Deficit?</H2>
        <P>
          First formulated by researchers Trippe & Wickens (2008), the <Span variant="mint">Dopamine Transfer Deficit (DTD)</Span> hypothesis posits that the cellular mechanism that reinforces early behavior strings is impaired in ADHD brains.
        </P>

        <JournalQuote author="Trippe & Wickens" source="Neuroscience & Biobehavioral Reviews">
          Without sustained tonic dopamine, the transition from internal intention to external motor execution incurs an exponential activation penalty.
        </JournalQuote>

        <P>
          Here is how this neurological reality presents in daily productivity:
        </P>

        {/* Nested Unordered List demonstration */}
        <JournalUL>
          <LI>
            <Span variant="bold">Reward Horizon Compression:</Span> If the positive reinforcement is more than 30 minutes away, the ADHD brain registers the probability of reward as near zero.
            {/* Nested List Level 1 */}
            <JournalUL nested>
              <LI>Long-term projects generate zero intrinsic dopamine until panic sets in.</LI>
              <LI>The brain defaults to micro-dopamine loops (doomscrolling, cleaning keyboards, tab hoarding).</LI>
              {/* Nested List Level 2 */}
              <JournalUL nested>
                <LI>
                  <Span variant="code">Dopamine seeking ≠ pleasure seeking</Span>: It is a desperate physiological attempt to achieve baseline alertness.
                </LI>
              </JournalUL>
            </JournalUL>
          </LI>
          <LI>
            <Span variant="bold">High Initiation Threshold:</Span> The physical energy required to switch tasks is 3x to 5x higher than in neurotypical peers.
          </LI>
          <LI>
            <Span variant="bold">Novelty Decay Penalty:</Span> A new system or planner works for 72 hours due to novel dopamine spikes, but once routine sets in, the friction becomes overwhelming.
          </LI>
        </JournalUL>

        {/* Section 3 */}
        <H2 id="the-failure-loop-of-traditional-planners">The Failure Loop of Traditional Planners</H2>
        <P>
          Almost all conventional planning software (Notion, Todoist, Asana, Google Calendar) is architected on three neurotypical assumptions:
        </P>

        {/* Nested Ordered List demonstration */}
        <JournalOL>
          <LI>
            <Span variant="bold">Assumption 1: Future time is real and linear.</Span>
            <JournalOL nested>
              <LI>Reality: For ADHD, time exists in only two zones: <Span variant="mint">NOW</Span> and <Span variant="muted">NOT NOW</Span>.</LI>
              <LI>Scheduled blocks for next Thursday feel fictional until Wednesday night.</LI>
            </JournalOL>
          </LI>
          <LI>
            <Span variant="bold">Assumption 2: Maintaining the system is energizing.</Span>
            <JournalOL nested>
              <LI>Reality: Tagging, categorizing, prioritizing (P1/P2/P3), and setting due dates requires executive function you don&apos;t have.</LI>
              <LI>The maintenance of the tool becomes an additional source of task paralysis.</LI>
            </JournalOL>
          </LI>
          <LI>
            <Span variant="bold">Assumption 3: Red badges and missed deadlines induce positive urgency.</Span>
            <JournalOL nested>
              <LI>Reality: Overdue counters induce acute cortisol spikes and shame spirals, causing the user to delete the app.</LI>
            </JournalOL>
          </LI>
        </JournalOL>

        {/* Section 4 */}
        <H2 id="how-loah-engineers-around-the-gap">How LOAH Engineers Around The Gap</H2>
        <P>
          Instead of attempting to &quot;cure&quot; dopamine mechanics or forcing you into rigid calendar grids,
          <Span variant="bold"> LOAH</Span> is engineered to compensate for the Dopamine Transfer Deficit externally.
        </P>

        <JournalCallout variant="takeaway" title="LOAH Zero-Activation Protocol">
          <JournalUL nested>
            <LI><Span variant="bold">Zero Categorization on Input:</Span> Dump thoughts in 1.2 seconds without filing them into folders or assigning tags.</LI>
            <LI><Span variant="bold">Instant Momentum Generator:</Span> Micro-actions broken down into sub-5-minute atomic steps that trigger immediate dopamine feedback.</LI>
            <LI><Span variant="bold">Anti-Shame State Architecture:</Span> No red counters. No overdue flags. If you step away for 3 weeks, LOAH resets cleanly without judgment.</LI>
          </JournalUL>
        </JournalCallout>

        <JournalDivider />

        {/* Summary Takeaways */}
        <JournalTakeaways
          points={[
            "Task initiation paralysis is a neurochemical timing breakdown, not a moral failure.",
            "ADHD brains lack anticipatory dopamine—reward signals only fire when the outcome is immediate.",
            "Traditional planners create high maintenance friction that accelerates abandonment by Day 3.",
            "LOAH operates on zero activation energy: instant capture, micro-steps, and anti-shame design.",
          ]}
        />

        <P className="mt-8 text-sm text-[#94A3B8]">
          Curious about our engineering architecture? Read our next journal:{" "}
          <JournalLink href="/journal/zero-activation-energy-architecture">
            Building LOAH: The Zero Activation Energy Architecture →
          </JournalLink>
        </P>
      </JournalLayout>
    </>
  );
}
