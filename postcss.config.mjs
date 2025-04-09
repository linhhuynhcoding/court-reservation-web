const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {},
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
