/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#101010",
        light: "#FFFCF4",
        primary: "#1B414F",
        secondary: "#F27F3E",
        accent: "#FFCF2E",
      },
      backgroundImage: {
      }
    },
  },
  plugins: [],
};