/**
 * Sample data drawn inside the hero invoice scatter.
 *
 * None of this is page copy and none of it is real: the supplier names are
 * invented, the document numbers and amounts are illustrative (§6).
 */

export const invoiceScatter = {
  /** What a screen reader hears in place of the whole visual. */
  alt: "Illustration of a scatter of supplier invoices. One at a time, an invoice comes forward, the agent reads it, then codes or flags each line and says what it found.",
  /**
   * The invoices the agent works through, one at a time, for ever.
   *
   * The first is the brand file's drawing and is what shows before anything
   * moves (and all that shows with motion reduced). The rest are worked
   * through in this order, round and round. Each waits its turn as a card in
   * the background pile — the first four are the pile as drawn — comes forward,
   * is read, is resolved, and leaves before the next arrives. As one is pulled
   * the pile moves up a place and the next in line joins it.
   *
   * `thinking` is what the agent says while reading; `resolved` is what it
   * says after. `tone` colours the verdict: "code" for coded and matched,
   * "flag" for something a person has to look at. A line with `flag` gets a
   * warning instead of a tick and `code` is then the reason, not a GL code.
   */
  cycle: [
    {
      supplier: "Northgate Linen Services",
      date: "15 OCT 2026",
      number: "INV-2026-0947",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8821" },
      ],
      lines: [
        { label: "Linen & Laundry – Oct '26", amount: "AED 3,486.40", code: "6210-HK", flag: false },
        { label: "F&B Supplies – Oct '26", amount: "AED 812.75", code: "6120-FB", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 4,299.15" },
      tone: "code",
      sub: "AUTO-CODED",
      tag: "CODED, 2 LINES",
      thinking: "Reading and coding 14 invoices...",
      resolved: "Coded to your GL. Ready to match.",
    },
    {
      supplier: "Castell F&B Trading",
      date: "21 OCT 2026",
      number: "INV-2026-0962",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8846" },
      ],
      lines: [
        { label: "Beverages – Oct '26", amount: "AED 1,684.30", code: "5210-FB", flag: false },
        { label: "Fuel levy", amount: "AED 226.50", code: "NOT AGREED", flag: true },
      ],
      total: { label: "Total Due", amount: "AED 1,910.80" },
      tone: "flag",
      sub: "FLAGGED FOR REVIEW",
      tag: "SURCHARGE, HELD",
      thinking: "Reading the supplier agreement...",
      resolved: "Fuel levy is not in the agreement. Held.",
    },
    {
      supplier: "Bramwell Foodstuff",
      date: "18 OCT 2026",
      number: "INV-2026-0951",
      meta: [
        { label: "Payment Terms", value: "Net 45" },
        { label: "LPO Ref", value: "LPO-8834" },
      ],
      lines: [
        { label: "Dry Goods – Oct '26", amount: "AED 512.30", code: "5110-FB", flag: false },
        { label: "Dairy & Chilled – Oct '26", amount: "AED 276.50", code: "5120-FB", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 788.80" },
      tone: "code",
      sub: "MATCHED THREE WAYS",
      tag: "LPO, RECEIPT, INVOICE",
      thinking: "Checking against LPO-8834 and the goods receipt...",
      resolved: "Both lines match. Cleared.",
    },
    {
      supplier: "Fernhill Facilities Mgmt",
      date: "20 OCT 2026",
      number: "INV-2026-0958",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8840" },
      ],
      lines: [
        { label: "Facilities – Oct '26", amount: "AED 3,912.60", code: "3,604.10 AGREED", flag: true },
        { label: "Callout – 12 Oct", amount: "AED 1,427.35", code: "6420-ENG", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 5,339.95" },
      tone: "flag",
      sub: "FLAGGED FOR REVIEW",
      tag: "RATE BREACH, 308.50",
      thinking: "Comparing with the contracted rate...",
      resolved: "Billed above contract. Sent to the controller.",
    },
    {
      supplier: "Thornwick Pest Care",
      date: "22 OCT 2026",
      number: "INV-2026-0966",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8851" },
      ],
      lines: [
        { label: "Quarterly Treatment", amount: "AED 3,618.45", code: "6430-ENG", flag: false },
        { label: "Kitchen Callout", amount: "AED 507.20", code: "6430-ENG", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 4,125.65" },
      tone: "code",
      sub: "AUTO-CODED",
      tag: "CODED, 2 LINES",
      thinking: "Learning from last quarter's coding...",
      resolved: "Coded the way your team coded it before.",
    },
    {
      supplier: "Ashdown Catering Supply",
      date: "23 OCT 2026",
      number: "INV-2026-0971",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8855" },
      ],
      lines: [
        { label: "Banquet Disposables", amount: "AED 2,146.80", code: "5310-FB", flag: false },
        { label: "Chafing Fuel", amount: "AED 384.15", code: "5310-FB", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 2,530.95" },
      tone: "code",
      sub: "MATCHED THREE WAYS",
      tag: "LPO, RECEIPT, INVOICE",
      thinking: "Matching both lines to the goods receipt...",
      resolved: "Both lines match. Cleared.",
    },
    {
      supplier: "Kestrel Laundry Co",
      date: "24 OCT 2026",
      number: "INV-2026-0974",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8858" },
      ],
      lines: [
        { label: "Uniform Laundry – Oct", amount: "AED 1,962.40", code: "6215-HK", flag: false },
        { label: "Uniform Laundry – Oct", amount: "AED 1,962.40", code: "PAID 11 OCT", flag: true },
      ],
      total: { label: "Total Due", amount: "AED 3,924.80" },
      tone: "flag",
      sub: "FLAGGED FOR REVIEW",
      tag: "DUPLICATE, HELD",
      thinking: "Checking against invoices already paid...",
      resolved: "Same line was paid on 11 Oct. Held.",
    },
    {
      supplier: "Marlow Beverage Co",
      date: "25 OCT 2026",
      number: "INV-2026-0979",
      meta: [
        { label: "Payment Terms", value: "Net 45" },
        { label: "LPO Ref", value: "LPO-8862" },
      ],
      lines: [
        { label: "Soft Drinks – Oct '26", amount: "AED 2,884.60", code: "5210-FB", flag: false },
        { label: "Bar Mixers – Oct '26", amount: "AED 943.25", code: "5215-FB", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 3,827.85" },
      tone: "code",
      sub: "AUTO-CODED",
      tag: "CODED, 2 LINES",
      thinking: "Splitting lines across two outlets...",
      resolved: "Coded and split by outlet. Ready to match.",
    },
    {
      supplier: "Pinecrest Maintenance",
      date: "26 OCT 2026",
      number: "INV-2026-0983",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8867" },
      ],
      lines: [
        { label: "HVAC Service – Oct", amount: "AED 4,206.30", code: "6410-ENG", flag: false },
        { label: "Filters × 12", amount: "AED 663.60", code: "10 RECEIVED", flag: true },
      ],
      total: { label: "Total Due", amount: "AED 4,869.90" },
      tone: "flag",
      sub: "FLAGGED FOR REVIEW",
      tag: "SHORT RECEIPT, 2",
      thinking: "Comparing quantities with the goods receipt...",
      resolved: "12 billed, 10 received. Sent for review.",
    },
  ],
  /** The label beside the total on a background card. */
  ghostLabel: "Invoice total",
  /** The three far, blurred cards. They never come forward. */
  ghosts: {
    lakeside: { name: "Lakeside Pool Chem", label: "Invoice total", amount: "AED 2,674.35" },
    ashby: { name: "Ashby Dry Cleaning", label: "Total", amount: "AED 2,346.90" },
    summit: { name: "Halvergate Lift Services", label: "Amount", amount: "AED 3,887.40" },
  },
} as const;
