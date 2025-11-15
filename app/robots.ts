import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // OpenAI
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        // ChatGPT browsing
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        // Common Crawl
        userAgent: "CCBot",
        allow: "/",
      },
      {
        // Anthropic / Claude
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}


