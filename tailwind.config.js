/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#66d2bb",
        secundary:"#007ea7",
        tertiary:{
          100:"#f7f7f7",
          900:"#ffffff",
        },
        cuartary:{
          "100":"#003459",
          "900":"#00171f",
        }
        

      }
    },
  },
  plugins: [],
}