import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#09090b",
          container: "#18181b",
          fixed: "#09090b",
          "fixed-dim": "#27272a",
        },
        secondary: {
          DEFAULT: "#27272a",
          container: "#f4f4f5",
          fixed: "#f4f4f5",
          "fixed-dim": "#e4e4e7",
        },
        tertiary: {
          DEFAULT: "#18181b",
          container: "#f4f4f5",
          fixed: "#e4e4e7",
          "fixed-dim": "#d4d4d8",
        },
        surface: {
          DEFAULT: "#fafafa",
          dim: "#f4f4f5",
          bright: "#ffffff",
          variant: "#f4f4f5",
          tint: "#18181b",
          container: {
            lowest: "#ffffff",
            low: "#ffffff",
            DEFAULT: "#f4f4f5",
            high: "#ececee",
            highest: "#e4e4e7",
          },
        },
        outline: {
          DEFAULT: "#d4d4d8",
          variant: "#e4e4e7",
        },
        "on-surface": {
          DEFAULT: "#09090b",
          variant: "#52525b",
        },
        background: "#fafafa",
        "on-background": "#09090b",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        gutter: "1.5rem",
        "gutter-mobile": "1rem",
        margin: "3rem",
        "margin-mobile": "1.25rem",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "var(--font-alexandria)", "sans-serif"],
        display: ["var(--font-space)", "var(--font-alexandria)", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.05)",
        card: "0 4px 20px -2px rgba(14, 16, 19, 0.05)",
        dialog: "0 12px 32px -4px rgba(14, 16, 19, 0.08), 0 4px 12px -2px rgba(14, 16, 19, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

