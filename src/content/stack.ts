/**
 * The six layers of the AlgoPay technical architecture (technical brochure,
 * page 5), in British spelling. Used twice: in full on the AlgoPay page, and
 * as the "AI agentic stack" on the home page, one short line per layer.
 */

import type { FeatureIconName } from "@/components/ui/FeatureIcon";
import type { Cta, SectionCopy } from "./types";
import { routes } from "./site";

export type StackLayer = {
  title: string;
  /** The brochure's technical responsibility, in full. */
  body: string;
  /** One line for the home page diagram, tightened from `body`. */
  line: string;
  icon: FeatureIconName;
};

export const stackLayers: StackLayer[] = [
  {
    title: "Experience",
    body: "Payment workspace, request status, approval views, exception queues, reconciliation visibility and operational reporting.",
    line: "The workspace: request status, approval views, exception queues and reporting.",
    icon: "dashboard",
  },
  {
    title: "Agent and Workflow",
    body: "Specialised agent roles, validation orchestration, financial controls, human authorisation, execution coordination and escalation.",
    line: "Specialised agent roles, validation, controls, human authorisation and escalation.",
    icon: "account_tree",
  },
  {
    title: "Payment Context and Evidence",
    body: "Approved payment requests, beneficiaries, amounts, currencies, references, invoices, supporting documents, transaction status and settlement evidence.",
    line: "Requests, beneficiaries, invoices, supporting documents and settlement evidence.",
    icon: "description",
  },
  {
    title: "Enterprise Intelligence Layer",
    body: "Agentic AI and workflow orchestration operate above and across approved ERP, finance, payment, banking, document, data and operational interfaces.",
    line: "Agentic AI and orchestration above and across the approved systems.",
    icon: "psychology",
  },
  {
    title: "ERP and Connected Systems",
    body: "The ERP and connected financial applications remain the systems of record. Approved instructions, accounting records, status updates and reconciliation outcomes are synchronised through validated methods.",
    line: "The ERP stays the system of record; approved results are synchronised back.",
    icon: "hub",
  },
  {
    title: "Governance and Operations",
    body: "Identity, permissions, segregation requirements, authority limits, execution boundaries, monitoring, audit history and outcome measures.",
    line: "Identity, permissions, authority limits, monitoring and audit history.",
    icon: "policy",
  },
];

/** The home page section (owner decision, 5 Nov 2026: the home page may say "AI agentic stack"). */
export const agenticStack: SectionCopy & { link: Cta } = {
  id: "stack",
  heading: "AI agentic stack",
  intro:
    "Six layers, from the workspace a finance team sees down to the governance around every action. Shown as AlgoPay is built.",
  link: { label: "See the AlgoPay architecture", href: `${routes.algopay}#architecture` },
};
