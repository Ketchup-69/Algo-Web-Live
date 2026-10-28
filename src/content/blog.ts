/**
 * /blog. Posts come from the CRM's blog when the site is built
 * (`src/lib/posts.ts`); this file holds the page's own words. The opening and
 * the line shown while there are no posts are the live /resources page's,
 * which this page replaces.
 * Source: docs/live-site-content.md, PAGE /resources.
 */

import type { ClosingCopy, HeroCopy, PageMeta, SectionCopy } from "./types";
import { routes } from "./site";

export const blogMeta: PageMeta = {
  title: "Enterprise AI Resources",
  description:
    "Explore Algomotive guidance for enterprise AI agents, governed workflows, security, implementation, products and measurable operational outcomes.",
};

export const blogHero: HeroCopy = {
  heading: "Practical guidance for intelligence that understands and acts.",
  lede: "Explore the principles, architecture, controls, delivery practices and operational pathways behind secure and accountable enterprise AI agents.",
  primary: { label: "Discuss Your AI Priority", href: routes.contact },
};

/** In place of the list until the first post is published. */
export const blogEmpty: SectionCopy = {
  heading: "Evidence, customer stories and downloadable materials will be published only after review and approval.",
  intro: "Public materials will appear here as they become approved and available.",
};

export const blogClosing: ClosingCopy = {
  heading: "Choose one qualified workflow. Engineer the intelligence around it.",
  primary: { label: "Discuss Your AI Priority", href: routes.contact },
};

/** Chrome on a post page. */
export const blogUi = {
  backLink: "All posts",
  readingTime: (minutes: number) => `${minutes} min read`,
  /** A post with no title in the CRM. */
  untitled: "Untitled post",
} as const;
