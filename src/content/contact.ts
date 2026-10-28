/**
 * /contact. Copy from the live site's /contact page. The live page's "Ask
 * Algo" chooser is the first question of the CRM form ("What do you need?"),
 * with the same four choices. No phone number (owner decision, 28 Oct 2026).
 * Source: docs/live-site-content.md, PAGE /contact.
 *
 * The form itself is the CRM's embedded form (`contactEmbed` below). The
 * two addresses beside it stay on the page as the fallback (§7).
 */

import type { Item, PageMeta, SectionCopy } from "./types";
import { site } from "./site";

export const contactMeta: PageMeta = {
  title: "Contact Algomotive",
  description:
    "Contact Algomotive about enterprise AI agents, governed workflows, intelligent products, implementation and customer support.",
};

/**
 * The embedded CRM form, exactly as the CRM's embed code gives it. Portal and
 * form IDs are public by design (CLAUDE.md §2). The form's fields, styling,
 * reCAPTCHA, thank-you message and notifications are set in the CRM, not here.
 */
export const contactEmbed = {
  scriptSrc: "https://js-eu1.hsforms.net/forms/embed/149413164.js",
  region: "eu1",
  portalId: "149413164",
  formId: "21d2fbac-14c3-47f7-a9f8-037ce191a309",
  /** Read by screen readers while the form loads. */
  loading: "Loading the contact form.",
  /**
   * Shown if the form cannot load: the script is blocked, or the network
   * fails. `{sales}` and `{helpdesk}` become the two addresses, as links.
   */
  failed: {
    title: "The form could not load.",
    body: "Email {sales} about a new opportunity, or {helpdesk} for help with an existing environment.",
  },
} as const;

export const contactPage = {
  heading: "Start with the workflow your business is ready to improve.",
  lede: "Choose what you need and tell us a little about it. Most requests take less than a minute.",
} as const;

export const brief: SectionCopy & { items: Item[] } = {
  heading: "A strong starting brief helps qualify the opportunity.",
  intro:
    "You do not need a complete technical specification. Begin with the process, challenge, ownership, systems, controls and outcome.",
  items: [
    {
      title: "Business priority",
      body: "Describe the operational challenge, affected teams, current process, volume, urgency and intended outcome.",
    },
    {
      title: "Workflow context",
      body: "Identify the documents, decisions, approvals, exceptions, handoffs, rules and people involved.",
    },
    {
      title: "Enterprise systems",
      body: "List the ERP, finance, procurement, CRM, document, payment, data and operational platforms involved.",
    },
    {
      title: "Information and access",
      body: "Outline available information, ownership, authorised access, data boundaries and security requirements.",
    },
    {
      title: "Human authority",
      body: "Identify who reviews exceptions, approves actions, owns outcomes and handles escalation.",
    },
    {
      title: "Success measures",
      body: "Consider cycle time, exception volume, throughput, control coverage, working capital, accuracy or capacity.",
    },
  ],
};

export const channels: SectionCopy & {
  items: { title: string; body: string; link: { label: string; href: string; external: boolean } }[];
} = {
  heading: "Sales, support and customer access remain clearly separated.",
  intro:
    "Contact sales for new opportunities, the helpdesk for existing customer support, or the Customer Portal for secure access.",
  items: [
    {
      title: "Sales enquiries",
      body: "New opportunities, products and resources.",
      link: { label: site.email.sales, href: `mailto:${site.email.sales}`, external: true },
    },
    {
      title: "Customer support",
      body: "Help with an existing Algomotive environment.",
      link: { label: site.email.helpdesk, href: `mailto:${site.email.helpdesk}`, external: true },
    },
    {
      title: "Customer Portal",
      body: "Secure access for existing Algomotive customers.",
      link: { label: "Open the Customer Portal", href: site.portal.href, external: true },
    },
  ],
};
