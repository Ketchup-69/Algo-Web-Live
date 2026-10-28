/**
 * Sample data drawn inside the four dashboard visuals: purchase requests
 * (AlgoPO), invoice checks (AlgoPay), the collections worklist (AlgoCash) and
 * cash timing (AlgoCapital AI).
 *
 * None of this is page copy and none of it is real. Supplier, customer and
 * people names are invented (and checked against UAE and GCC businesses);
 * amounts carry fils and every difference adds up; dates sit in October and
 * November 2026. No figure here is a claim about the product: only amounts
 * and counts on individual documents and accounts (owner decision, 28 Oct 2026).
 */

/** A status chip: `flag` needs a person (navy fill), `wait` is with a person
    (cyan), `ai` is the agent's (violet), `good` is done (green), `quiet` is
    neutral (outline). */
export type ChipKind = "flag" | "wait" | "ai" | "good" | "quiet";
export type ChipData = readonly [ChipKind, string];

/** A step on a request's way: done, with a person, with the agent, or not reached. */
export type StepState = "done" | "wait" | "ai" | "todo";

export const purchaseRequests = {
  alt: "Try it: a list of purchase requests. The first, a kitchen restock of 42 lines, has been read by the agent and is waiting for the requester's check before it goes to the manager. Its six steps run from reading the workbook to sending the purchase order to the supplier. Press Check workbook and it moves on to validation. Below it: a request with a workbook issue, one being validated, one waiting for a manager, and one whose purchase order has been created.",
  altStacked: "Illustration of a list of purchase requests. The first, a kitchen restock of 42 lines, has been read by the agent and is waiting for the requester's check before it goes to the manager, step 2 of 6. Below it, a request with a workbook issue.",
  title: "Purchase requests",
  period: "October 2026",
  columns: ["Request", "Stage", "Value (AED)"],
  currency: "AED",
  steps: ["Read by AI", "Your check", "Validated by AI", "Manager approval", "PO created", "Sent to supplier"],
  focus: {
    id: "PR-2026-0318",
    description: "Kitchen restock, Central outlet, 42 lines",
    value: "89,637.40",
    /** As drawn, and once a visitor has pressed the button. Pressing again takes it back. */
    idle: {
      chip: ["wait", "Waiting for your check"] as ChipData,
      step: "Step 2 of 6",
      stackedStep: "Step 2 of 6: your check",
      steps: ["done", "wait", "todo", "todo", "todo", "todo"] as StepState[],
      note: "Read all 42 lines. Paused so you can check the workbook before it goes to your manager.",
      button: "Check workbook",
    },
    checked: {
      chip: ["ai", "Being validated by AI"] as ChipData,
      step: "Step 3 of 6",
      steps: ["done", "done", "ai", "todo", "todo", "todo"] as StepState[],
      note: "Checked by you. Validating the workbook before it goes to your manager.",
      button: "Checked",
    },
  },
  rows: [
    { id: "PR-2026-0317", description: "Linen order, Beach hotel", chip: ["flag", "Workbook issue"] as ChipData, detail: "3 lines have no unit price", value: "58,214.65" },
    { id: "PR-2026-0315", description: "Cleaning supplies, all outlets", chip: ["ai", "Being validated by AI"] as ChipData, detail: "Step 3 of 6", value: "22,906.15" },
    { id: "PR-2026-0312", description: "Bar glassware, Rooftop lounge", chip: ["wait", "Waiting for manager"] as ChipData, detail: "Step 4 of 6", value: "15,481.90" },
    { id: "PR-2026-0309", description: "Fresh produce, weekly", chip: ["good", "PO created"] as ChipData, detail: "PO-48211 in your ERP", value: "34,452.30" },
  ],
} as const;

export const invoiceChecks = {
  alt: "Try it: an invoice waiting for a decision. The agent checked five things. The purchase order and goods receipt match, it has not been paid before and the VAT is right, but the amount is AED 2,417.50 more than the purchase order, which matches a delivery charge that is not on the order. Approve and post it, send it back to the AP team, or reject it; press again to undo.",
  altStacked: "Illustration of an invoice waiting for a decision. The agent checked five things and found one difference: the amount is AED 2,417.50 more than the purchase order, which matches a delivery charge that is not on the order.",
  reference: "Invoice INV-2026-10482",
  supplier: "Wexcombe Trading",
  amountLabel: "Amount",
  currency: "AED",
  /** The PO (149,266.85) plus the delivery charge (2,417.50). */
  amount: "151,684.35",
  due: "Due 6 Nov",
  checksTitle: "What the AI checked",
  checks: [
    { label: "Purchase order found", value: "PO-48102", flagged: false },
    { label: "Goods received match the quantities", value: "GR-7731", flagged: false },
    { label: "Amount is AED 2,417.50 more than the PO", value: "PO 149,266.85", flagged: true },
    { label: "Not paid or uploaded before", value: "No duplicate", flagged: false },
    { label: "VAT worked out correctly", value: "5%", flagged: false },
  ],
  noteLead: "AI note:",
  note: "the extra AED 2,417.50 matches a delivery charge on line 14 that is not on the PO. Approve if the delivery charge was agreed with the supplier.",
  actions: { back: "Send back to AP team", reject: "Reject", approve: "Approve and post" },
  idle: { chip: ["flag", "Amount mismatch"] as ChipData, text: "Waiting for your decision." },
  outcomes: {
    approve: { chip: ["good", "Approved and posted"] as ChipData, text: "Posted and logged." },
    back: { chip: ["wait", "Sent back to AP team"] as ChipData, text: "Sent back with the AI note." },
    reject: { chip: ["quiet", "Rejected"] as ChipData, text: "Rejected and logged." },
  },
} as const;

export const collections = {
  alt: "Illustration of a collections worklist ranked by approved criteria. The top account, 74 days overdue, missed a payment promise; the agent has prepared a follow-up that goes out only when the account owner approves it. Below it: a disputed invoice, a promise to pay by 6 Nov, and a receipt that arrived without remittance details.",
  altStacked: "Illustration of a collections worklist. The top account missed a payment promise; the agent has prepared a follow-up that goes out only when the account owner approves it. Below it, a disputed invoice.",
  title: "Accounts to follow up",
  rule: "Ranked by your approved criteria: value, ageing, commitments",
  columns: ["Customer", "Open (AED)", "Oldest", "Status", "Next action"],
  currency: "AED",
  focus: {
    name: "Corbel Hotels",
    owner: "Owner: Mariam T.",
    stacked: "Owner: Mariam T., 74 days overdue",
    open: "126,904.15",
    oldest: "74 days",
    chip: ["flag", "Promise missed"] as ChipData,
    detail: "Promised by 20 Oct",
    next: ["ai", "Follow-up prepared"] as ChipData,
    note: "Prepared the follow-up: the 3 overdue invoices, the missed promise and a copy of each invoice. It goes out only when Mariam T. approves it.",
    button: "Review follow-up",
  },
  rows: [
    { name: "Fennick Catering", owner: "Owner: Joel M.", open: "48,217.60", oldest: "52 days", chip: ["flag", "Dispute"] as ChipData, detail: "Price on 2 lines", next: "Joel M. to review", stacked: "52 days overdue, price on 2 lines" },
    { name: "Ostrey Retail", owner: "Owner: Ruben D.", open: "31,580.25", oldest: "38 days", chip: ["wait", "Promise to pay"] as ChipData, detail: "By 6 Nov", next: "Check on 7 Nov", stacked: "38 days overdue, promised by 6 Nov" },
    { name: "Larkspur Leisure", owner: "Owner: Mariam T.", open: "22,946.90", oldest: "33 days", chip: ["flag", "Unapplied receipt"] as ChipData, detail: "AED 9,186.40 received", next: "Match the receipt", stacked: "33 days overdue, AED 9,186.40 received" },
    { name: "Tallis Dining", owner: "Owner: Priya N.", open: "14,603.35", oldest: "12 days", chip: ["quiet", "Reminder due"] as ChipData, detail: "On 3 Nov", next: "Send reminder", stacked: "12 days overdue, reminder due 3 Nov" },
  ],
} as const;

export const cashTiming = {
  alt: "Illustration of the cash position for the next five weeks: expected customer receipts against approved supplier payments, week by week. The week of 16 Nov is flagged with a timing gap, because receipts from three customers are now expected after their agreed terms; the agent has prepared the change and two alternatives for the finance lead to decide.",
  altStacked: "Illustration of five weeks of expected receipts against approved payments. The week of 16 Nov is flagged with a timing gap, prepared for the finance lead to decide.",
  title: "Cash timing, next five weeks",
  rule: "Expected customer receipts against approved supplier payments",
  columns: ["Week of", "Receipts (AED)", "Payments (AED)", "Net (AED)"],
  /** Receipts minus payments, to the fils. */
  weeks: [
    { week: "2 Nov", receipts: "412,630.40", payments: "358,214.75", net: "54,415.65", flagged: false },
    { week: "9 Nov", receipts: "386,920.15", payments: "341,708.60", net: "45,211.55", flagged: false },
    { week: "16 Nov", receipts: "214,385.90", payments: "402,117.35", net: "−187,731.45", flagged: true },
    { week: "23 Nov", receipts: "498,762.30", payments: "329,540.80", net: "169,221.50", flagged: false },
    { week: "30 Nov", receipts: "371,205.65", payments: "344,918.20", net: "26,287.45", flagged: false },
  ],
  flag: ["flag", "Timing gap"] as ChipData,
  note: "Receipts from 3 customers are now expected after their agreed terms, which moves AED 236,470.85 out of the week of 16 Nov. Prepared the change and two alternatives for the finance lead to decide.",
  button: "Review the options",
} as const;
