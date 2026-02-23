"use client";

/**
 * PlatformSections.tsx
 * Five anchored platform sections for long-tail SEO.
 * Each has a description, "Use this preset" CTA, and 3 platform-specific FAQs.
 */

import { useState } from "react";
import { PRESETS, type Preset } from "@/lib/presets";

interface PlatformSectionsProps {
  onPresetSelect: (preset: Preset) => void;
}

interface PlatformFAQ {
  q: string;
  a: string;
}

interface PlatformData {
  id: string;
  presetId: string;
  heading: string;
  icon: string;
  description: string;
  faqs: PlatformFAQ[];
}

const PLATFORMS: PlatformData[] = [
  {
    id: "x-character-counter",
    presetId: "x-post",
    heading: "X (Twitter) Character Counter",
    icon: "✦",
    description:
      "X enforces a strict 280-character limit on standard posts. Every character counts — including spaces, punctuation, and emojis (which each count as 2 characters in X's API). Our X character counter gives you a live progress bar that turns red the moment you go over, so you can trim before you tweet. Paste your draft, watch the count update instantly, and use Normalize Spaces to clean up any extra whitespace copied from another app. No account needed — just paste and go.",
    faqs: [
      {
        q: "How many characters does X (Twitter) allow per post?",
        a: "Standard X accounts can post up to 280 characters. X Premium (formerly Twitter Blue) subscribers get up to 25,000 characters for long-form posts. Our counter targets the standard 280-character limit by default.",
      },
      {
        q: "Do emojis count as 1 or 2 characters on X?",
        a: "In X's backend API, most emojis count as 2 characters because they use Unicode surrogate pairs. Our character counter shows the raw character count — X may display a slightly different number for emoji-heavy posts. Always check X's compose box as the final authority.",
      },
      {
        q: "Does a URL count toward the X character limit?",
        a: "Yes — X wraps all URLs to t.co short links, which count as exactly 23 characters regardless of the original URL length. So a full URL and a short URL both use 23 of your 280 characters.",
      },
    ],
  },
  {
    id: "instagram-caption-counter",
    presetId: "instagram-caption",
    heading: "Instagram Caption Character Counter",
    icon: "◎",
    description:
      "Instagram allows captions up to 2,200 characters, but only the first 125 characters appear before the 'more' button in the feed. That means your opening line does all the heavy lifting. Use our Instagram caption counter to craft a punchy hook within the first 125 characters, then expand into hashtags and context below. The live progress bar tracks your full caption length so you never hit the wall mid-post. Great for Reels descriptions, carousel posts, and product launch captions.",
    faqs: [
      {
        q: "What is the Instagram caption character limit?",
        a: "Instagram captions can be up to 2,200 characters long. However, only approximately 125 characters appear in the feed before a 'more' tap is required. For maximum engagement, lead with your strongest content in those first 125 characters.",
      },
      {
        q: "Do hashtags count toward the Instagram caption limit?",
        a: "Yes — every character in a hashtag, including the # symbol, counts toward the 2,200-character caption limit. Instagram allows up to 30 hashtags per post. Many creators put hashtags at the end of the caption or in the first comment to keep the caption clean.",
      },
      {
        q: "How many characters does an Instagram bio allow?",
        a: "Instagram bios are limited to 150 characters. Our tool can help you count and trim your bio copy before pasting it in — just type or paste your bio text and watch the counter.",
      },
    ],
  },
  {
    id: "tiktok-caption-counter",
    presetId: "tiktok-caption",
    heading: "TikTok Caption Character Counter",
    icon: "▶",
    description:
      "TikTok captions support up to 2,200 characters, giving you plenty of room for storytelling, hooks, and keyword-rich descriptions that help the algorithm surface your video. The first 100 or so characters appear on-screen before the viewer taps 'more', so lead with a strong hook. Our TikTok character counter shows you exactly where you stand at a glance. Perfect for creators who script their captions in a notes app before uploading — paste the text, check the count, and copy it clean.",
    faqs: [
      {
        q: "What is the TikTok caption character limit?",
        a: "TikTok allows captions up to 2,200 characters. Only the first roughly 100 characters appear in the video feed before a 'more' tap, so your opening line is critical for stopping the scroll.",
      },
      {
        q: "Do TikTok captions help with the algorithm?",
        a: "Yes — TikTok uses caption text for content categorization and search. Including relevant keywords in your caption can help the For You Page algorithm match your video to interested viewers. A well-written 150–300 character caption with keywords often outperforms a blank caption.",
      },
      {
        q: "Can I use hashtags in TikTok captions?",
        a: "Yes. TikTok captions support hashtags and they count toward the 2,200-character limit. Most creators use 3–5 targeted hashtags rather than the maximum, as keyword-rich captions often outperform hashtag-stuffed ones.",
      },
    ],
  },
  {
    id: "youtube-title-counter",
    presetId: "youtube-title",
    heading: "YouTube Title Character Counter",
    icon: "▷",
    description:
      "YouTube titles are capped at 100 characters, but Google typically displays only the first 60–70 characters in search results before truncating. Our YouTube title counter helps you front-load your most important keywords while keeping the full title within limit. A great YouTube title is short, keyword-rich, and creates curiosity — use our character counter to iterate fast. Paste several title variants, compare lengths, and pick the one that lands under 70 characters for maximum search visibility.",
    faqs: [
      {
        q: "What is the YouTube title character limit?",
        a: "YouTube allows up to 100 characters in a video title. However, Google search results typically truncate titles at around 60–70 characters. Aim to include your primary keyword within the first 60 characters for best SEO results.",
      },
      {
        q: "Do special characters in YouTube titles affect SEO?",
        a: "Special characters like |, -, :, and () are commonly used in YouTube titles to separate the main keyword from the brand name or episode number. They count as 1 character each. Excessive special characters can appear spammy and hurt click-through rates.",
      },
      {
        q: "How long should a YouTube title be for best performance?",
        a: "Most top-performing YouTube videos have titles between 40 and 70 characters. This keeps titles readable in search results, suggested video thumbnails, and mobile screens. Our counter shows your length in real time so you can optimize before uploading.",
      },
    ],
  },
  {
    id: "youtube-description-counter",
    presetId: "youtube-description",
    heading: "YouTube Description Character Counter",
    icon: "≡",
    description:
      "YouTube descriptions allow up to 5,000 characters — the most generous limit of any major platform. Only the first 157 characters appear above the 'Show more' fold in desktop search results, making your opening lines critical for both viewers and SEO. A well-optimized YouTube description includes your primary keyword in the first sentence, timestamps, links, and a call to action. Use our YouTube description counter to build out a full, keyword-rich description template without exceeding the limit.",
    faqs: [
      {
        q: "What is the YouTube description character limit?",
        a: "YouTube descriptions allow up to 5,000 characters. Only the first 157 characters appear in Google search snippets. Pack your most important keywords and your core message into those first two sentences.",
      },
      {
        q: "Do YouTube descriptions help with SEO?",
        a: "Yes — YouTube and Google both use description text to understand the topic of your video. Including your target keywords naturally in the first 200 characters, plus timestamps and relevant links, can improve search ranking and suggested video placement.",
      },
      {
        q: "Should I use the full 5,000 characters in a YouTube description?",
        a: "Not necessarily. A focused 300–800 character description with clear keywords, timestamps, and a call to action often outperforms a keyword-stuffed wall of text. Use the extra space for chapter timestamps, related links, and social handles rather than padding.",
      },
    ],
  },
];

interface FAQAccordionProps {
  faqs: PlatformFAQ[];
  sectionId: string;
}

function FAQAccordion({ faqs, sectionId }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mt-4 border border-brand-border rounded-xl overflow-hidden divide-y divide-brand-border">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            aria-expanded={openIdx === i}
            aria-controls={`${sectionId}-faq-${i}`}
            className="w-full min-h-[48px] px-4 py-3 flex items-start justify-between gap-3 text-left bg-brand-surface hover:bg-brand-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset"
          >
            <span className="text-sm font-semibold text-brand-text leading-snug">{faq.q}</span>
            <svg
              className={`w-4 h-4 text-brand-muted shrink-0 mt-0.5 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            id={`${sectionId}-faq-${i}`}
            role="region"
            className={openIdx === i ? "block" : "hidden"}
          >
            <p className="px-4 pb-4 pt-2 text-sm text-brand-muted leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PlatformSections({ onPresetSelect }: PlatformSectionsProps) {
  return (
    <div className="max-w-container mx-auto px-4 sm:px-6">
      {PLATFORMS.map((platform, idx) => {
        const preset = PRESETS.find((p) => p.id === platform.presetId);
        const isEven = idx % 2 === 0;

        return (
          <section
            key={platform.id}
            id={platform.id}
            aria-labelledby={`${platform.id}-heading`}
            className={`py-10 sm:py-14 ${isEven ? "" : "border-t border-brand-border"}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-brand-accent font-bold" aria-hidden="true">
                  {platform.icon}
                </span>
                <h2
                  id={`${platform.id}-heading`}
                  className="text-xl sm:text-2xl font-bold text-brand-text"
                >
                  {platform.heading}
                </h2>
              </div>
              {preset && (
                <button
                  type="button"
                  onClick={() => onPresetSelect(preset)}
                  className="shrink-0 min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold bg-brand-accent text-brand-text border border-brand-accent hover:bg-brand-accent-dark hover:border-brand-accent-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 whitespace-nowrap"
                  aria-label={`Use ${platform.heading} preset in the counter`}
                >
                  ↑ Use this preset
                </button>
              )}
            </div>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl">
              {platform.description}
            </p>

            {/* Platform-specific FAQ accordion */}
            <FAQAccordion faqs={platform.faqs} sectionId={platform.id} />
          </section>
        );
      })}
    </div>
  );
}
