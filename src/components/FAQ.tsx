"use client";

/**
 * FAQ.tsx
 * FAQ accordion section with schema-friendly markup for FAQPage JSON-LD.
 * Each item has an id attribute for structured data targeting.
 */

import { useState } from "react";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How does the character counter work?",
    answer:
      "The counter analyzes your text in real time directly in your browser. It counts every character as you type, including spaces, punctuation, and special characters. No text is ever sent to a server — all processing happens locally on your device.",
  },
  {
    id: "faq-2",
    question: "What is the character limit for X (Twitter)?",
    answer:
      "X (formerly Twitter) allows up to 280 characters per post for standard accounts. Select the 'X Post' preset in our tool to see a live progress bar that turns red when you exceed the limit.",
  },
  {
    id: "faq-3",
    question: "What is the Instagram caption character limit?",
    answer:
      "Instagram captions can be up to 2,200 characters long. However, only the first 125 characters are visible before the 'more' link in the feed — so lead with your strongest content. Use our Instagram preset to track your full caption length.",
  },
  {
    id: "faq-4",
    question: "Does the character counter include spaces?",
    answer:
      "Yes — we show both. The 'Characters (with spaces)' stat counts every character including spaces. 'Characters (without spaces)' strips all whitespace before counting. Most social platforms (including X) count spaces as characters.",
  },
  {
    id: "faq-5",
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated at 200 words per minute (WPM), which is the commonly cited average silent reading speed for adults. Speaking time uses 130 WPM, which reflects a natural conversational pace. Both figures update live as you type.",
  },
  {
    id: "faq-6",
    question: "What is Keyword Density and how does it work?",
    answer:
      "Keyword Density shows the most frequently used words in your text, expressed as a percentage of total word count (excluding common stop words like 'the', 'and', 'is'). Open the Advanced panel to see your top 10 keywords. This helps you avoid keyword stuffing and identify your core topic words.",
  },
  {
    id: "faq-7",
    question: "Is my text stored or shared?",
    answer:
      "No. RetroToolsHQ is a fully client-side tool. Your text never leaves your device and is never stored, logged, or shared. There are no user accounts, no cloud sync, and no tracking of your content.",
  },
  {
    id: "faq-8",
    question: "What does 'Normalize Spaces' do?",
    answer:
      "The Normalize Spaces button collapses multiple consecutive spaces and tabs into a single space, and removes leading/trailing whitespace from each line. It is useful for cleaning up text copied from PDFs, emails, or other formatted sources that often introduce extra spacing.",
  },
];

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-brand-border last:border-b-0">
      <button
        onClick={onToggle}
        className="
          w-full min-h-[56px] px-4 sm:px-6 py-4
          flex items-start justify-between gap-4 text-left
          hover:bg-brand-surface-alt transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset
        "
        aria-expanded={isOpen}
        aria-controls={`${item.id}-answer`}
        id={`${item.id}-button`}
      >
        <span className="text-sm sm:text-base font-semibold text-brand-text leading-snug">
          {item.question}
        </span>
        <svg
          className={`w-5 h-5 text-brand-muted transition-transform duration-200 shrink-0 mt-0.5 ${isOpen ? "rotate-180" : ""}`}
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
        id={`${item.id}-answer`}
        role="region"
        aria-labelledby={`${item.id}-button`}
        className={isOpen ? "block" : "hidden"}
      >
        <div className="px-4 sm:px-6 pb-5">
          <p className="text-sm text-brand-muted leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="py-10 sm:py-14" aria-labelledby="faq-heading">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-brand-text mb-6 sm:mb-8">
          Frequently Asked Questions
        </h2>
        <div
          className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {FAQ_ITEMS.map((item) => (
            <div key={item.id} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <meta itemProp="name" content={item.question} />
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <meta itemProp="text" content={item.answer} />
              </div>
              <FAQItemComponent
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
