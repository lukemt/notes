const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
    colors,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
