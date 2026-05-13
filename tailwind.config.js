/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FFF9EC",
        cream: "#F7E8C8",
        gold: "#C9962D",
        navy: "#0B2A4A",
        softblue: "#EAF4FF",
        ink: "#172033",
        muted: "#667085",
      },
      boxShadow: {
        soft: "0 20px 55px rgba(11, 42, 74, 0.09)",
        glow: "0 0 55px rgba(201, 150, 45, 0.28)",
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
