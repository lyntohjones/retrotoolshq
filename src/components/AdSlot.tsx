"use client";

/**
 * AdSlot.tsx
 * Placeholder ad components. Replace the inner div with AdSense script + ins tags.
 * See README.md "Where to Add AdSense" for the exact replacement code.
 */

interface AdSlotProps {
  variant: "top" | "belowTool" | "sidebar" | "footer";
}

export function AdSlot({ variant }: AdSlotProps) {
  if (variant === "sidebar") {
    // Sidebar: desktop only — hidden on mobile
    return (
      <aside className="hidden lg:block w-[160px] shrink-0">
        <div
          className="sticky top-6 w-[160px] min-h-[600px] border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center gap-2 bg-brand-surface-alt"
          aria-label="Advertisement"
        >
          {/* Replace this placeholder with your AdSense script */}
          <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">
            Advertisement
          </span>
          <span className="text-xs text-brand-border">160×600</span>
        </div>
      </aside>
    );
  }

  if (variant === "top") {
    return (
      <div
        className="w-full min-h-[90px] border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center gap-1 bg-brand-surface-alt"
        aria-label="Advertisement"
      >
        {/* Replace this placeholder with your AdSense script */}
        <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">
          Advertisement
        </span>
        <span className="text-xs text-brand-border">728×90 Leaderboard</span>
      </div>
    );
  }

  if (variant === "belowTool") {
    return (
      <div
        className="w-full min-h-[90px] border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center gap-1 bg-brand-surface-alt"
        aria-label="Advertisement"
      >
        {/* Replace this placeholder with your AdSense script */}
        <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">
          Advertisement
        </span>
        <span className="text-xs text-brand-border">728×90 / Responsive</span>
      </div>
    );
  }

  // footer
  return (
    <div
      className="w-full min-h-[90px] border-2 border-dashed border-brand-border rounded-lg flex flex-col items-center justify-center gap-1 bg-brand-surface-alt"
      aria-label="Advertisement"
    >
      {/* Replace this placeholder with your AdSense script */}
      <span className="text-xs font-medium text-brand-muted uppercase tracking-wider">
        Advertisement
      </span>
      <span className="text-xs text-brand-border">728×90 Footer Banner</span>
    </div>
  );
}
