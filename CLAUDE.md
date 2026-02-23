# RetroToolsHQ — CLAUDE.md

## Project Name & Purpose
RetroToolsHQ is a single-page utility web app featuring a Social Character Counter.
Built to rank on organic Google traffic and monetize via display ads (AdSense placeholders for now).
Target audience: social media creators, marketers, content writers.
Brand parent: Retrospect90s00s (3.6M Facebook, 400K Instagram, 92K TikTok).

## Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript strict mode
- **Styling**: Tailwind CSS (utility classes only, no inline styles)
- **Testing**: Vitest
- **Linting**: ESLint + Prettier
- **Fonts**: Inter via `next/font/google`
- **Deployment**: Vercel or Cloudflare Pages

## Key Commands
```bash
npm run dev        # Start local dev server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server
npm run test       # Run Vitest tests
npm run test:watch # Watch mode tests
npm run lint       # ESLint check
npm run format     # Prettier format all files
```

## File Structure
```
retrotoolshq/
├── public/                    # Static assets (favicon.ico)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout: metadata, JSON-LD, Inter font
│   │   ├── page.tsx           # Single page: assembles all sections
│   │   └── globals.css        # Tailwind directives + custom CSS vars
│   ├── components/
│   │   ├── Header.tsx         # Logo + "by Retrospect90s00s" tagline
│   │   ├── Footer.tsx         # Links: About, Contact, Privacy, Terms
│   │   ├── ToolHeader.tsx     # H1 + tool description
│   │   ├── TextArea.tsx       # Main textarea input component
│   │   ├── StatsCards.tsx     # Live stats grid (chars, words, sentences…)
│   │   ├── PresetSelector.tsx # Platform preset buttons with progress bar
│   │   ├── ProgressBar.tsx    # Animated char-usage progress bar
│   │   ├── ActionBar.tsx      # Paste, Copy, Clear, Normalize, Download
│   │   ├── KeywordDensity.tsx # Collapsible accordion: top 10 keywords
│   │   ├── AdSlot.tsx         # Ad placeholder component (4 variants)
│   │   ├── HowToUse.tsx       # 3-4 step usage guide section
│   │   ├── UseCases.tsx       # Use case cards section
│   │   └── FAQ.tsx            # FAQ accordion with JSON-LD schema
│   ├── lib/
│   │   ├── textTools.ts       # Pure text analysis functions
│   │   ├── presets.ts         # Platform preset config (limits + labels)
│   │   └── analytics.ts       # gtag event helper (no-op if gtag absent)
│   └── tests/
│       └── textTools.test.ts  # Vitest unit tests for all lib functions
├── CLAUDE.md
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── vitest.config.ts
├── .eslintrc.json
└── .prettierrc
```

## Coding Conventions
- **TypeScript strict**: `"strict": true` in tsconfig — no implicit `any`
- **Tailwind only**: All styling via Tailwind utility classes. No inline `style={}` props.
- **Components**: PascalCase filenames and function names
- **Exports**: Named exports for all components and lib functions
- **Imports**: Use `@/` alias (maps to `src/`) for all internal imports
- **No external heavy libs**: No jQuery, Lodash, Moment, etc.
- **Client components**: Mark with `"use client"` only when using hooks/browser APIs

## Architecture Notes
- **All text processing**: Lives exclusively in `src/lib/textTools.ts` as pure functions
- **All analytics**: Fired only through `src/lib/analytics.ts` — never call gtag directly
- **All presets**: Defined as typed config object in `src/lib/presets.ts`
- **Ad slots**: `AdSlot.tsx` handles all 4 variants — replace placeholder div with AdSense script
- **State**: All tool state managed in `page.tsx` or a dedicated hook; components are controlled
- **No SSR data fetching**: Everything runs client-side; no server actions needed

## Design Tokens
| Token         | Value      |
|---------------|------------|
| Background    | #F8F7F4    |
| Text          | #1A1A1A    |
| Accent        | #00E5CC    |
| Accent Dark   | #00C4AE    |
| Border        | #E5E3DE    |
| Error         | #EF4444    |

## AdSense Integration
When ready to monetize, open `src/components/AdSlot.tsx` and replace the placeholder `<div>` inside each variant with the AdSense `<script>` + `<ins>` tags provided by Google.
