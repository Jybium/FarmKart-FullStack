import type { Config } from "tailwindcss";
import React from "react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "about-us":
          "url('../../src/Asset/FARMKART IMAGES/images/About-us/for about.jpg')",
        "sell-page":
          "url('../../src/Asset/FARMKART IMAGES/images/Sell-page/plus-sign.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
