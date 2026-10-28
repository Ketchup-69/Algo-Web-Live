# Progress and open items

Last updated 28 Oct 2026. Read this after `CLAUDE.md` when picking the work up in a new session.

## Where it stands

- Everything lives on `main`. The demo deploys from it automatically: https://ketchup-69.github.io/Algo-Web-Live/ (still noindex).
- Phase 1 (audit), Phase 2 (brand layer) and Phase 3 (live-site copy, nine pages) are done. See `docs/phase-1-audit.md` and `WEBSITE-CHECKLIST.md`.
- `/contact` embeds the CRM form (`src/components/sections/HubSpotContactForm.tsx`, settings in `src/content/contact.ts`). A first test submission arrived; it was filed as spam (see below).

## Owner decisions to keep

- Copy follows the live site exactly, including on approvals: people review exceptions and high-impact decisions; never claim read-only access (`CLAUDE.md` §1).
- Brand colours only. No derived darker shades: on white, text and links are navy; green, cyan and violet appear as fills with navy labels, icons, or text on navy. Neutrals are navy mixed with white.
- No phone number, no floating contact button.
- Contact form: the CRM embed (owner chose it over a custom form). The old email composer is removed; the sales and helpdesk addresses beside the form are the fallback.
- All work goes to `main`, so there is only ever one link to share.
- Commit messages carry no vendor names and no attribution trailer (`CLAUDE.md` §2).

## Open items

Owner, in the CRM:
- Add the demo domain (`ketchup-69.github.io`), and later the real domain, as an additional site domain in the tracking-code settings, so submissions stop being filed as "Unregistered site domain" spam. Release the test submission from spam.
- In the form's Style tab, set the submit button to the brand cyan (#38BDF8) with navy text (#031522); it is still the default orange.
- The "Create your own free forms" badge is the free plan's; it goes once the paid plan includes branding removal. It cannot be hidden from the site's side.

Phase 4 (build):
- Bring the blog back at `/blog` (Ugen wants it). Build it to read posts from the CRM's blog once the paid plan includes it; until then show the live site's line that materials are published only after review and approval.
- Draft privacy and terms pages (marked unapproved). The privacy page must cover the form data and UAE PDPL.
- Check which cookies the form and its reCAPTCHA set on the live demo, then decide: consent before the form loads, or list them as necessary on the privacy page (`CLAUDE.md` §7, checklist A14).

Phase 5 (sweep and handover):
- Name scan: `docs/reference-site-patterns.md` names a competitor; `docs/product-visuals/README.md` and `.claude/agents/product-visual.md` name the design tool and carry a private file key; code comments name the icon set's maker. Clear before the handover zip.
- Write `HANDOVER.md` (`CLAUDE.md` §10). Run Lighthouse on the export.
- Illustrations for AlgoCash, AlgoPay and AlgoCapital AI are still to be drawn.

## Testing note

The build sandbox's network blocks the CRM's form servers and reCAPTCHA, so the real form only loads on the deployed demo. In the sandbox, the embed falls back to the two email addresses, which is the designed behaviour.
