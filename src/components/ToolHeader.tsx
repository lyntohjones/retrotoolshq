/**
 * ToolHeader.tsx
 * H1 heading and tool description for the Social Character Counter.
 */

export function ToolHeader() {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-text tracking-tight leading-tight">
        Social Character Counter
      </h1>
      <p className="mt-2 text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
        Instantly count characters, words, and reading time. Select a platform preset to see if your
        text fits — no signup required.
      </p>
    </div>
  );
}
