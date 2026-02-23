import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F8F7F4",
          text: "#1A1A1A",
          accent: "#00E5CC",
          "accent-dark": "#00C4AE",
          muted: "#6B7280",
          border: "#E5E3DE",
          "border-dark": "#D1CEC8",
          surface: "#FFFFFF",
          "surface-alt": "#F0EEE9",
          error: "#EF4444",
          "error-light": "#FEE2E2",
          // Dark dashboard tokens — stat cards premium style
          "dark-surface": "#1E2530",
          "dark-surface-alt": "#252D3A",
          "dark-border": "#2E3847",
          "dark-text": "#F0F4F8",
          "dark-muted": "#8B95A8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1100px",
      },
      spacing: {
        "18": "4.5rem",
      },
      minHeight: {
        textarea: "320px",
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
