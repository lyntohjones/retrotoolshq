"use client";

/**
 * page.tsx
 * Single-page Social Character Counter — all state here, child components controlled.
 * Uses debounced stats so heavy analysis doesn't block typing on mobile.
 */

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolHeader } from "@/components/ToolHeader";
import { TextArea } from "@/components/TextArea";
import { StatsCards } from "@/components/StatsCards";
import { PresetSelector } from "@/components/PresetSelector";
import { ActionBar } from "@/components/ActionBar";
import { KeywordDensity } from "@/components/KeywordDensity";
import { AdSlot } from "@/components/AdSlot";
import { HowToUse } from "@/components/HowToUse";
import { UseCases } from "@/components/UseCases";
import { FAQ } from "@/components/FAQ";
import { PlatformSections } from "@/components/PlatformSections";

import {
  countCharacters,
  countWords,
  countSentences,
  countParagraphs,
  estimateReadingTimeMinutes,
  estimateSpeakingTimeMinutes,
} from "@/lib/textTools";
import { DEFAULT_PRESET_ID, type Preset } from "@/lib/presets";
import { trackPresetChange } from "@/lib/analytics";

/** Debounce hook — delays value update until user stops typing */
function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function HomePage() {
  const [text, setText] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DEFAULT_PRESET_ID);
  const textareaRef = useRef<HTMLElement | null>(null);

  // Debounce heavy analysis (150ms) — character count stays instant for progress bar
  const debouncedText = useDebounced(text, 150);

  // Instant char count for preset bar (no debounce needed — O(1))
  const charCount = text.length;

  // Debounced full stats for StatsCards
  const stats = useMemo(() => {
    return {
      charsWithSpaces: countCharacters(debouncedText, true),
      charsWithoutSpaces: countCharacters(debouncedText, false),
      words: countWords(debouncedText),
      sentences: countSentences(debouncedText),
      paragraphs: countParagraphs(debouncedText),
      readingTimeMinutes: estimateReadingTimeMinutes(debouncedText),
      speakingTimeMinutes: estimateSpeakingTimeMinutes(debouncedText),
    };
  }, [debouncedText]);

  // Grab textarea ref for scroll-to on preset click from platform sections
  useEffect(() => {
    textareaRef.current = document.getElementById("main-textarea");
  }, []);

  const scrollToTool = useCallback(() => {
    const el = document.getElementById("main-textarea");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  }, []);

  function handlePresetSelect(preset: Preset) {
    setSelectedPresetId(preset.id);
    trackPresetChange(preset.platform, text.length);
  }

  function handlePresetSelectAndScroll(preset: Preset) {
    handlePresetSelect(preset);
    scrollToTool();
  }

  function handleTextChange(newText: string) {
    setText(newText);
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      {/* ── 1. Header ──────────────────────────────────────────────────── */}
      <Header />

      <main id="main-content" className="flex-1">
        {/* ── 2. Top Ad Banner (below header, above H1) ────────────────── */}
        <div className="max-w-container mx-auto px-4 sm:px-6 pt-4 pb-2 no-print">
          <div className="ad-slot-top" style={{ minHeight: 90 }}>
            <AdSlot variant="top" />
          </div>
        </div>

        {/* ── 3. Tool Area ─────────────────────────────────────────────── */}
        <section
          id="tool"
          className="max-w-container mx-auto px-4 sm:px-6 py-6"
          aria-labelledby="tool-heading"
        >
          {/* H1 — exactly one per page */}
          <ToolHeader />

          {/* Preset selector */}
          <div className="mb-5" style={{ minHeight: 88 }}>
            <PresetSelector
              selectedId={selectedPresetId}
              charCount={charCount}
              onSelect={handlePresetSelect}
            />
          </div>

          {/* Two-column layout: main content | sidebar ad */}
          <div className="flex gap-6 items-start">
            {/* Left / main column */}
            <div className="flex-1 min-w-0 space-y-4">
              {/* Textarea */}
              <TextArea value={text} onChange={handleTextChange} />

              {/* Action buttons */}
              <div className="no-print">
                <ActionBar
                  text={text}
                  stats={stats}
                  onTextChange={handleTextChange}
                />
              </div>

              {/* Live stats — pre-allocated height to prevent CLS */}
              <div style={{ minHeight: 160 }}>
                <StatsCards
                  charsWithSpaces={stats.charsWithSpaces}
                  charsWithoutSpaces={stats.charsWithoutSpaces}
                  words={stats.words}
                  sentences={stats.sentences}
                  paragraphs={stats.paragraphs}
                  readingTimeMinutes={stats.readingTimeMinutes}
                  speakingTimeMinutes={stats.speakingTimeMinutes}
                />
              </div>

              {/* Keyword density accordion */}
              <KeywordDensity text={debouncedText} />
            </div>

            {/* Right column — sidebar ad (hidden below lg via AdSlot) */}
            <div className="no-print shrink-0">
              <AdSlot variant="sidebar" />
            </div>
          </div>
        </section>

        {/* ── 4. Below-Tool Ad ─────────────────────────────────────────── */}
        <div className="max-w-container mx-auto px-4 sm:px-6 py-6 no-print">
          <div style={{ minHeight: 90 }}>
            <AdSlot variant="belowTool" />
          </div>
        </div>

        {/* ── 5. How to Use ────────────────────────────────────────────── */}
        <HowToUse />

        {/* ── 6. Platform anchor sections (long-tail SEO) ──────────────── */}
        <PlatformSections onPresetSelect={handlePresetSelectAndScroll} />

        {/* ── 7. Use Cases ─────────────────────────────────────────────── */}
        <UseCases />

        {/* ── 8. FAQ ───────────────────────────────────────────────────── */}
        <FAQ />

        {/* ── 9. Footer Ad Banner ──────────────────────────────────────── */}
        <div className="max-w-container mx-auto px-4 sm:px-6 py-6 no-print">
          <div style={{ minHeight: 90 }}>
            <AdSlot variant="footer" />
          </div>
        </div>
      </main>

      {/* ── 10. Footer ───────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
