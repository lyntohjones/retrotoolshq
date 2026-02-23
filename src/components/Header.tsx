/**
 * Header.tsx
 * Site header — sticky, with RetroTools|HQ block wordmark treatment.
 * "HQ" renders as a teal filled block (logo-hq-block CSS class).
 */

export function Header() {
  return (
    <header className="w-full bg-brand-surface border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Logo wordmark */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2.5 group" aria-label="RetroToolsHQ home">
            {/* Icon mark — grid of 4 squares, retro feel */}
            <div
              className="relative w-9 h-9 rounded-lg shrink-0 overflow-hidden"
              style={{ background: "#1E2530" }}
              aria-hidden="true"
            >
              {/* 2×2 grid of squares */}
              <div className="absolute inset-0 grid grid-cols-2 gap-[3px] p-[6px]">
                <div className="rounded-sm" style={{ background: "#00E5CC" }} />
                <div className="rounded-sm" style={{ background: "#2E3847" }} />
                <div className="rounded-sm" style={{ background: "#2E3847" }} />
                <div className="rounded-sm" style={{ background: "#00C4AE" }} />
              </div>
            </div>

            {/* Wordmark: "RETROTOOLS" + teal "HQ" block */}
            <div className="flex flex-col leading-none">
              <span className="flex items-baseline gap-0">
                <span className="font-extrabold text-brand-text text-[15px] tracking-tight group-hover:text-brand-text transition-colors">
                  RETROTOOLS
                </span>
                <span className="logo-hq-block text-[13px]">HQ</span>
              </span>
              <span className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest mt-0.5">
                Free Tools
              </span>
            </div>
          </a>
        </div>

        {/* Parent brand — right side */}
        <div className="text-right hidden sm:flex flex-col items-end">
          <p className="text-xs text-brand-muted leading-tight">
            by{" "}
            <span className="font-semibold text-brand-text">Retrospect90s00s</span>
            {/* Dropdown hint */}
            <span className="ml-1 text-brand-border text-[10px]">∨</span>
          </p>
          <p className="text-[10px] text-brand-border mt-0.5 hidden md:block">
            3.6M · 400K · 92K followers
          </p>
        </div>
      </div>
    </header>
  );
}
