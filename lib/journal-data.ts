import { JournalManifest, JournalPageChunk, JournalPostMeta } from "@/types/journal";
import manifestData from "@/data/manifest.json";
import page1Data from "@/data/page-1.json";
import page2Data from "@/data/page-2.json";

// Registry of pre-bundled page chunks
const pageChunks: Record<number, JournalPageChunk> = {
  1: page1Data as JournalPageChunk,
  2: page2Data as JournalPageChunk,
};

/**
 * Returns the manifest metadata (total pages, categories, types)
 */
export function getJournalManifest(): JournalManifest {
  return manifestData as JournalManifest;
}

/**
 * Loads a single page chunk (fast, small payload for pagination)
 */
export function getJournalPage(pageNum: number): JournalPageChunk {
  if (pageChunks[pageNum]) {
    return pageChunks[pageNum];
  }
  return pageChunks[1];
}

/**
 * Loads and concatenates all page chunks into a unified dataset for global search/filtering
 */
export function getAllJournalPosts(): JournalPostMeta[] {
  const allPosts: JournalPostMeta[] = [];
  const manifest = getJournalManifest();

  for (let p = 1; p <= manifest.totalPages; p++) {
    const chunk = pageChunks[p];
    if (chunk && chunk.posts) {
      allPosts.push(...chunk.posts);
    }
  }

  return allPosts;
}

/**
 * Finds a specific post by its slug across all paginated files
 */
export function getPostBySlug(slug: string): JournalPostMeta | undefined {
  const allPosts = getAllJournalPosts();
  return allPosts.find((post) => post.slug === slug);
}

/**
 * Filters and searches posts across all fields
 */
export function filterPosts(
  posts: JournalPostMeta[],
  {
    query = "",
    category = "All",
    type = "All Types",
  }: {
    query?: string;
    category?: string;
    type?: string;
  }
): JournalPostMeta[] {
  const cleanQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    // 1. Category Filter
    if (category !== "All" && post.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // 2. Type Filter
    if (type !== "All Types" && post.type.toLowerCase() !== type.toLowerCase()) {
      return false;
    }

    // 3. Search Query
    if (cleanQuery) {
      const matchTitle = post.title.toLowerCase().includes(cleanQuery);
      const matchExcerpt = post.excerpt.toLowerCase().includes(cleanQuery);
      const matchCategory = post.category.toLowerCase().includes(cleanQuery);
      const matchType = post.type.toLowerCase().includes(cleanQuery);
      const matchAuthor = post.author.name.toLowerCase().includes(cleanQuery);
      const matchTags = post.tags.some((tag) => tag.toLowerCase().includes(cleanQuery));

      if (!matchTitle && !matchExcerpt && !matchCategory && !matchType && !matchAuthor && !matchTags) {
        return false;
      }
    }

    return true;
  });
}
