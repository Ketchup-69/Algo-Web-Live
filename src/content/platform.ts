/**
 * /platform: the live site's /platform and /ai-agents pages on one page, for
 * the reader who wants the architecture (approved page map, 28 Oct 2026).
 * The adoption path comes from /resources. The observability list appears on
 * /security only, where it is most at home.
 * Source: docs/live-site-content.md, PAGE /platform, /ai-agents, /resources.
 */

import type { ClosingCopy, HeroCopy, Item, PageMeta, Related, SectionCopy } from "./types";
import { routes } from "./site";

export const platformMeta: PageMeta = {
  title: "Enterprise Agentic AI Platform and AI Agents",
  description:
    "Explore the Algomotive enterprise agentic AI platform and its AI agents: specialised agents, governed workflows, enterprise integrations, human oversight, security and measurable operations.",
};

export const platformHero: HeroCopy = {
  heading: "One platform for intelligence that understands and acts.",
  lede: "Build specialised AI agents, coordinate governed workflows, connect approved enterprise knowledge and systems, preserve human authority, and measure operational outcomes through one modular platform.",
  primary: { label: "Start Your Agent Launch", href: routes.contact },
  secondary: { label: "Explore the Architecture", href: "#architecture" },
};

export const capabilities: SectionCopy & { items: Item[] } = {
  heading: "Everything required to engineer intelligent operations.",
  items: [
    {
      title: "AI agent builder",
      body: "Create specialised agents that understand context, use approved tools and complete governed business tasks.",
    },
    {
      title: "Agentic workflow orchestration",
      body: "Coordinate agents, people, APIs, documents, decisions, approvals and enterprise systems across complete workflows.",
    },
    {
      title: "Document intelligence",
      body: "Extract, understand, validate and transform complex business documents into reliable operational intelligence.",
    },
    {
      title: "Enterprise connectivity",
      body: "Connect AI solutions securely with ERP, finance, procurement, CRM, data, payment and operational platforms.",
    },
    {
      title: "Human governance",
      body: "Keep people in control through approvals, role-based access, policy enforcement, audit history and exception handling.",
    },
    {
      title: "Scalable AI operations",
      body: "Deploy, monitor, measure and continuously improve intelligent solutions across customers, teams and industries.",
    },
  ],
};

export const architecture: SectionCopy & { layers: Item[] } = {
  id: "architecture",
  heading: "Every layer required to move intelligence into operation.",
  intro:
    "Algomotive connects enterprise experiences, specialised agents, governed workflows, approved knowledge, business systems and operational controls through one modular architecture. Intelligence flows through defined layers rather than operating as an isolated model.",
  layers: [
    {
      marker: "Layer 1",
      title: "Enterprise experience",
      body: "Purpose-built applications, operational workspaces, dashboards, alerts, approvals and conversational experiences designed around each business process.",
      points: ["Agent workspaces", "Operational dashboards", "Human approvals", "Guided interactions"],
    },
    {
      marker: "Layer 2",
      title: "Agent intelligence",
      body: "Specialised agents combine instructions, business context, approved knowledge, policies, memory and tools to reason within defined operational boundaries.",
      points: ["Agent roles", "Context engineering", "Tool selection", "Structured decisions"],
    },
    {
      marker: "Layer 3",
      title: "Workflow orchestration",
      body: "Agent actions are coordinated with documents, APIs, validations, business rules, approvals, exceptions, notifications and downstream execution.",
      points: ["Multi-step workflows", "Business rules", "Exception routing", "Human-in-the-loop"],
    },
    {
      marker: "Layer 4",
      title: "Knowledge and data",
      body: "Approved enterprise information is prepared, retrieved, validated and supplied as context while preserving source boundaries and operational relevance.",
      points: ["Document intelligence", "Knowledge retrieval", "Data validation", "Context isolation"],
    },
    {
      marker: "Layer 5",
      title: "Enterprise connectivity",
      body: "API-first integration connects agents with ERP, finance, procurement, CRM, payment, storage, communication and operational platforms.",
      points: ["Secure APIs", "Enterprise connectors", "Event processing", "System actions"],
    },
    {
      marker: "Layer 6",
      title: "Control and operations",
      body: "Identity, authorisation, secrets, monitoring, audit events, deployment controls and operational telemetry support accountable production use.",
      points: ["Access control", "Secret management", "Audit history", "Operational monitoring"],
    },
  ],
};

export const runtime: SectionCopy & { steps: Item[]; principlesLabel: string; principles: string[] } = {
  heading: "From business signal to governed outcome.",
  intro: "Agents, workflows, knowledge, people and systems operate inside defined controls, one step after another.",
  steps: [
    { title: "Business event" },
    { title: "Approved context" },
    { title: "Agent reasoning" },
    { title: "Workflow decision" },
    { title: "Human checkpoint" },
    { title: "System execution" },
    { title: "Measured result" },
  ],
  principlesLabel: "Architecture principles",
  principles: [
    "Model-flexible architecture",
    "API-first connectivity",
    "Human-governed execution",
    "Observable workflows",
    "Modular deployment",
    "Enterprise system alignment",
  ],
};

export type SystemCategory = Item & { short: string };

export const integrations: SectionCopy & {
  categories: SystemCategory[];
  principlesLabel: string;
  principles: string[];
  disclaimer: string;
} = {
  id: "integrations",
  heading: "Intelligence connected to the systems where work happens.",
  intro:
    "Algomotive connects approved data, workflows, people and enterprise systems through governed interfaces, protected credentials, validated responses and traceable actions. Existing systems remain part of the architecture.",
  categories: [
    {
      short: "ERP",
      title: "Enterprise resource planning",
      body: "Connect governed agents and workflows with approved finance, procurement, inventory, operational and master-data functions.",
      points: ["Finance records", "Purchase orders", "Goods receipts", "Supplier data"],
    },
    {
      short: "Finance",
      title: "Accounting and financial operations",
      body: "Coordinate invoice coding, receivables, payments, reconciliation, cash visibility, forecasting and financial controls.",
      points: ["General ledger", "Accounts payable", "Accounts receivable", "Treasury data"],
    },
    {
      short: "Procurement",
      title: "Purchasing and supplier operations",
      body: "Bring requisitions, approvals, purchase orders, receipts, contracts, supplier statements and exceptions into connected workflows.",
      points: ["Requisitions", "Purchase orders", "Contracts", "Supplier records"],
    },
    {
      short: "CRM",
      title: "Customer and commercial systems",
      body: "Use approved customer, opportunity, service, communication and activity data to support governed commercial workflows.",
      points: ["Customer records", "Sales activity", "Service cases", "Collections activity"],
    },
    {
      short: "Payments",
      title: "Payment services and banking interfaces",
      body: "Support payment validation, authorisation, controlled execution, reconciliation, exception handling and transaction visibility.",
      points: ["Payment requests", "Authorisation", "Transaction status", "Reconciliation"],
    },
    {
      short: "Documents",
      title: "Documents, email and enterprise storage",
      body: "Process approved invoices, statements, contracts, purchase documents, messages, spreadsheets and operational files.",
      points: ["Email", "PDF and images", "Spreadsheets", "Enterprise storage"],
    },
    {
      short: "Data",
      title: "Data platforms and analytics",
      body: "Retrieve and validate approved operational, historical, analytical and reference data within defined access boundaries.",
      points: ["Operational data", "Reference data", "Analytics", "Knowledge sources"],
    },
    {
      short: "Communication",
      title: "Channels, alerts and collaboration",
      body: "Coordinate notifications, requests, approvals, escalations and workflow updates through approved communication channels.",
      points: ["Notifications", "Approvals", "Escalations", "Status updates"],
    },
    {
      short: "Cloud",
      title: "Cloud and application services",
      body: "Operate through deployment-specific application, identity, storage, event, monitoring and infrastructure services.",
      points: ["Identity services", "Application services", "Event processing", "Monitoring"],
    },
    {
      short: "Custom APIs",
      title: "Customer-specific systems",
      body: "Engineer controlled integrations for proprietary applications, internal services, legacy systems and specialised operational tools.",
      points: ["Internal APIs", "Legacy systems", "Specialised tools", "Custom applications"],
    },
  ],
  principlesLabel: "Integration principles",
  principles: [
    "API-first where supported",
    "Least-privilege access",
    "Customer-approved systems",
    "Protected credentials",
    "Validated system responses",
    "Traceable actions",
  ],
  disclaimer:
    "Integration availability depends on the selected product, system capabilities, approved APIs, customer access, security requirements, deployment model and implementation scope. Product logos or system names are presented only when support has been verified.",
};

export type CompareRow = { label: string; cells: string[] };

export const agents: SectionCopy & {
  compare: SectionCopy & { caption: string; columns: string[]; rows: CompareRow[] };
  lifecycle: SectionCopy & { steps: Item[] };
  anatomy: SectionCopy & { items: Item[] };
  coordination: SectionCopy & { items: string[] };
  adoption: SectionCopy & { steps: Item[] };
  disclaimer: string;
} = {
  id: "agents",
  heading: "Agents engineered for the work your business actually performs.",
  intro:
    "Algomotive engineers specialised agents that understand approved enterprise context, reason through evidence, operate inside defined authority, coordinate governed workflows and target measurable business outcomes.",
  compare: {
    heading: "Move from useful responses to accountable business work.",
    intro:
      "An enterprise agent is designed around a defined role, approved context, permitted actions, operational controls and an intended business outcome.",
    caption: "A generic assistant compared with an Algomotive enterprise agent",
    columns: ["", "Generic assistant", "Algomotive enterprise agent"],
    rows: [
      {
        label: "Purpose",
        cells: [
          "Responds to user questions or requests.",
          "Operates toward a defined business responsibility and measurable outcome.",
        ],
      },
      {
        label: "Context",
        cells: [
          "Primarily uses the current conversation.",
          "Uses approved enterprise knowledge, records, workflow state and organisational boundaries.",
        ],
      },
      {
        label: "Action",
        cells: [
          "Usually produces information or content.",
          "Can coordinate governed workflows and invoke approved tools or system actions.",
        ],
      },
      {
        label: "Control",
        cells: [
          "Relies mainly on user judgement after the response.",
          "Applies policies, permissions, risk thresholds, approvals and execution limits before action.",
        ],
      },
      {
        label: "Accountability",
        cells: [
          "Conversation history may provide limited traceability.",
          "Can preserve the event, context, versions, decisions, approvals, actions and results.",
        ],
      },
      {
        label: "Measurement",
        cells: [
          "Success is often based on how useful the response was.",
          "Success is evaluated through workflow health, control coverage and business outcomes.",
        ],
      },
    ],
  },
  lifecycle: {
    heading: "Intelligence progresses through five controlled states.",
    steps: [
      {
        title: "Understand",
        body: "Interpret the business event using approved instructions, organisational context, relevant knowledge and defined data boundaries.",
        points: ["Event interpretation", "Approved context", "Source grounding", "Data boundaries"],
      },
      {
        title: "Reason",
        body: "Evaluate the available evidence, business rules, workflow state, exceptions and permitted actions before recommending the next step.",
        points: ["Evidence evaluation", "Business rules", "Exception handling", "Structured decisions"],
      },
      {
        title: "Govern",
        body: "Apply authorisation, risk thresholds, policies, segregation of duties, approval requirements and operational limits.",
        points: ["Policy enforcement", "Authority checks", "Approval gates", "Operational limits"],
      },
      {
        title: "Act",
        body: "Use approved tools and protected integrations to coordinate the workflow or execute an authorised business action.",
        points: ["Approved tools", "Protected credentials", "Workflow execution", "Validated responses"],
      },
      {
        title: "Measure",
        body: "Record the result, preserve evidence, monitor operational health and evaluate the workflow against its intended business outcome.",
        points: ["Audit evidence", "Operational monitoring", "Outcome measurement", "Continuous improvement"],
      },
    ],
  },
  anatomy: {
    heading: "Every agent is assembled around purpose, boundaries, authority and evidence.",
    items: [
      {
        title: "Defined role and objective",
        body: "Each agent is engineered for a specific operational responsibility, approved purpose, expected outcome and escalation boundary.",
      },
      {
        title: "Approved context",
        body: "The agent receives only the knowledge, records, documents, history and workflow state permitted for the task and organisation.",
      },
      {
        title: "Instructions and policies",
        body: "Business rules, process instructions, risk thresholds, decision boundaries and governance requirements guide the agent.",
      },
      {
        title: "Scoped tools",
        body: "Tool access is limited to the approved functions, systems, actions, destinations and permission levels the workflow requires.",
      },
      {
        title: "Memory boundaries",
        body: "Where memory is required, its scope, purpose, retention, access, validation and isolation are defined for the implementation.",
      },
      {
        title: "Structured outputs",
        body: "Decisions, recommendations, tool requests, exceptions and downstream actions use validated structures rather than unrestricted text.",
      },
      {
        title: "Human authority",
        body: "Sensitive, exceptional, ambiguous or high-impact decisions can be routed to an authorised person with supporting evidence.",
      },
      {
        title: "Observable execution",
        body: "Agent versions, context sources, tool calls, authorisation decisions, approvals, exceptions, actions and outcomes can be traced.",
      },
    ],
  },
  coordination: {
    heading: "Specialised agents can collaborate without creating uncontrolled autonomy.",
    intro:
      "Responsibilities, context sharing, delegation, handoffs, permissions, escalation, traceability and outcomes are defined across the complete coordinated workflow.",
    items: [
      "Assign specialised responsibilities to individual agents",
      "Share only approved context between agent roles",
      "Define handoffs and workflow ownership",
      "Apply authorisation at every tool and system boundary",
      "Prevent uncontrolled agent-to-agent delegation",
      "Route exceptions to people or approved specialist agents",
      "Correlate events across the complete multi-agent workflow",
      "Measure the combined system against one business outcome",
    ],
  },
  adoption: {
    heading: "Move from initial understanding to measurable operations.",
    intro:
      "Responsible adoption requires more than selecting a model. It connects business purpose, process engineering, approved information, enterprise systems, human authority, production controls and measurable outcomes.",
    steps: [
      {
        title: "Understand",
        body: "Identify where agentic AI can take part in real operational work rather than remaining an isolated assistant or experiment.",
      },
      {
        title: "Qualify",
        body: "Select a workflow with clear ownership, accessible information, defined authority, representative scenarios and measurable value.",
      },
      {
        title: "Engineer",
        body: "Design the agent role, approved context, tools, workflow stages, integrations, decisions, exceptions and human responsibilities.",
      },
      {
        title: "Govern",
        body: "Apply identity, permissions, policy checks, data boundaries, approvals, monitoring, escalation and complete auditability.",
      },
      {
        title: "Launch",
        body: "Validate the solution with business owners and move through controlled enablement, production readiness, activation and support.",
      },
      {
        title: "Measure",
        body: "Track execution quality and agreed business outcomes, then improve the agent and workflow as operating needs evolve.",
      },
    ],
  },
  disclaimer:
    "Agent roles, models, memory, tools, autonomy, integrations, controls and monitoring are defined for each approved use case. Capabilities shown on this website describe the Algomotive engineering approach and do not imply unrestricted autonomous operation.",
};

export const platformRelated: SectionCopy & { items: Related[] } = {
  heading: "Move from platform capability to controlled production.",
  items: [
    {
      title: "Security and trust",
      body: "Identity, data boundaries, agent safeguards, controlled execution and audit evidence.",
      link: { label: "Explore security", href: routes.security },
    },
    {
      title: "Agent Launch",
      body: "Move a qualified workflow through engineering, validation, governance, user enablement and controlled launch.",
      link: { label: "See the delivery model", href: routes.agentLaunch },
    },
    {
      title: "Intelligent products",
      body: "Purpose-built agent experiences for procurement, receivables, payments, capital intelligence and custom operations.",
      link: { label: "Explore products", href: routes.products },
    },
  ],
};

export const platformClosing: ClosingCopy = {
  heading: "Choose one workflow. Build the intelligence around it.",
  primary: { label: "Start Your Agent Launch", href: routes.contact },
};
