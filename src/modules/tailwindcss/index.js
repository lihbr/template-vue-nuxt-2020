const path = require("path");
const defaultsDeep = require("lodash/defaultsDeep");

const logger = require("./logger");

module.exports = function(moduleOptions) {
  const options = defaultsDeep(moduleOptions, {
    whitelist: [],
    whitelistPatterns: []
  });

  this.nuxt.hook("build:before", () => {
    // Get default
    this.options.build.postcss.plugins =
      this.options.build.postcss.plugins || {};

    // Postcss-import
    this.options.build.postcss.plugins["postcss-import"] = {};

    // Tailwindcss
    this.options.build.postcss.plugins["tailwindcss"] = path.resolve(
      this.options.rootDir,
      "./tailwind.config.js"
    );

    // Production only
    if (!this.options.dev) {
      // Autoprefixer
      this.options.build.postcss.plugins["autoprefixer"] = {};

      // PurgeCSS
      this.options.build.postcss.plugins["@fullhuman/postcss-purgecss"] = {
        content: [
          path.resolve(this.options.srcDir, "./assets/sass/**/*.sass"),
          path.resolve(this.options.srcDir, "./pages/**/*.vue"),
          path.resolve(this.options.srcDir, "./pages/**/*.js"),
          path.resolve(this.options.srcDir, "./layouts/**/*.vue"),
          path.resolve(this.options.srcDir, "./layouts/**/*.js"),
          path.resolve(this.options.srcDir, "./components/**/*.vue"),
          path.resolve(this.options.srcDir, "./components/**/*.js"),
          path.resolve(this.options.srcDir, "./plugins/**/*.js")
        ],
        whitelist: [
          "body",
          "html",
          "nuxt-progress",
          "__nuxt",
          "__layout",
          ...options.whitelist
        ],
        whitelistPatterns: [
          /.*-(enter|enter-active|enter-to|leave|leave-active|leave-to)/,
          ...options.whitelistPatterns
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      };
    }
  });

  logger.success("Tailwindcss module initialized\n");
};
