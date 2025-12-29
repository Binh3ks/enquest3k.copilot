/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border|ring|from|to)-(indigo|orange|purple|rose|emerald|cyan|sky|pink|lime|violet|teal|red|blue|amber|sky)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /shadow-(indigo|orange|purple|rose|emerald|cyan|sky|pink|lime|violet|teal|red|blue)-(200|300|400|500)/,
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
