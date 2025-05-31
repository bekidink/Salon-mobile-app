/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#156778', // Replace with your desired primary color
        secondary: '#F98600', // Replace with your desired secondary color
        tertiary: '#FFFFFF', // Replace with your desired tertiary color
      },
    },
  },
  plugins: [],
};
