/**
 * The home hero: an invoice worked through by the agent, node by node.
 * Words only; the drawing is src/components/product/AgentFlow.tsx. No
 * amounts, names or counts: nothing here can read as a claim.
 */

export type FlowNodeId = "received" | "read" | "matched" | "duplicates" | "decision" | "posted";
export type FlowKind = "start" | "ai" | "person" | "done";

export type FlowNode = { id: FlowNodeId; kind: FlowKind; title: string; sub: string; chip?: string };

export const agentFlow = {
  alt: "Illustration of an invoice moving through the agent: received, read by AI, matched to the purchase order and goods receipt, and checked for duplicates. Clean items are posted to your ERP; exceptions go to a person for a decision first, then are posted.",
  nodes: [
    { id: "received", kind: "start", title: "Invoice received", sub: "By email, PDF or upload" },
    { id: "read", kind: "ai", title: "Read by AI", sub: "Supplier, lines and VAT", chip: "AI" },
    { id: "matched", kind: "ai", title: "Matched to PO and goods receipt", sub: "Purchase order found", chip: "AI" },
    { id: "duplicates", kind: "ai", title: "Checked for duplicates", sub: "Not paid or uploaded before", chip: "AI" },
    { id: "decision", kind: "person", title: "Needs your decision", sub: "Approve, reject or send back", chip: "You" },
    { id: "posted", kind: "done", title: "Posted to your ERP", sub: "With the full audit trail" },
  ] satisfies FlowNode[],
  /** The two ways out of the duplicate check. */
  branches: { clean: "Clean items", exceptions: "Exceptions" },
} as const;

/**
 * The home hero's agent console: the words around the sample invoices. The
 * invoices themselves (suppliers, numbers, lines, VAT, checks) are the
 * AlgoPay scatter's, so the story is the same on both pages.
 */
export const agentConsole = {
  alt: "Illustration of the agent at work: invoices wait in an inbox; one at a time the agent reads each one, pulling out the supplier, TRN, lines, VAT and total; checks it against the purchase order, the goods receipt and earlier uploads; posts the clean ones to your ERP and sends the one with a difference to a person, who approves it before it is posted.",
  inbox: "Inbox",
  reading: "Reading",
  readerIdle: "Waiting for the next invoice",
  checksTitle: "What the AI checked",
  outcome: { posted: "Posted to your ERP", decision: "Needs your decision" },
  status: {
    queued: "Queued",
    reading: "Reading",
    checking: "Checking",
    held: "Needs you",
    posted: "Posted",
  },
  fields: {
    supplier: "Supplier",
    trn: "TRN",
    number: "Invoice no.",
    date: "Invoice date",
    lines: "Lines",
    vat: "VAT 5%",
    total: "Total",
  },
  /** What the agent says while it reads, in turn. */
  thoughts: ["Finding the supplier and the TRN", "Reading the line items", "Working out the VAT", "Matching to the purchase order"],
  person: { initials: "FM", role: "Finance Manager" },
  actions: { back: "Send back", approve: "Approve" },
  log: {
    read: "Read by AI",
    matched: "Matched to the LPO and GRN",
    passed: "All checks passed",
    held: "Held for a person",
    approved: "Approved by the Finance Manager",
    posted: "Posted to your ERP",
  },
  linesWord: "lines",
  sampleNote: "Illustration with sample data.",
} as const;
