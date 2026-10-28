/**
 * /contact. Copy from the live site's /contact page. The live page's "Ask
 * Algo" chooser becomes one question at the top of an ordinary form, with the
 * same four choices. No phone number (owner decision, 28 Oct 2026).
 * Source: docs/live-site-content.md, PAGE /contact.
 *
 * PLACEHOLDER: the CRM form embed replaces this form in Phase 4 (CLAUDE.md §7).
 * Until then the form composes an email; it stays as the fallback after.
 */

import type { Item, PageMeta, SectionCopy } from "./types";
import { site } from "./site";

export const contactMeta: PageMeta = {
  title: "Contact Algomotive",
  description:
    "Contact Algomotive about enterprise AI agents, governed workflows, intelligent products, implementation and customer support.",
};

export type RequestType = "opportunity" | "product" | "resource" | "support";

export type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  required: boolean;
  autoComplete?: string;
};

export const contactPage = {
  heading: "Start with the workflow your business is ready to improve.",
  lede: "Choose what you need and tell us a little about it. Most requests take less than a minute.",

  request: {
    legend: "What do you need?",
    options: [
      {
        value: "opportunity",
        label: "Discuss an AI opportunity",
        hint: "Describe a workflow, operational challenge or business outcome.",
      },
      {
        value: "product",
        label: "Explore a product",
        hint: "Ask about an Algomotive product, request information or arrange a demo.",
      },
      {
        value: "resource",
        label: "Request a resource",
        hint: "Request the company brochure, a technical brochure or the high-quality film.",
      },
      {
        value: "support",
        label: "Customer support",
        hint: "Get help with an existing Algomotive environment. This goes to the helpdesk.",
      },
    ] as { value: RequestType; label: string; hint: string }[],
  },

  fields: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
    { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
    { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
    { name: "role", label: "Role", type: "text", required: false, autoComplete: "organization-title" },
    { name: "message", label: "How can we help?", type: "textarea", required: true },
  ] as Field[],
  optionalMarker: "(optional)",

  submitLabel: "Send",
  /** Shown beside the button. The form opens an email until the CRM form is live (§7). */
  submitNote: "Opens in your email app.",
  /** `{request}`, `{name}` and `{company}` are filled in from the form. */
  subjectTemplate: "{request}: {name}, {company}",
  composer: {
    title: "Your email app should have opened.",
    body: "If nothing happened, copy the address or the message and send it from wherever you read email.",
    addressLabel: "Address",
    copyAddress: "Copy address",
    copyMessage: "Copy message",
    copied: "Copied",
    /** Shown when the clipboard is unavailable; the text is selected instead. */
    copyFailed: "Selected. Copy it with your keyboard.",
    edit: "Edit the message",
  },
  errors: {
    required: "This field is required.",
    email: "Enter a valid work email address.",
    request: "Choose what you need.",
  },
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
