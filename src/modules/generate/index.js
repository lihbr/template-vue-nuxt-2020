const logger = require("./logger");
const generationStatistics = require("./generationStatistics");

module.exports = async function(moduleOptions) {
  // Getting global content from CMS
  const APP_ROUTES = ["/"]; // TODO: Get routes from CMS

  this.nuxt.hook("generate:before", (nuxt, generateOptions) => {
    generateOptions.fallback = "404.html";
    generateOptions.routes.push(...APP_ROUTES);

    // Insert generation statistics
    generationStatistics.add.call(this);
  });

  if (this.options.dev) {
    this.options.env.APP_ROUTES = APP_ROUTES;
  }

  logger.info("Routes:\n", APP_ROUTES.map(i => i.route || i));
  logger.success("Generate module initialized\n");
};
