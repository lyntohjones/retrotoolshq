import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | RetroToolsHQ",
  description:
    "RetroToolsHQ terms of use. Free browser-based tools provided as-is for personal and commercial use.",
  alternates: {
    canonical: "https://www.retrotoolshq.com/terms",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
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

        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text mb-2">Terms of Use</h1>
        <p className="text-sm text-brand-muted mb-8">Last updated: February 2026</p>

        <div className="space-y-8 text-sm sm:text-base text-brand-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Acceptance of terms</h2>
            <p>
              By using RetroToolsHQ (&quot;the site&quot;, &quot;the tool&quot;), you agree to
              these Terms of Use. If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Use of the service</h2>
            <p>
              RetroToolsHQ provides free, browser-based text analysis tools for personal and
              commercial use. You may use the tools to count characters, words, and analyze text
              for any lawful purpose. You may not use the site to process, transmit, or store
              illegal content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">No warranty</h2>
            <p>
              The tools are provided &quot;as is&quot; without warranty of any kind, express or
              implied. We do not guarantee that character counts will exactly match those reported
              by third-party platforms (X, Instagram, TikTok, YouTube, etc.), as those platforms
              may apply their own encoding rules. Always verify counts in the target platform
              before publishing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, RetroToolsHQ and its operators shall not be
              liable for any indirect, incidental, special, or consequential damages arising from
              your use of the site or reliance on the tool&apos;s output.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Third-party services</h2>
            <p>
              The site uses Google Analytics and Google AdSense. Your interaction with those
              services is governed by Google&apos;s own Terms of Service and Privacy Policy. We
              are not responsible for third-party content or data practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Intellectual property</h2>
            <p>
              The RetroToolsHQ name, logo, brand design, and site content are the property of
              their respective owners. You may not reproduce or redistribute site content without
              permission. Tool output (the results of counting/analyzing your own text) belongs to
              you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Changes to terms</h2>
            <p>
              We may update these Terms of Use at any time. Changes take effect upon posting.
              Continued use of the site constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-text mb-3">Contact</h2>
            <p>
              Questions? Visit our{" "}
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
