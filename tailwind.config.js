module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px"
    },
    fontFamily: {
      main: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"
      ],
      mono: [
        "SFMono-Regular",
        "Menlo",
        "Consolas",
        "Liberation Mono",
        "Courier",
        "monospace"
      ]
    },
    colors: {
      none: "none",
      inherit: "inherit",
      black: {
        default: "#111111",
        "o-20": "rgb(17, 17, 17, 0.2)"
      },
      white: {
        default: "#fefefe",
        "o-20": "rgb(254, 254, 254, 0.2)"
      }
    },
    fontSize: {
      "3xs": "0.5rem", //   8px
      "2xs": "0.625rem", // 10px
      xs: "0.75rem", //     12px
      s: "0.875rem", //     14px
      m: "1rem", //         16px
      l: "1.125rem", //     18px
      xl: "1.25rem", //     20px
      "2xl": "1.5rem", //   24px
      "3xl": "1.75rem", //  28px
      "4xl": "2rem", //     32px
      "5xl": "2.25rem", //  36px
      "6xl": "2.75rem", //  44px
      "7xl": "3.25rem", //  52px
      "8xl": "4rem", //     64px
      "9xl": "4.5rem", //   72px
      "10xl": "5rem" //     80px
    },
    opacity: {
      "0": "0",
      "10": "0.1",
      "20": "0.2",
      "30": "0.3",
      "40": "0.4",
      "50": "0.5",
      "60": "0.6",
      "70": "0.7",
      "80": "0.8",
      "90": "0.9",
      "100": "0.99" // prevent extra paint
    },
    zIndex: {
      "-1000": -1000,
      "-100": -100,
      "-50": -50,
      "-20": -20,
      "-10": -10,
      "-5": -5,
      "-4": -4,
      "-3": -3,
      "-2": -2,
      "-1": -1,
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "10": 10,
      "20": 20,
      "50": 50,
      "100": 100,
      "1000": 1000,
      auto: "auto"
    },
    extend: {
      spacing: {
        inherit: "inherit",
        col: "120px",
        "col-1": "120px",
        "col-2": "240px",
        "col-3": "360px",
        "col-4": "480px",
        "col-5": "600px",
        "col-6": "720px",
        "col-7": "840px",
        "col-8": "960px",
        "col-9": "1080px",
        "col-10": "1200px",
        "col-11": "1320px",
        "col-12": "1440px",
        "10vw": "10vw",
        "20vw": "20vw",
        "30vw": "30vw",
        "40vw": "40vw",
        "50vw": "50vw",
        "60vw": "60vw",
        "70vw": "70vw",
        "80vw": "80vw",
        "90vw": "90vw",
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh"
      },
      maxWidth: theme => theme("spacing"),
      minWidth: theme => theme("spacing"),
      height: theme => theme("width"),
      minHeight: theme => theme("spacing"),
      minHeight: theme => theme("spacing"),
      lineHeight: {
        "0": 0
      }
    }
  },
  variants: {},
  corePlugins: {
    objectFit: false,
    objectPosition: false
  },
  plugins: []
};
