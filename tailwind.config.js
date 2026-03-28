/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          navy: '#0D1B2A',
          blush: '#F7DDE2',
          'blush-dark': '#E8A6B8',
          neutral: '#FAFAFA',
          error: '#C97A7A'
        }
      }
    },
  },
  plugins: [],
}
