/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "starbucks-green": "#0e382c",
        "stabucks": "#0a9c6b",
        "cream-color": "#d7d2d2"
      },
      fontFamily: {
        "poppins": 'poppins'
      },
    },
  },
  plugins: [],
}

