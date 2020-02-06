const path = require("path");
const md5 = require("md5");

// Covered by nuxt
const { copy, outputJSONSync } = require("fs-extra");
const serveStatic = require("serve-static");

// Import your own route fetcher
const routes = { fetch: () => [{ route: "/", payload: {} }] };

const logger = require("./logger");
const generationStatistics = require("./generationStatistics");

module.exports = async function(moduleOptions) {
  // Resolve options
  const options = {
    generateCacheBasedir: "/cache",
    ...moduleOptions
  };

  /**
   * Config
   */
  const appRoutes = await routes.fetch(this.options.env.CMS_CONTENT);
  const generateHash = md5(new String(Date.now()));
  options.generateCacheDir = path
    .join("/", options.generateCacheBasedir, generateHash)
    .replace(/[\/\\]+/g, "/");

  const urlPrefix = this.options.dev
    ? `http://${this.options.server.host}:${this.options.server.port}`
    : "";
  this.options.env.GENERATE_CACHE_DIR = `${urlPrefix}${options.generateCacheDir}`;

  /**
   * Hooks
   */

  // Extends generate option
  this.nuxt.hook("generate:before", (nuxt, generateOptions) => {
    generateOptions.fallback = "404.html";
    generateOptions.routes.push(...appRoutes);

    // Insert generation statistics
    generationStatistics.add.call(this);
  });
  // Creating cache file on build
  this.nuxt.hook("build:extendRoutes", async () => {
    try {
      await Promise.all(
        appRoutes.map(({ route, payload }) => {
          const url = [
            this.options.buildDir,
            options.generateCacheDir,
            route,
            "index.json"
          ]
            .join("/")
            .replace(/[\/\\]+/g, "/");

          return outputJSONSync(url, payload);
        })
      );
      logger.success("Payloads cache files saved");
    } catch (error) {
      logger.error(error);
      throw error;
    }
  });
  // Copy cache file to dist when generating
  this.nuxt.hook("generate:distCopied", async nuxt => {
    await copy(
      path.join(this.options.buildDir, options.generateCacheBasedir),
      path.join(nuxt.distPath, options.generateCacheBasedir)
    );

    logger.success("Payloads files copied");
  });
  // Serve cache file while developing
  if (this.options.dev) {
    this.addServerMiddleware({
      path: options.generateCacheBasedir,
      handler: serveStatic(
        path.join(this.options.buildDir, options.generateCacheBasedir),
        {
          setHeaders: (res, path) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
          }
        }
      )
    });
  }

  logger.info("Routes:\n", appRoutes.map(i => i.route || i));
  logger.success("Generate module initialized\n");
};
