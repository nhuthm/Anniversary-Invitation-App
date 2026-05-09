
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F1',
        blush: '#FDECEF',
        rose: '#9B2C3F',
        brown: '#4A3B3C',
      },
      fontFamily: {
        script: ['Caveat', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(155, 44, 63, 0.08)',
      }
    },
  },
  plugins: [],
}
