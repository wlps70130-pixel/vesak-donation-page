/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8FBF7",
        cream: "#EEF6EA",
        gold: "#B8943D",
        navy: "#0F6657",
        softblue: "#E6F3EF",
        ink: "#18352F",
        muted: "#667A72",
      },
      boxShadow: {
        soft: "0 18px 44px rgba(15, 102, 87, 0.10)",
        glow: "0 18px 55px rgba(184, 148, 61, 0.22)",
      },
      fontFamily: {
        sans: [
          "Noto Sans Thai",
          "Leelawadee UI",
          "Tahoma",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
