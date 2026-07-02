//** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#14B8A6",
        accent: "#F59E0B",
        soft: "#F8FAFC",
      },
    },
  },
  plugins: [],
}
