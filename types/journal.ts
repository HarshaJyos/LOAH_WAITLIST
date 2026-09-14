export interface JournalAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  twitter?: string;
}

export interface JournalPostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  type: string; // e.g. "Alpha Beta Release", "Build Log 01", "Neuroscience", "Deep Dive"
  author: JournalAuthor;
  publishedAt: string; // e.g. "September 14, 2026"
  isoDate: string; // e.g. "2026-09-14" for JSON-LD
  readTime: string; // e.g. "4 min read"
  tags: string[];
  featured?: boolean;
  image?: string;
  faqs?: Array<{ question: string; answer: string }>;
  relatedSlugs?: string[];
}

export interface JournalManifest {
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  categories: string[];
  types: string[];
}

export interface JournalPageChunk {
  page: number;
  totalPages: number;
  totalPosts: number;
  posts: JournalPostMeta[];
}
