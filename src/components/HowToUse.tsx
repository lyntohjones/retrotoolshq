/**
 * HowToUse.tsx
 * Step-by-step usage guide section.
 */

const steps = [
  {
    num: "01",
    title: "Type or paste your text",
    description:
      "Click inside the text box and start typing, or use the Paste button to bring in text from your clipboard. The counter updates instantly on every keystroke.",
  },
  {
    num: "02",
    title: "Select a platform preset",
    description:
      "Choose X (Twitter), Instagram, TikTok, YouTube Title, or YouTube Description. The progress bar and remaining character count update immediately to show your limit status.",
  },
  {
    num: "03",
    title: "Review your stats",
    description:
      "Check characters (with and without spaces), word count, sentence count, paragraphs, estimated reading time, and estimated speaking time — all updated live.",
  },
  {
    num: "04",
    title: "Clean up or export",
    description:
      "Use Normalize Spaces to fix extra whitespace, Remove Line Breaks to flatten text, or Download Report to save a full stats summary as a .txt file.",
  },
];

export function HowToUse() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="how-to-use-heading">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <h2
          id="how-to-use-heading"
          className="text-xl sm:text-2xl font-bold text-brand-text mb-6 sm:mb-8"
        >
          How to Use the Character Counter
        </h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 list-none">
          {steps.map((step) => (
            <li
              key={step.num}
              className="relative bg-brand-surface border border-brand-border rounded-xl p-5"
            >
              {/* Step number accent */}
              <span className="block text-3xl font-black text-brand-accent/30 leading-none mb-3 font-mono tabular-nums">
                {step.num}
              </span>
              <h3 className="text-sm font-bold text-brand-text mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
