/**
 * /security. Copy from the live site's /security page, with the observability
 * detail from /ai-agents. The framework disclaimer is the live site's, word
 * for word (CLAUDE.md §2): never edit it, and never name a framework without it.
 * Source: docs/live-site-content.md, PAGE /security and /ai-agents.
 */

import type { ClosingCopy, HeroCopy, Item, PageMeta, SectionCopy } from "./types";
import { contactFor, routes } from "./site";

export const securityMeta: PageMeta = {
  title: "Enterprise AI Security and Trust",
  description:
    "Explore how Algomotive applies identity, authorisation, context boundaries, least-privilege tools, policy controls, human authority, observability and accountable evidence across enterprise agent operations.",
};

export const securityHero: HeroCopy = {
  heading: "Every consequential action moves through control.",
  lede: "Algomotive is designed to connect agent intelligence with identity, data boundaries, least-privilege tools, business policy, human authority, controlled execution, monitoring and accountable evidence.",
  primary: { label: "Start Your Agent Launch", href: contactFor("opportunity") },
  secondary: { label: "Explore the AI Platform", href: routes.platform },
};

/**
 * Three of the eight controls, each shown working in a product illustration.
 * In order: the approval card, the cited answer, the audit trail.
 */
export const controlsShown: SectionCopy & { stepsLabel: string; items: Item[] } = {
  heading: "Intelligence can move quickly without operating outside defined authority.",
  stepsLabel: "Controls shown",
  items: [
    {
      title: "Keep people in control",
      body: "Sensitive, exceptional, ambiguous or high-impact decisions go to an authorised person, with the supporting evidence already assembled.",
    },
    {
      title: "Constrain enterprise knowledge",
      body: "The agent retrieves only approved, relevant information within the organisation, workflow, user, purpose and data boundaries defined for it.",
    },
    {
      title: "Preserve an accountable trace",
      body: "The initiating event, context, agent and policy versions, tool calls, authorisation decisions, approvals, actions and results are recorded.",
    },
  ],
};

export const pipeline: SectionCopy & { steps: Item[] } = {
  heading: "From business event to accountable execution.",
  steps: [
    {
      title: "Verify every actor",
      body: "Authenticate users, organisations, services and agents before access to protected workflows, tools, data or administrative functions.",
      points: ["Role-based access", "Tenant-aware authorisation", "Privileged-action checks", "Session revocation"],
    },
    {
      title: "Constrain enterprise knowledge",
      body: "Retrieve only approved and relevant information within the organisation, workflow, user, purpose and data boundaries defined for the agent.",
      points: ["Source allowlists", "Context isolation", "Data minimisation", "Sensitive-data handling"],
    },
    {
      title: "Defend the reasoning layer",
      body: "Inspect untrusted inputs, validate structured outputs, isolate memory, track versions, and handle uncertainty or exceptions before action.",
      points: ["Prompt-injection safeguards", "Output validation", "Memory isolation", "Version traceability"],
    },
    {
      title: "Enforce least privilege",
      body: "Restrict each agent to the minimum approved tools, actions, destinations, credentials and execution limits the workflow requires.",
      points: ["Tool allowlists", "Scoped permissions", "Rate and cost limits", "Action authorisation"],
    },
    {
      title: "Evaluate every consequential action",
      body: "Apply business rules, risk thresholds, segregation of duties, approval requirements and deployment-specific controls before execution.",
      points: ["Policy enforcement", "Risk thresholds", "Segregation of duties", "Approval gates"],
    },
    {
      title: "Keep people in control",
      body: "Route sensitive, exceptional, ambiguous or high-impact decisions to an authorised person with the supporting evidence already assembled.",
      points: ["Human-in-the-loop", "Authority validation", "Escalation paths", "Emergency suspension"],
    },
    {
      title: "Act through controlled interfaces",
      body: "Execute approved actions through protected integrations, validate downstream responses, and prevent unapproved or irreversible operations.",
      points: ["Protected credentials", "Approved destinations", "Transaction validation", "Rollback handling"],
    },
    {
      title: "Preserve an accountable trace",
      body: "Record the initiating event, context, agent and policy versions, tool calls, authorisation decisions, approvals, actions and results.",
      points: ["Correlation IDs", "Workflow history", "Decision evidence", "Audit events"],
    },
  ],
};

export const observability: SectionCopy & {
  traceLabel: string;
  trace: Item[];
  signalsLabel: string;
  signals: string[];
} = {
  heading: "See how the agent reached the action and what happened next.",
  intro:
    "Technical execution, authorisation decisions, context sources, exceptions, security events, workflow cost, control coverage and business outcomes can be monitored through one accountable trace.",
  traceLabel: "The execution trace",
  trace: [
    { title: "Event received" },
    { title: "Identity verified" },
    { title: "Context authorised" },
    { title: "Agent evaluated" },
    { title: "Policy passed" },
    { title: "Human approved, when required" },
    { title: "Action executed" },
    { title: "Result validated" },
    { title: "Audit recorded" },
  ],
  signalsLabel: "Signals monitored",
  signals: [
    "Workflow status and duration",
    "Agent, model, prompt and policy versions",
    "Tool calls and authorisation decisions",
    "Retrieval sources and context boundaries",
    "Approvals, exceptions, retries and escalations",
    "Latency, consumption and workflow cost",
    "Success, failure and validation rates",
    "Security events and anomalous behaviour",
    "Control coverage and audit completeness",
    "Use-case-specific business outcomes",
  ],
};

export const securityLifecycle: SectionCopy & { steps: Item[] } = {
  heading: "Security starts before build and continues after launch.",
  steps: [
    { title: "Risk and impact assessment" },
    { title: "Threat modelling" },
    { title: "Security requirements" },
    { title: "Secure engineering and review" },
    { title: "Scenario and adversarial testing" },
    { title: "Production-readiness approval" },
    { title: "Controlled deployment" },
    { title: "Monitoring and incident response" },
    { title: "Periodic review and improvement" },
    { title: "Retirement and access removal" },
  ],
};

export const frameworks: SectionCopy & { items: Item[]; disclaimer: string } = {
  heading: "Controls mapped to recognised security, privacy, assurance and AI-risk frameworks.",
  items: [
    {
      title: "ISO/IEC 27001",
      body: "Reference framework for risk-based information-security policies, controls, operations, monitoring and continual improvement.",
    },
    {
      title: "ISO/IEC 42001",
      body: "Reference framework for accountable AI governance, roles, risk management, impact assessment, lifecycle controls and continual improvement.",
    },
    {
      title: "NIST AI RMF",
      body: "Voluntary framework for governing, mapping, measuring and managing AI risks and trustworthiness considerations.",
    },
    {
      title: "OWASP GenAI and Agentic Security",
      body: "Technical guidance for threat modelling and mitigating risks such as prompt injection, tool misuse, excessive autonomy and data exposure.",
    },
    {
      title: "SOC 2 Trust Services Criteria",
      body: "Potential assurance scope for security and, where relevant, availability, processing integrity, confidentiality and privacy.",
    },
    {
      title: "UAE PDPL",
      body: "Applicable privacy and data-governance requirements depend on the organisations, processing activities, data and jurisdiction involved.",
    },
    {
      title: "EU AI Act",
      body: "Readiness activities depend on system classification, geographic scope, use case, and whether an organisation acts as provider, deployer, importer or distributor.",
    },
  ],
  // Word for word from the live site (CLAUDE.md §2). Do not edit.
  disclaimer:
    "Framework references describe Algomotive's security and governance design direction and customer mapping capability. They do not represent certification, attestation, or legal compliance unless the exact service, scope, jurisdiction, and independent evidence are explicitly stated.",
};

export const securityClosing: ClosingCopy = {
  heading: "Move one qualified workflow toward governed production.",
  primary: { label: "Start Your Agent Launch", href: contactFor("opportunity") },
  secondary: { label: "Explore the AI Platform", href: routes.platform },
};
