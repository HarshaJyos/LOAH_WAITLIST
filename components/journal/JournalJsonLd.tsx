import { JournalPostMeta } from "@/types/journal";

interface JournalJsonLdProps {
  post: JournalPostMeta;
  url?: string;
}

export function JournalJsonLd({ post, url }: JournalJsonLdProps) {
  const postUrl = url || `https://loah.app/journal/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image ? `https://loah.app${post.image}` : "https://loah.app/og-journal.png",
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
      "url": "https://loah.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://loah.app/logo.png",
      },
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "about": {
      "@type": "Thing",
      "name": post.type,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
