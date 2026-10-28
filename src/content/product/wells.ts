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
  alt: "Illustration of property-management, ERP and accounting systems fading downward, with a confirmation reading Posted, GL updated.",
  posted: "Posted · GL updated",
} as const;

/**
 * PLACEHOLDER (28 Oct 2026): third-party logo files removed before the repo went public.
 * Replace this visual with generic system tiles (ERP, PMS, Accounting) - see CLAUDE.md §2.
 */
export const vendorLogos = [
  { name: "PMS A", src: "" },
  { name: "PMS B", src: "" },
  { name: "ERP A", src: "" },
  { name: "ERP F", src: "" },
  { name: "ERP E", src: "" },
  { name: "Accounting B", src: "" },
  { name: "Accounting C", src: "" },
  { name: "Accounting D", src: "" },
  { name: "Accounting A", src: "" },
  { name: "ERP B", src: "" },
  { name: "ERP C", src: "" },
  { name: "ERP D", src: "" },
] as const;
