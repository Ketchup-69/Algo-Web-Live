# Phase 1 audit

28 Oct 2026. Audit only: no code changed. Compares the repo with `docs/live-site-content.md` (the source of truth for copy), checks the hard rules in `CLAUDE.md` §2, and proposes the page map. Checklist statuses are in `WEBSITE-CHECKLIST.md`.

Baseline build on 28 Oct 2026: passes. Contrast gate 39/39 (old palette), 11 routes, 143 internal links, 0 broken.

---

## 1. Repo sections against the live site

The repo is one home page (`src/app/page.tsx`) plus blog, privacy, terms and 404. Copy is in `src/content/sections.ts` and `src/content/site.ts`.

| Repo section | Shown | Live counterpart | Verdict |
|---|---|---|---|
| Hero (`Hero.tsx`, `hero`) | yes | Home hero | Conflict. Different h1, sub and CTAs. Live: "Your Business, Engineered to Think." The invoice-scatter visual fits the AlgoPO capture and code stages |
| Logos (`Logos.tsx`, `logos`) | off | none | Repo only. §2 bans client logos outright, so delete it rather than keep it waiting |
| Problem (`Problem.tsx`, `problem`) | yes | About, "The Operational Problem" (closest) | Repo-only copy. Not on the live site |
| How it works (`HowItWorks.tsx`, `howItWorks`) | yes | AlgoPO workflow (Capture, Code, Execute and Record) | Partial match. The three wells line up with three of the eight AlgoPO stages. Read-only claim conflicts (see C2) |
| Agents (`Agents.tsx`, `agents`) | yes | Products (AlgoPO, AlgoCash, AlgoPay, AlgoCapital AI) | Conflict. Four unnamed agents in place of the four named products; Custom AI Solutions missing |
| Proof (inside `Agents.tsx`, `proof`) | yes | "Measurable operations" lists on each product page | Partial match in spirit (measured against a baseline). Live has 7 to 8 named measures per product |
| Governance (`Governance.tsx`, `governance`) | yes | Home "Intelligence with control", /security control pipeline | Partial match. Approval, permissioned retrieval and audit trail all exist on the live site. Data residency and self-hosted inference do not (see C4) |
| Beyond finance (`BeyondFinance.tsx`) | off | /solutions industries | Superseded by the live industry list |
| Integrations (`Integrations.tsx`) | yes, list off | /platform integration network (10 system categories) | Live content fills this with generic categories (ERP, Finance, Procurement, CRM, Payments, Documents, Data, Communication, Cloud, Custom APIs). That is the generic redraw §2 asks for |
| Blog teaser | off | none (live has no blog) | Repo only |
| Contact (`Contact.tsx`, `contact`) | yes | /contact | Conflict. Wrong address, one generic form in place of four request types, no helpdesk or portal |
| Footer (`Footer.tsx`, `site`) | yes | Contact details | Conflict. Placeholder email; no sales / helpdesk split |
| Blog post (`content/posts/...mdx`) | yes, noindex | none | Repo only. Its argument ("draft, do not post") conflicts with straight-through processing on the live site (see C1) |

### Live content with no home in the repo

| Live page | Missing from the repo |
|---|---|
| / | Comparison (generic assistant, point tool, DIY builder, open-ended experiment); "Why Algomotive" six principles; products row with Custom AI Solutions; Three-week Agent Launch with its readiness gate and disclaimer; industries; security teaser; closing CTA |
| /platform | Six capabilities; six architecture layers; agent runtime; architecture principles; integration network and principles with the availability disclaimer; vision video |
| /ai-agents | Agent vs assistant table; five-state lifecycle; agent anatomy (8); multi-agent coordination (8); observability (10); autonomy disclaimer |
| /products | Portfolio intro (mostly repeats home) |
| /products/algopo | Eight-stage AP workflow; six capabilities; nine representative exceptions; seven measures; results disclaimer |
| /products/algocash | All of it. No receivables visual exists |
| /products/algopay | All of it. No payments visual exists |
| /products/algocapital-ai | All of it. No finance and capital visual exists |
| /solutions | Six industry pathways; six delivery principles |
| /resources | Six-step adoption path; brochure request; "published only after approval" note. The rest is links to other pages |
| /about | Five-stage company story; six operating principles; vision; four accountability principles |
| /contact | Four request types; six "starting brief" prompts; sales, helpdesk and customer portal split |
| /security | Eight-step control pipeline; observability trace; ten-step security lifecycle; frameworks with the disclaimer |

### Conflicts the owner has to settle

- **C1. Who approves what.** The repo says a person approves every action ("A person approves every action", "Human approval on every action"), and so does `CLAUDE.md` §1. The live site says "Review exceptions, not every invoice", lists a "Straight-through processing rate" as an AlgoPO measure, and routes only sensitive, exceptional or high-impact decisions to a person ("Human authority: Active, when required"). These cannot both be true.
- **C2. Read-only access.** The repo says agents connect read-only and get write access later, one process at a time. The live site never says read-only. It says least-privilege access and "Execute and Record". Keep only if it is true of real deployments.
- **C3. Product names.** The repo's four agents (Purchase Order, Accounts Payable, Receivables, Cash and DSO) do not match the live products (AlgoPO covers PO and AP; AlgoCash covers receivables and DSO; AlgoPay and AlgoCapital AI have no repo equivalent). A code comment says product names were "taken out (§2)". They are Algomotive's own names and are allowed.
- **C4. Claims not on the live site.** Data residency and model tiering, "self-hosted inference for restricted workloads" (the copy and `DataTiersCard`), and collections forecasts "seven and thirty days out". Drop them unless the owner confirms them.
- **C5. Delivery time.** The repo says "Deployment takes weeks". The live site says three weeks, with a qualifying disclaimer. If the three weeks is used, the disclaimer goes with it.
- **C6. Tone.** The live site has hype lines ("Build Anything. Automate Everything. Scale Limitlessly.") and long noun stacks. §1 asks for zero hype. Plan: keep the live claims and headings, cut the hype line, shorten the lists. Nothing new is invented.
- **C7. Comparison block.** "Point Automation Tool" on the live home page does not say RPA, but it is close. Keep it as written, or cut it to be safe.
- **C8. Contact.** The repo sends to `hello@algomotive.example`. The live site uses sales@algomotiveai.com and helpdesk@algomotiveai.com, plus a customer portal link. Phone: dropped (owner decision), and the repo shows none. That is correct.

### Live-site defects to fix (already flagged in the snapshot)

AlgoCash workflow eyebrow says "Accounts payable"; "Explore ai platform" lower case; About's "Measure Operational Value" card has no body; About's three principle cards repeat one filler line.

---

## 2. Rule scan (§2 and §10)

| Check | Result |
|---|---|
| Secrets | None in the tree: no keys, tokens, passwords or `.env` |
| Pricing, "RPA", "certified", "compliant" | None in shipped code or copy |
| Vendor logos | None. `public/` holds only `.nojekyll` |
| Vendor or third-party names in the tree | Found, none on the rendered page: (a) `docs/reference-site-patterns.md` is a study of a competitor's site and names it throughout; (b) `docs/product-visuals/README.md` and `.claude/agents/product-visual.md` name the design tool and carry the private design-file key; (c) code comments name the icon set's maker (`Icon.tsx`, `FormatWell.tsx`, `sections.ts`) and a search engine (`layout.tsx`). Clear all of it before the handover zip |
| Stale rule override | `Integrations.tsx` comment says "the Phase 1 brief overrides" the vendor rule. No longer true; rewrite it in Phase 3 |
| "Clearly a sample" | The product visuals show invented suppliers and AED amounts with no visible "sample" label. Only the alt text says "Illustration". §2 needs it to be clear on screen |
| Client quotation | `proof.quote` (disabled). §2 bans testimonials; delete it, do not leave it waiting |
| Commit trailers | Both existing commits carry a tool-vendor co-author trailer. Phase commits from now on leave it out (§9) |

---

## 3. Page map proposal

13 live pages become **9**. Legal, blog and 404 are extra.

| # | Route | Built from (live) | Built from (repo) |
|---|---|---|---|
| 1 | `/` | / + /products + /solutions (industries) + /resources (adoption path) | Hero scatter, products row (the agents spine re-labelled), closing CTA |
| 2 | `/platform/` | /platform + /ai-agents | Integrations section, redrawn with the 10 generic system categories |
| 3 | `/products/algopo/` | /products/algopo | How it works wells, statement panel, verification cards, exceptions panel |
| 4 | `/products/algocash/` | /products/algocash | Same template; no visual yet (placeholder) |
| 5 | `/products/algopay/` | /products/algopay | Same template; no visual yet (placeholder) |
| 6 | `/products/algocapital-ai/` | /products/algocapital-ai | Same template; no visual yet (placeholder) |
| 7 | `/security/` | /security + home control teaser | Governance pinned steps (approval, retrieval, audit trail cards); frameworks with the disclaimer word for word |
| 8 | `/about/` | /about + /solutions delivery principles (they repeat About's) | Problem copy retired |
| 9 | `/contact/` | /contact + /resources brochure request | Form with one "What do you need?" field (four live options); `mailto:` stays as the fallback |
| | `/privacy/`, `/terms/` | none | Drafts in Phase 4 |
| | `/blog/` | none | Kept, out of the header until a post is approved |

Why this cut:

- Product pages stay separate. They are the search terms ("AlgoPO", "accounts payable AI UAE"), and each has eight stages, nine exceptions and eight measures. One page for all four would be a wall. One template, four content files.
- Platform and AI Agents merge. Same reader (the IT director), with heavy overlap: the observability list appears word for word on /ai-agents and /security, so it appears once, on /security.
- Security stays on its own page. It is the page that gets forwarded with a vendor questionnaire.
- Contact is its own page, so the form script loads on one route only. That keeps any cookie question to one page (§7).
- Products, Solutions and Resources are mostly cards linking to other pages. Their unique content folds into home, about and contact.

Nav: Platform, Products (a menu of the four products plus Custom AI Solutions), Security, About, then the "Talk to Algomotive" button. The products menu is a new component, because the live content needs one.

**URLs on the real domain.** When this replaces algomotiveai.com, the dropped live URLs (`/ai-agents`, `/products`, `/solutions`, `/resources`) will 404 and lose what they rank for. Static hosting has no server redirects, so ship a small static redirect page at each one (meta refresh + canonical):

| Old URL | Goes to |
|---|---|
| `/ai-agents` | `/platform/` (agents section) |
| `/products` | `/` (products section) |
| `/solutions` | `/` (industries section) |
| `/resources` | `/contact/` |

---

## 4. Needed from the owner before Phase 2

1. Approve or change the page map (§3).
2. The official logo pack as SVG (mark and wordmark). The favicon, header logo and social card all need it. Only the old blue mark is in the repo.
3. Decide C1 (approve every action, or exceptions only) and C2 (read-only). These shape every page's copy.
