import { JournalPostMeta } from "@/types/journal";
import { FaqItem } from "./JournalFaq";

interface JournalJsonLdProps {
  post: JournalPostMeta;
  faqs?: Array<{ question: string; answer: string }>;
  url?: string;
}

export function JournalJsonLd({ post, faqs, url }: JournalJsonLdProps) {
  const postUrl = url || `https://www.loah.in/journal/${post.slug}`;
  const activeFaqs = faqs || post.faqs;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image ? `https://www.loah.in${post.image}` : "https://www.loah.in/og-journal.png",
    "datePublished": post.isoDate,
    "dateModified": post.isoDate,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": "LOAH",
      "url": "https://www.loah.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.loah.in/favicon.ico",
      },
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "about": {
      "@type": "Thing",
      "name": post.type,
    },
  };

  const schemas: any[] = [blogPostingSchema];

  if (activeFaqs && activeFaqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": activeFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": typeof faq.answer === "string" ? faq.answer : faq.question,
        },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
      }}
    />
  );
}
