/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "dracula"],
  },
  plugins: [
    require("daisyui")
  ],
}

