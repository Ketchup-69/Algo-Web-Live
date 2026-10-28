/**
 * Sample data drawn inside the verification visuals. None of it is page copy
 * and none of it is real: supplier names are invented, document numbers and
 * amounts are illustrative.
 */

export const verificationCards = {
  alt: "Try it: two document checks. Press the variance line to accept it and the flagged invoice clears. one invoice approved by the agent with its purchase order, goods receipt and line quantities all matching, and one flagged for review because 12 filters were ordered and 10 received.",
  ghostTitle: "Agent re...",
  /**
   * Pressing the variance row accepts it: the row takes `accepted.tag`, and
   * the flagged card takes `accepted.status`. Pressing it again takes that back.
   */
  accepted: { tag: "ACCEPTED", status: "Cleared by controller" },
  cards: [
    {
      tone: "cleared",
      status: "Agent approved",
      supplier: "Bramwell Foodstuff",
      rows: [
        { label: "LPO-8834, 2 of 2 lines", tag: "MATCH", variance: false },
        { label: "Goods receipt, 16 Oct", tag: "MATCH", variance: false },
        { label: "Line quantities", tag: "MATCH", variance: false },
      ],
    },
    {
      tone: "flagged",
      status: "Flagged for review",
      supplier: "Pinecrest Maintenance",
      rows: [
        { label: "LPO-8867, 2 of 2 lines", tag: "MATCH", variance: false },
        { label: "Goods receipt, 24 Oct", tag: "MATCH", variance: false },
        { label: "Filters, ordered 12, received 10", tag: "VARIANCE", variance: true },
      ],
    },
  ],
} as const;

export const exceptionsPanel = {
  alt: "Try it: an exceptions list. Press a line to release it to the payment run and the held total updates. a duplicate invoice, a rate breach and an unagreed surcharge, totalling AED 2,497.40 held back from this payment run.",
  rows: [
    {
      kind: "DUPLICATE",
      title: "Same line paid on 11 Oct",
      source: "INV-2026-0974, Kestrel Laundry Co",
      amount: "AED 1,962.40",
      value: 1962.4,
      highlighted: true,
    },
    {
      kind: "RATE BREACH",
      title: "3,912.60 billed, 3,604.10 contracted",
      source: "Fernhill Facilities Mgmt",
      amount: "AED 308.50",
      value: 308.5,
      highlighted: false,
    },
    {
      kind: "SURCHARGE",
      title: "Fuel levy, not in supplier agreement",
      source: "Castell F&B Trading",
      amount: "AED 226.50",
      value: 226.5,
      highlighted: false,
    },
  ],
  totalLabel: "HELD BACK FROM THIS PAYMENT RUN",
  total: "AED 2,497.40",
  /** Shown in place of a row's kind once a visitor releases it to the run. */
  releasedLabel: "RELEASED TO RUN",
  /**
   * The second state. `submit` sends the run as it stands; the panel then
   * says what happened (`{held}` and `{paid}` are filled in) and offers `edit`
   * to go back.
   */
  submit: "Submit payment run",
  edit: "Edit run",
  submittedLabel: "RUN SUBMITTED, HELD BACK",
  submittedNote: "{paid} released for payment. {held} held and logged for review.",
  noneHeld: "Nothing held.",
  currency: "AED",
} as const;
