/**
 * The pages that are not part of the story: legal, not found, and the stubs
 * left at the live site's old addresses.
 */

import type { Cta, PageMeta } from "./types";
import { routes } from "./site";

export const legalPages = {
  privacy: {
    meta: { title: "Privacy", description: "How Algomotive handles personal information." } as PageMeta,
    title: "Privacy",
    // PLACEHOLDER: the reviewed privacy policy (draft in Phase 4, the CEO approves before launch)
    note: "This page is a placeholder. The privacy policy is pending review and will be published before launch.",
  },
  terms: {
    meta: { title: "Terms", description: "The terms of use for this website." } as PageMeta,
    title: "Terms",
    // PLACEHOLDER: the reviewed terms of use (draft in Phase 4, the CEO approves before launch)
    note: "This page is a placeholder. The terms of use are pending review and will be published before launch.",
  },
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
 * this site replaces it. `to` is a route on this site.
 */
export const movedPages = [
  { slug: "ai-agents", name: "AI agents", to: routes.agents },
  { slug: "products", name: "our products", to: routes.products },
  { slug: "solutions", name: "industry solutions", to: routes.industries },
  { slug: "resources", name: "resources", to: routes.contact },
] as const;

export const moved = {
  title: "This page has moved.",
  /** `{name}` is the page's name from `movedPages`. */
  link: "Go to {name}",
} as const;
