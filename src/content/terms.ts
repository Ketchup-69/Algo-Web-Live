/**
 * /terms. DRAFT terms of use for this website, not yet approved: the CEO
 * signs them off before launch (checklist A12). They cover the website only,
 * never the services or the Customer Portal.
 *
 * Square brackets in the text mark facts only the company can supply. Each
 * section's `toConfirm` lists what is open in it; both go before approval.
 */

import type { LegalDoc } from "./types";
import { routes, site } from "./site";

export const termsOfUse: LegalDoc = {
  meta: { title: "Terms of use", description: "The terms of use for the Algomotive website." },
  title: "Terms of use",
  // PLACEHOLDER: remove `draft` once the CEO approves these terms, and set `updated` to the approval date
  draft: {
    label: "Draft, not yet approved",
    body: "This page is a working draft for review. It is not yet in force, and its wording will change before launch.",
  },
  updated: { label: "Last updated", date: "2026-10-28" },
  intro: [
    "These terms apply to your use of this website. By using it, you accept them. If you do not accept them, please do not use the website.",
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        // PLACEHOLDER: the registered address, as on the trade licence
        "This website is run by Algomotive Global Technologies - L.L.C - S.P.C, a company licensed in the United Arab Emirates (trade licence CN-4452938), [registered address]. In these terms, “we” and “us” mean Algomotive.",
      ],
      toConfirm: "The registered address, as it appears on the trade licence.",
    },
    {
      id: "information",
      heading: "Information on this website",
      blocks: [
        "The content of this website is general information about Algomotive and its products. It is not professional, financial, legal or technical advice, and it is not an offer to supply anything.",
        "Workflow behaviour, integration scope and outcome targets are validated for each implementation.",
      ],
    },
    {
      id: "illustrations",
      heading: "Product illustrations",
      blocks: [
        "Product illustrations on this website use sample data. They show how a product works. They do not show real customers, transactions or results.",
      ],
    },
    {
      id: "our-content",
      heading: "Our content and brand",
      blocks: [
        "The Algomotive name and logo, the product names, and the text, design and illustrations of this website belong to Algomotive or to those who licensed them to us. You may view and print pages for your own reference. Do not copy, change or republish them without our written permission.",
      ],
    },
    {
      id: "using-this-website",
      heading: "Using this website",
      blocks: [
        "Please do not:",
        {
          list: [
            "try to gain unauthorised access to the website or the systems behind it",
            "interfere with how it works, or put an unreasonable load on it",
            "send anything harmful, unlawful or misleading through the contact form",
            "use it in any way that breaks the law",
          ],
        },
      ],
    },
    {
      id: "links",
      heading: "Links to other websites",
      blocks: [
        "Links to other websites are there for your convenience. We are not responsible for their content or how they handle your data. These terms do not cover the Customer Portal.",
      ],
    },
    {
      id: "availability",
      heading: "Changes and availability",
      blocks: [
        "We may change, suspend or withdraw any part of this website at any time. We do not promise that it will always be available, complete or free of errors.",
      ],
    },
    {
      id: "liability",
      heading: "Our liability",
      blocks: [
        "As far as the law allows, we are not liable for any loss that comes from using this website or relying on its content. Nothing in these terms limits a liability that the law does not allow us to limit.",
      ],
      toConfirm: "Legal counsel to confirm this clause.",
    },
    {
      id: "your-data",
      heading: "Your personal data",
      blocks: [`Our [privacy notice](${routes.privacy}) explains how we handle personal data collected through this website.`],
    },
    {
      id: "governing-law",
      heading: "Governing law",
      blocks: [
        // PLACEHOLDER: the governing law and the courts, set by legal counsel
        "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of [emirate that issued the trade licence]. The courts of [that emirate] have exclusive jurisdiction over any dispute about them.",
      ],
      toConfirm:
        "Legal counsel to confirm the governing law and the courts. The company is licensed on the mainland, so both follow the emirate that issued the trade licence.",
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      blocks: ["We may update these terms. The new version applies from the date shown at the top of this page."],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [`Questions about these terms: [${site.email.sales}](mailto:${site.email.sales}).`],
    },
  ],
};
