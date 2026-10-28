import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Static export: emitted once at build time as /robots.txt. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    // DEMO BUILD (28 Oct 2026): block all crawlers on the GitHub Pages demo.
    // Change to allow: "/" only when the site moves to the real domain.
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
