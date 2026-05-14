/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFDF7",
        cream: "#F4E8CE",
        gold: "#C89B3C",
        navy: "#24463F",
        softblue: "#EEF6F4",
        ink: "#25342F",
        muted: "#6D746F",
      },
      boxShadow: {
        soft: "0 18px 44px rgba(36, 70, 63, 0.09)",
        glow: "0 18px 55px rgba(200, 155, 60, 0.22)",
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
