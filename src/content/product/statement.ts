/**
 * Sample data drawn inside the supplier-statement visual.
 *
 * None of this is page copy and none of it is real: the supplier is invented,
 * the document numbers and amounts are illustrative (§6).
 */

export const statementPanel = {
  /** What a screen reader hears in place of the whole panel. */
  alt: "Try it: a supplier statement reconciliation. Press any exception to open its menu, and pick an action to deal with it. 56 of 60 statement lines matched automatically, four exceptions listed with their reasons, and an action menu open on the first one offering Query supplier, Request credit note, Accept variance and Hold from payment run.",
  period: "Statement Nov 2024",
  supplier: "Northgate Linen Services",
  lineCount: "60 LINES",
  total: "AED 184,200",
  matchedLabel: "MATCHED AUTOMATICALLY",
  /** Lines cleared before anyone touches it; each exception dealt with adds one. */
  clearedCount: 56,
  clearedTemplate: "{n} CLEARED",
  tick: "✓",
  pill: "+47 analyzed & matched",
  /** The divider; `{n}` is how many exceptions are still open. */
  exceptionsTemplate: "{n} EXCEPTIONS",
  exceptionsNone: "NOTHING LEFT TO REVIEW",
  exceptions: [
    { document: "INV-2024-0947", reason: "statement 3,400 · ledger 3,100", tag: "VARIANCE 300", tone: "variance", selected: true },
    { document: "INV-2024-0912", reason: "on statement, not in ledger", tag: "MISSING", tone: "variance", selected: false },
    { document: "CN-2024-0088", reason: "credit note not applied", tag: "AED 1,250", tone: "variance", selected: false },
    { document: "INV-2024-0851", reason: "paid 12 Nov, still open", tag: "TIMING", tone: "neutral", selected: false },
  ],
  menu: {
    heading: "INV-2024-0947 · VARIANCE 300",
    items: [
      // `result` replaces the first exception's tag once a visitor picks that action.
      { icon: "query", label: "Query supplier", active: true, result: "QUERY SENT" },
      { icon: "credit", label: "Request credit note", active: false, result: "CREDIT REQUESTED" },
      { icon: "accept", label: "Accept variance", active: false, result: "ACCEPTED" },
      { icon: "hold", label: "Hold from payment run", active: false, result: "HELD" },
    ],
  },
} as const;
