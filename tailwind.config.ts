import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        hbe: {
          navy: "#1B4F8A",
          green: "#5DA636",
          gold: "#F5B800",
          sky: "#E8F4FB",
          cream: "#FFF4D6",
          peach: "#FDE7E0",
          lilac: "#EFE6FA",
          bg: "#FBF8EF"
        }
      },
      borderRadius: {
        bubble: "28px"
      },
      boxShadow: {
        bubble: "0 12px 30px rgba(27,79,138,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
