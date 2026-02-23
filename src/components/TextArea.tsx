"use client";

/**
 * TextArea.tsx
 * Main textarea input — has explicit <label> for accessibility (WCAG 2.1 AA).
 */

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextArea({ value, onChange, placeholder }: TextAreaProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor="main-textarea"
        className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5"
      >
        Your text
      </label>
      <textarea
        id="main-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          placeholder ??
          "Start typing or paste your text here…\n\nSelect a platform preset above to check character limits."
        }
        className="
          w-full min-h-[320px] p-4 rounded-xl
          bg-brand-surface border-2 border-brand-border
          text-brand-text text-sm sm:text-base leading-relaxed
          placeholder:text-brand-border
          resize-y
          transition-colors duration-150
          focus:outline-none focus:border-brand-accent
          focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2
        "
        aria-describedby="textarea-hint"
        spellCheck="true"
        autoCapitalize="sentences"
      />
      <p id="textarea-hint" className="sr-only">
        Statistics update live as you type. Select a platform preset to see character limit progress.
      </p>
      {/* Character count overlay */}
      {value.length > 0 && (
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span className="text-[10px] text-brand-border bg-brand-surface px-1 rounded tabular-nums">
            {value.length.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
