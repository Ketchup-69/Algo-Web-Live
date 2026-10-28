/**
 * Sample data for the governance visuals on /security that are NOT in the
 * brand file: an answer citing the records it came from, and the audit trail.
 * Drawn by the site in the brand file's language. None of it is real.
 */

export const retrievalCard = {
  alt: "Try it: an agent's answer about an invoice on hold. Each numbered citation points at the record it came from, and one record is shown as not visible to the role asking.",
  pill: "Answered from 3 records",
  roleLabel: "ACTING AS",
  role: "AP CLERK ROLE",
  question: "Why is INV-2024-0947 on hold?",
  /** The answer, in order. A `cite` is the 1-based number of a source below. */
  answer: [
    { text: "The Linen & Laundry line was billed at AED 3,400 against a contracted AED 3,100" },
    { cite: 1 },
    { text: ". The goods receipt" },
    { cite: 2 },
    { text: " and the purchase order" },
    { cite: 3 },
    { text: " matched in full." },
  ],
  sourcesLabel: "SOURCES",
  sources: [
    { title: "Supplier contract", detail: "rate schedule · line 4" },
    { title: "Goods receipt", detail: "received 15 Nov" },
    { title: "LPO-8821", detail: "14 of 14 lines" },
  ],
  locked: { title: "Payroll ledger", tag: "NOT VISIBLE TO THIS ROLE" },
} as const;

export const auditTrailCard = {
  alt: "Try it: the audit trail for one invoice. Four entries, one each for the input, the decision, the approval and the output, each with its time. The list can be filtered by kind.",
  pill: "Every step logged",
  title: "AUDIT TRAIL",
  reference: "INV-2024-0947",
  /**
   * The kinds are the four words the page copy uses for this point: "every
   * input, decision, approval and output is logged". Keep them in step.
   */
  filters: [
    { id: "all", label: "All" },
    { id: "input", label: "Input" },
    { id: "decision", label: "Decision" },
    { id: "approval", label: "Approval" },
    { id: "output", label: "Output" },
  ],
  events: [
    { time: "14:02:11", kind: "input", tag: "INPUT", text: "Agent read supplier statement, 60 lines" },
    { time: "14:02:14", kind: "decision", tag: "DECISION", text: "Agent matched 56 lines, flagged 4" },
    { time: "14:06:40", kind: "approval", tag: "APPROVAL", text: "Financial Controller approved" },
    { time: "14:06:41", kind: "output", tag: "OUTPUT", text: "Posted to ledger, GL updated" },
  ],
  footerLabel: "4 EVENTS",
  footerValue: "EXPORTABLE FOR AUDIT",
} as const;
