/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryOrange: "#FF6B00",
        primaryWhite: "#FFFFFF",
        primaryBlack: "#303030",
        primarySoftGrey: "#F0F0F0",
        primaryDarkGrey: "#A0A0A0",
        accentDaryOrange: "#D65A00",
        accentSoftOrange: "#FFC092",
        accentSoftOrange2: "#FFE0C9",
        accentBlue: "#3763FF",
        accentGreen: "#00DF16",
        accentSoftGreen: "#ECFFEE",
        accentRed: "#FF6262",
        accentRed2: "#FF6262"
      },
      fontFamily: {
        body: ["Montserrat"]
      }
    }
  },
  plugins: []
});
