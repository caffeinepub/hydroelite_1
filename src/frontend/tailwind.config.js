/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: { DEFAULT: "oklch(var(--card) / <alpha-value>)", foreground: "oklch(var(--card-foreground) / <alpha-value>)" },
        primary: { DEFAULT: "oklch(var(--primary) / <alpha-value>)", foreground: "oklch(var(--primary-foreground) / <alpha-value>)" },
        secondary: { DEFAULT: "oklch(var(--secondary) / <alpha-value>)", foreground: "oklch(var(--secondary-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "oklch(var(--muted) / <alpha-value>)", foreground: "oklch(var(--muted-foreground) / <alpha-value>)" },
        accent: { DEFAULT: "oklch(var(--accent) / <alpha-value>)", foreground: "oklch(var(--accent-foreground) / <alpha-value>)" },
        destructive: { DEFAULT: "oklch(var(--destructive) / <alpha-value>)", foreground: "oklch(var(--destructive-foreground) / <alpha-value>)" },
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        gold: { DEFAULT: "#D4AF37", light: "#e8cb6a", dark: "#C9A84C" },
        brand: { dark: "#0a0a0a", darker: "#111111", card: "#1a1a1a", border: "#2a2a2a" },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      letterSpacing: { widest: "0.3em", ultra: "0.5em" },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "fade-up": "fadeUp 1s ease-out forwards",
        "fade-up-delay": "fadeUp 1s ease-out 0.3s forwards",
        "fade-up-delay2": "fadeUp 1s ease-out 0.6s forwards",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseGold: { "0%, 100%": { boxShadow: "0 0 20px rgba(212,175,55,0.2)" }, "50%": { boxShadow: "0 0 40px rgba(212,175,55,0.4)" } },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
