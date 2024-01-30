/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "airbnb-cereal": ["Airbnb Cereal App", "sans-serif"],
      },
      colors: {
        primary: "#EFC81A",
        secondary: "#d7b417",
      },
    },
  },
  plugins: [],
};
