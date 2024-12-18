/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#52ac99",
        secundary:"#007ea7",
        tertiary:{
          100:"#f7f7f7",
          900:"#ffffff",
        },
        cuartary:{
          "100":"#6b7280",
          "900":"#00171f",
        }
        

      }
    },
  },
  plugins: [],
}