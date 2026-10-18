# PixelVault — Image Gallery & Photo-Caption Site (Adsterra-ready)

A fast, SEO-optimized photo gallery built with **Next.js 15 (App Router) + Tailwind CSS**, with ready-made slots for every major Adsterra ad format.

## Features

| Area | What you get |
| --- | --- |
| Homepage `/` | Pinterest-style masonry grid, search bar, category chips, numbered pagination (`/?page=2`), 300x250 banner after every 6th photo, Trending + Random widgets |
| Photo page `/photo/[id]` | Priority-loaded image with fullscreen lightbox and click-to-zoom, 200–300 word description, Pinterest/Facebook/Twitter/Telegram share, **Previous/Next photo** (also ← → keys, wraps around endlessly), Native Banner under the image, Download HD + View Full Album CTAs with Direct Links, "You May Also Like" grid, sidebar with 300x250 + Trending + Random |
| Album `/category/[slug]` | Paginated album per category ("View Full Album" target) |
| Download `/download/[id]` | Interstitial with a 300x250 banner and a 5 s countdown, then a real file download via `/api/download/[id]` |
| `/random` | Redirects to a random photo |
| SEO | Per-page `<title>`/description/canonical, OpenGraph + Twitter cards (Pinterest Rich Pins use OG), `ImageObject`, `ImageGallery`, `BreadcrumbList` and `WebSite`+`SearchAction` JSON-LD, `sitemap.xml` with image entries, `robots.txt` |
| Performance | `next/image` (AVIF/WebP, responsive `sizes`, lazy by default), static generation of all photo pages (ISR hourly), system fonts, ads mounted only when scrolled near |

All gallery navigation uses plain `<a>` links rather than client-side routing, **on purpose**: every click is a full page load, so the Adsterra scripts run again and each pageview gets fresh impressions.

## Setup

Requires Node.js 18.18+ (20+ recommended).

```bash
cd OldBanana
npm install
cp .env.example .env.local      # then fill in your values (see below)
npm run dev                     # http://localhost:3000
```

Production:

```bash
npm run build
npm start                       # or deploy to Vercel / any Node host
```

On **Vercel**: import the repo, add the env vars from `.env.example` under Project Settings → Environment Variables, and deploy. `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

Set `NEXT_PUBLIC_SITE_URL` to your real domain (e.g. `https://pixelvault.com`). Canonical URLs, OpenGraph tags and the sitemap depend on it.

## Adsterra setup

1. In Adsterra, add your website and create the ad units you want.
2. For each unit, click **Get code** and copy the value shown below into `.env.local` (or paste it directly into `src/config/ads.ts`).
3. While you're setting up, `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true` draws a dashed box for every empty slot so you can see where ads go. Set it to `false` in production.

| # | Format | Where it appears | What to copy from the Adsterra snippet | Env var |
| --- | --- | --- | --- | --- |
| 1 | Popunder | Root `<head>` (`src/app/layout.tsx`) | `src` of the `<script>` | `NEXT_PUBLIC_ADSTERRA_POPUNDER_SRC` |
| 2 | Social Bar | End of `<body>` (`src/app/layout.tsx`) | `src` of the `<script>` | `NEXT_PUBLIC_ADSTERRA_SOCIALBAR_SRC` |
| 3 | Header banner 728x90 | Above the navigation, ≥768px wide | `'key'` in `atOptions` | `NEXT_PUBLIC_ADSTERRA_BANNER_728X90_KEY` |
| 3 | Header banner 320x50 | Above the navigation, phones | `'key'` in `atOptions` | `NEXT_PUBLIC_ADSTERRA_BANNER_320X50_KEY` |
| 4 | Native Banner | Below the main image on photo pages | `src` of the `<script>` **and** the `id` of the `<div id="container-…">` | `NEXT_PUBLIC_ADSTERRA_NATIVE_SRC`, `NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID` |
| 5 | In-content 300x250 | Every 6th grid item, photo sidebar, download page | `'key'` in `atOptions` | `NEXT_PUBLIC_ADSTERRA_BANNER_300X250_KEY` |
| 6 | Direct Link | "Download HD Quality" / "View Full Album" buttons | the full URL | `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_DOWNLOAD`, `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_ALBUM` |

Banners load from `NEXT_PUBLIC_ADSTERRA_BANNER_HOST` (default `www.highperformanceformat.com`). Change it if the `invoke.js` URL in your snippet uses a different host.

Each slot is marked in the code with a comment like `ADSTERRA SLOT 4: NATIVE BANNER`. Search for `ADSTERRA` to find them all.

### How the pieces work

- **`src/config/ads.ts`** holds every ad code in one place.
- **`<AdsterraBanner size="300x250" />`** (`src/components/ads/AdsterraBanner.tsx`) renders each banner in its own `srcDoc` iframe. Adsterra's banner code uses a global `atOptions` variable, so giving each banner its own iframe lets several share a page. The wrapper reserves the exact banner size, which prevents layout shift. Banners below the fold load only when the visitor scrolls near them (`lazy`).
- **`<HeaderBanner />`** loads either the 728x90 or the 320x50 depending on screen width, never both.
- **`<NativeBanner />`** injects the native script next to its container. Use one per page.
- **`<PopunderScript />` / `<SocialBarScript />`** (`GlobalAdScripts.tsx`) are the global scripts.
- **`<DirectLinkButton slot="download" href="/download/x">`**: on click, it opens the Direct Link in a new tab while the current tab continues to `href`, so the visitor still gets what they clicked. A per-visitor cooldown (`NEXT_PUBLIC_DIRECT_LINK_COOLDOWN_MINUTES`, default 10) stops it from firing on every click. The helpers in `src/lib/directLink.ts` let you attach Direct Links to other elements.

### Ad blockers / missing codes

An empty or blocked slot never breaks the page. The global scripts are optional. A banner box keeps its reserved size, or renders nothing when it isn't configured and placeholders are off. No page code depends on an ad script having loaded.

## Adding your own photos

Edit `src/data/photos.ts`. Each entry needs an `id` (URL slug), `title`, `caption`, `category`, `tags`, `location`, `photographer`, `camera`, `settings`, `story`, `views` and `publishedAt`. For real content, also set:

- `src`, `width`, `height`: the URL of your full-resolution image and its size in pixels. Add the image host to `images.remotePatterns` in `next.config.mjs`.
- `description`: your own 200–300 word write-up. If you leave it out, one is built from the other fields, but unique hand-written text ranks much better.

The demo uses placeholder images from `picsum.photos`, so the pictures won't match the titles until you replace them.

`views` drives the Trending widget. Connect it to your analytics or a database for real numbers. To move to a CMS or database, you only need to change `src/lib/photos.ts`.

Other settings (site name, page size, how often in-grid banners appear) are in `src/config/site.ts`.

## Project structure

```
src/
  app/
    layout.tsx               root layout: popunder, header banner, social bar
    page.tsx                 homepage (search, filters, grid, pagination)
    photo/[id]/page.tsx      single photo page
    category/[slug]/page.tsx album page
    download/[id]/page.tsx   download interstitial
    api/download/[id]/       file download (Content-Disposition)
    random/                  random-photo redirect
    sitemap.ts, robots.ts
  components/
    ads/                     all Adsterra components
    PhotoGrid, PhotoCard, PhotoViewer, PhotoNav, PhotoWidget, ShareButtons, ...
  config/  ads.ts, site.ts
  data/    photos.ts         demo catalogue
  lib/     photos.ts (data access), seo.ts (JSON-LD), directLink.ts
```
