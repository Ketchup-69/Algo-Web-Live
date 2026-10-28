CLAUDE.md — Algomotive Website
Claude Code reads this automatically on every session. Do not delete it between phases.
Revised 28 Oct 2026 by the owner of this build. Where this file conflicts with older notes in README.md or code comments, this file wins.
---
0. The job right now
This repo is a DEMO build of the new Algomotive website, hosted on GitHub Pages under the owner's personal GitHub so the Sales Director can review it.
The plan, in order:
1. Align the site with the content of the live site (algomotiveai.com). The full text of all 13 live pages is in `docs/live-site-content.md`. That file is the source of truth for copy.
2. Keep this repo's existing design system, components and motion wherever they fit. Rebuild a component only when the live content needs something the repo does not have.
3. Apply the company fonts and colours (§4).
4. Work through `WEBSITE-CHECKLIST.md`.
5. When the Sales Director approves, the repo is deleted from GitHub, a zip goes to the Sales Director, and the CEO and the in-house developer take over hosting on the real domain. Leave the code clean enough for them to pick up cold.
The repo is PUBLIC (free GitHub plan). Treat every commit as published to the world.
Current status, owner decisions and open items: `docs/progress.md`. Read it after this file. All work goes to `main` (owner decision, 28 Oct 2026).
---
1. What this is
A marketing site for Algomotive, a UAE company that builds and deploys AI agents for enterprise finance and operations teams. Products: AlgoPO (procurement and accounts payable), AlgoCash (receivables and DSO), AlgoPay (payments), AlgoCapital AI (finance and capital), and Custom AI Solutions. The agents sit on top of the systems a company already runs, read from them, prepare the work, and wait for a human to approve before anything is recorded.
Two jobs, in this order:
Credibility. A CFO or finance director looks Algomotive up after a call or an email. In 30 seconds they conclude: this is a real, serious, technically competent company.
Inbound. Findable in search and in AI-assistant answers, and interesting enough that a cold visitor scrolls the whole thing.
Audience: CFOs, financial controllers, finance managers and IT directors at multi-entity operations in the UAE and GCC: hotel groups, restaurant chains, food distribution, retail, and any company running several entities on one finance team.
Tone: precise, calm, technically literate, zero hype. They are impressed by "read-only, human sign-off, full audit trail", never by "revolutionary".
Owner decision, 28 Oct 2026: on approvals and system access, follow the live site exactly. People review exceptions and sensitive or high-impact decisions (human authority when required); clean items can go straight through. Never claim read-only access. Where the two sentences above say otherwise, this line wins.
---
2. Hard rules — never break these
Algomotive is the only brand name that appears anywhere. No other vendor, platform, partner or parent company is named or shown: not in copy, alt text, metadata, code comments or commit messages. This includes ERP and software vendor names and logos. The vendor logo files were removed on 28 Oct 2026; the integrations list is switched off (`showSystems: false`) and the systems visual in "How it works" is a PLACEHOLDER until it is redrawn with generic system tiles (ERP, PMS, Accounting, Payments).
No customer names, client names or client logos.
No pricing. No numbers, tiers or "starting from". The next step is always a conversation.
No testimonials, case studies or performance metrics presented as real. Sample amounts inside product illustrations are fine only if the illustration is clearly a sample.
Never mention RPA, and never compare AI with RPA. The site reads as AI automation.
Never write that Algomotive is certified or compliant with any standard (ISO, SOC 2, GDPR, PDPL...). Name frameworks only with the live site's disclaimer, word for word (see the end of /security in `docs/live-site-content.md`).
No stock photography, no AI-generated imagery, no people photos.
No secrets in the repo: no API keys, tokens, passwords or .env files. HubSpot portal and form IDs are public by design and are fine.
Anything you are unsure is publishable becomes a placeholder and is flagged in your summary. Never invent a fact about the company.
If a request conflicts with this section, stop and say so instead of complying.
---
3. Stack and constraints
Next.js (App Router) + TypeScript, `output: 'export'`, fully static. Read `AGENTS.md`: this Next.js version differs from training data.
Tailwind CSS v4 with CSS variables as the token layer. GSAP + ScrollTrigger for scroll motion, Framer Motion only if already used for an element; never both on one element.
Deploy target: GitHub Pages via `.github/workflows/deploy.yml`. No API routes, no server actions, no ISR, `images: { unoptimized: true }`.
`NEXT_PUBLIC_BASE_PATH` is the single switch between `user.github.io/<repo>` and a custom domain. The workflow sets it to `/Algo-Web-Live` (repo github.com/Ketchup-69/Algo-Web-Live, demo URL https://ketchup-69.github.io/Algo-Web-Live/). The path is case-sensitive.
DEMO SETTINGS (keep until the move to the real domain): `robots: { index: false, follow: false }` in `src/app/layout.tsx` and `disallow: "/"` in `src/app/robots.ts`. Do not submit the sitemap anywhere. The handover note must tell the in-house team to flip both.
Package manager: npm. `npm run build` runs the contrast gate first. Never bypass it.
---
4. Design direction
Keep the repo's existing layout system, components and motion. Change the brand layer only: palette and fonts.
Colours: the Algomotive brand palette (from the official logo pack). These replace the older blue palette in `src/app/globals.css`, `src/lib/tokens.ts` and the contrast gate. Update all three together.
```css
--algo-navy:   #031522; /* text, dark grounds, the "needs attention" badge */
--algo-green:  #22B573; /* approved, matched, success */
--algo-cyan:   #38BDF8; /* action: primary button fill, focus, links on dark grounds */
--algo-violet: #8B7CFF; /* anything the AI did */
--algo-mint:   #7DE3C3; /* accents on navy grounds */
--algo-white:  #FFFFFF;
```
Neutrals are navy mixed with white (`color-mix(in oklab, ...)`), never a new grey hex. Reference values from the product dashboard kit: page #F5F6F6, line #E1E3E4, strong line #818A90, supporting text #425059, labels #636E76.
Contrast: all body text is navy (or a navy tint that passes 4.5:1). Cyan, green, violet and mint are fills with navy text on them, never body text on white: cyan, green, mint and violet all fail 4.5:1 as text on white. Links on light grounds use navy with an underline or a darker derived cyan that passes the gate.
The brand gradient is green → cyan → violet (the logo's own gradient). Use it for large display type on navy grounds, for hairlines and for the hero wash. On white it fails the 3:1 large-text floor at the cyan and mint stops, so the gate will reject it there.
Light theme is the default. Keep the dark toggle; dark mode uses the navy ground and remaps only the semantic aliases.
Fonts (company rule, 28 Oct 2026): Plus Jakarta Sans for everything on the site: display, headings, body, UI and numbers. Load it through `next/font/google` (`Plus_Jakarta_Sans`, weights 400, 500, 600, 700, 800) in `src/lib/fonts.ts`, which then serves it from the site itself. Replace Manrope and remove JetBrains Mono. Where the old mono face set data (amounts, document numbers), use Plus Jakarta Sans with `font-variant-numeric: tabular-nums`. If Arabic is added later, use IBM Plex Sans Arabic. Never Google Sans or Product Sans.
Anti-patterns that read as AI-generated, avoid them: tracked-out capital eyebrows above every heading; colouring or bolding one word in a headline; 01 / 02 / 03 markers on content that is not a real sequence; every section as an identical rounded card; a → glued to every link; meta strings joined with middle dots; fade-and-slide-up on every section. The live site uses several of these. Keep its words, not those habits.
Product visuals: every illustration is a coded replica built inside a `<Stage>` (`src/components/product/`). Follow `docs/product-visuals/README.md` or use the `product-visual` agent in `.claude/agents/`. Re-colour them through the tokens, never with raw hex.
---
5. Motion rules
All copy exists in the static HTML at load. Motion animates elements already in the DOM. Never gate text behind a scroll trigger.
One orchestrated hero sequence, one signature scroll moment, restraint everywhere else. No scroll-jacking or horizontal-scroll sections.
`prefers-reduced-motion: reduce` disables all non-essential motion and renders the final state. Kill every ScrollTrigger on unmount. Transform and opacity only.
---
6. Content architecture
All user-facing copy lives in `src/content/*.ts` as typed objects. Components hold zero hardcoded strings.
Copy comes from `docs/live-site-content.md`. You may tighten sentences, fix the live-site defects flagged in that file, and adapt British spelling (organisation, prioritise, authorisation, behaviour) consistently, but do not invent claims, numbers or features that are not there.
Page structure: the live site has 13 pages (home, platform, AI agents, products, four product pages, solutions, resources, about, contact, security). This repo is a one-page home plus blog and legal pages. In Phase 1, propose a page map that covers the live content with the fewest pages that still read well, and wait for approval.
Placeholder convention, greppable: `// PLACEHOLDER: <what replaces it>` in code, and `placeholder: true` on filler blocks in content files.
---
7. Forms
The Sales Director wants the contact form to be a HubSpot form embed, so leads land straight in the CRM. Build it like this:
- The owner creates the form in HubSpot and supplies the embed code (portal ID, form ID, region). Until then, render the existing validated form as a PLACEHOLDER and keep the `mailto:` composer as the fallback.
- Load the HubSpot embed script only on pages that show the form, after the cookie choice allows it if the script sets cookies (check what it sets and record it in the privacy page).
- Style the embedded form to match the site's tokens as far as HubSpot allows; record any limits.
- Success state, error state, field validation and spam protection must all work. Spam protection and the thank-you message are HubSpot form settings: list them for the owner to switch on.
- Contact addresses: sales@algomotiveai.com for sales, helpdesk@algomotiveai.com for existing customers. They live in `src/content/site.ts` as single constants. No phone number on the site and no floating contact button (owner decisions, 28 Oct 2026). The HubSpot form comes later; build Phases 2 and 3 without waiting for it.
No analytics in the demo. Leave the single commented slot in the root layout; the handover note says analytics (HubSpot tracking or GA4, one, not both) is added on the real domain with a cookie banner.
---
8. Quality floor
Responsive from 360px up; test 360 / 768 / 1280 / 1920.
Visible keyboard focus, full keyboard navigation, skip link, semantic landmarks, one h1 per page, real heading order.
WCAG 2.2 AA contrast in both themes (the build gate enforces it).
Lighthouse on the static export: 95+ performance, 100 accessibility, 100 SEO (SEO will score lower while the demo is set to noindex; that is expected, say so).
No console errors or hydration warnings. No broken internal links.
---
9. Working style
Phases for this round (BUILD-PROMPTS.md no longer exists; these replace it):
Phase 1 — Audit only, no code changes. Compare every page and section with `docs/live-site-content.md`: matches, missing, conflicts. Mark every item in `WEBSITE-CHECKLIST.md` as exists / missing / not applicable, with the file it lives in. Propose the page map. Stop and wait for approval.
Phase 2 — Brand layer: palette, fonts, contrast gate. Build must pass.
Phase 3 — Content: bring in the live-site copy and the approved page map.
Phase 4 — Checklist items marked "build now", HubSpot form, legal pages as drafts.
Phase 5 — Pre-handover sweep (§10), deploy to GitHub Pages, send the owner the link.
Before writing code in a phase, state the plan in a few lines and wait if anything is ambiguous.
Commit at the end of each phase with a plain message. Never put a vendor name, client name, secret or personal data in a commit message.
After each phase, report: what you built, what you assumed, what is still a placeholder, and anything you think is a bad idea.
The owner wants short, direct answers and one or two steps at a time, not long lists.
---
10. Before every push and before the handover
- Secret scan: no keys, tokens, passwords, .env files or private URLs in the tree or the commit.
- Name scan: no vendor, partner, client or parent-company names (grep the tree, including `public/` and comments).
- Claim scan: no pricing, no "RPA", no "certified" or "compliant", no invented metrics.
- Demo noindex still on.
- Every image and font in the repo is either Algomotive's own or open-licence, with the licence noted.
- `grep -rn "PLACEHOLDER" src content` output is listed in the handover note.
- Handover note (`HANDOVER.md`) covers: how to build and deploy, the custom-domain switch, flipping noindex, analytics and cookie banner, Search Console and sitemap submission, Google Business Profile, HubSpot form ownership, and every open placeholder.
