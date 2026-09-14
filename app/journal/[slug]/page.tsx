import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllJournalPosts, getPostBySlug } from "@/lib/journal-data";
import { JournalLayout } from "@/components/journal/JournalLayout";
import { JournalJsonLd } from "@/components/journal/JournalJsonLd";
import {
  P,
  Span,
  H2,
  JournalUL,
  LI,
  JournalCallout,
  JournalTakeaways,
  JournalDivider,
} from "@/components/journal/JournalComponents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllJournalPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Journal Not Found — LOAH" };
  }

  return {
    title: `${post.title} — LOAH Journals`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
    },
  };
}

export default async function GenericJournalSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JournalJsonLd post={post} />

      <JournalLayout post={post}>
        <P lead>{post.excerpt}</P>

        <H2 id="executive-summary">Executive Summary</H2>
        <P>
          In traditional productivity workflows, people with ADHD face invisible friction hurdles.
          This research brief explores how <Span variant="mint">{post.title}</Span> directly impacts task initiation and cognitive stamina.
        </P>

        <JournalCallout variant="insight" title={`${post.category} Focus`}>
          This article is part of our <Span variant="bold">{post.type}</Span> series documenting the science of neurodivergent productivity.
        </JournalCallout>

        <H2 id="key-mechanisms">Key Mechanisms & Lived Realities</H2>
        <JournalUL>
          <LI>
            <Span variant="bold">Cognitive Load Regulation:</Span> Reducing active decision nodes to prevent prefrontal cortex exhaustion.
            <JournalUL nested>
              <LI>Direct execution paths with zero multi-step setup.</LI>
              <LI>Sensory-friendly dark aesthetics engineered for low stimulation.</LI>
            </JournalUL>
          </LI>
          <LI>
            <Span variant="bold">External Support Systems:</Span> Augmenting volatile working memory with instant capture streams.
          </LI>
        </JournalUL>

        <JournalDivider />

        <JournalTakeaways
          points={[
            `${post.title} addresses the fundamental bottleneck in ADHD task initiation.`,
            "Designed and documented live during LOAH's open development cycle.",
            "Join early finders to test these features directly in private beta builds.",
          ]}
        />
      </JournalLayout>
    </>
  );
}
