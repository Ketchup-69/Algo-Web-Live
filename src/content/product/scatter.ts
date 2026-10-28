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
      supplier: "Harlow Linen Supply",
      date: "15 NOV 2024",
      number: "INV-2024-0947",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8821" },
      ],
      lines: [
        { label: "Linen & Laundry – Nov '24", amount: "AED 3,400", code: "6210-HK", flag: false },
        { label: "F&B Supplies – Nov '24", amount: "AED 800", code: "6120-FB", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 4,200" },
      tone: "code",
      sub: "AUTO-CODED",
      tag: "CODED · 2 LINES",
      thinking: "Reading and coding 14 invoices...",
      resolved: "Coded to your GL. Ready to match.",
    },
    {
      supplier: "Castell F&B Trading",
      date: "21 NOV 2024",
      number: "INV-2024-0962",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8846" },
      ],
      lines: [
        { label: "Beverages – Nov '24", amount: "AED 1,630", code: "5210-FB", flag: false },
        { label: "Fuel levy", amount: "AED 220", code: "NOT AGREED", flag: true },
      ],
      total: { label: "Total Due", amount: "AED 1,850" },
      tone: "flag",
      sub: "FLAGGED FOR REVIEW",
      tag: "SURCHARGE · HELD",
      thinking: "Reading the supplier agreement...",
      resolved: "Fuel levy is not in the agreement. Held.",
    },
    {
      supplier: "Bramwell Foodstuff",
      date: "18 NOV 2024",
      number: "INV-2024-0951",
      meta: [
        { label: "Payment Terms", value: "Net 45" },
        { label: "LPO Ref", value: "LPO-8834" },
      ],
      lines: [
        { label: "Dry Goods – Nov '24", amount: "AED 512.30", code: "5110-FB", flag: false },
        { label: "Dairy & Chilled – Nov '24", amount: "AED 276.50", code: "5120-FB", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 788.80" },
      tone: "code",
      sub: "MATCHED THREE WAYS",
      tag: "LPO · RECEIPT · INVOICE",
      thinking: "Checking against LPO-8834 and the goods receipt...",
      resolved: "All 14 lines match. Cleared.",
    },
    {
      supplier: "Fernhill Facilities Mgmt",
      date: "20 NOV 2024",
      number: "INV-2024-0958",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8840" },
      ],
      lines: [
        { label: "Facilities – Nov '24", amount: "AED 3,900", code: "3,600 AGREED", flag: true },
        { label: "Callout – 12 Nov", amount: "AED 1,420", code: "6420-ENG", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 5,320" },
      tone: "flag",
      sub: "FLAGGED FOR REVIEW",
      tag: "RATE BREACH · 300",
      thinking: "Comparing with the contracted rate...",
      resolved: "Billed above contract. Sent to the controller.",
    },
    {
      supplier: "Redwood Pest Control",
      date: "22 NOV 2024",
      number: "INV-2024-0966",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8851" },
      ],
      lines: [
        { label: "Quarterly Treatment", amount: "AED 3,600", code: "6430-ENG", flag: false },
        { label: "Kitchen Callout", amount: "AED 500", code: "6430-ENG", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 4,100" },
      tone: "code",
      sub: "AUTO-CODED",
      tag: "CODED · 2 LINES",
      thinking: "Learning from last quarter's coding...",
      resolved: "Coded the way your team coded it before.",
    },
    {
      supplier: "Ashdown Catering Supply",
      date: "23 NOV 2024",
      number: "INV-2024-0971",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8855" },
      ],
      lines: [
        { label: "Banquet Disposables", amount: "AED 2,140", code: "5310-FB", flag: false },
        { label: "Chafing Fuel", amount: "AED 380", code: "5310-FB", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 2,520" },
      tone: "code",
      sub: "MATCHED THREE WAYS",
      tag: "LPO · RECEIPT · INVOICE",
      thinking: "Matching 9 lines to the goods receipt...",
      resolved: "All 9 lines match. Cleared.",
    },
    {
      supplier: "Kestrel Laundry Co",
      date: "24 NOV 2024",
      number: "INV-2024-0974",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8858" },
      ],
      lines: [
        { label: "Uniform Laundry – Nov", amount: "AED 1,960", code: "6215-HK", flag: false },
        { label: "Uniform Laundry – Nov", amount: "AED 1,960", code: "PAID 11 NOV", flag: true },
      ],
      total: { label: "Total Due", amount: "AED 3,920" },
      tone: "flag",
      sub: "FLAGGED FOR REVIEW",
      tag: "DUPLICATE · HELD",
      thinking: "Checking against invoices already paid...",
      resolved: "Same line was paid on 11 Nov. Held.",
    },
    {
      supplier: "Marlow Beverage Co",
      date: "25 NOV 2024",
      number: "INV-2024-0979",
      meta: [
        { label: "Payment Terms", value: "Net 45" },
        { label: "LPO Ref", value: "LPO-8862" },
      ],
      lines: [
        { label: "Soft Drinks – Nov '24", amount: "AED 2,880", code: "5210-FB", flag: false },
        { label: "Bar Mixers – Nov '24", amount: "AED 940", code: "5215-FB", flag: false },
      ],
      total: { label: "Total Due", amount: "AED 3,820" },
      tone: "code",
      sub: "AUTO-CODED",
      tag: "CODED · 2 LINES",
      thinking: "Splitting lines across two outlets...",
      resolved: "Coded and split by outlet. Ready to match.",
    },
    {
      supplier: "Pinecrest Maintenance",
      date: "26 NOV 2024",
      number: "INV-2024-0983",
      meta: [
        { label: "Payment Terms", value: "Net 30" },
        { label: "LPO Ref", value: "LPO-8867" },
      ],
      lines: [
        { label: "HVAC Service – Nov", amount: "AED 4,200", code: "6410-ENG", flag: false },
        { label: "Filters × 12", amount: "AED 660", code: "10 RECEIVED", flag: true },
      ],
      total: { label: "Total Due", amount: "AED 4,860" },
      tone: "flag",
      sub: "FLAGGED FOR REVIEW",
      tag: "SHORT RECEIPT · 2",
      thinking: "Comparing quantities with the goods receipt...",
      resolved: "12 billed, 10 received. Sent for review.",
    },
  ],
  /** The label beside the total on a background card. */
  ghostLabel: "Invoice total",
  /** The three far, blurred cards. They never come forward. */
  ghosts: {
    lakeside: { name: "Lakeside Pool Chem", label: "Invoice total", amount: "AED 2,670" },
    ashby: { name: "Ashby Dry Cleaning", label: "Total", amount: "AED 2,340" },
    summit: { name: "Summit Elevator Co", label: "Amount", amount: "AED 3,880" },
  },
} as const;
