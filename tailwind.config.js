/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Override Tailwind's built-in cool-toned `slate` scale with a warm
        // charcoal/stone neutral. This is intentional: slate-* is used
        // throughout the whole app for text, borders and surfaces, so
        // re-tuning it here is what turns the entire site warm & editorial
        // instead of touching every file individually.
        slate: {
          50: "#faf9f6",
          100: "#f2efe9",
          200: "#e5e0d5",
          300: "#d0c8b8",
          400: "#a89d89",
          500: "#847a68",
          600: "#635c4d",
          700: "#4a453a",
          800: "#322e27",
          900: "#211e19",
          950: "#14120e",
        },
        // Charcoal / near-black ink — replaces the old "navy" blue scale.
        // Kept as `navy` so every existing bg-navy-900 / text-navy-950 etc.
        // across the app automatically becomes warm charcoal instead of blue.
        navy: {
          50: "#f7f6f4",
          100: "#eeece7",
          200: "#d9d5cc",
          300: "#b7b0a1",
          400: "#8f8674",
          500: "#6b6355",
          600: "#4f4a3f",
          700: "#3a362e",
          800: "#28251f",
          900: "#1c1a16",
          950: "#100f0c",
        },
        // Muted olive / sage — primary accent, tuned warmer & less minty.
        sage: {
          50: "#f6f7f1",
          100: "#eaece0",
          200: "#d3d8c1",
          300: "#b3bc99",
          400: "#93a075",
          500: "#78855a",
          600: "#5f6a46",
          700: "#4c5539",
          800: "#3f4630",
          900: "#363b2a",
          950: "#1c1f15",
        },
        // Warm ivory background tones
        warm: {
          50: "#fefdfb",
          100: "#fbf8f3",
          200: "#f5efe4",
          300: "#ece2d0",
          400: "#dcccae",
          500: "#c2ac83",
        },
        // Soft beige secondary surfaces
        beige: {
          50: "#fbf8f3",
          100: "#f4eee2",
          200: "#eadfcc",
          300: "#ddcdae",
          400: "#c8b18a",
          500: "#ad9268",
        },
        // Cohesive aliasing for existing classes (kept, re-tuned to neutral warm
        // grays instead of cool slate/blue so text & borders read as charcoal).
        teal: {
          50: "#f6f7f1",
          100: "#eaece0",
          200: "#d3d8c1",
          300: "#b3bc99",
          400: "#93a075",
          500: "#78855a",
          600: "#5f6a46",
          700: "#4c5539",
          800: "#3f4630",
          900: "#363b2a",
          950: "#1c1f15",
        },
        ink: {
          50: "#f8f7f5",
          100: "#f0eeea",
          200: "#e2ded6",
          300: "#c9c2b4",
          400: "#9c9284",
          500: "#736a5c",
          600: "#544d42",
          700: "#3d372e",
          800: "#28241e",
          900: "#1a1712",
          950: "#0d0c09",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["'Fraunces'", "ui-serif", "Georgia", "serif"],
        serif: ["'Fraunces'", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(28, 26, 22, 0.04)",
        soft: "0 1px 2px rgba(28, 26, 22, 0.04), 0 4px 14px -4px rgba(28, 26, 22, 0.06)",
        card: "0 1px 2px rgba(28, 26, 22, 0.04), 0 8px 24px -8px rgba(28, 26, 22, 0.08)",
        elevated: "0 12px 32px -10px rgba(28, 26, 22, 0.16)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        xl2: "1.125rem",
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [],
};
