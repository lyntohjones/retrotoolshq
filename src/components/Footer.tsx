/**
 * Footer.tsx
 * Simple footer with navigation placeholders and brand credit.
 */

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ];

  return (
    <footer className="w-full bg-brand-surface border-t border-brand-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-bold text-brand-text text-sm">RetroToolsHQ</p>
            <p className="text-xs text-brand-muted mt-0.5">
              by Retrospect90s00s · {currentYear}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-brand-muted hover:text-brand-accent transition-colors underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-brand-border text-center">
          <p className="text-[11px] text-brand-border">
            Free browser-based tools. No data is stored or transmitted. All processing happens on your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
