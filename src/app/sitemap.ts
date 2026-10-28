import type { MetadataRoute } from "next";
import { routes, site } from "@/content/site";
import { productList } from "@/content/products";
import { privacyNotice } from "@/content/privacy";
import { termsOfUse } from "@/content/terms";
import { getAllPosts } from "@/lib/posts";

/** Static export: emitted once at build time as /sitemap.xml. */
export const dynamic = "force-static";

/**
 * Every page in the approved page map. A page that is noindex is left out:
 * the legal pages while they are drafts, the blog until it has a post, and
 * the stubs at the live site's old addresses.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const posts = await getAllPosts();
  const pages: { path: string; priority: number; modified?: string }[] = [
    { path: routes.home, priority: 1 },
    { path: routes.platform, priority: 0.9 },
    ...productList.map((product) => ({ path: `/products/${product.slug}/`, priority: 0.9 })),
    { path: routes.security, priority: 0.8 },
    { path: routes.about, priority: 0.7 },
    { path: routes.contact, priority: 0.7 },
    ...(posts.length > 0 ? [{ path: routes.blog, priority: 0.6, modified: posts[0].date }] : []),
    ...posts.map((post) => ({ path: `${routes.blog}${post.slug}/`, priority: 0.5, modified: post.date })),
    ...(privacyNotice.draft ? [] : [{ path: routes.privacy, priority: 0.2 }]),
    ...(termsOfUse.draft ? [] : [{ path: routes.terms, priority: 0.2 }]),
  ];
  return pages.map((page) => ({
    url: `${base}${page.path}`,
    ...(page.modified ? { lastModified: page.modified } : {}),
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));
}
