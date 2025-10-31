/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './**/*.html',
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
};
