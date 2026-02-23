/**
 * presets.ts
 * Platform preset configuration for the Social Character Counter.
 * Edit limits here — no component changes needed.
 */

export interface Preset {
  id: string;
  label: string;
  platform: string;
  limit: number;
}

export const PRESETS: Preset[] = [
  {
    id: "x-post",
    label: "X Post",
    platform: "X (Twitter)",
    limit: 280,
  },
  {
    id: "instagram-caption",
    label: "Instagram",
    platform: "Instagram Caption",
    limit: 2200,
  },
  {
    id: "tiktok-caption",
    label: "TikTok",
    platform: "TikTok Caption",
    limit: 2200,
  },
  {
    id: "youtube-title",
    label: "YT Title",
    platform: "YouTube Title",
    limit: 100,
  },
  {
    id: "youtube-description",
    label: "YT Description",
    platform: "YouTube Description",
    limit: 5000,
  },
];

export const DEFAULT_PRESET_ID = "x-post";

export function getPresetById(id: string): Preset | undefined {
  return PRESETS.find((p) => p.id === id);
}
