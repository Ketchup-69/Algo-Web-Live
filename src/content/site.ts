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
  blog: "/blog/",
  algopo: "/products/algopo/",
  algocash: "/products/algocash/",
  algopay: "/products/algopay/",
  algocapital: "/products/algocapital-ai/",
  products: "/#products",
  /** Custom AI Solutions has no page of its own: the conversation starts on /contact. */
  custom: "/contact/",
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
  /** The name in the header lockup (owner decision, 5 Nov 2026). */
  logoName: string;
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
  /**
   * "Book a demo": the header, every hero and every closing band. Opens a
   * dialog with the CRM's meetings scheduler (owner decision, 5 Nov 2026).
   */
  bookDemo: {
    label: string;
    title: string;
    intro: string;
    close: string;
    loading: string;
    /** Shown in place of the scheduler when no address is set or it cannot load. */
    fallback: { lead: string; after: string };
    /** Shown before the scheduler loads when `askFirst` is on. */
    consent: { body: string; accept: string; privacyLabel: string };
    /** The scheduler's address, from NEXT_PUBLIC_MEETINGS_URL at build time. Empty: the fallback shows. */
    url: string;
    /** The CRM's embed script, exactly as its embed code gives it. Loaded the first time the dialog opens. */
    scriptSrc: string;
    /**
     * Ask before loading the scheduler. Off while its cookies are expected to
     * be strictly necessary; switch on if the check on the live demo finds
     * any that are not (CLAUDE.md §7, privacy notice "Cookies").
     */
    askFirst: boolean;
  };
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
  logoName: "Algomotive AI",
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

  bookDemo: {
    label: "Book a demo",
    title: "Book a demo",
    intro: "Pick a time that suits you. The calendar shows the slots our team has open, in your own time zone.",
    close: "Close",
    loading: "Loading the calendar",
    fallback: {
      lead: "The calendar is not available here yet. Email",
      after: "with a few times that suit you, and we will send an invitation.",
    },
    consent: {
      body: "The calendar is provided by our CRM and sets its own cookies when it loads.",
      accept: "Show the calendar",
      privacyLabel: "Privacy notice",
    },
    // The sales scheduling page (owner, 5 Nov 2026). NEXT_PUBLIC_MEETINGS_URL, if set at build time, overrides it.
    url: /^https:\/\//.test(process.env.NEXT_PUBLIC_MEETINGS_URL ?? "")
      ? (process.env.NEXT_PUBLIC_MEETINGS_URL as string)
      : "https://meetings-eu1.hubspot.com/om-kashyap",
    scriptSrc: "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js",
    askFirst: false,
  },

  nav: [
    { label: "Platform", href: routes.platform },
    {
      label: "AI Agents",
      items: [
        { label: "AlgoPay", href: routes.algopay },
        { label: "AlgoPO", href: routes.algopo },
        { label: "AlgoCash", href: routes.algocash },
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
        { label: "How agents work", href: routes.agents },
        { label: "Security and trust", href: routes.security },
        { label: "About", href: routes.about },
        { label: "Blog", href: routes.blog },
        { label: "Contact", href: routes.contact },
      ],
    },
    {
      heading: "AI Agents",
      links: [
        { label: "AlgoPay", href: routes.algopay },
        { label: "AlgoPO", href: routes.algopo },
        { label: "AlgoCash", href: routes.algocash },
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
