module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "brand-bg": "#fef6e4",
        "brand-main": "#f3d2c1",
        "brand-sold": "#868e969d",
        "brand-btn": "#f582ae",
        "brand-btn-active": "#f582aec5",
        "brand-border": "#172c66",
        "brand-shadow": "#001758ab",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
