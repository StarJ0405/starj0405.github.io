import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      SD: { min: '640px', max: '1279px' }, // 480
      HD: { min: '1280px', max: '1919px' }, // 720
      FHD: { min: '1920px', max: '2559px' }, // 1080
      QHD: { min: '2560px', max: '2879px' }, // 1440
      LAP_16: { min: '2880px', max: '3839px' }, // 1800
      UHD: { min: '3840px', max: '3840px' }, // 2160
    }
  },
  plugins: [],
};
export default config;
