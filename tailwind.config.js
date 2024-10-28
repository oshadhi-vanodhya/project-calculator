/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        ftsystem: ['Ftsystem', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


