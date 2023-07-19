/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
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
  plugins: [
    require("flowbite/plugin"), // add this line
  ],
};
