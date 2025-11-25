// tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false, // Disable dark mode completely
  safelist: [
    // Gradient from classes
    "from-orange-400",
    // Background opacity classes
    "bg-black/80",
  ],
  theme: {
    extend: {
      colors: {
        elegantSilver: "#C0C0C0",
        darkGray: "#2C2C2C",
        luxuryGold: "#D4AF37",
        caribbeanTurquoise: "#40E0D0",
        pureWhite: "#FFFFFF",
      },
      fontFamily: {
        crimsonPro: ["var(--font-crimson-pro)", "serif"],
      },
    },
  },
  plugins: [],
}

export default config
