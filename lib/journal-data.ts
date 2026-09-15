import { JournalManifest, JournalPageChunk, JournalPostMeta } from "@/types/journal";
import manifestData from "@/data/manifest.json";
import page1Data from "@/data/page-1.json";
import page2Data from "@/data/page-2.json";

// Registry of pre-bundled page chunks
const pageChunks: Record<number, JournalPageChunk> = {
  1: page1Data as JournalPageChunk,
  2: page2Data as JournalPageChunk,
};

export type JournalSortOption =
  | "newest"
  | "oldest"
  | "shortest"
  | "longest"
  | "alphabetical";

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

  // Fallback: If page-1 has posts but manifest has 0
  if (allPosts.length === 0 && page1Data && (page1Data as JournalPageChunk).posts) {
    allPosts.push(...(page1Data as JournalPageChunk).posts);
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
 * Extract all unique authors across all posts with their occurrence counts and avatars
 */
export function getAllJournalAuthors(): { name: string; avatar: string; count: number }[] {
  const posts = getAllJournalPosts();
  const authorMap: Record<string, { name: string; avatar: string; count: number }> = {};

  posts.forEach((post) => {
    if (post.author && post.author.name) {
      const name = post.author.name;
      if (!authorMap[name]) {
        authorMap[name] = {
          name,
          avatar: post.author.avatar,
          count: 0,
        };
      }
      authorMap[name].count += 1;
    }
  });

  return Object.values(authorMap);
}

/**
 * Extract all unique tags across all posts with their occurrence counts
 */
export function getAllJournalTags(): { tag: string; count: number }[] {
  const posts = getAllJournalPosts();
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    }
  });

  return Object.entries(counts).map(([tag, count]) => ({ tag, count }));
}

/**
 * Comprehensive Flipkart-style filter & sorting engine
 */
export function filterAndSortPosts(
  posts: JournalPostMeta[],
  {
    query = "",
    categories = [],
    types = [],
    tags = [],
    authors = [],
    author = "",
    sortBy = "newest",
  }: {
    query?: string;
    categories?: string[];
    types?: string[];
    tags?: string[];
    authors?: string[];
    author?: string;
    sortBy?: JournalSortOption;
  }
): JournalPostMeta[] {
  const cleanQuery = query.trim().toLowerCase();

  // Normalize author list
  const activeAuthors = [...authors];
  if (author && author !== "All" && !activeAuthors.includes(author)) {
    activeAuthors.push(author);
  }

  const filtered = posts.filter((post) => {
    // 1. Authors Filter (multi-select)
    if (activeAuthors.length > 0 && !activeAuthors.includes("All")) {
      const authorMatch = activeAuthors.some(
        (a) =>
          post.author.name.toLowerCase() === a.toLowerCase() ||
          post.author.avatar.toLowerCase().includes(a.toLowerCase())
      );
      if (!authorMatch) return false;
    }

    // 2. Category Filter (multi-select)
    if (categories.length > 0 && !categories.includes("All")) {
      const matchCat = categories.some(
        (cat) => post.category.toLowerCase() === cat.toLowerCase()
      );
      if (!matchCat) return false;
    }

    // 3. Type Filter (multi-select)
    if (types.length > 0 && !types.includes("All Types")) {
      const matchType = types.some(
        (t) => post.type.toLowerCase() === t.toLowerCase()
      );
      if (!matchType) return false;
    }

    // 4. Tags Filter (multi-select)
    if (tags.length > 0) {
      const hasMatchingTag = tags.some((selectedTag) =>
        post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
      if (!hasMatchingTag) return false;
    }

    // 5. Full text search query
    if (cleanQuery) {
      const matchTitle = post.title.toLowerCase().includes(cleanQuery);
      const matchExcerpt = post.excerpt.toLowerCase().includes(cleanQuery);
      const matchCategory = post.category.toLowerCase().includes(cleanQuery);
      const matchType = post.type.toLowerCase().includes(cleanQuery);
      const matchAuthor = post.author.name.toLowerCase().includes(cleanQuery);
      const matchTags = post.tags.some((tag) =>
        tag.toLowerCase().includes(cleanQuery)
      );

      if (
        !matchTitle &&
        !matchExcerpt &&
        !matchCategory &&
        !matchType &&
        !matchAuthor &&
        !matchTags
      ) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === "newest") {
      const dateA = new Date(a.isoDate || a.publishedAt).getTime();
      const dateB = new Date(b.isoDate || b.publishedAt).getTime();
      return dateB - dateA;
    }
    if (sortBy === "oldest") {
      const dateA = new Date(a.isoDate || a.publishedAt).getTime();
      const dateB = new Date(b.isoDate || b.publishedAt).getTime();
      return dateA - dateB;
    }
    if (sortBy === "shortest") {
      const aTime = parseInt(a.readTime, 10) || 0;
      const bTime = parseInt(b.readTime, 10) || 0;
      return aTime - bTime;
    }
    if (sortBy === "longest") {
      const aTime = parseInt(a.readTime, 10) || 0;
      const bTime = parseInt(b.readTime, 10) || 0;
      return bTime - aTime;
    }
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return filtered;
}

/**
 * Backward compatibility wrapper
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
  return filterAndSortPosts(posts, {
    query,
    categories: category !== "All" ? [category] : [],
    types: type !== "All Types" ? [type] : [],
  });
}
