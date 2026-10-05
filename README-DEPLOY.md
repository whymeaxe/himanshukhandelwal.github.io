# Deploying himanshukhandelwal.in on GitHub Pages

## 1. Upload
Put **everything in this folder** in the root of your GitHub repo (the `himanshu` repo that serves
`whymeaxe.github.io/himanshu`), keeping the folder structure (`assets/`, `assets/shots/`).
Do not skip the dotfile `.nojekyll`, or the `CNAME` file.

## 2. Point the domain (at your domain registrar's DNS panel)
Add these records for `himanshukhandelwal.in`:

| Type  | Host | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | whymeaxe.github.io |

(Optional, for IPv6: AAAA records 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153.)

## 3. GitHub settings
Repo -> Settings -> Pages -> Custom domain: `himanshukhandelwal.in` -> Save,
then tick **Enforce HTTPS** once the certificate is ready (can take up to an hour after DNS).

## 4. Tell search engines (do this the day it goes live)
1. **Google Search Console**: add `https://himanshukhandelwal.in/` as a property (DNS TXT verification is easiest),
   then submit `https://himanshukhandelwal.in/sitemap.xml` and use "URL inspection" -> "Request indexing" on the homepage.
2. **Bing Webmaster Tools**: import from Search Console, submit the same sitemap. (Bing also feeds ChatGPT search and other AI tools.)
3. Create a **Google Business Profile** only if you want local "near me" results (needs a real address).

## 5. Settings you can change (top of the script in `index.html`, the `CONFIG` block)
- Already set: `email`, `whatsapp` (+91 7340159100), `instagram`, `linkedin`, `github`.
- Google Analytics ID `G-EWYG3QV7BC` and the cookie banner live in `assets/consent.js` (one place, used by every page).
- `bookingUrl`: optional Cal.com / Calendly link. Until then the main button opens WhatsApp.
- The 8 testimonials: keep only ones each person actually gave or approved.

## 6. Google Analytics settings that must match the Privacy Policy (do this once, in analytics.google.com)
- Admin -> Data collection and modification -> Data retention: set event data retention to **14 months** (the policy says "14 months at most").
- Admin -> Data collection -> turn **Google signals OFF** and do not enable advertising features.
- Admin -> Data sharing settings: untick the optional sharing options you don't need.
- Do not link Google Ads, and do not add other trackers (Meta Pixel etc.) without updating `assets/consent.js` and the Privacy Policy first.

## 7. Legal pages
`privacy.html` and `terms.html` are written for India (DPDP Act 2023, IT Act 2000), the EU/UK (GDPR) and California. They are a solid
professional template, **not a substitute for review by a qualified lawyer**. Have a lawyer check them, especially the governing-law /
court clause, the 3-year retention period and the 30-day response promise, before you rely on them for client contracts.

## What is in this folder
- `index.html`  the site (structured data, FAQ and written content are inside)
- `assets/`  optimised portrait, video (1080p + 720p), poster, project previews, share image
- `robots.txt`, `sitemap.xml`  for search engines (AI crawlers are explicitly allowed)
- `llms.txt`  plain-text summary written for AI assistants
- `404.html`, `favicon.svg`, `favicon-48.png`, `apple-touch-icon.png`, `site.webmanifest`, `CNAME`, `.nojekyll`
