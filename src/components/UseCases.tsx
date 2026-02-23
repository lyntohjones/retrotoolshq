/**
 * UseCases.tsx
 * Use case cards for social captions, YouTube, essays, speeches, etc.
 */

const useCases = [
  {
    icon: "✦",
    title: "Social Media Captions",
    description:
      "Craft Instagram captions up to 2,200 characters, TikTok captions, and X (Twitter) posts within the 280-character limit. Get instant visual feedback before you publish.",
  },
  {
    icon: "▶",
    title: "YouTube Titles & Descriptions",
    description:
      "YouTube titles are capped at 100 characters — keep them punchy. Descriptions allow up to 5,000 characters. Use the preset to see exactly how much space you have left.",
  },
  {
    icon: "✎",
    title: "Blog Posts & Essays",
    description:
      "Track word count and reading time for blog articles, essays, and long-form content. Use the speaking time estimate to gauge how long it takes to read aloud at events.",
  },
  {
    icon: "◎",
    title: "Speeches & Presentations",
    description:
      "Convert your script into a speaking time estimate at a natural 130 WPM. Perfect for TEDx talks, pitch decks, wedding speeches, and school presentations.",
  },
  {
    icon: "✉",
    title: "Email Copywriting",
    description:
      "Keep subject lines short and punchy. Use the character counter to trim email copy and ensure your CTA hits at the right word count for maximum conversion.",
  },
  {
    icon: "◈",
    title: "SEO Meta Descriptions",
    description:
      "Google's recommended meta description length is around 150–160 characters. Paste your draft and watch the counter help you stay in the sweet spot for search visibility.",
  },
];

export function UseCases() {
  return (
    <section className="py-10 sm:py-14 bg-brand-surface-alt border-y border-brand-border" aria-labelledby="use-cases-heading">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <h2
          id="use-cases-heading"
          className="text-xl sm:text-2xl font-bold text-brand-text mb-2"
        >
          What Can You Use It For?
        </h2>
        <p className="text-brand-muted text-sm mb-8 sm:mb-10 max-w-xl">
          From quick social posts to long-form content — the character counter adapts to your workflow.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-accent/50 transition-colors duration-150"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-brand-accent text-lg font-bold" aria-hidden="true">
                  {uc.icon}
                </span>
                <h3 className="text-sm font-bold text-brand-text">{uc.title}</h3>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">{uc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
