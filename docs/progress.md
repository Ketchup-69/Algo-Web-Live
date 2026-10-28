# Progress and open items

Last updated 28 Oct 2026. Read this after `CLAUDE.md` when picking the work up in a new session.

## Where it stands

- Everything lives on `main`. The demo deploys from it automatically: https://ketchup-69.github.io/Algo-Web-Live/ (still noindex).
- Phase 1 (audit), Phase 2 (brand layer) and Phase 3 (live-site copy, nine pages) are done. See `docs/phase-1-audit.md` and `WEBSITE-CHECKLIST.md`.
- Phase 4, first part, done: draft privacy notice and terms of use (`src/content/privacy.ts`, `src/content/terms.ts`), and the blog back at `/blog` (`src/lib/posts.ts`). The live /resources address now forwards to the blog, which carries that page's copy.
- `/contact` embeds the CRM form (`src/components/sections/HubSpotContactForm.tsx`, settings in `src/content/contact.ts`). A first test submission arrived; it was filed as spam (see below).

## Owner decisions to keep

- Copy follows the live site exactly, including on approvals: people review exceptions and high-impact decisions; never claim read-only access (`CLAUDE.md` §1).
- Brand colours only. No derived darker shades: on white, text and links are navy; green, cyan and violet appear as fills with navy labels, icons, or text on navy. Neutrals are navy mixed with white.
- No phone number, no floating contact button.
- Contact form: the CRM embed (owner chose it over a custom form). The old email composer is removed; the sales and helpdesk addresses beside the form are the fallback.
- All work goes to `main`, so there is only ever one link to share.
- Commit messages carry no vendor names and no attribution trailer (`CLAUDE.md` §2).
- The privacy notice names the form provider and the spam check as processors: the one exception to the no-vendor-names rule (`CLAUDE.md` §2). Leave it in place during the Phase 5 name scan.

## Open items

Owner, in the CRM:
- Add the demo domain (`ketchup-69.github.io`), and later the real domain, as an additional site domain in the tracking-code settings, so submissions stop being filed as "Unregistered site domain" spam. Release the test submission from spam.
- Form styling (button colour) is paywalled on the free plan. On day one of the paid plan, set the submit button to the brand cyan (#38BDF8) with navy text (#031522) in the form's Style tab; until then it stays the default orange. It cannot be restyled from the site's side.
- The "Create your own free forms" badge is the free plan's; it goes once the paid plan includes branding removal. It cannot be hidden from the site's side.

Owner, legal pages:
- The CEO signs off both drafts. Before that, fill every `[bracket]` and clear every "To be confirmed" note (`grep -n "PLACEHOLDER\|toConfirm" src/content/privacy.ts src/content/terms.ts`). Owner confirmed 28 Oct 2026: mainland (so the federal PDPL applies), registered name Algomotive Global Technologies - L.L.C - S.P.C, trade licence CN-4452938, retention 12 months.
- Still needed: registered address; the emirate that issued the licence (sets the terms' governing law and courts); a privacy contact address; response time; transfer basis; the form's exact fields.
- On approval: delete the `draft` block and set `updated` in each file. The page then drops its draft notice, becomes indexable and joins the sitemap on its own. CI checks for the draft notice, so remove that check in `.github/workflows/ci.yml` at the same time.

Owner, cookies:
- Check which cookies the form and its reCAPTCHA set on the live demo. Use a fresh Chrome profile, not a private window (private windows block third-party cookies, which hides most of what the form sets). Open DevTools, Network tab, filter `has-response-header:set-cookie`, then load https://ketchup-69.github.io/Algo-Web-Live/contact/ and wait for the form: each row set a cookie (click it, Cookies tab, for name, domain and expiry). Then Application tab: Cookies, Local storage and Session storage, every origin listed. Submit one test enquiry and check both tabs again (the spam check can run on submit). On the site's own origin expect at most `algo-theme` (only after a theme switch) and `algo-contact-form-reloaded` (only if the form had to reload).
- If all are necessary, update the table in `src/content/privacy.ts` to match what you found and drop its "To be confirmed" note. If any is not necessary, the form waits for consent before it loads (`CLAUDE.md` §7, checklist A14).

Owner, blog (once the paid plan includes the CRM's blog):
- In the CRM, create a private app with read access to blog content and copy its access token.
- In GitHub: Settings, Secrets and variables, Actions. Add the secret `BLOG_API_TOKEN` (the token) and, if the account has more than one blog, the variable `BLOG_ID` (that blog's id).
- After publishing a post, run the deploy workflow by hand (Actions, Deploy to GitHub Pages, Run workflow). Posts are read at build time, so a post appears on the next deploy.
- The blog shows only published posts dated today or earlier; body HTML is cleaned to plain tags, with no scripts, embeds or inline styles. Post images load from the CRM's file hosting: add that to the privacy notice when the first post goes up. Images must still follow `CLAUDE.md` §2 (no stock, AI-generated or people photos).

Phase 4: nothing else is open in the build. The legal pages and the blog wait on the owner items above.

Phase 5 (sweep and handover):
- Sweep done 28 Oct 2026 (checklist A28, A30). Layout clean at every width. The form now falls back to the two addresses when its frame loads but the form inside never draws (seen when a network blocks the provider's file server). Open, for the owner: the home, platform and security heroes hide their paragraph until the opening animation runs, which costs mobile speed (85 to 89 against the 95 target); faint sample text and small tap targets inside the illustrations keep accessibility at 92 to 96 on three pages. Run PageSpeed Insights on the live demo's home and contact pages to confirm the numbers outside the sandbox.
- Name scan: `docs/reference-site-patterns.md` names a competitor; `docs/product-visuals/README.md` and `.claude/agents/product-visual.md` name the design tool and carry a private file key; code comments name the icon set's maker. Clear before the handover zip.
- Write `HANDOVER.md` (`CLAUDE.md` §10). Run Lighthouse on the export.
- Illustrations for AlgoCash, AlgoPay and AlgoCapital AI are still to be drawn.

## Testing note

The build sandbox's network blocks the CRM's form servers and reCAPTCHA, so the real form only loads on the deployed demo. In the sandbox, the embed falls back to the two email addresses, which is the designed behaviour.

The sandbox also blocks the CRM's blog API, so the blog was tested with `BLOG_SAMPLE_FILE` (a JSON file shaped like the API's answer, kept out of the repo): posts render, drafts and future-dated posts are left out, scripts and embeds are stripped. The first real run with a token is on the deployed demo; if the token or the API's answer is wrong, the deploy fails rather than publishing an empty blog.
