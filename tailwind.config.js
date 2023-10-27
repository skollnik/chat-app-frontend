/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      7: "7rem",
    },
    maxWidth: {
      "40%": "40%",
      12: "12rem",
      xs: "20rem",
    },
  },
  extend: {},
  plugins: [],
};
