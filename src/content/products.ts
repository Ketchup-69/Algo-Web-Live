/**
 * The four product pages. One shape, one template, four entries: each page
 * is its live counterpart's copy, tightened, in British spelling.
 * Source: docs/live-site-content.md, PAGE /products/algopo, /algocash,
 * /algopay and /algocapital-ai. Live-site defect fixed: the AlgoCash
 * workflow was labelled "Accounts payable".
 */

import type { ClosingCopy, HeroCopy, Item, PageMeta, Related, SectionCopy } from "./types";
import { routes } from "./site";

export type ProductSlug = "algopo" | "algocash" | "algopay" | "algocapital-ai";

export type Product = {
  slug: ProductSlug;
  name: string;
  meta: PageMeta;
  hero: HeroCopy;
  workflow: SectionCopy & { steps: Item[] };
  capabilities: SectionCopy & { items: Item[] };
  /** A closing statement on what the product leaves people to decide. */
  outcome?: SectionCopy;
  exceptions: SectionCopy & { items: string[] };
  measures: SectionCopy & { items: string[] };
  disclaimer: string;
  related: Related[];
  closing: ClosingCopy;
};

const exceptionsHeading = "Surface the cases that require investigation or authority.";
const measuresHeading = "Define the operational measures before production launch.";
const capabilitiesHeading = "Intelligence with control.";
const closingHeading = "Choose the workflow. Connect the evidence. Keep people in authority.";
const allProducts = { label: "Explore All Products", href: routes.products };

/** The same three onward paths from every product page, as on the live site. */
const related: Related[] = [
  {
    title: "AI Platform",
    body: "Connect document intelligence, workflows, approved knowledge, enterprise systems and human authority.",
    link: { label: "Explore the platform", href: routes.platform },
  },
  {
    title: "Security and trust",
    body: "Apply identity, permissions, policy controls, human approval, monitoring and audit evidence.",
    link: { label: "Explore security", href: routes.security },
  },
  {
    title: "Agent Launch",
    body: "Validate scope, integrations, scenarios, authority, production readiness and agreed outcome measures.",
    link: { label: "See the delivery model", href: routes.agentLaunch },
  },
];

export const productList: Product[] = [
  {
    slug: "algopo",
    name: "AlgoPO",
    meta: {
      title: "AlgoPO | AI Procurement and Accounts Payable",
      description:
        "Explore AlgoPO for intelligent invoice processing, procurement workflows, matching, exception handling, human approval, controlled execution and operational visibility.",
    },
    hero: {
      heading: "Procurement, Engineered to Think.",
      lede: "Transform requisitions, purchase orders, approvals, supplier decisions, delivery monitoring and procurement analytics.",
      primary: { label: "Discuss AlgoPO", href: routes.contact },
      secondary: { label: "Explore the Workflow", href: "#workflow" },
    },
    workflow: {
      id: "workflow",
      heading: "Review exceptions, not every invoice.",
      intro:
        "AlgoPO can coordinate invoice intake, coding, purchasing-document checks, supplier-statement reconciliation, exception handling, human approval and controlled posting through one governed workflow.",
      steps: [
        {
          title: "Capture",
          body: "Receive invoices and supporting documents from approved channels such as email, PDF, scanning, portals or operational uploads.",
        },
        {
          title: "Understand",
          body: "Extract supplier, invoice, amount, line, tax, payment-term, cost-centre, outlet and account information for validation.",
        },
        {
          title: "Code",
          body: "Apply the organisation's approved accounting structure, coding rules, cost centres and operational allocations.",
        },
        {
          title: "Match",
          body: "Compare invoice lines with the purchase order, receipt, supplier statement, contracted rate, credits and relevant payment history.",
        },
        {
          title: "Detect exceptions",
          body: "Surface discrepancies including missing records, duplicates, rate variance, quantity variance, unapproved charges and unapplied credits.",
        },
        {
          title: "Prepare the decision",
          body: "Assemble the invoice summary, matched evidence, exception explanation, supplier context, policy checks and recommended next action.",
        },
        {
          title: "Human review",
          body: "Present the complete case to an authorised person for approval, rejection, escalation or supplier query.",
        },
        {
          title: "Execute and record",
          body: "Send approved actions to the connected workflow or system and preserve the operational and audit history.",
        },
      ],
    },
    capabilities: {
      heading: "Every processing stage stays connected to evidence, authority and accountable execution.",
      items: [
        {
          title: "Document intelligence",
          body: "Capture and understand approved invoices, purchase documents, receipts, supplier statements, credits and supporting evidence.",
        },
        {
          title: "Business validation",
          body: "Apply approved coding structures, purchasing rules, payment terms, cost centres, outlet allocations and operational checks.",
        },
        {
          title: "Matching and reconciliation",
          body: "Compare invoice information with purchase orders, receipts, contracted rates, supplier statements, credits and relevant payment history.",
        },
        {
          title: "Exception intelligence",
          body: "Surface missing records, duplicates, rate differences, quantity differences, unapproved charges and unapplied credits for review.",
        },
        {
          title: "Human authority",
          body: "Present evidence and recommendations to authorised people for approval, rejection, escalation, correction or supplier follow-up.",
        },
        {
          title: "Controlled execution",
          body: "Send approved actions to connected workflows or systems while preserving operational status, decisions and audit history.",
        },
      ],
    },
    outcome: {
      heading: "Focus people on exceptions while preserving complete operational visibility.",
    },
    exceptions: {
      heading: exceptionsHeading,
      items: [
        "Invoice amount or line variance",
        "Purchase order mismatch",
        "Goods-receipt discrepancy",
        "Duplicate submission",
        "Contract-rate breach",
        "Unapproved surcharge",
        "Missing ledger entry",
        "Unapplied credit note",
        "Previously paid item still open",
      ],
    },
    measures: {
      heading: measuresHeading,
      items: [
        "Invoice-processing cycle time",
        "Straight-through processing rate",
        "Exception volume",
        "Duplicate and variance detection",
        "Approval turnaround time",
        "Control coverage",
        "Manual handling reduced",
      ],
    },
    disclaimer:
      "Workflow behaviour, integration scope, processing capacity and outcome targets are validated for each implementation. Published customer results will use approved and verifiable evidence.",
    related,
    closing: {
      heading: closingHeading,
      primary: { label: "Discuss AlgoPO", href: routes.contact },
      secondary: allProducts,
    },
  },
  {
    slug: "algocash",
    name: "AlgoCash",
    meta: {
      title: "AlgoCash | Receivables and DSO Intelligence",
      description:
        "Explore AlgoCash for intelligent receivables, collections prioritisation, customer context, coordinated follow-up, cash visibility and DSO management.",
    },
    hero: {
      heading: "Cash Flow, Engineered to Think.",
      lede: "Apply intelligent agents to receivables, collections, customer prioritisation, cash visibility and DSO optimisation.",
      primary: { label: "Discuss AlgoCash", href: routes.contact },
      secondary: { label: "Explore the Workflow", href: "#workflow" },
    },
    workflow: {
      id: "workflow",
      heading: "Prioritise the next best collections action.",
      intro:
        "Connect receivables information, customer context, ageing, payment patterns, disputes, commitments, collections priorities, human authority and measurable cash outcomes through one governed workflow.",
      steps: [
        {
          title: "Connect receivables",
          body: "Bring approved invoice, customer, ageing, payment, dispute, credit and account information into a coordinated operating view.",
        },
        {
          title: "Understand customer context",
          body: "Organise balances, ageing position, payment patterns, open disputes, commitments, account ownership and relevant customer information.",
        },
        {
          title: "Prioritise action",
          body: "Help finance teams focus attention using approved criteria such as value, ageing, due status, risk signals, commitments and operational urgency.",
        },
        {
          title: "Coordinate follow-up",
          body: "Prepare the approved account context, outstanding items, supporting evidence, next action, ownership and follow-up sequence.",
        },
        {
          title: "Handle exceptions",
          body: "Surface disputes, broken commitments, unapplied receipts, missing information, account differences and cases requiring authorised review.",
        },
        {
          title: "Preserve human authority",
          body: "Keep authorised finance and account owners responsible for communications, settlements, escalations, adjustments and sensitive decisions.",
        },
        {
          title: "Update the operating record",
          body: "Record approved actions, customer responses, commitments, exceptions, ownership and workflow status in the connected operating process.",
        },
        {
          title: "Measure and improve",
          body: "Monitor agreed receivables and collections measures, review operating signals, and improve the workflow as business needs evolve.",
        },
      ],
    },
    capabilities: {
      heading: capabilitiesHeading,
      items: [
        {
          title: "Receivables intelligence",
          body: "Connect approved customer, invoice, ageing, payment, dispute, commitment and account information into one governed operating context.",
        },
        {
          title: "Customer context",
          body: "Organise balances, payment patterns, open items, commitments, disputes, ownership and approved account information for action.",
        },
        {
          title: "Collections prioritisation",
          body: "Help finance teams prioritise attention using approved criteria such as value, ageing, due status, risk signals and operational urgency.",
        },
        {
          title: "Exception coordination",
          body: "Surface disputes, broken commitments, unapplied receipts, missing information and account differences requiring investigation.",
        },
        {
          title: "Human authority",
          body: "Keep authorised finance and account owners responsible for communications, settlements, escalation, adjustments and sensitive decisions.",
        },
        {
          title: "Observable operations",
          body: "Preserve approved actions, customer responses, commitments, ownership, exceptions, workflow status and measurable outcomes.",
        },
      ],
    },
    exceptions: {
      heading: exceptionsHeading,
      items: [
        "Customer dispute",
        "Broken payment commitment",
        "Unapplied receipt",
        "Missing remittance information",
        "Invoice or balance difference",
        "Overdue high-value account",
        "Unresolved credit request",
        "Escalation requiring authority",
        "Account ownership gap",
      ],
    },
    measures: {
      heading: measuresHeading,
      items: [
        "Receivables visibility",
        "Collections prioritisation",
        "Follow-up cycle time",
        "Promise-to-pay tracking",
        "Dispute resolution time",
        "Overdue balance movement",
        "DSO management",
        "Working-capital visibility",
      ],
    },
    disclaimer:
      "Workflow behaviour, integration scope, customer context, prioritisation criteria, communications, processing capacity and outcome targets are validated for each implementation. Published customer results will use approved and verifiable evidence.",
    related,
    closing: {
      heading: closingHeading,
      primary: { label: "Discuss AlgoCash", href: routes.contact },
      secondary: allProducts,
    },
  },
  {
    slug: "algopay",
    name: "AlgoPay",
    meta: {
      title: "AlgoPay | Enterprise Payment Intelligence",
      description:
        "Explore AlgoPay for payment validation, authorisation, controlled execution, reconciliation, exception handling, financial control and transaction visibility.",
    },
    hero: {
      heading: "Payments, Engineered to Think.",
      lede: "Orchestrate payment validation, approvals, execution, reconciliation, controls and real-time financial visibility.",
      primary: { label: "Discuss AlgoPay", href: routes.contact },
      secondary: { label: "Explore the Workflow", href: "#workflow" },
    },
    workflow: {
      id: "workflow",
      heading: "Coordinate every payment decision with control.",
      intro:
        "Connect payment requests, supporting evidence, validation, financial controls, authorisation, controlled execution, reconciliation, exception handling and transaction visibility through one governed workflow.",
      steps: [
        {
          title: "Receive the payment request",
          body: "Bring approved payment requests and supporting information into a controlled workflow with clear ownership and status.",
        },
        {
          title: "Validate the context",
          body: "Check approved beneficiary, amount, currency, due date, source documents, references, account information and required supporting evidence.",
        },
        {
          title: "Apply financial controls",
          body: "Apply approved policies, duplicate checks, payment rules, authority limits, segregation requirements and workflow conditions.",
        },
        {
          title: "Prepare authorisation",
          body: "Assemble the payment summary, supporting evidence, validation results, exceptions, required approvals and proposed next action.",
        },
        {
          title: "Preserve human authority",
          body: "Present the complete payment case to authorised people for approval, rejection, correction, escalation or further investigation.",
        },
        {
          title: "Coordinate controlled execution",
          body: "Send approved instructions through the connected and authorised payment process while preserving execution boundaries and status.",
        },
        {
          title: "Reconcile the result",
          body: "Compare approved payment instructions with transaction status, settlement information, accounting records and relevant exceptions.",
        },
        {
          title: "Monitor and improve",
          body: "Track agreed payment measures, exception patterns, authorisation performance, reconciliation status and control coverage.",
        },
      ],
    },
    capabilities: {
      heading: capabilitiesHeading,
      items: [
        {
          title: "Payment validation",
          body: "Check approved payment requests, beneficiary information, amounts, currencies, references, source documents and supporting evidence.",
        },
        {
          title: "Authorisation control",
          body: "Apply approved roles, authority levels, segregation requirements, policies, workflow conditions and human approval points.",
        },
        {
          title: "Exception intelligence",
          body: "Surface duplicate requests, missing evidence, beneficiary differences, amount differences, policy exceptions and unresolved status.",
        },
        {
          title: "Controlled execution",
          body: "Coordinate approved payment instructions through connected and authorised processes without creating uncontrolled autonomy.",
        },
        {
          title: "Reconciliation",
          body: "Compare approved instructions with transaction status, settlement information, accounting records and operational evidence.",
        },
        {
          title: "Observable operations",
          body: "Preserve request status, validation results, approvals, exceptions, execution events, reconciliation outcomes and audit history.",
        },
      ],
    },
    exceptions: {
      heading: exceptionsHeading,
      items: [
        "Duplicate payment request",
        "Missing supporting evidence",
        "Beneficiary information difference",
        "Amount or currency difference",
        "Authority-limit exception",
        "Unapproved payment instruction",
        "Transaction-status mismatch",
        "Reconciliation difference",
        "Execution requiring escalation",
      ],
    },
    measures: {
      heading: measuresHeading,
      items: [
        "Payment-processing cycle time",
        "Authorisation turnaround time",
        "Payment accuracy",
        "Exception volume",
        "Reconciliation completion",
        "Duplicate detection",
        "Control coverage",
        "Transaction visibility",
      ],
    },
    disclaimer:
      "Workflow behaviour, integration scope, payment channels, authorisation rules, execution boundaries, reconciliation requirements, processing capacity and outcome targets are validated for each implementation. Published customer results will use approved and verifiable evidence.",
    related,
    closing: {
      heading: closingHeading,
      primary: { label: "Discuss AlgoPay", href: routes.contact },
      secondary: allProducts,
    },
  },
  {
    slug: "algocapital-ai",
    name: "AlgoCapital AI",
    meta: {
      title: "AlgoCapital AI | Finance and Capital Intelligence",
      description:
        "Explore AlgoCapital AI for connected liquidity, forecasting, working-capital visibility, risk signals, financial context and governed capital decisions.",
    },
    hero: {
      heading: "Finance, Engineered to Think.",
      lede: "Connect liquidity, forecasting, capital allocation, risk signals and financial decisions through one intelligent foundation.",
      primary: { label: "Discuss AlgoCapital AI", href: routes.contact },
      secondary: { label: "Explore the Workflow", href: "#workflow" },
    },
    workflow: {
      id: "workflow",
      heading: "Connect financial context with governed decisions.",
      intro:
        "Connect liquidity, forecasting, working capital, approved assumptions, risk signals, financial scenarios, human authority and measurable outcomes through one intelligent foundation.",
      steps: [
        {
          title: "Connect financial context",
          body: "Bring approved liquidity, cash, receivables, payables, commitments, forecasts and relevant operating information into a coordinated view.",
        },
        {
          title: "Establish the position",
          body: "Organise current balances, expected inflows, planned outflows, obligations, working-capital signals and approved financial assumptions.",
        },
        {
          title: "Understand the drivers",
          body: "Connect changes in cash, collections, payments, operational activity, commitments and forecast assumptions with the financial position.",
        },
        {
          title: "Surface risk signals",
          body: "Highlight approved indicators such as liquidity pressure, forecast differences, concentration, timing gaps and working-capital movement.",
        },
        {
          title: "Evaluate scenarios",
          body: "Help authorised teams compare approved assumptions, timing, constraints, dependencies and potential operational effects.",
        },
        {
          title: "Prepare the decision",
          body: "Assemble the financial context, evidence, assumptions, risk signals, alternatives, authority requirements and proposed next action.",
        },
        {
          title: "Preserve human authority",
          body: "Keep authorised finance leaders responsible for forecasts, funding priorities, capital allocation, risk acceptance and final decisions.",
        },
        {
          title: "Measure and improve",
          body: "Monitor agreed financial measures, compare forecasts with outcomes, review exceptions and improve the operating model over time.",
        },
      ],
    },
    capabilities: {
      heading: capabilitiesHeading,
      items: [
        {
          title: "Connected financial context",
          body: "Bring approved liquidity, cash, receivables, payables, commitments, forecasts and operating information into one coordinated view.",
        },
        {
          title: "Forecast intelligence",
          body: "Connect approved assumptions, expected inflows, planned outflows, timing, dependencies and actual outcomes for structured review.",
        },
        {
          title: "Working-capital visibility",
          body: "Relate receivables, payments, purchasing, commitments, cash timing and operational activity to the wider financial position.",
        },
        {
          title: "Risk signals",
          body: "Surface approved indicators, differences, thresholds, timing gaps, concentration and incomplete context requiring investigation.",
        },
        {
          title: "Governed decision support",
          body: "Prepare evidence, assumptions, scenarios, constraints, alternatives and authority requirements without replacing accountable human judgement.",
        },
        {
          title: "Observable outcomes",
          body: "Preserve assumptions, reviews, decisions, approvals, exceptions, forecast changes, operating signals and measured financial outcomes.",
        },
      ],
    },
    outcome: {
      heading: "Give finance leaders connected context while preserving accountable authority.",
    },
    exceptions: {
      heading: exceptionsHeading,
      items: [
        "Liquidity threshold signal",
        "Forecast-to-actual difference",
        "Unexpected cash-flow timing",
        "Working-capital movement",
        "Concentration requiring review",
        "Assumption requiring validation",
        "Commitment outside the approved plan",
        "Capital decision requiring authority",
        "Incomplete financial context",
      ],
    },
    measures: {
      heading: measuresHeading,
      items: [
        "Liquidity visibility",
        "Forecast review cycle time",
        "Forecast-to-actual monitoring",
        "Working-capital visibility",
        "Risk-signal response time",
        "Decision preparation time",
        "Control coverage",
        "Financial scenario visibility",
      ],
    },
    disclaimer:
      "Financial information, integration scope, forecast assumptions, risk indicators, scenario logic, authority boundaries and outcome targets are validated for each implementation. AlgoCapital AI supports governed decision preparation and does not replace accountable financial judgement. Published customer results will use approved and verifiable evidence.",
    related,
    closing: {
      heading: "Connect financial context, evaluate approved scenarios, and keep finance leaders in authority.",
      primary: { label: "Discuss AlgoCapital AI", href: routes.contact },
      secondary: allProducts,
    },
  },
];

export const getProduct = (slug: ProductSlug) => {
  const product = productList.find((p) => p.slug === slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
};

/**
 * Captions for the product illustrations on the AlgoPO page. Each names what
 * the drawing shows, in the live page's own words for that stage.
 */
export const algopoVisuals = {
  wells: [
    { title: "Capture", body: "Invoices arrive from approved channels: email, PDF, scanning, portals or uploads." },
    { title: "Code", body: "The organisation's approved accounting structure and coding rules are applied." },
    { title: "Execute and record", body: "Approved actions go to the connected system, and the history is kept." },
  ],
  statement: {
    title: "Supplier-statement reconciliation",
    body: "Lines that match clear on their own. The exceptions are surfaced with their reasons, for a person to act on.",
  },
  checks: [
    {
      title: "Matching and reconciliation",
      body: "Invoice lines compared with the purchase order, the goods receipt and the quantities received.",
    },
    {
      title: "Exception intelligence",
      body: "Duplicates, rate differences and unapproved charges held for review before the payment run.",
    },
  ],
} as const;
