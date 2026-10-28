# Website checklist

Owner: the build owner. Created 28 Oct 2026 from three launch checklists, merged and de-duplicated, then sorted into what this demo build does now, what the in-house team does on the real domain, and what is skipped.

Status values: `exists` (already in the repo, say where), `missing`, `done` (built this round), `n/a`. "Repo notes" is what the README says exists; Phase 1 must verify each one in the code, not trust the note.

## A. Build now, in this repo

Phase 1 audit, 28 Oct 2026. Verified in the code and in a baseline build (`npm run build`, base path `/Algo-Web-Live`: contrast gate 39/39 on the old palette, 11 routes, 143 internal links, 0 broken). Partial items are marked `exists (partial)` with what is missing.

| # | Item | Repo notes (unverified) | Status | Where / notes |
|---|---|---|---|---|
| A1 | Unique page title on every page, main keyword plus UAE or Dubai where it reads naturally | metadata in layout.tsx | exists (partial) | `src/app/layout.tsx` template `%s \| Algomotive`; titles are unique but carry no live keyword and no UAE. Rewrite per page from the live titles in Phase 3 |
| A2 | Unique meta description on every page | | exists (partial) | Set on home (`layout.tsx` from `site.description`), `/blog`, posts. Privacy, terms and 404 inherit the home description. Use the live descriptions in Phase 3 |
| A3 | sitemap.xml | src/app/sitemap.ts | exists | `src/app/sitemap.ts` lists `/` and `/blog/` only. Extend to the approved page map |
| A4 | robots.txt | src/app/robots.ts | exists | `src/app/robots.ts`: `disallow: "/"` (demo). Flip at handover |
| A5 | Social preview image (Open Graph) | src/app/opengraph-image.png | done | `src/app/opengraph-image.png`, 1200x630, 196 KB: navy ground, official mark, Plus Jakarta Sans, the live headline. Made in Phase 2 |
| A6 | Favicon | src/app/icon.svg | done | `src/app/icon.svg` is the official mark from `docs/brand/logo-pack/`; the header and footer lockup in `src/components/layout/Logo.tsx` uses the same drawing on tokens |
| A7 | Alt text on every image and illustration | product visuals carry alt | exists | Every visual goes through `src/components/product/Stage.tsx` (`role="img"` or labelled group) with `alt` in `src/content/product/*.ts`; decorative layers are `aria-hidden`. No `<img>` ships today |
| A8 | Compressed images, fast load | static export | exists | `out/` is 2.5 MB; the only raster is the 34 KB social card; fonts 12 to 40 KB each. Lighthouse still to run (A30) |
| A9 | Internal links between pages | | exists (partial) | `src/content/site.ts` `nav` / `footerNav`: home anchors, blog, legal. Rebuild for the page map so every page links onward |
| A10 | Custom 404 page | src/app/not-found.tsx | exists | `src/app/not-found.tsx`, in the new palette and type (Phase 2). Copy still says "The site is a single page": fix with the page map in Phase 3 |
| A11 | Privacy policy page | src/app/privacy (placeholder) | missing | `src/app/privacy/page.tsx` is a one-line placeholder (noindex). DRAFT only, marked unapproved. Must cover the form data and UAE PDPL. The CEO approves before launch |
| A12 | Terms and conditions page | src/app/terms (placeholder) | missing | `src/app/terms/page.tsx`, one-line placeholder. DRAFT only, the CEO approves |
| A13 | Last-updated date on privacy and terms | | missing | |
| A14 | Cookie consent banner | | n/a for now | The demo sets no cookies: theme is in `localStorage`, fonts are self-hosted, no analytics. Re-check when the form script is added; decline by default |
| A15 | Contact form via HubSpot embed | mailto composer exists | missing | `src/components/sections/Contact.tsx` is the `mailto:` composer (keep as placeholder and fallback). It sends to `hello@algomotive.example` in `src/content/site.ts`: must become sales@algomotiveai.com. Waiting on embed code |
| A16 | Form validation | composer validates | exists | `Contact.tsx` `validate()`: required fields, email format, `aria-invalid`, `role="alert"`, focus to the first error |
| A17 | Form success state | | exists (partial) | `Contact.tsx` composer panel ("Your email app should have opened") with copy buttons. Embedded-form success state still to build |
| A18 | Form error state | | exists (partial) | Inline field errors exist. No send-failure state (a `mailto:` cannot report one); build with the embed |
| A19 | Spam protection | | missing | Form setting, owner switches on |
| A20 | One clear call to action per page | | exists (partial) | One action, two labels: "Talk to us" (hero, header) and "Start a conversation" (footer). Live uses "Talk to Algomotive". Other routes have the footer CTA only |
| A21 | Sticky header | | exists | `src/components/layout/Nav.tsx`: `sticky top-0`, fixed `h-16`, only colour transitions, no layout shift |
| A22 | Mobile menu | MobileNav.tsx | exists | `src/components/layout/MobileNav.tsx`: modal sheet, focus trap, Escape, scroll lock |
| A23 | Skip to content link | site.ui.skipToContent | exists | `src/app/layout.tsx` to `#main`; every route's `<main>` has `id="main"` |
| A24 | Hover and focus states | | exists | `focus-visible:outline-ring` in `Button.tsx`, `Link.tsx`, nav, footer, menu. Ring is deep cyan on light (5.13), cyan on navy (6.69), gated |
| A25 | Back-to-top button | site.ui.backToTop | exists | `src/components/layout/Footer.tsx`: in-flow link to `#top`, not a floating button |
| A26 | Expandable FAQ | | n/a | The live site has no FAQ content. Do not invent questions |
| A27 | Colour contrast WCAG 2.2 AA, both themes | contrast gate in build | done | `scripts/check-contrast.mts` + `src/lib/tokens.ts` rebuilt for the new palette: 71/71 pass, light, dark and the navy band, now including the text pairings inside the product visuals |
| A28 | Mobile friendly, 360 to 1920 | | unverified | Responsive grids throughout; not yet tested at 360 / 768 / 1280 / 1920 (Phase 5) |
| A29 | No broken links | | exists | Baseline `out/`: 143 internal links and anchors, 0 broken. Re-run after the page map |
| A30 | Page speed check | | missing | No Lighthouse run yet. Lighthouse report in the Phase 5 summary |
| A31 | No secrets in the frontend or the repo | scanned 28 Oct 2026: none found | exists | Re-scanned 28 Oct 2026: no keys, tokens, passwords or `.env`. See the name-scan notes in `docs/phase-1-audit.md` (design-file key, competitor study) |
| A32 | Dark mode toggle | ThemeToggle.tsx exists | exists | `src/components/ui/ThemeToggle.tsx` + `src/lib/theme.ts` (no-flash script). Re-checked in the new palette: navy ground, gated |
| A33 | Reading progress bar | ReadingProgress.tsx exists | exists | Used only in `src/app/blog/[slug]/page.tsx` |

## B. After launch on the real domain (in-house team, goes in HANDOVER.md)

All `n/a` in this repo: each goes in `HANDOVER.md`, which does not exist yet (Phase 5).

| # | Item | Status | Notes |
|---|---|---|---|
| B1 | Force HTTPS | n/a (handover) | On the real host. GitHub Pages already serves github.io over HTTPS |
| B2 | Google Search Console | n/a (handover) | Verify the domain |
| B3 | Submit the sitemap | n/a (handover) | Only after noindex is removed |
| B4 | Analytics | n/a (handover) | HubSpot tracking or GA4, one of them, with the cookie banner. Slot is the comment in `src/app/layout.tsx` |
| B5 | Google Business Profile | n/a (handover) | Company address and hours, owned by the company account |
| B6 | Backlinks | n/a (handover) | LinkedIn company page, partner pages, directories |
| B7 | UTM tracking | n/a (handover) | Tag links in emails, LinkedIn and campaigns, not in site code |
| B8 | Remove demo noindex | n/a (handover) | `src/app/layout.tsx` robots and `src/app/robots.ts` |

## C. Skipped for this site, with the reason

Verified 28 Oct 2026: none of these exist in the repo. All `n/a`.

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
| D4 Page map | Approved 28 Oct 2026: nine pages, one site, one link. See `docs/phase-1-audit.md` §3 |
