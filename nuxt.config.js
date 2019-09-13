const path = require("path");

const env = require("./config/env");
const { head, routes } = require("./config");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page, see in ./config
   */
  head,

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#000000" },

  /*
   ** Global CSS
   */
  css: ["~/assets/sass/style.sass"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/globals.js"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "cookie-universal-nuxt"
  ],

  /*
   ** Style resources
   */
  styleResources: {
    sass: "~/assets/sass/core.sass"
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: process.env.API_URL
  },

  /*
   ** Sitemap
   */
  sitemap: {
    hostname: env.APP_URL,
    gzip: true,
    exclude: ["/admin/**"]
  },

  /*
   ** Env
   */
  env: {
    // api_url: env.API_URL,
    app_name: env.APP_NAME,
    app_desc: env.APP_DESC,
    dev_data: env.DEV ? routes : ""
  },

  /*
   ** Generate
   */
  generate: {
    routes,
    fallback: true
  },

  /*
   ** Server configuration
   */
  server: {
    host: env.APP_HOST,
    port: env.APP_PORT
  },

  /*
   ** Render
   */
  render: {
    ssr: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    extractCSS: true,
    postcss: {
      plugins: {
        "postcss-import": {},
        tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),
        autoprefixer: env.DEV ? false : {},
        // prettier-ignore
        "@fullhuman/postcss-purgecss": env.DEV
          ? false
          : {
            content: [
              "./pages/**/*.vue",
              "./layouts/**/*.vue",
              "./components/**/*.vue"
            ],
            whitelist: ["html", "body"],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          }
      }
    }
  }
};
