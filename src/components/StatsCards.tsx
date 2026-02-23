"use client";

/**
 * StatsCards.tsx
 * Live stats grid — dark premium dashboard style.
 * Uses .stat-card-dark CSS classes from globals.css (no new libs).
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
  accentValue?: boolean;
}

function StatCard({ label, value, sub, accentValue = false }: StatCardProps) {
  return (
    <div className="stat-card-dark p-3 sm:p-4">
      <p className="stat-card-dark-label">{label}</p>
      <div>
        <p
          className={
            accentValue
              ? "stat-card-dark-value stat-card-dark-value-accent"
              : "stat-card-dark-value"
          }
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {sub && <p className="stat-card-dark-sub">{sub}</p>}
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
      {/* Primary card — teal accent on the headline char count */}
      <StatCard label="Characters" value={charsWithSpaces} sub="with spaces" accentValue />
      <StatCard label="Characters" value={charsWithoutSpaces} sub="without spaces" />
      <StatCard label="Words" value={words} />
      <StatCard label="Sentences" value={sentences} />
      <StatCard label="Paragraphs" value={paragraphs} />

      {/* Read / Speak combined card — dark style inline */}
      <div className="stat-card-dark p-3 sm:p-4">
        <p className="stat-card-dark-label">Read / Speak</p>
        <div className="mt-1.5 space-y-1">
          <p className="text-sm font-bold leading-tight" style={{ color: "#F0F4F8" }}>
            {formatTime(readingTimeMinutes)}
            <span className="text-[10px] font-normal ml-1.5" style={{ color: "#8B95A8" }}>
              read
            </span>
          </p>
          <p className="text-sm font-bold leading-tight" style={{ color: "#F0F4F8" }}>
            {formatTime(speakingTimeMinutes)}
            <span className="text-[10px] font-normal ml-1.5" style={{ color: "#8B95A8" }}>
              speak
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
