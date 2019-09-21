const fs = require("fs");
const {
  glob,
  getFileName,
  readJson,
  globContent,
  slugify
} = require("./helpers");

const env = require("./env");

const routes = [];

console.info(routes.map(i => i.route));

module.exports = { routes, fallback: true };
