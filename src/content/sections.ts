/**
 * All page copy, as typed objects. Components import from here and contain no
 * hardcoded strings (CLAUDE.md §6) — the owner edits this file weekly without
 * touching JSX.
 *
 * Anything still filler carries `placeholder: true` and a `PLACEHOLDER:`
 * comment naming what has to happen before launch.
 */

/* ------------------------------------------------------------------ hero -- */

export const hero = {
  id: "hero",
  h1: "AI agents that work inside the systems your finance team already uses.",
  sub: "Algomotive deploys agents across payables, receivables, procurement and cash. They read from your ERP, prepare the work, and wait for a person to approve it.",
  primaryCta: { label: "Talk to us", href: "/#contact" },
  secondaryCta: { label: "See how it works", href: "/#how-it-works" },
  supporting: "Agents connect read-only, and a person approves every action.",
  /** Accessible description of the hero diagram, for screen readers. */
  visualAlt:
    "Diagram of the agent pipeline: purchase order, goods received note and invoice records converge on a matching step, exceptions branch off for review, and approved items pass a human approval gate before being recorded.",
  /**
   * Labels drawn inside the hero diagram. They are real product vocabulary,
   * not decoration, which is why they live here with the rest of the copy.
   */
  visual: {
    title: "Three-way match",
    status: { pending: "Awaiting approval", approved: "Approved" },
    records: ["Purchase order", "Goods received", "Invoice"],
    match: "Match",
    exception: "Exception",
    gate: "Approval",
    ledger: "Ledger",
  },
} as const;

/* ------------------------------------------------------------- logo strip -- */

export type LogoSlot = {
  /** Accessible name of the organisation. Empty while the slot is a placeholder. */
  name: string;
  /** Path under /public, e.g. "/logos/example.svg". Empty while a placeholder. */
  src: string;
};

/**
 * PLACEHOLDER: replace when client logos are approved.
 *
 * CLAUDE.md §2 forbids client names and logos, including in placeholders, so
 * every slot below is deliberately empty and the strip renders neutral tiles
 * with a visible note. To populate: fill `name` and `src` on each slot, then
 * set `placeholder: false`. To ship without the strip: `enabled: false`.
 *
 * Edit: src/content/sections.ts → logos
 */
export const logos = {
  id: "logos",
  // Off until real, approved logos exist: an empty strip under the hero costs
  // more credibility than no strip.
  enabled: false,
  placeholder: true,
  placeholderNote: "Client logos pending approval",
  slotLabel: "Logo",
  slots: [
    { name: "", src: "" },
    { name: "", src: "" },
    { name: "", src: "" },
    { name: "", src: "" },
    { name: "", src: "" },
    { name: "", src: "" },
  ] as LogoSlot[],
} as const;

/* --------------------------------------------------------------- problem -- */

export type StatSlot = {
  /** The figure itself. Filler until the owner supplies a measured number. */
  value: string;
  label: string;
};

export const problem = {
  id: "problem",
  h2: "Most of a finance team's week is matching, chasing, and rebuilding the same report.",
  body: "Your team matches purchase orders to goods received to invoices, checks supplier statements against the ledger, and chases customers on the payment dates they promised. The work is high volume and rules based, and it does not forgive a missed line. It is the work people do worst and burn out on first.",
  followOn:
    "In a group with several entities, the same work repeats for each entity, each system and each outlet. Most teams can only answer that by hiring.",

  /**
   * Three figures. None is a measured result: each restates something the
   * product does by construction, as described elsewhere on this page — the
   * three-way match, the thirty-day collections forecast, the audit trail.
   * That is what keeps them inside CLAUDE.md §2 (no metrics presented as
   * real) while still being numbers.
   *
   * To swap in measured figures once the owner has some to stand behind:
   * edit `value` and `label` below. Any value containing a number counts up
   * as it enters the viewport.
   *
   * Edit: src/content/sections.ts → problem.stats.items[n].value / .label
   */
  stats: {
    // Off until the owner has measured figures to stand behind. Set to true
    // and edit `items` below; nothing else changes.
    enabled: false,
    placeholder: false,
    items: [
      {
        value: "3",
        label: "documents an agent matches line by line on every purchase: order, receipt, invoice",
      },
      {
        value: "30",
        label: "days ahead an agent forecasts collections, with a seven-day view alongside",
      },
      {
        value: "100%",
        label: "of agent actions logged with their source, decision and approver",
      },
    ] as StatSlot[],
    /** Shown only while `placeholder` is true. */
    note: "Example slots. Figures pending.",
  },
} as const;

/* ---------------------------------------------------------------- agents -- */

export type Agent = {
  name: string;
  /** Where this agent sits in the money cycle — used as the stage label. */
  stage: string;
  description: string;
};

export const agents = {
  id: "agents",
  /** `h2Lead` is the smaller first line; `h2` is the large gradient line. */
  h2Lead: "Four agents,",
  h2: "deployed on your stack.",
  intro:
    "Each agent owns one process from start to finish and reports what it did. We deploy it in your environment and configure it against your data.",
  items: [
    {
      name: "Purchase Order Agent",
      stage: "Commit",
      description:
        "Matches purchase order, goods received note and invoice line by line, flags what does not reconcile, and routes each exception to the person who can clear it.",
    },
    {
      name: "Accounts Payable Agent",
      stage: "Pay",
      description:
        "Reconciles supplier statements against your ledger, finds missing and duplicated invoices, and drafts the payment run for approval.",
    },
    {
      name: "Receivables Agent",
      stage: "Collect",
      description:
        "Orders the collection queue by how likely each invoice is to be paid, and drafts the follow-up for each one.",
    },
    {
      name: "Cash and DSO Agent",
      stage: "Measure",
      description:
        "Tracks days sales outstanding as it moves, scores customer risk, and forecasts collections seven and thirty days out.",
    },
  ] as Agent[],
  closing:
    "Deployment takes weeks. Each agent goes live on one defined process, and we agree the baseline with you before it starts.",
  /**
   * The two product wells under the four agents, left then right. Wording is
   * the brand file's (second page), with the product name taken out (§2).
   */
  wells: [
    {
      title: "Every line, matched three ways.",
      body: "The agent compares the purchase order, the goods receipt and the invoice line by line. If the three do not agree, it flags the line for a person.",
    },
    {
      title: "Save what would have gone out the door.",
      body: "The agent checks each invoice against what you have paid and what you agreed to pay. It holds anything that does not match from the payment run.",
    },
  ],
} as const;

/* --------------------------------------------------------- how it works -- */

export type Step = {
  title: string;
  description: string;
};

export const howItWorks = {
  id: "how-it-works",
  h2Lead: "Agents prepare the work, a person approves it,",
  h2: "and your system records it.",
  /**
   * This is a genuine sequence, which is the one place CLAUDE.md §4 permits
   * numbered markers. Do not copy this pattern to any other section.
   */
  steps: [
    {
      title: "Connect, read-only.",
      description:
        "Agents read from the ERP and PMS you run today. You change no schema and migrate no data. You grant write access later, one process at a time, after you have seen the controls work.",
    },
    {
      title: "Agents do the work.",
      description:
        "They collect the documents, reconcile them and draft the action. They show their working, including what they could not resolve and why.",
    },
    {
      title: "A person approves.",
      description:
        "An agent posts to a system of record only after a person decides. Algomotive logs each step, its source and the approval.",
    },
  ] as Step[],
  /**
   * Labels drawn inside the process diagram that sits beside the steps. One
   * scene, three states: the reader's position in the steps is the position
   * in the process.
   */
  scene: {
    alt: "Diagram of the process: an agent reads from the ERP, property management system and bank feed; prepares matched items, exceptions and drafts; a controller approves; only then is anything posted to the system of record and logged.",
    sources: ["ERP", "PMS", "Bank feed"],
    agent: "Agent",
    access: { read: "Read-only", write: "Write, per process" },
    prepared: ["Matched", "Exception", "Draft"],
    approver: "Controller",
    approved: "Approved",
    record: "System of record",
    audit: "Logged: source, decision, approver, time",
  },
} as const;

/* ------------------------------------------------------- beyond finance -- */

export type Category = {
  label: string;
  description: string;
};

export const beyondFinance = {
  id: "beyond-finance",
  // Off the home page: it is a second pitch, and the page reads in one pass
  // without it. Set to true to bring the section back below Governance.
  enabled: false,
  h2: "The same pattern applies past the finance function.",
  intro:
    "Finance is where you can measure the return fastest. Agents can own processes in other functions too.",
  categories: [
    {
      label: "Procurement and supply",
      description:
        "Requisition to purchase order, supplier onboarding, contract and price-list checks.",
    },
    {
      label: "Knowledge retrieval",
      description:
        "Grounded answers over policies, contracts and internal documents, with citations back to the source.",
    },
    {
      label: "Operations and maintenance",
      description:
        "Work order triage, asset and project status, exception reporting across sites.",
    },
    {
      label: "Guest and customer experience",
      description:
        "Multilingual front-of-house support and review response, handing to a person on escalation.",
    },
    {
      label: "HR and corporate",
      description:
        "Document handling, onboarding workflows, and internal request routing.",
    },
  ] as Category[],
  closing:
    "Each deployment starts with discovery, where we find which processes are worth automating and which are not.",
} as const;

/* ------------------------------------------------------------ governance -- */

export const governance = {
  id: "governance",
  /** Accessible name of the four progress marks beside the pinned visuals. */
  stepsLabel: "Governance controls",
  h2Lead: "Before an agent does any work,",
  h2: "we set the controls.",
  intro:
    "Enterprise buyers stall on one question: what happens when the agent gets something wrong.",
  points: [
    {
      label: "Human approval on every action.",
      description:
        "Agents draft and recommend. A named person authorises anything that changes a system of record.",
    },
    {
      label: "Grounded, permissioned retrieval.",
      description:
        "Agents only see what the role behind them is allowed to see, and answers cite the record they came from.",
    },
    {
      label: "Complete audit trail.",
      description:
        "Algomotive logs every input, decision, approval and output, and you can export the log for audit.",
    },
    {
      label: "Data residency and model tiering.",
      description:
        "Agents handle public, internal and restricted data differently. Restricted workloads can run on self-hosted inference.",
    },
  ] as Category[],
} as const;

/* ---------------------------------------------------------- integrations -- */

export type IntegrationSystem = { name: string; logo: string };

export const integrations = {
  id: "integrations",
  h2Lead: "Built to sit on top of",
  h2: "what you run.",
  body: "Agents read from your finance and property systems through the interfaces those systems support. You replace nothing.",

  /**
   * CLAUDE.md §2 forbids naming any other vendor or platform. The Phase 1
   * brief overrides that for this list specifically, on the grounds that these
   * are software categories the buyer already runs rather than customer or
   * partner references — and no logos are used, only plain type.
   *
   * `showSystems: false` removes the entire list in one edit if that call is
   * ever reversed; the section still renders its heading, body and closing.
   *
   * Edit: src/content/sections.ts → integrations.showSystems / .systems
   */
  showSystems: false, // 28 Oct 2026: no vendor names or logos until each one is approved (CLAUDE.md §2)
  /**
   * The twelve systems shown in the brand file, with the logo files exported
   * from it (`/public/logos`). An entry with an empty `logo` sets its name in
   * type instead. Only add a logo file the owner has permission to use.
   */
  systems: [
    { name: "PMS A", logo: "" },
    { name: "PMS B", logo: "" },
    { name: "ERP A", logo: "" },
    { name: "ERP F", logo: "" },
    { name: "ERP E", logo: "" },
    { name: "Accounting B", logo: "" },
    { name: "Accounting C", logo: "" },
    { name: "Accounting D", logo: "" },
    { name: "Accounting A", logo: "" },
    { name: "ERP B", logo: "" },
    { name: "ERP C", logo: "" },
    { name: "ERP D", logo: "" },
  ] as IntegrationSystem[],
  closing:
    "If your system is not on this list, we look at it in discovery.",
} as const;

/* ----------------------------------------------------------------- proof -- */

export type Measure = {
  icon: "schedule" | "fact_check" | "hourglass_top";
  label: string;
  description: string;
};

/**
 * What a deployment is measured on — the method, not claimed results.
 *
 * CLAUDE.md §2 forbids performance metrics presented as real, so this section
 * describes how the figures are produced (a baseline agreed before an agent
 * starts, reported as it runs) and names what is measured. It claims no
 * number. The measures restate what the agents on this page already say they
 * do; nothing here is a fact about a customer.
 *
 * `quote` is a PLACEHOLDER for a client quotation and stays disabled until a
 * real one is approved. Attribution is role and sector only — never a company
 * name (§2). To ship without the whole section, set `enabled: false`.
 */
export const proof = {
  id: "proof",
  enabled: true,
  h2: "We measure each deployment against a baseline.",
  intro:
    "You agree the figures with us before an agent goes live, and we report them as it runs.",
  measures: [
    {
      // `icon` is a Material Symbol name from src/components/product/Icon.tsx.
      icon: "schedule",
      label: "Days sales outstanding",
      description:
        "We track it as it moves, against the baseline we record before the receivables and cash agents start.",
    },
    {
      icon: "fact_check",
      label: "Exceptions cleared",
      description:
        "We count them per agent and per week, with the reason for each and the person who cleared it.",
    },
    {
      icon: "hourglass_top",
      label: "Hours returned",
      description:
        "The hours your team no longer spends matching, chasing and rebuilding reports, measured against the same baseline.",
    },
  ] as Measure[],
  // PLACEHOLDER: enable once a real, approved quotation exists.
  quote: {
    enabled: false,
    text: "",
    attribution: "",
  },
} as const;

/* ------------------------------------------------------------ blog strip -- */

export const blogTeaser = {
  id: "blog",
  // Off the home page until there is more than one approved post. The blog
  // itself is still linked from the header and footer.
  enabled: false,
  h2: "Writing",
  intro: "Notes on deploying agents inside finance functions that already work.",
  allLabel: "All posts",
  allHref: "/blog",
} as const;

/* --------------------------------------------------------------- contact -- */

export type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  required: boolean;
  autoComplete?: string;
};

export const contact = {
  id: "contact",
  h2Lead: "Tell us what your finance team",
  h2: "spends its week on.",
  body: "We will tell you whether an agent is the right answer for it.",
  fields: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
    { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
    { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
    { name: "role", label: "Role", type: "text", required: true, autoComplete: "organization-title" },
    { name: "message", label: "What does the week look like?", type: "textarea", required: true },
  ] as Field[],
  submitLabel: "Send",
  /** Shown beside the button. `mailto:` is the whole mechanism (§7), so say so. */
  submitNote: "Opens in your email app.",
  /**
   * The `mailto:` composer. `{company}` and `{name}` are substituted from the
   * form. The body lists every field on its own line.
   */
  subjectTemplate: "Website enquiry from {name}, {company}",
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
  },
} as const;

/* ------------------------------------------------------------- not found -- */

export const notFound = {
  title: "That page is not here.",
  body: "The address may have changed, or it never existed. The site is a single page, so the start has all of it.",
  cta: { label: "Back to the start", href: "/" },
} as const;

/* ---------------------------------------------------------------- legal -- */

export const legalPages = {
  privacy: {
    title: "Privacy",
    // PLACEHOLDER: replace with the reviewed privacy policy before launch
    note: "This page is a placeholder. The privacy policy is pending review and will be published before launch.",
  },
  terms: {
    title: "Terms",
    // PLACEHOLDER: replace with the reviewed terms of use before launch
    note: "This page is a placeholder. The terms of use are pending review and will be published before launch.",
  },
} as const;
