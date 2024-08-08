/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/adminPanel/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tl_primary: "#6922f7",
        tl_primary_2: "#8e71f4",
        // primary: '#bf69c2',
        // primary_2: '#e090df',
        tl_primary_bright: "rgb(64,66,226)",
        secondary: "#d0e5f4",
        accent: "#e7b899",
        natural_bg: "#fafafa",
        text_primary: "#333333",
      },
      backgroundImage: {
        "indigo-gradient-left":
          "linear-gradient(204deg, rgba(82, 105, 185, 0.50) 3.48%, #5269B9 98.35%)",
        "indigo-gradient-right":
          "linear-gradient(156deg, rgba(82, 105, 185, 0.50) 0%, #5269B9 100%)",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg) translate( 0px, -50%)" },
          "100%": { transform: "rotate(360deg) translate( 0px, -50%)" },
        },
      },
    },
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
