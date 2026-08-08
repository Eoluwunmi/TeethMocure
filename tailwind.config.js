/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teethmocure': '#1B4332',
        'teethmocure-gold': '#C8A94C',
      },
    },
  },
  plugins: [],
}
