const { envConfig } = require("./env.config");
const logger = require("consola").withScope("nuxt");

module.exports = async () => {
  // Configure application environment
  const env = envConfig(/* settings, CMS_GLOBAL */);

  return {
    /*
     ** Application mode
     */
    mode: "universal",

    /*
     ** Application target
     */
    target: "static",

    /*
     ** Build target
     */
    modern: env.DEV ? false : "client",

    /*
     ** Application directory
     */
    srcDir: "src/",

    /*
     ** Generate
     */
    generate: {
      cache: {},
      crawler: false,
      fallback: true,
      routes: [
        {
          route: "/",
          payload: {}
        }
      ]
    },

    /*
     ** Head of the page, handled by head module
     */
    head: {},

    /*
     ** Customize the progress-bar color
     */
    loading: { color: env.APP_ACCENT_COLOR },

    /*
     ** Global CSS
     */
    css: ["typeface-roboto", "~/assets/sass/style.sass"],

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
          backgroundColor: env.APP_BACKGROUND_COLOR,
          accentColor: env.APP_ACCENT_COLOR,
          titleFormat: env.APP_TITLE_FORMAT,
          url: env.APP_URL
        }
      ],
      "~/modules/payload",
      "~/modules/statistics",
      "@nuxtjs/eslint-module",
      [
        "@nuxtjs/tailwindcss",
        {
          configPath: "~~/tailwind.config.js",
          exposeConfig: false
        }
      ],
      "@nuxtjs/global-components",
      "@nuxtjs/feed",
      [
        "@nuxtjs/sitemap",
        {
          hostname: env.APP_URL,
          gzip: true,
          exclude: []
        }
      ],
      ["@nuxtjs/netlify-files", { existingFilesDirectory: __dirname }],
      [
        "@nuxtjs/gtm",
        {
          id: env.GTM_ID,
          pageTracking: true,
          pageViewEventName: "nuxtRoute",
          respectDoNotTrack: env.GTM_FRIENDLY,
          enabled: !env.DEV
        }
      ],
      [
        "@nuxtjs/pwa",
        {
          workbox: {
            clientsClaim: false,
            offlineAnalytics: !!env.GTM_ID,
            // Register image CDN here
            runtimeCaching: [
              // {
              //   urlPattern: `https://example.com/.*`,
              //   handler: "networkFirst"
              // }
            ]
          },
          meta: false,
          icon: {
            accessibleIcons: false
          },
          manifest: {
            // display: "browser", // disable "Add to Home Screen" button
            lang: env.APP_LANG,
            name: env.APP_NAME,
            short_name: env.APP_NAME,
            description: env.APP_DESC,
            background_color: env.APP_BACKGROUND_COLOR,
            theme_color: env.APP_ACCENT_COLOR
          }
        }
      ],
      "nuxt-svg-loader"
    ],

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
    },

    /*
     ** Build
     */
    build: {
      html: {
        minify: {
          minifyCSS: false,
          minifyJS: false
        }
      }
    }
  };
};
