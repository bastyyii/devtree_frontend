/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home" : "url('/images/bg.svg')"
      },
      backgroundSize: {
        "home-xl" : "50%"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

