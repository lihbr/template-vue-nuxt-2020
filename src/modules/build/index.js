const logger = require("./logger");

module.exports = function (moduleOptions) {
  this.nuxt.hook("build:before", () => {
    // Extract css from HTML
    this.options.build.extractCSS = !this.options.env.DEV;

    // Use dart-sass
    this.options.build.loaders.sass = this.options.build.loaders.sass || {};
    this.options.build.loaders.sass.implementation = require("sass");
    this.options.build.loaders.sass.fiber = require("fibers");

    // Disabling redundant minification
    this.options.build.html = this.options.build.html || {};
    this.options.build.html.minify = this.options.build.html.minify || {};
    this.options.build.html.minify.minifyCSS = false;
    this.options.build.html.minify.minifyJS = false;
  });

  logger.success("Build module initialized\n");
};
