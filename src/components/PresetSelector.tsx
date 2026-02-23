"use client";

/**
 * PresetSelector.tsx
 * Platform preset buttons + progress bar for the selected preset.
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
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Platform presets">
        {PRESETS.map((preset) => {
          const isActive = preset.id === selectedId;
          const isOver = charCount > preset.limit;
          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              aria-pressed={isActive}
              className={`
                min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2
                ${
                  isActive
                    ? isOver
                      ? "bg-brand-error border-brand-error text-white"
                      : "bg-brand-accent border-brand-accent text-brand-text"
                    : isOver
                    ? "bg-brand-error-light border-brand-error text-brand-error hover:bg-red-100"
                    : "bg-brand-surface border-brand-border text-brand-text hover:border-brand-accent hover:text-brand-accent"
                }
              `}
            >
              <span className="block leading-tight">{preset.label}</span>
              <span
                className={`block text-[10px] font-normal tabular-nums mt-0.5 ${
                  isActive ? "opacity-80" : "opacity-60"
                }`}
              >
                {preset.limit.toLocaleString()} chars
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress bar for selected preset */}
      {selected && (
        <div className="p-3 bg-brand-surface-alt rounded-lg border border-brand-border">
          <p className="text-xs font-semibold text-brand-muted mb-2 uppercase tracking-wider">
            {selected.platform}
          </p>
          <ProgressBar current={charCount} limit={selected.limit} />
        </div>
      )}
    </div>
  );
}
