/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Sets Inter as the default sans-serif font
        // You can also define custom font names if needed:
        // inter: ['Inter', 'sans-serif'],
      },
      screens: {
        'custom-md': '500px'
      },
      colors: {
        'primary-black': '#1c1c1c',
      },
      textColor: {
        'black': '#1c1c1c',
      },
      borderColor: {
        'black': '#1c1c1c',
      },
      backgroundColor: {
        'black': '#1c1c1c',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} 