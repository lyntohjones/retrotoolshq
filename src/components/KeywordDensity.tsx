"use client";

/**
 * KeywordDensity.tsx
 * Collapsible accordion panel showing top 10 keywords by frequency.
 * Stop words are excluded. Closed by default.
 */

import { useState } from "react";
import { keywordDensity } from "@/lib/textTools";

interface KeywordDensityProps {
  text: string;
}

export function KeywordDensity({ text }: KeywordDensityProps) {
  const [open, setOpen] = useState(false);

  const keywords = open ? keywordDensity(text, 10) : [];
  const hasText = text.trim().length > 0;

  return (
    <div className="border border-brand-border rounded-xl overflow-hidden">
      {/* Accordion trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          w-full min-h-[44px] px-4 py-3
          flex items-center justify-between gap-3
          bg-brand-surface-alt hover:bg-brand-border/30
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset
          text-left
        "
        aria-expanded={open}
        aria-controls="keyword-density-panel"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-brand-text">Keyword Density</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-accent/20 text-brand-accent font-semibold uppercase tracking-wider">
            Advanced
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-brand-muted transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Panel */}
      <div
        id="keyword-density-panel"
        role="region"
        aria-label="Keyword density results"
        className={`transition-all duration-200 ${open ? "block" : "hidden"}`}
      >
        <div className="p-4 border-t border-brand-border">
          {!hasText ? (
            <p className="text-sm text-brand-muted text-center py-4">
              Enter some text above to see keyword density.
            </p>
          ) : keywords.length === 0 ? (
            <p className="text-sm text-brand-muted text-center py-4">
              No significant keywords found. Try adding more unique words.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold mb-3">
                Top {keywords.length} keywords — common words excluded
              </p>
              <div className="space-y-1.5">
                {keywords.map((entry, i) => (
                  <div key={entry.word} className="flex items-center gap-3">
                    {/* Rank */}
                    <span className="text-xs text-brand-border w-4 shrink-0 tabular-nums font-mono">
                      {i + 1}
                    </span>
                    {/* Word */}
                    <span className="text-sm font-medium text-brand-text w-28 sm:w-36 shrink-0 truncate">
                      {entry.word}
                    </span>
                    {/* Bar */}
                    <div className="flex-1 h-2 bg-brand-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-accent rounded-full"
                        style={{ width: `${Math.min(entry.percentage, 100)}%` }}
                      />
                    </div>
                    {/* Count + % */}
                    <div className="text-right shrink-0 w-20">
                      <span className="text-xs tabular-nums text-brand-text font-semibold">
                        {entry.count}×
                      </span>
                      <span className="text-xs text-brand-muted ml-1.5 tabular-nums">
                        {entry.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
