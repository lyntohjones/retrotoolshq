/**
 * Header.tsx
 * Site header with logo, retro badge accent, and parent brand tagline.
 */

export function Header() {
  return (
    <header className="w-full bg-brand-surface border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Logo + badge */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 group" aria-label="RetroToolsHQ home">
            {/* Logo mark */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-accent text-brand-text font-bold text-sm shrink-0 shadow-sm">
              <span className="font-bold tracking-tight text-[#1A1A1A]">RT</span>
              {/* Retro scanline accent */}
              <div className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)" }}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-brand-text text-base tracking-tight group-hover:text-brand-accent transition-colors">
                RetroToolsHQ
              </span>
              {/* Retro badge */}
              <span className="inline-flex items-center text-[10px] font-semibold text-brand-accent uppercase tracking-widest">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent mr-1 animate-pulse" />
                Free Tools
              </span>
            </div>
          </a>
        </div>

        {/* Parent brand tagline */}
        <div className="text-right hidden sm:block">
          <p className="text-xs text-brand-muted">
            by{" "}
            <span className="font-semibold text-brand-text">Retrospect90s00s</span>
          </p>
          <p className="text-[10px] text-brand-border mt-0.5 hidden md:block">
            3.6M · 400K · 92K followers
          </p>
        </div>
      </div>
    </header>
  );
}
