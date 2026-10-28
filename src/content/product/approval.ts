/**
 * Sample data drawn inside the product visuals.
 *
 * None of this is page copy and none of it is real: the supplier names are
 * invented, the document numbers and amounts are illustrative. It lives here
 * so the owner can change a figure without opening a component (§6).
 */

export const approvalCard = {
  /** What a screen reader hears in place of the whole card. */
  alt: "Try it: an approval card for an invoice flagged for review because one line exceeds the contracted rate, with the matching evidence listed and Approve, Reject and Query supplier actions.",
  pill: "Summarised invoice",
  status: "Flagged for review",
  reference: "INV-2026-0947, Northgate Linen Services",
  summaryLabel: "SUMMARY",
  summary: [
    "The AED 3,486.40 line from Northgate Linen exceeds the contracted rate of AED 3,182.60.",
    "Everything else on this invoice matched.",
  ],
  evidence: [
    { label: "LPO-8821", value: "2 of 2 lines", flagged: false },
    { label: "Goods receipt", value: "received 15 Oct", flagged: false },
    { label: "Vendor history", value: "38 invoices, 0 disputes", flagged: false },
    { label: "Contracted rate", value: "3,486.40 billed, 3,182.60 agreed", flagged: true },
  ],
  actions: { approve: "Approve", reject: "Reject", query: "Query supplier" },
  /**
   * What the card says once a visitor has pressed one of the three. Pressing
   * the same control again takes the decision back.
   */
  outcomes: {
    approve: { status: "Approved", pill: "Approved and logged to the audit trail" },
    reject: { status: "Rejected", pill: "Returned to the supplier and logged" },
    query: { status: "Query sent", pill: "Drafting the query to the supplier..." },
  },
} as const;
