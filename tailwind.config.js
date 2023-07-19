/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff8785",
        secondary: "#ff827c",
        optional: "#20cccc",
        auxiliar: "#20ccbc",
        highlight: "#eeeeee",
        card: "#333333",
        background: "#15141f",
      },
    },
  },
  plugins: [],
};
