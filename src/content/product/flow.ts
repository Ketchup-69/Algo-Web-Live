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
