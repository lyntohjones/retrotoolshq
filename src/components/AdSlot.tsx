"use client";

/**
 * AdSlot.tsx
 * Placeholder ad components. Replace the inner div with AdSense script + ins tags.
 * See README.md "Where to Add AdSense" for the exact replacement code.
 *
 * Layout rules enforced here:
 * - Sidebar: strictly hidden below 1024px (lg breakpoint)
 * - All variants: 24px (p-6) padding around the ad unit
 * - "Advertisement" label always visible
 * - Ads never overlap tool controls — placed in dedicated layout slots
 */

interface AdSlotProps {
  variant: "top" | "belowTool" | "sidebar" | "footer";
}

export function AdSlot({ variant }: AdSlotProps) {
  if (variant === "sidebar") {
    // Sidebar: STRICTLY desktop only — hidden on tablet and mobile
    return (
      <aside className="hidden lg:block w-[160px] shrink-0" aria-label="Advertisement sidebar">
        <div className="sticky top-6 w-[160px] min-h-[600px] p-6 border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center gap-2 bg-brand-surface-alt">
          {/* Replace this placeholder with your AdSense script */}
          <span className="text-xs font-medium text-brand-muted uppercase tracking-wider select-none">
            Advertisement
          </span>
          <span className="text-xs text-brand-border select-none">160×600</span>
        </div>
      </aside>
    );
  }

  if (variant === "top") {
    // Top: below header/H1, above main content — never above page title
    return (
      <div
        className="w-full ad-slot-top"
        aria-label="Advertisement"
        role="complementary"
      >
        <div className="w-full min-h-[90px] p-6 border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center gap-1 bg-brand-surface-alt">
          {/* Replace this placeholder with your AdSense script */}
          <span className="text-xs font-medium text-brand-muted uppercase tracking-wider select-none">
            Advertisement
          </span>
          <span className="text-xs text-brand-border select-none">728×90 Leaderboard</span>
        </div>
      </div>
    );
  }

  if (variant === "belowTool") {
    return (
      <div
        className="w-full ad-slot-below-tool"
        aria-label="Advertisement"
        role="complementary"
      >
        <div className="w-full min-h-[90px] p-6 border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center gap-1 bg-brand-surface-alt">
          {/* Replace this placeholder with your AdSense script */}
          <span className="text-xs font-medium text-brand-muted uppercase tracking-wider select-none">
            Advertisement
          </span>
          <span className="text-xs text-brand-border select-none">728×90 / Responsive</span>
        </div>
      </div>
    );
  }

  // footer
  return (
    <div
      className="w-full ad-slot-footer"
      aria-label="Advertisement"
      role="complementary"
    >
      <div className="w-full min-h-[90px] p-6 border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center gap-1 bg-brand-surface-alt">
        {/* Replace this placeholder with your AdSense script */}
        <span className="text-xs font-medium text-brand-muted uppercase tracking-wider select-none">
          Advertisement
        </span>
        <span className="text-xs text-brand-border select-none">728×90 Footer Banner</span>
      </div>
    </div>
  );
}
