/**
 * Sample data drawn inside the three wells.
 *
 * None of this is page copy and none of it is real: the supplier is invented,
 * the amount and GL codes are illustrative. The captions under each well are
 * page copy and live with the page, not here.
 */

export const formatWell = {
  alt: "Try it: a Choose format menu listing Scan, PDF, JPG, Email and Portal, with Scan selected.",
  title: "Choose format",
  /** `icon` names a drawing in FormatWell; `selected` is the highlighted row. */
  rows: [
    { label: "Scan…", icon: "scan", selected: true },
    { label: "PDF", icon: "pdf", selected: false },
    { label: "JPG", icon: "jpg", selected: false },
    { label: "Email", icon: "email", selected: false },
    { label: "Portal", icon: "portal", selected: false },
  ],
} as const;

export const codingWell = {
  alt: "Illustration of an auto-coded invoice for AED 3,750: Linen & Laundry coded to 6210-HK and Pool Chemicals coded to 6240-ENG.",
  supplier: "Harlow Linen Supply",
  status: "Auto-coded",
  amount: "AED 3,750",
  lines: [
    { category: "Linen & Laundry", code: "6210-HK" },
    { category: "Pool Chemicals", code: "6240-ENG" },
  ],
} as const;

export const systemsWell = {
  alt: "Illustration of the systems an agent works with, shown as generic tiles for ERP, property management, accounting and payments, with procurement, CRM, documents, data, cloud and custom APIs further back, and a confirmation reading Posted, GL updated.",
  /**
   * Generic system categories, never product names (CLAUDE.md §2). Nearest
   * row first; each row further back is smaller and fainter.
   */
  rows: [
    ["ERP", "PMS", "Accounting", "Payments"],
    ["Procurement", "CRM", "Documents"],
    ["Data", "Cloud", "Custom APIs"],
  ],
  posted: "Posted · GL updated",
} as const;
