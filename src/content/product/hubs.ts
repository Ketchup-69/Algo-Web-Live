/**
 * The hub drawings in the Platform, Security and About heroes
 * (src/components/product/OrbitHub.tsx). Each is the agent at the centre and
 * six things around it, in the page's own words. Generic system names only
 * (CLAUDE.md §2): no vendor is named.
 */

import type { FeatureIconName } from "@/components/ui/FeatureIcon";

export type HubSpoke = { title: string; sub: string; icon: FeatureIconName };
export type Hub = { alt: string; centre: string; spokes: HubSpoke[] };

export const platformHub: Hub = {
  alt: "Illustration of the platform: the agent at the centre, exchanging work with six connected systems shown as generic tiles: ERP, property management, accounting, payments, documents, and email and channels.",
  centre: "Agents",
  spokes: [
    { title: "ERP", sub: "System of record", icon: "account_tree" },
    { title: "Property management", sub: "Operations", icon: "hotel" },
    { title: "Accounting", sub: "Ledgers and entities", icon: "calculate" },
    { title: "Payments", sub: "Approved channels", icon: "payments" },
    { title: "Documents", sub: "Invoices and statements", icon: "description" },
    { title: "Email and channels", sub: "Alerts and approvals", icon: "mail" },
  ],
};

export const securityHub: Hub = {
  alt: "Illustration of the controls around every agent action: identity verified, context authorised, policy passed, human approval when required, result validated and audit recorded, each lighting in turn.",
  centre: "Action",
  spokes: [
    { title: "Identity verified", sub: "Every actor", icon: "fingerprint" },
    { title: "Context authorised", sub: "Least privilege", icon: "key" },
    { title: "Policy passed", sub: "Rules and limits", icon: "policy" },
    { title: "Human approved", sub: "When required", icon: "how_to_reg" },
    { title: "Result validated", sub: "Before it is recorded", icon: "task_alt" },
    { title: "Audit recorded", sub: "Full trace", icon: "history" },
  ],
};

export const aboutHub: Hub = {
  alt: "Illustration of how Algomotive works: six principles around the agent, from beginning with the business to measuring operational value.",
  centre: "Algomotive",
  spokes: [
    { title: "Begin with the business", sub: "Outcome first", icon: "target" },
    { title: "Engineer for action", sub: "Not just answers", icon: "rocket_launch" },
    { title: "Preserve human authority", sub: "People decide", icon: "how_to_reg" },
    { title: "Connect existing systems", sub: "Nothing replaced", icon: "hub" },
    { title: "Design control in", sub: "From the start", icon: "policy" },
    { title: "Measure operational value", sub: "Agreed measures", icon: "monitoring" },
  ],
};
