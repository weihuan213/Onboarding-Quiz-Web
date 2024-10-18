/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ds-gray-1000": "#333333", // 这里使用示例颜色，你可以根据实际情况设置颜色值
      },
      fontSize: {
        xs: "1.25rem",
        sm: "1.25rem",
        smd: "1.125rem",
        md: "1.25rem",
        lg: "1.25rem",
      },
      lineHeight: {
        xs: "1.5rem",
        sm: "1.5rem",
        smd: "1.5rem",
        md: "1.5rem",
        lg: "1.5rem",
      },
      fontWeight: {
        xs: 400,
        sm: 400,
        smd: 400,
        md: 400,
        lg: 400,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
