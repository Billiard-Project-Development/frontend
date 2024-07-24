const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        cardShadow1: "0 0 40px 0 rgba(48, 48, 48, 0.04)"
      },
      colors: {
        primaryOrange: "#FF6B00",
        primaryWhite: "#FFFFFF",
        primaryBlack: "#303030",
        primarySoftgray: "#F0F0F0",
        primaryDarkgray: "#A0A0A0",
        accentDarkOrange: "#D65A00",
        accentSoftOrange: "#FFC092",
        accentSoftOrange2: "#FFE0C9",
        accentBlue: "#3763FF",
        accentGreen: "#00DF16",
        accentSoftGreen: "#ECFFEE",
        accentRed: "#FF6262",
        bgWhite: "#FBFBFB"
      },
      fontFamily: {
        body: ["Montserrat"]
      },
      fontSize: {
        8: "8px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
        36: "36px",
        40: "40px"
      }
    }
  },
  plugins: []
});
