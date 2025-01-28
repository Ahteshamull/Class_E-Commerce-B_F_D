const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tiroBangla: ["Tiro Bangla", "serif"],
        roboto: ["Roboto", "serif"],
      },
      colors: {
        primary: "#009688",
        white: "#f1f1f1",
      },
    },
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "1320px",
  
        "2xl": "1400px",
      },
    },
  },
  plugins: [],
});
