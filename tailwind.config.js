/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. YOUR FONTS
      fontFamily: {
        sans: ['var(--font-ibm)', 'sans-serif'],    // Body Text
        mono: ['var(--font-jetbrains)', 'monospace'], // Headings & Code
      },
      // 2. YOUR COLORS
      colors: {
        gysis: {
          main: '#023047',  // Deep Navy (Primary)
          pop: '#FFB703',   // Amber (Buttons/Accents)
          light: '#219EBC', // Lighter Blue (Hovers)
          sky: '#8ECAE6',   // Very Light Blue (Backgrounds)
          text: '#023047',  // Dark Text (Same as main for now)
        }
      }
    },
  },
  plugins: [],
}