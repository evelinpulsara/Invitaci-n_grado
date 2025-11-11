import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // escanea todo dentro de src
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "serif"], // ⬅️ Aquí defines tu fuente serif
      },
    },
  },
  plugins: [],

};

export default config;