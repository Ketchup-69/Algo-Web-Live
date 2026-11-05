/**
 * Sample data drawn inside the invoice scatter on the AlgoPay page.
 *
 * None of this is page copy and none of it is real: the supplier and customer
 * names, TRNs, document numbers and amounts are invented (CLAUDE.md §1 and
 * §6). Every line is quantity times unit price; VAT is 5% of the subtotal,
 * rounded to the fils; the total is the two added. The check wording is the
 * product dashboard's own ("What the AI checked").
 */

export const invoiceScatter = {
  /** What a screen reader hears in place of the whole visual. */
  alt: "Illustration of a pile of supplier tax invoices. One at a time, an invoice comes forward, the agent reads it and shows what it checked: the purchase order, the goods received, earlier uploads and the VAT.",
  /** The printed labels on the tax invoice. */
  labels: {
    title: "Tax Invoice",
    trn: "TRN",
    billTo: "Bill to",
    invoiceNo: "Invoice no.",
    invoiceDate: "Invoice date",
    dueDate: "Due date",
    lpo: "LPO ref",
    grn: "GRN ref",
    description: "Description",
    qty: "Qty",
    unit: "Unit price",
    amount: "Amount",
    subtotal: "Subtotal",
    vat: "VAT 5%",
    total: "Total",
    currency: "AED",
    checksTitle: "What the AI checked",
  },
  /** The customer every invoice is addressed to. */
  billTo: {name: "Saltreed Hotels LLC", place: "Dubai, United Arab Emirates", trn: "100739264810003"},
  /**
   * The invoices the agent works through, one at a time, for ever. The first
   * is what shows before anything moves, and all that shows with motion
   * reduced. `tone` colours the verdict: "good" for matched, "flag" for one a
   * person has to decide; a flagged check carries the reason in its label.
   */
  cycle: [
  {
    supplier: "Northgate Linen Services",
    trn: "100368215470003",
    number: "INV-2026-0947",
    date: "15 Oct 2026",
    due: "14 Nov 2026",
    lpo: "LPO-8821",
    grn: "GRN-5530",
    lines: [
      {
        description: "Linen laundering, weekly runs",
        qty: "4",
        unit: "782.60",
        amount: "3,130.40"
      },
      {
        description: "Bath towel replacement",
        qty: "20",
        unit: "28.50",
        amount: "570.00"
      },
      {
        description: "Delivery and collection, Oct 2026",
        qty: "1",
        unit: "394.03",
        amount: "394.03"
      }
    ],
    subtotal: "4,094.43",
    vat: "204.72",
    total: "4,299.15",
    tone: "good",
    chip: "Matched by AI",
    thinking: "Reading and checking 14 invoices...",
    resolved: "All four checks passed. Ready to post.",
    checks: [
      {
        label: "Purchase order found",
        value: "LPO-8821",
        flagged: false
      },
      {
        label: "Goods received match the quantities",
        value: "GRN-5530",
        flagged: false
      },
      {
        label: "Not paid or uploaded before",
        value: "No duplicate",
        flagged: false
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  },
  {
    supplier: "Castell F&B Trading",
    trn: "100512947380003",
    number: "INV-2026-0962",
    date: "21 Oct 2026",
    due: "20 Nov 2026",
    lpo: "LPO-8846",
    grn: "GRN-5547",
    lines: [
      {
        description: "Still and sparkling water, cases",
        qty: "36",
        unit: "46.80",
        amount: "1,684.80"
      },
      {
        description: "Fuel levy",
        qty: "1",
        unit: "226.50",
        amount: "226.50"
      }
    ],
    subtotal: "1,911.30",
    vat: "95.57",
    total: "2,006.87",
    tone: "flag",
    chip: "Amount mismatch",
    thinking: "Checking against LPO-8846...",
    resolved: "Fuel levy is not on the LPO. Held for you.",
    checks: [
      {
        label: "Amount is AED 226.50 more than the LPO",
        value: "LPO 1,684.80",
        flagged: true
      },
      {
        label: "Goods received match the quantities",
        value: "GRN-5547",
        flagged: false
      },
      {
        label: "Not paid or uploaded before",
        value: "No duplicate",
        flagged: false
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  },
  {
    supplier: "Bramwell Foodstuff",
    trn: "100294736150003",
    number: "INV-2026-0951",
    date: "18 Oct 2026",
    due: "17 Nov 2026",
    lpo: "LPO-8834",
    grn: "GRN-5539",
    lines: [
      {
        description: "Basmati rice, 25 kg sacks",
        qty: "8",
        unit: "64.25",
        amount: "514.00"
      },
      {
        description: "Olive oil, 5 L tins",
        qty: "6",
        unit: "47.85",
        amount: "287.10"
      }
    ],
    subtotal: "801.10",
    vat: "40.06",
    total: "841.16",
    tone: "good",
    chip: "Matched by AI",
    thinking: "Checking against LPO-8834 and the goods receipt...",
    resolved: "PO, receipt and invoice agree.",
    checks: [
      {
        label: "Purchase order found",
        value: "LPO-8834",
        flagged: false
      },
      {
        label: "Goods received match the quantities",
        value: "GRN-5539",
        flagged: false
      },
      {
        label: "Not paid or uploaded before",
        value: "No duplicate",
        flagged: false
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  },
  {
    supplier: "Fernhill Facilities Mgmt",
    trn: "100847362910003",
    number: "INV-2026-0958",
    date: "20 Oct 2026",
    due: "19 Nov 2026",
    lpo: "LPO-8840",
    grn: "GRN-5544",
    lines: [
      {
        description: "Facilities service, Oct 2026",
        qty: "1",
        unit: "3,912.60",
        amount: "3,912.60"
      },
      {
        description: "Emergency callout, hours",
        qty: "3",
        unit: "185.40",
        amount: "556.20"
      }
    ],
    subtotal: "4,468.80",
    vat: "223.44",
    total: "4,692.24",
    tone: "flag",
    chip: "Amount mismatch",
    thinking: "Comparing with the contracted rate...",
    resolved: "Billed AED 308.50 above contract. Held for you.",
    checks: [
      {
        label: "Purchase order found",
        value: "LPO-8840",
        flagged: false
      },
      {
        label: "Service is AED 308.50 above the contract rate",
        value: "Contract 3,604.10",
        flagged: true
      },
      {
        label: "Not paid or uploaded before",
        value: "No duplicate",
        flagged: false
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  },
  {
    supplier: "Thornwick Pest Care",
    trn: "100625183740003",
    number: "INV-2026-0966",
    date: "22 Oct 2026",
    due: "21 Nov 2026",
    lpo: "LPO-8851",
    grn: "GRN-5552",
    lines: [
      {
        description: "Quarterly pest treatment",
        qty: "1",
        unit: "3,618.45",
        amount: "3,618.45"
      },
      {
        description: "Kitchen callout",
        qty: "2",
        unit: "253.60",
        amount: "507.20"
      }
    ],
    subtotal: "4,125.65",
    vat: "206.28",
    total: "4,331.93",
    tone: "good",
    chip: "Matched by AI",
    thinking: "Reading the invoice lines...",
    resolved: "All four checks passed. Ready to post.",
    checks: [
      {
        label: "Purchase order found",
        value: "LPO-8851",
        flagged: false
      },
      {
        label: "Goods received match the quantities",
        value: "GRN-5552",
        flagged: false
      },
      {
        label: "Not paid or uploaded before",
        value: "No duplicate",
        flagged: false
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  },
  {
    supplier: "Ashdown Catering Supply",
    trn: "100438291650003",
    number: "INV-2026-0971",
    date: "23 Oct 2026",
    due: "22 Nov 2026",
    lpo: "LPO-8855",
    grn: "GRN-5561",
    lines: [
      {
        description: "Banquet disposables, cartons",
        qty: "12",
        unit: "178.90",
        amount: "2,146.80"
      },
      {
        description: "Chafing fuel, cans",
        qty: "45",
        unit: "8.54",
        amount: "384.30"
      }
    ],
    subtotal: "2,531.10",
    vat: "126.56",
    total: "2,657.66",
    tone: "good",
    chip: "Matched by AI",
    thinking: "Matching both lines to the goods receipt...",
    resolved: "PO, receipt and invoice agree.",
    checks: [
      {
        label: "Purchase order found",
        value: "LPO-8855",
        flagged: false
      },
      {
        label: "Goods received match the quantities",
        value: "GRN-5561",
        flagged: false
      },
      {
        label: "Not paid or uploaded before",
        value: "No duplicate",
        flagged: false
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  },
  {
    supplier: "Kestrel Laundry Co",
    trn: "100917453820003",
    number: "INV-2026-0974",
    date: "24 Oct 2026",
    due: "23 Nov 2026",
    lpo: "LPO-8858",
    grn: "GRN-5566",
    lines: [
      {
        description: "Uniform laundry, Oct 2026",
        qty: "1",
        unit: "1,962.40",
        amount: "1,962.40"
      },
      {
        description: "Chef whites, pressing",
        qty: "40",
        unit: "6.85",
        amount: "274.00"
      }
    ],
    subtotal: "2,236.40",
    vat: "111.82",
    total: "2,348.22",
    tone: "flag",
    chip: "Possible duplicate",
    thinking: "Checking against invoices already uploaded...",
    resolved: "Same amount uploaded on 11 Oct. Held for you.",
    checks: [
      {
        label: "Purchase order found",
        value: "LPO-8858",
        flagged: false
      },
      {
        label: "Goods received match the quantities",
        value: "GRN-5566",
        flagged: false
      },
      {
        label: "Same amount uploaded on 11 Oct",
        value: "INV-2026-0912",
        flagged: true
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  },
  {
    supplier: "Marlow Beverage Co",
    trn: "100583617290003",
    number: "INV-2026-0979",
    date: "25 Oct 2026",
    due: "24 Nov 2026",
    lpo: "LPO-8862",
    grn: "GRN-5570",
    lines: [
      {
        description: "Soft drinks, cases",
        qty: "48",
        unit: "60.10",
        amount: "2,884.80"
      },
      {
        description: "Bar mixers, cases",
        qty: "25",
        unit: "37.73",
        amount: "943.25"
      }
    ],
    subtotal: "3,828.05",
    vat: "191.40",
    total: "4,019.45",
    tone: "good",
    chip: "Matched by AI",
    thinking: "Splitting lines across two outlets...",
    resolved: "All four checks passed. Ready to post.",
    checks: [
      {
        label: "Purchase order found",
        value: "LPO-8862",
        flagged: false
      },
      {
        label: "Goods received match the quantities",
        value: "GRN-5570",
        flagged: false
      },
      {
        label: "Not paid or uploaded before",
        value: "No duplicate",
        flagged: false
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  },
  {
    supplier: "Pinecrest Maintenance",
    trn: "100762948130003",
    number: "INV-2026-0983",
    date: "26 Oct 2026",
    due: "25 Nov 2026",
    lpo: "LPO-8867",
    grn: "GRN-5581",
    lines: [
      {
        description: "HVAC service, Oct 2026",
        qty: "1",
        unit: "4,206.30",
        amount: "4,206.30"
      },
      {
        description: "Air filters",
        qty: "12",
        unit: "55.30",
        amount: "663.60"
      }
    ],
    subtotal: "4,869.90",
    vat: "243.50",
    total: "5,113.40",
    tone: "flag",
    chip: "Short receipt",
    thinking: "Comparing quantities with the goods receipt...",
    resolved: "12 filters billed, 10 received. Held for you.",
    checks: [
      {
        label: "Purchase order found",
        value: "LPO-8867",
        flagged: false
      },
      {
        label: "Goods received: 10 of 12 filters",
        value: "GRN-5581",
        flagged: true
      },
      {
        label: "Not paid or uploaded before",
        value: "No duplicate",
        flagged: false
      },
      {
        label: "VAT worked out correctly",
        value: "5%",
        flagged: false
      }
    ]
  }
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
