import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#f0feef",
          100: "#d8ffd9",
          200: "#b4feb5",
          300: "#7afb7d",
          400: "#39ef3d",
          500: "#0fd815",
          600: "#06b30b",
          700: "#08810c",
          800: "#0d6e11",
          900: "#0d5a12",
          950: "#003304",
        }
      },
      fontFamily: {
        inter: ['var(--font-inter)'], // Usando a variável definida
        poppins: ['var(--font-poppins)'], // Usando a variável definida
      },
    },
  },
  plugins: [],
};
export default config;
