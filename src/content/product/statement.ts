/**
 * Sample data drawn inside the supplier-statement visual.
 *
 * None of this is page copy and none of it is real: the supplier is invented,
 * the document numbers and amounts are illustrative (§6).
 */

export const statementPanel = {
  /** What a screen reader hears in place of the whole panel. */
  alt: "Try it: a supplier statement reconciliation. Press any exception to open its menu, and pick an action to deal with it. 56 of 60 statement lines matched, four exceptions listed with their reasons, and an action menu open on the first one offering Query supplier, Request credit note, Accept variance and Hold from payment run.",
  period: "Statement Oct 2026",
  supplier: "Northgate Linen Services",
  lineCount: "60 LINES",
  total: "AED 186,734.85",
  matchedLabel: "MATCHED AUTOMATICALLY",
  /** Lines cleared before anyone touches it; each exception dealt with adds one. */
  clearedCount: 56,
  clearedTemplate: "{n} CLEARED",
  tick: "✓",
  pill: "Matched 56 of 60 lines",
  /** The divider; `{n}` is how many exceptions are still open. */
  exceptionsTemplate: "{n} EXCEPTIONS",
  exceptionsNone: "NOTHING LEFT TO REVIEW",
  exceptions: [
    { document: "INV-2026-0947", reason: "statement 3,486.40, ledger 3,182.60", tag: "VARIANCE 303.80", tone: "variance", selected: true },
    { document: "INV-2026-0912", reason: "on statement, not in ledger", tag: "MISSING", tone: "variance", selected: false },
    { document: "CN-2026-0088", reason: "credit note not applied", tag: "AED 1,256.40", tone: "variance", selected: false },
    { document: "INV-2026-0851", reason: "paid 12 Oct, still open", tag: "TIMING", tone: "neutral", selected: false },
  ],
  menu: {
    heading: "INV-2026-0947, VARIANCE 303.80",
    items: [
      // `result` replaces the first exception's tag once a visitor picks that action.
      { icon: "query", label: "Query supplier", active: true, result: "QUERY SENT" },
      { icon: "credit", label: "Request credit note", active: false, result: "CREDIT REQUESTED" },
      { icon: "accept", label: "Accept variance", active: false, result: "ACCEPTED" },
      { icon: "hold", label: "Hold from payment run", active: false, result: "HELD" },
    ],
  },
} as const;
