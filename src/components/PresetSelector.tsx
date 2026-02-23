"use client";

/**
 * PresetSelector.tsx
 * Platform preset pills — stronger active state with teal glow ring.
 * Active: solid teal fill + .preset-pill-active shadow from globals.css.
 * Inactive: clean surface + border, hover lifts to teal.
 */

import { PRESETS, type Preset } from "@/lib/presets";
import { ProgressBar } from "./ProgressBar";

interface PresetSelectorProps {
  selectedId: string;
  charCount: number;
  onSelect: (preset: Preset) => void;
}

export function PresetSelector({ selectedId, charCount, onSelect }: PresetSelectorProps) {
  const selected = PRESETS.find((p) => p.id === selectedId);

  return (
    <div className="space-y-3">
      {/* Preset pill buttons */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Platform presets">
        {PRESETS.map((preset) => {
          const isActive = preset.id === selectedId;
          const isOver = charCount > preset.limit;

          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              aria-pressed={isActive}
              className={[
                "min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
                isActive
                  ? isOver
                    ? "bg-brand-error border-brand-error text-white preset-pill-active"
                    : "bg-brand-accent border-brand-accent text-brand-text preset-pill-active"
                  : isOver
                  ? "bg-brand-error-light border-brand-error text-brand-error hover:bg-red-100"
                  : "bg-brand-surface border-brand-border text-brand-text hover:border-brand-accent hover:text-brand-accent",
              ].join(" ")}
            >
              <span className="block leading-tight">{preset.label}</span>
              <span
                className={[
                  "block text-[10px] font-normal tabular-nums mt-0.5",
                  isActive ? "opacity-75" : "opacity-50",
                ].join(" ")}
              >
                {preset.limit.toLocaleString()} chars
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress bar for active preset */}
      {selected && (
        <div className="p-3 sm:p-4 bg-brand-surface-alt rounded-xl border border-brand-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">
              {selected.platform}
            </p>
            <p className="text-[11px] font-semibold tabular-nums" style={{ color: "#00C4AE" }}>
              {charCount.toLocaleString()} / {selected.limit.toLocaleString()}
            </p>
          </div>
          <ProgressBar current={charCount} limit={selected.limit} />
        </div>
      )}
    </div>
  );
}
