/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ldt-red": "#D71616",
        "ldt-gray": "#DBDBDB",
        "ldt-dark-gray": "#979797",
      },
      gradientColorStopPositions: {
        0: "#ffffff", // White color at 0%
        20: "#ff0000", // Red color at 20%
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};

