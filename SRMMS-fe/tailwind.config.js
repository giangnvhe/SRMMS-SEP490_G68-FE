/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      blue: {
        500: "#4880ff",
      },
      gay: {
        300: "#fbfbfd"
      }
    },
  },
  plugins: [],
}