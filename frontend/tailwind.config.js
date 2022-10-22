/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E9C376',
        secondary: '#DFB8AC'
      },
      fontFamily: {
        test: ['"Open Sans"', ...defaultTheme.fontFamily.sans]
      }
    },

  },
  plugins: [],
}
