import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          secondary: "var(--background-secondary)",
          tertiary: "var(--background-tertiary)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          muted: "var(--foreground-muted)",
        },
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },

      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },

    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
