// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        'group': (value) => ({
          // Replace commas with spaces for Tailwind's @apply syntax
          [`@apply ${value.replaceAll(',', ' ')}`]: {},
        }),
      });
    }),
  ],
};
