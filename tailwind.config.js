/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gb_darkest: '#0f380f',
        gb_dark: '#306230',
        gb_light: '#8bac0f',
        gb_lightest: '#9bbc0f',
        background: '#9bbc0f',
        text: '#0f380f',
      },
      fontFamily: {
        sans: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}
