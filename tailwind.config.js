module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      nunito: ["Nunito Sans", "sans-serif"],
    },
    extend: {
      colors: {
        darkblue: {
          100: "hsl(209, 23%, 22%)",
          200: "hsl(207, 26%, 17%)",
          300: "hsl(200, 15%, 8%)",
        },
        lightgray: " hsl(0, 0%, 98%)",
      },
    },
  },
  plugins: [],
};
