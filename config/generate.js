const fs = require("fs");
const consola = require("consola");
const {
  glob,
  getFileName,
  readJson,
  globContent,
  slugify
} = require("./helpers");
const env = require("./env");

const logger = consola.withScope("nuxt:generate");

const routes = [];

logger.info("Routes:\n", routes.map(i => i.route), "\n");

module.exports = { routes, fallback: true };
