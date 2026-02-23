import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | RetroToolsHQ",
  description:
    "Contact RetroToolsHQ for feedback, bug reports, or general inquiries about our free text tools.",
  alternates: {
    canonical: "https://www.retrotoolshq.com/contact",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
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

        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text mb-2">Contact</h1>
        <p className="text-sm text-brand-muted mb-10">
          Have feedback, found a bug, or want to suggest a feature? We&apos;d love to hear from
          you.
        </p>

        <div className="space-y-8 text-sm sm:text-base text-brand-muted leading-relaxed">
          <section className="bg-brand-surface border border-brand-border rounded-xl p-6">
            <h2 className="text-base font-bold text-brand-text mb-2">Bug reports &amp; feedback</h2>
            <p className="mb-4">
              Found a counting discrepancy, a broken layout, or have a suggestion to improve the
              tool? Open an issue on GitHub:
            </p>
            <a
              href="https://github.com/lyntohjones/retrotoolshq/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-accent text-brand-text text-sm font-semibold hover:bg-brand-accent-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Open a GitHub Issue
            </a>
          </section>

          <section className="bg-brand-surface border border-brand-border rounded-xl p-6">
            <h2 className="text-base font-bold text-brand-text mb-2">
              Advertising &amp; partnerships
            </h2>
            <p>
              Interested in advertising on RetroToolsHQ or exploring partnership opportunities?
              Please open a GitHub issue with the label &quot;partnership&quot; and include your
              contact details.
            </p>
          </section>

          <section className="bg-brand-surface border border-brand-border rounded-xl p-6">
            <h2 className="text-base font-bold text-brand-text mb-2">Privacy concerns</h2>
            <p>
              For privacy-related inquiries, please review our{" "}
              <Link href="/privacy" className="text-brand-accent hover:underline">
                Privacy Policy
              </Link>{" "}
              first. If you still have questions, open a GitHub issue with the label
              &quot;privacy&quot;.
            </p>
          </section>

          <p className="text-xs text-brand-border pt-4">
            Response time is typically within 2–5 business days. RetroToolsHQ is an indie project
            — we appreciate your patience.
          </p>
        </div>
      </div>
    </main>
  );
}
