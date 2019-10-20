const env = require("./env");

module.exports = {
  /*
   ** Application mode
   */
  mode: "universal",

  /*
   ** Application directory
   */
  srcDir: "src/",

  /*
   ** Headers of the page, see in ./config
   */
  head: {
    title: env.APP_NAME,
    htmlAttrs: {
      lang: env.APP_LANG,
      class: ""
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: env.APP_DESC
      },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#feeeee" }
    ],
    script: [],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/site.webmanifest"
      },
      {
        rel: "mask-icon",
        href: "/safari-pinned-tab.svg",
        color: "#e84311"
      }
    ]
  },

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
  plugins: [{ src: "~/plugins/welcome", mode: "client" }],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Nuxt.js build modules
   */
  buildModules: [
    "@nuxtjs/eslint-module",
    "~/modules/build",
    "~/modules/generate",
    "~/modules/components",
    "~/modules/tailwindcss",
    "~/modules/netlify-cms",
    "@nuxtjs/style-resources",
    "@nuxtjs/sitemap",
    ["@nuxtjs/netlify-files", { existingFilesDirectory: __dirname }],
    [
      "@nuxtjs/google-tag-manager",
      {
        id: env.GTM_ID,
        pageTracking: true,
        dev: env.GTM_DEV
      }
    ],
    "nuxt-svg-loader"
  ],

  /*
   ** Style resources
   */
  styleResources: {
    sass: "~/assets/sass/core.sass"
  },

  /*
   ** Sitemap
   */
  sitemap: {
    hostname: env.APP_URL,
    gzip: true,
    exclude: ["/_admin/**", "/_adminAssets/**", "/_adminBundle/**"]
  },

  /*
   ** Env
   */
  env,

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
    ssr: !env.DEV
  }
};
