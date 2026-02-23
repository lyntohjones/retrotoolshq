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

/** Bucket text length into ranges for analytics params */
function lengthBucket(len: number): string {
  if (len === 0) return '0';
  if (len <= 140) return '1-140';
  if (len <= 280) return '141-280';
  if (len <= 500) return '281-500';
  if (len <= 2200) return '501-2200';
  return '2200+';
}

export function trackEvent(eventName: string, params?: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

export function trackPresetChange(presetName: string, textLength?: number): void {
  trackEvent('preset_change', {
    preset_name: presetName,
    ...(textLength !== undefined ? { text_length_bucket: lengthBucket(textLength) } : {}),
  });
}

export function trackTextPaste(textLength?: number): void {
  trackEvent('text_paste', {
    ...(textLength !== undefined ? { text_length_bucket: lengthBucket(textLength) } : {}),
  });
}

export function trackTextCopy(textLength?: number): void {
  trackEvent('text_copy', {
    ...(textLength !== undefined ? { text_length_bucket: lengthBucket(textLength) } : {}),
  });
}

export function trackReportDownload(textLength?: number): void {
  trackEvent('report_download', {
    ...(textLength !== undefined ? { text_length_bucket: lengthBucket(textLength) } : {}),
  });
}

export function trackShareClick(textLength?: number): void {
  trackEvent('share_click', {
    ...(textLength !== undefined ? { text_length_bucket: lengthBucket(textLength) } : {}),
  });
}
