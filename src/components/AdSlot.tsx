"use client";

/**
 * AdSlot.tsx
 * Live Google AdSense ad units.
 * Publisher: ca-pub-1518235509399666
 *
 * Layout rules:
 * - Sidebar: strictly hidden below 1024px (lg breakpoint)
 * - All variants: 24px padding around ad unit
 * - "Advertisement" label always visible above each unit
 * - Ads never overlap tool controls or textarea
 *
 * Ad format: responsive display ads (data-ad-format="auto")
 * These auto-size to fit the available space in each slot.
 * Once you create manual ad units in AdSense dashboard, replace
 * data-ad-slot="auto" with your specific slot IDs per unit.
 */

import { useEffect } from "react";

interface AdSlotProps {
  variant: "top" | "belowTool" | "sidebar" | "footer";
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

function AdUnit({ slotId, format = "auto", fullWidth = true }: {
  slotId: string;
  format?: string;
  fullWidth?: boolean;
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not loaded yet — Auto Ads will handle it
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1518235509399666"
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={fullWidth ? "true" : "false"}
    />
  );
}

export function AdSlot({ variant }: AdSlotProps) {
  if (variant === "sidebar") {
    return (
      <aside
        className="hidden lg:block w-[160px] shrink-0"
        aria-label="Advertisement sidebar"
      >
        <div className="sticky top-6 w-[160px] min-h-[600px] p-3 flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider select-none w-full text-center">
            Advertisement
          </span>
          <div className="w-full flex-1">
            <AdUnit slotId="auto" format="auto" fullWidth={false} />
          </div>
        </div>
      </aside>
    );
  }

  if (variant === "top") {
    return (
      <div
        className="w-full ad-slot-top"
        aria-label="Advertisement"
        role="complementary"
      >
        <div className="w-full min-h-[90px] p-2 flex flex-col items-center gap-1">
          <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider select-none">
            Advertisement
          </span>
          <div className="w-full">
            <AdUnit slotId="auto" format="auto" />
          </div>
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
        <div className="w-full min-h-[90px] p-2 flex flex-col items-center gap-1">
          <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider select-none">
            Advertisement
          </span>
          <div className="w-full">
            <AdUnit slotId="auto" format="auto" />
          </div>
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
      <div className="w-full min-h-[90px] p-2 flex flex-col items-center gap-1">
        <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider select-none">
          Advertisement
        </span>
        <div className="w-full">
          <AdUnit slotId="auto" format="auto" />
        </div>
      </div>
    </div>
  );
}
