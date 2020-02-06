module.exports = async () => {
  const env = await require("./env").config();

  const script = [];

  return {
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
      titleTemplate: pageTitle => {
        if (pageTitle && pageTitle.trim()) {
          return `${pageTitle} - ${process.env.APP_NAME}`;
        } else {
          return process.env.APP_NAME;
        }
      },
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
        { name: "msapplication-TileColor", content: "#111111" },
        { name: "theme-color", content: "#fefefe" }
      ],
      script,
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
          color: "#111111"
        }
      ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#111111" },

    /*
     ** Global CSS
     */
    css: ["~/assets/sass/style.sass"],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
      "~/plugins/logger",
      "~/plugins/filters",
      { src: "~/plugins/welcome", mode: "client" }
    ],

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
      ["~/modules/generate", { payloadCacheDir: env.GENERATE_CACHE_BASEDIR }],
      "~/modules/components",
      "~/modules/tailwindcss",
      "@nuxtjs/style-resources",
      "@nuxtjs/sitemap",
      ["@nuxtjs/netlify-files", { existingFilesDirectory: __dirname }],
      [
        "@nuxtjs/google-tag-manager",
        {
          id: env.GTM_ID,
          pageTracking: true,
          respectDoNotTrack: env.GTM_FRIENDLY,
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
      exclude: []
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
    }
  };
};
