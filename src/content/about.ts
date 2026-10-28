/**
 * /about. Copy from the live site's /about page. Live-site defects fixed: the
 * "Measure operational value" principle had no body on the live site, so it
 * takes the live /solutions page's line for the same idea; and the three
 * vision cards repeated one filler sentence, so they are set as a plain list
 * with no invented lines.
 * Source: docs/live-site-content.md, PAGE /about and /solutions.
 */

import type { ClosingCopy, HeroCopy, Item, PageMeta, SectionCopy } from "./types";
import { contactFor, routes } from "./site";

export const aboutMeta: PageMeta = {
  title: "About Algomotive",
  description:
    "Learn about Algomotive, its enterprise agentic AI vision, operating philosophy, platform evolution and approach to governed, measurable intelligence.",
};

export const aboutHero: HeroCopy = {
  heading: "Engineering intelligence into the operation.",
  lede: "Algomotive helps organisations move from isolated AI assistance to specialised agents, governed workflows, connected enterprise systems, human authority and measurable operational outcomes.",
  primary: { label: "Engineer Your AI Future", href: contactFor("opportunity") },
  secondary: { label: "Request Company Brochure", href: contactFor("resource") },
};

export const story: SectionCopy & { steps: Item[] } = {
  heading: "From fragmented enterprise work to connected intelligence.",
  intro:
    "Algomotive's platform direction connects document understanding, structured workflows, purpose-built products, specialised agents, enterprise systems, human authority and observable outcomes.",
  steps: [
    {
      marker: "The operational problem",
      title: "Enterprise work was fragmented across documents, decisions, people and systems.",
      body: "Critical processes depended on manual interpretation, repeated data entry, disconnected approvals, operational follow-up and limited real-time visibility.",
    },
    {
      marker: "The first foundation",
      title: "Intelligence was applied to documents and structured workflows.",
      body: "Algomotive began by connecting document understanding with validation, business rules, approvals, integrations and traceable operational execution.",
    },
    {
      marker: "Product intelligence",
      title: "Purpose-built solutions extended intelligence into core financial operations.",
      body: "AlgoPO, AlgoCash, AlgoPay and AlgoCapital AI were defined around procurement, receivables, payments, cash visibility, finance and capital decisions.",
    },
    {
      marker: "The agentic platform",
      title: "Specialised agents became part of complete enterprise workflows.",
      body: "Agents can combine business context, approved knowledge, tools, policies, people and systems to support governed decisions and actions.",
    },
    {
      marker: "The long-term vision",
      title: "Every important business process can become capable of understanding and acting.",
      body: "Algomotive is building toward an enterprise operating layer where intelligence is embedded across workflows while people retain authority, visibility and control.",
    },
  ],
};

export const principles: SectionCopy & { items: Item[] } = {
  heading: "Intelligence is engineered around the work, not added beside it.",
  intro:
    "The operating model connects business purpose, process engineering, approved information, enterprise systems, human control, production readiness and measurable value.",
  items: [
    {
      title: "Begin with the business",
      body: "Start with the real workflow, business outcome, people, documents, decisions, exceptions, systems and operating constraints.",
    },
    {
      title: "Engineer for action",
      body: "Move beyond isolated answers by connecting intelligence with approved tools, workflows, systems, decisions and accountable execution.",
    },
    {
      title: "Preserve human authority",
      body: "Keep people in control through defined permissions, approval points, exception handling, escalation paths and visible decisions.",
    },
    {
      title: "Connect existing systems",
      body: "Build around the ERP, finance, procurement, CRM, document, payment, data and operational platforms the organisation already uses.",
    },
    {
      title: "Design control into the workflow",
      body: "Embed identity, policy checks, information boundaries, monitoring, audit history and controlled execution into the operating architecture.",
    },
    {
      title: "Measure operational value",
      body: "Connect every implementation to agreed measures such as cycle time, exception volume, throughput, control coverage, working capital or capacity.",
    },
  ],
};

export const vision: SectionCopy & { items: string[] } = {
  heading: "A business where intelligence is part of the operation.",
  intro:
    "Algomotive's goal is to help organisations move from isolated AI assistance to connected, governed and measurable intelligence operating across real business processes.",
  items: [
    "Intelligence embedded in workflows",
    "People remain in control",
    "Existing systems remain connected",
  ],
};

export const accountability: SectionCopy & { items: Item[] } = {
  heading: "Built for accountable adoption and sustained operations.",
  items: [
    {
      title: "Purpose-built intelligence",
      body: "Agents and workflows are engineered around a defined operational role rather than presented as generic, open-ended automation.",
    },
    {
      title: "One accountable delivery model",
      body: "Process engineering, agent design, integration, governance, validation, launch and continuous improvement remain connected.",
    },
    {
      title: "Evidence-safe communication",
      body: "Customer results, certifications, performance claims and formal evidence are published only after verification and approval.",
    },
    {
      title: "Continuous improvement",
      body: "Operational signals, exceptions, user feedback, control performance and business outcomes inform improvement after launch.",
    },
  ],
};

export const aboutClosing: ClosingCopy = {
  heading: "Start with one qualified workflow and a measurable outcome.",
  primary: { label: "Engineer Your AI Future", href: contactFor("opportunity") },
  secondary: { label: "Explore the Agent Launch", href: routes.agentLaunch },
};
