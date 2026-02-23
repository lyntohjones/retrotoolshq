"use client";

/**
 * ActionBar.tsx
 * Paste, Copy, Clear, Normalize Spaces, Remove Line Breaks, Share, Download Report.
 * Includes toast-style button feedback and graceful clipboard fallback.
 */

import { useState, useCallback } from "react";
import { normalizeSpaces, removeLineBreaks } from "@/lib/textTools";
import { trackTextPaste, trackTextCopy, trackReportDownload, trackShareClick } from "@/lib/analytics";

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

type ButtonState = "idle" | "success" | "error" | "warn";

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  icon: string;
  state?: ButtonState;
  variant?: "default" | "danger" | "accent";
  disabled?: boolean;
  successLabel?: string;
  errorLabel?: string;
}

function ActionButton({
  onClick,
  label,
  icon,
  state = "idle",
  variant = "default",
  disabled = false,
  successLabel = "Done!",
  errorLabel = "Failed",
}: ActionButtonProps) {
  const base =
    "min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-150 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap";
  const variants = {
    default:
      "bg-brand-surface border-brand-border text-brand-text hover:border-brand-accent hover:text-brand-accent shadow-sm hover:shadow",
    danger:
      "bg-brand-surface border-brand-border text-brand-muted hover:border-brand-error hover:text-brand-error shadow-sm",
    accent:
      "bg-brand-accent border-brand-accent text-brand-text hover:bg-brand-accent-dark hover:border-brand-accent-dark shadow-sm hover:shadow-md",
  };
  const stateStyles: Record<ButtonState, string> = {
    idle: "",
    success: "!border-green-500 !text-green-600 !bg-green-50",
    error: "!border-brand-error !text-brand-error !bg-red-50",
    warn: "!border-yellow-500 !text-yellow-700 !bg-yellow-50",
  };

  const displayLabel =
    state === "success" ? successLabel : state === "error" ? errorLabel : label;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${stateStyles[state]}`}
      aria-label={label}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{displayLabel}</span>
    </button>
  );
}

function formatReport(text: string, stats: ActionBarProps["stats"]): string {
  const now = new Date();
  const dateStr = now.toLocaleString();

  function fmtTime(m: number): string {
    if (m === 0) return "0 sec";
    const secs = Math.round(m * 60);
    if (secs < 60) return "< 1 min";
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
    `Reading time:                ${fmtTime(stats.readingTimeMinutes)} (200 WPM)`,
    `Speaking time:               ${fmtTime(stats.speakingTimeMinutes)} (130 WPM)`,
    "",
    "TEXT",
    "-".repeat(48),
    text,
    "",
    "=".repeat(48),
    "RetroToolsHQ by Retrospect90s00s — https://www.retrotoolshq.com/",
  ].join("\n");
}

const SHARE_TEXT =
  "Caption too long. RetroToolsHQ fixed it. https://www.retrotoolshq.com/";

export function ActionBar({ text, stats, onTextChange }: ActionBarProps) {
  const [copyState, setCopyState] = useState<ButtonState>("idle");
  const [pasteState, setPasteState] = useState<ButtonState>("idle");
  const [shareState, setShareState] = useState<ButtonState>("idle");

  const setStateTemp = useCallback(
    (setter: (s: ButtonState) => void, s: ButtonState, delay = 2000) => {
      setter(s);
      setTimeout(() => setter("idle"), delay);
    },
    []
  );

  async function handlePaste() {
    if (
      typeof navigator === "undefined" ||
      !navigator.clipboard ||
      typeof navigator.clipboard.readText !== "function"
    ) {
      setStateTemp(setPasteState, "warn");
      return;
    }
    try {
      const clipText = await navigator.clipboard.readText();
      onTextChange(text + clipText);
      trackTextPaste(text.length + clipText.length);
      setStateTemp(setPasteState, "success");
    } catch {
      setStateTemp(setPasteState, "error");
    }
  }

  async function handleCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      trackTextCopy(text.length);
      setStateTemp(setCopyState, "success");
    } catch {
      setStateTemp(setCopyState, "error");
    }
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      trackShareClick(text.length);
      setStateTemp(setShareState, "success");
    } catch {
      setStateTemp(setShareState, "error");
    }
  }

  function handleClear() {
    onTextChange("");
  }

  function handleNormalizeSpaces() {
    if (!text) return;
    onTextChange(normalizeSpaces(text));
  }

  function handleRemoveLineBreaks() {
    if (!text) return;
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
    trackReportDownload(text.length);
  }

  return (
    <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Text actions">
      <ActionButton
        onClick={handlePaste}
        label="Paste"
        icon="📋"
        state={pasteState}
        successLabel="Pasted!"
        errorLabel="No clipboard access"
      />
      <ActionButton
        onClick={handleCopy}
        label="Copy"
        icon="📄"
        state={copyState}
        disabled={!text}
        successLabel="Copied!"
      />
      <ActionButton
        onClick={handleShare}
        label="Share"
        icon="🔗"
        state={shareState}
        variant="accent"
        successLabel="Link copied!"
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
        successLabel="Downloaded!"
      />
    </div>
  );
}
