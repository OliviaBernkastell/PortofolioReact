/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'tech': ['Orbitron', 'Space Grotesk', 'sans-serif'],
        'primary': ['Rajdhani', 'Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Exo 2', 'Orbitron', 'sans-serif'],
        'accent': ['Chakra Petch', 'Rajdhani', 'sans-serif'],
        'cyber': ['Audiowide', 'Orbitron', 'cursive'],
      },
      animation: {
        'float': 'floating 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}