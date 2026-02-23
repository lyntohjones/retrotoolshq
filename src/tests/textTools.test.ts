import { describe, it, expect } from "vitest";
import {
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  estimateReadingTimeMinutes,
  estimateSpeakingTimeMinutes,
  keywordDensity,
  normalizeSpaces,
  removeLineBreaks,
  STOP_WORDS,
} from "../lib/textTools";

// ---------------------------------------------------------------------------
// countWords
// ---------------------------------------------------------------------------
describe("countWords", () => {
  it("returns 0 for empty string", () => {
    expect(countWords("")).toBe(0);
  });

  it("returns 0 for whitespace-only string", () => {
    expect(countWords("   ")).toBe(0);
  });

  it("counts a single word", () => {
    expect(countWords("hello")).toBe(1);
  });

  it("counts multiple words", () => {
    expect(countWords("hello world foo")).toBe(3);
  });

  it("handles extra spaces between words", () => {
    expect(countWords("  hello   world  ")).toBe(2);
  });

  it("handles newlines as word separators", () => {
    expect(countWords("line one\nline two")).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// countCharacters
// ---------------------------------------------------------------------------
describe("countCharacters", () => {
  it("counts 0 for empty string with spaces", () => {
    expect(countCharacters("", true)).toBe(0);
  });

  it("counts 0 for empty string without spaces", () => {
    expect(countCharacters("", false)).toBe(0);
  });

  it("counts characters with spaces", () => {
    expect(countCharacters("hello world", true)).toBe(11);
  });

  it("counts characters without spaces", () => {
    expect(countCharacters("hello world", false)).toBe(10);
  });

  it("counts only non-whitespace chars (tabs and newlines also excluded)", () => {
    expect(countCharacters("hi\tthere\n", false)).toBe(7);
  });

  it("counts all characters including spaces with withSpaces=true", () => {
    expect(countCharacters("a b c", true)).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// countSentences
// ---------------------------------------------------------------------------
describe("countSentences", () => {
  it("returns 0 for empty string", () => {
    expect(countSentences("")).toBe(0);
  });

  it("counts a single sentence ending with period", () => {
    expect(countSentences("Hello world.")).toBe(1);
  });

  it("counts multiple sentences", () => {
    expect(countSentences("Hello world. How are you? I am fine!")).toBe(3);
  });

  it("returns 1 for text with no terminal punctuation", () => {
    expect(countSentences("Hello world")).toBe(1);
  });

  it("handles multiple punctuation types", () => {
    expect(countSentences("Wow! Really? Yes.")).toBe(3);
  });

  it("does not count abbreviations as sentence breaks", () => {
    // Dr. should not be a sentence boundary
    const result = countSentences("Dr. Smith works here. He is great.");
    expect(result).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// countParagraphs
// ---------------------------------------------------------------------------
describe("countParagraphs", () => {
  it("returns 0 for empty string", () => {
    expect(countParagraphs("")).toBe(0);
  });

  it("counts a single paragraph with no blank lines", () => {
    expect(countParagraphs("Hello world.")).toBe(1);
  });

  it("counts two paragraphs separated by a blank line", () => {
    expect(countParagraphs("First paragraph.\n\nSecond paragraph.")).toBe(2);
  });

  it("counts three paragraphs separated by multiple blank lines", () => {
    expect(countParagraphs("One.\n\n\nTwo.\n\nThree.")).toBe(3);
  });

  it("ignores trailing blank lines", () => {
    expect(countParagraphs("Hello.\n\n")).toBe(1);
  });

  it("counts paragraphs with multiple lines each", () => {
    const text = "Line one.\nLine two.\n\nLine three.\nLine four.";
    expect(countParagraphs(text)).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// estimateReadingTimeMinutes
// ---------------------------------------------------------------------------
describe("estimateReadingTimeMinutes", () => {
  it("returns 0 for empty string", () => {
    expect(estimateReadingTimeMinutes("")).toBe(0);
  });

  it("returns correct time at default 200 WPM", () => {
    // 200 words / 200 wpm = 1 minute
    const text = Array(200).fill("word").join(" ");
    expect(estimateReadingTimeMinutes(text)).toBeCloseTo(1, 5);
  });

  it("returns correct time at custom WPM", () => {
    // 100 words / 100 wpm = 1 minute
    const text = Array(100).fill("word").join(" ");
    expect(estimateReadingTimeMinutes(text, 100)).toBeCloseTo(1, 5);
  });

  it("returns fractional time for small word count", () => {
    // 100 words / 200 wpm = 0.5 minutes
    const text = Array(100).fill("word").join(" ");
    expect(estimateReadingTimeMinutes(text)).toBeCloseTo(0.5, 5);
  });
});

// ---------------------------------------------------------------------------
// estimateSpeakingTimeMinutes
// ---------------------------------------------------------------------------
describe("estimateSpeakingTimeMinutes", () => {
  it("returns 0 for empty string", () => {
    expect(estimateSpeakingTimeMinutes("")).toBe(0);
  });

  it("returns correct time at default 130 WPM", () => {
    // 130 words / 130 wpm = 1 minute
    const text = Array(130).fill("word").join(" ");
    expect(estimateSpeakingTimeMinutes(text)).toBeCloseTo(1, 5);
  });

  it("returns correct time at custom WPM", () => {
    // 260 words / 130 wpm = 2 minutes
    const text = Array(260).fill("word").join(" ");
    expect(estimateSpeakingTimeMinutes(text, 130)).toBeCloseTo(2, 5);
  });

  it("is slower than reading time for same text (130 < 200 WPM)", () => {
    const text = Array(300).fill("word").join(" ");
    const reading = estimateReadingTimeMinutes(text);
    const speaking = estimateSpeakingTimeMinutes(text);
    expect(speaking).toBeGreaterThan(reading);
  });
});

// ---------------------------------------------------------------------------
// keywordDensity
// ---------------------------------------------------------------------------
describe("keywordDensity", () => {
  it("returns empty array for empty string", () => {
    expect(keywordDensity("")).toEqual([]);
  });

  it("excludes stop words", () => {
    const text = "the quick brown fox the the";
    const result = keywordDensity(text);
    const words = result.map((r) => r.word);
    expect(words).not.toContain("the");
    expect(words).toContain("quick");
    expect(words).toContain("brown");
    expect(words).toContain("fox");
  });

  it("respects topN limit", () => {
    const text = "apple banana cherry date elderberry fig grape";
    const result = keywordDensity(text, 3);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it("returns results sorted by frequency descending", () => {
    const text = "cat cat cat dog dog bird";
    const result = keywordDensity(text);
    expect(result[0].word).toBe("cat");
    expect(result[0].count).toBe(3);
    expect(result[1].word).toBe("dog");
    expect(result[1].count).toBe(2);
  });

  it("calculates percentages correctly", () => {
    // Only non-stop words: "cat" x3, "dog" x2 = 5 total
    const text = "cat cat cat dog dog";
    const result = keywordDensity(text);
    const cat = result.find((r) => r.word === "cat");
    expect(cat?.percentage).toBeCloseTo(60, 0);
  });

  it("accepts custom stop words set", () => {
    const customStop = new Set(["cat"]);
    const result = keywordDensity("cat cat dog", 10, customStop);
    const words = result.map((r) => r.word);
    expect(words).not.toContain("cat");
    expect(words).toContain("dog");
  });

  it("filters out single-character tokens", () => {
    const result = keywordDensity("a b c hello");
    const words = result.map((r) => r.word);
    expect(words).not.toContain("a");
    expect(words).not.toContain("b");
    expect(words).toContain("hello");
  });
});

// ---------------------------------------------------------------------------
// normalizeSpaces
// ---------------------------------------------------------------------------
describe("normalizeSpaces", () => {
  it("collapses multiple spaces to one", () => {
    expect(normalizeSpaces("hello   world")).toBe("hello world");
  });

  it("collapses tabs to single space", () => {
    expect(normalizeSpaces("hello\t\tworld")).toBe("hello world");
  });

  it("trims leading and trailing spaces", () => {
    expect(normalizeSpaces("  hello world  ")).toBe("hello world");
  });

  it("preserves single newlines between paragraphs", () => {
    const result = normalizeSpaces("line one\nline two");
    expect(result).toBe("line one\nline two");
  });

  it("normalizes spaces per line (leading whitespace on each line)", () => {
    const result = normalizeSpaces("  first line  \n  second line  ");
    expect(result).toBe("first line\nsecond line");
  });

  it("returns empty string for whitespace-only input", () => {
    expect(normalizeSpaces("   ")).toBe("");
  });
});

// ---------------------------------------------------------------------------
// removeLineBreaks
// ---------------------------------------------------------------------------
describe("removeLineBreaks", () => {
  it("removes Unix newlines (\\n)", () => {
    expect(removeLineBreaks("hello\nworld")).toBe("hello world");
  });

  it("removes Windows newlines (\\r\\n)", () => {
    expect(removeLineBreaks("hello\r\nworld")).toBe("hello world");
  });

  it("removes old Mac newlines (\\r)", () => {
    expect(removeLineBreaks("hello\rworld")).toBe("hello world");
  });

  it("handles multiple consecutive newlines", () => {
    expect(removeLineBreaks("hello\n\n\nworld")).toBe("hello world");
  });

  it("trims the result", () => {
    expect(removeLineBreaks("\nhello world\n")).toBe("hello world");
  });

  it("returns empty string for newline-only input", () => {
    expect(removeLineBreaks("\n\n\n")).toBe("");
  });
});

// ---------------------------------------------------------------------------
// STOP_WORDS
// ---------------------------------------------------------------------------
describe("STOP_WORDS", () => {
  it("contains at least 50 common English stop words", () => {
    expect(STOP_WORDS.size).toBeGreaterThanOrEqual(50);
  });

  it("contains 'the'", () => {
    expect(STOP_WORDS.has("the")).toBe(true);
  });

  it("contains 'and'", () => {
    expect(STOP_WORDS.has("and")).toBe(true);
  });
});
