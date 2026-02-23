/**
 * ToolHeader.tsx
 * H1 heading — visual hierarchy matches mock: large bold headline,
 * teal-accented sub-word, short punchy descriptor, dual CTAs.
 * No new logic — purely typographic treatment.
 */

interface ToolHeaderProps {
  onStartCounting?: () => void;
  onSeePresets?: () => void;
}

export function ToolHeader({ onStartCounting, onSeePresets }: ToolHeaderProps) {
  return (
    <div className="mb-8 text-center sm:text-left">
      {/* Category eyebrow */}
      <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-accent mb-3">
        <span className="inline-block w-5 h-px bg-brand-accent" aria-hidden="true" />
        Social Character Counter
        <span className="inline-block w-5 h-px bg-brand-accent" aria-hidden="true" />
      </p>

      {/* H1 — two-line treatment matching mock */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text tracking-tight leading-[1.1] mb-1">
        Social Character Counter
      </h1>
      <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.1] mb-4">
        <span className="text-brand-text">Built for </span>
        <span className="text-brand-accent">Creators.</span>
      </p>

      {/* Descriptor */}
      <p className="text-sm sm:text-base text-brand-muted max-w-xl leading-relaxed mb-6">
        Instant character limits for X, Instagram, TikTok and YouTube.{" "}
        <span className="text-brand-text font-medium">No sign up. No tracking. Just results.</span>
      </p>

      {/* CTA buttons — scroll to tool or preset section */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        <button
          type="button"
          onClick={onStartCounting}
          className="min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-bold bg-brand-accent text-brand-text border border-brand-accent hover:bg-brand-accent-dark hover:border-brand-accent-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          Start Counting
        </button>
        <button
          type="button"
          onClick={onSeePresets}
          className="min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-bold bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          See All Presets
        </button>
      </div>
    </div>
  );
}
