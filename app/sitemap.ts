import { MetadataRoute } from "next";
import { getAllJournalPosts } from "@/lib/journal-data";
import { getAllTeamMembers } from "@/lib/team-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://loah.app";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic journal article routes
  const posts = getAllJournalPosts();
  const journalRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    let lastMod = new Date();
    if (post.isoDate) {
      lastMod = new Date(post.isoDate);
    }
    return {
      url: `${baseUrl}/journal/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    };
  });

  // Dynamic team member routes
  const teamMembers = getAllTeamMembers();
  const teamRoutes: MetadataRoute.Sitemap = teamMembers.map((member) => ({
    url: `${baseUrl}/team/${member.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...journalRoutes, ...teamRoutes];
}
