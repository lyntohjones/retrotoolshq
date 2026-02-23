import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | RetroToolsHQ",
  description:
    "RetroToolsHQ is a free browser-based character counter for social media creators. Built by Retrospect90s00s.",
  alternates: {
    canonical: "https://www.retrotoolshq.com/about",
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-accent transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to tool
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text mb-6">
          About RetroToolsHQ
        </h1>

        <div className="space-y-6 text-sm sm:text-base text-brand-muted leading-relaxed">
          <p>
            RetroToolsHQ is a collection of free, browser-based utility tools built for social
            media creators, copywriters, marketers, and anyone who works with text at scale. No
            accounts. No subscriptions. No data collection. Just fast, accurate tools that run
            entirely on your device.
          </p>

          <p>
            Our flagship tool is the{" "}
            <Link href="/" className="text-brand-accent hover:underline">
              Social Character Counter
            </Link>{" "}
            — a real-time character and word counter with preset limits for X (Twitter), Instagram,
            TikTok, YouTube titles, and YouTube descriptions. It also tracks word count, sentence
            count, paragraph count, reading time, speaking time, and keyword density.
          </p>

          <h2 className="text-lg font-bold text-brand-text mt-8 mb-3">Why we built this</h2>
          <p>
            Platform character limits change frequently and vary in subtle ways — URLs, emojis, and
            special characters all count differently depending on the platform. We built
            RetroToolsHQ to give creators a single, reliable place to draft and check their content
            before posting.
          </p>

          <h2 className="text-lg font-bold text-brand-text mt-8 mb-3">Privacy first</h2>
          <p>
            Every tool on RetroToolsHQ processes your text locally in the browser. Nothing you
            type is sent to our servers, stored in a database, or shared with third parties. See
            our{" "}
            <Link href="/privacy" className="text-brand-accent hover:underline">
              Privacy Policy
            </Link>{" "}
            for full details.
          </p>

          <h2 className="text-lg font-bold text-brand-text mt-8 mb-3">Built by Retrospect90s00s</h2>
          <p>
            RetroToolsHQ is an indie project by Retrospect90s00s, a small team that builds
            practical web utilities and resources for the creator economy. We&apos;re passionate
            about performance, accessibility, and tools that just work — no bloat, no dark
            patterns, no nonsense.
          </p>

          <div className="mt-10 pt-6 border-t border-brand-border">
            <p className="text-sm">
              Questions or feedback?{" "}
              <Link href="/contact" className="text-brand-accent hover:underline">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
