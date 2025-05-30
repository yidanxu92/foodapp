import type { Config } from 'tailwindcss'


const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A1EACD',
        primary_deep: '#63C7A3',
        secondary: '#F6E6E0',
        dark: "#7789D8",
        light: "#FEF2D8",
        melba:"#E3ABE8"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        nothingYouCouldDo: ["Nothing You Could Do", "cursive"]
      },
      screens: {
        'sm': '576px', // => @media (min-width: 576px) { ... }
        'md': '768px', // => @media (min-width: 768px) { ... }
        'lg': '1024px', // => @media (min-width: 1024px) { ... }
        'xl': '1280px', // => @media (min-width: 1280px) { ... }
        '2xl': '1536px', // => @media (min-width: 1536px) { ... }
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          md: '3rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        center:true,
      },
    },
  },
  
  plugins: [
    require('preline/plugin'),
    nextui(),
  ],
}
export default config