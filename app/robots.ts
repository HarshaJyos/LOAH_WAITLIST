import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.loah.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Google Crawlers (Search, News, Images, Gemini AI)
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-News",
          "Googlebot-Video",
          "Mediapartners-Google",
          "AdsBot-Google",
          "Google-Extended",
          "GoogleOther",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
      // Microsoft Bing & Yahoo Crawlers
      {
        userAgent: [
          "Bingbot",
          "msnbot",
          "BingPreview",
          "Slurp",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
      // All AI Crawlers, LLMs & Answer Engines (OpenAI, Anthropic, Perplexity, Apple, Meta, ByteDance, Cohere, etc.)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Applebot",
          "Applebot-Extended",
          "cohere-ai",
          "Bytespider",
          "CCBot",
          "Diffbot",
          "FacebookBot",
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
          "Amazonbot",
          "YouBot",
          "omgili",
          "omgilibot",
          "DuckAssistBot",
          "Scrapy",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
