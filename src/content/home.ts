/**
 * The home page. Copy from the live site's home page, with its products,
 * industries and security summary folded in (approved page map, 28 Oct 2026).
 * Source: docs/live-site-content.md, PAGE /, /products and /solutions.
 */

import type { ClosingCopy, Cta, HeroCopy, Item, PageMeta, SectionCopy } from "./types";
import { contactFor, routes } from "./site";

export const homeMeta: PageMeta = {
  title: "Algomotive AI Platform | Enterprise AI Agents in the UAE",
  description:
    "Build intelligent agents, orchestrate complex workflows, and connect data, people and enterprise systems on one secure AI platform.",
};

export const homeHero: HeroCopy = {
  heading: "Your Business, Engineered to Think.",
  lede: "Purpose-built AI agents that understand your operation, coordinate governed workflows, connect with enterprise systems and target measurable business outcomes.",
  primary: { label: "Start Your Agent Launch", href: contactFor("opportunity") },
  secondary: { label: "Experience a Live Workflow", href: `${routes.algopo}#workflow` },
  note: "Three-week Agent Launch: from a qualified workflow to governed production.",
};

export const difference: SectionCopy & { items: Item[] } = {
  heading: "Move beyond AI that only responds. Build a business that understands and acts.",
  intro:
    "Algomotive combines process engineering, purpose-built agents, connected workflows, enterprise integration, human governance and measurable outcomes through one accountable delivery model.",
  items: [
    {
      title: "Built around the work",
      body: "Algomotive begins with the decisions, documents, approvals, exceptions, systems and outcomes that define your operation, then engineers agents around that reality.",
    },
    {
      title: "From intelligence to action",
      body: "Agents do more than answer questions. They understand context, coordinate workflows, invoke approved tools, involve people and complete governed business tasks.",
    },
    {
      title: "One accountable delivery partner",
      body: "Platform engineering, agent design, workflow orchestration, integration, governance, deployment and continuous improvement are delivered through one coordinated engagement.",
    },
    {
      title: "Your systems stay in the picture",
      body: "Algomotive is designed to connect with the ERP, finance, procurement, CRM, document, payment, data and operational platforms your teams already use.",
    },
    {
      title: "Control is part of the architecture",
      body: "Identity, permissions, policy checks, human approvals, exception handling, monitoring and audit history are designed into the workflow rather than added after launch.",
    },
    {
      title: "Every agent has a business outcome",
      body: "Each implementation is connected to defined operational measures such as processing time, exception volume, throughput, control coverage, working capital or team capacity.",
    },
  ],
};

export type ComparisonRow = { label: string; cells: string[] };

export const comparison: SectionCopy & { caption: string; columns: string[]; rows: ComparisonRow[] } = {
  heading: "Not another AI assistant. An operational intelligence system.",
  caption: "How Algomotive differs from four common approaches",
  columns: ["Approach", "What it does", "The Algomotive approach"],
  rows: [
    {
      label: "Generic AI assistant",
      cells: [
        "Answers questions or generates content without owning the complete operational process.",
        "Purpose-built agents understand business context and take part in governed workflows.",
      ],
    },
    {
      label: "Point automation tool",
      cells: [
        "Automates an isolated task while leaving decisions, exceptions and surrounding systems disconnected.",
        "Agents, people, documents, policies, APIs and enterprise systems operate within one coordinated workflow.",
      ],
    },
    {
      label: "Do-it-yourself agent builder",
      cells: [
        "Provides building blocks but leaves process engineering, integration, governance and production readiness to the customer.",
        "Algomotive combines the platform with implementation engineering and operational launch support.",
      ],
    },
    {
      label: "Open-ended AI experiment",
      cells: [
        "Runs as a long discovery exercise without a defined path to operational use or measurable value.",
        "A structured Agent Launch moves from a qualified workflow to a governed production deployment.",
      ],
    },
  ],
};

export const agentLaunch: SectionCopy & {
  steps: Item[];
  gate: string;
  disclaimer: string;
} = {
  id: "agent-launch",
  heading: "From one qualified workflow to governed production.",
  intro:
    "Three weeks. A focused delivery method connecting process engineering, agent configuration, integration, validation, governance and controlled launch.",
  steps: [
    {
      marker: "Week 1",
      title: "Discover and engineer",
      body: "Select a qualified workflow, define the business outcome, map decisions and exceptions, confirm data access, and establish security and success criteria.",
      points: ["Prioritised use case", "Workflow blueprint", "Integration plan", "Outcome baseline"],
    },
    {
      marker: "Week 2",
      title: "Build and validate",
      body: "Configure the agent, connect approved knowledge and systems, orchestrate the workflow, test business rules, and validate representative scenarios with process owners.",
      points: ["Working agent", "Connected workflow", "Scenario validation", "Exception handling"],
    },
    {
      marker: "Week 3",
      title: "Govern and launch",
      body: "Apply access controls, approval gates, monitoring, auditability, operational ownership and launch-readiness checks before controlled production activation.",
      points: ["Governance controls", "Production readiness", "User enablement", "Controlled launch"],
    },
  ],
  gate: "Production readiness gate: scope, access, integrations, controls, users and operational ownership are confirmed before activation.",
  disclaimer:
    "The three-week Agent Launch is an accelerated delivery method for qualified use cases with confirmed scope, stakeholder availability, data access, integration readiness and timely approvals. Complex transformations may require additional phases.",
};

export const platformTeaser: SectionCopy & { terms: string[]; links: Cta[] } = {
  heading: "One connected platform. Every layer required for intelligent operations.",
  intro:
    "Engineer specialised agents, governed workflows, enterprise knowledge, system integrations, human checkpoints and measurable outcomes through one modular operating architecture.",
  terms: [
    "Specialised AI agents",
    "Governed workflows",
    "Approved knowledge",
    "Enterprise integrations",
    "Human authority",
    "Observable outcomes",
  ],
  links: [
    { label: "Explore the AI Platform", href: routes.platform },
    { label: "Explore AI Agents", href: routes.agents },
  ],
};

export type ProductSummary = {
  /** Anchor on this page, for links from the nav and footer. */
  id?: string;
  name: string;
  category: string;
  tagline: string;
  body: string;
  link: Cta;
};

export const products: SectionCopy & { items: ProductSummary[] } = {
  id: "products",
  heading: "One AI platform. A growing universe of solutions.",
  intro:
    "Apply specialised agents, governed workflows, enterprise knowledge, connected systems, human authority and measurable operations to the financial and operational processes that matter most.",
  items: [
    {
      name: "AlgoPO",
      category: "AI procurement",
      tagline: "Procurement, Engineered to Think.",
      body: "Transform requisitions, purchase orders, approvals, supplier decisions, delivery monitoring and procurement analytics.",
      link: { label: "Explore AlgoPO", href: routes.algopo },
    },
    {
      name: "AlgoCash",
      category: "Receivables and DSO intelligence",
      tagline: "Cash Flow, Engineered to Think.",
      body: "Apply intelligent agents to receivables, collections, customer prioritisation, cash visibility and DSO optimisation.",
      link: { label: "Explore AlgoCash", href: routes.algocash },
    },
    {
      name: "AlgoPay",
      category: "Payment intelligence",
      tagline: "Payments, Engineered to Think.",
      body: "Orchestrate payment validation, approvals, execution, reconciliation, controls and real-time financial visibility.",
      link: { label: "Explore AlgoPay", href: routes.algopay },
    },
    {
      name: "AlgoCapital AI",
      category: "Finance and capital intelligence",
      tagline: "Finance, Engineered to Think.",
      body: "Connect liquidity, forecasting, capital allocation, risk signals and financial decisions through one intelligent foundation.",
      link: { label: "Explore AlgoCapital AI", href: routes.algocapital },
    },
    {
      id: "custom",
      name: "Custom AI Solutions",
      category: "Purpose-built enterprise intelligence",
      tagline: "Your ambition, engineered to think.",
      body: "Engineer specialised agents, governed workflows, enterprise integrations and intelligent applications around a high-value process unique to your organisation.",
      link: { label: "Start with your challenge", href: contactFor("opportunity") },
    },
  ],
};

export const industries: SectionCopy & { items: Item[] } = {
  id: "industries",
  heading: "Industry context. Enterprise intelligence.",
  intro:
    "Algomotive adapts to the processes, systems, regulations and decisions that make each business different. Each pathway is adapted to the organisation's approved systems, information, policies, users, authority model, scope and success measures.",
  items: [
    {
      title: "Finance and fintech",
      body: "Connect receivables, payments, liquidity, forecasting, reconciliations, approvals, controls and financial decisions through governed intelligence.",
      points: ["Working-capital visibility", "Faster financial operations", "Stronger control coverage"],
    },
    {
      title: "Procurement",
      body: "Coordinate purchasing documents, supplier information, approvals, matching, exceptions, delivery monitoring and procurement analytics.",
      points: ["Reduced manual handling", "Faster exception resolution", "Improved purchasing control"],
    },
    {
      title: "Retail and distribution",
      body: "Apply intelligent workflows across high-volume documents, supplier operations, inventory signals, customer accounts, payments and reporting.",
      points: ["Connected operational data", "Higher processing capacity", "Earlier exception detection"],
    },
    {
      title: "Hospitality",
      body: "Connect outlet operations, purchasing, invoices, recipes, sales channels, payment reconciliation and management visibility.",
      points: ["Multi-outlet visibility", "Faster reconciliations", "Improved cost control"],
    },
    {
      title: "Healthcare",
      body: "Engineer controlled workflows around approved documents, operational requests, financial processes, human review and accountable action.",
      points: ["Governed information handling", "Traceable decisions", "Reduced administrative effort"],
    },
    {
      title: "Enterprise operations",
      body: "Design specialised agents around cross-functional processes involving documents, systems, people, policies, decisions and measurable outcomes.",
      points: ["Connected workflows", "Clear human authority", "Observable business outcomes"],
    },
  ],
};

export const securityTeaser: SectionCopy & {
  sequenceLabel: string;
  sequence: string[];
  pillarsHeading: string;
  pillars: Item[];
  link: Cta;
} = {
  heading: "Every consequential action moves through control.",
  intro:
    "Connect agent intelligence with verified identity, approved context, least-privilege tools, business policy, human authority, controlled execution, live observability and accountable evidence.",
  sequenceLabel: "From event to accountable outcome",
  sequence: [
    "Identity verified",
    "Context authorised",
    "Policy evaluated",
    "Human authority preserved",
    "Execution controlled",
    "Evidence recorded",
  ],
  pillarsHeading: "Innovation built for enterprise accountability.",
  pillars: [
    {
      title: "Enterprise security",
      body: "Role-based access, tenant isolation, secure integrations and controlled deployment.",
    },
    {
      title: "Human oversight",
      body: "Clear approval points, exception handling and accountable human decisions.",
    },
    {
      title: "Complete auditability",
      body: "Traceable agent actions, workflow events, amendments, approvals and outcomes.",
    },
    {
      title: "Built to integrate",
      body: "API-first connectivity across business systems, data sources and operational tools.",
    },
  ],
  link: { label: "Explore Security and Trust", href: routes.security },
};

export const homeClosing: ClosingCopy = {
  heading: "Your business already has ambition. Give it intelligence.",
  primary: { label: "Talk to Algomotive", href: routes.contact },
};
