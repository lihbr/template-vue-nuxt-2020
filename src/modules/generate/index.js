const { resolve } = require("path");

const { globContent, slugify } = require("./helpers");

const logger = require("./logger");
const generationStatistics = require("./generationStatistics");

const getRoutes = async contentDir => {
  const routes = [];

  // const posts = await globContent(contentDir, "./posts/blog");
  // for (const slug in posts) {
  //   routes.push({
  //     route: `/post/${slug}`,
  //     payload: posts[slug]
  //   });
  // }

  return routes;
};

module.exports = async function(moduleOptions) {
  const contentDir = resolve(this.options.rootDir, "./content");

  const APP_SETTINGS = await globContent(contentDir, "./settings");

  const routes = await getRoutes(contentDir);

  this.nuxt.hook("generate:before", (nuxt, generateOptions) => {
    generateOptions.fallback = "404.html";
    generateOptions.routes.push(...routes);

    // Insert generation statistics
    generationStatistics.add.call(this);
  });

  if (this.options.dev) {
    this.options.env.APP_DATA = routes;
  }
  this.options.env.APP_SETTINGS = APP_SETTINGS;

  logger.info("Routes:\n", routes.map(i => i.route || i), "\n");
  logger.info("APP_SETTINGS:\n", this.options.env.APP_SETTINGS);
  logger.success("Generate module initialized\n");
};
