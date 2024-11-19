/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "prata": ['"Prata"', 'serif'],
      },
      colors: {
        "custom-orange": "#F96E2A",
        "custom-white": "#FBF8EF",
        "custom-lighter-blue": "#C9E6F0",
        "custom-darker-blue": "#78B3CE",
      }
    },
  },
  plugins: [],
}
