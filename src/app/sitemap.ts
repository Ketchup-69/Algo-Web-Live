import type { MetadataRoute } from "next";
import { routes, site } from "@/content/site";
import { productList } from "@/content/products";

/** Static export: emitted once at build time as /sitemap.xml. */
export const dynamic = "force-static";

/**
 * Every page in the approved page map. The legal placeholders and the stubs
 * at the live site's old addresses are noindex, so they are left out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages: { path: string; priority: number }[] = [
    { path: routes.home, priority: 1 },
    { path: routes.platform, priority: 0.9 },
    ...productList.map((product) => ({ path: `/products/${product.slug}/`, priority: 0.9 })),
    { path: routes.security, priority: 0.8 },
    { path: routes.about, priority: 0.7 },
    { path: routes.contact, priority: 0.7 },
  ];
  return pages.map((page) => ({
    url: `${base}${page.path}`,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));
}
