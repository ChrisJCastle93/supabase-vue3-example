/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FEF1EC",
          100: "#FDE6DE",
          200: "#FAC7B3",
          300: "#F6A07E",
          400: "#F1642D",
          500: "#9F340B",
          600: "#8F300A",
          700: "#7C2909",
          800: "#642107",
          900: "#481805",
        },
        secondary: {
          50: "#FDF6E8",
          100: "#FBEED0",
          200: "#F6DDA2",
          300: "#F2CC73",
          400: "#EEBD49",
          500: "#EAAC19",
          600: "#C08B11",
          700: "#8C660D",
          800: "#5D4409",
          900: "#2F2204",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
  corePlugins: {
    aspectRatio: true,
  },
};
