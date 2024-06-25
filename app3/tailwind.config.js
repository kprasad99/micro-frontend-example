const withMT = require("@material-tailwind/react/utils/withMT");
const { createThemes } = require('tw-colors');

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [createThemes({
    ktheme: { 
       'primary': '#3f51b5',
       'secondary': '#ff4081',
    }
  })],
});