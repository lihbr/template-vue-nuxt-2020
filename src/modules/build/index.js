const logger = require("./logger");

module.exports = function (moduleOptions) {
  this.nuxt.hook("build:before", () => {
    // Disabling redundant minification
    this.options.build.html = this.options.build.html || {};
    this.options.build.html.minify = this.options.build.html.minify || {};
    this.options.build.html.minify.minifyCSS = false;
    this.options.build.html.minify.minifyJS = false;
  });

  logger.success("Build module initialized");
};
