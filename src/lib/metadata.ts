import type { Metadata } from "next";
import { site } from "@/content/site";
import type { PageMeta } from "@/content/types";

/**
 * Spelled out with the base path: unlike the file convention, an explicit
 * image path is not prefixed for a project page on GitHub Pages.
 */
const SOCIAL_CARD = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/opengraph-image.png`;

/**
 * A page's <head>: its own title and description, carried into the social
 * card fields too. A child's `openGraph` replaces the layout's rather than
 * merging with it, and the social-card file convention only reaches the
 * layout, so every field the card needs, image included, is restated here.
 * `absolute` skips the layout's title template (the home page).
 */
export function pageMetadata(meta: PageMeta, options?: { absolute?: boolean; index?: boolean }): Metadata {
  return {
    title: options?.absolute ? { absolute: meta.title } : meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: site.name,
      type: "website",
      locale: "en_GB",
      images: [SOCIAL_CARD],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [SOCIAL_CARD] },
    ...(options?.index === false ? { robots: { index: false, follow: true } } : {}),
  };
}
