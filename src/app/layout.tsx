import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Social Character Counter for X, Instagram, TikTok, YouTube | RetroToolsHQ',
  description:
    'Free instant character counter — counts chars with and without spaces, words, sentences, and reading time. Platform presets for X, Instagram, TikTok, and YouTube. No signup. Runs entirely in your browser.',
  keywords: [
    'character counter',
    'word counter',
    'social media character counter',
    'twitter character counter',
    'instagram caption character counter',
    'tiktok caption counter',
    'youtube title counter',
    'reading time calculator',
    'character count tool',
    'free character counter',
    'x character limit',
    'instagram caption limit',
  ],
  authors: [{ name: 'RetroToolsHQ by Retrospect90s00s' }],
  creator: 'RetroToolsHQ',
  publisher: 'Retrospect90s00s',
  metadataBase: new URL('https://www.retrotoolshq.com'),
  alternates: {
    canonical: 'https://www.retrotoolshq.com/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.retrotoolshq.com/',
    title: 'Social Character Counter for X, Instagram, TikTok, YouTube | RetroToolsHQ',
    description:
      'Free instant character counter with platform presets. Counts chars with and without spaces, words, reading time. No signup. Runs in browser.',
    siteName: 'RetroToolsHQ',
  },
  twitter: {
    card: 'summary',
    title: 'Social Character Counter | RetroToolsHQ',
    description:
      'Free instant character counter for X, Instagram, TikTok, YouTube. No signup required.',
  },
  other: {
    'theme-color': '#F8F7F4',
  },
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'RetroToolsHQ Social Character Counter',
  url: 'https://www.retrotoolshq.com/',
  description:
    'Free browser-based social character counter. Counts characters with and without spaces, words, sentences, paragraphs, and estimates reading and speaking time. Platform presets for X, Instagram, TikTok, and YouTube.',
  applicationCategory: 'Utility',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'RetroToolsHQ by Retrospect90s00s',
  },
  featureList: [
    'Character counter with and without spaces',
    'Word counter',
    'Sentence counter',
    'Paragraph counter',
    'Reading time estimator',
    'Speaking time estimator',
    'Platform presets for X, Instagram, TikTok, YouTube',
    'Keyword density analyzer',
    'Normalize spaces',
    'Remove line breaks',
    'Download text report',
    'Share button',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the character counter work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The counter analyzes your text in real time directly in your browser. It counts every character as you type, including spaces, punctuation, and special characters. No text is ever sent to a server — all processing happens locally on your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the character limit for X (Twitter)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'X (formerly Twitter) allows up to 280 characters per post for standard accounts. Select the X Post preset to see a live progress bar that turns red when you exceed the limit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Instagram caption character limit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instagram captions can be up to 2,200 characters long. Only the first 125 characters are visible before the more link in the feed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the character counter include spaces?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — we show both. Characters with spaces counts every character including spaces. Characters without spaces strips all whitespace before counting.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is reading time calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reading time is estimated at 200 words per minute (WPM). Speaking time uses 130 WPM, reflecting a natural conversational pace.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my text stored or shared?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. RetroToolsHQ is a fully client-side tool. Your text never leaves your device and is never stored, logged, or shared.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Normalize Spaces do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Normalize Spaces button collapses multiple consecutive spaces and tabs into a single space, and removes leading and trailing whitespace from each line.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Keyword Density?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keyword Density shows the most frequently used words in your text as a percentage of total word count, excluding common stop words. Open the Advanced panel to see your top 10 keywords.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.variable}>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        {/* Google AdSense — Auto Ads + publisher verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1518235509399666"
          crossOrigin="anonymous"
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationSchema),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className='bg-brand-bg text-brand-text antialiased'>{children}</body>
    </html>
  );
}
