import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | RetroToolsHQ",
  description:
    "RetroToolsHQ privacy policy. No text is stored, no accounts required. All analysis runs locally in your browser.",
  alternates: {
    canonical: "https://www.retrotoolshq.com/privacy",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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

        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text mb-2">Privacy Policy</h1>
        <p className="text-sm text-brand-muted mb-8">Last updated: February 2026</p>

        <div className="prose-custom space-y-8 text-sm sm:text-base text-brand-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">No data collection</h2>
            <p>
              RetroToolsHQ does not collect, store, transmit, or share any text you enter into our
              tools. All character counting, word counting, and text analysis runs entirely in your
              browser using client-side JavaScript. Your text never leaves your device.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">No accounts required</h2>
            <p>
              We do not offer user accounts, logins, or cloud sync. There is no registration
              process and we do not collect email addresses or any personally identifiable
              information (PII).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Analytics</h2>
            <p>
              We use Google Analytics (GA4) to collect anonymous, aggregated usage data such as
              page views, session duration, and button interactions. This data does not include any
              text you type. Analytics events use bucketed text-length ranges (e.g., "1–140
              characters") rather than actual content. You can opt out of Google Analytics by
              installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Advertising</h2>
            <p>
              RetroToolsHQ displays third-party advertisements through Google AdSense. AdSense may
              use cookies to serve ads based on your prior visits to our site and other sites on
              the internet. You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:underline"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Cookies</h2>
            <p>
              Our site does not set first-party cookies. Third-party services (Google Analytics,
              Google AdSense) may set their own cookies as described in their respective privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Children&apos;s privacy</h2>
            <p>
              RetroToolsHQ is not directed at children under 13. We do not knowingly collect any
              information from children.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be reflected by
              updating the "Last updated" date above. Continued use of the site after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Contact</h2>
            <p>
              Questions about this policy? Visit our{" "}
              <Link href="/contact" className="text-brand-accent hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
