"use client";

/**
 * page.tsx
 * Single-page Social Character Counter tool.
 * All state lives here; child components are controlled.
 */

import { useState, useMemo } from "react";
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

export default function HomePage() {
  const [text, setText] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DEFAULT_PRESET_ID);

  // ---------------------------------------------------------------------------
  // Derived stats — memoized so they only recompute when text changes
  // ---------------------------------------------------------------------------
  const stats = useMemo(() => {
    return {
      charsWithSpaces: countCharacters(text, true),
      charsWithoutSpaces: countCharacters(text, false),
      words: countWords(text),
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
      readingTimeMinutes: estimateReadingTimeMinutes(text),
      speakingTimeMinutes: estimateSpeakingTimeMinutes(text),
    };
  }, [text]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  function handlePresetSelect(preset: Preset) {
    setSelectedPresetId(preset.id);
    trackPresetChange(preset.platform);
  }

  function handleTextChange(newText: string) {
    setText(newText);
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      {/* ── 1. Header ──────────────────────────────────────────────────── */}
      <Header />

      <main className="flex-1">
        {/* ── 2. Top Ad Banner ─────────────────────────────────────────── */}
        <div className="max-w-container mx-auto px-4 sm:px-6 pt-4 pb-2 ad-slot-top no-print">
          <AdSlot variant="top" />
        </div>

        {/* ── 3. Tool Area ─────────────────────────────────────────────── */}
        <section
          className="max-w-container mx-auto px-4 sm:px-6 py-6"
          aria-label="Character counter tool"
        >
          {/* Tool heading */}
          <ToolHeader />

          {/* Preset selector */}
          <div className="mb-5 preset-bar-container">
            <PresetSelector
              selectedId={selectedPresetId}
              charCount={stats.charsWithSpaces}
              onSelect={handlePresetSelect}
            />
          </div>

          {/* Main two-column layout: textarea + stats | sidebar ad */}
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

              {/* Live stats */}
              <div className="stats-grid-container">
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
              <KeywordDensity text={text} />
            </div>

            {/* Right column — sidebar ad (desktop only) */}
            <div className="no-print">
              <AdSlot variant="sidebar" />
            </div>
          </div>
        </section>

        {/* ── 4. Below-Tool Ad ─────────────────────────────────────────── */}
        <div className="max-w-container mx-auto px-4 sm:px-6 py-4 ad-slot-below-tool no-print">
          <AdSlot variant="belowTool" />
        </div>

        {/* ── 5. How to Use ────────────────────────────────────────────── */}
        <HowToUse />

        {/* ── 6. Use Cases ─────────────────────────────────────────────── */}
        <UseCases />

        {/* ── 7. FAQ ───────────────────────────────────────────────────── */}
        <FAQ />

        {/* ── 8. Footer Ad Banner ──────────────────────────────────────── */}
        <div className="max-w-container mx-auto px-4 sm:px-6 py-4 ad-slot-footer no-print">
          <AdSlot variant="footer" />
        </div>
      </main>

      {/* ── 9. Footer ────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
