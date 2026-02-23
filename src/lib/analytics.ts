/**
 * analytics.ts
 * Lightweight analytics helper. Fires window.gtag() events only if gtag exists.
 * No tracking scripts are bundled — add your own gtag snippet to layout.tsx <head>.
 */

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, string>) => void;
  }
}

/**
 * Fire a Google Analytics event via gtag.
 * Safe to call even when gtag is not loaded — it will silently no-op.
 *
 * @param eventName - GA4 event name (e.g., "preset_change")
 * @param params - Optional event parameters
 */
export function trackEvent(eventName: string, params?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

// ---------------------------------------------------------------------------
// Named event helpers — use these throughout the app
// ---------------------------------------------------------------------------

export function trackPresetChange(presetName: string): void {
  trackEvent("preset_change", { preset_name: presetName });
}

export function trackTextPaste(): void {
  trackEvent("text_paste");
}

export function trackTextCopy(): void {
  trackEvent("text_copy");
}

export function trackReportDownload(): void {
  trackEvent("report_download");
}
