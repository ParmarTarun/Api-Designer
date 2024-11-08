import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3d59",
        secondary: "#f5f0e1",
        darkHighlight: "#ff6e40",
        lightHighlight: "#ffc13b",
        white: "#ffffff",
        error: "#FF3333",
      },
    },
  },
  plugins: [],
};
export default config;
