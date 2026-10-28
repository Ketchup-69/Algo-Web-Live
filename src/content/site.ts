/**
 * Site-wide constants. Every user-facing string on the site comes from
 * `src/content/*` — components hold zero hardcoded copy, so the copy can be
 * edited without touching JSX (CLAUDE.md §6).
 *
 * Placeholders use the greppable `PLACEHOLDER:` convention. Run
 * `grep -rn "PLACEHOLDER" src content` before launch to find every one.
 */

import type { Cta } from "./types";

/** Every route on the site, in one place, so a renamed page is one edit. */
export const routes = {
  home: "/",
  platform: "/platform/",
  agents: "/platform/#agents",
  security: "/security/",
  about: "/about/",
  contact: "/contact/",
  privacy: "/privacy/",
  terms: "/terms/",
  algopo: "/products/algopo/",
  algocash: "/products/algocash/",
  algopay: "/products/algopay/",
  algocapital: "/products/algocapital-ai/",
  products: "/#products",
  custom: "/#custom",
  agentLaunch: "/#agent-launch",
  industries: "/#industries",
} as const;

export type NavLink = Cta;
export type NavGroup = { label: string; items: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export const isGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

export type SiteConfig = {
  /** The only brand name permitted anywhere on this site (§2). */
  name: string;
  /** The second line of the logo lockup, from the logo pack. */
  logoSubline: string;
  /** The default meta description, and the footer's line under the logo. */
  description: string;
  /** Canonical origin. Used for metadata once the domain is decided. */
  url: string;
  /**
   * The two addresses on the site, each in one place (§7): sales for new
   * conversations, the helpdesk for existing customers. No phone number
   * (owner decision, 28 Oct 2026).
   */
  email: { sales: string; helpdesk: string };
  /** Sign-in for existing customers. A separate product, linked, not embedded. */
  portal: Cta;
  /** The one action in the header and the mobile menu. */
  cta: Cta;
  nav: NavEntry[];
  footer: { heading: string; links: NavLink[] }[];
  legalNav: NavLink[];
  social: NavLink[];
  legalLine: string;
  /**
   * Chrome strings: labels for controls that are not page copy but are still
   * user-facing. Kept here so a component never holds a string (§6).
   */
  ui: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    menuLabel: string;
    primaryNavLabel: string;
    themeToggle: { neutral: string; toLight: string; toDark: string };
    footerContact: string;
    footerElsewhere: string;
    salesLabel: string;
    helpdeskLabel: string;
    backToTop: string;
    /** Under every product illustration, so it is never read as real (§2). */
    sampleNote: string;
  };
};

export const site: SiteConfig = {
  name: "Algomotive",
  logoSubline: "AI Platform",
  description:
    "Build intelligent agents, orchestrate complex workflows, and connect data, people and enterprise systems on one secure AI platform.",

  // PLACEHOLDER: the demo address on GitHub Pages. Becomes https://www.algomotiveai.com at handover.
  url: "https://ketchup-69.github.io/Algo-Web-Live",

  email: {
    sales: "sales@algomotiveai.com",
    helpdesk: "helpdesk@algomotiveai.com",
  },

  portal: { label: "Customer Portal", href: "https://portal.algomotiveai.com" },

  cta: { label: "Talk to Algomotive", href: routes.contact },

  nav: [
    { label: "Platform", href: routes.platform },
    {
      label: "Products",
      items: [
        { label: "AlgoPO", href: routes.algopo },
        { label: "AlgoCash", href: routes.algocash },
        { label: "AlgoPay", href: routes.algopay },
        { label: "AlgoCapital AI", href: routes.algocapital },
        { label: "Custom AI Solutions", href: routes.custom },
      ],
    },
    { label: "Security", href: routes.security },
    { label: "About", href: routes.about },
  ],

  footer: [
    {
      heading: "Company",
      links: [
        { label: "Platform", href: routes.platform },
        { label: "AI agents", href: routes.agents },
        { label: "Security and trust", href: routes.security },
        { label: "About", href: routes.about },
        { label: "Contact", href: routes.contact },
      ],
    },
    {
      heading: "Products",
      links: [
        { label: "AlgoPO", href: routes.algopo },
        { label: "AlgoCash", href: routes.algocash },
        { label: "AlgoPay", href: routes.algopay },
        { label: "AlgoCapital AI", href: routes.algocapital },
        { label: "Custom AI Solutions", href: routes.custom },
      ],
    },
  ],

  legalNav: [
    { label: "Privacy", href: routes.privacy },
    { label: "Terms", href: routes.terms },
  ],

  // PLACEHOLDER: add each public profile (LinkedIn first) once the owner confirms it.
  // A link only renders once its href starts with http.
  social: [{ label: "LinkedIn", href: "#" }],

  // PLACEHOLDER: confirm the registered entity name and year with the owner
  legalLine: "© 2026 Algomotive. All rights reserved.",

  ui: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuLabel: "Menu",
    primaryNavLabel: "Primary",
    themeToggle: {
      neutral: "Switch colour theme",
      toLight: "Switch to light theme",
      toDark: "Switch to dark theme",
    },
    footerContact: "Contact",
    footerElsewhere: "Elsewhere",
    salesLabel: "Sales",
    helpdeskLabel: "Customer support",
    backToTop: "Back to top",
    sampleNote: "Illustration with sample data.",
  },
};
