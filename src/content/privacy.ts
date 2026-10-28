/**
 * /privacy. A DRAFT privacy notice, not yet approved: the CEO signs it off
 * before launch (checklist A11). It covers the contact form, UAE PDPL, and
 * what the form and its spam check store in the browser.
 *
 * Naming the form provider and the spam check here is the one exception to
 * the no-vendor-names rule (CLAUDE.md §2, owner decision 28 Oct 2026): privacy
 * law requires the processors to be named. Nowhere else on the site.
 *
 * Square brackets in the text mark facts only the company can supply. Each
 * section's `toConfirm` lists what is open in it; both go before approval.
 */

import type { LegalDoc } from "./types";
import { site } from "./site";
import { frameworks } from "./security";

const mail = (address: string) => `[${address}](mailto:${address})`;

export const privacyNotice: LegalDoc = {
  meta: {
    title: "Privacy notice",
    description: "How Algomotive handles personal data collected through this website and its contact form.",
  },
  title: "Privacy notice",
  // PLACEHOLDER: remove `draft` once the CEO approves this notice, and set `updated` to the approval date
  draft: {
    label: "Draft, not yet approved",
    body: "This page is a working draft for review. It is not yet in force, and its wording will change before launch.",
  },
  updated: { label: "Last updated", date: "2026-10-28" },
  intro: [
    "This notice explains what personal data Algomotive collects through this website, why we collect it, who receives it, and the rights you have.",
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        // PLACEHOLDER: the company's registered name, licence number and registered address
        "This website is run by Algomotive [registered company name, licence number and registered address]. In this notice, “we” and “us” mean Algomotive.",
      ],
      toConfirm:
        "The registered company name, licence number and address. Also whether the company is licensed on the UAE mainland or in a free zone with its own data-protection law (DIFC or ADGM). In a free zone, this notice must follow that law instead of the federal one.",
    },
    {
      id: "scope",
      heading: "What this notice covers",
      blocks: [
        "This notice covers this website, including the contact form. It does not cover the Customer Portal, or the personal data we handle for customers when we deliver our services.",
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect",
      blocks: [
        // PLACEHOLDER: the form's fields, exactly as the CRM form has them
        "When you use the contact form, we collect what you enter in it: [the form's fields, for example your name, work email, company and message], and the option you choose under “What do you need?”.",
        "When the contact page loads the form, the form service and its spam check receive standard technical data from your browser: your IP address, browser and device details, the address of the page, and the cookies listed below. The spam check, Google reCAPTCHA, collects hardware and software information, such as device and application data, and sends it to Google for analysis.",
        "This website has no analytics or advertising cookies. It keeps two small items in your browser's own storage, both listed below: your light or dark theme, if you choose one, and a flag that lets the contact page reload once if the form does not appear.",
        "The company that hosts this website may keep standard server logs, such as IP addresses and the pages requested, to run and secure the service.",
      ],
      toConfirm:
        "List the form's fields exactly as the form has them. If analytics or any other tracking is added on the real domain, this section and the cookie table change, and a consent banner comes first.",
    },
    {
      id: "how-we-use-it",
      heading: "How we use it",
      blocks: [
        {
          list: [
            "To reply to your enquiry and continue the conversation you started, for example to arrange a call or prepare a proposal.",
            "To keep a record of our correspondence with you.",
            "To protect the form from spam and abuse.",
          ],
        },
        "We do not sell personal data, and we do not use it to make decisions about you by automated means alone.",
      ],
      toConfirm:
        "Whether enquiries are ever added to marketing emails. If they are, say so here and ask for consent in the form.",
    },
    {
      id: "legal-basis",
      heading: "Why we are allowed to use it",
      blocks: [
        "We use the details in your enquiry because you asked us to reply, and to take the steps you ask for before any agreement with us. Where the law requires your consent, we will ask for it before we collect the data.",
      ],
      toConfirm:
        "Legal counsel to confirm the lawful basis for each use under the law that applies (see “Who we are”), and whether the spam check needs consent.",
    },
    {
      id: "who-receives-it",
      heading: "Who receives it",
      blocks: [
        "We share personal data only with the services that help us run this website and reply to you, and only for that purpose:",
        {
          list: [
            "HubSpot provides the contact form and the customer relationship management system where your enquiry is stored. Our account is set up in HubSpot's EU data region. See [HubSpot's privacy policy](https://legal.hubspot.com/privacy-policy).",
            "Google reCAPTCHA protects the form from spam. Its use is subject to Google's [Privacy Policy](https://policies.google.com/privacy) and [Terms of Service](https://policies.google.com/terms).",
            "The companies that host this website and our email, which process data on our behalf.",
            "Professional advisers, and authorities where the law requires it.",
          ],
        },
      ],
      toConfirm:
        "The data-processing terms in place with each provider, and the data region in the account settings. Once the blog reads posts from HubSpot, images in posts load from HubSpot's file hosting, which receives the reader's IP address: add that here.",
    },
    {
      id: "transfers",
      heading: "Transfers outside the UAE",
      blocks: [
        // PLACEHOLDER: the legal basis relied on for each transfer
        "Your enquiry is stored in HubSpot's EU data region, outside the UAE. reCAPTCHA sends data to Google, which may process it in the United States and other countries. We transfer personal data outside the UAE only where the law allows it [state the basis relied on for each transfer].",
      ],
      toConfirm: "Legal counsel to confirm the basis for each transfer.",
    },
    {
      id: "cookies",
      heading: "Cookies and browser storage",
      blocks: [
        "The table lists what this website stores in your browser. The form's cookies are set only on the contact page, when the form loads.",
        {
          table: {
            caption: "Cookies and browser storage (form cookies to be confirmed on the live demo)",
            head: ["Name", "Set by", "Purpose", "Kept for"],
            rows: [
              ["algo-theme", "This website, in browser storage", "Remembers your light or dark theme, only if you choose one", "Until you clear it"],
              [
                "algo-contact-form-reloaded",
                "This website, in browser storage",
                "Lets the contact page reload once if the form does not appear",
                "Until you close the tab",
              ],
              // PLACEHOLDER: the three rows below are expected, not yet checked on the live demo
              ["__cf_bm", "HubSpot, for the form", "Tells people from bots, to protect the form", "30 minutes"],
              ["_cfuvid", "HubSpot, for the form", "Limits repeated requests, to protect the form", "Until you close the browser"],
              ["_GRECAPTCHA", "Google reCAPTCHA", "Tells people from bots, to protect the form", "6 months"],
            ],
          },
        },
        "These items are needed for the website and the form to work and to protect them from abuse, so they are set without asking first. If you are signed in to a Google account, reCAPTCHA may also read cookies Google has already set in your browser.",
        `You can block or delete cookies in your browser's settings. If you do, the form may not load; you can still email ${mail(site.email.sales)}.`,
      ],
      toConfirm:
        "To be confirmed on the live demo: the form's three cookies in the table below are expected, not yet checked. If the check finds any cookie that is not strictly necessary, the form waits for consent and this wording changes.",
    },
    {
      id: "retention",
      heading: "How long we keep it",
      blocks: [
        // PLACEHOLDER: the retention period for form submissions and correspondence
        "We keep enquiries and our correspondence about them for [retention period], or longer only where the law requires it. Then we delete them.",
      ],
      toConfirm: "Set the retention period, and how old enquiries are deleted from the CRM.",
    },
    {
      id: "security",
      heading: "How we protect it",
      blocks: [
        "We limit who can see your enquiry to the people who need it to reply to you, and we protect it with the access controls of the services listed above.",
      ],
      toConfirm: "Confirm who can see form submissions in the CRM, and that this sentence is true.",
    },
    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        "Under the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021), you can ask us to:",
        {
          list: [
            "tell you what personal data we hold about you, how we use it and who receives it",
            "correct data that is wrong or incomplete",
            "delete your data",
            "limit how we use your data, or stop using it",
            "give you your data in a structured, machine-readable form, or send it to another organisation",
            "review a decision about you that was made by automated means alone",
          ],
        },
        // PLACEHOLDER: the privacy contact address and the response time
        "To make a request, email [privacy contact address]. We may need to confirm who you are first. We will reply within [response time]. If you are not satisfied with our reply, you can complain to the UAE Data Office.",
        // Word for word, wherever a framework is named (CLAUDE.md §2).
        frameworks.disclaimer,
      ],
      toConfirm:
        "Legal counsel to confirm the rights wording and the response time. Choose the privacy contact address (a dedicated address is usual). In a free zone with its own law, the rights and the authority change.",
    },
    {
      id: "children",
      heading: "Children",
      blocks: ["This website is for business audiences. It is not meant for children, and we do not knowingly collect their data."],
    },
    {
      id: "changes",
      heading: "Changes to this notice",
      blocks: ["When this notice changes, we will publish the new version here and update the date at the top."],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [
        "Questions about this notice or your data: [privacy contact address].",
        `Sales enquiries: ${mail(site.email.sales)}. Support for existing customers: ${mail(site.email.helpdesk)}.`,
      ],
    },
  ],
};
