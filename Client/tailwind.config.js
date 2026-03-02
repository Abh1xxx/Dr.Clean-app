/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B2A59",
        accent: "#F5B400",
        lightbg: "#F8F9FB",
      },
    },
  },
  plugins: [],
};