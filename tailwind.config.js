/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#8ED8FF",
        "primary-dark": "#74CCFF",

        secondary: "#D8F3FF",

        background: "#F9FCFF",
        surface: "#FFFFFF",

        text: "#3A556A",
        "text-light": "#7B96A8",

        border: "#E7F6FD",

        success: "#CFF5D8",
        warning: "#FFD9A8",
        danger: "#FFD6D6",

        accent: "#FFEFCF",
      },

      borderRadius: {
        xl: "16px",
        "2xl": "22px",
        "3xl": "28px",
      },

      boxShadow: {
        card: "0 8px 24px rgba(120,190,230,.12)",
        hover: "0 14px 30px rgba(120,190,230,.18)",
      },
    },
  },

  plugins: [],
};