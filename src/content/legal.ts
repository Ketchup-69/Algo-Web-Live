/**
 * The pages that are not part of the story: the words the legal pages share,
 * not found, and the stubs left at the live site's old addresses. The privacy
 * notice and the terms themselves are in `privacy.ts` and `terms.ts`.
 */

import type { Cta } from "./types";
import { routes } from "./site";

/** Labels the legal pages share. */
export const legalUi = {
  /** On each note that lists what is still open in a draft section. */
  toConfirm: "To be confirmed",
} as const;

export const notFound = {
  title: "That page is not here.",
  body: "The address may have changed, or it never existed. Start from the home page, or tell us what you were looking for.",
  cta: { label: "Back to the home page", href: routes.home } as Cta,
} as const;

/**
 * Pages the live site has that this one folds into others (approved page map,
 * 28 Oct 2026). Each old address gets a small page that sends the visitor on,
 * so links and search results pointing at the live site keep working once
 * this site replaces it. `to` is a route on this site. The live /resources
 * page goes to the blog, which carries its copy.
 */
export const movedPages = [
  { slug: "ai-agents", name: "AI agents", to: routes.agents },
  { slug: "products", name: "our products", to: routes.products },
  { slug: "solutions", name: "industry solutions", to: routes.industries },
  { slug: "resources", name: "resources", to: routes.blog },
] as const;

export const moved = {
  title: "This page has moved.",
  /** `{name}` is the page's name from `movedPages`. */
  link: "Go to {name}",
} as const;
