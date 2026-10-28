# Handover note

Draft, kept current until the handover. Last updated 28 Oct 2026.

For the in-house developer taking the site to algomotiveai.com. Read `CLAUDE.md` first (the rules every change must keep), then this file. Open owner items are in `docs/progress.md`.

## What this is

A static marketing site: Next.js (App Router) with `output: "export"`, Tailwind v4 on CSS variables, GSAP for motion. No server, no API routes. Every page is plain HTML in `out/` after a build.

- Copy: `src/content/*.ts`. Components hold no strings.
- Pages: `src/app/`. Building blocks: `src/components/`.
- Brand tokens: `src/app/globals.css` and `src/lib/tokens.ts`, checked by `scripts/check-contrast.mts`.
- Product illustrations: `src/components/product/`, rules in `docs/product-visuals/README.md`.

## Build and deploy

Node 22 and npm.

```bash
npm ci
```

```bash
npm run build
```

`npm run build` runs the contrast gate first, then the export into `out/`. Never bypass the gate. `npm run lint` and `npm run dev` work as usual.

- The build downloads the site's font (Plus Jakarta Sans) once and then serves it from the site itself, so the build machine needs internet access.
- Upload `out/` to any static host. Addresses end in a slash (`/about/`), so the host must serve `index.html` for a folder.
- The demo deploys from `main` through `.github/workflows/deploy.yml`. `.github/workflows/ci.yml` holds the checks worth keeping on any new pipeline: lint, contrast gate, build, every page present, the drafts still marked, and the base path applied once.

## Moving to the real domain, in order

1. **Base path.** Leave `NEXT_PUBLIC_BASE_PATH` unset for a site at the domain root. The demo sets it to `/Algo-Web-Live`.
2. **Site address.** In `src/content/site.ts`, set `site.url` to `https://www.algomotiveai.com`. It feeds the canonical address, the sitemap and the social cards.
3. **Let search engines in.** Remove `robots: { index: false, follow: false }` in `src/app/layout.tsx`, and change `disallow: "/"` to `allow: "/"` in `src/app/robots.ts`. Not before launch day.
4. **Redirects.** Four live-site addresses were folded into other pages. The export forwards them with a small page; on the real host, make them permanent (301) redirects:

   | Old address | New address |
   | --- | --- |
   | `/ai-agents` | `/platform/#agents` |
   | `/products` | `/#products` |
   | `/solutions` | `/#industries` |
   | `/resources` | `/blog/` |

5. **HTTPS** on, with the bare domain redirecting to `www`.
6. **Search Console.** Verify the domain, then submit `https://www.algomotiveai.com/sitemap.xml`. Only after step 3.
7. **Google Business Profile.** Company address and hours, owned by the company account.

## Contact form

The form on `/contact` is a HubSpot embed. Its portal ID, form ID and region are in `src/content/contact.ts` (public by design). The script loads on that page only. If the form cannot load or never draws, the sales and helpdesk addresses take its place.

- **Ownership.** The HubSpot account and its admin login belong to the company, not to one person.
- **Settings in HubSpot:** add the real domain as a site domain in the tracking-code settings (otherwise submissions are filed as spam), and keep reCAPTCHA on, the thank-you message and the notification emails.
- **Paid plan:** the submit button can then be set to the brand cyan `#38BDF8` with navy `#031522` text, and the free-plan badge removed. Neither can be changed from the site.

## Analytics and cookies

The demo has no analytics. The slot is the comment in `src/app/layout.tsx` (search for "Analytics slot").

- Add one tool, HubSpot tracking or GA4, never both, and a cookie banner before it.
- Update the cookie table in `src/content/privacy.ts` at the same time.
- The site itself stores two items in the browser: `algo-theme` (local storage, only after a theme switch) and `algo-contact-form-reloaded` (session storage, only if the form had to reload).

## Blog

`/blog` reads posts from HubSpot's blog at build time (`src/lib/posts.ts`).

- Build environment: `BLOG_API_TOKEN` (a private-app token with read access to blog content; a secret, never in the code) and, with more than one blog, `BLOG_ID`.
- Without the token, the blog shows the live site's "published only after review and approval" line.
- A new post appears on the next build, so rebuild after publishing.
- A bad token fails the build instead of publishing an empty blog.

## Legal pages

`/privacy` and `/terms` are drafts, marked "Draft, not yet approved" and kept out of search. The CEO approves them. On approval: delete the `draft` block and set `updated` in `src/content/privacy.ts` and `src/content/terms.ts`, and remove the draft check in `.github/workflows/ci.yml`. The pages then become indexable and join the sitemap on their own.

## Licences

| Asset | Where | Licence |
| --- | --- | --- |
| Plus Jakarta Sans | `src/lib/fonts.ts`, served from the site | SIL Open Font License 1.1 |
| Icons | inlined in `src/components/product/Icon.tsx`, source noted there | Apache 2.0 |
| Logo and mark | `docs/brand/logo-pack/`, `src/components/layout/Logo.tsx`, `src/app/icon.svg` | Algomotive's own |
| Social card | `src/app/opengraph-image.png` | Algomotive's own, made for this site |

No stock photography, AI-generated images or photos of people anywhere in the repo.

## Open placeholders

From `grep -rn "PLACEHOLDER" src content`, 28 Oct 2026:

| Where | What replaces it |
| --- | --- |
| `src/content/site.ts:90` | `site.url`: the real domain |
| `src/content/site.ts:147` and `src/components/layout/Footer.tsx:67` | LinkedIn and other public profiles, once confirmed |
| `src/content/site.ts:151` | Footer legal line: brand or registered name (owner decision) |
| `src/app/products/[slug]/page.tsx:28` | Illustrations for AlgoCash, AlgoPay and AlgoCapital AI |
| `src/content/privacy.ts:26`, `src/content/terms.ts:16` | Remove the draft notice on approval |
| `src/content/privacy.ts:40`, `src/content/terms.ts:30` | Registered address, as on the trade licence |
| `src/content/terms.ts:103` | Governing law and courts (the emirate that issued the licence) |
| `src/content/privacy.ts:57` | The form's exact fields |
| `src/content/privacy.ts:112` | Legal basis for transfers outside the UAE |
| `src/content/privacy.ts:134` | Form cookies, confirmed on the live site |
| `src/content/privacy.ts:178` | Privacy contact address and response time |

## Known gaps

Sweep of 28 Oct 2026 (checklist A28, A30):

- Layout is clean at 360, 768, 1280 and 1920 in both themes.
- Performance: desktop 96 to 98, mobile 93 to 98 on every page measured.
- Clickable illustrations become static pictures below 640px wide (`src/components/product/InteractiveFrame.tsx`), because their controls would be under the 24px tap-target minimum there.
- Accessibility is 100 except home and AlgoPO at 96: faint sample text inside the illustrations. WCAG exempts text that is part of a picture, and the owner chose to keep it.
- The contact page's layout-shift score depends on the real form, which the build sandbox cannot load. Check it on the live site with PageSpeed Insights.
