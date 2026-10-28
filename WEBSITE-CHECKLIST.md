# Website checklist

Owner: the build owner. Created 28 Oct 2026 from three launch checklists, merged and de-duplicated, then sorted into what this demo build does now, what the in-house team does on the real domain, and what is skipped.

Status values: `exists` (already in the repo, say where), `missing`, `done` (built this round), `n/a`. "Repo notes" is what the README says exists; Phase 1 must verify each one in the code, not trust the note.

## A. Build now, in this repo

| # | Item | Repo notes (unverified) | Status | Where / notes |
|---|---|---|---|---|
| A1 | Unique page title on every page, main keyword plus UAE or Dubai where it reads naturally | metadata in layout.tsx | | Keyword comes from the live site's titles: "Enterprise AI agents", product names, "UAE" |
| A2 | Unique meta description on every page | | | Live site descriptions are in docs/live-site-content.md |
| A3 | sitemap.xml | src/app/sitemap.ts | | Must list every page in the final page map |
| A4 | robots.txt | src/app/robots.ts | | DEMO: disallow all. Flip at handover |
| A5 | Social preview image (Open Graph) | src/app/opengraph-image.png | | Re-make in the new brand colours and Plus Jakarta Sans |
| A6 | Favicon | src/app/icon.svg | | Use the Algomotive mark from the logo pack |
| A7 | Alt text on every image and illustration | product visuals carry alt | | Decorative images get empty alt |
| A8 | Compressed images, fast load | static export | | Check sizes in out/, Lighthouse 95+ |
| A9 | Internal links between pages | | | Every page links onward, footer links all pages |
| A10 | Custom 404 page | src/app/not-found.tsx | | Restyle to brand |
| A11 | Privacy policy page | src/app/privacy (placeholder) | | DRAFT only, marked unapproved. Must cover the HubSpot form data and UAE PDPL. the CEO approves before launch |
| A12 | Terms and conditions page | src/app/terms (placeholder) | | DRAFT only, the CEO approves |
| A13 | Last-updated date on privacy and terms | | | |
| A14 | Cookie consent banner | | | Needed only if the demo sets cookies (HubSpot form script). Check and decide; decline by default |
| A15 | Contact form via HubSpot embed | mailto composer exists | | See CLAUDE.md §7. Owner supplies embed code |
| A16 | Form validation | composer validates | | |
| A17 | Form success state | | | HubSpot thank-you message, or inline state |
| A18 | Form error state | | | |
| A19 | Spam protection | | | HubSpot form setting, owner switches on |
| A20 | One clear call to action per page | | | "Talk to Algomotive" or the page's own CTA from the live site |
| A21 | Sticky header | | | Must not shift layout |
| A22 | Mobile menu | MobileNav.tsx | | |
| A23 | Skip to content link | site.ui.skipToContent | | |
| A24 | Hover and focus states | | | Visible keyboard focus on everything |
| A25 | Back-to-top button | site.ui.backToTop | | |
| A26 | Expandable FAQ | | | Only if there is real FAQ content; do not invent questions |
| A27 | Colour contrast WCAG 2.2 AA, both themes | contrast gate in build | | Re-run after the palette change |
| A28 | Mobile friendly, 360 to 1920 | | | |
| A29 | No broken links | | | Check every internal link and anchor in out/ |
| A30 | Page speed check | | | Lighthouse report in the Phase 5 summary |
| A31 | No secrets in the frontend or the repo | scanned 28 Oct 2026: none found | | Re-scan before every push |
| A32 | Dark mode toggle | ThemeToggle.tsx exists | | Keep, re-check in new palette |
| A33 | Reading progress bar | ReadingProgress.tsx exists | | Blog posts only, nowhere else |

## B. After launch on the real domain (in-house team, goes in HANDOVER.md)

| # | Item | Notes |
|---|---|---|
| B1 | Force HTTPS | On the real host. GitHub Pages already serves github.io over HTTPS |
| B2 | Google Search Console | Verify the domain |
| B3 | Submit the sitemap | Only after noindex is removed |
| B4 | Analytics | HubSpot tracking or GA4, one of them, with the cookie banner |
| B5 | Google Business Profile | Company address and hours, owned by the company account |
| B6 | Backlinks | LinkedIn company page, partner pages, directories |
| B7 | UTM tracking | Tag links in emails, LinkedIn and campaigns, not in site code |
| B8 | Remove demo noindex | layout.tsx robots and robots.ts |

## C. Skipped for this site, with the reason

| Item | Why |
|---|---|
| Site search | Small site, nothing to search |
| Password visibility toggle | No logins on the marketing site (the customer portal is separate) |
| Copy button | No code or long references to copy (the mailto fallback already has one) |
| Print stylesheet | Nobody prints a marketing site |
| Scroll progress bar on every page | Gimmick; kept on blog posts only |
| Confirmation pop-ups | No destructive actions on the site |
| Heavy loading animations | Hurt speed and read as gimmicky; the hero sequence is the one motion moment |

## D. Owner to decide

| Item | Question |
|---|---|
| D1 Floating contact button | Decided 28 Oct 2026: no |
| D2 Announcement banner | Thin bar at the top (for example a launch or event note): yes or no, and the text |
| D3 Phone number | Decided 28 Oct 2026: no phone number on the site. Do not use "800 ALGOMOTIVE" (unconfirmed). Email only |
| D4 Page map | Phase 1 proposes it, owner approves |
