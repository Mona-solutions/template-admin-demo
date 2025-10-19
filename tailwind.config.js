module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default {
  theme: {
    extend: {
      screens: {
        "2k": { raw: "(min-width: 2560px)" },
        "4k": { raw: "(min-width: 3840px)" },
        retina: { raw: "(min-resolution: 2dppx)" },
      },
    },
  },
};
