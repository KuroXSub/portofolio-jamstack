// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,njk,md}' // <-- UBAH INI
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),   // Pastikan plugin ini ada
    require('@tailwindcss/line-clamp'),  // Pastikan plugin ini ada
    require('@tailwindcss/aspect-ratio'), // Pastikan plugin ini ada
  ],
}