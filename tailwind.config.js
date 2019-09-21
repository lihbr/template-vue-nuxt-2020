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
    // Acceccible from transition-
    transitionProperty: {
      default: "all",
      color: "color",
      bg: "background",
      opacity: "opacity",
      transform: "transform",
      "opacity-transform": ["opacity", "transform"]
    },
    // Accessible from transition-
    transitionDuration: {
      default: "1500ms",
      half: "750ms",
      double: "3000ms"
    },
    // Accessible from transition-delay-
    transitionDelay: theme => theme("transitionDuration"),
    // Accessible from transition-
    transitionTimingFunction: {
      default: "cubic-bezier(.54,.1,0,.99)",
      // Functions from https://easings.net
      "ease-in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
      "ease-in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
      "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      "ease-in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
      "ease-in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
      "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
      "ease-in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
      "ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
      "ease-out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
      "ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
      "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
      "ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
      "ease-out--expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      "ease-out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
      "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      "ease-in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
      "ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
      "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
      "ease-in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
      "ease-in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
      "ease-in-out-expo": "cubic-bezier(1, 0, 0, 1)",
      "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      "ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
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
  plugins: [
    require("tailwindcss-transitions")(),
    ({ addBase, addUtilities, theme }) => {
      addBase({
        strong: { fontWeight: theme("fontWeight.bold") }
      });

      const objectFitUtilities = {
        ".object-cover": {
          objectFit: "cover",
          fontFamily: "object-fit: cover"
        },
        ".object-contain": {
          objectFit: "contain",
          fontFamily: "object-fit: contain"
        }
      };
      addUtilities(objectFitUtilities, {
        variants: ["responsive"]
      });

      const flexUtilities = {
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      };
      addUtilities(flexUtilities, {
        variants: ["responsive"]
      });
    }
  ]
};
