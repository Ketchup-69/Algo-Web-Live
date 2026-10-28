# Handover note

Last updated 28 Oct 2026. Read `CLAUDE.md` first (the rules), then this. Open owner items: `docs/progress.md`.

## What it is

A static site: Next.js with `output: "export"`. No server code. `npm run build` writes plain HTML to `out/`; serve that folder.

- Copy: `src/content/*.ts`. Pages: `src/app/`. Components: `src/components/`.
- Brand tokens: `src/app/globals.css`, `src/lib/tokens.ts`, checked by the contrast gate.
- Illustrations: `src/components/product/`, rules in `docs/product-visuals/README.md`.

## Build

Node 22 LTS and npm. The build needs internet once (it downloads the font, then serves it from the site).

```bash
npm ci
```

```bash
npm run build
```

The build runs the contrast gate first. Never bypass it. `.github/workflows/ci.yml` has the checks worth keeping.

## Going live on a server (Ubuntu)

Target: **Ubuntu 24.04 LTS**. Confirm with `lsb_release -a`; if it says 24.10, reinstall 24.04, because 24.10 no longer gets security updates.

Install:

```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx ufw fail2ban unattended-upgrades git
```

Node 22 is only needed if the site is built on the server (it can also be built elsewhere and `out/` copied up):

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && . ~/.nvm/nvm.sh && nvm install 22
```

Then:

1. **Code changes first** (one commit): leave `NEXT_PUBLIC_BASE_PATH` unset; set `site.url` to `https://www.algomotiveai.com` in `src/content/site.ts`; on launch day remove `robots: { index: false, follow: false }` in `src/app/layout.tsx` and change `disallow: "/"` to `allow: "/"` in `src/app/robots.ts`.
2. **Build** and copy `out/` to `/var/www/algomotive`.
3. **Firewall:** `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`.
4. **DNS:** A records for `algomotiveai.com` and `www` to the VM's IP.
5. **nginx:** the server block below, then `sudo nginx -t && sudo systemctl reload nginx`.
6. **HTTPS:** `sudo certbot --nginx -d algomotiveai.com -d www.algomotiveai.com` (renews by itself).
7. **Check:** every page loads, the four old addresses redirect, the form on `/contact` draws.

```nginx
server {
    server_name www.algomotiveai.com;
    root /var/www/algomotive;
    index index.html;

    location / { try_files $uri $uri/ $uri.html =404; }
    error_page 404 /404.html;

    # Old live-site addresses (permanent).
    location = /ai-agents { return 301 /platform/#agents; }
    location = /products  { return 301 /#products; }
    location = /solutions { return 301 /#industries; }
    location = /resources { return 301 /blog/; }

    location /_next/static/ { add_header Cache-Control "public, max-age=31536000, immutable"; }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml text/plain;

    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
}

server {
    server_name algomotiveai.com;
    return 301 https://www.algomotiveai.com$request_uri;
}
```

Certbot adds the port 443 and HTTP-to-HTTPS lines to both blocks. Don't add a Content-Security-Policy without allowing the form provider and its spam check, or the contact form stops drawing.

## After launch

- **Form:** in the CRM, add the real domain as a site domain (otherwise enquiries go to spam). The CRM account belongs to the company. On the paid plan, set the button to cyan `#38BDF8` with navy `#031522` text.
- **Search Console:** verify the domain and submit `/sitemap.xml`. Then set up the Google Business Profile.
- **Analytics:** none in the demo. Add one tool (the CRM's tracking or GA4, not both) behind a cookie banner, at the slot in `src/app/layout.tsx`, and update the cookie table in `src/content/privacy.ts`.
- **Blog:** set `BLOG_API_TOKEN` (and `BLOG_ID` if more than one blog) in the build environment. Posts appear on the next build.
- **Legal:** `/privacy` and `/terms` are drafts until the CEO approves. Then delete the `draft` block and set `updated` in both content files, and remove the draft check in `ci.yml`.

## Open placeholders

`grep -rn "PLACEHOLDER" src`, 28 Oct 2026:

| Where | What replaces it |
| --- | --- |
| `src/content/site.ts:90` | The real domain |
| `src/content/site.ts:147`, `src/components/layout/Footer.tsx:67` | Public profiles (LinkedIn first) |
| `src/content/site.ts:151` | Footer legal name |
| `src/content/privacy.ts:26`, `src/content/terms.ts:16` | Remove the draft notice on approval |
| `src/content/privacy.ts:40`, `src/content/terms.ts:30` | Registered address |
| `src/content/terms.ts:103` | Governing law and courts |
| `src/content/privacy.ts:57` | The form's exact fields |
| `src/content/privacy.ts:112` | Legal basis for transfers |
| `src/content/privacy.ts:134` | Form cookies, checked on the live site |
| `src/content/privacy.ts:178` | Privacy contact and response time |

## Quality, 28 Oct 2026

- Lighthouse on the export: desktop performance 100, mobile 91 to 97. Accessibility 100, except 96 on home and AlgoPO, where faint sample text sits inside the illustrations (owner kept it; WCAG exempts it). SEO 63 only because the demo is noindex. Contact best practices 77, from the form provider's cookies.
- Clean at 360 / 768 / 1280 / 1920 in both themes. Clickable illustrations are static below 640px.

## Licences

Plus Jakarta Sans: SIL Open Font License 1.1. Icons (`Icon.tsx`): Apache 2.0. Logo, mark and social card: Algomotive's own. No stock, AI-generated or people photos.
