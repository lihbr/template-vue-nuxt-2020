const { envConfig } = require("./env.config");
const logger = require("consola").withScope("nuxt");

module.exports = async () => {
  // Configure application environment
  const env = envConfig(/* settings, CMS_GLOBAL */);

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
     ** Head of the page, handled by head module
     */
    head: {},

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
    plugins: ["~/plugins/logger", "~/plugins/filters"],

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
      [
        "~/modules/head",
        {
          lang: env.APP_LANG,
          name: env.APP_NAME,
          description: env.APP_DESC,
          metaImage: {
            og: env.APP_METAIMG_OG,
            tw: env.APP_METAIMG_TW
          },
          twitterHandle: env.APP_TWITTER_HANDLE,
          script,
          backgroundColor: "#feeeee",
          accentColor: "#e84311",
          titleFormat: "%page% - %site%",
          url: env.APP_URL
        }
      ],
      "~/modules/cache",
      "~/modules/statistics",
      "~/modules/tailwindcss",
      "@nuxtjs/global-components",
      "@nuxtjs/style-resources",
      "@nuxtjs/sitemap",
      "@nuxtjs/feed",
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
     ** Generate
     */
    generate: {
      fallback: true,
      routes: ["/"]
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
     ** Feed
     */
    feed: [],

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
