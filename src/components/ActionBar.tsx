"use client";

/**
 * ActionBar.tsx
 * Paste, Copy, Clear, Normalize Spaces, Remove Line Breaks, Download Report.
 */

import { useState } from "react";
import { normalizeSpaces, removeLineBreaks } from "@/lib/textTools";
import { trackTextPaste, trackTextCopy, trackReportDownload } from "@/lib/analytics";

interface ActionBarProps {
  text: string;
  stats: {
    charsWithSpaces: number;
    charsWithoutSpaces: number;
    words: number;
    sentences: number;
    paragraphs: number;
    readingTimeMinutes: number;
    speakingTimeMinutes: number;
  };
  onTextChange: (text: string) => void;
}

type ButtonState = "idle" | "success" | "error";

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  icon: string;
  state?: ButtonState;
  variant?: "default" | "danger";
  disabled?: boolean;
}

function ActionButton({ onClick, label, icon, state = "idle", variant = "default", disabled = false }: ActionButtonProps) {
  const base = "min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-150 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";
  const variants = {
    default: "bg-brand-surface border-brand-border text-brand-text hover:border-brand-accent hover:text-brand-accent",
    danger: "bg-brand-surface border-brand-border text-brand-muted hover:border-brand-error hover:text-brand-error",
  };
  const stateStyles = {
    idle: "",
    success: "!border-green-500 !text-green-600",
    error: "!border-brand-error !text-brand-error",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${stateStyles[state]}`}
      aria-label={label}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{state === "success" ? "Done!" : state === "error" ? "Failed" : label}</span>
    </button>
  );
}

function formatReport(text: string, stats: ActionBarProps["stats"]): string {
  const now = new Date();
  const dateStr = now.toLocaleString();
  const readMins = stats.readingTimeMinutes;
  const speakMins = stats.speakingTimeMinutes;

  function fmtTime(m: number): string {
    if (m === 0) return "0 sec";
    const secs = Math.round(m * 60);
    if (secs < 60) return `< 1 min`;
    const h = Math.floor(secs / 3600);
    const min = Math.floor((secs % 3600) / 60);
    if (h > 0) return `${h} hr ${min} min`;
    return `${min} min`;
  }

  return [
    "RetroToolsHQ — Social Character Counter Report",
    "=".repeat(48),
    `Generated: ${dateStr}`,
    "",
    "STATS",
    "-".repeat(48),
    `Characters (with spaces):    ${stats.charsWithSpaces.toLocaleString()}`,
    `Characters (without spaces): ${stats.charsWithoutSpaces.toLocaleString()}`,
    `Words:                       ${stats.words.toLocaleString()}`,
    `Sentences:                   ${stats.sentences.toLocaleString()}`,
    `Paragraphs:                  ${stats.paragraphs.toLocaleString()}`,
    `Reading time:                ${fmtTime(readMins)} (200 WPM)`,
    `Speaking time:               ${fmtTime(speakMins)} (130 WPM)`,
    "",
    "TEXT",
    "-".repeat(48),
    text,
    "",
    "=".repeat(48),
    "RetroToolsHQ by Retrospect90s00s",
  ].join("\n");
}

export function ActionBar({ text, stats, onTextChange }: ActionBarProps) {
  const [copyState, setCopyState] = useState<ButtonState>("idle");
  const [pasteState, setPasteState] = useState<ButtonState>("idle");

  async function handlePaste() {
    try {
      const clipText = await navigator.clipboard.readText();
      onTextChange(text + clipText);
      trackTextPaste();
      setPasteState("success");
      setTimeout(() => setPasteState("idle"), 1500);
    } catch {
      setPasteState("error");
      setTimeout(() => setPasteState("idle"), 1500);
    }
  }

  async function handleCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      trackTextCopy();
      setCopyState("success");
      setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 1500);
    }
  }

  function handleClear() {
    onTextChange("");
  }

  function handleNormalizeSpaces() {
    onTextChange(normalizeSpaces(text));
  }

  function handleRemoveLineBreaks() {
    onTextChange(removeLineBreaks(text));
  }

  function handleDownload() {
    const report = formatReport(text, stats);
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `retrotoolshq-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackReportDownload();
  }

  return (
    <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Text actions">
      <ActionButton
        onClick={handlePaste}
        label="Paste"
        icon="📋"
        state={pasteState}
      />
      <ActionButton
        onClick={handleCopy}
        label="Copy"
        icon="📄"
        state={copyState}
        disabled={!text}
      />
      <ActionButton
        onClick={handleClear}
        label="Clear"
        icon="🗑"
        variant="danger"
        disabled={!text}
      />
      <ActionButton
        onClick={handleNormalizeSpaces}
        label="Normalize Spaces"
        icon="⎵"
        disabled={!text}
      />
      <ActionButton
        onClick={handleRemoveLineBreaks}
        label="Remove Line Breaks"
        icon="↵"
        disabled={!text}
      />
      <ActionButton
        onClick={handleDownload}
        label="Download Report"
        icon="⬇"
        disabled={!text}
      />
    </div>
  );
}
