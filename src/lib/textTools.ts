/**
 * textTools.ts
 * Pure text analysis functions — all logic runs client-side, no side effects.
 */

// ---------------------------------------------------------------------------
// Stop words — common English words excluded from keyword density analysis
// ---------------------------------------------------------------------------
export const STOP_WORDS: Set<string> = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "up", "about", "into", "through", "during",
  "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
  "do", "does", "did", "will", "would", "could", "should", "may", "might",
  "shall", "can", "not", "no", "nor", "so", "yet", "both", "either",
  "neither", "each", "few", "more", "most", "other", "some", "such",
  "than", "too", "very", "just", "as", "if", "then", "that", "this",
  "these", "those", "i", "me", "my", "we", "our", "you", "your", "he",
  "she", "it", "they", "them", "their", "what", "which", "who", "whom",
  "how", "when", "where", "why", "all", "any", "because", "while", "how",
  "its", "also", "only", "same", "own",
]);

// ---------------------------------------------------------------------------
// countCharacters
// ---------------------------------------------------------------------------
/**
 * Count characters in text.
 * @param text - Input string
 * @param withSpaces - If true, count all characters; if false, exclude spaces
 */
export function countCharacters(text: string, withSpaces: boolean): number {
  if (withSpaces) {
    return text.length;
  }
  return text.replace(/\s/g, "").length;
}

// ---------------------------------------------------------------------------
// countWords
// ---------------------------------------------------------------------------
/**
 * Count words in text. Words are sequences of non-whitespace characters.
 */
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).length;
}

// ---------------------------------------------------------------------------
// countSentences
// ---------------------------------------------------------------------------
/**
 * Count sentences in text.
 * A sentence ends with . ! or ? (ignoring common abbreviations like Mr. Dr.).
 */
export function countSentences(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;

  // Remove common abbreviations to avoid false sentence breaks
  const cleaned = trimmed
    .replace(/\b(Mr|Mrs|Ms|Dr|Prof|Sr|Jr|vs|etc|Inc|Ltd|Corp|St|Ave|Blvd)\./gi, "$1")
    .replace(/\b([A-Z])\./g, "$1"); // Single-letter abbreviations like U.S.A.

  const matches = cleaned.match(/[^.!?]*[.!?]+/g);
  if (!matches) {
    // Text with no terminal punctuation — treat as 1 sentence if non-empty
    return trimmed.length > 0 ? 1 : 0;
  }
  return matches.length;
}

// ---------------------------------------------------------------------------
// countParagraphs
// ---------------------------------------------------------------------------
/**
 * Count paragraphs. Paragraphs are separated by one or more blank lines.
 */
export function countParagraphs(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;

  const paragraphs = trimmed
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);
  return paragraphs.length;
}

// ---------------------------------------------------------------------------
// estimateReadingTimeMinutes
// ---------------------------------------------------------------------------
/**
 * Estimate reading time in minutes (returns a number, may be decimal).
 * @param text - Input string
 * @param wpm - Words per minute, default 200
 */
export function estimateReadingTimeMinutes(text: string, wpm: number = 200): number {
  const words = countWords(text);
  if (words === 0) return 0;
  return words / wpm;
}

// ---------------------------------------------------------------------------
// estimateSpeakingTimeMinutes
// ---------------------------------------------------------------------------
/**
 * Estimate speaking time in minutes (returns a number, may be decimal).
 * @param text - Input string
 * @param wpm - Words per minute, default 130
 */
export function estimateSpeakingTimeMinutes(text: string, wpm: number = 130): number {
  const words = countWords(text);
  if (words === 0) return 0;
  return words / wpm;
}

// ---------------------------------------------------------------------------
// formatTime — helper for display (not exported as a pure analysis function)
// ---------------------------------------------------------------------------
/**
 * Format a decimal minute value to a human-readable string.
 * e.g. 0.5 → "< 1 min", 1.5 → "1 min 30 sec", 65 → "1 hr 5 min"
 */
export function formatTime(minutes: number): string {
  if (minutes === 0) return "0 sec";
  const totalSeconds = Math.round(minutes * 60);
  if (totalSeconds < 60) return `< 1 min`;
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
  }
  return secs > 0 ? `${mins} min ${secs} sec` : `${mins} min`;
}

// ---------------------------------------------------------------------------
// keywordDensity
// ---------------------------------------------------------------------------
export interface KeywordEntry {
  word: string;
  count: number;
  percentage: number;
}

/**
 * Calculate keyword density for top N words, excluding stop words.
 * @param text - Input string
 * @param topN - Number of top keywords to return, default 10
 * @param stopWords - Set of words to exclude, defaults to STOP_WORDS
 */
export function keywordDensity(
  text: string,
  topN: number = 10,
  stopWords: Set<string> = STOP_WORDS
): KeywordEntry[] {
  const trimmed = text.trim();
  if (trimmed === "") return [];

  // Tokenize: lowercase, strip punctuation, split on whitespace
  const words = trimmed
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w));

  if (words.length === 0) return [];

  const freq: Record<string, number> = {};
  for (const word of words) {
    freq[word] = (freq[word] ?? 0) + 1;
  }

  const total = words.length;
  return Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topN)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Math.round((count / total) * 1000) / 10, // 1 decimal place
    }));
}

// ---------------------------------------------------------------------------
// normalizeSpaces
// ---------------------------------------------------------------------------
/**
 * Collapse multiple spaces/tabs to a single space and trim leading/trailing whitespace.
 * Preserves single newlines (use removeLineBreaks separately if needed).
 */
export function normalizeSpaces(text: string): string {
  return text
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .trim();
}

// ---------------------------------------------------------------------------
// removeLineBreaks
// ---------------------------------------------------------------------------
/**
 * Remove all line breaks (\n, \r\n, \r) and replace with a single space.
 * Then normalize multiple spaces to one.
 */
export function removeLineBreaks(text: string): string {
  return text.replace(/\r?\n|\r/g, " ").replace(/[ \t]+/g, " ").trim();
}
