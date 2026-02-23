"use client";

/**
 * ProgressBar.tsx
 * Animated character usage progress bar. Turns red when over the limit.
 */

interface ProgressBarProps {
  current: number;
  limit: number;
}

export function ProgressBar({ current, limit }: ProgressBarProps) {
  const percentage = Math.min((current / limit) * 100, 100);
  const isOver = current > limit;
  const remaining = limit - current;

  return (
    <div className="w-full">
      {/* Bar track */}
      <div className="w-full h-2 bg-brand-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-150 ${
            isOver ? "bg-brand-error" : "bg-brand-accent"
          }`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={limit}
          aria-label={`${current} of ${limit} characters used`}
        />
      </div>

      {/* Count label */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-brand-muted">
          {current.toLocaleString()} / {limit.toLocaleString()} characters
        </span>
        <span
          className={`text-xs font-semibold tabular-nums ${
            isOver ? "text-brand-error" : remaining <= limit * 0.1 ? "text-yellow-600" : "text-brand-muted"
          }`}
        >
          {isOver
            ? `${Math.abs(remaining).toLocaleString()} over`
            : `${remaining.toLocaleString()} left`}
        </span>
      </div>
    </div>
  );
}
