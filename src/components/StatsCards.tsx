"use client";

/**
 * StatsCards.tsx
 * Live stats grid: characters, words, sentences, paragraphs, reading & speaking time.
 */

import { formatTime } from "@/lib/textTools";

interface StatsCardsProps {
  charsWithSpaces: number;
  charsWithoutSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
}

function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg p-3 sm:p-4 flex flex-col justify-between min-h-[72px]">
      <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider leading-tight">
        {label}
      </p>
      <div className="mt-1.5">
        <p className="text-xl sm:text-2xl font-bold text-brand-text tabular-nums leading-none">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {sub && (
          <p className="text-[10px] text-brand-muted mt-0.5 leading-tight">{sub}</p>
        )}
      </div>
    </div>
  );
}

export function StatsCards({
  charsWithSpaces,
  charsWithoutSpaces,
  words,
  sentences,
  paragraphs,
  readingTimeMinutes,
  speakingTimeMinutes,
}: StatsCardsProps) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
      aria-label="Text statistics"
      aria-live="polite"
      aria-atomic="false"
    >
      <StatCard
        label="Characters"
        value={charsWithSpaces}
        sub="with spaces"
      />
      <StatCard
        label="Characters"
        value={charsWithoutSpaces}
        sub="without spaces"
      />
      <StatCard label="Words" value={words} />
      <StatCard label="Sentences" value={sentences} />
      <StatCard label="Paragraphs" value={paragraphs} />
      <div className="bg-brand-surface border border-brand-border rounded-lg p-3 sm:p-4 min-h-[72px] col-span-1">
        <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider leading-tight">
          Read / Speak
        </p>
        <div className="mt-1.5 space-y-0.5">
          <p className="text-sm font-bold text-brand-text leading-tight">
            {formatTime(readingTimeMinutes)}
            <span className="text-[10px] font-normal text-brand-muted ml-1">read</span>
          </p>
          <p className="text-sm font-bold text-brand-text leading-tight">
            {formatTime(speakingTimeMinutes)}
            <span className="text-[10px] font-normal text-brand-muted ml-1">speak</span>
          </p>
        </div>
      </div>
    </div>
  );
}
