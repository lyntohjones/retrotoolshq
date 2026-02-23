# RetroToolsHQ — Social Character Counter

A production-ready, single-page utility web app built for organic Google traffic and display ad monetization. Features a live Social Character Counter with platform presets for X (Twitter), Instagram, TikTok, and YouTube.

**Brand**: RetroToolsHQ by Retrospect90s00s
**Audience**: Social media creators, marketers, content writers
**Distribution**: 3.6M Facebook · 400K Instagram · 92K TikTok

---

## Project Overview

RetroToolsHQ is a browser-based text analysis tool that requires no signup, no server, and no external APIs. All processing happens client-side in real time. The site is designed to rank on high-intent searches like "character counter for Instagram" and monetize via Google AdSense display ads.

**Key Features:**
- Live character, word, sentence, paragraph, reading time, and speaking time stats
- Platform presets (X, Instagram, TikTok, YouTube Title, YouTube Description)
- Animated progress bar with red state when over limit
- Action buttons: Paste, Copy, Clear, Normalize Spaces, Remove Line Breaks, Download Report
- Keyword Density accordion (top 10 words, stop-word filtered)
- 4 ad slot placeholders (top banner, below tool, sidebar desktop-only, footer)
- SEO-optimized with JSON-LD WebApplication + FAQPage schema

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/your-org/retrotoolshq.git
cd retrotoolshq

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# Open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm run start
```

## Run Tests

```bash
# Run all Vitest unit tests
npm run test

# Watch mode (re-runs on file change)
npm run test:watch
```

## Lint and Format

```bash
# Check for ESLint errors
npm run lint

# Auto-format all files with Prettier
npm run format
```

---

## Deploy to Vercel

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. Framework preset: **Next.js** (auto-detected)
5. No environment variables required for the base build
6. Click **Deploy**

Vercel will auto-deploy on every push to `main`.

---

## Deploy to Cloudflare Pages

```bash
# Install the Cloudflare Next.js adapter
npm install --save-dev @cloudflare/next-on-pages

# Build for Cloudflare
npx @cloudflare/next-on-pages
```

In the Cloudflare Pages dashboard:
- **Build command**: `npx @cloudflare/next-on-pages`
- **Output directory**: `.vercel/output/static`
- **Node.js version**: 20.x

> Note: Cloudflare Pages with `next-on-pages` requires `export const runtime = 'edge'` on any server routes. Since this project is fully client-side with no API routes, no changes are needed.

---

## Where to Add AdSense

Open `src/components/AdSlot.tsx`. Inside each variant, find the comment:

```tsx
{/* Replace this placeholder with your AdSense script */}
```

Replace the placeholder `<div>` with your AdSense snippet. Example:

```tsx
// Before (placeholder):
<div className="flex items-center justify-center w-full h-full text-sm text-brand-muted">
  {/* Replace this placeholder with your AdSense script */}
  <span>Advertisement</span>
</div>

// After (with AdSense):
<>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
    crossOrigin="anonymous"
  />
  <ins
    className="adsbygoogle"
    style={{ display: "block" }}
    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
    data-ad-slot="XXXXXXXXXX"
    data-ad-format="auto"
    data-full-width-responsive="true"
  />
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</>
```

Add AdSense to each variant with the appropriate `data-ad-slot` value from your AdSense dashboard.

---

## Launch Checklist (Social Audience Promotion)

### Pre-Launch
- [ ] Deploy to production URL (e.g., `retrotoolshq.com`)
- [ ] Test on iPhone Safari (mobile layout, tap targets)
- [ ] Test on Android Chrome (mobile layout, clipboard API)
- [ ] Verify Lighthouse scores: Performance 95+, Accessibility 95+, SEO 95+
- [ ] Confirm all 4 ad slots are visible (or replaced with AdSense)
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmasters)

### Facebook (3.6M followers)
- [ ] Share post with link preview — write copy referencing the platform presets
- [ ] Pin the post to the top of the page
- [ ] Add a link sticker to a Story

### Instagram (400K followers)
- [ ] Post a Story with a link sticker pointing to the tool
- [ ] Update link in bio to the tool URL
- [ ] Add a Highlight for the tool Story

### TikTok (92K followers)
- [ ] Record a screen recording demo of the tool (30–60 sec)
- [ ] Add the tool URL to bio
- [ ] Create a pinned comment with the URL on your latest posts

### SEO
- [ ] Verify JSON-LD schema with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check `robots.txt` is accessible at `/robots.txt`
- [ ] Verify `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] Set up Google Analytics 4 (add gtag snippet to `layout.tsx` `<head>` — the analytics helper will auto-detect it)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | Framework + SSG |
| TypeScript (strict) | Type safety |
| Tailwind CSS | Styling |
| Vitest | Unit testing |
| ESLint + Prettier | Code quality |
| Inter (next/font) | Typography |

---

## Known Limitations & Next Steps

- **Clipboard API**: The Paste button requires user permission in browsers. On some mobile browsers it may be restricted — fallback message is shown.
- **AdSense**: Placeholders are in place. Add your AdSense publisher ID when your site is approved.
- **Multi-tool expansion**: The repo is structured to add more tools. Add new pages under `src/app/[tool-slug]/page.tsx` and share the lib/component layer.
- **Sitemap**: Add `next-sitemap` package for auto-generated XML sitemap on build.
- **robots.txt**: Add a `public/robots.txt` file pointing to your sitemap.
