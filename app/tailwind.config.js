/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 4px 40px -12px #00000066', // Add rgba value if needed
      },
      
      colors: {
        'custom-gray': '#D9D9D966', // rgba equivalent of #D9D9D9 with 40% opacity
      },
      backgroundImage: {
        'bluish-radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}