/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "b612-mono": ['"B612 Mono"', 'monospace'],
      },
      colors: {
        "custom-primary": "#F5F5F5",
        "custom-secondary": "#48CFCB",
        "custom-darker-secondary": "#229799",
        "custom-dark": "#424242",
      }
    },
  },
  plugins: [],
}
