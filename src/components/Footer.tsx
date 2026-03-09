/**
 * Footer.tsx
 * Site footer — brand credit with Retrospect logo centered between
 * brand text (left) and nav links (right).
 */

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ];

  return (
    <footer className="w-full bg-brand-surface border-t border-brand-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 py-8">
        {/* Three-column layout: brand | logo | nav */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left — brand text */}
          <div className="text-center sm:text-left shrink-0">
            <p className="font-bold text-brand-text text-sm">RetroToolsHQ</p>
            <p className="text-xs text-brand-muted mt-0.5">
              by Retrospect90s00s · {currentYear}
            </p>
          </div>

          {/* Center — Retrospect parent brand logo */}
          <div className="flex items-center justify-center shrink-0">
            <a
              href="https://www.retrospect90s00s.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Retrospect90s00s — parent brand"
              className="block opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/images/retrospect-logo.png"
                alt="Retrospect90s00s"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                style={{ maxHeight: "48px" }}
              />
            </a>
          </div>

          {/* Right — nav links */}
          <nav aria-label="Footer navigation" className="shrink-0">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-brand-muted hover:text-brand-accent transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom rule */}
        <div className="mt-6 pt-4 border-t border-brand-border text-center">
          <p className="text-[11px] text-brand-border">
            Free browser-based tools. No data is stored or transmitted. All processing happens on your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
