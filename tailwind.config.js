/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00aaff',
        accent: '#ff5e00',
        background: '#1a1a2e',
      },
      boxShadow: {
        'neon-blue': '0 6px 30px rgba(0,170,255,0.12)',
        'neon-orange': '0 6px 30px rgba(255,94,0,0.12)'
      }
    },
  },
  plugins: [],
}

